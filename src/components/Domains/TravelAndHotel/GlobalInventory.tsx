import Image, { StaticImageData } from 'next/image';
import React from 'react';

import { travelandhotelAssets } from '../../../../assets';
import { getStaticImageData } from '../../../utils/helper';

const leftInventoryCardData = [
  {
    title: 'responsive/ mobile friendly',
    icon: getStaticImageData(travelandhotelAssets.mobileIcon),
    bg: '#1D1D1D',
  },
  {
    title: 'template based design',
    icon: getStaticImageData(travelandhotelAssets.templateIcon),
    bg: '#FA8145',
  },
  {
    title: 'google/bing search console',
    icon: getStaticImageData(travelandhotelAssets.searchIcon),
    bg: '#1D1D1D',
  },
  {
    title: 'contact form conversion tracking',
    icon: getStaticImageData(travelandhotelAssets.trackingIcon),
    bg: '#FA8145',
  },
  {
    title: 'easy online booking & cancellation',
    icon: getStaticImageData(travelandhotelAssets.bookingIcon),
    bg: '#1D1D1D',
  },
];

const rightInventoryCardData = [
  {
    title: 'clear planning & costing og your packages',
    icon: getStaticImageData(travelandhotelAssets.planningIcon),
    bg: '#1D1D1D',
  },
  {
    title: 'secure and multiple payment gateway integration',
    icon: getStaticImageData(travelandhotelAssets.secureIcon),
    bg: '#FA8145',
  },
  {
    title: 'excellent customer support',
    icon: getStaticImageData(travelandhotelAssets.customerIcon),
    bg: '#1D1D1D',
  },
  {
    title: 'utmost comfort levelg',
    icon: getStaticImageData(travelandhotelAssets.comfortIcon),
    bg: '#FA8145',
  },
  {
    title: 'appealing both desktop & mobile user',
    icon: getStaticImageData(travelandhotelAssets.desktopIcon),
    bg: '#1D1D1D',
  },
];

const InventoryCard: React.FC<{
  title: string;
  icon: StaticImageData;
  bg: string;
  align?: string;
}> = ({ title, icon, bg, align = 'right' }) => {
  return (
    <div
      className={`w-[450px] flex items-center bg-[${bg}] leading-none py-4 text-white uppercase font-medium text-lg rounded-md mb-3`}
    >
      {align === 'left' ? (
        <div className='flex justify-end w-full pr-3 p-2'>
          <div className='flex items-center'>
            <p className='pr-3'>{title}</p>
            <Image
              src={icon}
              height={24}
              width={24}
              alt='inventory-card-icon'
            />
          </div>
        </div>
      ) : (
        <div className='flex w-full pl-3 p-2'>
          <div className='flex items-center'>
            <Image
              src={icon}
              height={24}
              width={24}
              alt='inventory-card-icon'
            />
            <p className='pl-3'>{title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const GlobalInventory = () => {
  return (
    <div className='bg-[#1D1D1D0D] py-[100px]'>
      <h1 className='text-black text-3xl md:text-5xl lg:text-7xl xl:text-[85px] uppercase font-bold text-center'>
        set your business apart with design and great{' '}
        <span className='text-orange-500'>global inventory</span>
      </h1>
      <div className='flex flex-col items-center justify-center  xl:flex-row mx-2 mt-[100px] gap-4'>
        <div>
          {leftInventoryCardData.map(({ title, bg, icon }, idx) => (
            <InventoryCard
              key={idx}
              title={title}
              icon={icon}
              bg={bg}
              align='left'
            />
          ))}
        </div>
        <div className='-mt-2'>
          <Image src={travelandhotelAssets.WhatWeDo2} alt='' width={400} height={420} className='w-[400px] h-[420px]' />
        </div>
        <div>
          {rightInventoryCardData.map(({ title, bg, icon }, idx) => (
            <InventoryCard key={idx} title={title} icon={icon} bg={bg} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalInventory;
