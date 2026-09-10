import type { CollectionConfig } from 'payload';

import { submitOnly } from '../access';
import { notifyOnCreate } from '../lib/payload/notify';

/**
 * Maps production `public.applied_jobs` (6,896 rows).
 *
 * This is the table most exposed today: `FOR ALL TO public USING (true)` means
 * anyone with the anon key can read, alter or delete every candidate record.
 * `submitOnly` is the corrective — public create, staff-only everything else.
 *
 * `resume` replaces the bare `resume_url` text column. Routing it through the
 * private `resumes` collection means access is enforced on read rather than the
 * URL itself being the only thing standing between a CV and the internet.
 */
export const AppliedJobs: CollectionConfig = {
  slug: 'applied-jobs',
  access: submitOnly,

  // Saved first, notified second, and a mail failure never costs the lead.
  hooks: { afterChange: [notifyOnCreate('job application')] },
  admin: {
    useAsTitle: 'fullname',
    defaultColumns: ['fullname', 'email', 'job', 'experience', 'createdAt'],
    group: 'Careers',
    description: 'Candidate applications. Never publicly readable.',
  },
  fields: [
    { name: 'fullname', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true, admin: { description: 'Text, not numeric — production stores formatted numbers with country codes.' } },
    {
      name: 'job',
      type: 'relationship',
      relationTo: 'jobs',
      admin: { description: 'Nullable: production FK is ON DELETE SET NULL, so applications survive a deleted posting.' },
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'resumes',
      admin: { description: 'Private. 920 of the 6,896 production rows have an empty resume_url — those migrate with no file attached.' },
    },
    { name: 'experience', type: 'text', defaultValue: '0-1' },
    { name: 'linkedinUrl', type: 'text' },
    { name: 'githubUrl', type: 'text' },
    { name: 'coverLetter', type: 'textarea' },
    { name: 'legacyResumeUrl', type: 'text', admin: { readOnly: true, hidden: true, description: 'Original resume_url, kept for traceability.' } },
  ],
};

export default AppliedJobs;
