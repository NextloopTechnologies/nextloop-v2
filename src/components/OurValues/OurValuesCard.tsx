import React, { FC } from 'react';
// import { Services1 } from '../../assets';
import Image from 'next/image';

import palette from '../../styles/pallette';

interface ServiceCardProps {
  heading: string;
  image: string;
}
const OurServieceCard: FC<ServiceCardProps> = ({ heading, image }) => {
  return (
    <div className=' mx-auto bg-card border border-border rounded-sm shadow-lg p-3 flex justify-start items-start flex-col'>
      <div className=' w-full flex flex-col justify-start items-start'>
        <div className=' w-20 h-20 mx-auto'>
          <Image
            // width={60}
            // height={60}
            src={image}
            alt={image}
            className='w-full h-full object-contain '
          />
        </div>
        <h2
          className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} mx-auto font-semibold text-foreground text-center`}
        >
          {heading}
          <hr className='my-2 border border-1 border-orange-500 text-orange-500' />
        </h2>
      </div>
      <div className=''>
        <p
          className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop} text-muted-foreground text-center`}
        >
          {/* {desc} */}
          It symbolizes our commitment to continuous improvement, adapting to
        evolving technologies, and pushing boundaries to meet our clients'
        needs.
        </p>
      </div>{' '}
    </div>
  );
};

export default OurServieceCard;
