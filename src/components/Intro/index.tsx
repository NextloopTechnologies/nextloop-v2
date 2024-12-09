import React from 'react';

import palette from '../../styles/pallette';

const Intro = () => {
  return (
    <div className='relative w-full flex justify-start items-center overflow-x-hidden px-4'>
      <div className='px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 mx-4 sm:mx-8 md:mx-32 lg:mx-40 mt-36 md:mt-64 lg:mt-72'>
        <header className='text-white text-left'>
          <h1 className='font-bold uppercase tracking-tighter'>
            <div className='flex flex-col md:flex-row justify-center md:items-start gap-1'>
              <div className='flex flex-col uppercase'>
                <div className='flex justify-between md:justify-start md:flex-col'>
                  <p
                    className={`${palette.fontSize.descriptionSmall.mobile} md:${palette.fontSize.descriptionSmall.desktop} mr-1`}
                  >
                    made
                  </p>
                  <p
                    className={`${palette.fontSize.descriptionSmall.mobile} md:hidden mr-1`}
                  >
                    with
                  </p>
                  <p
                    className={`${palette.fontSize.descriptionSmall.mobile} md:hidden mr-1`}
                  >
                    technologies
                  </p>
                </div>
                <span
                  className={`${palette.fontSize.heading1.mobile} md:text-6xl font-bold tracking-tighter mt-2 md:mt-1 md:mr-4`}
                >
                  unlock
                </span>
              </div>
              <div className='flex flex-col uppercase'>
                <div className='hidden md:flex md:justify-between'>
                  <p className={`${palette.fontSize.descriptionSmall.desktop}`}>
                    with
                  </p>
                  <p
                    className={`${palette.fontSize.descriptionSmall.desktop} ml-2`}
                  >
                    technologies
                  </p>
                </div>
                <span
                  className={`${palette.fontSize.heading1.mobile} md:text-6xl font-bold tracking-tighter text-orange-500`}
                >
                  innovative
                </span>
              </div>
            </div>
            <span
              className={`${palette.fontSize.heading1.mobile} md:text-6xl font-bold uppercase tracking-tighter mt-1 md:mx-20`}
            >
              solutions
            </span>
          </h1>
        </header>

        <div className='mt-8 sm:mt-12'>
          {/* Content for the div below the header */}
        </div>
      </div>
    </div>
  );
};

export default Intro;
