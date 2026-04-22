'use client';

import Image, { StaticImageData } from 'next/image';
import React from 'react';

type ImageLike = StaticImageData | string | React.ReactNode | React.ElementType;

interface LogoItem {
  title: string;
  image?: ImageLike;
}

export interface TrustedPartnersData {
  headingData: {
    heading: string;
    coloredHeading: string;
    description: string;
  };
  items: LogoItem[];
}

const LogoCard: React.FC<{ item: LogoItem }> = ({ item }) => {
  const renderImage = () => {
    if (!item.image) return null;

    if (React.isValidElement(item.image)) return item.image;

    if (typeof item.image === 'object' && (item.image as StaticImageData).src) {
      return (
        <Image
          src={item.image as StaticImageData}
          height={120}
          width={120}
          alt={item.title}
          className='h-[120px] w-[120px] object-contain'
        />
      );
    }

    if (typeof item.image === 'string') {
      return (
        <Image
          src={item.image}
          height={120}
          width={120}
          alt={item.title}
          className='h-[120px] w-[120px] object-contain'
        />
      );
    }

    return null;
  };

  return (
    <div
      title={item.title}
      className='flex items-center justify-center w-[120px] h-[120px] rounded-2xl border border-gray-200 bg-white p-3 shadow-sm '
    >
      {renderImage()}
    </div>
  );
};
const TrustedPartnersSection: React.FC<{
  data: TrustedPartnersData;
}> = ({ data }) => {
  const row1 = data.items.slice(0, Math.ceil(data.items.length));

  return (
    <section className='relative w-full py-16 px-4 flex flex-col items-center text-center overflow-hidden bg-white'>
      <h2 className='relative text-[1.75rem] md:text-[2.25rem] font-bold text-gray-900 leading-tight tracking-tight'>
        {data.headingData.heading}
        <span className='text-orange-500'>
          {data.headingData.coloredHeading}
        </span>
      </h2>

      <div className='mt-4 mb-10 h-0.5 w-10 rounded-full bg-orange-400' />

      <div className='flex flex-wrap justify-center gap-9 max-w-5xl'>
        {row1.map((item, i) => (
          <LogoCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
};

export default TrustedPartnersSection;
