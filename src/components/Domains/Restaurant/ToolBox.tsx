import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface ToolBoxProps {
  title: string;
  descp: string;
  icons: StaticImageData;
  height?: number;
  width?: number;
}

const ToolBox: React.FC<ToolBoxProps> = ({
  title,
  descp,
  icons,
  height = 30,
  width = 30
}) => {
  return (
    <div
      className="flex flex-col items-center text-center p-4 bg-white rounded-lg"
      style={{ boxShadow: '0px 1px 10px 1px #0000001A' }}
    >
      <Image
        src={icons}
        height={height}
        width={width}
        alt='tools-icon'
        className='h-[70px] w-[70px] mt-6 mb-8 '
      />
      <h3 className="text-[#1D1D1D] lg:text-xl font-medium mb-4 uppercase">{title}</h3>
      <p className="text-[#1D1D1D] text-xs md:text-sm lg:text-base mb-5">{descp}</p>
    </div>
  )
}

export default ToolBox;