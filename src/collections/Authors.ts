import type { CollectionConfig } from 'payload';

import { adminOnly, publicRead } from '../access';

/** Maps production `public.author` (5 rows). `profile` is a LinkedIn URL, not an avatar. */
export const Authors: CollectionConfig = {
  slug: 'authors',
  access: { read: publicRead, create: adminOnly, update: adminOnly, delete: adminOnly },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'designation'], group: 'Content' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'designation', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'profile',
      type: 'text',
      label: 'LinkedIn URL',
      admin: {
        description:
          'Rendered as a link on blog posts. This is a profile URL, not an image — the production column name is misleading.',
      },
    },
    { name: 'avatar', type: 'upload', relationTo: 'media', admin: { description: 'New. No equivalent in production.' } },
  ],
};

export default Authors;
