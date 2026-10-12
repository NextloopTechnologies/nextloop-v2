import type { GetStaticProps } from 'next';
import React from 'react';

import ServicePage from '../../components/ServicePage/BaseServicePages';
import { BlogData } from '../../types';
import { fetchLatestBlogs } from '../../utils/fetchBlogdata';
import { servicesSubPagesData } from '../../utils/staticTextImgData';

const initialData = {
  ...servicesSubPagesData.staffingServices,
  blogData: [] as BlogData[],
  showStaffingTable: true,
  schemaKey: 'service-staff-augmentation' as const,
};

const StaffingDevelopment: React.FC<{ blogData: BlogData[] }> = ({
  blogData,
}) => (
  <ServicePage
    {...initialData}
    blogData={blogData}
    heroCtas
    faqTopDivider
    statsStrip={[
      { end: 40, suffix: '+', label: 'Successful Projects' },
      { end: 80, suffix: '+', label: 'Tech Professionals' },
      { end: 98, suffix: '%+', label: 'Client Satisfaction' },
    ]}
    midCta={{
      heading: 'Not Sure Which Engagement Model Fits?',
      description:
        "Tell us about your project and we'll map the right resource augmentation services, whether that is one specialist, a team extension or a full dedicated team, within two business days.",
    }}
    bottomCta={{
      heading: 'Ready to Scope Your Project?',
      description:
        'Talk to our engineering team about the developers you need. We will reply with matched profiles and clear next steps.',
    }}
  />
);

export default StaffingDevelopment;

/**
 * The latest-posts strip used to load in a `useEffect`, which meant the links
 * did not exist in the HTML — a crawler never saw them, so those internal links
 * to the blog counted for nothing, and the browser held the Supabase anon key
 * to fetch them. Server-side now: the links ship in the markup, and the content
 * seam (which reaches a server-only Payload API) can serve them.
 *
 * `revalidate` keeps the page static and lets a new post appear within the hour
 * without a deploy.
 */
export const getStaticProps: GetStaticProps = async () => ({
  props: { blogData: await fetchLatestBlogs(3) },
  revalidate: 3600,
});
