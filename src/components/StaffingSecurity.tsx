import React from 'react';

import { SecurityData, SecurityItem } from '../pages/services/BaseServicePages';
import palette from '../styles/pallette';

interface StaffingSecurityProps {
  data: SecurityData;
}

const SecurityCard = ({ item }: { item: SecurityItem }) => {
  const Icon = item.icon;
  return (
    <div className='bg-white rounded-xl p-8 flex flex-col items-center text-center gap-4 shadow-sm'>
      <div className='w-14 h-14 rounded-full border-2 border-orange-400 flex items-center justify-center'>
        <Icon className='text-orange-500 w-6 h-6' />
      </div>
      <p className='font-bold text-sm text-gray-900'>{item.title}</p>
      <p className='text-sm text-gray-500 leading-relaxed'>
        {item.description}
      </p>
    </div>
  );
};

export const StaffingSecurity = ({ data }: StaffingSecurityProps) => {
  return (
    <div className='bg-zinc-900 py-16 px-6 md:px-16 lg:px-24'>
      <h2
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-white font-bold leading-tight text-center mb-12`}
      >
        {data.heading}
      </h2>
      <div className='max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10'>
        {data.items.map((item: SecurityItem, i: number) => (
          <SecurityCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default StaffingSecurity;
