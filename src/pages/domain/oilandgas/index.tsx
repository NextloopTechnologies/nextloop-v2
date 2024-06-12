import React from 'react';

import oilAndGasBg from '../../../../assets/oilAndGasBg.png';
import whyBuildOilAndGas from '../../../../assets/whyBuildOilAndGas.png';
import CustomPageHero from '../../../components/CustomPageHero/CustomPageHero';
import ClientReviews from '../../../components/Domains/ClientReviews';
import CustomRequestQuote from '../../../components/Domains/CustomRequestQuote';
import FAQ from '../../../components/Domains/FAQ';
import HowToBuild from '../../../components/Domains/OilAndGas/HowToBuild';
import TransferYourBusiness from '../../../components/Domains/OilAndGas/TransferYourBusiness';
import WhatCanIBuild from '../../../components/Domains/OilAndGas/WhatCanIBuild';
import WhyBuild from '../../../components/Domains/WhyBuild';
import WhyWorkWithUs from '../../../components/Domains/WhyWorkWithUs';
import Layout from '../../../components/Layout/Layout';
import { IFAQ } from '../../../types';

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

const OilAndGas = () => {
  return (
    <Layout>
      <CustomPageHero
        image={oilAndGasBg}
        titleChildren={
          <h1 className='text-white text-8xl uppercase font-bold text-center max-w-[1306px]'>
            Build <span className='text-orange-500'>oil and gas</span> software
            applications
          </h1>
        }
        subtitle='Streamline operations, improve workplace safety, and increase profits with your new web, mobile or desktop app. Oil and gas software solutions don’t need to be complicated. Tell us what you need and we build it. It’s that easy.'
        opacity='opacity-10'
        title=''
      />

      <WhyBuild
        image={whyBuildOilAndGas}
        colouredTitle='mining industry'
        informationSection={
          <div className='max-w-[737px] flex flex-col justify-center pr-14'>
            <h3 className='font-bold text-lg md:text-2xl uppercase my-5'>
              Why build a custom software solution for the mining industry?
            </h3>
            <p className='text-lg font-normal gap-5'>
              Whether it’s mining or the oil and gas industry... you care about
              performance. Save time and money by creating software that lets
              you more effectively manage your operation. Our no-code solution
              gives you the tech to solve your unique problems. We make the
              entire process simple, cost-effective, and fast. What can we do
              for you?
            </p>
          </div>
        }
      />

      <WhyWorkWithUs />

      <HowToBuild />

      <WhatCanIBuild />

      <TransferYourBusiness />

      <FAQ faqsContent={faqsContent} />

      <ClientReviews
        title='Real success stories from'
        colouredTitle='Real customer'
      />

      <CustomRequestQuote title='Your complete oil and gas solution' />
    </Layout>
  );
};

export default OilAndGas;
