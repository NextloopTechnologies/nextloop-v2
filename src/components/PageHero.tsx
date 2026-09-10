import Image, { StaticImageData } from 'next/image';
import React from 'react';

import palette from '../styles/pallette';
import { IconElementProps } from '../types';

type ImageLike = StaticImageData | string | React.ReactNode | React.ElementType;

/**
 * `titleAs` exists because this banner is the page's real heading on a listing
 * route and decoration on a detail route. /career/<id>/ rendered the banner's
 * "careers" as an H1 *and* the job title as an H1 — two H1s, with the generic
 * one first, so a parser read every one of the 64 job pages as being about
 * "careers" rather than about the role. Detail routes pass 'p': same styling,
 * out of the document outline, leaving the one true heading to the content.
 */
const PageHero: React.FC<{
  image: ImageLike;
  title: string;
  subtitle: string;
  coloredTitle?: string;
  opacity?: string;
  titleAs?: 'h1' | 'p';
}> = ({
  image,
  subtitle,
  title,
  coloredTitle = false,
  opacity = 'opacity-40',
  titleAs = 'h1',
}) => {
  const Title = titleAs;
  return (
    <div className='h-[80vh] relative flex items-center justify-center text-white'>
      {image &&
        (React.isValidElement<IconElementProps>(image) ? (
          React.cloneElement(image, {
            ...image.props,
            className: `${
              image.props?.className || ''
            } dark:text-white text-black dark:group-hover:text-black group-hover:text-white absolute h-full w-full object-cover text-orange-600`.trim(),
            size: image.props?.size || 100,
            color: image.props?.color ?? 'currentColor',
          })
        ) : typeof image === 'function' ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          React.createElement(image as any, {
            className:
              'dark:text-white text-black dark:group-hover:text-black group-hover:text-white absolute h-full w-full object-cover text-orange-500',
            size: 100,
            color: 'currentColor',
          })
        ) : (typeof image === 'object' && (image as any).src) ||
          typeof image === 'string' ? (
          <Image
            src={image as any}
            alt='blogs background'
            quality={75}
            fill
            sizes='100vw'
            priority
            fetchPriority='high'
            placeholder={
              typeof image === 'object' && (image as any).blurDataURL
                ? 'blur'
                : 'empty'
            }
            blurDataURL={
              typeof image === 'object' ? (image as any).blurDataURL : undefined
            }
            className='object-cover'
          />
        ) : null)}
      <div className={`absolute inset-0 bg-black ${opacity}`}></div>
      <div className='flex flex-col gap-8 items-center z-20 px-4 lg:p-0 md:w-[70%] lg:w-[60%]'>
        {coloredTitle ? (
          <Title
            className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} font-bold text-center`}
          >
            <span className='text-orange-500'>{coloredTitle}</span>
            {title}
          </Title>
        ) : (
          <Title
            className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} font-bold `}
          >
            {title}
          </Title>
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
