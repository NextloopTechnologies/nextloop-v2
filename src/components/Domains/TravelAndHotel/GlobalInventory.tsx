import Image, { StaticImageData } from 'next/image';
import React from 'react';

import { travelandhotelAssets } from '../../../../assets';
import { GlobalInventoryImage } from '../../../../assets';
import palette from '../../../styles/pallette';
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
    title: 'clear planning & costing of your packages',
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
    title: 'utmost comfort level',
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
  align: 'left' | 'right';
}> = ({ title, icon, bg, align }) => {
  return (
    <div
      className={`w-full md:w-[450px] flex bg-[${bg}] leading-none py-4 text-white uppercase text-sm rounded-md mb-2 ml-2`}
    >
      <div
        className={`flex ${
          align === 'left' ? 'flex-row' : 'flex-row-reverse'
        } w-full p-2`}
      >
        <div className='flex items-center px-4'>
          <Image
            src={icon}
            height={24}
            width={24}
            alt='inventory-card-icon'
            className={align === 'left' ? 'mr-3' : 'ml-3'}
          />
          <p className={`text-left ${align === 'left' ? 'pl-3' : 'pr-3'}`}>
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

const GlobalInventory = () => {
  return (
    <div className='pb-5 px-10'>
      <h1
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-black uppercase font-bold text-center`}
      >
        set your business apart with design and great{' '}
        <span className='text-orange-500'>global inventory</span>
      </h1>
      <div className='flex flex-col items-center justify-center xl:flex-row md:mx-10 mt-[50px] md:gap-4'>
        <div className='w-full md:w-auto'>
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
        <div className='hidden md:block -mt-2'>
          <Image
            src={GlobalInventoryImage.src}
            alt=''
            width={500}
            height={500}
            className='w-full h-full'
          />
        </div>
        <div className='w-full md:w-auto'>
          {rightInventoryCardData.map(({ title, bg, icon }, idx) => (
            <InventoryCard
              key={idx}
              title={title}
              icon={icon}
              bg={bg}
              align='left'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalInventory;
