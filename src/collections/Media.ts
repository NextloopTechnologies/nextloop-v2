import type { CollectionConfig } from 'payload';

/**
 * Public image library — blog covers, portfolio shots, anything rendered on the
 * marketing site.
 *
 * Deliberately separate from `resumes`. Candidate CVs must never share an
 * access model with content that is public by design.
 */
export const Media: CollectionConfig = {
  slug: 'media',

  access: {
    // Public read: these are rendered on the marketing site.
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'updatedAt'],
    group: 'Assets',
  },

  upload: {
    mimeTypes: ['image/*'],
    // Payload writes width/height/filesize/mimeType itself; these are the
    // rendition sizes the site actually needs.
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'hero', width: 1600, height: 900, position: 'centre' },
      // 1200x630 is the Open Graph standard. The site currently ships no OG
      // tags at all; this gives them something correctly sized to point at.
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description:
          'Describes the image for screen readers and search engines. Required — the current site has images with no alt text.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Optional visible caption.' },
    },
    {
      name: 'credit',
      type: 'text',
      admin: { description: 'Attribution, where one is required.' },
    },
  ],
};

export default Media;
