import React from 'react';

import StatCounter from '../StatCounter';
import { ServiceStatItem } from '../../types';

const ServiceStatStrip: React.FC<{ items: ServiceStatItem[] }> = ({
  items,
}) => {
  if (!items.length) return null;

  return (
    <section className='bg-black'>
      <div className='max-w-6xl mx-auto px-6 md:px-16 py-8 md:py-9'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10'>
          {items.map((item) => (
            <div key={item.label} className='pl-5 border-l-2 border-orange-500'>
              <StatCounter end={item.end} suffix={item.suffix} />
              <p className='mt-1 text-sm text-gray-400'>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceStatStrip;
