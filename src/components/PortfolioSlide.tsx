import Image from 'next/image';
import React, { FC, useState } from 'react';

import palette from '../styles/pallette';
import {
  Portfolio1,
  Portfolio2,
  Portfolio3,
  Portfolio4,
  LeftSlide,
} from '../../assets/';
interface PortfolioCardProps {
  image: string;
  caption: string;
}
const IMAGE_DATA: PortfolioCardProps[] = [
  {
    image: Portfolio1 as unknown as string,
    caption: '1st image caption',
  },
  {
    image: Portfolio2 as unknown as string,
    caption: '2nd image caption',
  },
  {
    image: Portfolio3 as unknown as string,
    caption: '3rd image caption',
  },
  {
    image: Portfolio4 as unknown as string,
    caption: '4th image caption',
  },
];

const PortfolioSlide: FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleImages = (count: number) => {
    let slideCount = 0;
    slideCount = currentSlide + count;
    setCurrentSlide((prev) => {
      if (slideCount > IMAGE_DATA?.length - 1) {
        return 0;
      }
      if (slideCount < 0) {
        return IMAGE_DATA?.length - 1;
      }
      return prev + count;
    });
  };
  return (
    <div className='min-w-full sm:min-h-screen max-w-full  m-auto relative bg-green-300'>
      <div className='w-full h-full'>
        <Image
          src={IMAGE_DATA[currentSlide]?.image || ''}
          alt='image'
          className='w-full h-full object-contain'
        />
      </div>
      <header className='text-center w-full absolute md:top-14 top-2'>
        <span
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} uppercase font-bold text-center`}
        >
          our <span className='text-orange-500'>portfolio</span>
        </span>
      </header>
      <div className='image-caption absolute md:bottom-[50px] bottom-[20px]  text-center w-full'>
        <button className='text-orange-500 text-[14px] outline-none bg-white border border-orange-500 px-5 py-1 rounded-[20px]'>
          View Case Study
        </button>
      </div>
      <div>
        <button
          onClick={() => handleImages(-1)}
          className='prev absolute top-[50%] mt-auto pl-5'
        >
          <Image
            src={LeftSlide}
            alt='image'
            className='w-full h-full object-cover'
            width={40}
            height={30}
          />
        </button>
        <button
          onClick={() => handleImages(1)}
          className='next absolute top-[50%] right-0 mt-auto pr-5'
        >
          <Image
            src={LeftSlide}
            alt='image'
            className='w-full h-full object-cover rotate-180'
            width={40}
            height={30}
          />
        </button>
      </div>
      <div style={{ textAlign: 'center' }}>
        {IMAGE_DATA?.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{ background: index == currentSlide ? '#bbb' : '#fef' }}
            className='dots'
          ></span>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSlide;
