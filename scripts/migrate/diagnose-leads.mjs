/**
 * Why did those lead rows not migrate?
 *
 *   node --env-file=.env.local scripts/migrate/diagnose-leads.mjs
 *
 * Reads the checkpoint, works out which source rows never got written, then
 * checks each one against the constraints its Payload collection declares.
 * Prints a reason per row and a tally at the end.
 *
 * Values are redacted: it reports that an email is malformed and shows its
 * shape, not the address. These are real people's contact details and there is
 * no reason for them to be on screen to answer "which constraint failed".
 */

import { readFileSync, existsSync } from 'node:fs';

const U = process.env.NEXT_PUBLIC_SUPABASE_URL;
const K = process.env.SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!U || !K) { console.error('run with --env-file=.env.local'); process.exit(2); }
const h = { apikey: K, Authorization: 'Bearer ' + K };

const STATE = '.migrate-state.json';
if (!existsSync(STATE)) { console.error('no .migrate-state.json — nothing to compare against'); process.exit(2); }
const done = (JSON.parse(readFileSync(STATE, 'utf8')).done) || {};

/** PostgREST caps an unbounded response at 1000 rows. Always page. */
const allRows = async (table, select = '*') => {
  const out = [];
  for (let from = 0; ; from += 1000) {
    const res = await fetch(`${U}/rest/v1/${table}?select=${select}&order=id.asc`, {
      headers: { ...h, Range: `${from}-${from + 999}` },
    });
    if (!res.ok) throw new Error(`${table}: HTTP ${res.status}`);
    const rows = await res.json();
    out.push(...rows);
    if (rows.length < 1000) return out;
  }
};

/**
 * Payload's `email` field type validates format. Production forms have been
 * collecting whatever people typed for years, so this is the first thing to
 * suspect on a lead table.
 */
const EMAIL_OK = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;

const shape = (v) => {
  if (v === null || v === undefined) return 'NULL';
  if (typeof v !== 'string') return `${typeof v}`;
  if (v.trim() === '') return 'empty string';
  // Show the structure, never the value.
  return `"${v.replace(/[a-zA-Z]/g, 'a').replace(/[0-9]/g, '9').slice(0, 40)}" (${v.length} chars)`;
};

const TABLES = [
  { table: 'enquiry', collection: 'enquiries', required: { fullname: 'fullname', email: 'email', subject: 'subject' }, emails: ['email'] },
  { table: 'popup_form', collection: 'popup-submissions', required: { name: 'name', email: 'email', service: 'service' }, emails: ['email'] },
  { table: 'offer_applications', collection: 'offer-applications', required: { name: 'name', email: 'email', mobile: 'mobile' }, emails: ['email'] },
  { table: 'applied_jobs', collection: 'applied-jobs', required: { fullname: 'fullname', email: 'email', phone: 'phone' }, emails: ['email'] },
];

const tally = {};

for (const { table, collection, required, emails } of TABLES) {
  const written = new Set(done[table] || []);
  if (!written.size) { console.log(`\n${table}: nothing migrated yet, skipping`); continue; }

  const rows = await allRows(table);
  const missing = rows.filter((r) => !written.has(String(r.id)));
  if (!missing.length) { console.log(`\n${table}: all ${rows.length} rows written`); continue; }

  console.log(`\n${table} -> ${collection}: ${missing.length} of ${rows.length} not written\n`);

  for (const row of missing) {
    const reasons = [];
    for (const col of Object.keys(required)) {
      const v = row[col];
      if (v === null || v === undefined || (typeof v === 'string' && v.trim() === '')) {
        reasons.push(`${col} is required but ${shape(v)}`);
      }
    }
    for (const col of emails) {
      const v = row[col];
      if (typeof v === 'string' && v.trim() !== '' && !EMAIL_OK.test(v.trim())) {
        reasons.push(`${col} is not a valid address: ${shape(v)}`);
      }
    }
    if (!reasons.length) reasons.push('no declared constraint violated — look at the migration FAILED line for this id');
    for (const r of reasons) tally[r.replace(/:.*/, '')] = (tally[r.replace(/:.*/, '')] || 0) + 1;
    console.log(`  id=${String(row.id).slice(0, 38).padEnd(38)} ${reasons.join(' | ')}`);
  }
}

console.log('\n' + '='.repeat(66));
console.log('\nreasons, by frequency:\n');
for (const [r, n] of Object.entries(tally).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${r}`);
}
console.log(`
These are rows production accepted and Payload will not. That is a real
difference, not a migration bug: the old forms had no validation, so years of
submissions carry blank required fields and addresses that are not addresses.

Three options, and it is a judgement call, not a technical one:

  relax      drop `required` on the fields that historical data does not have,
             and change `email` to `text`. Everything migrates. You lose
             validation on new submissions too, which is how the mess started.
  repair     fix the rows in the source before migrating. Right for a handful,
             not for hundreds.
  quarantine keep the constraints, migrate what passes, and export the rest to
             a file so nothing is lost and someone can decide per row.
`);
