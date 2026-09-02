import type { CollectionConfig } from 'payload';

import { submitOnly } from '../access';

/**
 * Maps production `public.offer_applications` (66 rows).
 *
 * This is the table behind the IDOR: the get-offer flow puts the whole row —
 * including name, email and mobile — into a URL query string, then updates it
 * by that id from the browser. With `FOR ALL TO public USING (true)` in force,
 * editing the id in the URL really does let anyone overwrite another person's
 * record. `submitOnly` closes that; the URL-borne PII is a separate front-end fix.
 */
export const OfferApplications: CollectionConfig = {
  slug: 'offer-applications',
  access: submitOnly,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'offer', 'companyName', 'createdAt'],
    group: 'Offers',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'mobile', type: 'text', required: true },
    { name: 'companyName', type: 'text' },
    { name: 'offer', type: 'relationship', relationTo: 'offers' },
  ],
};

export default OfferApplications;
