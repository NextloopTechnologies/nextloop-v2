import { StaticImageData } from 'next/image';
import React from 'react';

interface BoxData {
  icon: StaticImageData;
  title: string;
}

interface BoxGridProps {
  data: BoxData[];
  BoxComponent: React.FC<BoxData>;
  className?: string;
}

const BoxGrid: React.FC<BoxGridProps> = ({ data, BoxComponent, className }) => {
  return (
    <div
      className={`flex flex-col items-center text-white uppercase font-bold ${className}`}
    >
      <div className='flex flex-col md:flex-row md:flex-wrap md:justify-center items-center space-y-20 md:space-y-0 md:space-x-20 gap-5 md:gap-0'>
        {data.map(({ icon, title }, idx) => (
          <BoxComponent key={idx} title={title} icon={icon} />
        ))}
      </div>
    </div>
  );
};

export default BoxGrid;
