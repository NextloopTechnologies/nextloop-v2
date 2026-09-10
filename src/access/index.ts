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
 * Inbound-only: the public forms write here, nothing about a submission is ever
 * publicly readable, and the REST API is not a way in.
 *
 * `create` is `adminOnly`, which reads like it would break the public forms and
 * does not. Every legitimate submission is written by `src/lib/content/writes.ts`
 * through `payload.create` on the **Local API**, which runs with
 * `overrideAccess: true` by default — access control is not consulted at all on
 * that path. So this rule governs exactly one caller: an anonymous HTTP client
 * posting straight at `/payload-api/<collection>`.
 *
 * That caller had to be shut out. `/api/forms/[kind]` enforces a 5-per-minute
 * rate limit, a honeypot, field validation and (once a real secret is set)
 * reCAPTCHA. None of that lives in the database layer, so while REST create was
 * public the front door was locked and the side door was not: posting directly
 * at `/payload-api/enquiries` accepted unlimited writes with none of those
 * checks. Same door on applied-jobs, popup-submissions, ideas and
 * offer-applications.
 *
 * Staff keep create so a lead can still be added by hand in the admin panel.
 */
export const submitOnly = {
  create: adminOnly,
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
