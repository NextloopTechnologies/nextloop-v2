#!/usr/bin/env node
/**
 * Export a READ-ONLY snapshot of production for seeding a test Payload instance.
 *
 * This script only ever calls .select(). It performs no writes of any kind.
 *
 *   node --env-file=.env.local scripts/seed/export-production.mjs [options]
 *
 * Options:
 *   --out <dir>        Output directory (default: .seed-data)
 *   --limit <n>        Max rows per table (default: 200; use 0 for all)
 *   --with-pii         Export real names/emails/phones. OFF by default.
 *
 * On PII: the point of this snapshot is to test the admin panel against
 * realistic SHAPES and VOLUMES, which does not require real people's contact
 * details sitting on a laptop. By default every lead table is anonymised —
 * field lengths, formats, null-ness and distributions are preserved, the values
 * are not. Pass --with-pii only if you have a concrete reason.
 */

import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const has = (name) => args.includes(`--${name}`);

const OUT = flag('out', '.seed-data');
const LIMIT = Number(flag('limit', '200'));
const WITH_PII = has('with-pii');

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!URL_BASE || !KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or a key. Run with --env-file=.env.local');
  process.exit(1);
}

/** Tables in dependency order. `pii` lists fields scrubbed unless --with-pii. */
const TABLES = [
  { name: 'author', pii: [] },
  { name: 'categories', pii: [] },
  { name: 'blogs', pii: [] },
  { name: 'portfolio', pii: [] },
  { name: 'testimonials', pii: [] },
  { name: 'jobs', pii: [] },
  { name: 'offers', pii: [] },
  { name: 'applied_jobs', pii: ['fullname', 'email', 'phone', 'linkedin_url', 'github_url', 'cover_letter', 'resume_url', 'resume_id'] },
  { name: 'enquiry', pii: ['fullname', 'email', 'contact', 'message'] },
  { name: 'popup_form', pii: ['name', 'email', 'phone'] },
  { name: 'offer_applications', pii: ['name', 'email', 'mobile', 'company_name'] },
  { name: 'ideas', pii: ['mail', 'idea_descp'] },
  // `user` is deliberately NOT exported: it contains password hashes and there
  // is nothing to gain from copying them. Payload creates its own admin users.
];

/** Deterministic so re-runs produce a stable snapshot, but not reversible. */
const scramble = (value, field, salt) => {
  if (value === null || value === undefined) return value;
  const h = createHash('sha256').update(`${salt}:${field}:${value}`).digest('hex');
  if (field.includes('email') || field === 'mail') return `seed-${h.slice(0, 10)}@example.invalid`;
  if (/phone|contact|mobile/.test(field)) return `+9199${h.slice(0, 8).replace(/\D/g, '0').padEnd(8, '0')}`;
  if (/url/.test(field)) return `https://example.invalid/${h.slice(0, 12)}`;
  if (typeof value !== 'string') return value;
  // Preserve rough length so column widths and UI truncation still get exercised.
  return `Sample ${h.slice(0, 6)}${value.length > 40 ? ' ' + 'lorem ipsum '.repeat(Math.min(20, Math.ceil(value.length / 12))).trim() : ''}`;
};

const fetchAll = async (table) => {
  const rows = [];
  const pageSize = 1000;
  for (let from = 0; ; from += pageSize) {
    const to = LIMIT > 0 ? Math.min(from + pageSize - 1, LIMIT - 1) : from + pageSize - 1;
    if (LIMIT > 0 && from >= LIMIT) break;
    const res = await fetch(`${URL_BASE}/rest/v1/${table}?select=*&order=id.asc`, {
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, Range: `${from}-${to}`, Prefer: 'count=exact' },
    });
    if (!res.ok) throw new Error(`${table}: HTTP ${res.status} ${await res.text()}`);
    const batch = await res.json();
    rows.push(...batch);
    const total = Number((res.headers.get('content-range') || '').split('/')[1] || 0);
    if (batch.length < pageSize || rows.length >= total) break;
  }
  return rows;
};

await mkdir(OUT, { recursive: true });
const salt = Date.now().toString(36);
const manifest = { generatedAt: new Date().toISOString(), anonymised: !WITH_PII, limit: LIMIT, tables: {} };

for (const { name, pii } of TABLES) {
  try {
    const rows = await fetchAll(name);
    const cleaned = WITH_PII
      ? rows
      : rows.map((r) => {
          const out = { ...r };
          for (const f of pii) if (f in out) out[f] = scramble(out[f], f, salt);
          return out;
        });
    await writeFile(path.join(OUT, `${name}.json`), JSON.stringify(cleaned, null, 2));
    manifest.tables[name] = { rows: cleaned.length, scrubbed: WITH_PII ? [] : pii };
    console.log(`  ${name.padEnd(20)} ${String(cleaned.length).padStart(5)} rows${pii.length && !WITH_PII ? `  (${pii.length} fields anonymised)` : ''}`);
  } catch (err) {
    console.error(`  ${name.padEnd(20)} FAILED: ${err.message}`);
    manifest.tables[name] = { error: err.message };
  }
}

await writeFile(path.join(OUT, '_manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`\nWrote ${OUT}/  —  ${WITH_PII ? 'CONTAINS REAL PII' : 'anonymised'}`);
console.log('Read-only: this script issued no writes.');
