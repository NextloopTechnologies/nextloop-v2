#!/usr/bin/env node
/**
 * Automated slice of docs/REGRESSION-SUITE.md.
 *
 * Compares the locally-running build against values captured from the
 * pre-upgrade production site (Next 13.4.4). A route passes only when it
 * matches the baseline. Entries carrying `fixed:` were deliberately moved off
 * the captured value — each names a repaired defect, and the new value is now
 * the thing under test. `knownDefect:` marks the reverse: a captured value that
 * is itself wrong but is asserted as-is until someone fixes it.
 *
 *   node scripts/regression/smoke.mjs [baseUrl]
 *
 * Default baseUrl is http://localhost:3000.
 */

const BASE = process.argv[2] || 'http://localhost:3000';

// Captured from production on 2026-09-02, Next 13.4.4.
// title: null means "no <title> tag at all" (a baselined defect).
// minText: floor on server-rendered visible text. /domain/ecommerce/ imported
// every component with dynamic({ ssr: false }) and served 695 characters — the
// nav and nothing else — while reporting a perfectly healthy title and
// description. Counting tags alone cannot see that; this can.
const BASELINE = [
  { path: '/', title: 'IT Staff Augmentation | Custom Software Solutions | AI Remote Teams', descLen: 172, h1: 1, jsonLd: 1 , minText: 2000 },
  { path: '/about-us/', title: 'Custom Software & AI Development Company | Nextloop', descLen: 159, h1: 1, jsonLd: 1 , minText: 3000 },
  { path: '/services/', title: 'Offshore development center | Custom Web & software services provider', descLen: 172, h1: 1, jsonLd: 1 , minText: 2000 },
  { path: '/services/custom-software-development/', title: 'Custom Software Development Outsourcing | Nextloop Technologies', descLen: 175, h1: 1, jsonLd: 1 },
  { path: '/services/it-staff-augmentation/', title: 'IT Staff Augmentation Services | Hire Dedicated AI Developers', descLen: 152, h1: 1, jsonLd: 1 },
  { path: '/services/web-development/', title: 'Scalable Web Development & IT Outsourcing Services in India', descLen: 216, h1: 1, jsonLd: 1 },
  { path: '/services/mobile-app-development/', title: 'Native Mobile Application Development India | iOS & Android Experts', descLen: 166, h1: 1, jsonLd: 1 },
  { path: '/services/mvp-development/', title: 'Build Your MVP Faster with Expert Software Development Services', descLen: 153, h1: 1, jsonLd: 0 },
  { path: '/services/ai-ml/', title: 'AI & ML Solutions Custom Development & Consulting | Nextloop', descLen: 156, h1: 1, jsonLd: 1 },
  { path: '/services/cloud-computing-solutions/', title: 'Enterprise Cloud & DevOps Services India |AWS & Azure Experts', descLen: 161, h1: 1, jsonLd: 1 },
  { path: '/services/digital-marketing-services/', title: 'Best Performance Marketing & SEO Services India', descLen: 160, h1: 1, jsonLd: 0 },
  { path: '/services/e-commerce-development/', title: 'E-Commerce Development Services | Nextloop Technologies', descLen: 157, h1: 1, jsonLd: 0, fixed: 'was a copy of the custom-software title with a 293-char description' },
  { path: '/services/software-testing-qa-services/', title: 'Software Testing & QA Services | Nextloop Quality Assurance', descLen: 159, h1: 1, jsonLd: 0 },
  { path: '/culture/', title: 'Life at Nextloop', descLen: 123, h1: 1, jsonLd: 0 , minText: 1500 },
  { path: '/contact-us/', title: 'Contact Nextloop Technologies | Get in Touch for Custom IT Software Solutions', descLen: 191, h1: 1, jsonLd: 0 , fixed: 'was zero H1; the only heading on the page was an h2' },
  { path: '/cookies-policy/', title: 'Nextloop Technologies | Cookie Policy', descLen: 145, h1: 1, jsonLd: 0 , fixed: 'was 2 H1s — PageHero and the policy component both rendered the title' },
  { path: '/privacy/', title: 'Nextloop Technologies | Privacy Policy', descLen: 168, h1: 1, jsonLd: 0 , fixed: 'was 2 H1s — PageHero and the policy component both rendered the title' },
  { path: '/domain/', title: 'Industry Software Solutions | Fintech, Healthcare, Energy | Nextloop', h1: 1, jsonLd: 1, fixed: 'was a <div>Domain</div> stub with no title, description or H1' },
  { path: '/domain/fintech/', title: 'Fintech App & Software Development Company | Nextloop Technologies', descLen: 147, h1: 1, jsonLd: 0 , fixed: 'was 7 H1s — every shared Domains section heading was an h1' , minText: 3000 },
  { path: '/domain/healthcare/', title: 'Healthcare Software Development Services | Hire AI Health Developers', descLen: 173, h1: 1, jsonLd: 0 , fixed: 'was 8 H1s — every shared Domains section heading was an h1' , minText: 3000 },
  { path: '/domain/oil-and-gas/', title: 'Enterprise software development for oil and gas | Nextloop', descLen: 156, h1: 1, jsonLd: 0 , fixed: 'was 2 H1s' , minText: 3000 },
  { path: '/domain/food-and-beverages/', title: 'Food & Beverage Software Solutions | Nextloop Technologies', descLen: 156, h1: 1, jsonLd: 0 , fixed: 'was 7 H1s' , minText: 3000 },
  { path: '/domain/ecommerce/', title: 'E-commerce Development Services | Nextloop Technologies', descLen: 163, h1: 1, jsonLd: 0 , fixed: 'was zero H1: every component was dynamic({ssr:false}), so the server sent 695 chars of HTML — nav only' , minText: 3000 },
  { path: '/domain/events/', title: 'Build the Best Event Management Software using our Event Management Tools', descLen: 159, h1: 1, jsonLd: 0 , fixed: 'was 4 H1s' , minText: 3000 },
  { path: '/domain/hotel/', title: 'Hotel & Hospitality Software Development | Nextloop Technologies', h1: 1, jsonLd: 0, fixed: 'had no title or description; was 6 H1s' , minText: 3000 },
  { path: '/domain/travel-and-hospitality/', title: 'Hotel Management Software (PMS) & Custom Travel App Development Services', descLen: 155, h1: 1, jsonLd: 0 , fixed: 'was 6 H1s' , minText: 3000 },
  { path: '/get-offer/', title: 'Claim Your Offer | Nextloop Technologies', h1: 1, jsonLd: 0, fixed: 'had no title or description; was zero H1: one sentence split across two h2s to force a line break' , minText: 70 },
];

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
   .replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, d) => String.fromCharCode(d))
   .replace(/&#x27;|&apos;/g, "'");

const pick = (html, re) => { const m = html.match(re); return m ? m[1] : null; };

const results = [];
const record = (id, path, ok, detail) => results.push({ id, path, ok, detail });

for (const b of BASELINE) {
  let res, html;
  try {
    res = await fetch(BASE + b.path, { redirect: 'follow' });
    html = await res.text();
  } catch (e) {
    record('HTTP', b.path, false, `fetch failed: ${e.message}`);
    continue;
  }

  record('HTTP', b.path, res.status === 200, `status ${res.status} (expected 200)`);

  const rawTitle = pick(html, /<title[^>]*>([\s\S]*?)<\/title>/);
  const title = rawTitle === null ? null : decode(rawTitle).trim();
  record('TITLE', b.path, title === b.title,
    b.title === null ? `expected no title, got ${JSON.stringify(title)}`
                     : `got ${JSON.stringify(title)}`);

  if (b.descLen !== undefined) {
    // Measured RAW (HTML-encoded), matching how the baseline was captured.
    // Decoding here would shorten every `&amp;` by 4 chars and report false diffs.
    const d = pick(html, /<meta name="description" content="([\s\S]*?)"/);
    const len = d ? d.trim().length : 0;
    record('DESC', b.path, len === b.descLen, `length ${len}, baseline ${b.descLen}`);
  }

  if (b.h1 !== undefined) {
    const n = (html.match(/<h1[\s>]/g) || []).length;
    record('H1', b.path, n === b.h1, `${n} H1s, baseline ${b.h1}`);
  }

  // Server-rendered visible text: scripts stripped, tags stripped, whitespace
  // collapsed. The floor is deliberately well under the measured value — this
  // is here to catch a page collapsing to nav-only, not to police copy edits.
  const rendered = (html.match(/<body[^>]*>([\s\S]*)<\/body>/) || [, ''])[1]
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim().length;
  // Default floor catches a page collapsing to nav-only. The two /get-offer/
  // routes are standalone forms with no Layout, so they carry their own.
  const floor = b.minText ?? 350;
  record('SSR-TEXT', b.path, rendered >= floor, `${rendered} chars rendered, floor ${floor}`);

  if (b.jsonLd !== undefined) {
    const n = (html.match(/application\/ld\+json/g) || []).length;
    record('JSONLD', b.path, n === b.jsonLd, `${n} blocks, baseline ${b.jsonLd}`);
    if (n > 0) {
      const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
      let valid = true;
      for (const [, body] of blocks) { try { JSON.parse(body); } catch { valid = false; } }
      record('JSONLD-VALID', b.path, valid, valid ? 'parses' : 'invalid JSON');
    }
  }

  const canonical = pick(html, /rel="canonical" href="([^"]*)"/);
  record('CANONICAL', b.path, !!canonical, canonical || 'missing');

  // Was: assert zero OG tags. The site now ships them on every page, so the
  // assertion is inverted — a page losing them is the regression to catch.
  const og = (html.match(/property="og:/g) || []).length;
  record('OG', b.path, og >= 6, `${og} og: tags (expect >= 6)`);
  const tw = (html.match(/name="twitter:/g) || []).length;
  record('TWITTER', b.path, tw >= 4, `${tw} twitter: tags (expect >= 4)`);

  if (b.noindex) {
    record('NOINDEX', b.path, /name="robots" content="noindex/.test(html), 'must not be indexable');
  }
}

// Is a real database reachable? Several assertions below are meaningless without
// one: `/career/[id]` only 404s when a query returns zero rows, so against a
// placeholder Supabase URL it takes the error branch and returns 200.
const dbUp = await (async () => {
  try {
    const r = await fetch(BASE + '/career/999999/');
    return !(await r.text()).includes('fetch failed');
  } catch { return false; }
})();
if (!dbUp) {
  console.log('NOTE: no database reachable — DB-dependent checks skipped, not failed.');
  console.log('      Re-run against an environment with real Supabase credentials to cover them.\n');
}

// Routes that must 404
record('404', '/no-such-page-xyz/', (await fetch(BASE + '/no-such-page-xyz/')).status === 404, 'unknown route');
// The shared service-page component was living in pages/ and served as a route.
record('404', '/services/BaseServicePages/', (await fetch(BASE + '/services/BaseServicePages/')).status === 404, 'component must not be a route');
if (dbUp) {
  const r = await fetch(BASE + '/career/999999/', { redirect: 'follow' });
  record('404', '/career/999999/', r.status === 404, `status ${r.status} (expected 404)`);
} else {
  record('SKIP', '/career/999999/', true, 'needs a database');
}

// Static assets
for (const p of ['/robots.txt', '/favicon.ico', '/llm.txt', '/llm-full.txt']) {
  const r = await fetch(BASE + p);
  record('ASSET', p, r.status === 200, `status ${r.status}`);
}

// ---------------------------------------------------------------------------
// Sitemaps
//
// public/sitemap.xml was a hand-maintained file with 22 URLs and frozen lastmod
// dates. It is now four generated routes. Note these are served WITHOUT a
// trailing-slash redirect despite `trailingSlash: true` — Next exempts paths
// with a file extension, and that exemption is worth asserting: a 308 here
// would break every crawler that fetches the sitemap.
// ---------------------------------------------------------------------------

const SITEMAPS = ['/sitemap.xml', '/sitemap-pages.xml', '/sitemap-content.xml', '/sitemap-jobs.xml'];
const sitemapBodies = {};

for (const p of SITEMAPS) {
  const direct = await fetch(BASE + p, { redirect: 'manual' });
  record('SITEMAP', p, direct.status === 200, `status ${direct.status} (expected 200, not a redirect)`);
  record('SITEMAP-TYPE', p, (direct.headers.get('content-type') || '').includes('xml'),
    `content-type ${direct.headers.get('content-type')}`);
  const body = await direct.text();
  sitemapBodies[p] = body;
  // No XML parser here on purpose; a malformed doc should fail loudly and
  // cheaply. These are the two ways generated XML actually breaks.
  record('SITEMAP-XML', p, body.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'declaration present');
  record('SITEMAP-XML', p, !/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;)/.test(body), 'no unescaped ampersands');
}

// The index must name all three children.
for (const child of ['/sitemap-pages.xml', '/sitemap-content.xml', '/sitemap-jobs.xml']) {
  record('SITEMAP-INDEX', child, sitemapBodies['/sitemap.xml'].includes(child), 'listed in the index');
}

const pageLocs = [...sitemapBodies['/sitemap-pages.xml'].matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
record('SITEMAP-COUNT', '/sitemap-pages.xml', pageLocs.length === 27,
  `${pageLocs.length} URLs (was 22 hardcoded; expected 27)`);
record('SITEMAP-ABS', '/sitemap-pages.xml', pageLocs.every((l) => /^https?:\/\//.test(l)),
  'every loc is absolute');
record('SITEMAP-SLASH', '/sitemap-pages.xml',
  pageLocs.every((l) => new URL(l).pathname.endsWith('/')),
  'every loc ends in a slash, matching trailingSlash: true');

// The eight live pages the old sitemap omitted.
for (const p of ['/domain/', '/domain/ecommerce/', '/domain/events/', '/domain/hotel/',
                 '/domain/travel-and-hospitality/',
                 '/services/e-commerce-development/', '/services/software-testing-qa-services/']) {
  record('SITEMAP-ADDED', p, pageLocs.some((l) => new URL(l).pathname === p), 'was missing from the old sitemap');
}

// Pages that exist and are crawlable but must not be advertised.
for (const [p, why] of [
  ['/get-offer/specialoffers/', 'noindex; the URL carries applicant PII'],
  ['/get-offer/', 'thin lead-capture form — crawlable, deliberately not advertised'],
]) {
  record('SITEMAP-EXCLUDES', p, !pageLocs.some((l) => new URL(l).pathname === p), why);
}

// Every advertised static URL must actually answer 200 — a sitemap full of
// redirects or 404s is worse than no sitemap.
for (const loc of pageLocs) {
  const path = new URL(loc).pathname;
  const r = await fetch(BASE + path, { redirect: 'manual' });
  record('SITEMAP-LIVE', path, r.status === 200, `status ${r.status}`);
}

// A database failure must degrade to an empty urlset, never a 500.
for (const p of ['/sitemap-content.xml', '/sitemap-jobs.xml']) {
  record('SITEMAP-DEGRADE', p, sitemapBodies[p].includes('<urlset'), 'valid urlset even with no database');
}
if (dbUp) {
  const jobLocs = [...sitemapBodies['/sitemap-jobs.xml'].matchAll(/<loc>([^<]+)<\/loc>/g)];
  record('SITEMAP-JOBS', '/sitemap-jobs.xml', jobLocs.length > 0, `${jobLocs.length} job URLs`);
  const contentLocs = [...sitemapBodies['/sitemap-content.xml'].matchAll(/<loc>([^<]+)<\/loc>/g)];
  record('SITEMAP-CONTENT', '/sitemap-content.xml', contentLocs.length > 0, `${contentLocs.length} blog + case-study URLs`);
} else {
  record('SKIP', '/sitemap-jobs.xml', true, 'needs a database to have rows');
}

// robots.txt
const robots = await (await fetch(BASE + '/robots.txt')).text();
record('ROBOTS', 'sitemap', robots.includes('Sitemap:') && robots.includes('/sitemap.xml'), 'declares the sitemap');
record('ROBOTS', 'job sitemap', robots.includes('/sitemap-jobs.xml'), 'declares the job sitemap separately');
// robots.txt groups do not inherit: each named crawler needs its own Disallow.
for (const agent of ['Googlebot', 'Bingbot', 'GPTBot', 'PerplexityBot', 'ClaudeBot']) {
  const group = robots.split(/^User-agent:/m).find((g) => g.trim().startsWith(agent));
  record('ROBOTS-ADMIN', agent, !!group && group.includes('Disallow: /admin/'),
    'must block /admin/ in its own group');
}
record('ROBOTS-NOINDEX', '/get-offer/specialoffers/', !robots.includes('Disallow: /get-offer/specialoffers'),
  'must stay crawlable so its noindex tag can be seen');

// Security headers (next.config.js) — CSP compared as an exact string
const hdr = await fetch(BASE + '/');
for (const [h, expected] of [
  ['x-frame-options', 'SAMEORIGIN'],
  ['x-content-type-options', 'nosniff'],
  ['referrer-policy', 'strict-origin-when-cross-origin'],
  ['strict-transport-security', 'max-age=63072000; includeSubDomains; preload'],
]) {
  record('HEADER', h, hdr.headers.get(h) === expected, `got ${hdr.headers.get(h)}`);
}
record('HEADER', 'content-security-policy', !!hdr.headers.get('content-security-policy'), 'present');
record('HEADER', 'x-powered-by absent', !hdr.headers.get('x-powered-by'), 'poweredByHeader:false');

// /get-offer/specialoffers/ used to render an empty shell, fetch its offers
// from the browser with the anon key, and only then bounce a visitor who
// arrived without `application_detail`. The fetch and the bounce are both
// server-side now, so the bare URL redirects before anything renders. It was
// previously baselined as a 200 with a noindex tag; a redirect is strictly
// better — there is no page to keep out of the index.
{
  const bare = await fetch(BASE + '/get-offer/specialoffers/', { redirect: 'manual' });
  record('REDIRECT', '/get-offer/specialoffers/', [302, 307, 308].includes(bare.status),
    `status ${bare.status} (expected a redirect when application_detail is absent)`);
  const target = bare.headers.get('location') ?? '';
  record('REDIRECT-TARGET', '/get-offer/specialoffers/', target.endsWith('/get-offer/'),
    `-> ${target}`);
}

// trailingSlash redirect
const noSlash = await fetch(BASE + '/about-us', { redirect: 'manual' });
record('TRAILING-SLASH', '/about-us', [301, 308].includes(noSlash.status),
  `status ${noSlash.status} (expected 308)`);

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed\n`);
if (failed.length) {
  console.log('FAILURES:');
  for (const f of failed) console.log(`  [${f.id}] ${f.path} — ${f.detail}`);
  process.exit(1);
}
console.log('All automated baseline checks match.');
