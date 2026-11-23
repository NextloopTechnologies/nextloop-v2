import fs from 'fs';
import type { GetStaticProps } from 'next';
import { Noto_Sans } from 'next/font/google';
import path from 'path';
import React from 'react';

import '../../styles/hospital-hms.css';

import BlogSection from '../../components/BlogSection';
import HmsDemoForm from '../../components/ClientHtmlPages/HmsDemoForm';
import SlotPortal from '../../components/ClientHtmlPages/SlotPortal';
import Layout from '../../components/Layout/Layout';
import Seo from '../../components/Seo';
import { BlogData } from '../../types';
import { fetchLatestBlogs } from '../../utils/fetchBlogdata';

const noto = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const TITLE = 'Hospital Management Software for Small Hospitals | Nextloop';
const DESC =
  'Cloud hospital management system for private hospitals of 30-100 beds in India, covering registration, billing, insurance and scheme claims, wards, pharmacy and lab.';

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Hospital Management Software',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    url: 'https://www.nextlooptechnologies.com/products/hospital-management-software/',
    provider: { '@type': 'Organization', name: 'Nextloop Technologies' },
    areaServed: { '@type': 'Country', name: 'India' },
    description: DESC,
  },
];

const HospitalManagementSoftware: React.FC<{
  blogData: BlogData[];
  hmsMarkup: string;
}> = ({ blogData, hmsMarkup }) => (
  <Layout>
    <Seo title={TITLE} description={DESC} jsonLd={jsonLd} />
    <div className={`nl-hms ${noto.className}`}>
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: hmsMarkup }}
      />
      <SlotPortal id='hms-form-slot'>
        <HmsDemoForm />
      </SlotPortal>
      <div className='dock'>
        <a className='btn' href='#demo'>
          Book a free demo
        </a>
        <a
          className='btn wa'
          href='https://wa.me/919893738323'
          rel='noopener noreferrer'
        >
          WhatsApp
        </a>
      </div>
    </div>
    <BlogSection blogData={blogData} />
  </Layout>
);

export default HospitalManagementSoftware;

export const getStaticProps: GetStaticProps = async () => {
  const hmsMarkup = fs.readFileSync(
    path.join(process.cwd(), 'src/content/hms.html'),
    'utf8'
  );
  return {
    props: { blogData: await fetchLatestBlogs(3), hmsMarkup },
    revalidate: 3600,
  };
};
