import Image, { StaticImageData } from 'next/image';
import React from 'react';

import { fintechAssets } from '../../../../assets';
import palette from '../../../styles/pallette';
import { getStaticImageData } from '../../../utils/helper';

type BoxProps = {
  icon: StaticImageData;
  title: string;
};

const orangeBoxData: BoxProps[] = [
  {
    icon: getStaticImageData(fintechAssets.reportIcon),
    title: 'customized reports',
  },
  {
    icon: getStaticImageData(fintechAssets.infrastructureIcon),
    title: 'design infrastrusture',
  },
  {
    icon: getStaticImageData(fintechAssets.updatesIcon),
    title: 'On demand updates',
  },
];

const blackBoxData: BoxProps[] = [
  {
    icon: getStaticImageData(fintechAssets.graphIcon),
    title: 'On demand updates',
  },
  {
    icon: getStaticImageData(fintechAssets.settingIcon),
    title: 'custom integration',
  },
  {
    icon: getStaticImageData(fintechAssets.supportIcon),
    title: 'constant support',
  },
  {
    icon: getStaticImageData(fintechAssets.developmentIcon),
    title: 'development from  scratch',
  },
];

const OrangeBox: React.FC<BoxProps> = ({ icon, title }) => {
  return (
    <div className='relative w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[180px] md:h-[180px] bg-[#FA8145] transform rotate-45 flex items-center justify-center rounded'>
      <div className='transform -rotate-45'>
        <div className='absolute -top-8 left-[30px] sm:-top-10 sm:left-[45px] md:-top-12 md:left-[75px] py-2'>
          <Image src={icon} height={32} width={32} alt='orange-box-icon' />
        </div>
        <h3 className='text-center text-xs sm:text-sm md:text-xl mt-3'>
          {title}
        </h3>
      </div>
    </div>
  );
};
const BlackBox: React.FC<BoxProps> = ({ icon, title }) => {
  return (
    <div className='relative w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[180px] md:h-[180px] bg-[#1D1D1D] transform rotate-45 flex items-center justify-center rounded'>
      <div className='transform -rotate-45'>
        <div className='absolute -top-8 left-[30px] sm:-top-10 sm:left-[45px] md:-top-12 md:left-[75px] py-2'>
          <Image src={icon} height={32} width={32} alt='black-box-icon' />
        </div>
        <h3 className='text-center text-xs sm:text-sm md:text-xl mt-3'>
          {title}
        </h3>
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
          projects. When it comes to Fintech software development, custom
          solutions can be more cost-effective as Fintech is highly
          technological. That’s why it can be the best option for you. Moreover,
          financial custom software development can boost Fintech’s digital
          acceleration. Find out the significant benefits of custom software
          development in our article.
        </p>
      </div>
      <div className='flex flex-col items-center text-white uppercase font-bold mb-14'>
        <div className='flex flex-col md:flex-row md:flex-wrap md:justify-center items-center space-y-5 md:space-y-0 md:space-x-5'>
          {orangeBoxData?.map(({ icon, title }, idx) => (
            <OrangeBox key={idx} title={title} icon={icon} />
          ))}
        </div>
        <div className='flex flex-col md:flex-row md:flex-wrap md:justify-center items-center space-y-5 md:space-y-0 md:space-x-5 mt-5 md:-mt-8'>
          {blackBoxData?.map(({ icon, title }, idx) => (
            <BlackBox key={idx} title={title} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
