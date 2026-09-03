import type { Field } from 'payload';

/**
 * Reusable SEO group.
 *
 * `blogs` is the only production table with meta fields, and the site renders
 * none of them. Jobs, portfolio entries and everything else ship with no title
 * and no description at all — `/career/42` and `/portfolio/4` currently return
 * an empty `<title>`. Putting the same group on every public collection means
 * the data exists the moment the front end is wired up to read it.
 *
 * Lengths match what search engines actually display, and what production
 * already enforces on blogs (varchar 60 / 160).
 */
export const seoFields = (): Field => ({
  type: 'collapsible',
  label: 'SEO',
  admin: {
    initCollapsed: true,
    description: 'Leave blank to fall back to the title and excerpt.',
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      maxLength: 60,
      admin: { description: 'Truncated past ~60 characters in search results.' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 160,
      admin: { description: 'Truncated past ~160 characters.' },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Shown when the page is shared. The site has no Open Graph tags today, so links posted to LinkedIn or WhatsApp render bare — use the 1200x630 "og" size.',
      },
    },
  ],
});

export default seoFields;
