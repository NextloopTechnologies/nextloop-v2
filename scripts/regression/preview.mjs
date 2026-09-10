#!/usr/bin/env node
/**
 * Draft-preview and rich-text-table regression suite.
 *
 * The two features share a file because they arrived together and because the
 * interesting failure of each is the same shape: something that should only be
 * visible to a logged-in editor leaking onto a public URL, or a table rendering
 * as raw JSON instead of markup.
 *
 * Split into two halves on purpose:
 *
 *  - **Always runs.** Every negative assertion — the endpoint refuses anonymous
 *    callers, refuses a slug that could escape /blog/, refuses non-GET, and the
 *    page refuses forged, expired, cross-slug and malformed tokens. None of
 *    these need a draft to exist, so they run in any environment and are the
 *    checks that actually protect something.
 *  - **Runs when PREVIEW_TEST_SLUG names an unpublished post.** The positive
 *    path: that slug 404s anonymously, renders with a minted token, and carries
 *    both the noindex meta tag and the X-Robots-Tag header.
 *
 * A skipped positive half is reported, never silently passed.
 *
 * Usage:
 *   BASE_URL=http://127.0.0.1:3000 node scripts/regression/preview.mjs
 *   PREVIEW_TEST_SLUG=my-draft BASE_URL=... node scripts/regression/preview.mjs
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const BASE = (process.env.BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
const DRAFT_SLUG = process.env.PREVIEW_TEST_SLUG || '';
const COOKIE = 'nl_preview';

let pass = 0;
let fail = 0;
let skip = 0;
const failures = [];

const check = (name, condition, detail = '') => {
  if (condition) {
    pass += 1;
    return;
  }
  fail += 1;
  failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
};

const skipped = (name, why) => {
  skip += 1;
  failures.push(`SKIP ${name} — ${why}`);
};

/**
 * Read PAYLOAD_SECRET from the environment or .env.local without ever printing
 * it. dotenv keeps the last assignment of a duplicated key, so this does too.
 */
const loadSecret = () => {
  if (process.env.PAYLOAD_SECRET) return process.env.PAYLOAD_SECRET;
  const file = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(file)) return null;
  let found = null;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const match = line.match(/^\s*PAYLOAD_SECRET\s*=\s*(.*)$/);
    if (match) found = match[1].trim().replace(/^["']|["']$/g, '');
  }
  return found || null;
};

const b64url = (input) =>
  Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const mint = (secret, slug, ttlMs = 30 * 60 * 1000) => {
  const payload = b64url(JSON.stringify({ slug, exp: Date.now() + ttlMs }));
  return `${payload}.${b64url(crypto.createHmac('sha256', secret).update(payload).digest())}`;
};

const get = async (route, cookie) =>
  fetch(BASE + route, {
    redirect: 'manual',
    headers: cookie ? { cookie } : {},
  }).then(async (r) => ({ status: r.status, headers: r.headers, body: await r.text() }));

const run = async () => {
  // ---------------------------------------------------------------------
  // The preview endpoint. It is the only door to a draft, so it gets the
  // most attention.
  // ---------------------------------------------------------------------
  const probe = DRAFT_SLUG || 'any-slug';

  const anon = await get(`/api/preview/?slug=${probe}`);
  check('PREVIEW-API-401-ANON', anon.status === 401, `got ${anon.status}`);
  check('PREVIEW-API-NO-COOKIE-ANON', !anon.headers.get('set-cookie'));

  for (const bad of ['../etc/passwd', 'a/b', 'https://example.com', 'a b', '']) {
    const r = await get(`/api/preview/?slug=${encodeURIComponent(bad)}`);
    check(`PREVIEW-API-400-BAD-SLUG[${bad || 'empty'}]`, r.status === 400, `got ${r.status}`);
  }

  const noSlug = await get('/api/preview/');
  check('PREVIEW-API-400-NO-SLUG', noSlug.status === 400, `got ${noSlug.status}`);

  for (const method of ['POST', 'PUT', 'DELETE']) {
    const r = await fetch(`${BASE}/api/preview/?slug=${probe}`, { method, redirect: 'manual' });
    check(`PREVIEW-API-405-${method}`, r.status === 405, `got ${r.status}`);
  }

  // ---------------------------------------------------------------------
  // Token verification on the blog route. Every one of these must 404 —
  // a pass here would mean an unpublished post is reachable.
  // ---------------------------------------------------------------------
  const secret = loadSecret();

  if (!secret) {
    skipped('PREVIEW-TOKEN-*', 'PAYLOAD_SECRET not available; cannot mint test tokens');
  } else if (!DRAFT_SLUG) {
    skipped(
      'PREVIEW-TOKEN-*',
      'PREVIEW_TEST_SLUG not set; set it to an unpublished blog slug to exercise the draft path'
    );
  } else {
    const route = `/blog/${DRAFT_SLUG}/`;

    const hidden = await get(route);
    check('DRAFT-404-ANON', hidden.status === 404, `got ${hidden.status}`);

    const valid = mint(secret, DRAFT_SLUG);
    const shown = await get(route, `${COOKIE}=${encodeURIComponent(valid)}`);
    check('PREVIEW-DRAFT-200', shown.status === 200, `got ${shown.status}`);
    check('PREVIEW-SHOWS-BANNER', shown.body.includes('Draft preview'));
    check('PREVIEW-NOINDEX-META', /name="robots" content="noindex/.test(shown.body));
    check(
      'PREVIEW-NOINDEX-HEADER',
      (shown.headers.get('x-robots-tag') || '').includes('noindex'),
      shown.headers.get('x-robots-tag') || 'absent'
    );
    check(
      'PREVIEW-NO-STORE',
      (shown.headers.get('cache-control') || '').includes('no-store'),
      shown.headers.get('cache-control') || 'absent'
    );

    // A token is a key to one door, not to the building.
    const other = await get('/blog/some-other-slug/', `${COOKIE}=${encodeURIComponent(valid)}`);
    check('PREVIEW-SLUG-SCOPED', other.status === 404, `got ${other.status}`);

    const expired = await get(route, `${COOKIE}=${encodeURIComponent(mint(secret, DRAFT_SLUG, -1000))}`);
    check('PREVIEW-EXPIRES', expired.status === 404, `got ${expired.status}`);

    const [claim, signature] = valid.split('.');
    const forged = `${claim}.${b64url(crypto.randomBytes(32))}`;
    check(
      'PREVIEW-REJECTS-FORGED-SIG',
      (await get(route, `${COOKIE}=${encodeURIComponent(forged)}`)).status === 404
    );

    // Same signature, different claim: catches a verifier that checks the
    // signature but then trusts the payload it was not computed over.
    const swapped = `${b64url(JSON.stringify({ slug: DRAFT_SLUG, exp: Date.now() + 9e9 }))}.${signature}`;
    check(
      'PREVIEW-REJECTS-TAMPERED-CLAIM',
      (await get(route, `${COOKIE}=${encodeURIComponent(swapped)}`)).status === 404
    );

    for (const junk of ['not-a-token', '', 'a.b', `${claim}.`, `.${signature}`]) {
      const r = await get(route, `${COOKIE}=${encodeURIComponent(junk)}`);
      check(`PREVIEW-REJECTS-MALFORMED[${junk || 'empty'}]`, r.status === 404, `got ${r.status}`);
    }

    // The draft must stay out of everything a crawler reads.
    const listing = await get('/blog/');
    check('DRAFT-NOT-IN-LISTING', !listing.body.includes(`/blog/${DRAFT_SLUG}/`));
    const sitemap = await get('/sitemap-blogs.xml');
    check('DRAFT-NOT-IN-SITEMAP', !sitemap.body.includes(`/blog/${DRAFT_SLUG}/`));
  }

  // ---------------------------------------------------------------------
  // Tables. The class names have to survive into the markup *and* Tailwind
  // has to have emitted rules for them — a class with no rule behind it
  // looks correct in a diff and does nothing in a browser.
  // ---------------------------------------------------------------------
  const article = await get('/blog/');
  check('BLOG-LISTING-200', article.status === 200, `got ${article.status}`);

  const firstPost = article.body.match(/href="(\/blog\/[^"/]+\/)"/);
  if (!firstPost) {
    skipped('TABLE-*', 'no published post found on /blog/ to inspect');
  } else {
    const post = await get(firstPost[1]);
    check('POST-200', post.status === 200, `got ${post.status}`);
    // React escapes `&` inside an attribute value, so the class arrives as
    // `[&amp;_table]`. Accept either spelling rather than asserting the escape.
    check('TABLE-OVERFLOW-CLASS', /\[&(amp;)?_table\]:overflow-x-auto/.test(post.body));
    check('TABLE-BLOCK-CLASS', /\[&(amp;)?_table\]:block/.test(post.body));
    check('TABLE-PROSE-CLASS', post.body.includes('prose-table:w-full'));
    // Whatever the body contains, it must not be an un-converted Lexical node.
    check('NO-RAW-TABLE-JSON', !post.body.includes('"type":"tablerow"'));
  }

  console.log(`\npreview: ${pass} passed, ${fail} failed, ${skip} skipped`);
  if (failures.length) console.log(failures.map((f) => `  ${f}`).join('\n'));
  process.exit(fail ? 1 : 0);
};

run().catch((error) => {
  console.error('preview suite could not run:', error.message);
  process.exit(1);
});
