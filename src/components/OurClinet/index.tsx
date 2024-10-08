import React, { FC } from 'react';
import CLientCard from './CLientCard';
import palette from '../../styles/pallette';
import {
  BlueBird,
  CB1,
  Client2,
  Levram1,
  Millennialz,
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
  {
    heading: 'Agility',
    image: Millennialz as unknown as string,
  },
];

const OurCLients: FC = () => {
  return (
    <>
      <div className='bg-[#1D1D1D] flex justify-center items-center w-full  overflow-x-hidden flex-col md:py-10 md:pb-20 py-10'>
        <header className='flex gap-10 lg:w-4/6 lg:px-10 text-center'>
          <div className='pt-2 w-full flex flex-col justify-center items-center gap-y-3 z-10 px-4'>
            <div
              className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-white uppercase font-bold text-center`}
            >
              OUR <span className='text-orange-500'>Clients</span>
            </div>
            <span
              className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} text-white text-center`}
            >
              Accelerating digital outcomes through rapid innovation and
              strategic execution.
            </span>
          </div>
        </header>
        <div className='grid justify-center items-center grid-cols-2 sm:grid-cols-8 sm:grid-rows-1 gap-4 p-4 mt-10'>
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
