import React from 'react';

import { healthcareAssets } from '../../../../assets';
import CustomPageHero from '../../../components/CustomPageHero/CustomPageHero';
import ClientReviews from '../../../components/Domains/ClientReviews';
import CustomRequestQuote from '../../../components/Domains/CustomRequestQuote';
import FAQ from '../../../components/Domains/FAQ';
import OurExpertise from '../../../components/Domains/HealthCare/OurExpertise';
import SuccessStories from '../../../components/Domains/HealthCare/SuccessStories';
import ProductServices from '../../../components/Domains/ProductServices';
import WhyBuild from '../../../components/Domains/WhyBuild';
import WhyChooseUs from '../../../components/Domains/WhyChooseUs';
import Layout from '../../../components/Layout/Layout';
import { IFAQ, IWhyChooseUs } from '../../../types';
import { getStaticImageData } from '../../../utils/helper';

const benefits = [
  {
    id: 1,
    text: 'Managing patient records',
  },
  {
    id: 2,
    text: 'Scheduling appointments',
  },
  {
    id: 3,
    text: 'Ordering medications',
  },
  {
    id: 4,
    text: 'Billing patients',
  },
];

const faqsContent: IFAQ[] = [
  {
    id: 1,
    question: 'what is healthcare software development?',
    answer:
      'Healthcare software development involves creating customized software solutions to meet the specific needs of the healthcare industry, including patient management, EHRs, telehealth services, and compliance management, utilizing the latest technologies and regulations.',
  },
  {
    id: 2,
    question: 'can nextloop modernize my existing healthcare software?',
    answer:
      'Healthcare software development involves creating customized software solutions to meet the specific needs of the healthcare industry, including patient management, EHRs, telehealth services, and compliance management, utilizing the latest technologies and regulations.',
  },
  {
    id: 3,
    question: 'how long does it take to develop a healthcare solution?',
    answer:
      'Healthcare software development involves creating customized software solutions to meet the specific needs of the healthcare industry, including patient management, EHRs, telehealth services, and compliance management, utilizing the latest technologies and regulations.',
  },
];

const whyChooseContent: IWhyChooseUs[] = [
  {
    title: 'Accept payments from anywhere with POS integrations',
    descp:
      'Streamline your operations by syncing menus and orders with advanced point of sale solutions—right on your dashboard.',
    image: getStaticImageData(healthcareAssets.whyChooseUsImg),
  },
  {
    title: 'Up your service with real-time data',
    descp:
      'Use analytics to get to know your customers and increase sales, then tailor their online experience to fit their needs.',
    image: getStaticImageData(healthcareAssets.whyChooseUsImg),
  },
];

const productServiceContent = [
  {
    icon: getStaticImageData(healthcareAssets.settingIcon),
    title: 'Product Engineering',
    descp:
      'Transforming innovative ideas into cutting-edge healthcare software products designed for superior next-generation patient care.',
  },
  {
    icon: getStaticImageData(healthcareAssets.modernizeIcon),
    title: 'Application Modernization',
    descp:
      'Revitalizing legacy healthcare systems with modern tech to enhance efficiency, security, and user experience.',
  },
  {
    icon: getStaticImageData(healthcareAssets.cloudIcon),
    title: 'Cloud Migration',
    descp:
      'Seamlessly transitioning your healthcare solutions to the cloud for enhanced scalability, reliability, and performance.',
  },
  {
    icon: getStaticImageData(healthcareAssets.maintenanceIcon),
    title: 'Application Maintenance',
    descp:
      'Providing continuous support & updates to ensure your healthcare applications run smoothly and securely.',
  },
];

const HealthCare: React.FC = () => {
  return (
    <Layout>
      <CustomPageHero
        image={getStaticImageData(healthcareAssets.healthCareBg)}
        titleChildren={
          <h1 className='text-white text-5xl md:text-8xl uppercase font-bold text-center max-w-[1306px]'>
            <span className='text-orange-500'>healthcare</span> software
            development transforming patient care
          </h1>
        }
        subtitle=''
        opacity='opacity-10'
        title=''
      />

      <WhyBuild
        image={getStaticImageData(healthcareAssets.whyBuildImg)}
        colouredTitle='healthcare'
        informationSection={
          <div className='max-w-[737px] flex flex-col justify-center px-5 md:px-0'>
            <p className='text-sm md:text-lg'>
              We all know that technology is rapidly changing the healthcare
              industry. From electronic health records (EHRs) to telemedicine,
              technology is being used to improve the quality, efficiency, and
              affordability of healthcare.
            </p>
            <p className='text-sm md:text-lg'>
              In fact, the global healthcare software market is expected to
              reach $974.5 billion by 2027. This means that healthcare
              automation is not just a future but is becoming a necessity.
            </p>
            <p className='text-sm md:text-lg'>
              Custom Software solutions involve a process in which software is
              specifically designed for a particular healthcare organization.
              They can be used to improve a variety of tasks and processes, such
              as:
            </p>
            <ul className='list-disc text-sm md:text-lg pl-5 md:pl-10 mt-2 mb-2'>
              {benefits.map((benefit) => (
                <li key={benefit.id}>{benefit.text}</li>
              ))}
            </ul>
            <p className='text-sm md:text-lg'>
              In this blog, you will uncover the reasons why healthcare
              providers should invest in custom software and how their
              investment can improve efficiency, reduce costs, and improve
              patient care.
            </p>
          </div>
        }
      />

      <WhyChooseUs whyChooseContent={whyChooseContent} />

      <OurExpertise />

      <ProductServices
        title={
          <h1 className='text-black text-3xl md:text-5xl lg:text-7xl xl:text-[85px] uppercase font-bold text-center max-w-[1306px]'>
            specialized <span className='text-orange-500'>healthcare</span>{' '}
            services!
          </h1>
        }
        data={productServiceContent}
      />

      <SuccessStories />

      <ClientReviews />

      <FAQ faqsContent={faqsContent} />

      <CustomRequestQuote title='see what your healthcare website could look like' />
    </Layout>
  );
};

export default HealthCare;
