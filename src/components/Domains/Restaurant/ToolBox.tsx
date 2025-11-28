import Image, { StaticImageData } from 'next/image';
import React from 'react';

import palette from '../../../styles/pallette';

type IconLike = StaticImageData | string | React.ReactNode | React.ElementType;

interface ToolBoxProps {
  title: string;
  descp: string;
  icons: IconLike;
  height?: number;
  width?: number;
}

const ToolBox: React.FC<ToolBoxProps> = ({
  title,
  descp,
  icons,
  height = 60,
  width = 60,
}) => {
  return (
    <div
      className='flex flex-col items-center text-center p-4 bg-white rounded-lg'
      style={{ boxShadow: '0px 1px 10px 1px #0000001A' }}
    >
      {/* render either an image or an icon component/element */}
      {icons &&
        (React.isValidElement(icons) ? (
          React.cloneElement(icons, {
            ...icons.props,
            className: `${icons.props?.className || ''} h-[80px] w-[80px] mt-6 mb-8 text-orange-500`.trim(),
            size: icons.props?.size || 40,
            color: icons.props?.color ?? 'currentColor',
          })
        ) : typeof icons === 'function' ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          React.createElement(icons as any, { className: 'h-[80px] w-[80px] mt-6 mb-8 text-orange-500', size: 40 })
        ) : typeof icons === 'object' && (icons as any).src ? (
          <Image
            src={icons as any}
            height={height}
            width={width}
            alt='tools-icon'
            className='h-[70px] w-[70px] mt-6 mb-8'
          />
        ) : typeof icons === 'string' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={icons as string}
            alt='tools-icon'
            className='h-[70px] w-[70px] mt-6 mb-8'
          />
        ) : null)}
      <h3
        className={`${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop} text-[#1D1D1D] mb-4 uppercase`}
      >
        {title}
      </h3>
      <p
        className={`${palette.fontSize.descriptionSmall.mobile} md:${palette.fontSize.descriptionSmall.desktop} text-[#1D1D1D] mb-5`}
      >
        {descp}
      </p>
    </div>
  );
};

export default ToolBox;
