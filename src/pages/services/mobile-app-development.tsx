import type { GetStaticProps } from 'next';
import React from 'react';

import ServicePage from '../../components/ServicePage/BaseServicePages';
import { BlogData } from '../../types';
import { fetchLatestBlogs } from '../../utils/fetchBlogdata';
import { servicesSubPagesData } from '../../utils/staticTextImgData';

const initialData = {
  ...servicesSubPagesData.mobileAppDevelopment,
  blogData: [] as BlogData[],
  schemaKey: 'service-mobile-app' as const,
};

const MobileDevelopment: React.FC<{ blogData: BlogData[] }> = ({ blogData }) => (
  <ServicePage {...initialData} blogData={blogData} />
);

export default MobileDevelopment;

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
