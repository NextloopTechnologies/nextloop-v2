import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { FC } from 'react';

import { introHeaderVariants } from '../../utils/frameMotionAnimations';
import useWindowSize from '../../utils/useWindowSize';
import { Mobile_1, Mobile_2 } from '../../../assets';

const Portfolio: FC = () => {
  const { isMobile } = useWindowSize();
  return (
    <>
      <div className='flex justify-center items-center min-h-screen'>
        <motion.header
          initial={isMobile ? 'visible' : 'hide'}
          whileInView='show'
          exit='hide'
          variants={introHeaderVariants}
          className='flex gap-x-10 w-5/6'
          // Enable drag interactions
          // Adjust constraints as needed
        >
          <div className='flex flex-col gap-y-1 w-full'>
            <span className='whitespace-nowrap w-full'>#Portfolio</span>
            <motion.span
              initial={isMobile ? 'visible' : 'hide'}
              whileInView='show'
              exit='hide'
              drag='x'
              dragConstraints={{ left: -1000, right: 0 }}
              className=''
            >
              <div className='flex gap-4 flex-col lg:flex-row '>
                {Array(10)
                  .fill(null)
                  .map((_, index) => (
                    <span key={index} className='relative'>
                      <span className='bg-gray-200 pt-10 lg:w-[650px] rounded-md flex items-center justify-center'>
                        <Image
                          src={index % 2 !== 0 ? Mobile_1 : Mobile_2}
                          alt='Mobile'
                          width={300}
                          height={100}
                        />
                      </span>
                      <span className='bg-white bottom-0 w-5/6 h-28 absolute px-4 pt-4'>
                        <p className='text-2xl font-medium'>Sarthi bus app</p>
                        <p>
                          A mobile app that offers state-wide local bus
                          transportation.
                        </p>
                      </span>
                    </span>
                  ))}
              </div>
            </motion.span>
          </div>
        </motion.header>
      </div>
    </>
  );
};

export default Portfolio;
