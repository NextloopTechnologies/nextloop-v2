import React, { FC } from 'react';

import CertificateCard from './CertificateCards';
import palette from '../../styles/pallette';
import {
  Certificate1,
  Certificate2,
  Certificate3,
  Certificate5,
} from '../../../assets';
interface ServiceCardProps {
  image: string;
}

const OURVALUES_DATA: ServiceCardProps[] = [
  {
    image: Certificate1 as unknown as string,
  },
  {
    image: Certificate2 as unknown as string,
  },
  {
    image: Certificate3 as unknown as string,
  },
  {
    image: Certificate5 as unknown as string,
  },
];

const Certificate: FC = () => {
  return (
    <>
      <div className='  flex justify-center items-center w-full overflow-x-hidden flex-col py-20'>
        <header className='flex gap-10 lg:w-4/6 lg:px-10 text-center w-full '>
          <div className=' w-full flex flex-col justify-center items-center gap-y-3 z-10 px-4'>
            <div
              className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-white uppercase font-bold text-center`}
            >
              <span className='text-white'>Certificates</span>
            </div>
          </div>
        </header>
        <div className='grid grid-cols-2 sm:grid-cols-4 sm:grid-rows-1 gap-y-10 gap-x-10 sm:gap-x-12 p-4 mt-10'>
          {OURVALUES_DATA?.map((data, ind) => {
            return <CertificateCard key={ind} image={data?.image} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Certificate;
