import React, { FC } from 'react';
// import { Services1 } from '../../assets';
import Image from 'next/image';

interface ServiceCardProps {
  heading: string;
  image: string;
  desc: string;
}
const OurServieceCard: FC<ServiceCardProps> = ({ heading, image, desc }) => {
  return (
    <div className='max-w-sm mx-auto bg-card border border-border rounded-sm shadow-lg p-6 flex justify-center items-center flex-col'>
      <div className='mb-4 w-28 h-28'>
        <Image
          // width={60}
          // height={60}
          src={image}
          alt={image}
          className='w-full h-full object-cover '
        />
      </div>
      <h2 className='text-xl font-semibold text-foreground text-center'>
        {heading}
        <hr className='my-2 border border-1 border-orange-500 text-orange-500' />
      </h2>

      <p className='text-muted-foreground text-[14px] text-center'>{desc}</p>
    </div>
  );
};

export default OurServieceCard;
