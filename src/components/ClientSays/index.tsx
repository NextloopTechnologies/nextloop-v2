import React, { FC } from 'react';

import ClientSaysCard from './ClientSayCard';
import palette from '../../styles/pallette';

const ClientSays: FC = () => {
  return (
    <>
      <div className=' bg-black flex justify-center items-center w-full h-[80vh] overflow-x-hidden flex-col md:pt-5'>
        <header className='flex md:gap-10 lg:w-4/6 lg:px-10 text-center'>
          <div className='w-full flex flex-col justify-center items-center z-10 px-4'>
            <span
              className={`${palette.fontSize.heading2.mobile} md:text-4xl 2xl:text-4xl text-white uppercase  font-bold text-center mt-10 md:mt-0`}
            >
              Whats OUR <span className='text-orange-500'>Client</span> Say
            </span>
            <span
              className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} text-white lg:px-20 text-center mt-5`}
            >
              Accelerating digital outcomes through rapid innovation and
              strategic execution.
            </span>
          </div>
        </header>

        <div>
          <ClientSaysCard />
        </div>
      </div>
    </>
  );
};

export default ClientSays;
