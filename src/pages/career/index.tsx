import Image from 'next/image';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { Job } from '../../types';
import supabaseClient from '../../utils/client';
import { BottomBig, BottomLeft, BottomRight } from '../../../assets';
import careerBg from '../../../assets/careerBg.png';
import bigRec from '../../../assets/careers/bigrec.png';
import leftBig from '../../../assets/careers/leftBig.png';
import rightMiddle from '../../../assets/careers/rightMiddle.png';
import rightTop from '../../../assets/careers/rightTop.png';
import location from '../../../assets/location.svg';

const CareersPage: React.FC<{ jobs?: Job[]; error?: string }> = ({
  jobs,
  error,
}) => {
  return (
    <Layout>
      <PageHero
        image={careerBg}
        subtitle='If you are looking for a complete business solution at a one place in combination with distinctive designs, that is what you can expect from us. To stimulate the growth of your company, we focus on various services, although we do not limit ourselves to this. We keep  learning and stay ourselves up to date with current market trends.'
        title='careers'
        opacity='opacity-80'
      />
      <WhyUs />
      <Jobs jobs={jobs} error={error} />
    </Layout>
  );
};

const WhyUs = () => (
  <div className='min-h-screen flex flex-col justify-center items-center text-center gap-12 p-8 lg:px-0 lg:py-8'>
    <h2 className='font-medium text-2xl uppercase'>GALLERY</h2>
    <p className='font-bold xl:text-7xl md:text-5xl text-3xl  2xl:w-[40%] xl:w-[60%] w-full'>
      CURIOUS ABOUT HOW WE MANAGE TO MAKE ALL THIS{' '}
      <span className='text-orange-500'>POSSIBLE?</span>
    </p>
    <div className='flex gap-24 w-full justify-around flex-col lg:flex-row lg:gap-0'>
      {/* <div className='flex flex-col gap-4 lg:w-1/2 items-center xl:px-48'>
        <div className='flex gap-4'>
          <div className='h-full'>
            <Image src={leftBig} alt='' className='h-full object-cover' />
          </div>
          <div className='flex flex-col gap-4'>
            <div className=''>
              <Image src={rightTop} alt='' />
            </div>
            <div className=''>
              <Image src={rightMiddle} alt='' />
            </div>
          </div>
        </div>
        <div className='w-full'>
          <Image src={bigRec} alt='' className='object-cover w-full h-1/2' />
        </div>
      </div> */}

      <div className='flex flex-col gap-4 w-full lg:w-1/2 sm:px-20 items-center'>
        {/* First */}
        <div className='flex items-center justify-center gap-4'>
          <div className=''>
            <Image
              src={leftBig}
              alt=''
              className='h-[314px] w-[400px] object-cover'
            />
          </div>

          <div className='flex flex-col gap-4'>
            <div className=''>
              <Image
                src={rightTop}
                alt=''
                className='h-[150px] w-[300px] object-cover'
              />
            </div>
            <div className=''>
              <Image
                src={rightMiddle}
                alt=''
                className='h-[150px] w-[300px] object-cover'
              />
            </div>
          </div>
        </div>

        {/* Middle */}
        <Image src={bigRec} alt='' className='object-cover w-full h-[250px]' />

        {/* Bottom 1 */}
        <div className='flex items-center gap-4'>
          <div className=''>
            <Image src={BottomLeft} alt='' />
          </div>
          <div className=''>
            <Image src={BottomRight} alt='' />
          </div>
        </div>

        {/* Bottom */}
        <Image
          src={BottomBig}
          alt=''
          className='object-cover w-full h-[180px]'
        />
      </div>

      <div className='lg:w-1/2 w-full flex flex-col gap-6 sm:pr-20 text-left'>
        <div className='flex flex-col'>
          <p className=''>
            Come be a part of Nextloop Technologies, where your ideas,
            abilities, and potential are valued. Embracing technology and
            assisting you in your growth is our mission.
          </p>
          <p>
            However, it's not just about personal development; it's also about
            group achievement. We think that working together to achieve a
            common objective may be powerful. For this reason, we've established
            a cooperative atmosphere where ideas are openly exchanged and
            teamwork is valued. Everyone's opinion is appreciated and
            acknowledged, whether you're working together on a project or
            brainstorming ideas with coworkers at a meeting.
          </p>
          <p>
            If you're searching for a company where your abilities are
            acknowledged and your potential is endless. Come along with us, and
            let's do something incredible together.
          </p>

          <p>Here's what makes Nextloop Technologies special:</p>
        </div>
        <p className='text-lg lg:w-2/3 w-full'>
          <b>Flexibility you crave: </b>We offer a hybrid work policy, giving
          you the freedom to choose where you do your best work while
          maintaining a healthy work-life balance.
        </p>
        <p className='text-lg lg:w-2/3 w-full'>
          <b>Stability you deserve: </b>We believe in job security and offer
          competitive salaries and a comprehensive benefits package to support
          your well-being.
        </p>
        <p className='text-lg lg:w-2/3 w-full'>
          <b>Growth that excites you: </b>We're committed to your development.
          Regular performance reviews, mentorship opportunities, and access to
          cutting-edge technologies help you reach your full potential.
        </p>
        <p className='text-lg lg:w-2/3 w-full'>
          <b>Impact that inspires you: </b>Collaborate with a global clientele,
          tackle real-world challenges, and see your work make a difference on a
          grand scale. If you're searching for a company where your abilities
          are acknowledged and your potential is endless. Come along with us,
          and let's do something incredible together
        </p>
        {/* <p className='text-lg lg:w-2/3 w-full'>
          <b>Promotions/Appraisals:</b> Resources company based in Germany, is
          searching for a motivated UI/UX Design Intern to join our esteemed
          client.
        </p>
        <p className='text-lg lg:w-2/3 w-full'>
          <b>Carrier opportunities:</b> Resources company based in Germany, is
          searching for a motivated UI/UX Design Intern to join our esteemed
          client. This remote position offers an extraordinary chance for
          someone excited to learn.
        </p> */}
      </div>
    </div>
  </div>
);

const Jobs: React.FC<{ jobs?: Job[]; error?: string }> = ({ error, jobs }) => (
  <div className='min-h-screen aboutUsPageBackgroundImage flex flex-col gap-24 items-center justify-center text-white p-8 lg:p-0'>
    <h2 className='font-medium text-2xl uppercase'>opportunities</h2>
    <p className='font-bold xl:text-4xl md:text-5xl text-3xl uppercase xl:w-[30%] text-center'>
      find a <span className='text-orange-500'>suitable job</span> for you
    </p>
    {error ? (
      <div className='flex items-center justify-center h-screen text-4xl'>
        {error}
      </div>
    ) : (
      <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full place-items-center sm:gap-12 gap-10'>
        {jobs?.map((j) => (
          <JobCard job={j} key={j.id} />
        ))}
      </div>
    )}
  </div>
);

const JobCard: React.FC<{ job: Job }> = ({
  job: { title, job_mode, job_type, id },
}) => {
  const router = useRouter();
  return (
    <div className='px-8 py-12 bg-white text-black sm:min-w-[350px] min-w-full flex flex-col gap-4'>
      <div className='flex justify-between items-end'>
        <div className='flex flex-col gap-4'>
          <p className='font-medium text-xl'>{title}</p>
          <p className=''>{job_type}</p>
        </div>
        <div className='flex gap-2'>
          <div className=''>
            <Image src={location} alt='location' />
            <p className=''>{job_mode}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => router.push(`/career/${id}`)}
        className='text-orange-500 bg-none font-medium py-3 rounded-full w-fit'
      >
        View Details &#10230;
      </button>
    </div>
  );
};

export default CareersPage;

export async function getServerSideProps() {
  // Fetch data from Supabase
  const { data: jobs, error } = await supabaseClient.from('jobs').select('*');

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
