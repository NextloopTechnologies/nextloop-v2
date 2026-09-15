import Image, { StaticImageData } from 'next/image';
import React from 'react';

import PageHero from '../PageHero';

type Props = {
  image: StaticImageData;
  title: string;
  subtitle: string;
  coloredTitle?: boolean | string;
  opacity?: string;
  titleChildren?: React.ReactNode;
  customSubtitleClassname?: string;
  className?: string;
};

const CustomPageHero = ({
  image,
  subtitle,
  title,
  coloredTitle = false,
  opacity = 'opacity-40',
  titleChildren,
  customSubtitleClassname,
  className,
}: Props) => {
  return (
    <div className={`flex ${className}`}>
      {titleChildren ? (
        <div className='w-full min-h-[60vh] sm:min-h-[50vh] md:min-h-[70vh] lg:min-h-screen py-28 lg:py-0 relative flex items-center justify-center text-white'>
          <Image
            src={image}
            className='absolute h-full w-full object-cover object-center'
            alt='blogs background'
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw'
            quality={100}
            priority
          />
          <div className={`absolute inset-0 bg-black ${opacity}`} />
          <div
            className={`flex flex-col gap-3 sm:gap-4 md:gap-5 items-center z-20 px-4 sm:px-6 md:px-8 lg:px-0 mt-6 sm:mt-8 md:mt-10 w-full md:w-3/4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl `}
          >
            {titleChildren}
            <span
              className={` w-full sm:w-[85%] md:w-[70%] xl:w-[70%] text-center font-normal whitespace-pre-line text-sm sm:text-base md:text-lg lg:text-xl ${customSubtitleClassname} `}
            >
              {subtitle}
            </span>
          </div>
        </div>
      ) : (
        <PageHero
          image={image}
          title={title}
          subtitle={subtitle}
          opacity={opacity}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          coloredTitle={coloredTitle}
        />
      )}
    </div>
  );
};

export default CustomPageHero;
