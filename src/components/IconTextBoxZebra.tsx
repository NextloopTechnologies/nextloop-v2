import Image from 'next/image';
import React from 'react';

import { ExpertiseData } from '../pages/services/BaseServicePages';

interface IconTextBoxZebraProps {
  data: ExpertiseData;
}

const IconTextBoxZebra: React.FC<IconTextBoxZebraProps> = ({ data }) => {
  return (
    <section className='flex flex-col py-20 px-4 md:px-40 text-center bg-gray-100'>
      <h3 className='text-3xl md:text-4xl font-bold'>
        <span className='text-orange-500'>
          {data?.headingData?.coloredHeading}
        </span>{' '}
        {data?.headingData?.heading}
      </h3>
      <p className='text-gray-600 mt-4'>{data?.headingData?.description}</p>
      <div className='grid md:grid-cols-2 mt-10'>
        {data?.items?.map((item) => (
          <div
            key={item?.id}
            className={`flex items-center p-6 rounded-lg shadow-md ${item?.dark ? 'bg-black text-white' : 'bg-white text-black border'
              }`}
          >
            <div className='w-13 h-13 relative mr-4 flex items-center justify-center'>
              {item?.image ? (
                React.isValidElement(item.image) ? (
                  // preserve existing props and apply color/size
                  React.cloneElement(item.image, {
                    ...item.image.props,
                    className: `${item.image.props?.className || ''} w-8 h-8 dark:text-white text-black dark:group-hover:text-black group-hover:text-white text-orange-600`.trim(),
                    size: item.image.props?.size || 28,
                    color: item.image.props?.color ?? 'currentColor',
                  })
                ) : typeof item.image === 'function' ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  React.createElement(item.image as any, { className: 'w-8 h-8 dark:text-white text-black dark:group-hover:text-black group-hover:text-white text-orange-500', size: 28 })
                ) : typeof item.image === 'object' && (item.image as any).src ? (
                  <Image src={item.image as any} alt={item?.title} className='dark:text-white text-black dark:group-hover:text-black group-hover:text-white' />
                ) : typeof item.image === 'string' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image as string} alt={item?.title} className='dark:text-white text-black dark:group-hover:text-black group-hover:text-white' />
                ) : null
              ) : null}
            </div>
            <div className='text-left'>
              <h3 className='font-bold text-lg uppercase'>{item?.title}</h3>
              <p className='text-sm mt-2'>{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IconTextBoxZebra;
