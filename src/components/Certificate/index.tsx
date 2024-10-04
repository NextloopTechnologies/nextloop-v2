import React, { FC } from 'react';
import {
  Certificate1,
  Certificate2,
  Certificate3,
  Certificate4,
} from '../../../assets';
import CertificateCard from './CertificateCards';
interface ServiceCardProps {
  heading: string;
  image: string;
}

const OURVALUES_DATA: ServiceCardProps[] = [
  {
    heading: 'Persistence',
    image: Certificate1 as unknown as string,
  },
  {
    heading: 'Customer Centric',
    image: Certificate2 as unknown as string,
  },
  {
    heading: 'Agility',
    image: Certificate3 as unknown as string,
  },
  {
    heading: 'Ideas ',
    image: Certificate4 as unknown as string,
  },
];

const Certificate: FC = () => {
  return (
    <>
      <div className='py-2 bg-orange-500 flex justify-center items-center w-full sm:min-h-screen overflow-x-hidden flex-col'>
        <header className='flex gap-10 lg:w-4/6 lg:px-10 text-center w-full '>
          <div className='flex flex-col gap-y-3 z-10 px-4 mx-auto'>
            <div className='text-white uppercase lg:text-5xl text-3xl font-bold text-center'>
              <span className='text-white'>Certificates</span>
            </div>
           
          </div>
        </header>
        <div className='grid grid-cols-2 sm:grid-cols-4 sm:grid-rows-1 gap-4 p-4 mt-10'>
          {OURVALUES_DATA?.map((data, ind: number) => {
            return (
              <CertificateCard
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

export default Certificate;
