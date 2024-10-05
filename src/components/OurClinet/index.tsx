import React, { FC } from 'react';

import CLientCard from './CLientCard';
import {
  BlueBird,
  CB1,
  Client2,
  Levram1,
  OurCLient,
  ShowerWealth,
  SWAcademy,
} from '../../../assets';
interface ServiceCardProps {
  heading: string;
  image: string;
}

const OURVALUES_DATA: ServiceCardProps[] = [
  {
    heading: 'Persistence',
    image: OurCLient as unknown as string,
  },
  {
    heading: 'Customer Centric',
    image: BlueBird as unknown as string,
  },
  {
    heading: 'Agility',
    image: SWAcademy as unknown as string,
  },
  {
    heading: 'Ideas ',
    image: Client2 as unknown as string,
  },
  {
    heading: 'Impact',
    image: Levram1 as unknown as string,
  },
  {
    heading: 'Customer Centric',
    image: CB1 as unknown as string,
  },
  {
    heading: 'Agility',
    image: ShowerWealth as unknown as string,
  },
];

const OurCLients: FC = () => {
  return (
    <>
      <div className='bg-black flex justify-center items-center w-full sm:min-h-screen overflow-x-hidden flex-col'>
        <header className='flex gap-10 lg:w-4/6 lg:px-10 text-center'>
          <div className='w-full flex flex-col justify-center items-center gap-y-3 z-10 px-4'>
            <span className='text-white uppercase lg:text-5xl text-3xl font-bold text-center'>
              OUR <span className='text-orange-500'>Client's</span>
            </span>
            <span className='lg:px-20 text-sm lg:text-[16px] text-center'>
              Accelerating digital outcomes through rapid innovation and
              strategic execution.
            </span>
          </div>
        </header>
        <div className='grid grid-cols-2 sm:grid-cols-7 sm:grid-rows-1 gap-4 p-4 mt-10'>
          {OURVALUES_DATA?.map((data, ind: number) => {
            return (
              <CLientCard
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

export default OurCLients;
