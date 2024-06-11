import { motion } from 'framer-motion';
import React, { FC } from 'react';

import ContactUs from '../ContactUs';
import {
  introHeaderVariants,
  introRightHeaderVariants,
} from '../../utils/frameMotionAnimations';
import useWindowSize from '../../utils/useWindowSize';

const Intro: FC = () => {
  const { isMobile } = useWindowSize();
  return (
    <>
      <div className='flex justify-center items-center h-screen overflow-x-hidden relative'>
        <div className='inset-0 z-50 flex items-center justify-center text-white '>
          <div className='flex flex-col items-center justify-center pt-20'>
            <motion.header
              initial={isMobile ? 'visible' : 'hide'}
              whileInView='show'
              exit='hide'
              variants={introHeaderVariants}
            >
              <div className='text-white flex-col items-center'>
                <div className='flex gap-x-8'>
                  <div className='flex flex-col uppercase'>
                    <p className='text-xs'>made</p>
                    <p className='xl:text-9xl lg:text-5xl md:text-6xl text-6xl font-bold'>
                      unlock
                    </p>
                  </div>
                  <div className='flex flex-col uppercase'>
                    <div className='flex justify-between'>
                      <p className='text-xs'>with</p>
                      <p className='text-xs'>technologies</p>
                    </div>
                    <p className='xl:text-9xl lg:text-5xl md:text-6xl text-3xl font-bold text-orange-500'>
                      innovative
                    </p>
                  </div>
                </div>
                <p className='xl:text-9xl lg:text-5xl md:text-6xl text-3xl font-bold uppercase text-center'>
                  solutions
                </p>
              </div>
            </motion.header>
            <motion.header
              initial={isMobile ? 'visible' : 'hide'}
              whileInView='show'
              exit='hide'
              variants={introRightHeaderVariants}
            >
              <div className='flex justify-center pt-8 px-4 text-center'>
                <div className='text-sm lg:w-2/5 md:w-2/3 w-full'>
                  If you are looking for a complete business solution at a one
                  place in combination with distinctive designs, that is what
                  you can expect from us. To stimulate the growth of your
                  company, we focus on various services, although we do not
                  limit ourselves to this. We keep learning and stay ourselves
                  up to date with current market trends.
                </div>
              </div>
            </motion.header>
          </div>
        </div>
      </div>
      <div className='absolute left-8 bottom-8'>
        <ContactUs />
      </div>
    </>
  );
};

export default Intro;
