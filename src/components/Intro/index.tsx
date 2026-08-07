import React from 'react';

const Intro = () => {
  return (
    <div className='relative w-full flex justify-center items-center mb-40 md:mb-64 lg:mb-96 overflow-x-hidden'>
      <div className='w-full max-w-4xl mx-auto px-6 sm:px-8 mt-24 md:mt-32 lg:mt-52 text-center'>
        <div className='text-center '>
          <h1 className='text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight'>
            Hire Developers from an{' '}
            <span className='italic text-orange-500'>AI-Native</span> Software
            Firm for <br />
            Tailored Digital{' '}
            <span className='italic text-orange-500'>Innovation</span>
          </h1>
        </div>

        <div className='mt-6 sm:mt-8 md:mt-12 text-white  sm:text-xl md:text-xl max-w-5xl mx-auto '>
          Giving brands the power to hire dedicated mobile app developers,
          generative AI engineers and full stack web development teams that help
          their businesses grow in a real and scalable way.
        </div>
      </div>
    </div>
  );
};

export default Intro;
