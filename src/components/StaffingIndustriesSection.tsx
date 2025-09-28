import Image, { StaticImageData } from 'next/image';

import palette from '../styles/pallette';

interface StaffingItems {
  id: number;
  title: string;
  image?: StaticImageData;
}

export interface StaffingData {
  headingData: {
    heading: string;
    coloredHeading: string;
    description: string;
  };
  items: StaffingItems[];
}

const StaffingIndustriesSection: React.FC<{ industriesData: StaffingData }> = ({
  industriesData,
}) => {
  return (
    <div className='flex flex-col items-center text-center min-h-fit w-full md:max-w-6xl mx-auto my-8 md:my-16 md:rounded-3xl'>
      <h3
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold uppercase`}
      >
        {industriesData.headingData.heading}
        <span className='text-orange-500'>
          {industriesData.headingData.coloredHeading}
        </span>
      </h3>

      <p className='text-gray-400 mt-4 mb-12'>
        {industriesData.headingData.description}
      </p>

      <div className='w-full mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 p-4'>
        {industriesData.items?.map((cat) => (
          <button
            key={cat.id}
            className='group flex items-center justify-between rounded-xl border px-4 py-3 transition-all duration-200 shadow-sm 
                       bg-white text-black hover:bg-black hover:text-white'
          >
            <div className='flex items-center gap-3'>
              {cat.image && (
                <Image
                  src={cat.image.src}
                  alt={cat.title}
                  width={26}
                  height={26}
                  className='transition-all duration-200 group-hover:invert'
                />
              )}
              <span className='text-sm font-medium text-left'>{cat.title}</span>
            </div>
            <span className='text-lg font-bold'>›</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StaffingIndustriesSection;
