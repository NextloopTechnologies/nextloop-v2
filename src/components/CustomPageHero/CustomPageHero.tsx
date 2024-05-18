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
};

const CustomPageHero = ({
  image,
  subtitle,
  title,
  coloredTitle = false,
  opacity = 'opacity-40',
  titleChildren,
}: Props) => {
  return (
    <div className='flex'>
      {titleChildren ? (
        <div className='md:w-full h-screen relative flex items-center justify-center text-white'>
          <Image
            src={image}
            className='absolute h-full w-full object-cover'
            alt='blogs background'
            quality={100}
          />
          <div className={`absolute inset-0 bg-black ${opacity}`}></div>
          <div className='flex flex-col gap-8 items-center z-20 px-4 lg:p-0'>
            {titleChildren}
            <span className='text-xl xl:w-[50%] md:w-[60%] text-center font-normal'>
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
