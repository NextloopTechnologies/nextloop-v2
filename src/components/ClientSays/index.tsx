import React, { FC } from 'react';

import ClientSaysCard from './ClientSayCard';

const ClientSays: FC = () => {
  return (
    <>
      <div className='py-2 bg-black flex justify-center items-center w-full sm:min-h-screen overflow-x-hidden flex-col'>
        <header className='flex gap-10 lg:w-4/6 lg:px-10 text-center'>
          <div className='w-full flex flex-col justify-center items-center gap-y-3 z-10 px-4'>
            <span className='text-white uppercase lg:text-5xl text-3xl font-bold text-center'>
              Whats OUR <span className='text-orange-500'>Client</span> Says
            </span>
            <span className='lg:px-20 text-sm lg:text-[16px] text-center'>
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
