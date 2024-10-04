import React, { FC } from 'react';

import OurValuesCard from './OurValuesCard';
import {
  OurValues1,
  Values1,
  Values2,
  Values3,
} from '../../../assets';

interface ServiceCardProps {
  heading: string;
  image: string;
}

const OURVALUES_DATA: ServiceCardProps[] = [
  {
    heading: 'Persistence',
    image: OurValues1 as unknown as string,
  },
  {
    heading: 'Customer Centric',
    image: Values1 as unknown as string,
  },
  {
    heading: 'Agility',
    image: Values2 as unknown as string,
  },
  {
    heading: 'Ideas ',
    image: Values3 as unknown as string,
  },
  {
    heading: 'Impact',
    image: Values3 as unknown as string,
  },
];

const OurValues: FC = () => {
  return (
    <>
      <div className='py-2 flex justify-center items-center w-full sm:min-h-screen overflow-x-hidden flex-col'>
        <header className='flex gap-10 lg:w-4/6 lg:px-10 text-center'>
          <div className='flex flex-col gap-y-3 z-10 px-4'>
            <span className='uppercase lg:text-5xl text-3xl font-bold text-center'>
              OUR <span className='text-orange-500'>Values</span>
            </span>
            <span className='lg:px-20 text-sm lg:text-[16px] text-center'>
              Accelerating digital outcomes through rapid innovation and
              strategic execution.
            </span>
          </div>
        </header>
        <div className='grid grid-cols-2 sm:grid-cols-5 sm:grid-rows-1 gap-4 p-4 mt-10'>
          {OURVALUES_DATA?.map((data, ind) => {
            return (
              <OurValuesCard
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

export default OurValues;
