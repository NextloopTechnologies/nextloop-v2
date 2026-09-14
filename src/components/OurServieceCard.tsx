import Image from 'next/image';
import React, { FC } from 'react';

import palette from '../styles/pallette';

interface ServiceCardProps {
  heading: string;
  image: string;
}

const OurServieceCard: FC<ServiceCardProps> = ({ heading, image }) => {
  return (
    <div className="group relative w-[250px] h-[170px] sm:w-[240px] sm:h-[190px] lg:w-[360px] lg:h-[210px] cursor-pointer">
  <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">

    <Image
      src={image}
      alt={heading}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-110"
      sizes="(max-width: 640px) 250px,(max-width: 1024px) 240px,360px"
    />

    <div className="absolute inset-0 bg-gradient-to-t blur-lg from-black/90 via-black/50 to-black/20" />

    <div className="absolute inset-0 flex items-center justify-center px-4">
      <h4 className={`text-white ${palette.fontSize.subtitle.mobile} font-bold text-center leading-snug`}>
        {heading}
      </h4>
    </div>

  </div>
</div>
  );
};

export default OurServieceCard;
