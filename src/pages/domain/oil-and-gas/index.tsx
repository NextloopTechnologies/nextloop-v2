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
    question:
      "How is Nextloop's AI-powered custom software different from standard oil and gas software available off the shelf? ",
    answer:
      "Most off-the-shelf oil and gas software is built for the average operation — which means it fits no one perfectly. You end up working around its limitations, paying for features you don't need, and missing the ones you do. Nextloop's AI-powered custom software is built around your specific workflows, infrastructure, and operational goals from day one. Our AI solutions for oil and gas go further than standard tools by continuously learning from your data — flagging inefficiencies, predicting equipment failures, and surfacing insights that generic platforms simply aren't designed to deliver. The result is software that feels like it was made for your business, because it was.",
  },
  {
    id: 2,
    question:
      'Our operation involves both onshore and offshore sites. Can a single platform manage both? ',
    answer:
      'Yes — and this is something we design for intentionally. Offshore and onshore environments have genuinely different challenges: regulatory frameworks, connectivity constraints, personnel logistics, and supply coordination all vary significantly between the two. Our platforms are built to handle that complexity within a single, unified system. Your onshore team and offshore crew can work from the same platform, with role-based access, real-time data syncing where connectivity allows, and offline functionality that ensures nothing falls through the gaps when signals are unreliable. ',
  },
  {
    id: 3,
    question:
      'We already use several third-party tools for finance and procurement. Will your software work alongside them? ',
    answer:
      "Absolutely. We understand that switching out every system at once isn't realistic — and in many cases, it isn't necessary. If your existing financial, procurement, or ERP tools are working well for you, we build around them. Our platforms are designed with open integration architecture, meaning your new custom software can connect cleanly with the tools already embedded in your operation. You get the benefits of a purpose-built oil and gas platform without the disruption of replacing systems your team already depends on. ",
  },
];

const customData = [
  {
    id: 1,
    title: 'Industry-Specific Expertise',
    description:
      'Our developers understand the oil and gas sector as well as they understand code. From resource management and HSE protocols to regulatory compliance and field operations, that domain knowledge is built into every decision we make. The outcome is less back-and-forth, faster delivery, and software that solves the problems your operation actually has — not the ones a generalist assumed you might. ',
  },
  {
    id: 2,
    title: ' Cutting-Edge Technology Integration ',
    description:
      'IoT sensors, AI-driven analytics, machine learning, real-time data pipelines — we build with the technologies that are genuinely changing how oil and gas operations run. Our AI-powered custom software gives your team continuous asset monitoring, early warning on equipment failures, and faster, better-informed decisions across the board. Less downtime. Stronger resource utilisation. A clear operational advantage over teams still working manually. ',
  },
  {
    id: 3,
    title: 'A Proven Track Record ',
    description:
      "We've delivered AI solutions for oil and gas clients across the full value chain — improving productivity, reducing operational risk, and tightening supply chains in environments where getting it wrong isn't an option. When you work with Next Loop Technologies, you're working with a team that knows this industry, has navigated its complexity before, and understands exactly what it takes to deliver something that holds up in the field. ",
  },
  {
    id: 4,
    title: 'Custom Software Solutions ',
    description:
      'We build custom software solutions designed specifically for the oil and gas sector — not adapted from generic platforms and made to fit. Whether you need a comprehensive asset management system, pipeline monitoring software, or regulatory compliance tools, every solution we deliver is scalable, secure, and shaped around the way your operation actually runs. ',
  },
];

const OilAndGas = () => {
  return (
    <>
      <Head>
        <title>AI Solutions for Oil & Gas | Custom Software Services</title>
        <meta
          name='description'
          content='Nextloop delivers AI-powered custom software to boost efficiency in oil & gas operations. Improve production, safety, and analytics with our scalable technology '
        />
      </Head>
      <Layout>
        <CustomPageHero
          image={getStaticImageData(oilAndGasAssets.oilAndGasBg)}
          titleChildren={
            <h1
              className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} text-white font-bold text-center w-full`}
            >
              Hire Remote Developers for{'   '}
              <span className='text-orange-500'>
                Custom Oil & Gas Software Solutions
              </span>
            </h1>
          }
          customSubtitleClassname={`xl:w-[51%] ${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop}`}
          subtitle=''
          opacity='opacity-10'
          title=''
        />

        <WhyBuild
          image={getStaticImageData(oilAndGasAssets.whyBuildOilAndGas)}
          title='Why Custom Software for  '
          colouredTitle='oil and gas industry?'
          informationSection={
            <div className='max-w-[737px] md:flex md:flex-col justify-center px-5 md:px-0 md:w-full w-[350px] gap-2'>
              <p
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
              >
                Generic tools weren't built for your operation — they were built
                for everyone, which means they rarely work well for anyone.
                Adapting your workflows to fit their limitations costs time,
                money, and in this industry, sometimes safety.
              </p>
              <p
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
              >
                Custom software changes that dynamic entirely. Whether you're
                running upstream production, midstream logistics, or downstream
                distribution, a purpose-built platform gives your team exactly
                what they need — nothing more, nothing redundant. Nextloop's AI
                solutions for oil and gas are built to understand your
                environment, match your processes, and scale as your operation
                evolves.Generic tools weren't built for your operation — they
                were built for everyone, which means they rarely work well for
                anyone. Adapting your workflows to fit their limitations costs
                time, money, and in this industry, sometimes safety.
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
