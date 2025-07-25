import Head from 'next/head';
import React from 'react';

import { oilAndGasAssets } from '../../../../assets';
import CustomPageHero from '../../../components/CustomPageHero/CustomPageHero';
// import ClientReviews from '../../../components/Domains/ClientReviews';
import CustomRequestQuote from '../../../components/Domains/CustomRequestQuote';
import FAQ from '../../../components/Domains/FAQ';
import HowToBuild from '../../../components/Domains/OilAndGas/HowToBuild';
import TransferYourBusiness from '../../../components/Domains/OilAndGas/TransferYourBusiness';
import WhatCanIBuild from '../../../components/Domains/OilAndGas/WhatCanIBuild';
import WhyBuild from '../../../components/Domains/WhyBuild';
import WhyWorkWithUs from '../../../components/Domains/WhyWorkWithUs';
import Layout from '../../../components/Layout/Layout';
import palette from '../../../styles/pallette';
import { IFAQ } from '../../../types';
import { getStaticImageData } from '../../../utils/helper';

const faqsContent: IFAQ[] = [
  {
    id: 1,
    question: 'What is the best software solution for mining?',
    answer:
      'There’s no one size fits all answer. Mining companies use a wide range of tools. It’s why we recommend you work with a custom software development company like us.',
  },
  {
    id: 2,
    question: 'How can we solve the problem of mining?',
    answer:
      'There’s no one size fits all answer. Mining companies use a wide range of tools. It’s why we recommend you work with a custom software development company like us.',
  },
  {
    id: 3,
    question: 'Which software is used for mine planning?',
    answer:
      'There’s no one size fits all answer. Mining companies use a wide range of tools. It’s why we recommend you work with a custom software development company like us.',
  },
];

const customData = [
  {
    id: 1,
    title: 'Industry-Specific Expertise',
    description:
      'Our developers have in-depth knowledge of the Oil & Gas industry, ensuring that we deliver tailored solutions that address the unique challenges of your operations. From resource management to safety protocols, we understand the sector’s complexities and craft solutions to optimize performance.',
  },
  {
    id: 2,
    title: 'Cutting-Edge Technology Integration',
    description:
      'We leverage the latest technologies, such as IoT, AI, and data analytics, to provide real-time monitoring, predictive maintenance, and enhanced decision-making for Oil & Gas operations. Our solutions help you stay ahead of the curve, improving operational efficiency and reducing downtime.',
  },
  {
    id: 3,
    title: 'Custom Software Solutions',
    description:
      "We specialize in building custom software solutions designed specifically for the Oil & Gas sector. Whether it's a comprehensive asset management system, pipeline monitoring software, or regulatory compliance tools, our solutions are scalable, secure, and tailored to your needs.",
  },
  {
    id: 4,
    title: 'Proven Track Record in Oil & Gas Projects',
    description:
      'With a proven history of successful Oil & Gas projects, we have consistently delivered impactful solutions that enhance productivity, improve safety, and optimize supply chain management. Partner with us to experience a smooth, reliable, and future-ready transformation of your operations.',
  },
];

const OilAndGas = () => {
  return (
    <>
      <Head>
        <title>
          Oil & Gas Software & IoT Solutions by Nextloop Technologies
        </title>
        <meta
          name='description'
          content='Boost operational efficiency with Nextloop’s AI and IoT-powered oil & gas software Manage assets, ensure safety and streamline workflows with real-time data'
        />
      </Head>
      <Layout>
        <CustomPageHero
          image={getStaticImageData(oilAndGasAssets.oilAndGasBg)}
          titleChildren={
            <h1
              className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} text-white uppercase font-bold text-center w-full`}
            >
              Build <span className='text-orange-500'>oil and gas</span>{' '}
              software applications
            </h1>
          }
          customSubtitleClassname={`xl:w-[51%] ${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop}`}
          subtitle='Streamline operations, improve workplace safety, and increase profits with your new web, mobile or desktop app. Oil and gas software solutions don’t need to be complicated. Tell us what you need and we build it. It’s that easy.'
          opacity='opacity-10'
          title=''
        />

        <WhyBuild
          image={getStaticImageData(oilAndGasAssets.whyBuildOilAndGas)}
          colouredTitle='mining industry'
          informationSection={
            <div className='max-w-[737px] md:flex md:flex-col justify-center px-5 md:px-0 md:w-full w-[350px]'>
              {/* <h3
                className={`${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop} uppercase my-5`}
              >
                Why build a custom software solution for the mining industry?
              </h3> */}
              <p
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
              >
                Whether it’s mining or the oil and gas industry... you care
                about performance. Save time and money by creating software that
                lets you more effectively manage your operation. Our no-code
                solution gives you the tech to solve your unique problems. We
                make the entire process simple, cost-effective, and fast. What
                can we do for you?
              </p>
            </div>
          }
        />

        <WhyWorkWithUs data={customData} />

        <HowToBuild />

        <WhatCanIBuild />

        <TransferYourBusiness />

        <FAQ faqsContent={faqsContent} />

        {/* <ClientReviews
          title='Real success stories from'
          colouredTitle='Real customer'
        /> */}

        <CustomRequestQuote title='Your complete oil and gas solution' />
      </Layout>
    </>
  );
};

export default OilAndGas;
