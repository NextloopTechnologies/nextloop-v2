import React from 'react';

import {
  TechTalentData,
  TechTalentItem,
} from '../pages/services/BaseServicePages';
import palette from '../styles/pallette';

interface TechTalentProps {
  data?: TechTalentData;
}

// Proper hexagon using SVG so shape is always correct regardless of screen size
const HexagonCard = ({ item }: { item: TechTalentItem }) => {
  const Icon = item.icon;

  return (
    <div className='relative flex items-center justify-center w-36 h-40 md:w-44 md:h-48 shrink-0'>
      {/* SVG hexagon background */}
      <svg
        viewBox='0 0 100 115'
        className='absolute inset-0 w-full h-full'
        xmlns='http://www.w3.org/2000/svg'
      >
        <polygon
          points='50,2 98,27 98,88 50,113 2,88 2,27'
          className={
            item.color === 'dark'
              ? 'fill-[#1D1E18]'
              : item.color === 'orange'
              ? 'fill-[#FA8145]'
              : 'fill-[#1C5285]'
          }
        />
      </svg>

      {/* Label badge — top center */}
      <span className='absolute top-3 left-1/2 -translate-x-1/2 bg-white text-gray-900 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center z-10'>
        {item.label}
      </span>

      {/* Icon centered */}
      <Icon className='relative z-10 w-9 h-9 md:w-10 md:h-10 text-white mt-3' />
    </div>
  );
};

const ConnectorDot = () => (
  <div className='w-3 h-3 rounded-full border-2 border-gray-400 bg-white shrink-0' />
);

const ConnectorLine = () => (
  <div className='h-px w-8 md:w-14 bg-gray-300 shrink-0' />
);

// Mobile card — stacked list
const MobileCard = ({ item }: { item: TechTalentItem }) => {
  const Icon = item.icon;
  const isOrange = item.color === 'orange';
  return (
    <div className='flex items-start gap-4 p-4 border border-gray-100 rounded-xl shadow-sm'>
      <div
        className={`w-12 h-12 shrink-0 flex items-center justify-center rounded-full text-white ${
          item.color === 'dark'
            ? 'bg-[#1D1E18]'
            : item.color === 'orange'
            ? 'bg-[#FA8145]'
            : 'bg-[#1C5285]'
        }`}
      >
        <Icon className='w-5 h-5' />
      </div>
      <div className='text-left'>
        <p
          className={`font-bold text-sm ${
            isOrange ? 'text-orange-500' : 'text-gray-900'
          }`}
        >
          {item.title}
        </p>
        <p className='text-xs text-gray-500 mt-1 leading-relaxed'>
          {item.description}
        </p>
      </div>
    </div>
  );
};

export const TechTalent = ({ data }: TechTalentProps) => {
  if (!data?.items || data.items.length < 3) return null;

  const { headingData, items } = data;
  const [itemA, itemB, itemC] = items;
  if (!itemA || !itemB || !itemC) return null;

  return (
    <div className='bg-white px-6 md:px-16 lg:px-24 py-16 font-sans text-center'>
      <h2
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold text-gray-900 leading-tight mb-4`}
      >
        {headingData.heading}
        <span className='text-orange-500'>{headingData.coloredHeading}</span>
      </h2>
      <p className='text-gray-400 mt-4 mb-12'>{headingData.description}</p>

      <div className='flex flex-col gap-4 lg:hidden'>
        {items.map((item, i) => (
          <MobileCard key={i} item={item} />
        ))}
      </div>

      <div className='hidden lg:flex flex-col items-center max-w-5xl mx-auto'>
        <div className='flex items-center justify-center w-full mb-[-20px] mr-20 relative z-10'>
          <div className='w-52 lg:w-64 text-right'>
            <p className='font-bold text-sm text-gray-900'>{itemA.title}</p>
            <p className='text-xs text-gray-500 mt-1 leading-relaxed'>
              {itemA.description}
            </p>
          </div>
          <ConnectorLine />
          <ConnectorDot />
          <div className='mx-4'>
            <HexagonCard item={itemA} />
          </div>
          <div className='w-52 lg:w-64' />
        </div>

        <div className='flex items-center justify-center w-full'>
          <div className='w-52 lg:w-64 text-right'>
            <p className='font-bold text-sm text-orange-500'>{itemB.title}</p>
            <p className='text-xs text-gray-500 mt-1 leading-relaxed'>
              {itemB.description}
            </p>
          </div>
          <ConnectorLine />
          <ConnectorDot />

          <div className='flex items-center mx-2 gap-10'>
            <div className='relative z-10 mr-[-22px]'>
              <HexagonCard item={itemB} />
            </div>
            <div className='relative z-0'>
              <HexagonCard item={itemC} />
            </div>
          </div>

          <ConnectorDot />
          <ConnectorLine />
          {/* Right text for C */}
          <div className='w-52 lg:w-64 text-left'>
            <p className='font-bold text-sm text-gray-900'>{itemC.title}</p>
            <p className='text-xs text-gray-500 mt-1 leading-relaxed'>
              {itemC.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechTalent;
