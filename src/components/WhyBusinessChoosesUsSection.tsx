import Image, { StaticImageData } from 'next/image';

import palette from '../styles/pallette';

export interface WhyBusinessChoosesUsItem {
  id: number;
  title: string;
  description?: string;
}

export interface WhyBusinessChoosesUsData {
  headingData: {
    heading: string;
    coloredHeading: string;
    description: string;
  };
  heroImage?: StaticImageData;
  items: WhyBusinessChoosesUsItem[];
}

const WhyBusinessChoosesUsSection: React.FC<{
  whyChooseUsData: WhyBusinessChoosesUsData;
}> = ({ whyChooseUsData }) => {
  return (
    <div className='relative flex flex-col items-center text-center py-20 min-h-fit w-full bg-black overflow-hidden'>
      {whyChooseUsData?.heroImage && (
        <Image
          src={whyChooseUsData.heroImage}
          alt='Background'
          fill
          priority
          className='object-cover object-bottom brightness-110 mix-blend-normal'
        />
      )}

      <div className='relative z-10 w-full flex flex-col items-center px-4 max-w-6xl'>
        <h3
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-white font-bold uppercase mb-16`}
        >
          {whyChooseUsData.headingData.heading}
          <span className='text-orange-500'>
            {whyChooseUsData.headingData.coloredHeading}
          </span>
        </h3>

        {whyChooseUsData.headingData.description && (
          <p className='text-gray-400 mt-4 mb-12 max-w-2xl'>
            {whyChooseUsData.headingData.description}
          </p>
        )}

        <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
          {whyChooseUsData.items?.map((item) => (
            <div
              key={item.id}
              className='flex flex-col justify-center items-center bg-black/40 border border-gray-700 rounded-2xl px-6 py-10 text-white transition-all duration-200 hover:border-orange-500'
            >
              <span className='text-4xl font-bold mb-2'>{item.title}</span>
              <span className='text-sm font-medium text-gray-300'>
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyBusinessChoosesUsSection;
