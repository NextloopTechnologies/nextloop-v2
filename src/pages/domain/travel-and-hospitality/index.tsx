import Head from 'next/head';
import React from 'react';

import { travelandhotelAssets } from '../../../../assets';
import CustomPageHero from '../../../components/CustomPageHero/CustomPageHero';
// import ClientReviews from '../../../components/Domains/ClientReviews';
import CustomRequestQuote from '../../../components/Domains/CustomRequestQuote';
import FAQ from '../../../components/Domains/FAQ';
import FlourishBusiness from '../../../components/Domains/TravelAndHotel/FlourishBusiness';
import GlobalInventory from '../../../components/Domains/TravelAndHotel/GlobalInventory';
import NextGen from '../../../components/Domains/TravelAndHotel/NextGen';
import WhatWeDo from '../../../components/Domains/WhatWeDo';
import WhyBuild from '../../../components/Domains/WhyBuild';
import Layout from '../../../components/Layout/Layout';
import palette from '../../../styles/pallette';
import { IFAQ } from '../../../types';
import { getStaticImageData } from '../../../utils/helper';

const faqsContent: IFAQ[] = [
  {
    id: 1,
    question: 'What is a Hotel PMS and how do I know if my property needs one?',
    answer:
      "A Hotel Property Management System is the operational hub of a hospitality business — the software that manages reservations, room assignments, check-ins, check-outs, housekeeping coordination, billing, and guest communication from a single platform. If your team is currently managing any of these processes manually, across spreadsheets, or through disconnected systems that don't talk to each other, you're absorbing costs that a good PMS eliminates. Staff spend less time on administration, errors decrease, and the guest experience improves because your team has accurate information at hand. The right hotel management software typically pays for itself within the first operating year through time savings and reduced booking errors alone. ",
  },
  {
    id: 2,
    question:
      'How do your AI-powered solutions actually move the needle on bookings?',
    answer:
      "The honest answer is that it depends on where your biggest gaps are — which is why we assess that before recommending anything. That said, the areas where we consistently see the clearest impact are pricing and personalization. Dynamic pricing tools that respond to real demand signals rather than static seasonal rates tend to capture meaningful revenue that would otherwise be left on the table. Personalization engines that recognize returning guests and surface relevant offers at the right moment lift conversion rates and repeat bookings. AI chatbots that respond instantly to booking inquiries — including outside business hours — reduce the number of potential guests who ask a question, don't hear back quickly enough, and book somewhere else. Together, these aren't incremental improvements. They're structural advantages over competitors not using them. ",
  },
  {
    id: 3,
    question:
      'We already work with several OTAs and booking platforms. Can you build around what we have?',
    answer:
      "Yes, and this is something we're deliberate about from the start of every project. Replacing established OTA relationships or payment infrastructure isn't necessary and often isn't practical. Our custom travel apps and hotel management software are built with open integration architecture, meaning they connect with Booking.com, Expedia, channel managers, payment gateways, and other third-party platforms you rely on. The goal is to give you a better central platform, not to force you to rebuild relationships that are already working. ",
  },
];

const WhatWeDoData = [
  {
    image: getStaticImageData(travelandhotelAssets.WhatWeDo1),
    title: 'Accelerate Lending with Modern Digital Loan Origination Systems ',
    description:
      'Transform your credit operations with our advanced Digital Loan Origination System (LOS). By automating the entire pipeline from the initial application to final disbursement, our platform accelerates approval times, eliminates cumbersome paperwork, and elevates the borrower experience. Give your financial institution the modern infrastructure it needs to scale operations and serve clients more efficiently. ',
  },
  {
    image: getStaticImageData(travelandhotelAssets.WhatWeDo2),
    title: 'Protect Transactions with Advanced Secure Payment Gateways ',
    description:
      'Strengthen your business infrastructure with our robust Secure Payment Gateway Solutions. We provide seamless integration paired with sophisticated encryption and real-time fraud detection systems to guarantee safe, swift, and dependable digital transactions. Build lasting merchant credibility and elevate customer trust with a frictionless checkout experience designed to scale ',
  },
  {
    image: getStaticImageData(travelandhotelAssets.WhatWeDo3),
    title: 'Optimize Performance with AI-Driven Financial Analytics ',
    description:
      'Unlock deeper business intelligence with our advanced AI-Driven Financial Analytics solutions. By leveraging big data and machine learning, we deliver actionable insights that empower your team to make data-backed decisions, streamline day-to-day operations, and accelerate growth across your financial services portfolio. ',
  },
  {
    image: getStaticImageData(travelandhotelAssets.WhatWeDo4),
    title: 'Custom Fintech Software Development ',
    description:
      'Accelerate your digital transformation with our tailored Fintech software development services. From intuitive mobile banking applications and robust wealth management platforms to cutting-edge blockchain solutions, we engineer scalable, high-performance financial technology designed around your specific strategic goals. Turn your vision into market-ready innovation. ',
  },
];

const TravelAndHospitality = () => {
  return (
    <>
      <Head>
        <title>
          Hotel Management Software (PMS) & Custom Travel App Development
          Services
        </title>
        <meta
          name='description'
          content='Build scalable hotel PMS and travel apps with Nextloop. Get Custom booking engines and AI-powered solutions to boost bookings and enhance guest experience.'
        />
      </Head>
      <Layout>
        <CustomPageHero
          image={getStaticImageData(travelandhotelAssets.hotelAndTravelBg)}
          titleChildren={
            <h1
              className={`text-white ${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} font-bold text-center w-full md:max-w-[1500px]`}
            >
              Travel & hotel website design and{' '}
              <span className='text-orange-500'>
                custom software development
              </span>
            </h1>
          }
          subtitle=''
          opacity='opacity-10'
          title=''
        />

        <WhyBuild
          image={getStaticImageData(travelandhotelAssets.whyBuildImg)}
          title='Why build <br /> a custom software solution for the'
          colouredTitle='travel & hotel industry'
          informationSection={
            <div className='max-w-[737px] flex flex-col justify-center px-14 md:px-0'>
              <p
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
              >
                There was once a time when hotels attracted and retained their
                customers by word of mouth and by distributing physical
                marketing material to potential guests. While that might have
                been the most effective way to let people know about your brand,
                it’s no longer true.
              </p>
              <p
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
              >
                Digitalisation has grown at a rapid speed across all industries,
                especially travel. In fact, a survey found that in pre-pandemic
                2017, already 88% of people preferred to make their hotel
                bookings online.
              </p>
              <p
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
              >
                The best outcome of this acceleration into the future is that
                many things that used to take a lot of time and investment are
                now more accessible, affordable, and offer ease of use, like
                building your first hotel website.
              </p>
              <p
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
              >
                Gone are the days when you would have to spend a heavy amount of
                money to hire a developer and designer. It’s now as easy as a
                drag-and-drop tool. And if nothing else, a hotel website will
                tell the world that you really exist.
              </p>
            </div>
          }
        />

        <WhatWeDo content={WhatWeDoData} />

        <FlourishBusiness />

        <NextGen />

        <GlobalInventory />

        {/* <ClientReviews /> */}

        <FAQ faqsContent={faqsContent} />

        <CustomRequestQuote title='see what your travel & hotel website could look like.' />
      </Layout>
    </>
  );
};

export default TravelAndHospitality;
