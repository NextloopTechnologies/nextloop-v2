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
import { breadcrumbSchema, faqSchema } from '../../utils/structuredData';

const noto = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const TITLE = 'Hospital Management Software | Nextloop';
const DESC =
  'Cloud hospital management for 30–100 bed hospitals in India: registration, billing, TPA and PM-JAY claims, wards, pharmacy and lab. Book a free demo.';

const hmsFaqs = [
  {
    question:
      'What is the best hospital management software for a small hospital?',
    answer:
      'The best fit is software built for your size and your payers. Hospital Management Software is built for private hospitals of 30-100 beds in India, with TPA, PM-JAY, MP-ABN and CGHS claims, Hindi and English screens, and NABH-ready records.',
  },
  {
    question: 'Is it right for a hospital my size?',
    answer:
      'It is built for private hospitals of 30-100 beds, including single-specialty and multi-specialty hospitals.',
  },
  {
    question: 'My staff are not computer experts. Will they manage?',
    answer:
      'Screens work in Hindi and English, with large buttons and simple steps. Front-desk and nursing staff are trained on their own tasks.',
  },
  {
    question: 'What happens if the internet goes down?',
    answer:
      'Registration, billing receipts, medicine rounds and pharmacy issues keep working and sync when the connection returns.',
  },
  {
    question: 'Where is our patient data kept?',
    answer:
      'All patient data, logs and backups are stored in India. Every staff member has a personal login, data is encrypted, and backups run daily.',
  },
  {
    question: 'Does it connect to ABDM?',
    answer:
      'It is built for ABDM: ABHA creation, Scan and Share, and record sharing.',
  },
  {
    question: 'What is ABHA Scan and Share?',
    answer:
      "ABHA Scan and Share lets a patient register by scanning the hospital's QR code with their ABHA app. Their details reach the front desk instantly, so there is no form to fill.",
  },
  {
    question: 'Is hospital software mandatory in India?',
    answer:
      'No general law makes it compulsory for every hospital. But NABH accreditation, PM-JAY and CGHS empanelment and insurance claims all depend on complete records produced quickly, which is hard on paper.',
  },
  {
    question: 'What does hospital management software cost?',
    answer:
      'Plans depend on the number of beds and modules. Book a demo and we will share a quote.',
  },
];

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
  faqSchema(hmsFaqs),
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products/hospital-management-software/' },
    {
      name: 'Hospital Management Software',
      path: '/products/hospital-management-software/',
    },
  ]),
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
