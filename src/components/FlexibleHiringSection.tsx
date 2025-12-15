import Image, { StaticImageData } from 'next/image';
import React from 'react';

import palette from '../styles/pallette';

export interface HiringItem {
  id: number;
  title: string;
  description?: string;
  image?: StaticImageData | string | React.ReactNode | React.ElementType;
}

export interface HiringSectionData {
  headingData: {
    heading: string;
    coloredHeading: string;
  };
  items: HiringItem[];
}

const FlexibleHiringSection: React.FC<{
  hiringData: HiringSectionData;
}> = ({ hiringData }) => {
  return (
    <div className='flex flex-col items-center text-center min-h-fit w-full md:max-w-6xl mx-auto my-8 md:my-16 md:rounded-3xl'>
      <h3
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold uppercase mb-12`}
      >
        {hiringData.headingData.heading}
        <span className='text-orange-500'>
          {hiringData.headingData.coloredHeading}
        </span>
      </h3>

      <div className='flex flex-wrap justify-center gap-8 max-w-5xl mx-auto'>
        {hiringData.items.map((item) => (
          <div
            key={item.id}
            className='flex flex-col items-center text-center space-y-4'
          >
            <div className='relative w-36 h-36 mx-auto flex items-center justify-center'>
              {item.image &&
                (React.isValidElement(item.image) ? (
                  React.cloneElement(item.image, {
                    ...item.image.props,
                    className: `${item.image.props?.className || ''} w-24 h-24 text-orange-600`.trim(),
                    size: item.image.props?.size || 36,
                    color: item.image.props?.color ?? 'currentColor',
                  })
                ) : typeof item.image === 'function' ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  React.createElement(item.image as any, { className: 'w-24 h-24 text-orange-500', size: 36, color: 'currentColor' })
                ) : typeof item.image === 'object' && (item.image as any).src ? (
                  <Image src={item.image as any} alt={item.title} fill className='object-contain' />
                ) : typeof item.image === 'string' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image as string} alt={item.title} className='object-contain w-20 h-20' />
                ) : null)}
            </div>
            <h3 className='text-lg font-semibold text-black'>{item.title}</h3>
            <p className='text-gray-600 text-sm md:text-base max-w-xs'>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlexibleHiringSection;
