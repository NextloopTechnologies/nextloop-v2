import Image from 'next/image';
import React from 'react';

import palette from '../../styles/pallette';
import { healthcareAssets } from '../../../assets';

type HexagonBoxProps = {
  id: number;
  icon: React.ReactNode;
  title: string;
  descp: string;
};

const HexagonBox: React.FC<HexagonBoxProps> = ({
  icon,
  title,
  descp,
}) => {
  return (
    <div className='relative flex justify-center items-center'>
      {/* Background hexagon image */}
      <Image
        src={healthcareAssets.polygonImg}
        height={300}
        width={300}
        alt='polygon-img'
      />

      {/* Content */}
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8'>
        {/* Icon (Lucide SVG or other ReactNode) */}
        <div className="flex items-center justify-center">
          {icon}
        </div>

        <h3
          className={`font-bold text-[#1D1D1D] px-8 mt-5 ${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop}`}
        >
          {title}
        </h3>

        <p
          className={`mt-2 mb-2 text-[#1D1D1D] ${palette.fontSize.descriptionSmall.mobile} md:${palette.fontSize.descriptionSmall.desktop}`}
        >
          {descp}
        </p>
      </div>
    </div>
  );
};

export default HexagonBox;
