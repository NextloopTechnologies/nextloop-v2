import { MapPin } from 'lucide-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';

import Layout from '../../components/Layout/Layout';
import LifeAtNextloop from '../../components/lifeatnextloop';
import PageHero from '../../components/PageHero';
import PerksBenefitsSection from '../../components/Perksandbenefits';
import SlidingImages from '../../components/SlidingImages';
import { Job } from '../../types';
import supabaseClient from '../../utils/client';
import { getSchemaMarkup } from '../../utils/seoSchemas';
import { careerImages } from '../../../assets';
import careerBg from '../../../assets/careerBg.webp';

const CareersPage: React.FC<{ jobs?: Job[]; error?: string }> = ({
  jobs,
  error,
}) => {
  return (
    <Layout>
      <Head>
        <title>Careers at Nextloop | IT Jobs, Growth Opp. & Innovation</title>
        <meta
          name='description'
          content='Join Nextloop Technologies for dynamic IT careers: grow with flexible hybrid work, competitive pay, software dev cloud AI/ML -mentorship in collaborative culture'
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: getSchemaMarkup('careers'),
          }}
        />
      </Head>
      <PageHero
        image={careerBg}
        subtitle='If you are looking for a complete business solution at a one place in combination with distinctive designs, that is what you can expect from us. To stimulate the growth of your company, we focus on various services, although we do not limit ourselves to this. We keep  learning and stay ourselves up to date with current market trends.'
        coloredTitle='Careers'
        title=''
        opacity='opacity-80'
      />
      <WhyUs />
      <Jobs jobs={jobs} error={error} />
    </Layout>
  );
};

const WhyUs = () => (
  <div className='min-h-screen flex flex-col justify-center items-center text-center gap-12 p-8 lg:px-0 lg:py-8'>
    <p className='font-bold xl:text-4xl md:text-5xl text-3xl uppercase xl:w-1/2 text-center'>
      CURIOUS ABOUT HOW WE MANAGE TO MAKE ALL THIS{' '}
      <span className='text-orange-500'>POSSIBLE?</span>
    </p>

    <SlidingImages images={careerImages || []} />
  </div>
);

const Jobs: React.FC<{ jobs?: Job[]; error?: string }> = ({ error, jobs }) => (
  <div>
    <div className='min-h-screen aboutUsPageBackgroundImage flex flex-col gap-14 items-center justify-center text-white p-8 lg:px-0 lg:py-8'>
      <p className='font-bold xl:text-4xl md:text-5xl text-3xl uppercase xl:w-[30%] text-center'>
        find a <span className='text-orange-500'>suitable job</span> for you
      </p>
      {error ? (
        <div className='flex items-center justify-center h-screen text-4xl'>
          {error}
        </div>
      ) : (
        <div className=' grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center sm:gap-6 gap-6 p-2'>
          {jobs?.map((j) => (
            <JobCard job={j} key={j.id} />
          ))}
        </div>
      )}
    </div>
    <PerksBenefitsSection />
    <LifeAtNextloop />
  </div>
);

const JobCard: React.FC<{ job: Job }> = ({
  job: { title, job_mode, job_type, id },
}) => {
  const router = useRouter();
  return (
    <div className='group w-[370px] bg-white text-black rounded-xl flex flex-col transition-all duration-300 hover:bg-orange-500 hover:shadow-lg hover:scale-105'>
      {/* TITLE */}
      <div className='px-6 pt-8 min-h-[110px]'>
        <p className='font-semibold text-lg md:text-xl leading-tight transition-colors duration-300 group-hover:text-white'>
          {title}
        </p>
        <p className='text-sm mt-2 transition-colors duration-300 group-hover:text-white'>
          {job_type}
        </p>
      </div>

      <div className='flex-1' />

      <div className='px-6 pb-8 flex items-center justify-between'>
        <div className='flex items-center gap-2 text-lg font-medium transition-colors duration-300 group-hover:text-white'>
          <MapPin
            size={22}
            strokeWidth={2}
            className='transition-colors duration-300 group-hover:text-white '
          />
          <span>{job_mode}</span>
        </div>

        <button
          onClick={() => router.push(`/career/${id}`)}
          className='flex items-center gap-2 font-semibold text-base transition-all duration-300 text-orange-500 group-hover:text-white group-hover:translate-x-1'
        >
          View Details
          <LiaLongArrowAltRightSolid className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
};

export default CareersPage;

export async function getServerSideProps() {
  // Fetch data from Supabase
  const { data: jobs, error } = await supabaseClient
    .from('jobs')
    .select('*')
    .filter('visibility', 'eq', true);

  if (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }

  return {
    props: {
      jobs: jobs || [],
    },
  };
}
