import Image, { StaticImageData } from 'next/image';
import React, { FC } from 'react';

interface Props {
  heading: string;
  image: StaticImageData;
}

const CLientCard: FC<Props> = ({ heading, image }) => {
  return (
    <div className='flex justify-center items-center max-w-sm mx-auto bg-white border border-border rounded-[24px] shadow-lg p-2 w-[110px] h-[110px] 2xl:w-[150px] 2xl:h-[150px]'>
      <Image
        src={image}
        alt={heading}
        width={120}
        height={60}
        className='object-contain'
      />
    </div>
  );
};

export default CLientCard;
