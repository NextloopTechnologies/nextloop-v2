import type { CollectionConfig } from 'payload';

import { roleAccess } from '../access/collectionAccess';

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

  /**
   * HR only — narrowed from "any authenticated user", which until now meant
   * marketing and sales could read every candidate CV.
   *
   * `create` is not public, despite applicants being anonymous. The careers
   * form uploads server-side through the Local API, which bypasses access
   * control, so this rule only ever applies to someone posting a file straight
   * at `/payload-api/resumes`. Leaving it open made that an unauthenticated
   * upload endpoint into the project's ImageKit account: free hosting for
   * anyone who found the URL, with the captcha, MIME and size checks all
   * sitting in front of a door nobody had to use.
   */
  access: roleAccess('resumes'),

  admin: {
    useAsTitle: 'filename',
    defaultColumns: [
      'filename',
      'candidateName',
      'mimeType',
      'filesize',
      'createdAt',
    ],
    group: 'Assets',
    description: 'Private. Never publicly readable.',
  },

  upload: {
    // No image renditions — these are documents, not pictures.
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      /**
       * A legacy .doc IS 'application/msword' — but the sniffer reports the
       * container it actually found, and pre-2007 Word files are Microsoft
       * Compound File Binary. So every .doc CV was being refused by a list that
       * names .doc on the line above.
       *
       * Found during the resume migration: the single most common rejection,
       * on files production had accepted for years. Excluding it is not a
       * policy anyone chose, it is a detection detail leaking into one.
       */
      'application/x-cfb',
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
