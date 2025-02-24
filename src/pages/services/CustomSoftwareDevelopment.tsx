import Head from 'next/head';
import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ToolBox from '../../components/Domains/Restaurant/ToolBox';
import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import palette from '../../styles/pallette';
import blogImg from '../../../assets/blog/blogImg.png';
import carouselImg from '../../../assets/carouselImg.png';
import buildingIcon from '../../../assets/services/buildingIcon.png';
import desktopCloud from '../../../assets/services/desktopCloud.png';
import documentIcon from '../../../assets/services/documentIcon.png';
import eyeIcon from '../../../assets/services/eyeIcon.png';
import fileIcon from '../../../assets/services/fileIcon.png';
import mapMarkerPlusIcon from '../../../assets/services/mapMarkerPlusIcon.png';
import pathFinderIcon from '../../../assets/services/pathFinderIcon.png';
import servicesWebdevelopmentHero from '../../../assets/services/servicesWebdevelopmentHero.png';

const expertiseData = [
  {
    title: 'Enterprise Software Development',
    description:
      'Build powerful, scalable, and secure systems that manage business-critical operations.',
    image: fileIcon,
    dark: true,
  },
  {
    title: 'Web Applications',
    description:
      'Develop dynamic, responsive, and feature-rich web applications that are accessible across devices and platforms.',
    image: documentIcon,
    dark: false,
  },
  {
    title: 'Mobile Applications',
    description:
      'Create intuitive and engaging mobile apps for Android and iOS to meet the needs of your mobile-first users.',
    image: buildingIcon,
    dark: false,
  },
  {
    title: 'Cloud Solutions',
    description:
      'Modernize your infrastructure with cloud-based solutions for enhanced flexibility, security, and scalability.',
    image: desktopCloud,
    dark: true,
  },
  {
    title: 'API Integrations',
    description:
      'Seamlessly integrate your software with third-party applications and services, enhancing functionality and improving workflows.',
    image: fileIcon,
    dark: true,
  },
  {
    title: 'Software Maintenance and Support',
    description:
      'Ensure your systems remain efficient with ongoing maintenance, updates, and troubleshooting services.',
    image: documentIcon,
    dark: false,
  },
];

const data = [
  {
    id: 1,
    title: 'Expertise',
    descp: ' Experienced developers who use cutting-edge technologies.',
    icon: mapMarkerPlusIcon,
  },
  {
    id: 2,
    title: 'Custom Solutions',
    descp: 'Tailored websites to meet your specific business needs.',
    icon: pathFinderIcon,
  },
  {
    id: 3,
    title: 'Scalable Designs',
    descp: 'Websites that grow with your business.',
    icon: eyeIcon,
  },
  {
    id: 4,
    title: 'Responsive Support',
    descp: 'Reliable support to ensure your site performs optimally.',
    icon: mapMarkerPlusIcon,
  },
  {
    id: 5,
    title: 'SEO-Friendly',
    descp:
      'We ensure your website is search-engine optimized for better visibility.',
    icon: pathFinderIcon,
  },
  {
    id: 6,
    title: 'On-time Delivery',
    descp: 'Projects completed on schedule with quality results.',
    icon: eyeIcon,
  },
];

const ExpertiseSection = () => {
  return (
    <section className='flex flex-col py-16 px-4 md:px-16 text-center'>
      <h3 className='text-3xl md:text-4xl font-bold'>
        OUR EXPERTISE IN{' '}
        <span className='text-orange-500'>CUSTOM SOFTWARE DEVELOPMENT</span>
      </h3>
      <p className='text-gray-600 mt-4'>
        We bring extensive experience across a wide range of industries. Our
        custom solutions include:
      </p>
      <div className='grid md:grid-cols-2  mt-10'>
        {expertiseData.map((item, index) => (
          <div
            key={index}
            className={`flex items-center p-6 rounded-lg shadow-md ${
              item.dark ? 'bg-black text-white' : 'bg-white text-black border'
            }`}
          >
            <div className='w-13 h-13 relative mr-4'>
              <Image src={item.image} alt={item.title} />
            </div>
            <div className='text-left'>
              <h3 className='font-bold text-lg'>{item.title}</h3>
              <p className='text-sm mt-2'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const blogData = [
  {
    title: 'Industry Knowledge and Research Capabilities',
    description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
    image: blogImg,
  },
  {
    title: 'Industry Knowledge and Research Capabilities',
    description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
    image: blogImg,
  },
  {
    title: 'Industry Knowledge and Research Capabilities',
    description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
    image: blogImg,
  },
];

const expertiseData1 = [
  {
    title: 'Ecommerce Website',
    description: 'Selling immediately, without limits.',
    image: carouselImg,
  },
  {
    title: 'Professional Event Website',
    description: 'Create a professional event website.',
    image: carouselImg,
  },
  {
    title: 'Fintech Website Design',
    description: 'Innovative solutions for fintech businesses.',
    image: carouselImg,
  },
  {
    title: 'Healthcare Software',
    description: 'Transforming patient care with technology.',
    image: carouselImg,
  },
];

const ExpertiseCarousel = () => {
  return (
    <section className='flex flex-col py-16 px-4 md:px-16 text-center'>
      <h2 className='text-3xl md:text-4xl font-bold'>
        OUR AREAS OF <span className='text-orange-500'>EXPERTISE</span>
      </h2>
      <p className='text-gray-600 mt-4'>
        At NextLoop, we specialize in developing custom software solutions for
        various industries. Here's a look at the sectors where we excel.
      </p>
      <div className='mt-10'>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className='w-full'
        >
          {expertiseData1.map((item, index) => (
            <SwiperSlide key={index}>
              <div className='relative w-full h-96 rounded-lg overflow-hidden shadow-md'>
                <Image src={item.image} alt={item.title} layout='fill' />
                <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4'>
                  <h3 className='text-xl font-bold text-center'>
                    {item.title}
                  </h3>
                  <p className='text-sm mt-2 text-center'>{item.description}</p>
                  <a
                    href='#'
                    className='mt-4 text-white font-bold flex items-center hover:underline'
                  >
                    View More <span className='ml-2'>→</span>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const BlogSection = () => {
  return (
    <section className='flex flex-col py-16 px-4 md:px-16 text-center'>
      <h2 className='text-3xl md:text-4xl font-bold'>
        OUR <span className='text-orange-500'>BLOGS</span>
      </h2>
      <div className='grid md:grid-cols-3 gap-6 mt-10'>
        {blogData.map((blog, index) => (
          <div key={index} className='bg-white rounded-lg shadow-md p-4 border'>
            <div className='relative w-full h-56 mb-4'>
              <Image
                src={blog.image}
                alt={blog.title}
                layout='fill'
                objectFit='cover'
                className='rounded-t-lg'
              />
            </div>
            <h3 className='font-bold text-lg text-left'>{blog.title}</h3>
            <p className='text-sm text-gray-600 text-left mt-2'>
              {blog.description}
            </p>
            <div className='text-left mt-4'>
              <a
                href='#'
                className='text-black font-bold flex items-center hover:underline'
              >
                Learn More <span className='ml-2'>→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Services = () => {
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
      <ExpertiseSection />

      <div className='relative flex flex-col px-14 md:px-24 lg:px-12 z-[2]'>
        <h3
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-black font-bold leading-none uppercase text-center mb-10 mt-10`}
        >
          WHY <span className='text-orange-500'>CHOOSE US</span>
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 w-full gap-14 mb-40'>
          {data?.map(({ descp, id, icon, title }) => (
            <ToolBox key={id} icons={icon} title={title} descp={descp} />
          ))}
        </div>
      </div>
      <BlogSection />
      <ExpertiseCarousel />
    </Layout>
  );
};

export default Services;
