import Image, { StaticImageData } from 'next/image';
import React from 'react';

import palette from '../styles/pallette';

type ImageLike = StaticImageData | string | React.ReactNode | React.ElementType;

const PageHero: React.FC<{
  image: ImageLike;
  title: string;
  subtitle: string;
  coloredTitle?: string;
  opacity?: string;
}> = ({
  image,
  subtitle,
  title,
  coloredTitle = false,
  opacity = 'opacity-40',
}) => {
    return (
      <div className='h-[80vh] relative flex items-center justify-center text-white'>
        {image &&
          (React.isValidElement(image) ? (
            React.cloneElement(image, {
              ...image.props,
              className: `${image.props?.className || ''} dark:text-white text-black dark:group-hover:text-black group-hover:text-white absolute h-full w-full object-cover text-orange-600`.trim(),
              size: image.props?.size || 100,
              color: image.props?.color ?? 'currentColor',
            })
          ) : typeof image === 'function' ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            React.createElement(image as any, { className: 'dark:text-white text-black dark:group-hover:text-black group-hover:text-white absolute h-full w-full object-cover text-orange-500', size: 100, color: 'currentColor' })
          ) : typeof image === 'object' && (image as any).src || typeof image === 'string' ? (
            <Image
              src={image as any}
              alt='blogs background'
              quality={100}
              fill
              sizes="100vw"
              priority
              className='object-cover'
            />
          ) : null)}
        <div className={`absolute inset-0 bg-black ${opacity}`}></div>
        <div className='flex flex-col gap-8 items-center z-20 px-4 lg:p-0 md:w-[70%] lg:w-[60%]'>
          {coloredTitle ? (
            <h1
              className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} font-bold uppercase text-center`}
            >
              <span className='text-orange-500'>{coloredTitle}</span>
              {title}
            </h1>
          ) : (
            <h1
              className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} font-bold uppercase`}
            >
              {title}
            </h1>
          )}
          <span
            className={`${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop} text-center px-4 md:px-0`}
          >
            {subtitle}
          </span>
        </div>
      </div>
    );
  };

export default PageHero;
