import React from 'react';

import {
  NotJustAPartnerData,
  PartnerItem,
} from '../pages/services/BaseServicePages';

interface NotJustAPartnerProps {
  data?: NotJustAPartnerData;
}

const PartnerCard = ({ item }: { item: PartnerItem }) => {
  const Icon = item.icon;

  return (
    <div className='relative flex flex-col items-center'>
      <div className='w-20 h-20 bg-[#FA8145] rounded-full flex items-center justify-center relative z-10 mb-[-60px] mr-[150px] shadow-md'>
        <Icon className='w-7 h-7 text-white' />
      </div>

      <div className='w-64 h-64 bg-[#1D1E18] rounded-full flex flex-col items-center justify-center px-6 text-center relative z-0'>
        <div className='h-6' />
        <h3 className='text-white font-bold text-base leading-snug mb-3'>
          {item.title}
        </h3>
        <p className='text-gray-400 text-xs leading-relaxed'>
          {item.description}
        </p>
      </div>
    </div>
  );
};

export const NotJustAPartner = ({ data }: NotJustAPartnerProps) => {
  if (!data?.items || data.items.length < 3) return null;

  const { heading, coloredHeading, items } = data;
  const [item1, item2, item3] = items;
  if (!item1 || !item2 || !item3) return null;

  return (
    <section className='bg-[#F4F4F4] py-16 px-6 md:px-12 lg:px-20 font-sans flex flex-col items-center text-center'>
      <h2 className='text-2xl md:text-4xl font-bold text-gray-900 leading-tight text-center mb-12 md:mb-16 max-w-3xl mx-auto'>
        {heading}
        <span className='text-[#FA8145]'> {coloredHeading}</span>
      </h2>

      <div className='flex flex-col gap-8 items-center lg:hidden'>
        {items.map((item, i) => (
          <PartnerCard key={i} item={item} />
        ))}
      </div>

      <div className='hidden lg:flex items-center justify-center max-w-5xl mx-auto'>
        <div className='relative flex-1 flex items-center justify-between gap-10'>
          <div className='relative z-10'>
            <PartnerCard item={item1} />
          </div>
          <div className='relative z-10'>
            <PartnerCard item={item2} />
          </div>
          <div className='relative z-10'>
            <PartnerCard item={item3} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotJustAPartner;
