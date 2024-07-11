import Image, { StaticImageData } from 'next/image';
import React from 'react';

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
    <div className='min-h-screen flex flex-col items-center py-[114px] gap-[70px]'>
      <h1 className='text-3xl md:text-[85px] leading-none uppercase font-bold text-center max-w-[1479px]'>
        Why build <br /> a custom software solution for the{' '}
        {colouredTitle && (
          <span className='text-orange-500'>{colouredTitle}?</span>
        )}
      </h1>

      <div
        className={`flex flex-col lg:flex-row gap-[74px] md:gap-[124px] justify-between ${infoAndImgClassname}`}
      >
        <Image
          src={image}
          alt='Event Image'
          width={400}
          height={400}
          className='w-[300px] h-[300px] mx-auto lg:w-[600px] lg:h-[450px] object-fill mt-4 rounded-lg'
        />

        {informationSection}
      </div>
    </div>
  );
};

export default WhyBuild;
