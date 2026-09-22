import type { CollectionConfig } from 'payload';

import { roleAccess } from '../access/collectionAccess';

/**
 * Maps production `public.testimonials` (6 rows).
 * These are maintained in the admin panel but rendered nowhere on the site —
 * which is why the homepage claims high satisfaction with no testimonials shown.
 */
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: roleAccess('testimonials'),
  admin: {
    useAsTitle: 'feedbackBy',
    defaultColumns: ['feedbackBy', 'compAndDesig'],
    group: 'Content',
  },
  fields: [
    { name: 'feedbackBy', type: 'text', label: 'Name' },
    { name: 'feedbackDescp', type: 'textarea', label: 'Quote' },
    { name: 'compAndDesig', type: 'text', label: 'Company & designation' },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
  ],
};

export default Testimonials;
