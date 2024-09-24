import Image, { StaticImageData } from 'next/image';
import React from 'react';

import { IWhyChooseUs } from '../../../types';

type WhyChooseUsProps = {
  whyChooseContent: IWhyChooseUs[];
};

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ whyChooseContent }) => {
  return (
    <div className='min-h-screen flex flex-col bg-[#1D1D1D0D] py-[48px]'>
      <div className='w-full max-w-[1479px] mx-auto'>
        <h1 className='text-3xl md:text-8xl uppercase font-bold text-center mb-[40px]'>
          Why Choose Us
        </h1>
        <div className='flex flex-col items-center px-5'>
          {whyChooseContent.map((content, index) => (
            <div
              key={index}
              className='relative flex flex-col items-center w-full mb-10'
            >
              <div className='bg-[#FA8145] p-5 sm:p-10 flex flex-col justify-center h-auto'>
                <div className='flex justify-center'>
                  <Image
                    src={content.image as StaticImageData}
                    alt='why-choose-us'
                    height={400}
                    width={400}
                    className='h-full w-full object-fill max-w-[200px] sm:max-w-[300px] md:max-w-[400px]'
                  />
                </div>
                <h1 className='text-xl md:text-3xl lg:text-[50px] lg:leading-none font-bold uppercase mb-5 text-center'>
                  {content.title}
                </h1>
                <span className='lg:text-lg text-center'>{content.descp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
