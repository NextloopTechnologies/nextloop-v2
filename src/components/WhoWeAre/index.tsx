import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';

import {
  imageVariants,
  introHeaderVariants,
  textVariants,
} from '../../utils/frameMotionAnimations';
import { Whyus } from '../../../assets';

const WhoWeAre: FC = () => {
  const [textAnimationCompleted, setTextAnimationCompleted] = useState(false);

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
      <div className='flex items-center h-screen overflow-hidden'>
        <motion.header
          initial='hide'
          whileInView='show'
          exit='hide'
          variants={introHeaderVariants}
          className='flex gap-x-10 px-10'
        >
          <div className='flex flex-col gap-y-3 px-20'>
            <span>#who we are</span>
            <motion.span
              initial='hide'
              animate={textAnimationCompleted ? 'show' : 'hide'}
              className='text-6xl font-bold w-5/6'
            >
              We are a group of goal focused{' '}
              <b className='text-orange-400'>developers</b> and{' '}
              <b className='text-orange-400'>designers</b> who believe that
              solutions make all the difference.
            </motion.span>
            <motion.span
              initial='hide'
              animate={textAnimationCompleted ? 'show' : 'hide'}
              variants={textVariants}
              className='text-sm w-5/6 pt-8'
            >
              If you are looking for a complete business solution at one place
              in combination with distinctive designs, that is what you can
              expect from us. To stimulate the growth of your company, we focus
              on various services, although we do not limit ourselves to this.
              We keep learning and stay ourselves up to date with current market
              trends.
            </motion.span>
          </div>
        </motion.header>
        <motion.header
          initial='hide'
          whileInView='show'
          exit='hide'
          variants={imageVariants}
          className='flex w-full h-full pb-36 '
        >
          <div className='flex-shrink-0 '>
            {textAnimationCompleted && (
              <motion.span
                initial='hide'
                animate='show'
                variants={imageVariants}
                className='flex items-end h-full'
              >
                <Image src={Whyus} width={250} height={305} alt="image" />
              </motion.span>
            )}
          </div>
        </motion.header>
      </div>
    </>
  );
};

export default WhoWeAre;
