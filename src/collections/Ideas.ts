import type { CollectionConfig } from 'payload';

import { submitOnly } from '../access';

/** Maps production `public.ideas` (2 rows). Managed in the admin panel, read nowhere on the site. */
export const Ideas: CollectionConfig = {
  slug: 'ideas',
  access: submitOnly,
  admin: { useAsTitle: 'mail', defaultColumns: ['mail', 'createdAt'], group: 'Leads' },
  fields: [
    { name: 'mail', type: 'email', required: true },
    { name: 'ideaDescp', type: 'textarea', required: true, label: 'Idea' },
  ],
};

export default Ideas;
