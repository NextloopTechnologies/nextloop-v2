import type { CollectionConfig } from 'payload';

import { adminOnly, publicRead } from '../access';

/**
 * Maps production `public.categories` (1 row).
 * Only 1 category exists and 5 of 7 blog posts have none assigned — worth
 * tidying during migration rather than carrying the gap forward.
 */
export const Categories: CollectionConfig = {
  slug: 'categories',
  access: { read: publicRead, create: adminOnly, update: adminOnly, delete: adminOnly },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug'], group: 'Content' },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 100 },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, maxLength: 100 },
    { name: 'description', type: 'textarea' },
  ],
};

export default Categories;
