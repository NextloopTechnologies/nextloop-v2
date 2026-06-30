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
    descp:
      "We don't just build what you ask for. We help you think through what your operation genuinely needs, and bring a broader perspective to every project.",
    icon: getStaticImageData(oilAndGasAssets.visionaryIcon),
  },
  {
    id: 2,
    title: 'Rapid',
    descp:
      'Our AI-powered development process delivers enterprise-grade software up to six times faster than traditional approaches. Less waiting, faster results.',
    icon: getStaticImageData(oilAndGasAssets.rapidIcon),
  },
  {
    id: 3,
    title: 'Transparent',
    descp:
      'Your price and timeline are calculated and locked in before we start. No hidden costs, no moving goalposts. What we quote is what you pay — and if we finish early, you pay less.',
    icon: getStaticImageData(oilAndGasAssets.transparentIcon),
  },
  {
    id: 4,
    title: 'Simple & Trusted',
    descp:
      "We handle the full project lifecycle so your internal team doesn't have to. From scoping to deployment, we take the pressure off your resources and keep you informed every step of the way.",
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
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-white font-bold leading-none text-center mb-10 mt-10`}
        >
          The Nextloop<span className='text-orange-500'> Difference </span>
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-14 mb-20'>
          {data?.map(({ descp, id, icon, title }) => (
            <ToolBox key={id} icons={icon} title={title} descp={descp} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransformYourBusiness;
