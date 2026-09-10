import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';
import type { Where } from 'payload';

import type { ContentReader } from './index';
import type {
  AuthorType,
  BlogType,
  CategoryType,
  DBOffer,
  IFileUpload,
  IPortfolio,
  Job,
} from '../../types';

/**
 * The Payload reader.
 *
 * Its whole job is to be indistinguishable from `supabase.ts` at the component
 * boundary. The two stores disagree about almost everything below that line —
 * casing, media, rich text, relationships — so every difference is absorbed
 * here rather than pushed into the pages:
 *
 *  - **Rich text.** `blogs.descp` and `portfolio.descp` are Lexical documents.
 *    The blog page builds its table of contents by assigning `descp` to
 *    `innerHTML` and walking the headings, so the field has to arrive as an
 *    HTML string or the TOC silently empties. Converted here.
 *  - **Media.** An upload relationship becomes the `{ fileId, url }[]` shape
 *    the cards and detail pages already index into.
 *  - **Casing.** `createdAt` / `metaTitle` / `jobMode` become `created_at` /
 *    `meta_title` / `job_mode`.
 *
 * Queries state their public filter explicitly rather than leaning on access
 * control, so they mirror the Supabase queries line for line and the two
 * readers can be compared as like for like.
 */

type MediaLike = { id: number | string; url?: string | null } | number | string | null | undefined;

/**
 * Everything leaving this module goes through here.
 *
 * `getServerSideProps` refuses to serialise `undefined` and fails the whole
 * route with a stack trace — which is exactly what an optional relationship
 * produces when a post has no category. Fixing the three fields that did it is
 * not enough: any future adapter field that returns `undefined` for missing
 * data would fail the same way, and only for the documents that happen to omit
 * it, so a seeded database can pass while production breaks.
 *
 * JSON.stringify drops undefined-valued keys, so a round trip makes the result
 * serialisable by construction. The adapters still return `null` deliberately —
 * this is the net beneath them, not a substitute for meaning it.
 */
const serialisable = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

/** A relationship comes back as an id when unpopulated; only a document is usable. */
const isDoc = <T extends object>(value: unknown): value is T =>
  typeof value === 'object' && value !== null;

const toFileUpload = (media: MediaLike): IFileUpload | null => {
  if (!isDoc<{ id: number | string; url?: string | null }>(media)) return null;
  if (!media.url) return null;
  return { fileId: String(media.id), url: media.url };
};

const toFileUploads = (media: MediaLike | MediaLike[]): IFileUpload[] | null => {
  const list = (Array.isArray(media) ? media : [media])
    .map(toFileUpload)
    .filter((f): f is IFileUpload => f !== null);
  return list.length > 0 ? list : null;
};

/**
 * Lexical to HTML.
 *
 * Returns '' rather than throwing on a malformed document: one bad post should
 * cost that post its body, not take the route down with a 500.
 */
const richTextToHtml = (value: unknown): string => {
  if (typeof value === 'string') return value; // already HTML (pre-migration row)
  if (!isDoc<{ root?: unknown }>(value) || !value.root) return '';
  try {
    return convertLexicalToHTML({ data: value as never });
  } catch {
    return '';
  }
};

const toAuthor = (value: unknown): AuthorType | null => {
  if (!isDoc<Record<string, unknown>>(value)) return null;
  return {
    name: (value.name as string) ?? null,
    designation: (value.designation as string) ?? null,
    description: (value.description as string) ?? null,
    profile: (value.profile as string) ?? null,
  };
};

const toCategory = (value: unknown): CategoryType | null => {
  if (!isDoc<Record<string, unknown>>(value)) return null;
  return {
    id: Number(value.id),
    name: (value.name as string) ?? '',
    created_at: (value.createdAt as string) ?? '',
    updated_at: (value.updatedAt as string) ?? '',
  };
};

const toBlog = (doc: Record<string, unknown>): BlogType => ({
  id: Number(doc.id),
  title: (doc.title as string) ?? '',
  slug: (doc.slug as string) ?? null,
  descp: richTextToHtml(doc.descp),
  image: toFileUploads(doc.coverImage as MediaLike),
  created_at: (doc.createdAt as string) ?? '',
  updated_at: (doc.updatedAt as string) ?? '',
  service: (doc.service as string) ?? null,
  author: toAuthor(doc.author),
  categories: toCategory(doc.category),
  meta_title: (doc.metaTitle as string) ?? null,
  meta_description: (doc.metaDescription as string) ?? null,
  meta_keywords: (doc.metaKeywords as string[]) ?? null,
  canonical_url: (doc.canonicalUrl as string) ?? null,
  tags: (doc.tags as string[]) ?? null,
  read_time: (doc.readTime as number) ?? null,
  status: (doc.status as 'draft' | 'published') ?? 'published',
});

const toJob = (doc: Record<string, unknown>): Job => ({
  id: Number(doc.id),
  title: (doc.title as string) ?? '',
  descp: (doc.descp as string) ?? '',
  responsibilities: (doc.responsibilities as string[]) ?? [],
  qualifications: (doc.qualifications as string[]) ?? [],
  skills: (doc.skills as string[]) ?? [],
  location: (doc.location as string) ?? '',
  job_mode: (doc.jobMode as Job['job_mode']) ?? null,
  job_type: (doc.jobType as Job['job_type']) ?? null,
  package: (doc.package as string) ?? '',
  created_at: (doc.createdAt as string) ?? '',
  updated_at: (doc.updatedAt as string) ?? '',
});

const toPortfolio = (doc: Record<string, unknown>): IPortfolio => ({
  id: Number(doc.id),
  title: (doc.title as string) ?? null,
  descp: richTextToHtml(doc.descp),
  image: toFileUploads(doc.images as MediaLike[]),
  active: doc.active !== false,
});

/**
 * Detail routes are `/career/4/` and `/portfolio/4/` today and will be slug
 * URLs later. Accepting either means the slugs can go live without breaking a
 * single existing link, and the redirects collection decides when — rather than
 * the cutover forcing that decision on the same day.
 */
const refWhere = (ref: string): Where =>
  /^\d+$/.test(ref) ? { or: [{ id: { equals: Number(ref) } }, { slug: { equals: ref } }] } : { slug: { equals: ref } };

const getPayloadClient = async () => {
  const [{ getPayload }, config] = await Promise.all([
    import('payload'),
    import('@payload-config').then((m) => m.default),
  ]);
  return getPayload({ config });
};

export const payloadReader: ContentReader = {
  async listBlogs() {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'blogs',
      where: { status: { equals: 'published' } },
      sort: '-createdAt',
      limit: 0,
      depth: 1,
    });
    return serialisable(docs.map((d) => toBlog(d as unknown as Record<string, unknown>)));
  },

  async getBlogBySlug(slug, includeDrafts = false) {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'blogs',
      where: includeDrafts
        ? { slug: { equals: slug } }
        : { and: [{ status: { equals: 'published' } }, { slug: { equals: slug } }] },
      limit: 1,
      depth: 2, // author and category have to arrive as documents, not ids
    });
    const doc = docs[0];
    return doc ? serialisable(toBlog(doc as unknown as Record<string, unknown>)) : null;
  },

  async listJobs() {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'jobs',
      where: { visibility: { equals: true } },
      limit: 0,
      depth: 0,
    });
    return serialisable(docs.map((d) => toJob(d as unknown as Record<string, unknown>)));
  },

  async getJobByRef(ref) {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'jobs',
      where: { and: [{ visibility: { equals: true } }, refWhere(ref)] },
      limit: 1,
      depth: 0,
    });
    const doc = docs[0];
    return doc ? serialisable(toJob(doc as unknown as Record<string, unknown>)) : null;
  },

  /**
   * KNOWN DIVERGENCE, deliberate. The Supabase query filters nothing: every
   * portfolio row is public whatever its `active` column says. Payload's own
   * access rule is `active === true`, so an anonymous REST read already hides
   * inactive entries — leaving the filter off here would make the Local API
   * disagree with the REST API about what is public, which is a worse bug than
   * the difference itself. The parity check knows about this one.
   */
  async listPortfolio() {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'portfolio',
      where: { active: { equals: true } },
      sort: '-id',
      limit: 0,
      depth: 1,
    });
    return serialisable(docs.map((d) => toPortfolio(d as unknown as Record<string, unknown>)));
  },

  async getPortfolioByRef(ref) {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'portfolio',
      where: { and: [{ active: { equals: true } }, refWhere(ref)] },
      limit: 1,
      depth: 1,
    });
    const doc = docs[0];
    return doc ? serialisable(toPortfolio(doc as unknown as Record<string, unknown>)) : null;
  },

  async listOffers() {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'offers',
      where: { active: { equals: true } },
      limit: 0,
      depth: 0,
    });
    return serialisable(
      docs.map((d) => {
        const doc = d as unknown as Record<string, unknown>;
        return {
          id: Number(doc.id),
          title: (doc.title as string) ?? '',
          description: (doc.description as string) ?? '',
          active: doc.active !== false,
          // Icons live in the repo, not the database; the caller joins them.
          icon: { src: '' },
          't&c_points': (doc.termsPoints as never) ?? [],
        } as DBOffer;
      })
    );
  },
};
