import Image from 'next/image';
import React from 'react';

import ToolBox from '../../Restaurant/ToolBox';
import { oilAndGasAssets } from '../../../../../assets';
import palette from '../../../../styles/pallette';
import { getStaticImageData } from '../../../../utils/helper';

const data = [
  {
    id: 1,
    title: 'Visionary',
    descp: 'Nextloop gives best vision for your business',
    icon: getStaticImageData(oilAndGasAssets.visionaryIcon),
  },
  {
    id: 2,
    title: 'Rapid',
    descp:
      'Create software especially for your enterprise – delivered 6x faster.',
    icon: getStaticImageData(oilAndGasAssets.rapidIcon),
  },
  {
    id: 3,
    title: 'Transparent',
    descp: 'Get a guaranteed price and set timings upfront – calculated by AI.',
    icon: getStaticImageData(oilAndGasAssets.transparentIcon),
  },
  {
    id: 4,
    title: 'Simple & Trusted',
    descp:
      'Relieve pressure on your internal resources – fully project managed.',
    icon: getStaticImageData(oilAndGasAssets.trustedIcon),
  },
];

const TransformYourBusiness = () => {
  return (
    <div className='h-full relative bg-[#010103] '>
      <Image
        src={oilAndGasAssets.onlineBusinessBg}
        className='absolute inset-0 w-full h-full object-cover z-[1]'
        alt='online-business-background'
        fill
        sizes='100vw'
        quality={100}
        priority
      />
      <div className='relative flex flex-col px-14 md:px-24 lg:px-12 z-[2]'>
        <h1
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-white font-bold leading-none uppercase text-center mb-10 mt-10`}
        >
          Transform your business <span className='text-orange-500'>today</span>
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-14 mb-40'>
          {data?.map(({ descp, id, icon, title }) => (
            <ToolBox key={id} icons={icon} title={title} descp={descp} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransformYourBusiness;
