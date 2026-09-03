import { GetServerSideProps } from 'next';
import React from 'react';

import JobDetails from '../../components/Career/JobDetail';
import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import Seo from '../../components/Seo';
import { Job } from '../../types';
import supabaseClient from '../../utils/client';
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
  const jobUrl = job ? `${getBaseUrl()}/career/${job.id}/` : undefined;
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
              { name: 'Careers', path: '/career/' },
              { name: job.title, path: `/career/${job.id}/` },
            ]),
          ]}
        />
      )}
      <PageHero
        image={careerBg}
        title='careers'
        subtitle='If you are looking for a complete business solution at a one place in combination with distinctive designs, that is what you can expect from us. To stimulate the growth of your company, we focus on various services, although we do not limit ourselves to this. We keep  learning and stay ourselves up to date with current market trends.'
      />
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
  // Fetch data from Supabase
  const { data, error } = await supabaseClient
    .from('jobs')
    .select('*')
    .filter('id', 'eq', params?.id);

  if (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }

  if (!data || data.length === 0) {
    return { notFound: true };
  }

  const job = data[0] as any;
  if (job && job.visibility === false) {
    return { notFound: true };
  }

  return {
    props: {
      data: data || [],
    },
  };
};
