import {
  Calendar,
  ClipboardCheck,
  Coffee,
  CreditCard,
  FileText,
  Headphones,
  Layout,
  Monitor,
  Search,
  Smartphone,
} from 'lucide-react'; // Import the icons you need
import Image from 'next/image';
import React from 'react';

import { GlobalInventoryImage } from '../../../../assets';
import palette from '../../../styles/pallette';

const leftInventoryCardData = [
  { title: 'responsive/ mobile friendly', Icon: Smartphone, bg: '#1D1D1D' },
  { title: 'template based design', Icon: Layout, bg: '#FA8145' },
  { title: 'google/bing search console', Icon: Search, bg: '#1D1D1D' },
  { title: 'contact form conversion tracking', Icon: FileText, bg: '#FA8145' },
  {
    title: 'easy online booking & cancellation',
    Icon: Calendar,
    bg: '#1D1D1D',
  },
];

const rightInventoryCardData = [
  {
    title: 'clear planning & costing of your packages',
    Icon: ClipboardCheck,
    bg: '#1D1D1D',
  },
  {
    title: 'secure and multiple payment gateway integration',
    Icon: CreditCard,
    bg: '#FA8145',
  },
  { title: 'excellent customer support', Icon: Headphones, bg: '#1D1D1D' },
  { title: 'utmost comfort level', Icon: Coffee, bg: '#FA8145' },
  {
    title: 'appealing both desktop & mobile user',
    Icon: Monitor,
    bg: '#1D1D1D',
  },
];

const InventoryCard: React.FC<{
  title: string;
  Icon: React.ElementType;
  bg: string;
  align: 'left' | 'right';
}> = ({ title, Icon, bg, align }) => {
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
          <Icon size={24} className={align === 'left' ? 'mr-3' : 'ml-3'} />
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
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-black font-bold text-center`}
      >
        Set your business apart with design and great{' '}
        <span className='text-orange-500'>global inventory</span>
      </h1>
      <div className='flex flex-col items-center justify-center xl:flex-row md:mx-10 mt-[50px] md:gap-4'>
        <div className='w-full md:w-auto'>
          {leftInventoryCardData.map(({ title, bg, Icon }, idx) => (
            <InventoryCard
              key={idx}
              title={title}
              Icon={Icon}
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
          {rightInventoryCardData.map(({ title, bg, Icon }, idx) => (
            <InventoryCard
              key={idx}
              title={title}
              Icon={Icon}
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
