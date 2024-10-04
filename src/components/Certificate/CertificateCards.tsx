import Image from 'next/image';
import React from 'react';
const CertificateCard = ({ image }: any) => {
  return (
    <div
      className={
        'max-w-sm mx-auto bg-white border border-border rounded-[50%] shadow-lg p-0'
      }
    >
      <div
        className='flex justify-center items-center w-28 h-28 rounded-[50%]  
     '
      >
        <Image src={image} alt={'image'} className='w-full object-contain' />
      </div>
    </div>
  );
};

export default CertificateCard;
