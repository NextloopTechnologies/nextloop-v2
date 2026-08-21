import Link from 'next/link';
import React, { FC } from 'react';

import OurServieceCard from '../OurServieceCard';
import palette from '../../styles/pallette';
import { availableServices } from '../../utils/staticTextImgData';

const Services: FC = () => {
  return (
    <div className='flex justify-center items-center w-full overflow-x-hidden flex-col pb-10'>
      {/* Header */}
      <header className='flex gap-10 lg:w-4/6 lg:px-10 text-center'>
        <div className='w-full flex flex-col justify-center items-center gap-y-3 z-10 px-4'>
          <h2
            className={`${palette.fontSize.heading2.mobile} md:text-4xl 2xl:text-4xl font-bold text-center `}
          >
            Build, Scale and Transform with{' '}
            <span className='text-orange-500'>Custom Software</span>
          </h2>
          <h3
            className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} text-center`}
          >
            Whether you're launching a new digital platform or deploying AI
            agents for business automation, our technical teams provide the
            secure, high-performance solutions you need to expand seamlessly.
          </h3>
        </div>
      </header>

      {/* Services Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-4 mt-10 place-items-center'>
        {availableServices.map((data, index) => (
          <Link
            key={index}
            href={data.href}
            className='transition-transform hover:scale-105'
          >
            <OurServieceCard heading={data.name} image={data.image ?? ''} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
