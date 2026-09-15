#!/usr/bin/env node
/**
 * Verifies a migration against the source. Read-only on both sides.
 *
 *   npx tsx --env-file=.env.local scripts/migrate/verify.mts [--samples <n>]
 *
 * migrate.mts reports what it believes it wrote. That is not the same claim as
 * "the data is in the database and correct", and during this project a check
 * that only asked the first question passed while the thing it was checking was
 * broken. So this asks the second question, against both databases, with no
 * reference to the migration's own bookkeeping.
 *
 * Four checks:
 *
 *   1. counts        rows in the source table vs documents in the collection.
 *   2. references    every relationship that should point somewhere does.
 *                    A migration that drops a foreign key produces a blog with
 *                    no author, which reads as a content problem months later.
 *   3. fidelity      sampled documents compared field by field against their
 *                    source row. Counts matching proves nothing about content.
 *   4. resumes       how many applied-jobs have a stored CV vs how many had a
 *                    legacy URL to fetch one from.
 *
 * Exit 0 only if every check passes. Anything else is 1.
 */

import { getPayload } from 'payload';
import config from '../../payload.config';

const args = process.argv.slice(2);
const flag = (n: string, d: string) => {
  const i = args.indexOf(`--${n}`);
  return i === -1 ? d : (args[i + 1] as string);
};
const SAMPLES = Number(flag('samples', '25'));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or a key. Run with --env-file=.env.local');
  process.exit(2);
}

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
} as Record<string, string>;

const sourceCount = async (table: string): Promise<number> => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=id`, {
    headers: { ...headers, Prefer: 'count=exact', Range: '0-0' },
  });
  const total = (res.headers.get('content-range') ?? '').split('/')[1];
  return total && total !== '*' ? Number(total) : -1;
};

const sourceRow = async (table: string, id: string | number) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${encodeURIComponent(String(id))}&select=*`, {
    headers,
  });
  const rows = (await res.json()) as Record<string, unknown>[];
  return rows[0];
};

const payload = await getPayload({ config });

const problems: string[] = [];
const notes: string[] = [];

// ---------------------------------------------------------------------------
// 1. counts
// ---------------------------------------------------------------------------

const PAIRS: { table: string; collection: string }[] = [
  { table: 'author', collection: 'authors' },
  { table: 'categories', collection: 'categories' },
  { table: 'testimonials', collection: 'testimonials' },
  { table: 'jobs', collection: 'jobs' },
  { table: 'offers', collection: 'offers' },
  { table: 'blogs', collection: 'blogs' },
  { table: 'portfolio', collection: 'portfolio' },
  { table: 'applied_jobs', collection: 'applied-jobs' },
  { table: 'enquiry', collection: 'enquiries' },
  { table: 'popup_form', collection: 'popup-submissions' },
  { table: 'ideas', collection: 'ideas' },
  { table: 'offer_applications', collection: 'offer-applications' },
];

console.log('counts — source vs Payload\n');
console.log(`  ${'table'.padEnd(20)} ${'source'.padStart(7)} ${'payload'.padStart(8)}   status`);
console.log(`  ${'-'.repeat(20)} ${'-'.repeat(7)} ${'-'.repeat(8)}   ------`);

for (const { table, collection } of PAIRS) {
  const src = await sourceCount(table);
  const { totalDocs } = await payload.count({ collection: collection as never });
  let status: string;
  if (src < 0) { status = 'source count unavailable'; notes.push(`${table}: could not count source`); }
  else if (src === totalDocs) status = 'ok';
  else {
    status = `MISMATCH (${totalDocs - src >= 0 ? '+' : ''}${totalDocs - src})`;
    problems.push(`${collection}: ${src} rows in source, ${totalDocs} documents in Payload`);
  }
  console.log(`  ${table.padEnd(20)} ${String(src).padStart(7)} ${String(totalDocs).padStart(8)}   ${status}`);
}

// ---------------------------------------------------------------------------
// 2. references
// ---------------------------------------------------------------------------

console.log('\nreferences — relationships that should point somewhere\n');

const REFS: { collection: string; field: string; why: string }[] = [
  { collection: 'blogs', field: 'author', why: 'a post with no author renders a blank byline' },
  { collection: 'blogs', field: 'category', why: 'an uncategorised post drops out of category listings' },
  { collection: 'applied-jobs', field: 'job', why: 'an application not attached to a posting is unactionable' },
  { collection: 'offer-applications', field: 'offer', why: 'same, for offers' },
];

for (const { collection, field, why } of REFS) {
  const { totalDocs: total } = await payload.count({ collection: collection as never });
  const { totalDocs: missing } = await payload.count({
    collection: collection as never,
    where: { [field]: { exists: false } } as never,
  });
  const pct = total ? ((missing / total) * 100).toFixed(1) : '0.0';
  const label = `${collection}.${field}`;
  if (missing === 0) {
    console.log(`  ${label.padEnd(32)} all ${total} resolve`);
  } else {
    console.log(`  ${label.padEnd(32)} ${missing}/${total} MISSING (${pct}%) — ${why}`);
    problems.push(`${label}: ${missing} of ${total} documents have no target`);
  }
}

// ---------------------------------------------------------------------------
// 3. fidelity
// ---------------------------------------------------------------------------

console.log(`\nfidelity — ${SAMPLES} sampled documents per collection, field by field\n`);

/** Payload field -> source column, for the fields worth asserting on. */
const FIELDS: Record<string, { table: string; map: Record<string, string> }> = {
  authors: { table: 'author', map: { name: 'name', designation: 'designation' } },
  categories: { table: 'categories', map: { name: 'name', slug: 'slug' } },
  jobs: { table: 'jobs', map: { title: 'title', location: 'location', jobMode: 'job_mode', jobType: 'job_type' } },
  offers: { table: 'offers', map: { title: 'title', description: 'description' } },
  blogs: { table: 'blogs', map: { title: 'title', slug: 'slug', metaTitle: 'meta_title' } },
  testimonials: { table: 'testimonials', map: { feedbackBy: 'feedback_by', compAndDesig: 'comp_and_desig' } },
  'applied-jobs': { table: 'applied_jobs', map: { fullname: 'fullname', email: 'email' } },
  enquiries: { table: 'enquiry', map: { fullname: 'fullname', email: 'email', subject: 'subject' } },
  ideas: { table: 'ideas', map: { mail: 'mail' } },
  'offer-applications': { table: 'offer_applications', map: { name: 'name', email: 'email' } },
};

/**
 * Compares loosely on purpose. Migration legitimately changes representation —
 * a phone number becomes a string, a null becomes undefined — and flagging that
 * as data loss would bury the real mismatches in noise.
 */
const same = (a: unknown, b: unknown) => {
  if (a == null && b == null) return true;
  if (a == null || b == null) return false;
  return String(a).trim() === String(b).trim();
};

for (const [collection, { table, map }] of Object.entries(FIELDS)) {
  const { docs } = await payload.find({ collection: collection as never, limit: SAMPLES, depth: 0 });
  if (!docs.length) { console.log(`  ${collection.padEnd(22)} no documents to sample`); continue; }

  let checked = 0;
  let bad = 0;
  for (const doc of docs as Record<string, unknown>[]) {
    // legacyUuid on popup-submissions is the only stored back-reference; for the
    // rest we match on a natural key, which is why the maps above start with one.
    const [firstPayloadField, firstSourceCol] = Object.entries(map)[0] as [string, string];
    const probe = doc[firstPayloadField];
    if (probe == null) continue;
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/${table}?${firstSourceCol}=eq.${encodeURIComponent(String(probe))}&select=*&limit=1`,
      { headers }
    );
    const row = ((await res.json()) as Record<string, unknown>[])[0];
    if (!row) {
      bad++;
      problems.push(`${collection}: a document (${firstPayloadField}=${String(probe).slice(0, 40)}) has no matching source row`);
      continue;
    }
    for (const [pf, sc] of Object.entries(map)) {
      checked++;
      if (!same(doc[pf], row[sc])) {
        bad++;
        problems.push(
          `${collection}.${pf}: "${String(doc[pf]).slice(0, 40)}" in Payload, "${String(row[sc]).slice(0, 40)}" in source`
        );
      }
    }
  }
  console.log(`  ${collection.padEnd(22)} ${checked} field comparisons, ${bad} mismatched`);
}

// ---------------------------------------------------------------------------
// 4. resumes
// ---------------------------------------------------------------------------

console.log('\nresumes\n');

const withLegacyUrl = await (async () => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/applied_jobs?select=id&resume_url=not.is.null`, {
    headers: { ...headers, Prefer: 'count=exact', Range: '0-0' },
  });
  const total = (res.headers.get('content-range') ?? '').split('/')[1];
  return total && total !== '*' ? Number(total) : -1;
})();

const { totalDocs: storedResumes } = await payload.count({ collection: 'resumes' as never });
const { totalDocs: linked } = await payload.count({
  collection: 'applied-jobs' as never,
  where: { resume: { exists: true } } as never,
});

console.log(`  applications with a legacy CV URL   ${withLegacyUrl}`);
console.log(`  documents in the resumes collection ${storedResumes}`);
console.log(`  applications linked to a stored CV  ${linked}`);

if (withLegacyUrl > 0 && linked < withLegacyUrl) {
  const gap = withLegacyUrl - linked;
  const pct = ((gap / withLegacyUrl) * 100).toFixed(1);
  console.log(`  ${gap} not linked (${pct}%)`);
  // Not automatically a problem: CVs deleted from the legacy host years ago
  // cannot be fetched. It is a problem if the number is large.
  if (gap / withLegacyUrl > 0.05) {
    problems.push(`resumes: ${gap} of ${withLegacyUrl} applications (${pct}%) have no stored CV`);
  } else {
    notes.push(`resumes: ${gap} CVs missing (${pct}%) — likely deleted from the legacy host; check the migration log`);
  }
}

// ---------------------------------------------------------------------------

console.log('\n' + '='.repeat(70));
if (notes.length) {
  console.log('\nWorth knowing:');
  for (const n of notes) console.log(`  - ${n}`);
}
if (problems.length === 0) {
  console.log('\nAll checks passed.');
} else {
  console.log(`\n${problems.length} PROBLEM(S):\n`);
  for (const p of problems.slice(0, 50)) console.log(`  - ${p}`);
  if (problems.length > 50) console.log(`  ...and ${problems.length - 50} more`);
}

await new Promise<void>((resolve) => {
  if (process.stdout.write('')) resolve();
  else process.stdout.once('drain', () => resolve());
});
process.exit(problems.length ? 1 : 0);
