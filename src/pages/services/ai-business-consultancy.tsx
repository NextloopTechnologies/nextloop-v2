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
import { breadcrumbSchema, faqSchema } from '../../utils/structuredData';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const TITLE = 'AI Business Consultancy | Readiness Audit';
const DESC =
  'Plan AI before you build it. Nextloop maps use cases, security and cost so you invest only where AI will work. Book a free readiness call.';

const consultFaqs = [
  {
    question:
      'What is the difference between AI consulting and AI development?',
    answer:
      'Consulting means we map out the plan, security and costs before anyone starts building. Development is the build itself, which your team or ours can do once the plan is approved.',
  },
  {
    question: 'How long does an AI Readiness Audit take?',
    answer:
      'Usually 2 to 4 weeks, depending on how much data and software your company uses.',
  },
  {
    question: 'Do we have to hire Nextloop to build the AI later?',
    answer:
      'No. We give you a complete technical plan. Your own IT team can build it, or you can hire us to do it.',
  },
  {
    question: 'How much does AI consulting cost?',
    answer:
      'The audit is a fixed-price engagement scoped to the size of your business and the systems involved. The first 30-minute call is free, and you will receive a written price before any work starts.',
  },
  {
    question: 'What do you need from our team during the audit?',
    answer:
      'Around a few hours of interviews with the people who run the workflows, read-only access to sample data, and one technical contact from IT. We sign an NDA before any access is shared.',
  },
  {
    question: 'Will you need access to our live company data?',
    answer:
      'Not necessarily. We usually work with anonymised samples or read-only exports. If live access is needed, it is scoped, time-limited and covered by the NDA.',
  },
  {
    question:
      "We're a mid-sized company. Is AI consulting only for large enterprises?",
    answer:
      'No. Smaller companies often benefit most, because one well-chosen automation can free up a large share of a small team’s time. We scale the audit to your size.',
  },
  {
    question: 'How do you measure whether the AI is worth it?',
    answer:
      'Before any build, we agree on measurable targets such as hours saved per week, error rate or cost per transaction. The proof of concept has to hit those numbers before you invest in a full rollout.',
  },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Business Consultancy',
    provider: { '@type': 'Organization', name: 'Nextloop Technologies' },
    areaServed: ['India', 'United States'],
    url: 'https://www.nextlooptechnologies.com/services/ai-business-consultancy/',
  },
  faqSchema(consultFaqs),
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services/' },
    {
      name: 'AI Business Consultancy',
      path: '/services/ai-business-consultancy/',
    },
  ]),
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
