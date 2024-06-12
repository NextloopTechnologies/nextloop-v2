import Image, { StaticImageData } from 'next/image';
import React from 'react';

import polygonImg from "../../../assets/healthcare/Polygon.png"

type HexagonBoxProps = {
  id: number;
  icon: StaticImageData;
  title: string;
  descp: string;
  height?: number;
  width?: number;
}

const HexagonBox: React.FC<HexagonBoxProps> = ({ 
  id, 
  icon, 
  title, 
  descp,
  height,
  width
}) => {
  return (
    <div className="relative flex justify-center items-center">
      <Image 
        src={polygonImg} 
        height={390}
        width={390}
        alt='ploygon-img' 
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8'>
        <p className="absolute left-6 top-[100px] text-gray-300 text-7xl font-bold">{id}</p>
        <Image 
          src={icon} 
          alt={title} 
          width={width} 
          height={height} 
        />
        <h3 className="font-bold text-[#1D1D1D] text-2xl px-8 mt-5">{title}</h3>
        <p className="text-[#1D1D1D] text-sm sm:text-lg mt-2 mb-2">{descp}</p>        
      </div>
    </div> 
  );
}

export default HexagonBox;
