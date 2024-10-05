import React, { FC } from 'react';

import OurValuesCard from './OurValuesCard';
import { OurValues1, Values1, Values2, Values3 } from '../../../assets';

interface ServiceCardProps {
  heading: string;
  image: string;
  desc: string;
}

const OURVALUES_DATA: ServiceCardProps[] = [
  {
    heading: 'Persistence',
    image: OurValues1 as unknown as string,
    desc: " It symbolizes our commitment to continuous improvement, adapting to evolving technologies, and pushing boundaries to meet our clients' needs.",
  },
  {
    heading: 'Customer Centric',
    image: Values1 as unknown as string,
    desc: "customer centric Our success is driven by our clients' success, and we strive to exceed expectations through services and solutions that enhance their experience and drive growth.",
  },
  {
    heading: 'Agility',
    image: Values2 as unknown as string,
    desc: 'agility At Nextloop Technologies, Agility  is our ability to swiftly adapt to changing technologies and client needs, delivering innovative solutions to keep our clients ahead in a dynamic digital landscape.',
  },
  {
    heading: 'Ideas ',
    image: Values3 as unknown as string,
    desc: ' "Ideas" fuel our innovation, driving creative solutions and impactful results that keep our clients ahead in the digital world.',
  },
  {
    heading: 'Impact',
    image: Values3 as unknown as string,
    desc: '"Impact" reflects our commitment to delivering solutions that drive measurable, long-term success, contributing to our clients growth and efficiency in the digital landscape.',
  },
];

const OurValues: FC = () => {
  return (
    <>
      <div className='flex justify-center items-center w-full sm:min-h-screen overflow-x-hidden flex-col'>
        <header className='flex gap-10 lg:w-4/6 lg:px-10 text-center'>
          <div className='w-full flex flex-col justify-center items-center gap-y-3 z-10 px-4'>
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
                desc={data?.desc}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OurValues;
