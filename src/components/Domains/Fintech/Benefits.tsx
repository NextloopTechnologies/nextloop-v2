// Importing the required icons from lucide-react
import {
  BarChart2,
  Cloud,
  Cpu,
  FileText,
  GitBranch,
  Settings,
} from 'lucide-react';
import { Columns3 } from 'lucide-react';
import React from 'react';

import palette from '../../../styles/pallette';
type BoxProps = {
  icon: React.ReactNode; // Now using ReactNode since we're passing Lucide icons
  title: string;
};

const orangeBoxData: BoxProps[] = [
  {
    icon: <FileText size={32} />, // Using Lucide icon components
    title: 'customized reports',
  },
  {
    icon: <Cpu size={32} />,
    title: 'design infrastructure',
  },
  {
    icon: <Cloud size={32} />,
    title: 'On demand updates',
  },
];

const blackBoxData: BoxProps[] = [
  {
    icon: <BarChart2 size={32} />,
    title: 'On demand updates',
  },
  {
    icon: <Settings size={32} />,
    title: 'custom integration',
  },
  {
    icon: <Columns3 size={32} />,
    title: 'constant support',
  },
  {
    icon: <GitBranch size={32} />,
    title: 'development from scratch',
  },
];

const OrangeBox: React.FC<BoxProps> = ({ icon, title }) => {
  return (
    <div className='relative w-[180px] h-[180px] md:w-[180px] md:h-[180px] bg-[#FA8145] transform rotate-45 flex items-center justify-center rounded'>
      <div className='transform -rotate-45'>
        <div className='absolute -top-12 left-[40%] md:-top-12 md:left-[75px] py-2'>
          {icon}
        </div>
        <h3 className='text-center text-md md:text-xl mt-5'>{title}</h3>
      </div>
    </div>
  );
};

const BlackBox: React.FC<BoxProps> = ({ icon, title }) => {
  return (
    <div className='relative w-[180px] h-[180px] md:w-[180px] md:h-[180px] bg-[#1D1D1D] transform rotate-45 flex items-center justify-center rounded'>
      <div className='transform -rotate-45'>
        <div className='absolute -top-14 left-[40%] md:-top-12 md:left-[75px]'>
          {icon}
        </div>
        <h3 className='text-center text-sm md:text-xl'>{title}</h3>
      </div>
    </div>
  );
};

const Benefits: React.FC = () => {
  return (
    <div className='bg-white w-full'>
      <div className='flex flex-col text-center items-center'>
        <h1
          className={`text-black ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} uppercase font-bold text-center mb-10`}
        >
          benefits
        </h1>
        <p
          className={`text-black ${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} xl:mx-[150px] mx-10 md:mb-24 mb-10`}
        >
          In a highly competitive business world, originality and uniqueness
          have become critical factors for successful business development.
          That’s why modern companies are increasingly using only software
          solutions that fully consider all the individual features of their
          projects. When it comes to fintech software development, custom
          solutions can be more cost-effective as fintech is highly
          technological. That’s why it can be the best option for you. Moreover,
          financial custom software development can boost fintech’s digital
          acceleration. Find out the significant benefits of custom software
          development in our article.
        </p>
      </div>
      <div className='flex flex-col items-center text-white uppercase font-bold md:mb-14 md:gap-1 gap-20 py-10'>
        <div className='flex flex-col md:flex-row md:flex-wrap md:justify-center items-center space-y-20 md:space-y-0 md:space-x-20 gap-5 md:gap-0'>
          {orangeBoxData?.map(({ icon, title }, idx) => (
            <OrangeBox key={idx} title={title} icon={icon} />
          ))}
        </div>
        <div className='flex flex-col md:flex-row md:flex-wrap md:justify-center items-center space-y-20 md:space-y-0 md:space-x-20 mt-5 md:-mt-8 gap-5 md:gap-0'>
          {blackBoxData?.map(({ icon, title }, idx) => (
            <BlackBox key={idx} title={title} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
