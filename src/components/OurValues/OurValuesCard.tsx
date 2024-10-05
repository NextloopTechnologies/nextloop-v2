// import { Services1 } from '../../assets';
import Image from 'next/image';
import React, { FC } from 'react';

interface ServiceCardProps {
  heading: string;
  image: string;
  desc: string;
}
const OurServieceCard: FC<ServiceCardProps> = ({ heading, image, desc }) => {
  return (
    <div className='max-w-sm mx-auto bg-card border border-border rounded-sm shadow-lg p-8 flex justify-start items-start flex-col'>
      <div className='h-34 w-full flex flex-col justify-start items-start'>
        <div className=' w-20 h-20 mx-auto'>
          <Image
            // width={60}
            // height={60}
            src={image}
            alt={image}
            className='w-full h-full object-contain '
          />
        </div>
        <h2 className='text-xl mx-auto font-semibold text-foreground text-center'>
          {heading}
          <hr className='my-2 border border-1 border-orange-500 text-orange-500' />
        </h2>
      </div>
      <div className=''>
        <p className='text-muted-foreground text-[14px] text-center'>{desc}</p>
      </div>{' '}
    </div>
  );
};

export default OurServieceCard;
