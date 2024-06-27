import Image, { StaticImageData } from 'next/image';
import React from 'react';

type ImageWithHoverInfoProps = {
  image: StaticImageData;
  title: string;
  description?: string;
};

const ImageWithHoverInfo: React.FC<ImageWithHoverInfoProps> = ({
  description,
  image,
  title
}) => (
  <div className='relative flex flex-col items-center group'>
    <Image
      src={image}
      alt={title}
      className="object-fill rounded-lg z-[1]"
    />
    <div className='absolute inset-0 bg-[#1D1D1D] flex flex-col opacity-0 group-hover:opacity-100 m-5 md:m-14 p-5 lg:m-5 transition-opacity z-[2]'>
      <h2 className='uppercase text-xs sm:text-lg lg:text-base xl:text-2xl font-bold text-white mb-2 xl:mb-5'>
        {title}
      </h2>
      <p className='text-[9px] sm:text-sm lg:text-sm xl:text-base text-white'>
        {description}
      </p>
    </div>
  </div>
);

type WhatWeDoProps = {
  content: ImageWithHoverInfoProps[]
}

const WhatWeDo: React.FC<WhatWeDoProps> = ({
  content
}) => {
  return (
    <div className='flex bg-[#1D1D1D0D] flex-col items-center'>
      <div className='flex flex-col pt-[96px] pb-[122px] mx-2 gap-20'>
        <h1 className='text-3xl md:text-7xl uppercase font-bold text-center'>
          What <span className='text-orange-500'>We do</span> for you
        </h1>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
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
