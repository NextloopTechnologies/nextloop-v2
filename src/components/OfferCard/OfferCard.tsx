import Image from 'next/image';
import React from 'react';

export interface OfferCardProps {
  title: string;
  description: string;
  icon: {
    src: string;
  };
  onClick: () => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  return (
    <div
      className='bg-gradient-to-l from-[#13326C] to-[#0082B1] text-white px-4 sm:p-6 lg:px-4 rounded-lg 
        hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1
        h-auto py-5'
      onClick={onClick}
    >
      <div className='flex flex-col'>
        <Image
          src={icon.src}
          alt={title}
          fill
          className='w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain'
        />
        <span className='font-bold block border-b-2 pb-2 border-white text-lg sm:text-xl w-full text-left'>
          {title}
        </span>
      </div>
      <p className='text-sm sm:text-base lg:text-md mt-2'>{description}</p>
    </div>
  );
};
