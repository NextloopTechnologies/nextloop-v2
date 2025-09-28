import Image, { StaticImageData } from 'next/image';

import palette from '../styles/pallette';

export interface ProcessItem {
  id: number;
  title: string;
  description?: string;
  image?: StaticImageData;
}

export interface ProcessSectionData {
  headingData: {
    heading: string;
    coloredHeading: string;
  };
  items: ProcessItem[];
}

const OurProcessSection: React.FC<{
  ourProcess: ProcessSectionData;
}> = ({ ourProcess }) => {
  return (
    <div className='flex flex-col items-center text-center min-h-fit w-full md:max-w-6xl mx-auto my-8 md:my-16 md:rounded-3xl'>
      <h3
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold uppercase mb-12`}
      >
        {ourProcess.headingData.heading}
        <span className='text-orange-500'>
          {ourProcess.headingData.coloredHeading}
        </span>
      </h3>

      <div className='flex flex-wrap justify-center gap-8 max-w-5xl mx-auto'>
        {ourProcess.items.map((item) => (
          <div
            key={item.id}
            className='flex flex-col items-center text-center space-y-4'
          >
            <div className='relative w-36 h-36 mx-auto'>
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className='object-contain'
                />
              )}
            </div>
            <h3 className='text-lg font-semibold text-black'>{item.title}</h3>
            <p className='text-gray-600 text-sm md:text-base max-w-xs'>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurProcessSection;
