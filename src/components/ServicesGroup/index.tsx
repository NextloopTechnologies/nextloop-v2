import Link from 'next/link';
import React, { FC } from 'react';

import OurServieceCard from '../OurServieceCard';
import palette from '../../styles/pallette';
import {
  Service1,
  Service2,
  Service3,
  Service4,
  Service5,
  Service6,
  Service7,
  // Service8,
  Service9,
  Service11,
  // Service12,
} from '../../../assets';

interface ServiceCardProps {
  heading: string;
  image: string;
  link: string;
}

const SERVICE_DATA: ServiceCardProps[] = [
  {
    heading: 'Custom Software Development',
    image: Service1 as unknown as string,
    link: '/services/custom-software-development',
  },
  {
    heading: 'IT Staff Augmentation',
    image: Service7 as unknown as string,
    link: '/services/staffing',
  },
  {
    heading: 'Website Development',
    image: Service2 as unknown as string,
    link: '/services/web-development',
  },
  {
    heading: 'MVP Development',
    image: Service3 as unknown as string,
    link: '/services/mvp-development',
  },
  {
    heading: 'Cloud & DevOps',
    image: Service4 as unknown as string,
    link: '/services/cloud-services',
  },
  {
    heading: 'Mobile App Development',
    image: Service5 as unknown as string,
    link: '/services/mobile-development',
  },
  {
    heading: 'UI/UX Design & Development ',
    image: Service6 as unknown as string,
    link: '/services/ui-ux-development',
  },
  // {
  //   heading: 'E-commerce Development',
  //   image: Service8 as unknown as string,
  //   link: '/services/e-commerce-development',
  // },
  {
    heading: 'AI & ML Solutions',
    image: Service9 as unknown as string,
    link: '/services/ai-ml',
  },
  {
    heading: 'Quality Assurance & Software Testing ',
    image: Service11 as unknown as string,
    link: '',
  },
  // {
  //   heading: 'Digital Marketing Services',
  //   image: Service12 as unknown as string,
  //   link: '/services/digital-marketing-services',
  // },
];

const Services: FC = () => {
  return (
    <div className='flex justify-center items-center w-full overflow-x-hidden flex-col pb-10'>
      {/* Header */}
      <header className='flex gap-10 lg:w-4/6 lg:px-10 text-center'>
        <div className='w-full flex flex-col justify-center items-center gap-y-3 z-10 px-4'>
          <h2
            className={`${palette.fontSize.heading2.mobile} md:text-4xl 2xl:text-4xl font-bold text-center `}
          >
            Build, Scale and Transform with{' '}
            <span className='text-orange-500'>Custom Software</span>
          </h2>
          <h3
            className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} text-center`}
          >
            Whether you're launching a new digital platform or deploying AI
            agents for business automation, our technical teams provide the
            secure, high-performance solutions you need to expand seamlessly.
          </h3>
        </div>
      </header>

      {/* Services Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-4 mt-10 place-items-center'>
        {SERVICE_DATA.map((data, index) => (
          <Link
            key={index}
            href={data.link}
            className='transition-transform hover:scale-105'
          >
            <OurServieceCard heading={data.heading} image={data.image} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
