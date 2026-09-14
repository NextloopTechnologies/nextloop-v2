import Image, { StaticImageData } from 'next/image';
import React from 'react';

import palette from '../../../styles/pallette';

type ImageWithHoverInfoProps = {
  image: StaticImageData;
  title: string;
  description?: string;
};

const ImageWithHoverInfo: React.FC<ImageWithHoverInfoProps> = ({
  description,
  image,
  title,
}) => (
  <article className='group relative h-full overflow-hidden rounded-2xl border border-black/5 bg-black shadow-lg shadow-black/10'>
    <Image
      src={image}
      alt={title}
      fill
      sizes='(max-width: 1024px) 100vw, 50vw'
      className='absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 z-[1]'
    />
    <div className='absolute inset-0 z-[2] bg-gradient-to-t from-black/90 via-black/40 to-transparent' />
    <div className='relative z-[3] flex h-full min-h-[280px] flex-col justify-end p-5 text-white md:min-h-[320px] md:p-6 lg:p-7'>
      <h2
        className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} mb-2 font-bold uppercase text-white xl:mb-3`}
      >
        {title}
      </h2>
      <p
        className={`text-[10px] md:${palette.fontSize.descriptionSmall.desktop} text-white/90`}
      >
        {description}
      </p>
    </div>
  </article>
);

type WhatWeDoProps = {
  content: ImageWithHoverInfoProps[];
};

const WhatWeDo: React.FC<WhatWeDoProps> = ({ content }) => {
  return (
    <div className='flex  flex-col items-center px-10'>
      <div className='flex flex-col pt-[50px] pb-[80px] mx-2 gap-10'>
        <h1
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold text-center`}
        >
          Our Hospitality &{' '}
          <span className='text-orange-500'>Travel Software Solutions</span>
        </h1>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8'>
          {content.map(({ description, image, title }, idx) => (
            <ImageWithHoverInfo
              key={idx}
              description={description}
              image={image}
              title={title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
