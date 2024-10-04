// import { motion } from 'framer-motion';
import React, { FC } from 'react';

// import ContactUs from '../ContactUs';
// import {
//   introHeaderVariants,
//   introRightHeaderVariants,
// } from '../../utils/frameMotionAnimations';
// import useWindowSize from '../../utils/useWindowSize';

const Intro: FC = () => {
  // const { isMobile } = useWindowSize();

  return (
    <div className='relative w-full min-h-screen flex justify-start items-center overflow-x-hidden px-4 sm:px-6 lg:px-8'>
      <div className='w-[50%] max-w-3xl mx-auto '>
        <header
          // initial={isMobile ? 'visible' : 'hide'}
          // whileInView='show'
          // exit='hide'
          // variants={introHeaderVariants}
          className='text-white text-left w-[40%]'
        >
          <div className='flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8'>
            <div className='flex flex-col uppercase'>
              <p className='flex flex-col uppercase text-left text-xs'>made</p>
              <p className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl font-bold tracking-tighter'>
                unlock
              </p>
            </div>
            <div className='flex flex-col uppercase'>
              <div className='flex justify-between'>
                <p className='text-xs'>with</p>
                <p className='text-xs'>technologies</p>
              </div>
              <p className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl font-bold tracking-tighter text-orange-500'>
                innovative
              </p>
            </div>
          </div>
          <p className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl font-bold uppercase tracking-tighter mt-4'>
            solutions
          </p>
        </header>

        <div
          // initial={isMobile ? 'visible' : 'hide'}
          // whileInView='show'
          // exit='hide'
          // variants={introRightHeaderVariants}
          className='mt-8 sm:mt-12'
        >
          {/* <p className='text-sm sm:text-base lg:text-lg text-white text-center max-w-3xl mx-auto'>
            If you are looking for a complete business solution at a one place
            in combination with distinctive designs, that is what you can expect
            from us. To stimulate the growth of your company, we focus on
            various services, although we do not limit ourselves to this. We
            keep learning and stay ourselves up to date with current market
            trends.
          </p> */}
        </div>
      </div>

      {/* <div className='mt-12 sm:absolute sm:left-8 sm:bottom-8'>
        <ContactUs />
      </div> */}
    </div>
  );
};

export default Intro;
