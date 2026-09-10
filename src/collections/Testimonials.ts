import type { CollectionConfig } from 'payload';

import { adminOnly, publicRead } from '../access';

/**
 * Maps production `public.testimonials` (6 rows).
 * These are maintained in the admin panel but rendered nowhere on the site —
 * which is why the homepage claims high satisfaction with no testimonials shown.
 */
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: { read: publicRead, create: adminOnly, update: adminOnly, delete: adminOnly },
  admin: { useAsTitle: 'feedbackBy', defaultColumns: ['feedbackBy', 'compAndDesig'], group: 'Content' },
  fields: [
    { name: 'feedbackBy', type: 'text', label: 'Name' },
    { name: 'feedbackDescp', type: 'textarea', label: 'Quote' },
    { name: 'compAndDesig', type: 'text', label: 'Company & designation' },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
  ],
};

export default Testimonials;
