'use client';
import { StaticImageData } from 'next/image';
import { useState } from 'react';

import palette from '../styles/pallette';

export interface ProcessItem {
  id: number;
  title: string;
  description?: string;
  image?: StaticImageData;
}

export interface ProcessSectionData {
  headingData: {
    heading: string;
    coloredHeading: string;
  };
  items: ProcessItem[];
}

const OurProcessSection: React.FC<{ ourProcess: ProcessSectionData }> = ({
  ourProcess,
}) => {
  const [activeId, setActiveId] = useState<number>(1);
  const [accordionActive, setAccordionActive] = useState<number | null>(null);

  const activeItem = ourProcess.items.find((item) => item.id === activeId);

  const toggleAccordion = (id: number) => {
    setAccordionActive((prev) => (prev === id ? null : id));
  };

  return (
    <section className='bg-orange-50'>
      <div className='flex flex-col items-center text-center min-h-fit w-full md:max-w-6xl mx-auto my-8 md:my-16 md:rounded-3xl'>
        <h3
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold uppercase mb-12`}
        >
          {ourProcess.headingData.heading}
          <span className='text-orange-500'>
            {ourProcess.headingData.coloredHeading}
          </span>
        </h3>

        <div className='hidden md:flex flex-col md:flex-row gap-8 md:gap-12 items-start'>
          <div className='md:w-1/4 relative max-h-32 overflow-auto scrollbar-thin-gray'>
            <div className='flex flex-col gap-y-3 relative'>
              {ourProcess.items.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => setActiveId(item.id)}
                    className={`text-left font-medium py-2 transition-colors px-4 rounded-md w-full max-w-xs ${
                      activeId === item.id
                        ? 'bg-black text-white font-semibold'
                        : 'text-black hover:bg-gray-200'
                    }`}
                  >
                    {item.title}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className='md:w-3/4 max-h-32 overflow-auto scrollbar-thin-gray'>
            {activeItem && (
              <div className='transition-opacity duration-300'>
                <p className='text-gray-700 leading-relaxed text-base text-left'>
                  {activeItem.description}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className='w-full visible md:hidden'>
          {ourProcess.items.map((item) => (
            <div
              key={item.id}
              className='w-11/12 mx-auto mb-2 border rounded-lg overflow-hidden'
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                className='flex justify-between items-center w-full p-4 font-medium text-black hover:bg-orange-200'
              >
                <span>{item.title}</span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    accordionActive === item.id ? 'rotate-180' : ''
                  }`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>
              {accordionActive === item.id && (
                <div className='p-4 text-left'>{item.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcessSection;
