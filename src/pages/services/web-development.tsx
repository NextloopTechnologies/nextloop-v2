import { Code, Lightbulb, PenTool, Rocket,Search } from 'lucide-react';
import Head from 'next/head';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import BlogSection from '../../components/BlogSection';
import FAQ from '../../components/Domains/FAQ';
import IconTitleDescription from '../../components/IconTitleDescription';
import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import TechStack from '../../components/TechStackSection';
import {
  blogData,
  faqsContent,
  servicesWhyChooseUsData,
} from '../../utils/staticTextImgData';
import servicesWebdevelopmentHero from '../../../assets/services/servicesWebdevelopmentHero.png';

const WebDevelopment = () => {
  const steps = [
    {
      icon: <Lightbulb className='text-orange-500 w-8 h-8' />,
      title: 'Planning & Consultation',
      description: 'We discuss your goals and understand your business needs.',
      borderColor: 'border-orange-500',
    },
    {
      icon: <PenTool className='text-orange-500 w-8 h-8' />,
      title: 'Design & Prototyping',
      description:
        'We create intuitive wireframes and prototypes for user-friendly interfaces.',
      borderColor: 'border-orange-500',
    },
    {
      icon: <Code className='text-orange-500 w-8 h-8' />,
      title: 'Development',
      description:
        'Our team writes clean code, developing the website using the latest technologies.',
      borderColor: 'border-orange-500',
    },
    {
      icon: <Search className='text-gray-500 w-8 h-8' />,
      title: 'Testing',
      description:
        'Comprehensive testing ensures smooth functionality and cross-platform compatibility.',
      borderColor: 'border-gray-500',
    },
    {
      icon: <Rocket className='text-gray-500 w-8 h-8' />,
      title: 'Launch & Support',
      description:
        'We launch the site and provide ongoing maintenance to keep it running smoothly.',
      borderColor: 'border-gray-500',
    },
  ];
  return (
    <Layout>
      <Head>
        <title>NextLoop Technologies | Our Services</title>
        <meta
          name='description'
          content='Elevate your business with NextLoop Technologies. Our diverse range of services is crafted to optimize performance and foster sustainable growth.'
        />
      </Head>
      <PageHero
        image={servicesWebdevelopmentHero}
        coloredTitle='CUSTOM SOFTWARE '
        title='DEVELOPMENT'
        subtitle='NextLoop Technologies, specialize in creating custom software solutions that are built to solve your unique business challenges. Our team of skilled developers and designers work collaboratively to develop software that enhances your efficiency, productivity, and overall business performance.'
        opacity='opacity-80'
      />

      <div className='flex flex-col items-center justify-center py-12 px-6'>
        <h2 className='text-3xl font-bold mb-12 text-center'>PROCESS</h2>
        <div className='grid grid-cols-5 gap-6 max-w-6xl'>
          {steps.map((step, index) => (
            <div key={index} className='relative flex flex-col items-center'>
              <div
                className={`w-40 h-40 flex flex-col items-center justify-center border-2 ${step.borderColor} transform rotate-45 bg-white shadow-md`}
              >
                <div className='-rotate-45'>{step.icon}</div>
                <h3 className='mt-2 font-semibold text-center -rotate-45'>
                  {step.title}
                </h3>
                <p className='text-sm text-center text-gray-600 -rotate-45 px-4'>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TechStack />
      <IconTitleDescription data={servicesWhyChooseUsData} />
      <BlogSection blogData={blogData} />
      <FAQ faqsContent={faqsContent} />
    </Layout>
  );
};

export default WebDevelopment;
