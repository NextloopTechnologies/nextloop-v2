import Head from 'next/head';
import React from 'react';

import { healthcareAssets } from '../../../../assets';
import {
  healthCareWhyChooseUs1,
  healthCareWhyChooseUs2,
} from '../../../../assets';
import CustomPageHero from '../../../components/CustomPageHero/CustomPageHero';
// import ClientReviews from '../../../components/Domains/ClientReviews';
import CustomRequestQuote from '../../../components/Domains/CustomRequestQuote';
import FAQ from '../../../components/Domains/FAQ';
import OurExpertise from '../../../components/Domains/HealthCare/OurExpertise';
import SuccessStories from '../../../components/Domains/HealthCare/SuccessStories';
import ProductServices from '../../../components/Domains/ProductServices';
import WhyBuild from '../../../components/Domains/WhyBuild';
import WhyChooseUs from '../../../components/Domains/WhyChooseUs';
import Layout from '../../../components/Layout/Layout';
import palette from '../../../styles/pallette';
import { IFAQ, IWhyChooseUs } from '../../../types';
import { getStaticImageData } from '../../../utils/helper';

const faqsContent: IFAQ[] = [
  {
    id: 1,
    question:
      'What is a Healthcare Management System and does my organisation actually need one?',
    answer:
      "A Healthcare Management System (HMS) is an integrated software platform that connects and automates the core functions of a healthcare facility — patient registration, appointment scheduling, medical records, billing, staff management, and more — into one centralised system. If your team is still relying on manual processes, disconnected tools, or outdated legacy software, the short answer is yes — you need one. An HMS eliminates administrative bottlenecks, reduces costly errors, and frees your clinical staff to focus on patient care rather than paperwork. At Next Loop Technologies, we build HMS solutions tailored to your specific workflows, so you're not forced to adapt to a one-size-fits-all product. ",
  },
  {
    id: 2,
    question:
      'How does healthcare software development improve the patient experience?',
    answer:
      'Patient experience is directly shaped by how efficiently your operations run behind the scenes. When appointments are easy to book, waiting times are reduced, billing is clear and timely, and communication is proactive — patients notice. Our solutions include automated appointment reminders to reduce no-shows, real-time patient mobile apps for record access and updates, streamlined billing workflows that eliminate confusion, and telehealth capabilities that make care more accessible. The result is a smoother, more trustworthy experience at every touchpoint — from the first booking to the final invoice. ',
  },
  {
    id: 3,
    question:
      'How do you handle data security and compliance in healthcare software?',
    answer:
      'Healthcare data is among the most sensitive information in existence, and we treat it that way. Security and compliance are built into our development process from day one — not added as an afterthought. Our solutions incorporate end-to-end data encryption, multi-factor authentication, role-based access controls, and regular security testing throughout the build. We also develop with relevant regulatory frameworks in mind, including HIPAA and applicable local healthcare data protection standards. Automated compliance modules within the platform ensure your organisation stays current as regulations evolve, flagging issues before they become violations.',
  },
];

const whyChooseContent: IWhyChooseUs[] = [
  {
    title: 'Customized Healthcare Solutions',
    descp:
      ' Our software is built specifically for healthcare professionals — not adapted from a generic platform. Every solution is designed around your clinical workflows, compliance obligations, and patient needs, ensuring efficient care delivery and full adherence to standards like HIPAA from day one.',
    image: healthCareWhyChooseUs1,
  },
  {
    title: 'Innovative Technology with Always-On Support',
    descp:
      'When you Hire Healthcare Dedicated Software Developers from Next Loop Technologies, you get more than a development team. You get access to AI, IoT, and cloud-based expertise — applied directly to your operational challenges. And as your demands grow, our round-the-clock support keeps your systems running without interruption.',
    image: healthCareWhyChooseUs2,
  },
];

const productServiceContent = [
  {
    icon: getStaticImageData(healthcareAssets.settingIcon),
    title: 'Product Engineering',
    descp:
      'Turning clinical requirements into purpose-built healthcare software — designed for the next generation of patient care and built to scale alongside your organisation.',
  },
  {
    icon: getStaticImageData(healthcareAssets.modernizeIcon),
    title: 'Application Modernization',
    descp:
      'Legacy systems slow teams down and create risk. We replace outdated healthcare infrastructure with modern, secure platforms your staff will actually want to use. ',
  },
  {
    icon: getStaticImageData(healthcareAssets.cloudIcon),
    title: 'Cloud Migration',
    descp:
      'We move your healthcare operations to the cloud with minimal disruption — improving reliability, strengthening data security, and setting your platform up for long-term performance. ',
  },
  {
    icon: getStaticImageData(healthcareAssets.maintenanceIcon),
    title: 'Application Maintenance',
    descp:
      "When you Hire Healthcare Software Developers from Next Loop Technologies, the relationship doesn't end at launch. We provide ongoing support, updates, and compliance-driven optimisation to keep your applications running smoothly and securely.",
  },
];

const HealthCare: React.FC = () => {
  return (
    <>
      <Head>
        <title>
          Healthcare Software Development Services | Hire AI Health Developers
        </title>
        <meta
          name='description'
          content='Nextloop Technologies builds next-gen healthcare apps with AI diagnostics, remote patient monitoring, and secure cloud integration. Scalable solutions for modern HealthTech.'
        />
      </Head>
      <Layout>
        <CustomPageHero
          image={getStaticImageData(healthcareAssets.healthCareBg)}
          titleChildren={
            <h1
              className={` text-white font-bold text-center max-w-[1306px] ${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop}`}
            >
              Transforming Patient Care: <br />
              <span className='text-orange-500'>
                Hire Healthcare Software Developers to Build Next-Gen Medical
                Solutions
              </span>{' '}
            </h1>
          }
          subtitle=''
          opacity='opacity-10'
          title=''
        />

        <WhyBuild
          image={getStaticImageData(healthcareAssets.whyBuildImg)}
          title='What Is Healthcare Software Development —  '
          colouredTitle='And Why Does It Matter?'
          informationSection={
            <div className='max-w-[737px] flex flex-col justify-center px-5 md:px-0 gap-2'>
              <p
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
              >
                A Healthcare Management System (HMS) is the operational backbone
                of a modern healthcare facility — not just a place to store
                records, but a centralised platform that connects every
                function, from patient registration and appointment scheduling
                to billing, inventory, and staff management, in one cohesive
                system.
              </p>
              <p
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
              >
                At Next Loop Technologies, Hire Healthcare Software Developers
                with deep domain expertise to build custom HMS solutions shaped
                around your specific workflows, compliance requirements, and
                patient population. Whether you're managing a busy urban
                hospital, a specialist clinic, or a multi-site network we build
                software that fits the way you actually work.
              </p>
            </div>
          }
        />

        <WhyChooseUs whyChooseContent={whyChooseContent} />

        <OurExpertise />

        <ProductServices
          title={
            <h1
              className={`text-black font-bold text-center  ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop}`}
            >
              Specialised{' '}
              <span className='text-orange-500'>Healthcare Services</span>{' '}
            </h1>
          }
          data={productServiceContent}
        />

        <SuccessStories />

        {/* <ClientReviews /> */}

        <FAQ faqsContent={faqsContent} />

        <CustomRequestQuote title='see what your healthcare website could look like' />
      </Layout>
    </>
  );
};

export default HealthCare;
