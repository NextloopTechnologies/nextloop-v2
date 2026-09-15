import type { CollectionConfig } from 'payload';

import { submitOnly } from '../access';
import { notifyOnCreate } from '../lib/payload/notify';

/** Maps production `public.ideas` (2 rows). Managed in the admin panel, read nowhere on the site. */
export const Ideas: CollectionConfig = {
  slug: 'ideas',
  access: submitOnly,

  // Saved first, notified second, and a mail failure never costs the lead.
  hooks: { afterChange: [notifyOnCreate('idea submission')] },
  admin: { useAsTitle: 'mail', defaultColumns: ['mail', 'createdAt'], group: 'Leads' },
  fields: [
    { name: 'mail', type: 'email', required: true },
    { name: 'ideaDescp', type: 'textarea', required: true, label: 'Idea' },
  ],
};

export default Ideas;
