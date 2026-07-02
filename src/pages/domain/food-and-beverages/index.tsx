import Head from 'next/head';
import React from 'react';

import {
  healthCareWhyChooseUs1,
  healthCareWhyChooseUs2,
  restaurantAssets,
} from '../../../../assets';
import CustomPageHero from '../../../components/CustomPageHero/CustomPageHero';
// import ClientReviews from '../../../components/Domains/ClientReviews';
import CustomRequestQuote from '../../../components/Domains/CustomRequestQuote';
import EnrollForWebsite from '../../../components/Domains/EnrollForWebsite';
import FAQ from '../../../components/Domains/FAQ';
import GrowBusiness from '../../../components/Domains/Restaurant/GrowBusiness';
import WhyBuild from '../../../components/Domains/WhyBuild';
import WhyChooseUs from '../../../components/Domains/WhyChooseUs';
import Layout from '../../../components/Layout/Layout';
import palette from '../../../styles/pallette';
import { IFAQ, IWhyChooseUs } from '../../../types';
import { getStaticImageData } from '../../../utils/helper';

const benefits = [
  {
    id: 1,
    solution: 'Error-free administration and finance.',
  },
  {
    id: 2,
    solution: 'Shortened response time.',
  },
  {
    id: 3,
    solution: 'Improved Customer engagement.',
  },
  {
    id: 4,
    solution: 'Comprehensive human resource management.',
  },
];

const faqsContent: IFAQ[] = [
  {
    id: 1,
    question: 'How can I take my restaurant online?',
    answer:
      "Nextloop delivers all the features you need to get your own restaurant online and ready to serve. From online ordering to search engine optimization, we’ve got you covered. Start with the restaurant website builder, then serve your customers online. If you're looking for a tasteful name for your food business.",
  },
  {
    id: 2,
    question: 'What is an online food ordering system?',
    answer:
      "Nextloop delivers all the features you need to get your own restaurant online and ready to serve. From online ordering to search engine optimization, we’ve got you covered. Start with the restaurant website builder, then serve your customers online. If you're looking for a tasteful name for your food business.",
  },
  {
    id: 3,
    question: 'What does a restaurant website need?',
    answer:
      "Nextloop delivers all the features you need to get your own restaurant online and ready to serve. From online ordering to search engine optimization, we’ve got you covered. Start with the restaurant website builder, then serve your customers online. If you're looking for a tasteful name for your food business.",
  },
];

const whyChooseContent: IWhyChooseUs[] = [
  {
    title: 'Customized Solutions for F&B Operations',
    descp:
      'Our software ensures adherence to food safety regulations such as FDA and HACCP while streamlining production, inventory, and quality control for seamless, effective operations.',
    image: healthCareWhyChooseUs1,
  },
  {
    title: 'Growth Driven by Technology with Round-the-Clock Assistance',
    descp:
      'Utilize cutting-edge technologies like IoT and predictive analytics to reduce waste and optimize supply chains. As your company grows, our committed support staff guarantees scalability and continuous servicing.',
    image: healthCareWhyChooseUs2,
  },
];

const enrolData = [
  {
    id: 1,
    title: "Showcase your restaurant's dishes with an online menu.",
  },
  {
    id: 2,
    title: 'Allow customers to make reservations from your site 24/7. ',
  },
  {
    id: 3,
    title: 'Get paid safely and securely through multiple payment methods.',
  },
  {
    id: 4,
    title: 'Run your entire online ordering system from one dashboard. ',
  },
];

const FoodAndBeverages: React.FC = () => {
  return (
    <>
      <Head>
        <title>
          Food & Beverage Software Solutions | Nextloop Technologies{' '}
        </title>
        <meta
          name='description'
          content='Nextloop builds custom digital platforms for food businesses—POS, online ordering, inventory, delivery, analytics tools for cloud kitchens & restaurants'
        />
      </Head>
      <Layout>
        <CustomPageHero
          image={getStaticImageData(restaurantAssets.restaurantBg)}
          titleChildren={
            <h1
              className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} text-white uppercase font-bold text-center max-w-[1306px]`}
            >
              Your <span className='text-orange-500'>restaurant</span>
              {', '}served online
            </h1>
          }
          subtitle='Grow your business and deliver the online experience your customers expect with this all-in-one business solution.'
          customSubtitleClassname={`xl:w-[51%] ${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop}`}
          opacity='opacity-10'
          title=''
        />

        <WhyBuild
          image={getStaticImageData(restaurantAssets.WhyBuildRestaurant)}
          colouredTitle='restaurant'
          informationSection={
            <div className='max-w-[737px] mx-5 md:mx-0'>
              <p
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} mt-5`}
              >
                One of the most significant industries in many nations, the cafe
                and restaurant sector is constantly expanding. But in order to
                handle multitasking effectively, technology must be used across
                the board. Due to this, we shall examine the benefits of an ERP
                for restaurants and the related industry in this piece. Some of
                the main benefits of custom ERP solutions for restaurants are:
              </p>

              <ul className='list-disc text-md pl-10 mt-8'>
                {benefits.map((benefit) => (
                  <li key={benefit.id} className='font-medium'>
                    <span className='font-normal'>{benefit.solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          }
        />

        <WhyChooseUs whyChooseContent={whyChooseContent} />

        <EnrollForWebsite
          image={getStaticImageData(restaurantAssets.RobustOnline)}
          imageClassname='w-[450px] h-[450px] mx-auto'
          data={enrolData}
          titleElement={
            <h1
              className={` ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} uppercase font-bold text-center max-w-[950px] mx-auto`}
            >
              Get a robust online{' '}
              <span className='text-orange-500'>ordering system</span>
            </h1>
          }
        />

        <GrowBusiness />
        {/* <div className='min-h-screen flex flex-col items-center justify-center text-center py-[112px] mx-auto gap-[109px]'>
        <h1 className='font-bold text-3xl uppercase md:text-6xl lg:text-7xl xl:text-8xl sm:text-4xl w-full mb-[25px]'>
          The tools you need to grow your{' '}
          <span className='text-orange-500'>business</span>
        </h1>
        <div className='container flex flex-col items-center mx-auto p-6'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-[75px] mt-[45px]'>
            <ToolBox
              icons={toolsIcon1}
              height={62}
              width={62}
              title='Expand your reach'
              descp='Serve more customers with on-demand delivery integration.'
            />
            <ToolBox
              icons={toolsIcon2}
              title='Reward repeat customers'
              descp='Build a strong customer base with an easily customizable loyalty program.'
            />
            <ToolBox
              icons={toolsIcon3}
              title='Boost your visibility'
              descp='Get a suite of built-in marketing tools to grow and promote your business.'
            />
          </div>
        </div>
      </div> */}

        {/* <ClientReviews
          title='Real success stories from'
          colouredTitle='Real customer'
        /> */}

        <FAQ faqsContent={faqsContent} />

        <CustomRequestQuote title='see what your restaurant website could look like' />
      </Layout>
    </>
  );
};

export default FoodAndBeverages;
