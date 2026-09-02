import type { CollectionConfig } from 'payload';

import { adminOnly, publishedOrAdmin } from '../access';

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
    { name: 'descp', type: 'code', admin: { language: 'html', description: 'Case-study body as HTML, preserved from production.' } },
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'active', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar', description: 'Unchecked hides it from the public site.' } },
  ],
};

export default Portfolio;
