import React from 'react';
import Image from 'next/image';
import onlineBusinessBg from "../../../../../assets/onlineBusinessBg.png"
import ToolBox from '../../Restaurant/ToolBox';
import visionaryIcon from "../../../../../assets/oilandGasOnlineBusinessVisionaryIcon.png";
import rapidIcon from "../../../../../assets/oilandGasOnlineBusinessRapidIcon.png";
import transparentIcon from "../../../../../assets/oilandGasOnlineBusinessTransparentIcon.png";
import trustedIcon from "../../../../../assets/oilandGasOnlineBusinessTrustedIcon.png";

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
    <div className='bg-[#010103] relative flex justify-center items-center min-h-screen'>
      <Image
        src={onlineBusinessBg}
        className='w-full h-full object-cover'
        alt='online-business-background'
        quality={100}
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 '>
        <h1 className='text-white md:text-6xl lg:text-7xl xl:text-[85px] font-bold text-3xl leading-none uppercase text-center mb-8 mt-14'>
          Transform your business{' '}
          <span className='text-orange-500'>today</span>
        </h1>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl lg:py-14 mb-14'>
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