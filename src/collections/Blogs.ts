import type { CollectionConfig } from 'payload';

import { adminOnly, publishedOrAdmin } from '../access';

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

  access: {
    read: publishedOrAdmin('status', 'published'),
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'status', 'updatedAt'],
    group: 'Content',
  },

  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL path segment. Changing it breaks existing links.' },
    },
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
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Migrated from the first entry of the old image jsonb.' },
    },
    {
      name: 'descp',
      type: 'code',
      admin: {
        language: 'html',
        description:
          'Post body as HTML, preserved from the react-quill editor. Existing posts migrate unchanged.',
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
    { name: 'tags', type: 'text', hasMany: true, admin: { position: 'sidebar' } },
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
      admin: { description: 'Legacy free-text field carried over from production.' },
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
          name: 'canonicalUrl',
          type: 'text',
          admin: { description: 'Only set this when the post is republished from elsewhere.' },
        },
      ],
    },
    {
      name: 'featuredBlogs',
      type: 'relationship',
      relationTo: 'blogs',
      hasMany: true,
      admin: { description: 'Related posts. Was an int[] of blog ids in production.' },
    },
  ],
};

export default Blogs;
