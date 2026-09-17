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

import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

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

/**
 * `sourceColumn` is what makes this check meaningful.
 *
 * The first version counted Payload documents with an empty relationship and
 * called every one a problem. It reported "blogs.category: 6 of 6 missing",
 * which read as total data loss — and was wrong: six of the seven source rows
 * have category_id NULL. The migration had dropped nothing.
 *
 * A relationship is only missing if the SOURCE had one. So each check now asks
 * the source how many rows carry the foreign key, and compares against that.
 */
const REFS: { collection: string; field: string; table: string; sourceColumn: string; why: string }[] = [
  { collection: 'blogs', field: 'author', table: 'blogs', sourceColumn: 'author_id', why: 'a post with no author renders a blank byline' },
  { collection: 'blogs', field: 'category', table: 'blogs', sourceColumn: 'category_id', why: 'an uncategorised post drops out of category listings' },
  { collection: 'applied-jobs', field: 'job', table: 'applied_jobs', sourceColumn: 'job_id', why: 'an application not attached to a posting is unactionable' },
  { collection: 'offer-applications', field: 'offer', table: 'offer_applications', sourceColumn: 'offer_id', why: 'same, for offers' },
];

const sourceNonNull = async (table: string, column: string): Promise<number> => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=id&${column}=not.is.null`, {
    headers: { ...headers, Prefer: 'count=exact', Range: '0-0' },
  });
  const total = (res.headers.get('content-range') ?? '').split('/')[1];
  return total && total !== '*' ? Number(total) : -1;
};

for (const { collection, field, table, sourceColumn, why } of REFS) {
  const { totalDocs: total } = await payload.count({ collection: collection as never });
  const { totalDocs: resolved } = await payload.count({
    collection: collection as never,
    where: { [field]: { exists: true } } as never,
  });
  const expected = await sourceNonNull(table, sourceColumn);
  const label = `${collection}.${field}`;

  if (total === 0) {
    console.log(`  ${label.padEnd(32)} nothing migrated yet`);
    continue;
  }
  if (expected < 0) {
    console.log(`  ${label.padEnd(32)} ${resolved}/${total} resolve (source count unavailable)`);
    notes.push(`${label}: could not read the source to know how many should resolve`);
    continue;
  }
  /**
   * Discount rows that never got written.
   *
   * A row that failed to migrate cannot have a relationship in Payload, and it
   * is already counted as a count mismatch. Without this, the same five failed
   * offer_applications were reported twice — once as missing documents and
   * again as lost relationships — which reads as ten problems and sends you
   * looking for a second cause that does not exist.
   */
  const notWritten = Math.max(0, (await sourceCount(table)) - total);
  const expectedHere = Math.max(0, Math.min(expected, total) - Math.min(expected, notWritten));
  if (resolved >= expectedHere) {
    const blank = total - resolved;
    const because = blank ? ` (${blank} blank, and ${blank} source rows have no ${sourceColumn})` : '';
    console.log(`  ${label.padEnd(32)} all ${expectedHere} that should resolve, do${because}`);
  } else {
    const lost = expectedHere - resolved;
    console.log(`  ${label.padEnd(32)} ${lost} LOST — source has ${expected} with ${sourceColumn}, only ${resolved} resolve — ${why}`);
    problems.push(`${label}: ${lost} relationships present in the source did not survive`);
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

/**
 * Shows where two strings actually diverge.
 *
 * The first version of this printed `slice(0, 40)` of each side, which produced
 * a "mismatch" whose two values were character-for-character identical on
 * screen — the difference was at position 44. A report that cannot be acted on
 * is worse than no report: it burns the reader's trust in every other line.
 */
const showDiff = (a: unknown, b: unknown): string => {
  const x = String(a ?? ''), y = String(b ?? '');
  let i = 0;
  while (i < x.length && i < y.length && x[i] === y[i]) i++;
  const from = Math.max(0, i - 12);
  const win = (s: string) =>
    (from ? '…' : '') + JSON.stringify(s.slice(from, i + 28)).slice(1, -1) + (s.length > i + 28 ? '…' : '');
  return `diverge at char ${i}: payload "${win(x)}" vs source "${win(y)}"`;
};

for (const [collection, { table, map }] of Object.entries(FIELDS)) {
  const { docs } = await payload.find({ collection: collection as never, limit: SAMPLES, depth: 0 });
  if (!docs.length) { console.log(`  ${collection.padEnd(22)} no documents to sample`); continue; }

  let checked = 0;
  let bad = 0;
  let ambiguous = 0;
  for (const doc of docs as Record<string, unknown>[]) {
    // legacyUuid on popup-submissions is the only stored back-reference; for the
    // rest we match on a natural key, which is why the maps above start with one.
    const [firstPayloadField, firstSourceCol] = Object.entries(map)[0] as [string, string];
    const probe = doc[firstPayloadField];
    if (probe == null) continue;

    /**
     * Fetch every row matching the key, not just the first.
     *
     * The first version used `limit=1` and compared against whatever came back.
     * When the key is not unique in the source — two offers sharing a title, say
     * — that silently compares a Payload document against a DIFFERENT source
     * row, and every other field then "mismatches". It reported four corrupted
     * offer descriptions that were not corrupted at all. A non-unique key means
     * this check cannot say anything, so it must say nothing rather than
     * something false.
     */
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/${table}?${firstSourceCol}=eq.${encodeURIComponent(String(probe))}&select=*`,
      { headers }
    );
    const rows = (await res.json()) as Record<string, unknown>[];
    if (rows.length === 0) {
      bad++;
      problems.push(
        `${collection}: a document (${firstPayloadField}=${String(probe).slice(0, 60)}) has no matching source row`
      );
      continue;
    }
    if (rows.length > 1) {
      ambiguous++;
      continue;
    }
    const row = rows[0] as Record<string, unknown>;
    for (const [pf, sc] of Object.entries(map)) {
      checked++;
      if (!same(doc[pf], row[sc])) {
        bad++;
        problems.push(`${collection}.${pf}: ${showDiff(doc[pf], row[sc])}`);
      }
    }
  }
  const note = ambiguous ? `, ${ambiguous} skipped (key not unique in source)` : '';
  console.log(`  ${collection.padEnd(22)} ${checked} field comparisons, ${bad} mismatched${note}`);
  if (ambiguous) {
    notes.push(
      `${collection}: ${ambiguous} sampled documents could not be compared — the natural key is duplicated in the source, so there is no way to tell which row a document came from`
    );
  }
}

// ---------------------------------------------------------------------------
// 3b. which rows did not make it
//
// A count mismatch says how many are missing. It does not say which, and
// "6 of 7 blogs" is not something you can act on. The migration checkpoint
// records every source id it wrote, so diffing that against the source names
// the survivors' opposite exactly.
//
// The checkpoint is used ONLY to name rows here. Every pass/fail verdict above
// comes from reading both databases, because a migration's own bookkeeping is
// the one source that cannot be trusted to audit itself.
// ---------------------------------------------------------------------------

const STATE_FILE = flag('state', '.migrate-state.json');
if (existsSync(STATE_FILE)) {
  const state = JSON.parse(await readFile(STATE_FILE, 'utf8')) as { done?: Record<string, string[]> };
  const done = state.done ?? {};
  const gaps: string[] = [];

  /**
   * Pages the id list.
   *
   * This fetched `?select=id` with no Range header. PostgREST caps an unbounded
   * response at 1,000 rows, so on applied_jobs it read the first 1,000 ids,
   * found all of them in the checkpoint, and concluded nothing was missing —
   * while the count check right above it said nine rows short. The two halves
   * of the same report disagreed and only one of them was right.
   *
   * Any query against a table that can exceed 1,000 rows has to page. There is
   * no error when it does not; the answer is just quietly wrong.
   */
  const allIds = async (table: string): Promise<string[] | null> => {
    const out: string[] = [];
    for (let from = 0; ; from += 1000) {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=id&order=id.asc`, {
        headers: { ...headers, Range: `${from}-${from + 999}` },
      });
      if (!res.ok) return out.length ? out : null;
      const rows = (await res.json()) as { id: string | number }[];
      out.push(...rows.map((r) => String(r.id)));
      if (rows.length < 1000) return out;
    }
  };

  for (const { table } of PAIRS) {
    const written = new Set(done[table] ?? []);
    if (!written.size) continue;
    const ids = await allIds(table);
    if (!ids) continue;
    const missing = ids.filter((id) => !written.has(id));
    if (missing.length) {
      gaps.push(`  ${table.padEnd(20)} ${missing.length} not written — ids: ${missing.slice(0, 12).join(', ')}${missing.length > 12 ? ` …+${missing.length - 12}` : ''}`);
    }
  }

  if (gaps.length) {
    console.log('\nrows the migration did not write\n');
    for (const g of gaps) console.log(g);
    console.log('\n  Re-running the migration retries these. If one fails twice, look at the row.');
  }
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
