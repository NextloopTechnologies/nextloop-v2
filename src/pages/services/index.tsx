import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { getSchemaMarkup } from '../../utils/seoSchemas';
import servicesBg from '../../../assets/servicesBg.webp';

const cards: { title: string; desc: string; link: string }[] = [
  {
    title: 'Custom Software Development',
    desc: 'We design and build software tailored to your business needs, from internal tools to full-scale platforms. With our custom software application development service, we focus on creating reliable, scalable solutions that simplify operations and support your business as it grows. ',
    link: '/services/custom-software-development',
  },
  {
    title: 'IT Staff Augmentation',
    desc: 'Expand your development capacity without long hiring cycles. If you need to hire remote developers, we enable you to add skilled professionals to your team who work within your processes and contribute from day one. It helps you manage changing project demands while keeping delivery consistent and on schedule.',
    link: '/services/it-staff-augmentation',
  },
  {
    title: 'Website Development',
    desc: 'Create a strong digital presence with websites that are fast, easy to navigate, and built for real users. Through our website design and development service, we emphasize delivering responsive experiences that not only look good but also perform seamlessly across devices.',
    link: '/services/web-development',
  },
  {
    title: 'MVP Development',
    desc: 'Start with a focused version of your product that solves a real problem and can be tested quickly in the market. Designed for early-stage ideas, our mvp development service for startups helps you validate concepts, gather real user feedback and move forward with clarity.',
    link: '/services/mvp-development',
  },
  {
    title: 'Cloud Computing Services (DevOps, AWS, GCP, Azure)',
    desc: 'Managing infrastructure becomes easier when systems are built to scale, adapt and stay secure from the start. As a cloud services provider, our aim is to create environments that handle workloads efficiently while also supporting flexibility, performance and long-term stability.',
    link: '/services/cloud-computing-solutions',
  },
  {
    title: 'Mobile App Development',
    desc: 'Mobile experiences today need to feel seamless, whether users are on Android, iOS, or multiple devices. Covering native and cross-platform builds, our cross-platform app development service highly focuses on delivering apps that run smoothly, stay consistent and keep users engaged over time. ',
    link: '/services/mobile-app-development',
  },
  // {
  //   title: 'UI/UX Development',
  //   desc: 'How a product feels often shapes how people use it. Clear layouts, intuitive flows and thoughtful interactions remove friction and make navigation effortless. Our UI/UX design and development service intents on crafting experiences that feel natural, guide users smoothly and keep engagement consistent across every touchpoint.',
  //   link: '/services/ui-ux-development',
  // },
  {
    title: 'E-commerce Development',
    desc: "Turn your online store into a sales powerhouse! We offer end-to-end e-commerce development solutions, from building a secure and user-friendly platform to integrating robust payment gateways and implementing effective marketing strategies. We'll help you transform your online store into a thriving e-commerce empire.",
    link: '/services/e-commerce-development',
  },
  {
    title: 'AI & ML Solutions',
    desc: 'Turn complex data into meaningful outcomes using intelligent systems built for real use cases. Our generative AI service include developing models that automate tasks, generate insights and enhance user experiences. From chatbots to predictive systems, these solutions help integrate AI into everyday business workflows.',
    link: '/services/ai-ml',
  },
  // {
  //   title: 'Quality Assurance & Software Testing',
  //   desc: 'Software issues often surface when real users start interacting with the product. You can use our automation testing service to help detect bugs, performance gaps and inconsistencies early through continuous and structured testing. This ensures stable releases, smoother user experiences and fewer issues after deployment. ',
  //   link: '/services/software-testing-qa-services',
  // },
  // {
  //   title: 'Technical Support',
  //   desc: "Peace of mind is priceless. Our reliable technical support services ensure that your website or application runs smoothly, uninterrupted. We'll be there to promptly address any technical issues that may arise, keeping your online presence running optimally.",
  //   link: '/services/technical-support',
  // },
  {
    title: 'Digital Marketing Services',
    desc: "Take your brand to the next level with Nextloop's data-driven digital marketing solutions. Through SEO, advertisements, and social media interaction, we combine strategy, technology, and creativity to increase traffic, lead generation, and conversions.",
    link: '/services/digital-marketing-services',
  },
];

const Services = () => {
  return (
    <Layout>
      <Head>
        <title>
          Offshore development center | Custom Web & software services provider
        </title>
        <meta
          name='description'
          content='Get bespoke software development services tailored to your needs. We offer remote IT staffing services and custom mobile app & web development services to scale faster.'
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: getSchemaMarkup('services'),
          }}
        />
      </Head>
      <PageHero
        image={servicesBg}
        coloredTitle='Custom Software Development '
        title='& IT Staff Augmentation Services'
        subtitle='Work with our offshore development teams across India and USA to build reliable web and mobile applications. From providing AI development services to cloud & DevOps services, we focus on creating scalable, practical solutions that align with your business goals and support long-term growth through a flexible and efficient development approach.'
        opacity='opacity-80'
      />
      <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 xl:p-24 md:p-8 p-4 place-items-center'>
        {cards.map((card, idx) => (
          <Link href={card.link} key={idx}>
            <div className='flex flex-col items-center justify-center text-center gap-8 shadow-md md:h-[580px] px-8 py-8 md:py-0 bg-white text-black hover:bg-[#1D1D1D] hover:text-white transition-all duration-200 ease-in-out'>
              <Image
                src={`/services/${idx}.png`}
                alt={`service-${idx}`}
                height={140}
                width={140}
              />
              <h2 className='font-medium lg:text-3xl text-2xl w-full'>
                {card.title}
              </h2>
              <p>{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Services;
