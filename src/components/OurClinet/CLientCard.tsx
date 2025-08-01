import Image from 'next/image';
import React, { FC } from 'react';

interface ServiceCardProps {
  heading: string;
  image: string;
}

const CLientCard: FC<ServiceCardProps> = ({ image }) => {
  return (
    <div className='flex justify-center items-center max-w-sm mx-auto bg-white border border-border rounded-[24px] shadow-lg p-2 w-[110px] h-[110px] 2xl:w-[150px] 2xl:h-[150px]'>
      <Image src={image} alt='image' className='w-full object-contain' />
    </div>
  );
};

export default CLientCard;
