import Head from 'next/head';

import { eventAssets } from '../../../../assets';
import CustomPageHero from '../../../components/CustomPageHero/CustomPageHero';
// import ClientReviews from '../../../components/Domains/ClientReviews';
import CustomRequestQuote from '../../../components/Domains/CustomRequestQuote';
import DesignYourEvents from '../../../components/Domains/DesignYourEvents';
import EventManagementSolution from '../../../components/Domains/EventManagementSolution';
import FAQ from '../../../components/Domains/FAQ';
import WhyBuild from '../../../components/Domains/WhyBuild';
import WhyWorkWithUs from '../../../components/Domains/WhyWorkWithUs';
import Layout from '../../../components/Layout/Layout';
import palette from '../../../styles/pallette';
import { IFAQ } from '../../../types';
import { getStaticImageData } from '../../../utils/helper';

const benefits = [
  {
    id: 1,
    title: 'Centralized Data Management:',
    info: 'Easily access and manage all event-related data in one centralized location.',
  },
  {
    id: 2,
    title: 'Automated Workflows:',
    info: 'Save time and reduce manual tasks with automated workflows for tasks such as registration, ticketing, and communication.',
  },
  {
    id: 3,
    title: 'Customization:',
    info: 'Tailor the software to meet the specific needs and requirements of your organization.',
  },
  {
    id: 4,
    title: 'Real-Time Reporting:',
    info: 'Gain insights and track the success of your events with real-time reporting and analytics.',
  },
  {
    id: 5,
    title: 'Enhanced Communication:',
    info: 'Improve communication with attendees, vendors, and staff through integrated communication tools.',
  },
];

const faqsContent: IFAQ[] = [
  {
    id: 1,
    question: 'What features should I look for in an events website?',
    answer:
      'Whether you offer large scale or intimate events, there are several core features you’ll need for your events website.',
  },
  {
    id: 2,
    question:
      'What types of events can I offer with in this website development?',
    answer:
      'Whether you offer large scale or intimate events, there are several core features you’ll need for your events website.',
  },
  {
    id: 3,
    question: 'Does nextloop have a mobile app? ',
    answer:
      'Whether you offer large scale or intimate events, there are several core features you’ll need for your events website.',
  },
];

const Events = () => {
  return (
    <>
      <Head>
        <title>Nextloop: Simple IT Solutions for Event Transformation</title>
        <meta
          name='description'
          content="Transform your event management with Nextloop Technologies' digital solutions. From ticketing systems to real-time analytics, we offer innovative IT services to enhance event planning, execution, and customer engagement."
        />
      </Head>
      <Layout>
        <CustomPageHero
          image={getStaticImageData(eventAssets.eventsBg)}
          titleChildren={
            <h1
              className={`text-white ${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} uppercase font-bold text-center w-full md:max-w-[1306px]`}
            >
              Create a professional{' '}
              <span className='text-orange-500'>event website</span>
            </h1>
          }
          customSubtitleClassname={`xl:w-[51%] ${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop}`}
          subtitle='Create a website for online and in-person events, sell tickets or collect RSVPs, accept secure online payments, reach more guests with advanced marketing tools and manage the day of your event.'
          opacity='opacity-90'
          title=''
        />
        <WhyBuild
          image={getStaticImageData(eventAssets.WhyBuildEventManagement)}
          colouredTitle='Event Management'
          informationSection={
            <div className={`mx-14 md:mx-10 lg:mx-0 md:max-w-[600px] `}>
              <p
                className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop} font-normal gap-5`}
              >
                Event planning can be a complex and time-consuming process. From
                coordinating schedules and vendors to managing registrations and
                budgets, there are countless details to keep track of. This is
                where event management software comes in, offering a solution to
                streamline and simplify the planning process.
              </p>

              <h3
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} uppercase my-2 font-semibold`}
              >
                The Benefits of Event Management Software
              </h3>

              <p
                className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop} font-normal`}
              >
                Event management software offers a wide range of benefits for
                businesses and organizations looking to streamline their event
                planning processes. Some key advantages include:
              </p>

              <ul
                className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop} list-disc mt-2`}
              >
                {benefits.map((benefit) => (
                  <div key={benefit.id} className='font-medium'>
                    {benefit.title}{' '}
                    <span className='font-normal'>{benefit.info}</span>
                  </div>
                ))}
              </ul>
            </div>
          }
        />
        <WhyWorkWithUs />
        <EventManagementSolution />
        {/* <ClientReviews /> */}
        <DesignYourEvents />
        <FAQ faqsContent={faqsContent} />
        <CustomRequestQuote title='Your complete event management platform' />
      </Layout>
    </>
  );
};

export default Events;
