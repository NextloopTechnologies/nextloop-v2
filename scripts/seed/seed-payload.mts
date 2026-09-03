#!/usr/bin/env node
/**
 * Load a production snapshot into a LOCAL Payload instance for testing.
 *
 *   npx tsx --env-file=.env.local scripts/seed/seed-payload.mts [options]
 *
 * Options:
 *   --in <dir>      Snapshot directory (default: .seed-data)
 *   --wipe          Delete existing documents first
 *   --images        Actually upload blog/portfolio images to ImageKit
 *                   (~11 files — exercises the storage adapter end to end)
 *   --dry-run       Report what would happen, write nothing
 *
 * This is NOT the migration. It is a disposable test fixture: run it, break
 * things, wipe, run it again. The real migration is a separate script written
 * at cutover, once the collection design has stopped moving.
 *
 * Deliberate simplifications vs a real migration:
 *   - `resumes` files are never fetched. 6,896 CVs is not a test fixture, and
 *     the URLs are the very thing we are trying to stop handing around.
 *     applied-jobs keep `legacyResumeUrl` so the mapping is still visible.
 *   - Images upload only with --images, so the default run needs no ImageKit
 *     credentials at all.
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { getPayload } from 'payload';

import config from '../../payload.config';
import { slugify } from '../../src/fields/slug';

const args = process.argv.slice(2);
const flag = (n: string, d: string) => {
  const i = args.indexOf(`--${n}`);
  return i === -1 ? d : (args[i + 1] as string);
};
const has = (n: string) => args.includes(`--${n}`);

const IN = flag('in', '.seed-data');
const WIPE = has('wipe');
const IMAGES = has('images');
const DRY = has('dry-run');

const read = async <T,>(name: string): Promise<T[]> => {
  try {
    return JSON.parse(await readFile(path.join(IN, `${name}.json`), 'utf8')) as T[];
  } catch {
    console.log(`  (no ${name}.json — skipping)`);
    return [];
  }
};

/** production id -> payload id, per collection */
const idMap: Record<string, Map<string | number, string | number>> = {};
const remember = (col: string, from: string | number, to: string | number) => {
  (idMap[col] ??= new Map()).set(from, to);
};
const lookup = (col: string, from: unknown) =>
  from == null ? undefined : idMap[col]?.get(from as string | number);

const payload = await getPayload({ config });
const counts: Record<string, number> = {};
const skipped: string[] = [];

const create = async (collection: string, data: Record<string, unknown>, legacyId?: string | number) => {
  if (DRY) {
    counts[collection] = (counts[collection] ?? 0) + 1;
    return;
  }
  try {
    const doc = await payload.create({ collection: collection as never, data: data as never });
    if (legacyId !== undefined) remember(collection, legacyId, (doc as { id: string | number }).id);
    counts[collection] = (counts[collection] ?? 0) + 1;
  } catch (err) {
    skipped.push(`${collection}#${legacyId}: ${(err as Error).message.slice(0, 120)}`);
  }
};

// ---------------------------------------------------------------------------

if (WIPE && !DRY) {
  const order = [
    'offer-applications', 'applied-jobs', 'enquiries', 'popup-submissions', 'ideas',
    'blogs', 'portfolio', 'testimonials', 'jobs', 'offers', 'authors', 'categories',
    'media', 'resumes',
  ];
  for (const c of order) {
    const { docs } = await payload.find({ collection: c as never, limit: 1000, depth: 0 });
    for (const d of docs) {
      await payload.delete({ collection: c as never, id: (d as { id: string | number }).id });
    }
    if (docs.length) console.log(`  wiped ${docs.length.toString().padStart(4)} from ${c}`);
  }
}

// --- independent collections ------------------------------------------------

for (const a of await read<Record<string, unknown>>('author')) {
  await create('authors', {
    name: a.name ?? 'Unknown', designation: a.designation, description: a.description, profile: a.profile,
  }, a.id as number);
}

for (const c of await read<Record<string, unknown>>('categories')) {
  await create('categories', { name: c.name, slug: c.slug, description: c.description }, c.id as number);
}

for (const t of await read<Record<string, unknown>>('testimonials')) {
  await create('testimonials', {
    feedbackBy: t.feedback_by, feedbackDescp: t.feedback_descp, compAndDesig: t.comp_and_desig,
  }, t.id as number);
}

for (const j of await read<Record<string, unknown>>('jobs')) {
  await create('jobs', {
    title: j.title ?? 'Untitled',
    // production has no slug on jobs; derive one so seeded rows are addressable
    slug: `${slugify(String(j.title ?? 'job'))}-${j.id}`,
    descp: j.descp,
    responsibilities: j.responsibilities ?? [], qualifications: j.qualifications ?? [], skills: j.skills ?? [],
    location: j.location, jobMode: j.job_mode, jobType: j.job_type, package: j.package,
    visibility: Boolean(j.visibility),
  }, j.id as number);
}

for (const o of await read<Record<string, unknown>>('offers')) {
  await create('offers', {
    title: o.title, description: o.description,
    termsPoints: (o as Record<string, string[]>)['t&c_points'] ?? [],
    active: o.active !== false,
  }, o.id as number);
}

// --- media (only with --images) ---------------------------------------------

/** production `image` jsonb is `[{fileId,url}]`; jsonb[] on portfolio. */
const firstImage = (raw: unknown): { url?: string; fileId?: string } | undefined => {
  if (!raw) return undefined;
  const arr = Array.isArray(raw) ? raw : [raw];
  const first = arr[0];
  if (!first) return undefined;
  return typeof first === 'string' ? (JSON.parse(first) as { url?: string }) : (first as { url?: string });
};

const mediaByLegacyUrl = new Map<string, string | number>();

const ensureMedia = async (raw: unknown, alt: string): Promise<string | number | undefined> => {
  const img = firstImage(raw);
  if (!img?.url) return undefined;
  if (mediaByLegacyUrl.has(img.url)) return mediaByLegacyUrl.get(img.url);
  if (!IMAGES || DRY) return undefined;

  try {
    const res = await fetch(img.url);
    if (!res.ok) { skipped.push(`media: ${img.url} -> HTTP ${res.status}`); return undefined; }
    const buf = Buffer.from(await res.arrayBuffer());
    const filename = decodeURIComponent(new URL(img.url).pathname.split('/').pop() || 'image.jpg');
    const doc = await payload.create({
      collection: 'media',
      data: { alt } as never,
      file: { data: buf, name: filename, mimetype: res.headers.get('content-type') ?? 'image/jpeg', size: buf.length },
    });
    const id = (doc as { id: string | number }).id;
    mediaByLegacyUrl.set(img.url, id);
    counts.media = (counts.media ?? 0) + 1;
    return id;
  } catch (err) {
    skipped.push(`media: ${(err as Error).message.slice(0, 100)}`);
    return undefined;
  }
};

// --- dependent collections --------------------------------------------------

for (const b of await read<Record<string, unknown>>('blogs')) {
  const coverImage = await ensureMedia(b.image, (b.title as string) ?? 'Blog image');
  await create('blogs', {
    title: b.title ?? 'Untitled', slug: b.slug ?? `post-${b.id}`,
    status: b.status === 'published' ? 'published' : 'draft',
    descp: b.descp, service: b.service,
    readTime: b.read_time ?? 2,
    tags: b.tags ?? [], metaKeywords: b.meta_keywords ?? [],
    metaTitle: b.meta_title, metaDescription: b.meta_description, canonicalUrl: b.canonical_url,
    author: lookup('authors', b.author_id), category: lookup('categories', b.category_id),
    ...(coverImage ? { coverImage } : {}),
  }, b.id as number);
}

for (const p of await read<Record<string, unknown>>('portfolio')) {
  const img = await ensureMedia(p.image, (p.title as string) ?? 'Portfolio image');
  await create('portfolio', {
    title: p.title ?? 'Untitled',
    slug: slugify(String(p.title ?? `project-${p.id}`)),
    descp: p.descp, active: p.active !== false,
    ...(img ? { images: [img] } : {}),
  }, p.id as number);
}

for (const a of await read<Record<string, unknown>>('applied_jobs')) {
  await create('applied-jobs', {
    fullname: a.fullname, email: a.email, phone: String(a.phone ?? ''),
    experience: a.experience ?? '0-1',
    linkedinUrl: a.linkedin_url, githubUrl: a.github_url, coverLetter: a.cover_letter,
    job: lookup('jobs', a.job_id),
    // Files are intentionally not fetched — see header.
    legacyResumeUrl: a.resume_url || undefined,
  }, a.id as number);
}

for (const e of await read<Record<string, unknown>>('enquiry')) {
  await create('enquiries', {
    fullname: e.fullname, email: e.email, contact: e.contact, subject: e.subject, message: e.message,
  }, e.id as number);
}

for (const p of await read<Record<string, unknown>>('popup_form')) {
  await create('popup-submissions', {
    name: p.name, email: p.email, service: p.service, phone: p.phone, country: p.country,
    legacyUuid: p.id as string,
  }, p.id as string);
}

for (const i of await read<Record<string, unknown>>('ideas')) {
  await create('ideas', { mail: i.mail, ideaDescp: i.idea_descp }, i.id as number);
}

for (const oa of await read<Record<string, unknown>>('offer_applications')) {
  await create('offer-applications', {
    name: oa.name, email: oa.email, mobile: oa.mobile, companyName: oa.company_name,
    offer: lookup('offers', oa.offer_id),
  }, oa.id as number);
}

// ---------------------------------------------------------------------------

console.log(`\n${DRY ? 'DRY RUN — nothing written' : 'Seeded'}:`);
for (const [c, n] of Object.entries(counts).sort()) console.log(`  ${c.padEnd(22)} ${n}`);
if (skipped.length) {
  console.log(`\n${skipped.length} skipped:`);
  for (const s of skipped.slice(0, 20)) console.log(`  ${s}`);
  if (skipped.length > 20) console.log(`  ...and ${skipped.length - 20} more`);
}
if (!IMAGES) console.log('\nImages not uploaded (pass --images to exercise the ImageKit adapter).');
process.exit(0);
