import React from 'react';

import ServiceCtaButtons from './ServiceCtaButtons';
import palette from '../../styles/pallette';
import { ServiceCtaBandData } from '../../types';

const ServiceCtaBand: React.FC<ServiceCtaBandData> = ({
  heading,
  description,
}) => {
  return (
    <section className='bg-[#F4F4F4] py-14 md:py-16 px-6'>
      <div className='max-w-4xl mx-auto flex flex-col items-center text-center'>
        <h2
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold text-gray-900 leading-tight`}
        >
          {heading}
        </h2>
        <p
          className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} mt-3 text-gray-600 max-w-2xl`}
        >
          {description}
        </p>
        <div className='mt-7'>
          <ServiceCtaButtons tone='light' />
        </div>
      </div>
    </section>
  );
};

export default ServiceCtaBand;
