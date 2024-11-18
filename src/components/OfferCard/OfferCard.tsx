import React from 'react';

export interface OfferCardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  icon,
  title,
  description,
  onClick,
}) => {
  return (
    <div
      className='bg-gradient-to-l from-[#13326C] to-[#0082B1] text-white p-4 sm:p-6 lg:p-8 rounded-lg 
        hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1
        h-[280px] sm:h-[300px] flex flex-col justify-between'
      onClick={onClick}
    >
      <div className='flex flex-col items-start'>
        <img
          src={icon}
          alt={title}
          className='mb-4 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain'
        />
        <span className='font-bold block border-b-2 pb-3 sm:pb-4 lg:pb-5 border-white text-lg sm:text-xl w-full text-left'>
          {title}
        </span>
      </div>
      <p className='text-sm sm:text-base lg:text-md text-left'>{description}</p>
    </div>
  );
};
