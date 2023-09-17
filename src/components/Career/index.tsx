import { motion } from 'framer-motion';
import React, { FC } from 'react';

import ContactUs from '../ContactUs';
import {
  introHeaderVariants,
  textVariants,
} from '../../utils/frameMotionAnimations';

const Career: FC = () => {
  const badge = [
    {
      number: '14+',
      desc: 'Years of working experience',
    },
    {
      number: '150',
      desc: 'Projects done all over the world',
    },
    {
      number: '1K+',
      desc: 'Connections associated with us',
    },
    {
      number: '20',
      desc: 'Clients from all over the world',
    },
  ];

  return (
    <>
      <div className='flex justify-center items-center h-screen overflow-x-hidden'>
        <motion.header
          initial='hide'
          whileInView='show'
          exit='hide'
          variants={introHeaderVariants}
          className='flex gap-x-10 w-5/6   text-white'
        >
          <div className='flex flex-col gap-y-3 '>
            <span>#SUCCESS NUMBERS</span>
            <motion.span
              initial='hide'
              animate='show'
              variants={textVariants} // Apply animation variants to this text element
              className='flex w-full'
            >
              <span className='text-6xl font-bold'>
                A Closer Look at Our Company's{' '}
                <b className='text-orange-400'>Success.</b>
              </span>
              <span className='flex justify-center items-center w-full '>
                <ContactUs />
              </span>
            </motion.span>
            <motion.span
              initial='hide'
              animate='show'
              variants={textVariants}
              className='text-2xl pt-8 flex items-center'
            >
              <div className='w-1/2'>
                Explore the remarkable milestones, groundbreaking innovations,
                and{' '}
                <b className='text-orange-400 font-normal'>
                  {' '}
                  unwavering dedication
                </b>{' '}
                that have propelled us to our current position as a leading
                force in technology solutions.
              </div>
            </motion.span>
            <motion.span
              initial='hide'
              animate='show'
              variants={textVariants}
              className='flex text-white justify-between w-5/6 mt-6'
            >
              {badge.map((item) => {
                return (
                  <div className='flex flex-col gap-y-3' key={item.number}>
                    <span className='text-5xl w-min flex justify-center rounded-full items-center border px-6 py-3.5 '>
                      {item.number}
                    </span>
                    <span className='text-xs font-medium text-center'>
                      {item.desc}
                    </span>
                    <span className=' border-b mt-2 border-gray-200' />
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
