import { motion } from 'framer-motion';
import React, { FC } from 'react';

import ContactUs from '../ContactUs';
import {
  introHeaderVariants,
  textVariants,
} from '../../utils/frameMotionAnimations';
import useWindowSize from '../../utils/useWindowSize';

const Career: FC = () => {
  const badge = [
    {
      number: '4+',
      desc: 'Years of working experience',
    },
    {
      number: '100',
      desc: 'Projects done all over the world',
    },
    {
      number: '2K+',
      desc: 'Connections associated with us',
    },
    {
      number: '25',
      desc: 'Clients from all over the world',
    },
  ];

  const { isMobile } = useWindowSize();

  return (
    <>
      <div className='flex flex-col justify-center items-center mt-10 sm:min-h-screen overflow-x-hidden lg:text-left text-center'>
        <motion.header
          initial={isMobile ? 'visible' : 'hide'}
          whileInView='show'
          exit='hide'
          variants={introHeaderVariants}
          className='flex flex-col gap-y-10 lg:w-5/6 w-full'
        >
          <div className='flex flex-col gap-y-3 mt-10'>
            <span className='text-lg text-white sm:text-xl'>
              SUCCESS NUMBERS
            </span>
            <motion.span
              initial={isMobile ? 'visible' : 'hide'}
              animate='show'
              variants={textVariants}
              className='flex flex-col lg:flex-row w-full'
            >
              <span className='uppercase lg:text-4xl text-3xl font-bold text-white text-center lg:text-left'>
                A Closer Look at Our Company's{' '}
                <b className='text-orange-500'>Success.</b>
              </span>
              <span className='justify-center items-center w-full hidden lg:flex'>
                <ContactUs />
              </span>
            </motion.span>
            <motion.span
              initial={isMobile ? 'visible' : 'hide'}
              animate='show'
              variants={textVariants}
              className='text-xl pt-2 flex items-center text-center lg:text-left text-white'
            >
              <div className='lg:w-1/2'>
                Explore the remarkable milestones, groundbreaking innovations,
                and{' '}
                <b className='text-orange-500 font-normal'>
                  {' '}
                  unwavering dedication
                </b>{' '}
                that have propelled us to our current position as a leading
                force in technology solutions.
              </div>
            </motion.span>
            <motion.span
              initial={isMobile ? 'visible' : 'hide'}
              animate='show'
              variants={textVariants}
              className='flex text-white justify-between lg:w-5/6 mt-6 flex-wrap gap-8'
            >
              {badge.map((item) => {
                return (
                  <div
                    className='flex flex-col gap-3 w-full lg:w-auto items-center lg:items-start'
                    key={item.number}
                  >
                    <span className='text-5xl w-min flex justify-center rounded-full items-center border px-6 py-3.5 text-white'>
                      {item.number}
                    </span>
                    <span className='text-xs font-medium text-center text-white'>
                      {item.desc}
                    </span>
                    <span className='border-b mt-2 border-gray-200' />
                  </div>
                );
              })}
            </motion.span>
          </div>
        </motion.header>
      </div>
    </>
  );
};

export default Career;
