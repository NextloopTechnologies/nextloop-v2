import React from 'react';

import {
  StaffProcessData,
  StaffProcessStep,
} from '../pages/services/BaseServicePages';

interface StaffProcessProps {
  data?: StaffProcessData;
}

const StepCard = ({
  item,
  isLast,
}: {
  item: StaffProcessStep;
  isLast: boolean;
}) => {
  return (
    <div className='relative flex flex-col items-center text-center flex-1 min-w-0'>
      {!isLast && (
        <div className='hidden lg:block absolute top-11 left-1/2 w-full border-t border-dashed border-black' />
      )}

      <span className='relative z-10 font-extrabold text-orange-500 leading-none select-none text-7xl xl:text-8xl'>
        {item.step}
      </span>

      <p className='mt-5 font-bold text-black text-sm md:text-base leading-snug'>
        {item.title}
      </p>

      <p className='mt-2 text-black text-xs md:text-sm leading-relaxed'>
        {item.description}
      </p>
    </div>
  );
};

const MobileStepCard = ({ item }: { item: StaffProcessStep }) => (
  <div className='flex items-start gap-4'>
    <span className='font-extrabold text-orange-500 leading-none shrink-0 text-5xl'>
      {item.step}
    </span>
    <div className='text-left pt-1'>
      <p className='font-bold text-black text-sm leading-snug'>{item.title}</p>
      <p className='mt-1 text-black/75 text-xs leading-relaxed'>
        {item.description}
      </p>
    </div>
  </div>
);

export const StaffProcess = ({ data }: StaffProcessProps) => {
  if (!data) return null;

  const { heading, coloredHeading, steps } = data;

  return (
    <section className='w-full py-16 px-6 md:px-12 lg:px-20  flex flex-col items-center text-center font-sans bg-gray-100'>
      <h2 className='text-2xl md:text-4xl font-bold text-gray-900 leading-tight text-center mb-12 md:mb-16 max-w-4xl mx-auto'>
        {heading}
        <span className='text-[#FA8145]'> {coloredHeading}</span>
      </h2>

      <div className='flex flex-col gap-8 lg:hidden max-w-lg mx-auto'>
        {steps.map((item: StaffProcessStep) => (
          <MobileStepCard key={item.step} item={item} />
        ))}
      </div>

      <div className='hidden lg:flex items-start gap-6 xl:gap-10 max-w-6xl mx-auto'>
        {steps.map((item: StaffProcessStep, i: number) => (
          <StepCard
            key={item.step}
            item={item}
            isLast={i === steps.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default StaffProcess;
