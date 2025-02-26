import { StaticImageData } from 'next/image';

import ToolBox from './Domains/Restaurant/ToolBox';
import palette from '../styles/pallette';

interface IconTitleDescriptionProps {
  data: {
    descp: string;
    id: number;
    icon: StaticImageData;
    title: string;
  }[];
}

const IconTitleDescription: React.FC<IconTitleDescriptionProps> = ({
  data,
}) => {
  return (
    <div className='relative flex flex-col px-14 md:px-32 lg:px-40 z-[2]'>
      <h3
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-black font-bold leading-none uppercase text-center mb-10 mt-10`}
      >
        WHY <span className='text-orange-500'>CHOOSE US</span>
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 w-full gap-14 mb-40'>
        {data?.map(({ descp, id, icon, title }) => (
          <ToolBox key={id} icons={icon} title={title} descp={descp} />
        ))}
      </div>
    </div>
  );
};

export default IconTitleDescription;
