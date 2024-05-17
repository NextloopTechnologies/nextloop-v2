import Image, { StaticImageData } from 'next/image';
import React from 'react';

type Props = {
  colouredTitle?: string;
  image: StaticImageData;
  informationSection: React.ReactNode;
};

const WhyBuild = ({ image, informationSection, colouredTitle }: Props) => {
  return (
    <div className='min-h-screen flex flex-col items-center py-[114px] gap-[70px]'>
      <h1 className='text-[85px] leading-none uppercase font-bold text-center max-w-[1479px]'>
        Why build <br /> a custom software solution for the{' '}
        {colouredTitle && (
          <span className='text-orange-500'>{colouredTitle}?</span>
        )}
      </h1>

      <div className='flex gap-[74px] justify-between'>
        <Image
          src={image}
          alt='Event Image'
          className='w-[600px] h-[450px] object-fill mt-4'
        />

        {informationSection}
      </div>
    </div>
  );
};

export default WhyBuild;
