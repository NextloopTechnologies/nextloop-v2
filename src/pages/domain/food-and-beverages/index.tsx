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
    solution:
      'You get control over money and how the restaurant runs. This means fewer mistakes when it comes to bills, inventory and reports. ',
  },
  {
    id: 2,
    solution:
      'Your staff can serve customers faster. This is because the software helps them work together better so they can respond to orders quickly. ',
  },
  {
    id: 3,
    solution:
      ' You can build relationships with your customers. The software helps you give them a personalized experience so they want to come back. ',
  },
  {
    id: 4,
    solution:
      'You can manage your staff easily. The software helps with scheduling, payroll. Keeping an eye on your team all in one place.',
  },
];

const faqsContent: IFAQ[] = [
  {
    id: 1,
    question:
      'What are the benefits of custom restaurant software vs. third-party delivery apps?',
    answer:
      'Custom restaurant software eliminates high third-party commission fees, allows you to retain full ownership of customer data, and builds direct brand loyalty. Unlike third-party aggregators that charge up to 30% per order, custom software allows restaurants to capture 100% of their digital revenue while maintaining complete control over the end-to-end customer experience.\n\n- Financial Independence: Eliminates recurring marketplace fees, shifting variable order costs into a fixed software asset.\n- Data Control: Collects customer ordering behavior, email addresses, and preferences directly to power targeted marketing campaigns.\n- Brand Authority: Delivers a cohesive, distraction-free brand experience, keeping customers away from nearby competitors featured on shared marketplaces.',
  },
  {
    id: 2,
    question:
      ' How does Next Loop ensure a custom food delivery app can scale during peak hours?',
    answer:
      ' Next Loop ensures seamless peak-hour scaling by engineering custom food delivery applications on cloud-native, microservices-based architectures. By decoupling core application modules such as menu browsing, payment processing, and real-time courier tracking, our software independently auto-scales server resources to handle high-volume order surges without system lag or checkout failures.',
  },
  {
    id: 3,
    question: 'What does a restaurant website need?',
    answer:
      "Nextloop delivers all the features you need to get your own restaurant online and ready to serve. From online ordering to search engine optimization, we’ve got you covered. Start with the restaurant website builder, then serve your customers online. If you're looking for a tasteful name for your food business. \n\n- Customer Module: Features an AI-optimized digital menu, multi-channel secure payment gateways, and transparent, live order-status timelines. \n- Kitchen Management Console: Provides staff with a centralized dashboard to accept orders, manage real-time inventory levels, and update menu availability instantly. \n- Courier Tracker: Offers delivery drivers automated route optimization, immediate proximity dispatch alerts, and contactless digital proof-of-delivery tools. ",
  },
];

const whyChooseContent: IWhyChooseUs[] = [
  {
    title: 'Tailored Software for Food and Beverage Operations ',
    descp:
      'Our platform is designed to meet the needs of food and beverage businesses. It helps you follow rules like FDA and HACCP standards. This keeps your production workflows, inventory tracking and quality control in order. As a result your operation runs smoothly quickly and with fewer problems. ',
    image: healthCareWhyChooseUs1,
  },
  {
    title: 'Growth Driven by Technology with Round-the-Clock Assistance',
    descp:
      'Technology That Helps You Grow. With 24/7 Support. Our solution uses tools. These tools help reduce waste and improve your supply chain. As your F&B business grows our support team is always available to help. They ensure your operations run smoothly fix issues fast and make sure our system grows with your F&B business  ',
    image: healthCareWhyChooseUs2,
  },
];

const enrolData = [
  {
    id: 1,
    title: 'You can Run your Restaurants Presence in a Smarter Way. ',
    description:
      'Your restaurant needs an online ordering system that works well for you. This system helps you show your menu in a way get more orders and make things easy for your customers from the time they look at your menu to the time they pay. ',
  },
  {
    id: 2,
    title: 'You can Show your Menu Online.  ',
    description:
      'You can add pictures and descriptions of your dishes so people will want to buy them. People can make a reservation, at your restaurant at any time. They can book a table on your website, day or night. ',
  },
  {
    id: 3,
    title: 'You can Accept Payments in an Easy Way. ',
    description:
      'You can take payments using methods and you will know exactly how much money you have. ',
  },
  {
    id: 4,
    title: 'You can Control Everything From One Place.  ',
    description:
      'You can manage your orders make updates and see how well your restaurant is doing from one easy to use dashboard. ',
  },
];

const FoodAndBeverages: React.FC = () => {
  return (
    <>
      <Head>
        <title>
          Food & Beverage Software Solutions | Nextloop Technologies
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
              className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} text-white font-bold text-center max-w-[1306px]`}
            >
              Elevate Your Restaurant:
              <br />
              <span className='text-orange-500'>
                Custom Food Delivery App Development
              </span>
            </h1>
          }
          subtitle=''
          customSubtitleClassname={`xl:w-[51%] ${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop}`}
          opacity='opacity-10'
          title=''
        />

        <WhyBuild
          image={getStaticImageData(restaurantAssets.WhyBuildRestaurant)}
          title='The Strategic Advantages of '
          colouredTitle='Custom Software for Modern Restaurants '
          informationSection={
            <div className='max-w-[737px] mx-5 md:mx-0'>
              <p
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} mt-5`}
              >
                The restaurant business is really growing fast. It is one of the
                growing parts of the economy.. When things grow they can get
                complicated. You have to manage things at the same time like how
                the restaurant runs, the staff, the money and the customers. You
                cannot do all of this by hand. That is where technology comes in
                to help. A custom software solution gives your restaurant the
                tools to handle everything easily and correctly. Here are some
                good reasons to get one:
              </p>

              <ul className='list-disc text-md pl-10 mt-4 gap-2'>
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
              className={` ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold text-center max-w-[950px] mx-auto`}
            >
              Get a Robust Online{' '}
              <span className='text-orange-500'>Ordering System</span>
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

        <CustomRequestQuote title='See What Your Restaurant Website Could Look Like' />
      </Layout>
    </>
  );
};

export default FoodAndBeverages;
