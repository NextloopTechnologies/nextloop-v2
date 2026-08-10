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
      'Why choose bespoke software solutions for the energy sector over off the shelf platforms?',
    answer:
      'Generic software is built for average businesses but the energy sector demands precision. Forcing unique field operations and strict safety workflows into standard platforms compromises data accuracy. Bespoke software solutions for the energy sector are designed to match how your engineers and logistics teams actually work. This eliminates redundant features ensures rapid user adoption and perfectly aligns with your operational reality without forcing you to change your processes.',
  },
  {
    id: 2,
    question:
      'Can new enterprise software development for oil and gas integrate seamlessly with our existing legacy systems?',
    answer:
      'Upgrading your technology should never force you to abandon expensive legacy infrastructure. Our approach to enterprise software development for oil and gas involves building secure APIs and custom middleware. This bridges the gap between your new applications and existing SCADA systems historical databases or ERP platforms. Your historical data remains perfectly intact while data flows smoothly across your entire operation unlocking modern mobile access without interrupting field production.',
  },
  {
    id: 3,
    question:
      'How do offshore oil and gas software solutions maintain data synchronization in remote environments?',
    answer:
      'Reliable connectivity is a major challenge out at sea. To solve this our offshore oil and gas software solutions utilize an offline first architecture. Your field crew can log safety reports update asset metrics and track logistics directly on their devices even without internet access. The software securely stores this data locally and automatically syncs it back to the centralized cloud network the exact moment a stable connection is restored.',
  },
  {
    id: 4,
    question:
      'What is the real world operational impact of implementing predictive maintenance software for oil and gas?',
    answer:
      'Waiting for equipment to fail before fixing it is costly and dangerous. Advanced predictive maintenance software for oil and gas uses machine learning and live IoT sensors to constantly monitor machinery health. By analyzing minor changes in temperature or vibration the system catches microscopic anomalies weeks early. This allows your crew to schedule repairs during planned downtimes preventing catastrophic failures and keeping operations running smoothly.',
  },
  {
    id: 5,
    question:
      'How is digital twin technology for oil and gas practically applied within field operations?',
    answer:
      'Deploying digital twin technology for oil and gas creates a live virtual replica of your physical rigs or refineries. It aggregates sensor data to show exactly how assets are performing globally. Field managers use these digital models to run virtual simulations allowing them to test operational adjustments safely before applying them on the ground. It also serves as a completely risk free training environment for new technicians.',
  },
  {
    id: 6,
    question:
      'Does custom software streamline HSE protocols and regulatory compliance tracking software for energy?',
    answer:
      'Relying on manual paperwork for strict environmental regulations can quickly become an administrative nightmare. We build centralized systems that function as dedicated regulatory compliance tracking software for energy. These platforms automatically log safety audits incident reports and environmental metrics directly from the field. By organizing all records securely in the cloud your organization remains completely audit ready eliminating lost files and ensuring total transparency.',
  },
  {
    id: 7,
    question:
      'What should we expect regarding timelines when engaging oil and gas app development services?',
    answer:
      'Enterprise projects cannot afford endless developmental delays. By leveraging our specialized oil and gas app development services we use an AI driven methodology to streamline coding and testing. This allows us to deliver fully functional applications significantly faster than traditional software agencies. We prioritize strict scoping during the initial phase so we can give you a definitive delivery date upfront allowing your teams to plan their rollout confidently.',
  },
  {
    id: 8,
    question:
      'How is the investment structured for custom oil and gas software development?',
    answer:
      'Financial predictability is essential for enterprise budgets. Nextloop removes pricing risks by operating under a strict fixed price guarantee for all custom oil and gas software development. Once we map out your project scope the final cost is locked in permanently. You will never face hidden fees or mid project price spikes. If our engineering team finishes the build ahead of schedule we pass those cost savings directly to you.',
  },
  {
    id: 9,
    question:
      'What are the primary proven benefits of custom software in upstream operations?',
    answer:
      'Upstream environments are incredibly dynamic and leave no room for informational delays. The core benefits of custom software in upstream operations revolve around turning raw telemetry into actionable insights. From automated drill site monitoring to live reservoir performance tracking specialized software optimizes extraction rates and keeps crews safer. It breaks down information silos between the field and headquarters providing everyone with a single source of truth.',
  },
  {
    id: 10,
    question:
      'How does software drive supply chain optimization for oilfield services and logistics?',
    answer:
      'Coordinating heavy machinery and materials across remote sites requires flawless execution. True supply chain optimization for oilfield services involves integrating custom logistics modules with your tracking systems for complete pipeline visibility. By automating procurement workflows and monitoring fleet locations in real time the platform prevents costly material delays and coordinates complex equipment arrivals perfectly. This ensures your crews always have exactly what they need on site.',
  },
];

const customData = [
  {
    id: 1,
    title: 'Hire oil and gas software developers',
    description:
      'We deliver tailored solutions that solve your unique daily challenges. We truly understand the sector complexities. From complex resource management to strict safety protocols we craft the right technology to clearly optimize your overall field performance.',
  },
  {
    id: 2,
    title: 'IoT integration for oil and gas field operations',
    description:
      'We provide real time monitoring and smart predictive maintenance. These enhanced decision making capabilities easily keep you ahead of the curve. Our tools improve operational efficiency while actively reducing downtime with AI in refinery operations.',
  },
  {
    id: 3,
    title: 'Real time pipeline monitoring solutions',
    description:
      'We specialize in building custom systems designed specifically for the energy sector today. Whether you need a comprehensive asset management system or regulatory compliance tools our platforms remain scalable secure and tailored to you.',
  },
  {
    id: 4,
    title: 'Proven energy sector software case studies',
    description:
      'We consistently deliver impactful solutions that enhance daily productivity and improve worker safety. We drive true supply chain optimization for oilfield services. Partner with us to experience a smooth reliable and future ready digital transformation.',
  },
];

const OilAndGas = () => {
  return (
    <>
      <Head>
        <title>
          Enterprise software development for oil and gas | Nextloop
        </title>
        <meta
          name='description'
          content='Partner with a leading oil and gas digital transformation company. We build custom software solutions for the energy sector to scale daily field operations.'
        />
      </Head>
      <Layout>
        <CustomPageHero
          image={getStaticImageData(oilAndGasAssets.oilAndGasBg)}
          titleChildren={
            <h1
              className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} text-white font-bold text-center w-full`}
            >
              Custom oil and gas software{' '}
              <span className='text-orange-500'>development company</span>
            </h1>
          }
          customSubtitleClassname={`xl:w-[51%] ${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop}`}
          subtitle='Running an energy operation is highly complex. Your daily software should not be. We build bespoke software solutions for the energy sector designed specifically for your workflows. Our custom web, mobile and desktop apps help you streamline daily field operations. They improve workplace safety, reduce manual errors and ultimately increase your profit margins. Tell us exactly what your team needs to succeed. We will build it from the ground up. It really is that easy.'
          opacity='opacity-10'
          title=''
        />

        <WhyBuild
          image={getStaticImageData(oilAndGasAssets.whyBuildOilAndGas)}
          title='Why build <br /> a custom software solution for the'
          colouredTitle='oil and gas'
          informationSection={
            <div className='max-w-[737px] md:flex md:flex-col justify-center px-5 md:px-0 md:w-full w-[350px] gap-2'>
              <p
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
              >
                Generic tools are built for the masses. They rarely work well
                for specialized energy operations. Adapting your complex
                workflows to fit basic software costs you time and money. In
                this industry it can even risk crew safety.
              </p>
              <p
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
              >
                Custom software changes everything. You will quickly see the
                benefits of custom software in upstream operations and
                downstream distribution. You get a purpose built platform. It
                gives your team exactly what they need. There is no software
                bloat and no missing features. Nextloop designs technology to
                perfectly match your exact field processes. We make the entire
                development journey simple, cost effective and incredibly fast.
              </p>
            </div>
          }
        />

        <WhyWorkWithUs
          data={customData}
          title='Specialized oilfield'
          colouredTitle='IT consulting services'
          subtitle='Get oil and gas app development services faster and effectively. No tech skills are needed. Your delivery date is calculated upfront and we lock a fixed price. But we offer more than just fantastic software. Take a look.'
        />

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
