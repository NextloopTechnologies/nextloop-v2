import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload';

import { roleAccess } from '../access/collectionAccess';
import { slugField } from '../fields/slug';

/**
 * Stamps `publishedAt` the first time a post goes live.
 *
 * Without it the field is one more thing an editor has to remember, and a post
 * saved with it blank would show no date at all. It is only ever filled when
 * empty: an editor who backdates a post, or corrects a wrong date, keeps the
 * value they set — this never overwrites one.
 *
 * `data` on an update carries only the fields that changed, so `status` and
 * `publishedAt` are read from `originalDoc` when the incoming payload omits
 * them. Reading `data` alone would re-stamp a published post on every edit
 * that happened not to touch those two fields.
 */
const stampPublishedAt: CollectionBeforeChangeHook = ({
  data,
  originalDoc,
}) => {
  const status = data?.status ?? originalDoc?.status;
  const publishedAt = data?.publishedAt ?? originalDoc?.publishedAt;
  if (status !== 'published' || publishedAt) return data;
  return { ...data, publishedAt: new Date().toISOString() };
};

/**
 * Maps production `public.blogs` (7 rows).
 *
 * Notable carry-overs from the live schema:
 *  - `descp` is HTML authored in react-quill, not Lexical. Kept as a code/HTML
 *    field so the 7 existing posts migrate byte-for-byte; converting to Lexical
 *    is a separate decision, not a migration side effect.
 *  - `image` is jsonb holding `[{fileId, url}]` and only `[0]` is ever read, so
 *    it becomes a single upload relationship rather than an array.
 *  - `meta_title`/`meta_description` already exist in production with 60/160
 *    caps. The site never renders them — that is a front-end gap, not a data one.
 *  - `author_id` defaults to 5 in production. That default is deliberately NOT
 *    reproduced: a hardcoded fallback author silently mis-attributes posts.
 */
export const Blogs: CollectionConfig = {
  slug: 'blogs',

  access: roleAccess('blogs'),

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'status', 'publishedAt'],
    group: 'Content',
    /**
     * Renders the Preview button in the document header.
     *
     * It points at `/api/preview/`, not straight at `/blog/<slug>/`, because a
     * draft is not readable on the public route by design. That endpoint checks
     * the caller's admin session and mints a short-lived, slug-scoped cookie —
     * the button is the entry point, the authorisation lives there. Returning
     * null for a post with no slug yet hides the button rather than offering a
     * link to a 404.
     */
    preview: (doc) => {
      const slug = typeof doc?.slug === 'string' ? doc.slug : '';
      return slug ? `/api/preview/?slug=${encodeURIComponent(slug)}` : null;
    },
  },

  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      label: 'Publish date',
      type: 'date',
      index: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' },
        description:
          'The date the site shows on the post. Filled in automatically the first time it is published — set it by hand to backdate an import or to correct a date. The listing orders posts by this, so changing it moves the post.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Migrated from the first entry of the old image jsonb.',
      },
    },
    {
      name: 'descp',
      type: 'richText',
      label: 'Body',
      admin: {
        description:
          'The existing 7 posts are HTML from react-quill; the migration converts them to rich text so editors get a proper editor rather than raw markup.',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'readTime',
      type: 'number',
      required: true,
      defaultValue: 2,
      admin: { position: 'sidebar', description: 'Minutes.' },
    },
    {
      name: 'service',
      type: 'text',
      admin: {
        description: 'Legacy free-text field carried over from production.',
      },
    },
    {
      type: 'collapsible',
      label: 'SEO',
      admin: {
        description:
          'These already exist in the database but the site renders none of them — blog posts currently ship with no title or description at all.',
      },
      fields: [
        { name: 'metaTitle', type: 'text', maxLength: 60 },
        { name: 'metaDescription', type: 'textarea', maxLength: 160 },
        { name: 'metaKeywords', type: 'text', hasMany: true },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Shown when the post is shared. Use the 1200x630 "og" size — the site ships no Open Graph tags today.',
          },
        },
        {
          name: 'canonicalUrl',
          type: 'text',
          admin: {
            description:
              'Only set this when the post is republished from elsewhere.',
          },
        },
      ],
    },
    {
      name: 'featuredBlogs',
      type: 'relationship',
      relationTo: 'blogs',
      hasMany: true,
      admin: {
        description: 'Related posts. Was an int[] of blog ids in production.',
      },
    },
  ],

  hooks: {
    beforeChange: [stampPublishedAt],
  },
};

export default Blogs;
