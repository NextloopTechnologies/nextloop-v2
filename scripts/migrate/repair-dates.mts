#!/usr/bin/env node
/**
 * Puts the real submission dates back on already-migrated documents.
 *
 *   npx tsx --env-file=.env.local scripts/migrate/repair-dates.mts [options]
 *
 *   --dry-run          Report what would change, write nothing.
 *   --collection <c>   Repair one collection instead of all.
 *   --state <file>     Checkpoint path (default .migrate-state.json).
 *
 * Why this exists
 * ---------------
 * migrate.mts never mapped the source created_at. Payload stamps createdAt at
 * write time, so every one of ~7,500 migrated documents claims it was created
 * on the day the migration ran. applied-jobs lists createdAt as a default
 * column in the admin, so the collection shows a column of identical dates —
 * and "most recent application" sorts by nothing.
 *
 * The data is not wrong, only the timestamps, so this repairs in place rather
 * than re-migrating. That matters because the target here is the same database
 * production reads: a wipe-and-redo would delete live rows to fix a column.
 *
 * It is idempotent. A document whose createdAt already matches its source row
 * is left alone, so this can be run repeatedly and after every future
 * migration pass.
 *
 * A note on trusting this
 * -----------------------
 * Payload owns createdAt. Whether it honours an explicit value on update is a
 * property of the version installed, not something to assume — so the first
 * write is read back and compared before the other 7,499 are attempted. If the
 * value does not stick, this stops and says so rather than reporting thousands
 * of successful no-ops.
 */

import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

import { getPayload } from 'payload';
import config from '../../payload.config';

const args = process.argv.slice(2);
const flag = (n: string, d: string) => {
  const i = args.indexOf(`--${n}`);
  return i === -1 ? d : (args[i + 1] as string);
};
const DRY = args.includes('--dry-run');
const ONLY = flag('collection', '');
const STATE_FILE = path.resolve(flag('state', '.migrate-state.json'));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or a key. Run with --env-file=.env.local');
  process.exit(2);
}
const headers = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } as Record<string, string>;

if (!existsSync(STATE_FILE)) {
  console.error(
    `No ${path.basename(STATE_FILE)}. This repairs documents the migration wrote, and the\n` +
      'checkpoint is what maps a source row to the document it became. Without it there\n' +
      'is no way to know which document belongs to which row.'
  );
  process.exit(2);
}
const state = JSON.parse(await readFile(STATE_FILE, 'utf8')) as {
  idMap?: Record<string, Record<string, string | number>>;
};
const idMap = state.idMap ?? {};

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

/** PostgREST caps an unbounded response at 1,000 rows. Always page. */
// The trailing comma is required: in .mts, a bare <T> is parsed as JSX.
const allRows = async <T,>(table: string, select: string): Promise<T[]> => {
  const out: T[] = [];
  for (let from = 0; ; from += 1000) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${select}&order=id.asc`, {
      headers: { ...headers, Range: `${from}-${from + 999}` },
    });
    if (!res.ok) throw new Error(`${table}: HTTP ${res.status} ${await res.text()}`);
    const rows = (await res.json()) as T[];
    out.push(...rows);
    if (rows.length < 1000) return out;
  }
};

const DATE_KEYS = ['created_at', 'createdAt', 'created', 'applied_at', 'date'] as const;
const rowDate = (row: Record<string, unknown>): string | null => {
  for (const k of DATE_KEYS) {
    const v = row[k];
    if (typeof v === 'string' || typeof v === 'number') {
      const d = new Date(v);
      if (!Number.isNaN(d.getTime())) return d.toISOString();
    }
  }
  return null;
};

const sameDay = (a: unknown, b: string) => {
  if (typeof a !== 'string') return false;
  const x = new Date(a), y = new Date(b);
  return !Number.isNaN(x.getTime()) && Math.abs(x.getTime() - y.getTime()) < 1000;
};

const payload = await getPayload({ config });

let proven = DRY; // in a dry run there is nothing to prove
const totals = { checked: 0, repaired: 0, alreadyRight: 0, noDate: 0, noDoc: 0, failed: 0 };
const problems: string[] = [];

console.log(DRY ? 'DRY RUN — nothing will be written\n' : '');

for (const { table, collection } of PAIRS) {
  if (ONLY && ONLY !== collection) continue;
  const map = idMap[collection] ?? {};
  if (!Object.keys(map).length) {
    console.log(`  ${collection.padEnd(22)} nothing migrated, skipping`);
    continue;
  }

  let rows: Record<string, unknown>[];
  try {
    rows = await allRows<Record<string, unknown>>(table, '*');
  } catch (err) {
    problems.push(`${table}: could not read source — ${(err as Error).message}`);
    continue;
  }

  let repaired = 0, already = 0, undated = 0, missing = 0, failed = 0;

  for (const row of rows) {
    const docId = map[String(row.id)];
    if (docId === undefined) { missing++; continue; }

    const when = rowDate(row);
    if (!when) { undated++; continue; }

    totals.checked++;

    let current: Record<string, unknown>;
    try {
      current = (await payload.findByID({
        collection: collection as never,
        id: docId as string | number,
        depth: 0,
      })) as Record<string, unknown>;
    } catch {
      missing++;
      continue;
    }

    if (sameDay(current.createdAt, when)) { already++; continue; }
    if (DRY) { repaired++; continue; }

    try {
      await payload.update({
        collection: collection as never,
        id: docId as string | number,
        data: { createdAt: when } as never,
        context: { migration: true },
      });

      /**
       * Prove the first one actually stuck before doing thousands more.
       * Payload owns this field; an update that is silently ignored would
       * otherwise be reported as several thousand successful repairs.
       */
      if (!proven) {
        const back = (await payload.findByID({
          collection: collection as never,
          id: docId as string | number,
          depth: 0,
        })) as Record<string, unknown>;
        if (!sameDay(back.createdAt, when)) {
          console.error(
            `\nSTOPPING. Wrote createdAt to ${collection}#${docId} and read back ` +
              `${String(back.createdAt)}, expected ${when}.\n\n` +
              'This Payload version is not accepting createdAt on update, so repairing\n' +
              'in place will not work. Nothing further has been attempted — better to\n' +
              'stop than to report 7,500 repairs that did not happen.\n'
          );
          process.exit(1);
        }
        proven = true;
        console.log('  (verified: the first write stuck — continuing)\n');
      }

      repaired++;
      if (repaired % 500 === 0) console.log(`    ${collection}: ${repaired} repaired…`);
    } catch (err) {
      failed++;
      if (problems.length < 20) problems.push(`${collection}#${docId}: ${(err as Error).message.slice(0, 120)}`);
    }
  }

  totals.repaired += repaired;
  totals.alreadyRight += already;
  totals.noDate += undated;
  totals.noDoc += missing;
  totals.failed += failed;

  const bits = [
    `${repaired} ${DRY ? 'would be repaired' : 'repaired'}`,
    already ? `${already} already right` : '',
    undated ? `${undated} no source date` : '',
    missing ? `${missing} not migrated` : '',
    failed ? `${failed} FAILED` : '',
  ].filter(Boolean);
  console.log(`  ${collection.padEnd(22)} ${bits.join(', ')}`);
}

console.log('\n' + '='.repeat(64));
console.log(`\n  checked        ${totals.checked}`);
console.log(`  ${DRY ? 'would repair ' : 'repaired     '}  ${totals.repaired}`);
console.log(`  already right  ${totals.alreadyRight}`);
if (totals.noDate) console.log(`  no source date ${totals.noDate}  (left as-is rather than invented)`);
if (totals.noDoc) console.log(`  not migrated   ${totals.noDoc}  (quarantined or failed rows)`);
if (totals.failed) console.log(`  FAILED         ${totals.failed}`);

if (problems.length) {
  console.log('\nproblems:\n');
  for (const p of problems) console.log(`  - ${p}`);
}

console.log(
  totals.failed || problems.length
    ? '\nRe-running retries; this is idempotent.\n'
    : '\nDates now match the source. Sorting applied-jobs by createdAt means something again.\n'
);

await new Promise<void>((resolve) => {
  if (process.stdout.write('')) resolve();
  else process.stdout.once('drain', () => resolve());
});
process.exit(totals.failed || problems.length ? 1 : 0);
