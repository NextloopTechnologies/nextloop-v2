'use client';

import Image from 'next/image';
import React, { useState } from 'react';
export interface TechItem {
  name: string;
  image: string;
}

export interface TechCategory {
  title: string;
  items?: TechItem[];
}

interface TechStackProps {
  techStackData: TechCategory[];
}

const TechStack: React.FC<TechStackProps> = ({ techStackData }) => {
  const [activeTab, setActiveTab] = useState<string>(
    techStackData.length > 0 ? techStackData[0]?.title ?? '' : ''
  );

  return (
    <section className='flex flex-col py-16 px-4 md:px-16 text-center bg-black text-white'>
      <h3 className='text-3xl md:text-4xl font-bold'>
        OUR <span className='text-orange-500'>TECHSTACK</span>
      </h3>
      <p className='text-gray-400 mt-4'>
        Founded in 2020 with a vision of driving the loop towards new age
        technologies.
      </p>
      <div className='flex justify-center mt-6 border-b border-gray-600'>
        {techStackData.map((category) => (
          <button
            key={category.title}
            className={`px-4 py-2 text-lg font-medium ${
              activeTab === category.title
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400'
            }`}
            onClick={() => setActiveTab(category.title)}
          >
            {category.title}
          </button>
        ))}
      </div>
      <div className='flex flex-wrap justify-center gap-6 mt-10'>
        {techStackData
          .find((category) => category.title === activeTab)
          ?.items?.map((item) => (
            <div
              key={item.name}
              className='p-6 bg-white rounded-lg shadow-md flex flex-col items-center'
            >
              <div className='w-16 h-16 relative flex items-center justify-center'>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default TechStack;
