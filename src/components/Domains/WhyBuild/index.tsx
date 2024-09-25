import Image, { StaticImageData } from 'next/image';
import React from 'react';

import palette from '../../../styles/pallette';

type Props = {
  colouredTitle?: string;
  image: StaticImageData;
  informationSection: React.ReactNode;
  infoAndImgClassname?: string;
};

const WhyBuild = ({
  image,
  informationSection,
  colouredTitle,
  infoAndImgClassname,
}: Props) => {
  return (
    <div className='flex flex-col items-center py-[50px] gap-[30px]'>
      <h1
        className={`uppercase font-bold text-center max-w-[1479px] ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop}`}
      >
        Why build <br /> a custom software solution for the{' '}
        {colouredTitle && (
          <span className='text-orange-500'>{colouredTitle} ?</span>
        )}
      </h1>

      <div
        className={`flex flex-col lg:flex-row gap-[50px] md:gap-[50px] justify-between ${infoAndImgClassname}`}
      >
        <Image
          src={image}
          alt='Event Image'
          width={300}
          height={300}
          className='w-[300px] h-[200px] mx-auto lg:w-[600px] lg:h-[350px] object-fill mt-2 rounded-lg'
        />

        {informationSection}
      </div>
    </div>
  );
};

export default WhyBuild;
