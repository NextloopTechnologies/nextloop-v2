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
    question: 'why do you need travel & hotel website design?',
    answer:
      'Hotel website design is a huge influence on the booking behaviour of travellers and helps your hotel address their desires and expectations. It’s very important that potential guests are able to navigate your website easily and quickly understand the content that’s most relevant to them.',
  },
  {
    id: 2,
    question: 'why do I need a  website for my hotel?',
    answer:
      'Hotel website design is a huge influence on the booking behaviour of travellers and helps your hotel address their desires and expectations. It’s very important that potential guests are able to navigate your website easily and quickly understand the content that’s most relevant to them.',
  },
  {
    id: 3,
    question: 'What are the benefits of hotel website design?',
    answer:
      'Hotel website design is a huge influence on the booking behaviour of travellers and helps your hotel address their desires and expectations. It’s very important that potential guests are able to navigate your website easily and quickly understand the content that’s most relevant to them.',
  },
];

const WhatWeDoData = [
  {
    image: getStaticImageData(travelandhotelAssets.WhatWeDo1),
    title: 'Digital Loan Origination Systems',
    description:
      'Streamline your lending process with our cutting-edge Digital Loan Origination System (LOS). From application to disbursement, we automate every step, ensuring faster approvals, reduced paperwork, and enhanced customer experience. Empower your financial institution to serve clients more efficiently.',
  },
  {
    image: getStaticImageData(travelandhotelAssets.WhatWeDo2),
    title: 'Secure Payment Gateways',
    description:
      "Boost your transaction capabilities with our Secure Payment Gateway Solutions. We offer seamless integration, robust encryption, and fraud detection systems to ensure safe, swift, and reliable digital payments, enhancing your customers' trust and satisfaction.",
  },
  {
    image: getStaticImageData(travelandhotelAssets.WhatWeDo3),
    title: 'AI-Driven Financial Analytics',
    description:
      'Unlock deeper insights with our AI-Driven Financial Analytics solutions. We harness big data and machine learning to provide actionable intelligence, helping you make informed decisions, optimize operations, and drive growth in your financial services',
  },
  {
    image: getStaticImageData(travelandhotelAssets.WhatWeDo4),
    title: 'Custom Fintech Software Development',
    description:
      "Transform your ideas into reality with our Custom Fintech Software Development services. Whether it's mobile banking apps, wealth management platforms, or blockchain solutions, we tailor our expertise to fit your unique business needs, delivering innovative and scalable FinTech products.",
  },
];

const TravelAndHospitality = () => {
  return (
    <>
      <Head>
        <title>Hotel Website & Booking Software | Nextloop Technologies</title>
        <meta
          name='description'
          content='Nextloop builds mobile & user-friendly hotel websites with online booking, AI chatbots, customer engagement, secure payment gateways and digital marketing tools'
        />
      </Head>
      <Layout>
        <CustomPageHero
          image={getStaticImageData(travelandhotelAssets.hotelAndTravelBg)}
          titleChildren={
            <h1
              className={`text-white ${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} uppercase font-bold text-center w-full md:max-w-[1500px]`}
            >
              uncover new business opportunities with appealing{' '}
              <span className='text-orange-500'>travel & hotel website</span>
              <br /> design & development
            </h1>
          }
          subtitle=''
          opacity='opacity-10'
          title=''
        />

        <WhyBuild
          image={getStaticImageData(travelandhotelAssets.whyBuildImg)}
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
