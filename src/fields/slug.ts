import type { Field, FieldHook } from 'payload';

/**
 * Reusable slug field.
 *
 * Production has slugs on `blogs` only — jobs and portfolio are addressed by
 * numeric id (`/career/42`, `/portfolio/4`), which is both unreadable and worth
 * nothing in search. This makes a slug standard across every public collection.
 *
 * Behaviour that matters:
 *  - Auto-generated from the source field ONLY when empty. Editing a title must
 *    never silently rewrite a live URL, so once a slug exists it stays put until
 *    someone deliberately clears it.
 *  - Unique and indexed, so a duplicate is a validation error rather than two
 *    pages fighting over one URL.
 *  - A slug someone supplied is never silently shortened. See below.
 */

/** Longer than any real slug; a guard against pathological input, not a policy. */
const MAX_SLUG = 200;

/** What a *generated* slug is allowed to grow to before it gets cut. */
const GENERATED_MAX = 96;

/**
 * Normalises characters. Does not shorten.
 *
 * Length is deliberately not this function's business. It used to end with
 * `.slice(0, 96)`, and because formatSlug ran it over explicitly-supplied
 * values as well as derived ones, migrating production truncated real slugs
 * mid-word: `...software-development` arrived as `...software-developm`. Six of
 * seven posts came through with a URL that does not match the live site, which
 * would have turned into 404s and lost inbound links the moment CONTENT_SOURCE
 * flipped to payload — the exact failure this field's own description warns
 * about.
 *
 * Silent truncation of something a person or a migration deliberately provided
 * is the bug. Rejecting it loudly is fine; quietly changing it is not.
 */
export const slugify = (input: string): string =>
  input
    .normalize('NFKD')
    // strip accents so "Café" becomes "cafe", not "caf"
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Shortens a GENERATED slug, and only at a hyphen.
 *
 * Cutting mid-word produces `...decision-maki`, which reads as a typo rather
 * than an abbreviation and is worse in a URL than simply being long. This only
 * ever applies to slugs derived from a title — nothing anyone typed or migrated
 * passes through here.
 */
const shorten = (slug: string, max = GENERATED_MAX): string => {
  if (slug.length <= max) return slug;
  const cut = slug.slice(0, max);
  const lastHyphen = cut.lastIndexOf('-');
  return (lastHyphen > max * 0.6 ? cut.slice(0, lastHyphen) : cut).replace(/-+$/g, '');
};

const formatSlug =
  (sourceField: string): FieldHook =>
  ({ data, operation, value }) => {
    // A slug the editor set explicitly always wins — normalised, never shortened.
    // Over-length is a validation error (see `validate`), not a silent edit.
    if (typeof value === 'string' && value.trim().length > 0) {
      return slugify(value);
    }

    // Only fill in on create, or when the field has been deliberately emptied.
    const source = data?.[sourceField];
    if (typeof source === 'string' && source.length > 0) {
      return shorten(slugify(source));
    }

    return operation === 'create' ? undefined : value;
  };

type Args = {
  /** Field to derive from when the slug is left blank. */
  from?: string;
  /** Shown under the field in the admin UI. */
  description?: string;
};

export const slugField = ({ from = 'title', description }: Args = {}): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description:
      description ??
      `Auto-filled from ${from} if left blank. Changing it after publish breaks existing links and any inbound SEO.`,
  },
  validate: (value: unknown) => {
    if (typeof value !== 'string' || value.length === 0) return 'A slug is required.';
    if (value.length > MAX_SLUG) {
      return `This slug is ${value.length} characters; the limit is ${MAX_SLUG}. Shorten it yourself — the field will not do it for you, because guessing where to cut a URL is how links break.`;
    }
    return true;
  },
  hooks: {
    beforeValidate: [formatSlug(from)],
  },
});

export default slugField;
