import Image, { StaticImageData } from 'next/image';
import React from 'react';

type SuccessSolutionCardProps = {
  image: StaticImageData;
  title: string;
  descp: string;
}

const SuccessSolutionCard: React.FC<SuccessSolutionCardProps> = ({
  title,
  descp,
  image
}) => {
  return (
    <div
      className="relative flex flex-col bg-white rounded-lg p-5"
      style={{ boxShadow: '0px 1px 10px 1px #0000001A' }}
    >
      <Image
        src={image}
        className='object-cover w-full'
        quality={100}
        height={400}
        width={400}
        alt='success-image'
      />
      <h3 className="text-[#1D1D1D] text-xl font-medium mb-4 mt-4 uppercase">{title}</h3>
      <p className="text-[#1D1D1D] mb-2">{descp}</p>
    </div>
  )
}

export default SuccessSolutionCard;