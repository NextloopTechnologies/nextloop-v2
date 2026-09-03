import type { CollectionConfig } from 'payload';

import { adminOnly, publishedOrAdmin } from '../access';
import { seoFields } from '../fields/seo';
import { slugField } from '../fields/slug';

/**
 * Maps production `public.portfolio` (4 rows).
 * `image` is jsonb[] but only `[0]` is ever rendered; kept as hasMany so no
 * existing data is dropped during migration.
 */
export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  access: { read: publishedOrAdmin('active', true), create: adminOnly, update: adminOnly, delete: adminOnly },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'active', 'updatedAt'], group: 'Content' },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    {
      name: 'descp',
      type: 'richText',
      label: 'Case study',
      admin: {
        description:
          'NOTE: the current site renders this wrapped in an <h1>, so the whole case study is one giant heading. Fix that when the front end reads from Payload.',
      },
    },
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'active', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar', description: 'Unchecked hides it from the public site.' } },
    seoFields(),
  ],
};

export default Portfolio;
