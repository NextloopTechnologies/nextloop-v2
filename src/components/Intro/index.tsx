// import { motion } from 'framer-motion';
import React, { FC } from 'react';

import palette from '../../styles/pallette';

// import ContactUs from '../ContactUs';
// import {
//   introHeaderVariants,
//   introRightHeaderVariants,
// } from '../../utils/frameMotionAnimations';
// import useWindowSize from '../../utils/useWindowSize';

const Intro: FC = () => {
  // const { isMobile } = useWindowSize();

  return (
    <div className='relative w-full flex justify-start items-center overflow-x-hidden px-4 '>
      <div className='md:px-10 md:mx-32 md:mt-56 px-16 mt-36'>
        <header
          // initial={isMobile ? 'visible' : 'hide'}
          // whileInView='show'
          // exit='hide'
          // variants={introHeaderVariants}
          // className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop}`}
          className='text-white text-left'
        >
          <div className='flex flex-col sm:flex-row justify-center md:items-center gap-4'>
            <div className='flex flex-col uppercase'>
              <p
                className={` ${palette.fontSize.descriptionSmall.mobile} md:${palette.fontSize.descriptionSmall.desktop} flex flex-col uppercase text-left`}
              >
                made
              </p>
              <h1
                className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} font-bold tracking-tighter`}
              >
                unlock
              </h1>
            </div>
            <div className='flex flex-col uppercase'>
              <div className='flex justify-between'>
                <p
                  className={`${palette.fontSize.descriptionSmall.mobile} md:${palette.fontSize.descriptionSmall.desktop}`}
                >
                  with
                </p>
                <p
                  className={`${palette.fontSize.descriptionSmall.mobile} md:${palette.fontSize.descriptionSmall.desktop}`}
                >
                  technologies
                </p>
              </div>
              <h1
                className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} font-bold tracking-tighter text-orange-500`}
              >
                innovative
              </h1>
            </div>
          </div>
          <h1
            className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} font-bold uppercase tracking-tighter mt-4 md:mx-20`}
          >
            solutions
          </h1>
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
