import React from 'react';

import {
  ServiceProcessData,
  ServiceProcessStep,
} from '../pages/services/BaseServicePages';

interface ServicesProcessProps {
  data?: ServiceProcessData;
}

const StepCard = ({
  item,
  isLast,
}: {
  item: ServiceProcessStep;
  isLast: boolean;
}) => {
  return (
    <div className='relative flex flex-col items-center text-center flex-1 min-w-0'>
      {!isLast && (
        <div className='hidden lg:block absolute top-11 left-2/3 w-5/6 border-t border-dashed border-black' />
      )}

      <span className='relative z-10 font-extrabold text-orange-500 leading-none select-none text-7xl xl:text-8xl'>
        {item.step}
      </span>

      <p className='mt-5 font-bold text-black text-sm md:text-sm leading-snug'>
        {item.title}
      </p>

      <p className='mt-2 text-black text-xs md:text-xs leading-relaxed'>
        {item.description}
      </p>
    </div>
  );
};

const MobileStepCard = ({ item }: { item: ServiceProcessStep }) => (
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

export const ServicesProcess = ({ data }: ServicesProcessProps) => {
  if (!data) return null;

  const { heading, coloredHeading, description, steps } = data;

  return (
    <section className='w-full py-16 px-6 md:px-12 lg:px-20  flex flex-col items-center text-center font-sans bg-gray-100'>
      <h2 className='text-2xl md:text-4xl font-bold text-gray-900 leading-tight text-center max-w-4xl mx-auto'>
        {heading}
        <span className='text-orange-500'> {coloredHeading}</span>
      </h2>
      <p className='text-gray-400 mt-4 mb-12'>{description}</p>

      <div className='flex flex-col gap-8 lg:hidden max-w-lg mx-auto'>
        {steps.map((item: ServiceProcessStep) => (
          <MobileStepCard key={item.step} item={item} />
        ))}
      </div>

      <div className='hidden lg:flex items-start gap-6 xl:gap-10 max-w-6xl mx-auto'>
        {steps.map((item: ServiceProcessStep, i: number) => (
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

export default ServicesProcess;
