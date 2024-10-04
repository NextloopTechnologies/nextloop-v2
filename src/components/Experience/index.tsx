// import {motion } from 'framer-;
import React, { FC } from 'react';

// import ContactUs from '../ContactUs';
// import {
//   introHeaderVariants,
//   textVariants,
// } from '../../utils/frameMotionAnimations';
import useWindowSize from '../../utils/useWindowSize';

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

  const { isMobile } = useWindowSize();

  return (
    <>
      <div className='flex justify-center items-center sm:min-h-screen'>
        <header
          // initial={isMobile ? 'visible' : 'hide'}
          // whileInView='show'
          // exit='hide'
          // variants={introHeaderVariants}
          className='flex flex-col lg:flex-row gap-10 lg:w-5/6 w-full text-left lg:text-center'
        >
          <div className='flex flex-col h-full gap-y-20 px-2'>
            <span
              // initial={isMobile ? 'visible' : 'hide'}
              // animate='show'
              // variants={textVariants}
              className='lg:text-6xl text-3xl font-bold flex lg:justify-end justify-center'
            >
              <div className='lg:w-2/3 lg:text-right text-center'>
                Experience Full Spectrum of{' '}
                <b className='text-orange-500'>Services</b> we're providing.
              </div>
            </span>
            <span
              // initial={isMobile ? 'visible' : 'hide'}
              // animate='show'
              // variants={textVariants}
              className='text-2xl sm:pt-8 flex flex-col lg:flex-row h-full gap-4'
            >
              <div className='flex flex-col justify-center sm:flex-row'>
                {content.map((item, index) => {
                  return (
                    <div className='flex py-4 sm:gap-2' key={item.heading}>
                      <div className='hidden sm:block border-l border-gray-600'></div>
                      <div className='flex flex-col justify-center items-center'>
                        {' '}
                        <div className='mt-4'>0{index + 1}</div>
                        <div className='flex flex-col justify-center items-center mt-4 px-2'>
                          <span className='text-sm font-medium mb-4'>
                            {item.heading}
                          </span>
                          <span className='text-sm text-center lg:text-[12px] w-1/2 sm:w-2/3 mx-auto'>
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='flex text-center flex-col gap-y-10'>
                <div className='text-sm lg:text-[16px]'>
                  We commit passionately and persistently, fueled by a shared
                  vision. Desiring more than just a contract - we work
                  diligently to earn lasting partnerships with our clients.
                </div>
                {/* <span className='flex justify-center items-center w-full '>
                  <ContactUs />
                </span> */}
              </div>
            </span>
          </div>
        </header>
      </div>
    </>
  );
};

export default Experience;
