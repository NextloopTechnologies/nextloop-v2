// import { Services1 } from '../../assets';
import Image from 'next/image';
import React, { FC } from 'react';

interface ServiceCardProps {
  heading: string;
  image: string;
}
const OurServieceCard: FC<ServiceCardProps> = ({ heading, image }) => {
  return (
    <div>
      <div className='relative sm:w-[170px] sm:h-[150px] overflow-hidden rounded-[33px]'>
        <Image src={image} alt={image} className='w-full h-full object-cover' />
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-65'>
          <h2 className='text-white text-[18px] text-center font-semibold p-2'>
            {heading}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default OurServieceCard;
