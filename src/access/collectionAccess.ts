import type { Access, CollectionConfig } from 'payload';

import { publicRead, publishedOrAdmin } from './index';
import { hasAnyRole, type Role } from './roles';

/**
 * The access matrix.
 *
 * One table, read top to bottom, is the entire authorisation model for the
 * panel. That is the point of putting it here rather than spreading `access`
 * blocks across fifteen collection files: a permission question ("can sales
 * delete a blog post?") should be answerable by looking at one screen, and a
 * mistake should be visible as an odd-looking row rather than as an omission in
 * a file nobody opened.
 *
 * Roles grant **write**. Read is a separate axis, below, because most of this
 * content is already public.
 */

/** Every collection slug in the config. Mirrored by `assertRBACCoverage`. */
export type CollectionSlug =
  | 'blogs'
  | 'authors'
  | 'categories'
  | 'portfolio'
  | 'testimonials'
  | 'offers'
  | 'media'
  | 'enquiries'
  | 'popup-submissions'
  | 'ideas'
  | 'offer-applications'
  | 'jobs'
  | 'applied-jobs'
  | 'resumes'
  | 'users';

/**
 * A bare array is full CRUD for those roles. The `{ read, write }` form exists
 * for `media`, where sales needs to *see* images so portfolio and testimonial
 * previews resolve in the panel, but has no business replacing them.
 */
type RoleEntry =
  | readonly Role[]
  | { readonly read: readonly Role[]; readonly write: readonly Role[] };

const COLLECTION_ROLES: Record<CollectionSlug, RoleEntry> = {
  // --- Marketing: the published-content surface -------------------------
  blogs: ['marketing'],
  authors: ['marketing'],
  categories: ['marketing'],

  // Shared. Sales quotes case studies and testimonials in proposals and is
  // expected to keep them current; marketing owns how they look on the site.
  portfolio: ['marketing', 'sales'],
  testimonials: ['marketing', 'sales'],
  offers: ['marketing', 'sales'],

  // The one split. Read for both so relationship previews resolve; write for
  // marketing only, so the asset library has a single owner.
  media: { read: ['marketing', 'sales'], write: ['marketing'] },

  // --- Sales: the inbound-lead surface ----------------------------------
  enquiries: ['sales'],
  'popup-submissions': ['sales'],
  ideas: ['sales'],
  'offer-applications': ['sales'],

  // --- HR: the hiring surface -------------------------------------------
  // `resumes` is candidate CVs. Marketing and sales have no reason to hold
  // them and therefore do not.
  jobs: ['hr'],
  'applied-jobs': ['hr'],
  resumes: ['hr'],

  // --- Admin only -------------------------------------------------------
  // Empty means "no non-admin role", since admin is implied by `hasAnyRole`.
  // `users` does not actually call `roleAccess` — it has its own rules in
  // src/collections/Users.ts — but it is listed so coverage stays total.
  users: [],
};

/**
 * Read is not a role question for most of this content.
 *
 * Eight collections are readable by anonymous visitors today, and
 * `scripts/regression/access.mjs` asserts each of them returns 200 to a caller
 * with no credentials at all. Role-gating those reads would not protect
 * anything — the same rows are one unauthenticated request away — it would just
 * break the public API contract and the test that guards it.
 *
 * So the existing rules are preserved verbatim, including their
 * published-only filters, and roles are layered onto the write half. The
 * collections absent from this map (leads, resumes, users) have no public read
 * and fall through to the role gate.
 *
 * One visible consequence: because these rules key off `Boolean(req.user)`
 * rather than off a role, a sales user sees Blogs in the panel sidebar. It is
 * read-only to them — create, update and delete are all refused — and they
 * could read the same posts logged out. Hiding it is an `admin.hidden`
 * question, not an access one.
 */
const PUBLIC_READ: Partial<Record<CollectionSlug, Access>> = {
  blogs: publishedOrAdmin('status', 'published'),
  authors: publicRead,
  categories: publicRead,
  portfolio: publishedOrAdmin('active', true),
  testimonials: publicRead,
  jobs: publishedOrAdmin('visibility', true),
  offers: publishedOrAdmin('active', true),
  media: publicRead,
};

const readRoles = (entry: RoleEntry): readonly Role[] =>
  Array.isArray(entry) ? entry : (entry as { read: readonly Role[] }).read;

const writeRoles = (entry: RoleEntry): readonly Role[] =>
  Array.isArray(entry) ? entry : (entry as { write: readonly Role[] }).write;

/** Anyone holding one of `roles` — or any admin, via `hasAnyRole`. */
const gate =
  (roles: readonly Role[]): Access =>
  ({ req }) =>
    hasAnyRole(req.user, roles);

/**
 * The access block for a collection, derived from the matrix.
 *
 * `readVersions` is set **explicitly and deliberately**. Payload's default for
 * it is any authenticated user, so leaving it off would mean a sales account
 * could page through the draft history of every blog post — the unpublished
 * copy that `read`'s `status = published` filter exists to hide. Gating it on
 * the *write* roles rather than the read roles follows from what a version
 * actually is: whoever may edit a document may see what it used to say, and
 * nobody else. No collection enables `versions` today; this is here so that
 * turning it on later is not a silent disclosure.
 */
export const roleAccess = (
  slug: CollectionSlug
): CollectionConfig['access'] => {
  const entry = COLLECTION_ROLES[slug];
  const write = writeRoles(entry);

  return {
    read: PUBLIC_READ[slug] ?? gate(readRoles(entry)),
    readVersions: gate(write),
    create: gate(write),
    update: gate(write),
    delete: gate(write),
  };
};

/**
 * Fails the boot if the matrix and the config have drifted apart.
 *
 * Payload's default access is "any authenticated user". So a collection added
 * to the config and forgotten here is not inert — it is **open to every role**,
 * including a sales account reading candidate CVs. That failure is silent,
 * looks like nothing, and is exactly the kind of thing that is noticed months
 * later, so it is converted into a crash at startup.
 *
 * The reverse direction (a slug in the matrix that no longer exists) is also an
 * error, because a stale row makes the table lie about what is protected.
 *
 * Called from payload.config.ts before `buildConfig`.
 */
export const assertRBACCoverage = (
  collections: readonly { slug: string }[]
): void => {
  const configured = new Set(collections.map((c) => c.slug));
  const mapped = new Set<string>(Object.keys(COLLECTION_ROLES));

  // Array.from rather than spread: tsconfig targets es5, where iterating a Set
  // needs --downlevelIteration. Same reason src/pages/api/forms/[kind].ts does it.
  const unmapped = Array.from(configured)
    .filter((slug) => !mapped.has(slug))
    .sort();
  const stale = Array.from(mapped)
    .filter((slug) => !configured.has(slug))
    .sort();

  if (unmapped.length === 0 && stale.length === 0) return;

  const lines = ['RBAC coverage check failed.'];
  if (unmapped.length > 0) {
    lines.push(
      `  Collections with no entry in COLLECTION_ROLES: ${unmapped.join(
        ', '
      )}.`,
      '  Payload would default these to "any authenticated user", i.e. readable and',
      '  writable by every role. Add them to src/access/collectionAccess.ts.'
    );
  }
  if (stale.length > 0) {
    lines.push(
      `  Entries in COLLECTION_ROLES with no such collection: ${stale.join(
        ', '
      )}.`,
      '  Remove them so the matrix describes what actually exists.'
    );
  }

  throw new Error(lines.join('\n'));
};
