import type { CollectionConfig } from 'payload';

import { submitOnly } from '../access';
import { notifyOnCreate } from '../lib/payload/notify';

/** Maps production `public.enquiry` (529 rows) — contact-form submissions. */
export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  access: submitOnly,

  // Saved first, notified second, and a mail failure never costs the lead.
  hooks: { afterChange: [notifyOnCreate('enquiry')] },
  admin: {
    useAsTitle: 'fullname',
    defaultColumns: ['fullname', 'email', 'subject', 'createdAt'],
    group: 'Leads',
    description: 'Contact form submissions. Never publicly readable.',
  },
  fields: [
    { name: 'fullname', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'contact', type: 'text', label: 'Phone' },
    { name: 'subject', type: 'text', required: true },
    { name: 'message', type: 'textarea' },
  ],
};

export default Enquiries;
