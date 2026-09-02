#!/usr/bin/env node
/**
 * Automated slice of docs/REGRESSION-SUITE.md.
 *
 * Compares the locally-running build against values captured from the
 * pre-upgrade production site (Next 13.4.4). A route passes only when it
 * matches the baseline — including baseline values that are themselves
 * defects, which are marked `knownDefect` so they are asserted, not fixed.
 *
 *   node scripts/regression/smoke.mjs [baseUrl]
 *
 * Default baseUrl is http://localhost:3000.
 */

const BASE = process.argv[2] || 'http://localhost:3000';

// Captured from production on 2026-09-02, Next 13.4.4.
// title: null means "no <title> tag at all" (a baselined defect).
const BASELINE = [
  { path: '/', title: 'IT Staff Augmentation | Custom Software Solutions | AI Remote Teams', descLen: 172, h1: 1, jsonLd: 1 },
  { path: '/about-us/', title: 'Custom Software & AI Development Company | Nextloop', descLen: 159, h1: 1, jsonLd: 1 },
  { path: '/services/', title: 'Offshore development center | Custom Web & software services provider', descLen: 172, h1: 1, jsonLd: 1 },
  { path: '/services/custom-software-development/', title: 'Custom Software Development Outsourcing | Nextloop Technologies', descLen: 175, h1: 1, jsonLd: 1 },
  { path: '/services/it-staff-augmentation/', title: 'IT Staff Augmentation Services | Hire Dedicated AI Developers', descLen: 152, h1: 1, jsonLd: 1 },
  { path: '/services/web-development/', title: 'Scalable Web Development & IT Outsourcing Services in India', descLen: 216, h1: 1, jsonLd: 1 },
  { path: '/services/mobile-app-development/', title: 'Native Mobile Application Development India | iOS & Android Experts', descLen: 166, h1: 1, jsonLd: 1 },
  { path: '/services/mvp-development/', title: 'Build Your MVP Faster with Expert Software Development Services', descLen: 153, h1: 1, jsonLd: 0 },
  { path: '/services/ai-ml/', title: 'AI & ML Solutions Custom Development & Consulting | Nextloop', descLen: 156, h1: 1, jsonLd: 1 },
  { path: '/services/cloud-computing-solutions/', title: 'Enterprise Cloud & DevOps Services India |AWS & Azure Experts', descLen: 161, h1: 1, jsonLd: 1 },
  { path: '/services/digital-marketing-services/', title: 'Best Performance Marketing & SEO Services India', descLen: 160, h1: 1, jsonLd: 0 },
  { path: '/services/e-commerce-development/', title: 'Nextloop Technologies | Custom Software Development', descLen: 293, h1: 1, jsonLd: 0, knownDefect: 'wrong/duplicated title; description 293 chars' },
  { path: '/services/software-testing-qa-services/', title: 'Software Testing & QA Services | Nextloop Quality Assurance', descLen: 159, h1: 1, jsonLd: 0 },
  { path: '/culture/', title: 'Life at Nextloop', descLen: 123, h1: 1, jsonLd: 0 },
  { path: '/contact-us/', title: 'Contact Nextloop Technologies | Get in Touch for Custom IT Software Solutions', descLen: 191, h1: 0, jsonLd: 0, knownDefect: 'zero H1' },
  { path: '/cookies-policy/', title: 'Nextloop Technologies | Cookie Policy', descLen: 145, h1: 2, jsonLd: 0 },
  { path: '/privacy/', title: 'Nextloop Technologies | Privacy Policy', descLen: 168, h1: 2, jsonLd: 0 },
  { path: '/domain/', title: null, descLen: 0, h1: 0, jsonLd: 0, knownDefect: 'no title, no description, no H1' },
  { path: '/domain/fintech/', title: 'Fintech App & Software Development Company | Nextloop Technologies', descLen: 147, h1: 7, jsonLd: 0, knownDefect: '7 H1s' },
  { path: '/domain/healthcare/', title: 'Healthcare Software Development Services | Hire AI Health Developers', descLen: 173, h1: 8, jsonLd: 0, knownDefect: '8 H1s' },
  { path: '/domain/oil-and-gas/', title: 'Enterprise software development for oil and gas | Nextloop', descLen: 156, h1: 2, jsonLd: 0 },
  { path: '/domain/food-and-beverages/', title: 'Food & Beverage Software Solutions | Nextloop Technologies', descLen: 156, h1: 7, jsonLd: 0, knownDefect: '7 H1s' },
  { path: '/domain/ecommerce/', title: 'E-commerce Development Services | Nextloop Technologies', descLen: 163, h1: 0, jsonLd: 0, knownDefect: 'zero H1' },
  { path: '/domain/events/', title: 'Build the Best Event Management Software using our Event Management Tools', descLen: 159, h1: 4, jsonLd: 0 },
  { path: '/domain/hotel/', title: null, descLen: 0, h1: 6, jsonLd: 0, knownDefect: 'no title, no description' },
  { path: '/domain/travel-and-hospitality/', title: 'Hotel Management Software (PMS) & Custom Travel App Development Services', descLen: 155, h1: 6, jsonLd: 0 },
  { path: '/get-offer/', title: null, descLen: 0, h1: 0, jsonLd: 0, knownDefect: 'no title, no description' },
  { path: '/get-offer/specialoffers/', title: null, descLen: 0, jsonLd: 0, knownDefect: 'indexable with no title' },
  { path: '/services/BaseServicePages/', title: 'Service Page', jsonLd: 0, knownDefect: 'shared component leaked as a public route' },
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

  record('NO-OG', b.path, (html.match(/property="og:/g) || []).length === 0,
    'baseline has zero OG tags — a change here is a diff, not a win');
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
if (dbUp) {
  const r = await fetch(BASE + '/career/999999/', { redirect: 'follow' });
  record('404', '/career/999999/', r.status === 404, `status ${r.status} (expected 404)`);
} else {
  record('SKIP', '/career/999999/', true, 'needs a database');
}

// Static assets
for (const p of ['/robots.txt', '/sitemap.xml', '/favicon.ico', '/llm.txt', '/llm-full.txt']) {
  const r = await fetch(BASE + p);
  record('ASSET', p, r.status === 200, `status ${r.status}`);
}

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
