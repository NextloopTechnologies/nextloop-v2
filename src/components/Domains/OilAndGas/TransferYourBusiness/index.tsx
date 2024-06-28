import Image from 'next/image';
import React from 'react';

import ToolBox from '../../Restaurant/ToolBox';
import rapidIcon from "../../../../../assets/oilandGasOnlineBusinessRapidIcon.png";
import transparentIcon from "../../../../../assets/oilandGasOnlineBusinessTransparentIcon.png";
import trustedIcon from "../../../../../assets/oilandGasOnlineBusinessTrustedIcon.png";
import visionaryIcon from "../../../../../assets/oilandGasOnlineBusinessVisionaryIcon.png";
import onlineBusinessBg from "../../../../../assets/onlineBusinessBg.png"

const data = [
  {
    id: 1,
    title: "Visionary",
    descp: "Nextloop gives best vision for your business",
    icon: visionaryIcon
  },
  {
    id: 2,
    title: "Rapid",
    descp: "Create software especially for your enterprise – delivered 6x faster.",
    icon: rapidIcon
  },
  {
    id: 3,
    title: "Transparent",
    descp: "Get a guaranteed price and set timings upfront – calculated by AI.",
    icon: transparentIcon
  },
  {
    id: 4,
    title: "Simple & Trusted",
    descp: "Relieve pressure on your internal resources – fully project managed.",
    icon: trustedIcon
  }
]

const TransformYourBusiness = () => {
  return (
    <div className='h-full relative bg-[#010103] '>
      <Image
        src={onlineBusinessBg}
        className='absolute inset-0 w-full h-full object-cover z-[1]'
        alt='online-business-background'
        quality={100}
      />
      {/* <div className='absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 z-[2]'> */}
      <div className='relative flex flex-col px-14 md:px-24 lg:px-12 z-[2]'>
        {/* <h1 className='text-white md:text-6xl lg:text-7xl xl:text-[85px] font-bold text-3xl leading-none uppercase text-center mb-8 mt-14'> */}
        <h1 className='text-white md:text-6xl lg:text-7xl xl:text-[85px] font-bold text-3xl leading-none uppercase text-center mb-24 mt-40'>
          Transform your business{' '}
          <span className='text-orange-500'>today</span>
        </h1>
        {/* <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl mb-14'> */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-14 mb-40'>
          {data?.map(({ descp, id, icon, title }) => (
            <ToolBox
              key={id}
              icons={icon}
              title={title}
              descp={descp}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TransformYourBusiness;