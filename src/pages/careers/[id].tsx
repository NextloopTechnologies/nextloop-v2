import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React from 'react';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { Job } from '../../types';
import supabaseClient from '../../utils/client';
import careerBg from '../../../assets/careerBg.png';
import locationIcon from '../../../assets/location.svg';
import wallet from '../../../assets/wallet.svg';

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

const JobDetails: React.FC<{ job: Job }> = ({
  job: {
    title,
    location,
    created_at,
    descp,
    job_mode,
    job_type,
    package: money,
    responsibilities,
    qualifications,
    skills,
  },
}) => {
  const temp = JSON.parse(
    responsibilities.replace(/\\./g, '')
  ) as unknown as string[];

  const tQualifications = JSON.parse(
    qualifications.replace(/\\./g, '')
  ) as unknown as string[];

  const tSkills = JSON.parse(skills.replace(/\\./g, '')) as unknown as string[];

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h1 className='xl:text-7xl md:text-5xl text-3xl font-bold'>{title}</h1>
        <p className='text-lg'>
          {location} | {dayjs(created_at).format('DD/MMM/YYYY')}
        </p>
      </div>
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold'>About the job</h2>
        <p className='text-lg'>{descp}</p>
      </div>
      <div className='flex justify-between items-start md:flex-row flex-col'>
        <div className='flex flex-col md:w-1/2 w-full gap-8 mb-12 md:mb-0'>
          <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold'>Responsibilties</h2>
            <div className='text-lg'>
              <ul className='list-disc'>
                {temp?.map((t, i) => (
                  <li className='ml-6' key={i}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold'>Required Qualification</h2>
            <div className='text-lg'>
              <ul className='list-disc'>
                {tQualifications?.map((t, i) => (
                  <li className='ml-6' key={i}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='flex flex-col gap-4 md:w-[70%]'>
            <h2 className='text-2xl font-bold'>Skills</h2>
            <div className='flex flex-wrap gap-4'>
              {tSkills?.map((s, i) => (
                <div
                  className='border text-orange-500 border-orange-500 rounded-3xl px-2 py-1'
                  key={i}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='md:w-fit w-full rounded-md shadow-md flex flex-col px-12 py-4 gap-4'>
          <div className='flex gap-2 items-center'>
            <div className=''>
              <Image src={locationIcon} alt='location' />
            </div>
            <p className='text-lg'>
              {location}, {job_mode} | {job_type}
            </p>
          </div>
          <div className='flex gap-2 items-center'>
            <div className=''>
              <Image src={wallet} alt='wallet' />
            </div>
            <p className='text-lg font-bold'>{money}</p>
          </div>
          <button className='flex rounded-3xl px-6 bg-orange-500 text-white py-1 text-lg justify-center'>
            Apply for this job
          </button>
        </div>
      </div>
    </div>
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
