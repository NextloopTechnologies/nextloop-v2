import Image, { StaticImageData } from 'next/image';
import React from 'react';

import palette from '../styles/pallette';

type ImageLike = StaticImageData | string | React.ReactNode | React.ElementType;

interface StaffingItems {
  id: number;
  title: string;
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
    <div className='flex flex-col items-center text-center min-h-fit w-full md:max-w-6xl mx-auto my-8 md:my-16 md:rounded-3xl'>
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

      <div className='w-full mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 p-4'>
        {industriesData.items?.map((cat) => (
          <button
            key={cat.id}
            className='group flex items-center justify-between rounded-xl border px-4 py-3 transition-all duration-200 shadow-sm 
                       bg-white text-black hover:bg-black hover:text-white'
          >
            <div className='flex items-center gap-3'>
              {cat.image &&
                (React.isValidElement(cat.image) ? (
                  React.cloneElement(cat.image, {
                    ...cat.image.props,
                    className: `${cat.image.props?.className || ''} w-7 h-7 text-orange-600 transition-all duration-200 group-hover:invert`.trim(),
                    size: cat.image.props?.size || 20,
                    color: cat.image.props?.color ?? 'currentColor',
                  })
                ) : typeof cat.image === 'function' ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  React.createElement(cat.image as any, { className: 'w-7 h-7 text-orange-500 transition-all duration-200 group-hover:invert', size: 20, color: 'currentColor' })
                ) : typeof cat.image === 'object' && (cat.image as any).src ? (
                  <Image
                    src={cat.image as any}
                    alt={cat.title}
                    width={26}
                    height={26}
                    className='transition-all duration-200 group-hover:invert'
                  />
                ) : typeof cat.image === 'string' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cat.image as string} alt={cat.title} className='w-6 h-6 transition-all duration-200 group-hover:invert' />
                ) : null)}
              <span className='text-sm font-medium text-left'>{cat.title}</span>
            </div>
            <span className='text-lg font-bold'>›</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StaffingIndustriesSection;
