import type { Access } from 'payload';

/**
 * Shared access rules.
 *
 * These exist to replace the production RLS policies, which currently grant
 * `FOR ALL TO public USING (true)` on every table — i.e. anyone holding the
 * public anon key can read, modify and delete every row. Once the site reads
 * through Payload, those policies get dropped and these become the real
 * boundary, so they are deliberately explicit rather than clever.
 */

/** Signed-in staff only. The default for anything that isn't public content. */
export const adminOnly: Access = ({ req }) => Boolean(req.user);

/** Readable by the world. Use only for content the marketing site renders. */
export const publicRead: Access = () => true;

/**
 * Anyone may submit; only staff may read it back.
 *
 * This is the shape every lead table should have had: the public forms need to
 * insert, but nothing about a submission should ever be publicly readable.
 */
export const submitOnly = {
  create: (() => true) as Access,
  read: adminOnly,
  update: adminOnly,
  delete: adminOnly,
};

/**
 * Public users see only published rows; staff see everything.
 *
 * Payload turns the returned object into a query constraint, so drafts stay
 * invisible to anonymous reads without a second endpoint.
 */
export const publishedOrAdmin =
  (field: string, publishedValue: unknown): Access =>
  ({ req }) => {
    if (req.user) return true;
    return { [field]: { equals: publishedValue } };
  };
