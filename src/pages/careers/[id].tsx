import { GetServerSideProps } from 'next';
import React from 'react';

import JobDetails from '../../components/Career/JobDetail';
import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import Seo from '../../components/Seo';
import { getJobByRef } from '../../lib/content';
import { Job } from '../../types';
import { getBaseUrl } from '../../utils/getBaseUrl';
import {
  breadcrumbSchema,
  jobPostingSchema,
  toPlainText,
} from '../../utils/structuredData';
import careerBg from '../../../assets/careerBg.webp';

const CareerID: React.FC<{ data?: Job[]; error?: string }> = ({
  data,
  error,
}) => {
  if (error)
    return (
      <Layout>
        <PageHero
          image={careerBg}
          title='careers'
          subtitle='If you are looking for a complete business solution at a one place in combination with distinctive designs, that is what you can expect from us. To stimulate the growth of your company, we focus on various services, although we do not limit ourselves to this. We keep  learning and stay ourselves up to date with current market trends.'
        />
        <div className='h-screen flex items-center justify-center text-2xl'>
          {error}
        </div>
      </Layout>
    );

  // These tags previously sat in the component body rather than inside <Head>,
  // so they never reached the document head — every job page rendered an empty
  // <title>. They were also identical across all 64 postings.
  const job = data?.[0];
  const jobUrl = job ? `${getBaseUrl()}/careers/${job.id}/` : undefined;
  const jobDescription = job
    ? toPlainText(job.descp, 158) ||
      `${job.title} at Nextloop Technologies${job.location ? `, ${job.location}` : ''}.`
    : '';

  return (
    <Layout>
      {job && (
        <Seo
          title={`${job.title}${job.location ? ` — ${job.location}` : ''} | Careers at Nextloop`}
          description={jobDescription}
          jsonLd={[
            // JobPosting is what Google Jobs indexes. Without it these 64
            // postings are invisible to the largest source of job-search traffic.
            jobPostingSchema({
              title: job.title,
              description: job.descp || jobDescription,
              url: jobUrl ?? '',
              datePosted: job.created_at,
              location: job.location,
              jobMode: job.job_mode,
              jobType: job.job_type,
            }),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Careers', path: '/careers/' },
              { name: job.title, path: `/careers/${job.id}/` },
            ]),
          ]}
        />
      )}
      {/* No hero on the job detail page — staging removed it deliberately
          (64dde37). JobDetails renders the job title as the page's H1. */}
      <div className='xl:p-24 lg:p-8 p-4 flex flex-col'>
        {data?.map((j) => (
          <JobDetails job={j} key={j.id} />
        ))}
      </div>
    </Layout>
  );
};

export default CareerID;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const ref = typeof params?.id === 'string' ? params.id : '';
  if (!ref) return { notFound: true };

  try {
    // Hidden postings and unknown ids are both `null` here and both 404 — a
    // live page for a closed role is worse than no page.
    const job = await getJobByRef(ref);
    if (!job) return { notFound: true };
    // The component takes an array and reads [0]; kept so the switch is
    // invisible to it.
    return { props: { data: [job] } };
  } catch (e) {
    return { props: { error: e instanceof Error ? e.message : 'Unable to load this role.' } };
  }
};
