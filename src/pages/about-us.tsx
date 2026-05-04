import {
  ArrowRight,
  CalendarCheck,
  Headset,
  MapPin,
  Medal,
  MoveLeft,
  MoveRight,
  Rocket,
  TrophyIcon,
} from 'lucide-react';
import Head from 'next/head';
import Image, { StaticImageData } from 'next/image';
import { useRef } from 'react';

import Layout from '../components/Layout/Layout';
import MeetFounders from '../components/MeetFounders';
import PageHero from '../components/PageHero';
import Timeline from '../components/Timeline';
import palette from '../styles/pallette';
import { AboutNextloopBackground } from '../../assets';
import aboutBg from '../../assets/about-us-hero.webp';
import cert1 from '../../assets/certificates/1.png';
import cert2 from '../../assets/certificates/2.png';
import cert3 from '../../assets/certificates/3.png';
import cert5 from '../../assets/certificates/5.png';
// export interface Service {

//   icon: string;
//   title: string;
//   description: string;
// }

export interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

const servicesData: Service[] = [
  {
    icon: CalendarCheck,
    title: 'Founded in 2020',
    description:
      'Nextloop Technologies delivers innovative IT solutions across industries.',
  },
  {
    icon: MapPin,
    title: 'Location',
    description: 'Headquartered in Indore, with an office in the UK.',
  },
  {
    icon: Medal,
    title: 'Certifications',
    description: 'Globally recognized standards achieved.',
  },
  {
    icon: Rocket,
    title: 'Projects Completed',
    description: 'Successfully delivered 30+ projects globally.',
  },
  {
    icon: Headset,
    title: 'Expertise',
    description:
      'Specializing in Cloud Solutions, Blockchain, Custom Software, and Digital Transformation.',
  },
  {
    icon: TrophyIcon,
    title: 'Recognition',
    description: 'Renowned for delivering award-winning IT solutions.',
  },
];

const arr = [
  {
    title: 'our mission',
    sub: "At Nextloop Technologies, our mission is simple yet profound - to be the catalyst for your success. We're passionate about partnering with businesses like yours to bridge the gap between idea and execution. Our team of skilled developers, designers, and strategists bring their expertise and dedication to every project, ensuring a seamless and collaborative experience. Every project is an opportunity to make a meaningful impact, to transform challenges into triumphs, and to forge partnerships built on trust and collaboration.",
  },
  {
    title: 'our vision',
    sub: 'Our vision is to be the trusted ally of businesses worldwide, guiding them through the complexities of the digital landscape with clarity, confidence, and compassion. We aspire to be at the forefront of technological innovation, driving positive change and shaping a future where possibilities are limitless.',
  },
];

const certificateCardArr = [
  {
    img: cert1,
    title: 'ISO 9001:2015 Certified',
    sub: 'We are ISO 9001:2015 certified, which means our processes meet global standards for delivering quality and customer satisfaction.',
  },
  {
    img: cert2,
    title: 'ISO 27001:2013 Certified',
    sub: 'We are ISO 27001:2013 certified, ensuring your data is protected with the highest level of information security management.',
  },
  {
    img: cert3,
    title: 'CMMI Level 3 Certified',
    sub: 'We are proudly CMMI Level 3 certified, which reflects our commitment to delivering consistent, reliable, and high-quality software development practices.',
  },
  {
    img: cert5,
    title: 'DesignRush Verified Agency 2024',
    sub: 'We are a DesignRush Verified Agency for 2024 — a mark of trust, creativity, and professional excellence in the digital service space.',
  },
];

interface CertificateCardProps {
  img: StaticImageData;
  title: string;
  sub: string;
}

const AboutUsHome = () => {
  return (
    <Layout>
      <Head>
        <title>
          Blockchain Development Company & IT Services | Custom Web3 Solutions
        </title>
        <meta
          name='description'
          content='Get to know our team at Nextloop. We are a contract-based it company in India that provides custom blockchain app & web development services for businesses across the globe'
        />
      </Head>
      <PageHero
        image={aboutBg}
        coloredTitle='About '
        title='Us'
        subtitle='At Nextloop Technologies, we partner with ambitious businesses to turn complex challenges into scalable, high-performance systems that drive measurable growth. Every solution we build is rooted in strategy, engineered with precision, and designed for long-term value. We specialize in crafting tailored IT solutions aligned with your unique business goals — from cloud architecture and optimization to AI-driven systems, intelligent automation, and custom software development. '
      />
      <WhyUs />
      <MeetFounders />
      <Journey />
      {/* <AboutUsInAboutUs /> */}
      <EndToEnd />
      <AboutNextLoop />
      <Certificates />
    </Layout>
  );
};

const WhyUs = () => (
  <div className=' flex flex-col justify-center items-center text-center gap-12 p-8 py-20'>
    <div className='grid lg:grid-cols-2  grid-cols-1 w-full sm:w-[60%] place-items-center gap-12 px-6'>
      {arr.map((t, i) => (
        <Card {...t} key={i} />
      ))}
    </div>
  </div>
);

const Journey = () => {
  return (
    <div className='min-h-auto text-center p-8'>
      <div className='mt-16'>
        <Timeline />
      </div>
    </div>
  );
};

const Certificates: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const nextCard = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const prevCard = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='aboutUsPageBackgroundImage flex flex-col gap-24 items-center justify-center text-white p-8 md:pt-20 pt-44'>
      <p
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold md:mt-20`}
      >
        COMMITMENT TO<span className='text-orange-500'> EXCELLENCE</span>
      </p>
      <div className='w-full'>
        {/* Desktop View */}
        <div className='hidden md:grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 w-full place-items-center gap-16 px-20 mb-10'>
          {certificateCardArr.map((c, i) => (
            <CertificateCard {...c} key={i} />
          ))}
        </div>

        {/* Mobile View */}
        <div className='md:hidden relative'>
          <div
            ref={scrollContainerRef}
            className='overflow-x-auto scrollbar-hide snap-x snap-mandatory'
            style={
              {
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              } as React.CSSProperties
            }
          >
            <div className='flex'>
              {certificateCardArr.map((c, i) => (
                <div key={i} className='flex-shrink-0 w-full px-4 snap-center'>
                  <CertificateCard {...c} />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevCard}
            className='absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full'
          >
            <MoveLeft className='object-cover text-orange-500' size={15} />
          </button>
          <button
            onClick={nextCard}
            className='absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full'
          >
            <MoveRight className='object-cover text-orange-500' size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

const CertificateCard: React.FC<CertificateCardProps> = ({
  img,
  sub,
  title,
}) => (
  <div className='bg-white flex flex-col gap-4 p-4 sm:p-4 text-black items-center md:w-[250px] sm:w-72 h-full text-center justify-between'>
    <div className='h-2/3'>
      <Image src={img} alt='certificate' height={200} width={200} />
    </div>
    <p
      className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} uppercase`}
    >
      {title}
    </p>
    <p
      className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop}`}
    >
      {sub}
    </p>
  </div>
);
const EndToEnd = () => {
  return (
    <div className='flex flex-col items-center justify-center p-8 md:mt-5 md:mx-20 py-28'>
      <h2
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold text-center mb-10 uppercase`}
      >
        Your end-to-end{' '}
        <span className='text-orange-500'> software development</span> partner
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
        {servicesData.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className='bg-white p-3 flex flex-col border items-left pl-8 border-gray-300'
            >
              <Icon size={40} strokeWidth={2.2} className='text-orange-500' />

              <h3 className='font-bold text-sm mt-4'>{service.title}</h3>
              <p className='text-left text-gray-600 mt-2 text-xs'>
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Card: React.FC<{ title: string; sub: string }> = ({ title, sub }) => {
  return (
    <div className='p-4 border-[2px] border-orange-400  h-[420px] sm:h-[320px] w-full relative'>
      <div className='w-full h-full absolute bottom-6 left-6'>
        <div
          style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
          className='bg-white rounded-[2px] flex flex-col gap-2 max-w-md py-10 px-4 h-[420px] sm:h-[320px]'
        >
          <div className='flex gap-2 items-center'>
            <div>
              <ArrowRight className='object-cover text-black ' size={25} />
            </div>
            <span
              className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} uppercase font-semibold`}
            >
              {title}
            </span>
          </div>
          <span className=' text-[14px] text-left'>{sub}</span>
        </div>
      </div>
    </div>
  );
};

const AboutNextLoop = () => (
  <div className='relative z-20 flex flex-col items-center justify-center bg-[#1F1F1F] py-20 md:mx-28 mx-3 mb-[-100px]'>
    <div className='absolute inset-0 z-0 overflow-hidden'>
      <Image
        src={AboutNextloopBackground}
        alt='About Nextloop Background'
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
    <div className='relative z-10 text-center text-white w-full max-w-4xl'>
      <h2
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold mb-4`}
      >
        ABOUT NEXTLOOP TECHNOLOGIES
      </h2>
      <p
        className={`${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop} mb-10`}
      >
        Together with our partnership and industry experience, we are creating a
        robust ecosystem to bring huge business transformations.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-12 w-full mx-auto'>
        <div className='text-center'>
          <h3 className='text-5xl font-bold text-orange-500'>5+</h3>
          <p>Years on the market</p>
        </div>
        <div className='text-center'>
          <h3 className='text-5xl font-bold text-orange-500'>80+</h3>
          <p>Senior-level developers</p>
        </div>
        <div className='text-center'>
          <h3 className='text-5xl font-bold text-orange-500'>30+</h3>
          <p>Successful projects</p>
        </div>
      </div>
    </div>
  </div>
);

export default AboutUsHome;
