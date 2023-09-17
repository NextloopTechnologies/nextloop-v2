import { motion } from 'framer-motion';
import React, { FC } from 'react';

import {
  introHeaderVariants,
  textVariants,
} from '../../utils/frameMotionAnimations';

const AboutUs: FC = () => {
  return (
    <>
      <div className='flex justify-center items-center h-screen overflow-x-hidden'>
        <motion.header
          initial='hide'
          whileInView='show'
          exit='hide'
          variants={introHeaderVariants}
          className='flex gap-x-10 w-5/6'
        >
          <div className='flex flex-col gap-y-1 '>
            <span>#ABOUT US</span>
            <motion.span
              initial='hide'
              animate='show'
              variants={textVariants} // Apply animation variants to this text element
              className='text-6xl font-bold w-2/3'
            >
              We are a group of goal{' '}
              <b className='text-orange-400'>developers.</b>
            </motion.span>
            <motion.span
              initial='hide'
              animate='show'
              variants={textVariants}
              className='text-2xl pt-8 flex items-center'
            >
              <div className='w-5/6' />
              <div>
                <div className=' w-2/3'>
                  {/* <span className=''> */}
                  Tech enthusiasts, who create{' '}
                  <b className='text-orange-400 font-normal'>
                    {' '}
                    great solutions.
                  </b>{' '}
                  We pride ourselves in delivering exceptional services and
                  experiences with a fast, highly{' '}
                  <b className='text-orange-400 font-normal'>
                    disciplined team.
                  </b>{' '}
                  We wish to help our clients with continuous innovation and
                  progress by building strong and lasting{' '}
                  <b className='text-orange-400 font-normal'>partnerships.</b>
                </div>

                <div className='text-sm mt-8 flex flex-col gap-y-4'>
                  <p>
                    Founded in 2020 with a vision of driving the loop towards
                    new age technologies. Next loop has evolved into a thriving
                    enterprise where unique minds shape innovative experiences
                    for millions of users.{' '}
                  </p>
                  <p>
                    Born in the heart of the India Indore area, our outreach is
                    global. We are a strong team of researchers, developers and
                    experts of the digital world. Through a progressive and
                    disciplined method our team creates digital transformation
                    solutions with lasting impact. Partner with us to be in an
                    endless loop of innovation and tech.
                  </p>
                </div>
              </div>
            </motion.span>
          </div>
        </motion.header>
      </div>
    </>
  );
};

export default AboutUs;
