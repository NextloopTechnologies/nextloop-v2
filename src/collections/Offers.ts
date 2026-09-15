import type { CollectionConfig } from 'payload';

import { adminOnly, publishedOrAdmin } from '../access';

/**
 * Maps production `public.offers` (8 rows).
 * Production has a column literally named `t&c_points` (text[]) — renamed to a
 * normal identifier here so it stops needing quoting everywhere.
 */
export const Offers: CollectionConfig = {
  slug: 'offers',
  access: { read: publishedOrAdmin('active', true), create: adminOnly, update: adminOnly, delete: adminOnly },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'active', 'createdAt'], group: 'Offers' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'termsPoints', type: 'text', hasMany: true, label: 'Terms & conditions', admin: { description: 'Was the awkwardly named `t&c_points` column.' } },
    { name: 'active', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
};

export default Offers;
