import fs from 'fs';
import type { GetStaticProps } from 'next';
import { Poppins } from 'next/font/google';
import path from 'path';
import React from 'react';

import '../../styles/ai-consultancy.css';

import BlogSection from '../../components/BlogSection';
import ConsultBehaviors from '../../components/ClientHtmlPages/ConsultBehaviors';
import ConsultBookForm from '../../components/ClientHtmlPages/ConsultBookForm';
import SlotPortal from '../../components/ClientHtmlPages/SlotPortal';
import Layout from '../../components/Layout/Layout';
import Seo from '../../components/Seo';
import { BlogData } from '../../types';
import { fetchLatestBlogs } from '../../utils/fetchBlogdata';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const TITLE = 'AI Business Consultancy | AI Readiness Audit | Nextloop';
const DESC =
  'Plan AI before you build it. Nextloop maps the right use cases, security and cost so you do not spend on tools that cannot work in your business.';

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Business Consultancy',
    provider: { '@type': 'Organization', name: 'Nextloop Technologies' },
    areaServed: ['India', 'United States'],
    url: 'https://www.nextlooptechnologies.com/services/ai-business-consultancy/',
  },
];

const AiBusinessConsultancy: React.FC<{
  blogData: BlogData[];
  consultMarkup: string;
}> = ({ blogData, consultMarkup }) => (
  <Layout>
    <Seo title={TITLE} description={DESC} jsonLd={jsonLd} />
    <div className={`nl-consult ${poppins.className}`}>
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: consultMarkup }}
      />
      <SlotPortal id='consult-form-slot'>
        <ConsultBookForm />
      </SlotPortal>
      <ConsultBehaviors />
    </div>
    <BlogSection blogData={blogData} />
  </Layout>
);

export default AiBusinessConsultancy;

export const getStaticProps: GetStaticProps = async () => {
  const consultMarkup = fs.readFileSync(
    path.join(process.cwd(), 'src/content/consult.html'),
    'utf8'
  );
  return {
    props: { blogData: await fetchLatestBlogs(3), consultMarkup },
    revalidate: 3600,
  };
};
