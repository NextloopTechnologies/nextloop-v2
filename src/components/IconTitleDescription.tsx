import { StaticImageData } from 'next/image';

import ToolBox from './Domains/Restaurant/ToolBox';
import palette from '../styles/pallette';

type IconLike = StaticImageData | string | React.ReactNode | React.ElementType;

interface IconTitleDescriptionProps {
  headingData?: {
    heading: string;
    coloredHeading: string;
    description?: string;
  };
  data: {
    descp: string;
    id: number;
    icon: IconLike;
    title: string;
  }[];
}

const IconTitleDescription: React.FC<IconTitleDescriptionProps> = ({
  data,
  headingData,
}) => {
  return (
    <div className='relative flex flex-col px-14 md:px-32 lg:px-40 z-[2] py-20'>
      <h2
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-black font-bold leading-none text-center mb-4 mt-10`}
      >
        {headingData?.heading}
        <span className='text-orange-500'>{headingData?.coloredHeading}</span>
      </h2>

      {headingData?.description && (
        <p className='text-center text-gray-600 mb-10'>
          {headingData.description}
        </p>
      )}

      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 w-full gap-14'>
        {data?.map(({ descp, id, icon, title }) => (
          <ToolBox key={id} icons={icon} title={title} descp={descp} />
        ))}
      </div>
    </div>
  );
};

export default IconTitleDescription;
