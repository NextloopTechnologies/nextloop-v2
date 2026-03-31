import Image, { StaticImageData } from 'next/image';
import React from 'react';

import palette from '../styles/pallette';

type ImageLike = StaticImageData | string | React.ReactNode | React.ElementType;

interface StepData {
  title: string;
  image?: ImageLike;
  description?: string;
}
export interface StaffingData {
  headingData: {
    heading: string;
    coloredHeading: string;
    description: string;
  };
  items: StepData[];
}

const ServicePartnerCards: React.FC<{ item: StepData }> = ({ item }) => {
  return (
    <div className='relative flex items-center justify-center text-white p-4 min-w-24 min-h-32 max-w-72 w-fit h-fit'>
      <div className='flex flex-col items-center text-center w-full h-full rounded-xl'>
        {item.image &&
          (React.isValidElement(item.image) ? (
            item.image
          ) : typeof item.image === 'function' ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            React.createElement(item.image as any, { className: 'h-[82px] w-[82px] m-2 text-orange-500', size: 36, color: 'currentColor' })
          ) : typeof item.image === 'object' && (item.image as any).src ? (
            <Image
              src={item.image as any}
              height={70}
              width={70}
              alt='tools-icon'
              className='h-[70px] w-[70px] m-2'
            />
          ) : typeof item.image === 'string' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.image as string} alt='tools-icon' className='h-[70px] w-[70px] m-2' />
          ) : null)}
        <h3 className='mt-2 font-semibold text-sm mb-2'>{item.title}</h3>
        <p className='text-xs text-gray-600 px-4'>{item.description}</p>
      </div>
    </div>
  );
};

const StaffingPartnersSection: React.FC<{
  staffingData: StaffingData;
}> = ({ staffingData }) => {
  return (
    <div className='bg-black flex flex-col items-center text-center min-h-fit py-16 w-full md:max-w-6xl mx-auto md:my-16 md:rounded-3xl'>
      <h3
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-white font-bold uppercase`}
      >
        {staffingData.headingData.heading}
        <span className='text-orange-500'>
          {staffingData.headingData.coloredHeading}
        </span>
      </h3>
      <p className='text-gray-400 mt-4 mb-16'>
        {staffingData.headingData.description}
      </p>

      <div className='flex flex-wrap justify-center gap-2 w-11/12'>
        {staffingData?.items?.map((item, index) => (
          <ServicePartnerCards key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default StaffingPartnersSection;
