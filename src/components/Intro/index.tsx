import { motion } from 'framer-motion';
import React, { FC } from 'react';

import ContactUs from '../ContactUs';
import {
  introHeaderVariants,
  introRightHeaderVariants,
} from '../../utils/frameMotionAnimations';

const Intro: FC = () => {
  return (
    <>
      <div className=' flex justify-center items-center h-screen overflow-x-hidden'>
        <div className='  inset-0 z-50 flex items-center justify-center text-white '>
          <div className='flex flex-col items-center justify-center pt-20'>
            <motion.header
              initial='hide'
              whileInView='show'
              exit='hide'
              variants={introHeaderVariants}
            >
              <div>
                <div className='flex gap-x-6'>
                  <div className='relative'>
                    <span className='text-xs absolute top-4 left-0 '>MADE</span>
                    <span className='text-xs absolute top-4 right-[-2px] '>
                      WITH
                    </span>

                    <div className='text-[100px] px-2 py-0 font-bold'>
                      UNLOCK
                    </div>
                  </div>
                  <div className='relative'>
                    <span className='text-xs absolute top-4 right-8'>
                      TECHNOLOGIES
                    </span>
                    <div className='text-[100px] px-2 py-0 font-bold text-orange-400'>
                      Innovative
                    </div>
                  </div>
                </div>
                <div className='relative text-center'>
                  <div className='text-[100px] px-2 absolute top-[-50px] w-full font-bold text-center'>
                    <span>Solutions</span>
                  </div>
                </div>
              </div>
            </motion.header>
            <motion.header
              initial='hide'
              whileInView='show'
              exit='hide'
              variants={introRightHeaderVariants}
            >
              <div className='flex justify-end pr-36 pt-28'>
                <div className='text-xs w-1/3 '>
                  If you are looking for a complete business solution at a one
                  place in combination with distinctive designs, that is what
                  you can expect from us. To stimulate the growth of your
                  company, we focus on various services, although we do not
                  limit ourselves to this. We keep learning and stay ourselves
                  up to date with current market trends.
                </div>
              </div>
              <div className='pl-20'>
                <ContactUs />
              </div>
            </motion.header>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
