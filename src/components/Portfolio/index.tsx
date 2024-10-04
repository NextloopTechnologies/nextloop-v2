/* eslint-disable @typescript-eslint/ban-ts-comment */
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

import { IPortfolio } from '../../types';
import { introHeaderVariants } from '../../utils/frameMotionAnimations';
import useWindowSize from '../../utils/useWindowSize';
import PortfolioSlide from '../PortfolioSlide';

const Portfolio: FC<{ caseStudies: IPortfolio[] }> = ({ caseStudies }) => {
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
    <div className='w-full flex justify-center'>
      <div className='sm:min-h-screen py-2'>
        {/* <header className='flex gap-10 lg:px-10 text-center'>
          <div className='flex flex-col gap-y-3 z-10 px-4'>
            <span className='uppercase lg:text-5xl text-3xl font-bold text-center'>
              our <span className='text-orange-500'>portfolio</span>
            </span>
          </div>
        </header> */}
        <div>
          <PortfolioSlide />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
