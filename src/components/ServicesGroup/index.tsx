import React, { FC } from 'react';

import OurServieceCard from '../OurServieceCard';
import palette from '../../styles/pallette';
import {
  staticAssests
} from '../../../assets';

interface ServiceCardProps {
  heading: string;
  image: string;
}

const SERVICE_DATA: ServiceCardProps[] = [
  {
    heading: 'Custom Software Development',
    image: staticAssests.services.s1 as unknown as string,
  },
  {
    heading: 'Web Development',
    image: staticAssests.services.s2 as unknown as string,
  },
  {
    heading: 'MVP Development',
    image: staticAssests.services.s3 as unknown as string,
  },
  {
    heading: 'Cloud Services (DevOps, AWS, GCP, Azure)',
    image: staticAssests.services.s4 as unknown as string,
  },
  {
    heading: 'Mobile Development',
    image: staticAssests.services.s5 as unknown as string,
  },
  {
    heading: 'UI/UX Development',
    image: staticAssests.services.s6 as unknown as string,
  },
  {
    heading: 'Hire Dedicated Team',
    image: staticAssests.services.s7 as unknown as string,
  },
  {
    heading: 'E-commerce Development',
    image: staticAssests.services.s8 as unknown as string,
  },
  {
    heading: 'AI/ML',
    image: staticAssests.services.s9 as unknown as string,
  },
  {
    heading: 'Data Storage and Management',
    image: staticAssests.services.s10 as unknown as string,
  },
  {
    heading: 'Technical Support',
    image: staticAssests.services.s11 as unknown as string,
  },
  {
    heading: 'Technology Training',
    image: staticAssests.services.s12 as unknown as string,
  },
];

const Services: FC = () => {
  return (
    <>
      <div className='flex justify-center items-center w-full overflow-x-hidden flex-col pb-10'>
        <header className='flex gap-10 lg:w-4/6  lg:px-10 text-center'>
          <div className='w-full flex flex-col justify-center items-center gap-y-3 z-10 px-4'>
            <span
              className={`${palette.fontSize.heading2.mobile} md:text-4xl 2xl:text-4xl font-bold text-center uppercase`}
            >
              OUR <span className='text-orange-500'>Services</span>
            </span>
            <span
              className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}  text-center`}
            >
              Accelerating digital outcomes through rapid innovation and
              strategic execution.
            </span>
          </div>
        </header>
        <div className='grid grid-cols-2 sm:grid-cols-6 sm:grid-rows-2 gap-4 p-4 mt-10'>
          {SERVICE_DATA?.map((data, ind) => {
            return (
              <OurServieceCard
                key={ind}
                heading={data?.heading}
                image={data?.image}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Services;
