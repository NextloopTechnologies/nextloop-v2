import { motion } from 'framer-motion';
import React, { FC } from 'react';

import ContactUs from '../ContactUs';
import {
  introHeaderVariants,
  textVariants,
} from '../../utils/frameMotionAnimations';

const Experience: FC = () => {
  const content = [
    {
      heading: 'Technical Support',
      desc: 'We help businesses by reducing inquiries and improving customer experiences proactively.',
    },
    {
      heading: 'Web Development',
      desc: 'We help you to elevate your websites customer experience effortlessly.',
    },
    {
      heading: 'Mobile Development',
      desc: 'We help you to transform your business with top-notch app development in the mobile-centric world.',
    },
  ];

  return (
    <>
      <div className='flex justify-center items-center  h-screen overflow-x-hidden'>
        <motion.header
          initial='hide'
          whileInView='show'
          exit='hide'
          variants={introHeaderVariants}
          className='flex gap-x-10 w-5/6 '
        >
          <div className='flex flex-col h-full gap-y-20'>
            <motion.span
              initial='hide'
              animate='show'
              variants={textVariants} // Apply animation variants to this text element
              className='text-6xl font-bold  flex justify-end'
            >
              <div className='w-2/3 text-right'>
                Experience Full Spectrum of{' '}
                <b className='text-orange-400'>Services</b> we're providing.
              </div>
            </motion.span>
            <motion.span
              initial='hide'
              animate='show'
              variants={textVariants}
              className='text-2xl pt-8 flex h-full'
            >
              <div className='flex h-56'>
                {content.map((item, index) => {
                  return (
                    <div className='flex gap-x-2 ' key={item.heading}>
                      <div className='border-l border-gray-600'></div>
                      <div className='flex flex-col justify-between'>
                        {' '}
                        <div>0{index + 1}</div>
                        <div className='flex flex-col gap-y-4'>
                          <span className='text-sm font-medium'>
                            {item.heading}
                          </span>
                          <span className='text-xs w-2/3'>{item.desc}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='flex flex-col gap-y-10'>
                <div className='text-xs '>
                  We commit passionately and persistently, fueled by a shared
                  vision. Desiring more than just a contract - we work
                  diligently to earn lasting partnerships with our clients.
                </div>
                <span className='flex justify-center items-center w-full '>
                  <ContactUs />
                </span>
              </div>
            </motion.span>
          </div>
        </motion.header>
      </div>
    </>
  );
};

export default Experience;
