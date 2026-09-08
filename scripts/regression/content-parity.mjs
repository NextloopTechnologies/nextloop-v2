#!/usr/bin/env node
/**
 * Contract check for the content seam.
 *
 * The site can read from Supabase or from Payload (`CONTENT_SOURCE`). Those two
 * stores agree about almost nothing underneath — casing, media shape, rich text
 * — and every difference is absorbed in `src/lib/content/payload.ts`. This
 * asserts the absorption actually worked, by checking the things a component
 * would silently get wrong rather than crash on.
 *
 * Two ways to use it:
 *
 *   node scripts/regression/content-parity.mjs http://localhost:3000
 *       Asserts the contract. Runs against either source; a failure here means
 *       whichever source you pointed it at is serving something a component
 *       cannot render correctly.
 *
 *   node scripts/regression/content-parity.mjs <url> --fingerprint
 *       Prints a normalised, source-independent fingerprint per route. Run it
 *       once per source and diff the two outputs: any line that differs is a
 *       real behavioural difference between the stores, not noise.
 *
 * Why a contract and not a byte comparison: ids, timestamps and image hosts
 * legitimately differ between the two stores. Comparing raw HTML would fail on
 * all of it and prove nothing. These are the properties that must hold either
 * way.
 */

const BASE = process.argv[2] || 'http://localhost:3000';
const FINGERPRINT = process.argv.includes('--fingerprint');

const results = [];
const check = (id, route, ok, detail) => results.push({ id, route, ok, detail });

const get = async (path) => {
  const res = await fetch(BASE + path, { redirect: 'follow' });
  return { status: res.status, html: await res.text() };
};

const pick = (html, re) => { const m = html.match(re); return m ? m[1] : null; };
const count = (html, re) => (html.match(re) || []).length;

const visibleText = (html) => {
  const body = (html.match(/<body[^>]*>([\s\S]*)<\/body>/) || [, ''])[1];
  return body
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// ---------------------------------------------------------------------------
// Discovery: the sitemaps are themselves generated from the seam, so whatever
// they list is what this source claims to serve. Testing a hardcoded list of
// slugs would only work against one store.
// ---------------------------------------------------------------------------

const locs = async (path) => {
  const { html } = await get(path);
  return [...html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
};

const blogPaths = (await locs('/sitemap-content.xml')).filter((p) => p.startsWith('/blog/'));
const casePaths = (await locs('/sitemap-content.xml')).filter((p) => p.startsWith('/portfolio/'));
const jobPaths = await locs('/sitemap-jobs.xml');

console.log(
  `Discovered via sitemaps: ${blogPaths.length} posts, ${jobPaths.length} jobs, ${casePaths.length} case studies\n`
);

if (blogPaths.length + jobPaths.length + casePaths.length === 0) {
  console.log('Nothing to check — this source returned no content URLs.');
  console.log('That is itself the finding: the seam is reaching an empty or unreachable store.');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Listing routes.
//
// These were missing from the first version of this file, and that omission
// cost a live 500: `getServerSideProps` refuses to serialise `undefined`, an
// unpopulated relationship produced one, and only the listing route passes a
// whole collection through props — so only it failed, and only for a store
// where some document omits the field. Detail routes alone cannot catch that.
// ---------------------------------------------------------------------------

const LISTINGS = [
  ['/blog/', /href="\/blog\/[^"]+"/g],
  ['/career/', /href="\/career\/[^"]+"/g],
  ['/portfolio/', /href="\/portfolio\/[^"]+"/g],
];

for (const [route, linkRe] of LISTINGS) {
  const { status, html } = await get(route);
  check('LIST-STATUS', route, status === 200, `status ${status}`);
  if (status !== 200) continue;

  // Every card on these pages was a <div onClick={router.push}>. It navigates
  // for a mouse user and does not exist for a crawler, so not one blog post,
  // job or case study had an internal link pointing at it — the JobPosting and
  // BlogPosting schema on those pages had nothing to be found by. A listing
  // page that renders cards but emits no hrefs is the regression to catch.
  const hrefs = new Set([...html.matchAll(linkRe)].map((m) => m[0]));
  check('LIST-LINKS', route, hrefs.size > 0,
    `${hrefs.size} detail links in the HTML`);
  check('LIST-LINK-SLASH', route,
    [...hrefs].every((h) => h.endsWith('/"')),
    'detail links carry the trailing slash, so no click costs a redirect');
  check('LIST-H1', route, count(html, /<h1[\s>]/g) === 1, `${count(html, /<h1[\s>]/g)} H1s`);
  check('LIST-NO-RAW-LEXICAL', route, !/\{&quot;root&quot;|\{"root":/.test(html),
    'card previews must be HTML, never a serialised Lexical document');
  check('LIST-BODY', route, visibleText(html).length > 300,
    `${visibleText(html).length} chars rendered`);
}

// ---------------------------------------------------------------------------
// The contract
// ---------------------------------------------------------------------------

const fingerprints = [];

for (const route of [...blogPaths, ...jobPaths, ...casePaths]) {
  const { status, html } = await get(route);
  check('STATUS', route, status === 200, `status ${status}`);
  if (status !== 200) continue;

  const title = pick(html, /<title[^>]*>([\s\S]*?)<\/title>/);
  check('TITLE', route, !!title && title.trim().length > 0, `title ${JSON.stringify(title)}`);
  check('CANONICAL', route, !!pick(html, /rel="canonical" href="([^"]*)"/), 'canonical present');

  // A canonical must be a URL. The seeder writes Python's `None` into optional
  // string columns, which is truthy, so `canonical_url || fallback` happily
  // emits href="None" — a self-inflicted deindex that renders invisibly.
  const canonical = pick(html, /rel="canonical" href="([^"]*)"/) ?? '';
  check('CANONICAL-URL', route, /^https?:\/\//.test(canonical), `href ${JSON.stringify(canonical)}`);

  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  check('JSONLD', route, jsonLd.length > 0, `${jsonLd.length} blocks`);
  let valid = true;
  for (const [, body] of jsonLd) { try { JSON.parse(body); } catch { valid = false; } }
  check('JSONLD-VALID', route, valid, valid ? 'parses' : 'invalid JSON');

  check('H1', route, count(html, /<h1[\s>]/g) === 1, `${count(html, /<h1[\s>]/g)} H1s`);

  const text = visibleText(html);

  // THE assertion this file exists for. `descp` is HTML in Supabase and a
  // Lexical document in Payload; the blog page assigns it to innerHTML to build
  // its table of contents. If the adapter stops converting, the page does not
  // crash — it renders serialised JSON as body copy and the TOC empties. Both
  // look like content to a status check.
  check('NO-RAW-LEXICAL', route, !/\{&quot;root&quot;|\{"root":/.test(html),
    'body must be HTML, never a serialised Lexical document');
  check('NO-OBJECT-STRING', route, !text.includes('[object Object]'),
    'no [object Object] leaking from an unadapted field');

  // Content routes exist to carry content. An empty body means the adapter
  // returned a document whose fields did not map.
  check('HAS-BODY', route, text.length > 200, `${text.length} chars of rendered text`);

  if (route.startsWith('/blog/')) {
    check('ARTICLE-LD', route, html.includes('"BlogPosting"'), 'BlogPosting schema');
  }
  if (route.startsWith('/career/')) {
    // 64 live postings were invisible to Google Jobs before this shipped.
    check('JOB-LD', route, html.includes('"JobPosting"'), 'JobPosting schema');
  }

  fingerprints.push([
    route,
    `title=${(title ?? '').trim().length}`,
    `h1=${count(html, /<h1[\s>]/g)}`,
    `h2=${count(html, /<h2[\s>]/g)}`,
    `ld=${jsonLd.length}`,
    `og=${count(html, /property="og:/g)}`,
    `text=${text.length}`,
  ].join('  '));
}

// ---------------------------------------------------------------------------
// The write endpoint.
//
// Only the rejection paths are exercised: they prove the endpoint exists, is
// POST-only, validates, and refuses unknown forms — without writing a row on
// every test run. A suite that seeds junk into the database every time it runs
// stops being run.
// ---------------------------------------------------------------------------

const postForm = async (kind, body) => {
  const res = await fetch(`${BASE}/api/forms/${kind}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    redirect: 'manual',
  });
  return { status: res.status, body: await res.text() };
};

{
  // The forms post with a trailing slash because `trailingSlash: true` applies
  // to API routes too — without it every submission costs a 308 round trip.
  const noSlash = await fetch(`${BASE}/api/forms/enquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
    redirect: 'manual',
  });
  check('FORM-SLASH', '/api/forms/enquiry', [307, 308].includes(noSlash.status),
    `status ${noSlash.status} — the slashless path redirects, so callers must include it`);

  const getIt = await fetch(`${BASE}/api/forms/enquiry/`, { redirect: 'manual' });
  check('FORM-METHOD', '/api/forms/enquiry/', getIt.status === 405,
    `GET -> ${getIt.status} (expected 405)`);

  const unknown = await postForm('not-a-form', {});
  check('FORM-UNKNOWN', '/api/forms/not-a-form/', unknown.status === 404,
    `status ${unknown.status} (expected 404 — this must not be a general write proxy)`);

  const bad = await postForm('enquiry', { fullname: 'X', email: 'not-an-email', subject: 'S' });
  check('FORM-VALIDATION', '/api/forms/enquiry/', bad.status === 400,
    `status ${bad.status} (expected 400 on an invalid email)`);

  // A database error must never reach the submitter as a raw message.
  check('FORM-NO-LEAK', '/api/forms/enquiry/',
    !/postgres|supabase|PGRST|relation |column /i.test(bad.body),
    'error responses must not leak database detail');
}

// Unknown refs must 404 on either source — a soft 200 lets a crawler index
// unlimited junk URLs, which is what the old PostgREST error path did.
for (const route of ['/blog/no-such-post-xyz/', '/career/99999999/', '/portfolio/99999999/']) {
  const { status } = await get(route);
  check('404', route, status === 404, `status ${status} (expected 404)`);
}

if (FINGERPRINT) {
  console.log('--- fingerprint (diff this between sources) ---');
  for (const line of fingerprints.sort()) console.log(line);
  console.log();
}

const failed = results.filter((r) => !r.ok);
console.log(`${results.length - failed.length}/${results.length} contract checks passed\n`);
if (failed.length) {
  console.log('FAILURES:');
  for (const f of failed) console.log(`  [${f.id}] ${f.route} — ${f.detail}`);
  process.exit(1);
}
console.log('The seam holds: every content route satisfies the component contract.');
