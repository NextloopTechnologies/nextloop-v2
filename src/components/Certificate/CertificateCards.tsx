import Image from 'next/image';
import React, { FC } from 'react';

interface ServiceCardProps {
  image: string;
}
const CertificateCard: FC<ServiceCardProps> = ({ image }) => {
  return (
    <div className='max-w-sm mx-auto bg-white border border-border rounded-[50%] shadow-lg p-0'>
      <div className='flex justify-center items-center w-28 h-28 rounded-[50%]'>
        <Image src={image} alt='image' className='w-full object-contain' />
      </div>
    </div>
  );
};

export default CertificateCard;
