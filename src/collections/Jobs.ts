import type { CollectionConfig } from 'payload';

import { adminOnly, publishedOrAdmin } from '../access';
import { seoFields } from '../fields/seo';
import { slugField } from '../fields/slug';

/**
 * Maps production `public.jobs` (64 rows).
 * `visibility` is NOT NULL default false in production, so new jobs are hidden
 * until explicitly published — that behaviour is preserved.
 */
export const Jobs: CollectionConfig = {
  slug: 'jobs',
  access: { read: publishedOrAdmin('visibility', true), create: adminOnly, update: adminOnly, delete: adminOnly },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'location', 'jobMode', 'visibility'], group: 'Careers' },
  fields: [
    { name: 'title', type: 'text', required: true },
    // Production addresses jobs as /career/<numeric id>. A slug makes the
    // URL readable and indexable.
    slugField(),
    {
      name: 'descp',
      type: 'textarea',
      label: 'Description',
      admin: {
        rows: 10,
        description:
          'Plain text. The careers page renders this inside a <p>, so HTML here would show as literal markup.',
      },
    },
    { name: 'responsibilities', type: 'text', hasMany: true },
    { name: 'qualifications', type: 'text', hasMany: true },
    { name: 'skills', type: 'text', hasMany: true },
    { name: 'location', type: 'text' },
    {
      name: 'jobMode',
      type: 'select',
      options: ['Remote', 'On-site', 'Hybrid'],
      admin: { position: 'sidebar', description: 'Mirrors the enum_job_mode enum.' },
    },
    {
      name: 'jobType',
      type: 'select',
      options: ['Full Time', 'Part Time', 'Contract'],
      admin: { position: 'sidebar', description: 'Mirrors the enum_job_type enum.' },
    },
    { name: 'package', type: 'text', admin: { position: 'sidebar' } },
    {
      name: 'visibility',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Off by default, matching production. Unchecked jobs 404 publicly.' },
    },
    seoFields(),
  ],
};

export default Jobs;
