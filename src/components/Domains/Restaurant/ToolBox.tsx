import React from 'react';
import palette from '../../../styles/pallette';

interface ToolBoxProps {
  title: string;
  descp: string;
  icons: React.ReactNode; // Lucide SVG
}

const ToolBox: React.FC<ToolBoxProps> = ({ title, descp, icons }) => {
  return (
    <div
      className='flex flex-col items-center text-center p-4 bg-white rounded-lg'
      style={{ boxShadow: '0px 1px 10px 1px #0000001A' }}
    >
      {/* Orange rounded bg + white icon */}
      <div className='mt-6 mb-8 h-[80px] w-[80px] flex items-center justify-center rounded-full bg-orange-500 shadow-md'>
        <div className='text-white'>{icons}</div>
      </div>

      <h3
        className={`${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop} text-[#1D1D1D] mb-4 uppercase`}
      >
        {title}
      </h3>

      <p
        className={`${palette.fontSize.descriptionSmall.mobile} md:${palette.fontSize.descriptionSmall.desktop} text-[#1D1D1D] mb-5`}
      >
        {descp}
      </p>
    </div>
  );
};

export default ToolBox;
