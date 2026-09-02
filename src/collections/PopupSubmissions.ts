import type { CollectionConfig } from 'payload';

import { submitOnly } from '../access';

/**
 * Maps production `public.popup_form` (28 rows).
 * The only production table with sanely scoped policies (separate INSERT and
 * SELECT for anon) — but still publicly readable, which this fixes.
 * Note its PK is uuid, unlike every other table's bigint/int.
 */
export const PopupSubmissions: CollectionConfig = {
  slug: 'popup-submissions',
  access: submitOnly,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'service', 'country', 'createdAt'],
    group: 'Leads',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'service', type: 'text', required: true },
    { name: 'phone', type: 'text' },
    { name: 'country', type: 'text' },
    { name: 'legacyUuid', type: 'text', admin: { readOnly: true, hidden: true, description: 'Original uuid PK, preserved for traceability.' } },
  ],
};

export default PopupSubmissions;
