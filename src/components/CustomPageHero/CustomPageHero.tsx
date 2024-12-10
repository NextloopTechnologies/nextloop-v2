import Image, { StaticImageData } from 'next/image';
import React from 'react';

import PageHero from '../PageHero';
import palette from '../../styles/pallette';

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
        <div className='w-full md:w-full h-[50vh] md:h-screen relative flex items-center justify-center text-white'>
          <Image
            src={image}
            className='absolute h-full w-full object-cover'
            alt='blogs background'
            fill
            sizes='100vw'
            quality={100}
            priority
          />
          <div className={`absolute inset-0 bg-black ${opacity}`}></div>
          <div
            className={`flex flex-col gap-5 items-center z-20 px-4 lg:p-0 mt-10 ${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop}`}
          >
            {titleChildren}
            <span
              className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} xl:w-[50%] md:w-[60%] text-center font-normal ${customSubtitleClassname}`}
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
