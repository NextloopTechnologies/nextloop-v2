import Image from 'next/image';
import React from 'react';

import { WhatWeDo1, WhatWeDo2, WhatWeDo3, WhatWeDo4 } from '../../../../assets';

const WhatWeDo = () => {
  const images = [WhatWeDo1, WhatWeDo2, WhatWeDo3, WhatWeDo4];

  return (
    <div className='flex bg-[#1D1D1D0D] flex-col items-center'>
      <div className='flex flex-col pt-[96px] pb-[122px] max-w-[1479px] mx-auto gap-20'>
        <h1 className='text-3xl md:text-7xl uppercase font-bold text-center'>
          What <span className='text-orange-500'>We do</span> for you
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt='image'
              className='mx-auto w-[380px] md:mx-0 md:w-[717px]'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
