#!/usr/bin/env node
/**
 * The real migration: production Supabase -> Payload.
 *
 * This is the script scripts/seed/seed-payload.mts said would be written at
 * cutover. It shares that file's transforms — they are correct and have been
 * exercised — and differs in the things a fixture does not need:
 *
 *   full volume       the seeder caps at 200 rows a table. This pages until the
 *                     source is exhausted.
 *   real data         no anonymisation. Which is why nothing is written to disk:
 *                     the seeder round-trips through .seed-data/*.json, and a
 *                     directory of real names, emails, phone numbers and cover
 *                     letters on a laptop is a liability with no upside. This
 *                     reads a page from Supabase and writes it to Payload.
 *   resumable         6,896 CVs will not survive a laptop lid closing. Progress
 *                     is checkpointed after every write, and a restart picks up
 *                     where it stopped instead of re-uploading.
 *   honest exit code  the seeder collects failures and exits 0. This exits 1 if
 *                     anything failed, because a migration that half-worked and
 *                     said nothing is worse than one that stopped.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/migrate/migrate.mts [options]
 *
 *   --phase <p>        content | leads | resumes | all   (default: all)
 *   --dry-run          Read and transform, write nothing. Safe any time.
 *   --wipe             Empty the target collections first, and discard the
 *                      checkpoint. For repeating a rehearsal from clean.
 *   --limit <n>        Cap rows per table. For a quick smoke run. 0 = no cap.
 *   --concurrency <n>  Parallel resume downloads/uploads (default 5).
 *   --state <file>     Checkpoint path (default .migrate-state.json).
 *
 * Phases run in dependency order and can be run separately:
 *   content   authors, categories, jobs, offers, testimonials, blogs, portfolio
 *             (blog/portfolio cover images are fetched and put on ImageKit)
 *   leads     applied_jobs, enquiry, popup_form, offer_applications, ideas
 *   resumes   fetches each CV off the legacy host, stores it through the
 *             resumes collection, and links it to its applied-jobs document
 *
 * THE SOURCE IS NEVER WRITTEN TO. Every source call is a GET against Supabase's
 * REST endpoint. There is no code path here that mutates production.
 *
 * On the checkpoint: it holds legacy-id -> payload-id pairs and a set of
 * completed row ids. Ids only — no names, no emails, no file names. It is how
 * the script knows what it already did, so deleting it mid-run and restarting
 * will duplicate rows. --wipe deletes it deliberately, together with the data.
 */

import { readFile, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

import { JSDOM } from 'jsdom';
import { getPayload } from 'payload';
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical';

import config from '../../payload.config';
import { slugify } from '../../src/fields/slug';

// ---------------------------------------------------------------------------
// arguments
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const flag = (n: string, d: string) => {
  const i = args.indexOf(`--${n}`);
  return i === -1 ? d : (args[i + 1] as string);
};
const has = (n: string) => args.includes(`--${n}`);

const PHASE = flag('phase', 'all');
const DRY = has('dry-run');
const WIPE = has('wipe');
const LIMIT = Number(flag('limit', '0'));
const CONCURRENCY = Math.max(1, Number(flag('concurrency', '5')));
const STATE_FILE = path.resolve(flag('state', '.migrate-state.json'));

const PHASES = ['content', 'leads', 'resumes'] as const;
type Phase = (typeof PHASES)[number];
const active = (p: Phase) => PHASE === 'all' || PHASE === p;

if (PHASE !== 'all' && !PHASES.includes(PHASE as Phase)) {
  console.error(`--phase must be one of: all, ${PHASES.join(', ')}`);
  process.exit(2);
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    'No Supabase source configured: NEXT_PUBLIC_SUPABASE_URL and a key are both\n' +
      'required. Run with --env-file=.env.local. SERVICE_ROLE_KEY is preferred —\n' +
      'the anon key is subject to RLS and will silently return fewer rows, which\n' +
      'looks like a successful migration of a smaller dataset.'
  );
  process.exit(2);
}

// ---------------------------------------------------------------------------
// checkpoint
// ---------------------------------------------------------------------------

type State = {
  /** legacy id -> payload id, per Payload collection slug */
  idMap: Record<string, Record<string, string | number>>;
  /** legacy ids already written, per source table — the idempotency key */
  done: Record<string, string[]>;
  /** applied_jobs legacy id -> resumes doc id. Keyed by id, never by file name. */
  resumes: Record<string, string | number>;
  startedAt: string;
};

const emptyState = (): State => ({ idMap: {}, done: {}, resumes: {}, startedAt: new Date().toISOString() });

let state: State = emptyState();

const loadState = async () => {
  if (WIPE) {
    if (existsSync(STATE_FILE)) await rm(STATE_FILE);
    state = emptyState();
    return;
  }
  if (!existsSync(STATE_FILE)) return;
  try {
    state = JSON.parse(await readFile(STATE_FILE, 'utf8')) as State;
    const n = Object.values(state.done).reduce((a, b) => a + b.length, 0);
    console.log(`resuming from ${path.basename(STATE_FILE)} — ${n} rows already migrated`);
  } catch {
    console.error(`${STATE_FILE} is unreadable. Move it aside and restart, or pass --wipe.`);
    process.exit(2);
  }
};

let pendingSave: Promise<void> = Promise.resolve();
const saveState = () => {
  if (DRY) return;
  // Serialised so concurrent resume workers cannot interleave writes and
  // truncate each other's output.
  pendingSave = pendingSave.then(() => writeFile(STATE_FILE, JSON.stringify(state, null, 2)));
  return pendingSave;
};

const isDone = (table: string, id: unknown) => (state.done[table] ?? []).includes(String(id));
const markDone = (table: string, id: unknown) => {
  (state.done[table] ??= []).push(String(id));
};
const remember = (col: string, from: unknown, to: string | number) => {
  (state.idMap[col] ??= {})[String(from)] = to;
};
const lookup = (col: string, from: unknown) =>
  from == null ? undefined : state.idMap[col]?.[String(from)];

// ---------------------------------------------------------------------------
// source: read-only, paged
// ---------------------------------------------------------------------------

const PAGE = 500;

/**
 * Pages a table out of Supabase. GET only.
 *
 * PostgREST caps a response at its configured maximum regardless of the limit
 * asked for, so this pages by Range header and stops when a short page comes
 * back rather than trusting a single large request to have returned everything.
 */
async function* source<T>(table: string): AsyncGenerator<T> {
  let from = 0;
  let yielded = 0;
  for (;;) {
    const to = from + PAGE - 1;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&order=id.asc`, {
      headers: {
        apikey: SUPABASE_KEY as string,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Range: `${from}-${to}`,
        Prefer: 'count=exact',
      },
    });
    if (!res.ok) throw new Error(`source ${table}: HTTP ${res.status} ${await res.text()}`);
    const rows = (await res.json()) as T[];
    for (const row of rows) {
      yield row;
      if (LIMIT && ++yielded >= LIMIT) return;
    }
    if (rows.length < PAGE) return;
    from += PAGE;
  }
}

const sourceCount = async (table: string): Promise<number> => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=id&limit=1`, {
    headers: {
      apikey: SUPABASE_KEY as string,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: 'count=exact',
      Range: '0-0',
    },
  });
  const range = res.headers.get('content-range') ?? '';
  const total = range.split('/')[1];
  return total && total !== '*' ? Number(total) : -1;
};

// ---------------------------------------------------------------------------
// target
// ---------------------------------------------------------------------------

const payload = await getPayload({ config });

const editorConfig = await editorConfigFactory.default({ config: payload.config });

/**
 * blogs.descp and portfolio.descp are HTML from react-quill; Payload stores
 * Lexical. Same conversion the seeder does. A document that fails to parse
 * becomes a failure rather than silently losing its body — the seeder tolerated
 * that because it was a fixture.
 */
const htmlToLexical = async (html: unknown, where: string) => {
  const raw = typeof html === 'string' ? html.trim() : '';
  if (!raw) return undefined;
  try {
    const tree = convertHTMLToLexical({ editorConfig, html: raw, JSDOM });
    await hydrateUploadNodes(tree, where);
    return tree;
  } catch (err) {
    failures.push(`${where}: rich text did not convert — ${explain(err)}`);
    return undefined;
  }
};

/**
 * Makes the <img> tags inside a post body into real Payload uploads.
 *
 * convertHTMLToLexical turns every <img> into a Lexical *upload* node, and an
 * upload node's `value` must be the id of a document in the media collection.
 * The converter has never heard of Payload's media collection — all it has is
 * the original src — so what it produces is an upload node pointing at a URL,
 * and Payload rejects the whole document:
 *
 *   descp: upload node failed to validate: This field is not a valid upload ID.
 *
 * Six of the seven posts have no inline images, which is why exactly one failed
 * and why it looked like something specific to that row.
 *
 * So: walk the converted tree, and for every upload node, fetch what the src
 * pointed at, store it as media, and rewrite the node to reference it. An image
 * that cannot be fetched has its node dropped rather than failing the post —
 * losing one picture is recoverable, losing the article is not — and each drop
 * is reported so it is a decision someone can see rather than a silent hole.
 */
const UPLOAD_URL_KEYS = ['value', 'src', 'url'] as const;

const findUploadUrl = (node: Record<string, unknown>): string | undefined => {
  for (const k of UPLOAD_URL_KEYS) {
    const v = node[k];
    if (typeof v === 'string' && /^https?:\/\//i.test(v)) return v;
  }
  const fields = node.fields as Record<string, unknown> | undefined;
  if (fields) {
    for (const k of UPLOAD_URL_KEYS) {
      const v = fields[k];
      if (typeof v === 'string' && /^https?:\/\//i.test(v)) return v;
    }
  }
  return undefined;
};

const hydrateUploadNodes = async (tree: unknown, where: string): Promise<void> => {
  const root = (tree as { root?: { children?: unknown[] } })?.root;
  if (!root) return;

  const visit = async (parent: { children?: unknown[] }): Promise<void> => {
    if (!Array.isArray(parent.children)) return;
    const kept: unknown[] = [];
    for (const child of parent.children) {
      const node = child as Record<string, unknown>;
      if (node?.type === 'upload') {
        const url = findUploadUrl(node);
        if (!url) {
          failures.push(`${where}: an inline image has no usable src — node dropped`);
          continue;
        }
        const id = await uploadUrlToMedia(url, `Image in ${where}`, where);
        if (id === undefined) {
          // uploadUrlToMedia has already recorded why.
          continue;
        }
        node.value = id;
        node.relationTo = 'media';
        kept.push(node);
        continue;
      }
      await visit(node as { children?: unknown[] });
      kept.push(child);
    }
    parent.children = kept;
  };

  await visit(root);
};

const counts: Record<string, number> = {};
const skippedAlready: Record<string, number> = {};
const failures: string[] = [];

/**
 * Unpacks what Payload actually said.
 *
 * The first version did `.message.slice(0, 140)`. Payload's ValidationError
 * message is a generic "The following field is invalid: X" and the part you
 * need — which field, and why — lives in `error.data.errors`. Truncating threw
 * it away, so a blog failed three times in a row and the report never once said
 * why. An error report that does not identify the error is not a report.
 */
let lastRawError: unknown;

const explain = (err: unknown): string => {
  lastRawError = err;
  const e = err as { name?: string; message?: string; data?: { errors?: { field?: string; message?: string; path?: string }[] } };
  const detail = e?.data?.errors;
  if (Array.isArray(detail) && detail.length) {
    return detail.map((d) => `${d.field ?? d.path ?? '?'}: ${d.message ?? 'invalid'}`).join('; ');
  }
  const msg = e?.message ?? String(err);
  // Long messages are kept whole. A migration failure report is read once, by
  // someone trying to fix it; brevity is not the goal.
  return e?.name && e.name !== 'Error' ? `${e.name}: ${msg}` : msg;
};

const create = async (
  collection: string,
  table: string,
  legacyId: unknown,
  data: Record<string, unknown>,
  file?: { data: Buffer; name: string; mimetype: string; size: number }
) => {
  if (isDone(table, legacyId)) {
    skippedAlready[collection] = (skippedAlready[collection] ?? 0) + 1;
    return lookup(collection, legacyId);
  }
  if (DRY) {
    counts[collection] = (counts[collection] ?? 0) + 1;
    return undefined;
  }
  try {
    const doc = await payload.create({
      collection: collection as never,
      data: data as never,
      ...(file ? { file } : {}),
    });
    const id = (doc as { id: string | number }).id;
    remember(collection, legacyId, id);
    markDone(table, legacyId);
    counts[collection] = (counts[collection] ?? 0) + 1;
    await saveState();
    return id;
  } catch (err) {
    failures.push(`${collection}#${legacyId}: ${explain(err)}`);
    return undefined;
  }
};

// ---------------------------------------------------------------------------
// wipe
// ---------------------------------------------------------------------------

/**
 * The seeder's wipe read one page of 1000 and deleted it, which silently leaves
 * everything past the first page behind. At real volumes that turns a "clean"
 * rerun into a duplicate run, so this loops until the collection is actually
 * empty.
 */
const wipe = async () => {
  const order = [
    'offer-applications', 'applied-jobs', 'enquiries', 'popup-submissions', 'ideas',
    'blogs', 'portfolio', 'testimonials', 'jobs', 'offers', 'authors', 'categories',
    'resumes', 'media',
  ];
  for (const c of order) {
    let removed = 0;
    for (;;) {
      const { docs } = await payload.find({ collection: c as never, limit: 200, depth: 0 });
      if (!docs.length) break;
      for (const d of docs) {
        await payload.delete({ collection: c as never, id: (d as { id: string | number }).id });
        removed++;
      }
    }
    if (removed) console.log(`  wiped ${String(removed).padStart(5)} from ${c}`);
  }
};

// ---------------------------------------------------------------------------
// media helper (blog / portfolio cover images)
// ---------------------------------------------------------------------------

/** production `image` jsonb is `[{fileId,url}]`; jsonb[] on portfolio. */
const firstImage = (raw: unknown): { url?: string } | undefined => {
  if (!raw) return undefined;
  const arr = Array.isArray(raw) ? raw : [raw];
  const first = arr[0];
  if (!first) return undefined;
  try {
    return typeof first === 'string' ? (JSON.parse(first) as { url?: string }) : (first as { url?: string });
  } catch {
    return undefined;
  }
};

const mediaByUrl = new Map<string, string | number>();

const fetchBinary = async (url: string, attempts = 3): Promise<{ buf: Buffer; type: string } | null> => {
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.status === 404) return null; // gone is gone; retrying will not help
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return {
        buf: Buffer.from(await res.arrayBuffer()),
        type: res.headers.get('content-type') ?? 'application/octet-stream',
      };
    } catch (err) {
      if (i === attempts) throw err;
      await new Promise((r) => setTimeout(r, 400 * 2 ** i)); // 800, 1600ms
    }
  }
  return null;
};

/**
 * Fetches a URL and stores it as a media document, once per URL.
 *
 * Shared by cover images and by the inline images inside post bodies, so the
 * same picture used in both places becomes one media document rather than two.
 */
const uploadUrlToMedia = async (
  url: string,
  alt: string,
  where: string
): Promise<string | number | undefined> => {
  if (mediaByUrl.has(url)) return mediaByUrl.get(url);
  if (DRY) return undefined;
  try {
    const got = await fetchBinary(url);
    if (!got) { failures.push(`${where}: image gone (404) — ${url.slice(0, 90)}`); return undefined; }
    const name = decodeURIComponent(new URL(url).pathname.split('/').pop() || 'image.jpg');
    const doc = await payload.create({
      collection: 'media',
      data: { alt } as never,
      file: { data: got.buf, name, mimetype: got.type, size: got.buf.length },
    });
    const id = (doc as { id: string | number }).id;
    mediaByUrl.set(url, id);
    counts.media = (counts.media ?? 0) + 1;
    return id;
  } catch (err) {
    failures.push(`${where}: image — ${explain(err)}`);
    return undefined;
  }
};

const ensureMedia = async (raw: unknown, alt: string, where: string) => {
  const img = firstImage(raw);
  if (!img?.url) return undefined;
  return uploadUrlToMedia(img.url, alt, where);
};

// ---------------------------------------------------------------------------
// phase: content
// ---------------------------------------------------------------------------

const migrateContent = async () => {
  console.log('\n— content —');

  for await (const a of source<Record<string, unknown>>('author')) {
    await create('authors', 'author', a.id, {
      name: a.name ?? 'Unknown', designation: a.designation,
      description: a.description, profile: a.profile,
    });
  }

  for await (const c of source<Record<string, unknown>>('categories')) {
    await create('categories', 'categories', c.id, {
      name: c.name, slug: c.slug, description: c.description,
    });
  }

  for await (const t of source<Record<string, unknown>>('testimonials')) {
    await create('testimonials', 'testimonials', t.id, {
      feedbackBy: t.feedback_by, feedbackDescp: t.feedback_descp, compAndDesig: t.comp_and_desig,
    });
  }

  for await (const j of source<Record<string, unknown>>('jobs')) {
    await create('jobs', 'jobs', j.id, {
      title: j.title ?? 'Untitled',
      // production has no slug on jobs; derive a stable one. The id suffix keeps
      // it unique and keeps /careers/<id>/ resolvable against the old URLs.
      slug: `${slugify(String(j.title ?? 'job'))}-${j.id}`,
      descp: j.descp,
      responsibilities: j.responsibilities ?? [],
      qualifications: j.qualifications ?? [],
      skills: j.skills ?? [],
      location: j.location, jobMode: j.job_mode, jobType: j.job_type, package: j.package,
      visibility: Boolean(j.visibility),
    });
  }

  for await (const o of source<Record<string, unknown>>('offers')) {
    await create('offers', 'offers', o.id, {
      title: o.title, description: o.description,
      termsPoints: (o as Record<string, string[]>)['t&c_points'] ?? [],
      active: o.active !== false,
    });
  }

  for await (const b of source<Record<string, unknown>>('blogs')) {
    if (isDone('blogs', b.id)) { skippedAlready.blogs = (skippedAlready.blogs ?? 0) + 1; continue; }
    const coverImage = await ensureMedia(b.image, (b.title as string) ?? 'Blog image', `blogs#${b.id}`);
    await create('blogs', 'blogs', b.id, {
      title: b.title ?? 'Untitled', slug: b.slug ?? `post-${b.id}`,
      status: b.status === 'published' ? 'published' : 'draft',
      descp: await htmlToLexical(b.descp, `blogs#${b.id}`), service: b.service,
      readTime: b.read_time ?? 2,
      tags: b.tags ?? [], metaKeywords: b.meta_keywords ?? [],
      metaTitle: b.meta_title, metaDescription: b.meta_description, canonicalUrl: b.canonical_url,
      author: lookup('authors', b.author_id), category: lookup('categories', b.category_id),
      ...(coverImage ? { coverImage } : {}),
    });
  }

  for await (const p of source<Record<string, unknown>>('portfolio')) {
    if (isDone('portfolio', p.id)) { skippedAlready.portfolio = (skippedAlready.portfolio ?? 0) + 1; continue; }
    const img = await ensureMedia(p.image, (p.title as string) ?? 'Portfolio image', `portfolio#${p.id}`);
    await create('portfolio', 'portfolio', p.id, {
      title: p.title ?? 'Untitled',
      slug: slugify(String(p.title ?? `project-${p.id}`)),
      descp: await htmlToLexical(p.descp, `portfolio#${p.id}`),
      active: p.active !== false,
      ...(img ? { images: [img] } : {}),
    });
  }
};

// ---------------------------------------------------------------------------
// phase: leads
// ---------------------------------------------------------------------------

const migrateLeads = async () => {
  console.log('\n— leads —');

  for await (const a of source<Record<string, unknown>>('applied_jobs')) {
    await create('applied-jobs', 'applied_jobs', a.id, {
      fullname: a.fullname, email: a.email, phone: String(a.phone ?? ''),
      experience: a.experience ?? '0-1',
      linkedinUrl: a.linkedin_url, githubUrl: a.github_url, coverLetter: a.cover_letter,
      job: lookup('jobs', a.job_id),
      // The file itself is attached by the resumes phase. Keeping the legacy URL
      // means a row is still traceable if that phase never runs, or fails.
      legacyResumeUrl: a.resume_url || undefined,
    });
  }

  for await (const e of source<Record<string, unknown>>('enquiry')) {
    await create('enquiries', 'enquiry', e.id, {
      fullname: e.fullname, email: e.email, contact: e.contact,
      subject: e.subject, message: e.message,
    });
  }

  for await (const p of source<Record<string, unknown>>('popup_form')) {
    await create('popup-submissions', 'popup_form', p.id, {
      name: p.name, email: p.email, service: p.service, phone: p.phone, country: p.country,
      legacyUuid: p.id as string,
    });
  }

  for await (const i of source<Record<string, unknown>>('ideas')) {
    await create('ideas', 'ideas', i.id, { mail: i.mail, ideaDescp: i.idea_descp });
  }

  for await (const oa of source<Record<string, unknown>>('offer_applications')) {
    await create('offer-applications', 'offer_applications', oa.id, {
      name: oa.name, email: oa.email, mobile: oa.mobile, companyName: oa.company_name,
      offer: lookup('offers', oa.offer_id),
    });
  }
};

// ---------------------------------------------------------------------------
// phase: resumes
// ---------------------------------------------------------------------------

/**
 * Fetches every CV off the legacy upload host and stores it through the resumes
 * collection, then points the applied-jobs document at it.
 *
 * This is the long one — thousands of files, each a network round trip out and
 * another in. Three properties keep it survivable:
 *
 *   bounded concurrency   the legacy host is a small box and ImageKit rate
 *                         limits. Five at a time is polite and still finishes.
 *   checkpointed          every success is written to state before the next
 *                         starts, so a restart resumes rather than re-uploads.
 *   404 is not a retry    a CV deleted years ago will never arrive. It is
 *                         recorded as a failure and the run continues; the
 *                         applied-jobs row keeps legacyResumeUrl so it is
 *                         still traceable.
 */
const migrateResumes = async () => {
  console.log('\n— resumes —');

  const queue: { legacyId: string; url: string }[] = [];
  for await (const a of source<Record<string, unknown>>('applied_jobs')) {
    const url = typeof a.resume_url === 'string' ? a.resume_url.trim() : '';
    if (!url) continue;
    if (state.resumes[String(a.id)]) continue;
    if (!lookup('applied-jobs', a.id)) continue; // leads phase has not created it yet
    queue.push({ legacyId: String(a.id), url });
  }

  console.log(`  ${queue.length} to fetch (${Object.keys(state.resumes).length} already done)`);
  if (DRY || !queue.length) {
    counts.resumes = (counts.resumes ?? 0) + queue.length;
    return;
  }

  let done = 0;
  const started = Date.now();

  const worker = async () => {
    for (;;) {
      const item = queue.shift();
      if (!item) return;
      try {
        const got = await fetchBinary(item.url);
        if (!got) {
          failures.push(`resume applied_jobs#${item.legacyId}: 404 on the legacy host`);
          continue;
        }
        const name =
          decodeURIComponent(new URL(item.url).pathname.split('/').pop() || `cv-${item.legacyId}.pdf`);
        const doc = await payload.create({
          collection: 'resumes',
          data: {} as never,
          file: { data: got.buf, name, mimetype: got.type, size: got.buf.length },
        });
        const resumeId = (doc as { id: string | number }).id;

        await payload.update({
          collection: 'applied-jobs',
          id: lookup('applied-jobs', item.legacyId) as string | number,
          data: { resume: resumeId } as never,
        });

        state.resumes[item.legacyId] = resumeId;
        counts.resumes = (counts.resumes ?? 0) + 1;
        await saveState();
      } catch (err) {
        failures.push(`resume applied_jobs#${item.legacyId}: ${explain(err)}`);
      } finally {
        if (++done % 100 === 0) {
          const rate = done / ((Date.now() - started) / 1000);
          const left = Math.round(queue.length / Math.max(rate, 0.01) / 60);
          console.log(`  ${done} done, ${queue.length} left (~${left} min at ${rate.toFixed(1)}/s)`);
        }
      }
    }
  };

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
};

// ---------------------------------------------------------------------------
// run
// ---------------------------------------------------------------------------

await loadState();

console.log(
  `${DRY ? 'DRY RUN — nothing will be written\n' : ''}` +
    `phase=${PHASE} concurrency=${CONCURRENCY}${LIMIT ? ` limit=${LIMIT}/table` : ''}`
);

if (WIPE && !DRY) {
  console.log('\n— wiping target —');
  await wipe();
}

if (active('content')) await migrateContent();
if (active('leads')) await migrateLeads();
if (active('resumes')) await migrateResumes();

await pendingSave;

// ---------------------------------------------------------------------------
// report
// ---------------------------------------------------------------------------

console.log(`\n${DRY ? 'Would migrate' : 'Migrated'}:`);
for (const [c, n] of Object.entries(counts).sort()) console.log(`  ${c.padEnd(22)} ${n}`);
if (Object.keys(skippedAlready).length) {
  console.log('\nAlready present (checkpoint), left alone:');
  for (const [c, n] of Object.entries(skippedAlready).sort()) console.log(`  ${c.padEnd(22)} ${n}`);
}

if (failures.length) {
  console.log(`\n${failures.length} FAILED:`);
  for (const f of failures.slice(0, 40)) console.log(`  ${f}`);
  if (failures.length > 40) console.log(`  ...and ${failures.length - 40} more`);
  if (process.env.MIGRATE_DEBUG === '1' && lastRawError) {
    // Last resort when the structured detail still does not name the cause.
    console.log('\nFull error object for the last failure (MIGRATE_DEBUG=1):\n');
    console.dir(lastRawError, { depth: 6, maxStringLength: 400 });
  }
  console.log('\nRe-running picks up where this stopped; the rows above are not retried');
  console.log('automatically, because a row that failed twice usually needs looking at.');
}

console.log(`\nRun scripts/migrate/verify.mts next — this script's counts are what it`);
console.log(`believes it wrote, which is not the same as what is in the database.`);

// Payload's pool keeps the event loop alive. A bare process.exit() truncates
// buffered stdout when output is piped to a file, which has already swallowed
// one summary during this work — flush first.
await new Promise<void>((resolve) => {
  if (process.stdout.write('')) resolve();
  else process.stdout.once('drain', () => resolve());
});
process.exit(failures.length ? 1 : 0);
