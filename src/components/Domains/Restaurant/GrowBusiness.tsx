import React from 'react'

import ToolBox from './ToolBox'
import { restaurantAssets } from '../../../../assets'
import { getStaticImageData } from '../../../utils/helper'

const growBusinessData = [
  {
    icon: getStaticImageData(restaurantAssets.toolsIcon1),
    title: 'Expand your reach',
    descp: 'Serve more customers with on-demand delivery integration.'
  },
  {
    icon: getStaticImageData(restaurantAssets.toolsIcon2),
    title: 'Reward repeat customers',
    descp: 'Build a strong customer base with an easily customizable loyalty program.'
  },
  {
    icon: getStaticImageData(restaurantAssets.toolsIcon3),
    title: 'Boost your visibility',
    descp: 'Get a suite of built-in marketing tools to grow and promote your business.'
  }
]

const GrowBusiness = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-center py-[112px] mx-auto gap-[109px]'>
      <h1 className='font-bold text-3xl uppercase md:text-6xl lg:text-7xl xl:text-8xl sm:text-4xl w-full mb-[25px]'>
        The tools you need to grow your{' '}
        <span className='text-orange-500'>business</span>
      </h1>
      <div className='container flex flex-col items-center mx-auto p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-[75px] mt-[45px]'>
          {growBusinessData.map(({ icon, title, descp }, idx) => (
            <ToolBox
              key={idx}
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

export default GrowBusiness