import Image, { StaticImageData } from 'next/image';
import React from 'react';

import palette from '../../../styles/pallette';
import { IWhyChooseUs } from '../../../types';

type WhyChooseUsProps = {
  whyChooseContent: IWhyChooseUs[];
};

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ whyChooseContent }) => {
  return (
    <div className='w-full max-w-[1479px] mx-auto mb-10'>
      <h1
        className={`uppercase font-bold text-center mb-[30px] ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop}`}
      >
        Why Choose Us
      </h1>
      <div className='relative flex flex-col items-center md:px-5 mb-5 md:mb-0'>
        <div className='md:absolute md:left-[13%] bg-[#FA8145] sm:pl-[300px] md:pl-[370px] lg:pl-[515px] text-white md:flex md:flex-col md:justify-center lg:h-[480px] z-10'>
          <div className='md:absolute md:left-[15%] md:self-center md:w-[47%] md:top-[18%] md:transform md:-translate-y-[12%] md:-translate-x-1/2 m-5 md:m-0 '>
            <Image
              src={whyChooseContent?.[0]?.image as StaticImageData}
              alt='why-choose-us'
              height={400}
              width={400}
              className='h-full w-full object-fill rounded-2xl'
            />
          </div>
          <h1
            className={`lg:leading-none font-bold uppercase mb-5 ${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop} mx-10 md:mx-5 md:mb-3`}
          >
            {whyChooseContent?.[0]?.title}
          </h1>
          <div
            className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} mx-10 md:mx-5 md:mb-3 mb-6`}
          >
            {whyChooseContent?.[0]?.descp}
          </div>
        </div>
      </div>

      <div className='relative flex flex-col items-center md:pl-[150px] md:py-[500px] md:px-5'>
        <div className='md:absolute md:right-[13%] bg-[#1D1D1D] md:pl-[80px] sm:pr-[305px] md:pr-[375px] lg:pr-[520px] text-white md:flex md:flex-col md:justify-center md:h-[480px] mb-6'>
          <div className='md:absolute md:-right-[8%] md:w-[47%] md:top-[18%] md:transform md:-translate-y-[12%] m-5 md:m-0'>
            <Image
              src={whyChooseContent?.[1]?.image as StaticImageData}
              alt='why-choose-us'
              height={400}
              width={400}
              className='h-full w-full object-fill rounded-2xl'
            />
          </div>
          <h1
            className={` lg:leading-none font-bold uppercase ${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop} mx-10 md:mx-5 md:mb-3`}
          >
            {whyChooseContent?.[1]?.title}
          </h1>
          <div
            className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} mx-10 md:mx-5 md:mb-3 mb-6`}
          >
            {whyChooseContent?.[1]?.descp}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
