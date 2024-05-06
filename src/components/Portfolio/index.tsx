import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

import { caseStudies } from '../../pages/portfolio';
import { introHeaderVariants } from '../../utils/frameMotionAnimations';
import useWindowSize from '../../utils/useWindowSize';

const Portfolio: FC = () => {
  const { isMobile } = useWindowSize();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleLeftArrowClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? caseStudies.length - 1 : prevIndex - 1
    );
  };

  const handleRightArrowClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === caseStudies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleScroll = (direction: string) => {
    const newScrollPosition =
      direction === 'left' ? scrollPosition - 1 : scrollPosition + 1;
    setScrollPosition(newScrollPosition < 0 ? 0 : newScrollPosition);
    if (direction === 'left') handleLeftArrowClick();
    else handleRightArrowClick();
  };

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
            <span className='whitespace-nowrap w-full'>Portfolio</span>
            <div
              className='flex gap-4 flex-col lg:flex-row transition-all duration-500 ease-in-out'
              style={{ transform: `translateX(-${scrollPosition * 100}%)` }}
            >
              {caseStudies.map((proj, index) => (
                <span key={index} className='relative'>
                  <span
                    onClick={() => {
                      router.push(`/portfolio/${index}`);
                    }}
                    className='bg-gray-200 pt-10 w-full lg:w-[650px] rounded-md flex items-center justify-center'
                  >
                    <Image
                      src={`/portfolio/${index}.svg`}
                      alt='Mobile'
                      width={300}
                      height={100}
                      className='object-contain h-[600px]'
                    />
                  </span>
                  <span className='bg-white bottom-0 w-5/6 h-28 absolute px-4 pt-4'>
                    <p className='text-2xl font-medium'>{proj.title}</p>
                  </span>
                </span>
              ))}
            </div>
          </div>
        </motion.header>

        <div className='hidden lg:inline-flex absolute justify-between px-5 w-full'>
          <button
            onClick={() => handleScroll('left')}
            className={`text-3xl bg-white hover:bg-gray-50 border w-14 h-14 rounded-full flex items-center justify-center text-center border-gray-300 ${
              currentImageIndex === 0
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
            disabled={currentImageIndex === 0}
          >
            &larr;
          </button>
          <button
            onClick={() => handleScroll('right')}
            className={`text-3xl border bg-white hover:bg-gray-50 w-14 h-14 rounded-full flex items-center justify-center text-center border-gray-300 ${
              currentImageIndex === caseStudies.length - 2
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
            disabled={currentImageIndex === caseStudies.length - 2}
          >
            &rarr;
          </button>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
