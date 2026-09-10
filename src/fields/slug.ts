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
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
    .replace(/-+$/g, '');

const formatSlug =
  (sourceField: string): FieldHook =>
  ({ data, operation, value }) => {
    // A slug the editor set explicitly always wins.
    if (typeof value === 'string' && value.trim().length > 0) {
      return slugify(value);
    }

    // Only fill in on create, or when the field has been deliberately emptied.
    const source = data?.[sourceField];
    if (typeof source === 'string' && source.length > 0) {
      return slugify(source);
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
  hooks: {
    beforeValidate: [formatSlug(from)],
  },
});

export default slugField;
