import Image, { StaticImageData } from 'next/image';
import React from 'react';

import palette from '../../styles/pallette';
import { healthcareAssets } from '../../../assets';

type HexagonBoxProps = {
  id: number;
  icon: StaticImageData;
  title: string;
  descp: string;
  height?: number;
  width?: number;
};

const HexagonBox: React.FC<HexagonBoxProps> = ({
  // id,
  icon,
  title,
  descp,
  height,
  width,
}) => {
  return (
    <div className='relative flex justify-center items-center'>
      <Image
        src={healthcareAssets.polygonImg}
        height={300}
        width={300}
        alt='ploygon-img'
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8'>
        {/* <p className="absolute left-6 top-[100px] text-gray-300 text-7xl font-bold">{id}</p> */}
        <Image src={icon} alt={title} width={width} height={height} />
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
