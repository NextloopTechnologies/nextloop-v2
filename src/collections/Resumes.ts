import type { CollectionConfig } from 'payload';

/**
 * Private candidate CVs.
 *
 * Separate collection, not a folder inside `media`, because the access model is
 * the opposite: nothing here is ever publicly readable. Reads are proxied
 * through Payload's own file route so collection access control is enforced —
 * a raw CDN URL is not a credential.
 *
 * Context: today `applied_jobs.resume_url` holds a bare ImageKit URL that is
 * public to anyone who has it, and there is no way to revoke one. This is the
 * replacement for that.
 */
export const Resumes: CollectionConfig = {
  slug: 'resumes',

  access: {
    // Authenticated staff only — this is the whole point of the collection.
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    // Public create: applicants upload through the careers form. The endpoint
    // in front of this still enforces captcha, MIME and size limits.
    create: () => true,
  },

  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'candidateName', 'mimeType', 'filesize', 'createdAt'],
    group: 'Assets',
    description: 'Private. Never publicly readable.',
  },

  upload: {
    // No image renditions — these are documents, not pictures.
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    // NOTE: Payload has no per-collection size cap. The 8MB ceiling is set
    // globally in payload.config.ts (`upload.limits.fileSize`); the careers
    // endpoint in front of this enforces the same limit before Payload is hit.
    disableLocalStorage: true,
  },

  fields: [
    {
      name: 'candidateName',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Denormalised from the application for searchability.',
      },
    },
    {
      name: 'legacyResumeUrl',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
        description:
          'Original applied_jobs.resume_url, retained so migrated rows stay traceable.',
      },
    },
  ],
};

export default Resumes;
