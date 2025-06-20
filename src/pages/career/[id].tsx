import { GetServerSideProps } from 'next';
import React from 'react';

import JobDetails from '../../components/Career/JobDetail';
import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { Job } from '../../types';
import supabaseClient from '../../utils/client';
import careerBg from '../../../assets/careerBg.png';

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

  return (
    <Layout>
      <title>Nextloop Technologies | Careers</title>
      <meta
        name='description'
        content='Advance your career at Nextloop Technologies. Be part of a forward-thinking team that values creativity and professional development in technology.'
      />
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

  return {
    props: {
      data: data || [],
    },
  };
};
