import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState } from 'react';

import palette from '../styles/pallette';
import {
  LeftSlide,
  Portfolio1,
  Portfolio2,
  Portfolio3,
  Portfolio4,
} from '../../assets/';
interface PortfolioCardProps {
  image: string;
  caption: string;
  link: string;
}
const IMAGE_DATA: PortfolioCardProps[] = [
  {
    image: Portfolio1 as unknown as string,
    caption: '1st image caption',
    link: 'portfolio/4/?scrollToHeader=true',
  },
  {
    image: Portfolio2 as unknown as string,
    caption: '2nd image caption',
    link: 'portfolio/5/?scrollToHeader=true',
  },
  {
    image: Portfolio3 as unknown as string,
    caption: '3rd image caption',
    link: 'portfolio/2/?scrollToHeader=true',
  },
  {
    image: Portfolio4 as unknown as string,
    caption: '4th image caption',
    link: 'portfolio/1/?scrollToHeader=true',
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
    <div className='min-w-full sm:min-h-screen max-w-full m-auto relative'>
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
        <Link href={IMAGE_DATA[currentSlide]?.link || '#'} passHref>
          <button className='text-orange-500 text-[14px] outline-none bg-white border border-orange-500 px-5 py-1 rounded-[20px]'>
            View Case Study
          </button>
        </Link>
      </div>
      <div>
        <button
          onClick={() => handleImages(-1)}
          className='prev absolute top-[50%] mt-auto pl-5 transition-transform transform hover:scale-110 active:scale-95'
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
          className='next absolute top-[50%] right-0 mt-auto pr-5 transition-transform transform hover:scale-110 active:scale-95'
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
