import { StaticImageData } from 'next/image';
import React from 'react';

import palette from '../styles/pallette';

type ImageLike = StaticImageData | string | React.ReactNode | React.ElementType;

interface StaffingItems {
  id: number;
  title: string;
  description?: string;
  image?: ImageLike;
}

export interface StaffingData {
  headingData: {
    heading: string;
    coloredHeading: string;
    description: string;
  };
  items: StaffingItems[];
}

const StaffingIndustriesSection: React.FC<{ industriesData: StaffingData }> = ({
  industriesData,
}) => {
  return (
    <div className='bg-[#F4F4F4]'>
      <div className='flex flex-col items-center text-center min-h-fit w-full md:max-w-7xl mx-auto p-16 '>
        <h3
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold uppercase`}
        >
          {industriesData.headingData.heading}
          <span className='text-orange-500'>
            {industriesData.headingData.coloredHeading}
          </span>
        </h3>

        <p className='text-gray-400 mt-4 mb-12'>
          {industriesData.headingData.description}
        </p>
        <div className='w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4'>
          {industriesData.items?.map((cat) => (
            <div
              key={cat.id}
              className='flex flex-col items-center text-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-7 shadow-sm'
            >
              <div className='flex items-center justify-center w-12 h-12'>
                {cat.image && React.isValidElement(cat.image)
                  ? React.cloneElement(cat.image, {
                      ...cat.image.props,
                      className: 'w-9 h-9 text-orange-500',
                      size: 36,
                    })
                  : typeof cat.image === 'function'
                  ? React.createElement(cat.image as any, {
                      className: 'w-9 h-9 text-orange-500',
                      size: 36,
                    })
                  : null}
              </div>

              <p className='text-sm font-semibold text-gray-900'>{cat.title}</p>

              {cat.description && (
                <p className='text-sm text-gray-500 leading-relaxed'>
                  {cat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffingIndustriesSection;
