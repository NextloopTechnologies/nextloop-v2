import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';

import {
  imageVariants,
  introHeaderVariants,
  textVariants,
} from '../../utils/frameMotionAnimations';
import useWindowSize from '../../utils/useWindowSize';
import { Whyus } from '../../../assets';

const WhoWeAre: FC = () => {
  const [textAnimationCompleted, setTextAnimationCompleted] = useState(false);
  const { isMobile } = useWindowSize();

  useEffect(() => {
    // Simulate the completion of text animation after a delay
    const textAnimationTimeout = setTimeout(() => {
      setTextAnimationCompleted(true);
    }, 1500); // Adjust the delay as needed

    // Clean up the timeout on component unmount
    return () => clearTimeout(textAnimationTimeout);
  }, []);

  return (
    <>
      <div className='flex lg:flex-row flex-col items-center min-h-screen overflow-hidden gap-8 lg:gap-0'>
        <motion.header
          initial={isMobile ? 'visible' : 'hide'}
          whileInView='show'
          exit='hide'
          variants={introHeaderVariants}
          className='flex lg:flex-row flex-col gap-x-10 lg:px-10 text-center lg:text-left'
        >
          <div className='flex flex-col gap-3 lg:px-20 px-4'>
            <motion.span
              initial={isMobile ? 'visible' : 'hide'}
              animate={textAnimationCompleted ? 'show' : 'hide'}
              className='lg:text-6xl text-3xl font-bold lg:w-5/6 w-full'
            >
              We are a group of goal focused{' '}
              <b className='text-orange-400'>developers</b> and{' '}
              <b className='text-orange-400'>designers</b> who believe that
              solutions make all the difference.
            </motion.span>
            <motion.span
              initial={isMobile ? 'visible' : 'hide'}
              animate={textAnimationCompleted ? 'show' : 'hide'}
              variants={textVariants}
              className='text-sm lg:w-5/6 w-full pt-8'
            >
              Nestled in the heart of India, NextLoop Technologies is more than
              just a company; we're a passionate team on a mission. With each
              project, we infuse our work with dedication and empathy,
              understanding that behind every line of code lies a dream, a
              vision, and a journey.
              <br />
              From startups taking their first steps to established enterprises
              reaching for new heights, we're here to be your partner in growth,
              innovation, and success. Together, let's turn aspirations into
              achievements and challenges into triumphs.
            </motion.span>
          </div>
        </motion.header>
        <motion.header
          initial={isMobile ? 'visible' : 'hide'}
          whileInView='show'
          exit='hide'
          variants={imageVariants}
          className='flex w-full h-full pb-36 '
        >
          <div className='lg:flex-shrink-0 w-full'>
            {textAnimationCompleted && (
              <motion.span
                initial={isMobile ? 'visible' : 'hide'}
                animate='show'
                variants={imageVariants}
                className='flex lg:items-end items-center justify-center h-full'
              >
                <Image src={Whyus} width={250} height={305} alt='image' />
              </motion.span>
            )}
          </div>
        </motion.header>
      </div>
    </>
  );
};

export default WhoWeAre;
