import Image from 'next/image';
import React from 'react';
const CLientCard = ({ image }: any) => {
  return (
    <div
      className={
        'max-w-sm mx-auto bg-white border border-border rounded-[24px] shadow-lg p-2'
      }
    >
      <div
        className='flex justify-center items-center w-20 h-20 rounded-[50%]  
     '
      >
        <Image src={image} alt={'image'} className='w-full object-contain' />
      </div>
    </div>
  );
};

export default CLientCard;
