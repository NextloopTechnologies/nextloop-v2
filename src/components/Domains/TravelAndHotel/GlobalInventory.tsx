import Image, { StaticImageData } from 'next/image';
import React from 'react';

import bookingIcon from '../../../../assets/travelandhotel/bookingIcon.png';
import comfortIcon from '../../../../assets/travelandhotel/comfortIcon.png';
import customerIcon from '../../../../assets/travelandhotel/customerIcon.png';
import desktopIcon from '../../../../assets/travelandhotel/desktopIcon.png';
import mobileIcon from '../../../../assets/travelandhotel/mobileIcon.png';
import planningIcon from '../../../../assets/travelandhotel/planningIcon.png';
import searchIcon from '../../../../assets/travelandhotel/searchIcon.png';
import secureIcon from '../../../../assets/travelandhotel/secureIcon.png';
import templateIcon from '../../../../assets/travelandhotel/templateIcon.png';
import trackingIcon from '../../../../assets/travelandhotel/trackingIcon.png';
import { ECommWhatWeDo2 } from '../../../../assets';

const leftInventoryCardData = [
  {
    title: 'responsive/ mobile friendly',
    icon: mobileIcon,
    bg: '#1D1D1D',
  },
  {
    title: 'template based design',
    icon: templateIcon,
    bg: '#FA8145',
  },
  {
    title: 'google/bing search console',
    icon: searchIcon,
    bg: '#1D1D1D',
  },
  {
    title: 'contact form conversion tracking',
    icon: trackingIcon,
    bg: '#FA8145',
  },
  {
    title: 'easy online booking & cancellation',
    icon: bookingIcon,
    bg: '#1D1D1D',
  },
];

const rightInventoryCardData = [
  {
    title: 'clear planning & costing og your packages',
    icon: planningIcon,
    bg: '#1D1D1D',
  },
  {
    title: 'secure and multiple payment gateway integration',
    icon: secureIcon,
    bg: '#FA8145',
  },
  {
    title: 'excellent customer support',
    icon: customerIcon,
    bg: '#1D1D1D',
  },
  {
    title: 'utmost comfort levelg',
    icon: comfortIcon,
    bg: '#FA8145',
  },
  {
    title: 'appealing both desktop & mobile user',
    icon: desktopIcon,
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
          <Image src={ECommWhatWeDo2} alt='' className='w-[400px] h-[420px]' />
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
