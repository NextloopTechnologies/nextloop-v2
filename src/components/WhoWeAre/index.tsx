// import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';

import palette from '../../styles/pallette';
// import {
//   imageVariants,
//   introHeaderVariants,
//   textVariants,
// } from '../../utils/frameMotionAnimations';
// import useWindowSize from '../../utils/useWindowSize';
import { Whoweare } from '../../../assets';

const WhoWeAre: FC = () => {
  const [textAnimationCompleted, setTextAnimationCompleted] = useState(false);
  // const { isMobile } = useWindowSize();

  useEffect(() => {
    // Simulate the completion of text animation after a delay
    const textAnimationTimeout = setTimeout(() => {
      setTextAnimationCompleted(true);
    }, 1500);

    // Clean up the timeout on component unmount
    return () => clearTimeout(textAnimationTimeout);
  }, []);

  return (
    <>
      <div className='flex flex-col items-center md:flex-row overflow-hidden py-5 px-6 md:pb-5 pb-16'>
        <div
          // initial={isMobile ? 'visible' : 'hide'}
          // whileInView='show'
          // exit='hide'
          // variants={introHeaderVariants}
          className='flex justify-end text-center lg:text-left  sm:w-[50%]'
        >
          <div className='flex flex-col md:mx-20'>
            <b
              className={`${palette.fontSize.heading2.mobile}  md:text-4xl 2xl:text-4xl uppercase font-bold`}
            >
              who we <span className='text-orange-400'>are?</span>
            </b>
            {/* <span
              // initial={isMobile ? 'visible' : 'hide'}
              // animate={textAnimationCompleted ? 'show' : 'hide'}
              className='uppercase lg:text-4xl text-3xl font-bold w-full'
            >
              We are a group of goal focused{' '}
              <b className='text-orange-400'>developers</b> and{' '}
              <b className='text-orange-400'>designers</b> who believe that
              solutions make all the difference.
            </span> */}
            <span
              // initial={isMobile ? 'visible' : 'hide'}
              // animate={textAnimationCompleted ? 'show' : 'hide'}
              // variants={textVariants}
              className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}  tracking-wider w-full mt-10`}
            >
              <b>At Nextloop Technologies</b>, located in the vibrant heart of
              India, we are a passionate team of expert developers and
              innovative designers committed to delivering solutions that truly
              make a difference. We don’t just build software; we craft
              experiences, infusing every project with meticulous attention to
              detail and a deep understanding of your unique vision. Whether
              you’re a startup ready to disrupt the market or an established
              enterprise aiming for digital transformation, we stand by your
              side as your strategic partner in innovation and growth. Together,
              we will transform your bold aspirations into tangible achievements
              and turn challenges into remarkable successes!
            </span>
          </div>
        </div>
        <div
          // initial={isMobile ? 'visible' : 'hide'}
          // whileInView='show'
          // exit='hide'
          // variants={imageVariants}
          className='flex sm:w-[60%] h-full'
        >
          {textAnimationCompleted && (
            <div className='md:w-[90%] h-[350px] bg-blue-300 rounded-tl-[52px] overflow-hidden rounded-br-[52px]  mt-10 md:mr-10'>
              {/* <div
              // initial={isMobile ? 'visible' : 'hide'}
              // animate='show'
              // variants={imageVariants}
              // className='bg-blue-300 rounded-tl-[52px] rounded-br-[52px] flex lg:items-end items-center justify-center'
              > */}
              <Image
                src={Whoweare}
                className='w-full h-full object-cover'
                alt='image'
              />
              {/* </div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WhoWeAre;
