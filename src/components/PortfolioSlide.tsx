import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';

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
    setCurrentSlide((prev) => {
      const next = prev + count;
      if (next >= IMAGE_DATA.length) return 0;
      if (next < 0) return IMAGE_DATA.length - 1;
      return next;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % IMAGE_DATA.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='min-w-full max-w-full m-auto relative overflow-hidden'>
      <div className='relative w-full h-screen'>
        {IMAGE_DATA.map((item, index) => (
          <Image
            key={index}
            src={item.image}
            alt={`image-${index}`}
            className={`absolute top-0 left-0 w-full h-full object-fill object-top transition-all duration-700 ease-in-out ${index === currentSlide
              ? 'opacity-100 z-10'
              : 'opacity-0 z-0 pointer-events-none'
              }`}
            fill
          />
        ))}

        <div className='absolute inset-0 z-20 flex flex-col justify-between items-center px-4 py-6'>
          <div className='mt-4 sm:mt-6 text-center'>
            <span
              className={`${palette.fontSize.heading2.mobile} md:text-4xl 2xl:text-4xl uppercase font-bold text-white`}
            >
              our <span className='text-orange-500'>portfolio</span>
            </span>
          </div>

          <div className='flex flex-col items-center gap-4 mt-8 mb-2 md:mt-12 md:mb-4'>
            <Link href={IMAGE_DATA[currentSlide]?.link || '#'} passHref>
              <button className='text-orange-500 text-[14px] outline-none bg-white border border-orange-500 px-5 py-1 rounded-[20px]'>
                View Case Study
              </button>
            </Link>
            <div>
              {IMAGE_DATA.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    margin: '0 5px',
                    background: index === currentSlide ? '#bbb' : '#eee',
                    cursor: 'pointer',
                  }}
                ></span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => handleImages(-1)}
          className='absolute top-[50%] left-0 pl-5 transform -translate-y-1/2 hover:scale-110 active:scale-95 z-30'
        >
          <Image
            src={LeftSlide}
            alt='prev'
            className='w-full h-full object-cover'
            width={40}
            height={30}
          />
        </button>
        <button
          onClick={() => handleImages(1)}
          className='absolute top-[50%] right-0 pr-5 transform -translate-y-1/2 hover:scale-110 active:scale-95 z-30'
        >
          <Image
            src={LeftSlide}
            alt='next'
            className='w-full h-full object-cover rotate-180'
            width={40}
            height={30}
          />
        </button>
      </div>
    </div>
  );
};

export default PortfolioSlide;
