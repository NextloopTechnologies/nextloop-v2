import React, { FC } from 'react';

import OurServieceCard from '../OurServieceCard';
import {
  Service1,
  Service2,
  Service3,
  Service4,
  Service5,
  Service6,
  Service7,
  Service8,
  Service9,
  Service10,
  Service11,
  Service12,
} from '../../../assets';

interface ServiceCardProps {
  heading: string;
  image: string;
}

const SERVICE_DATA: ServiceCardProps[] = [
  {
    heading: 'Custom Software Development',
    image: Service1 as unknown as string,
  },
  {
    heading: 'Web Development',
    image: Service2 as unknown as string,
  },
  {
    heading: 'MVP Development',
    image: Service3 as unknown as string,
  },
  {
    heading: 'Cloud Services (DevOps, AWS, GCP, Azure)',
    image: Service4 as unknown as string,
  },
  {
    heading: 'Mobile Development',
    image: Service5 as unknown as string,
  },
  {
    heading: 'UI/UX Development',
    image: Service6 as unknown as string,
  },
  {
    heading: 'Hire Dedicated Team',
    image: Service7 as unknown as string,
  },
  {
    heading: 'E-commerce Development',
    image: Service8 as unknown as string,
  },
  {
    heading: 'AI/ML',
    image: Service9 as unknown as string,
  },
  {
    heading: 'Data Storage and Management',
    image: Service10 as unknown as string,
  },
  {
    heading: 'Technical Support',
    image: Service11 as unknown as string,
  },
  {
    heading: 'Technology Training',
    image: Service12 as unknown as string,
  },
];

const Services: FC = () => {
  return (
    <>
      <div className='flex justify-center items-center w-full sm:min-h-screen overflow-x-hidden flex-col'>
        <header className='flex gap-10 lg:w-4/6 lg:px-10 text-center'>
          <div className='flex flex-col gap-y-3 z-10 px-4'>
            <span className='uppercase lg:text-5xl text-3xl font-bold text-center'>
              OUR <span className='text-orange-500'>Services</span>
            </span>
            <span className='lg:px-20 text-sm lg:text-[16px] text-center'>
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
