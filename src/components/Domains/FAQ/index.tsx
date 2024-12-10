import Image from 'next/image';
import React, { useState } from 'react';

import { faqAssets } from '../../../../assets';
import palette from '../../../styles/pallette';
import { IFAQ } from '../../../types';

interface AccordionProps {
  faqsContent: IFAQ[];
}

const FAQ: React.FC<AccordionProps> = ({ faqsContent }) => {
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setIsOpen(isOpen === id ? null : id);
  };

  return (
    <div className='flex flex-col items-center pt-5 mx-auto mb-5'>
      <h1
        className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} font-bold`}
      >
        FAQ'S
      </h1>
      <div className='w-full p-10'>
        {faqsContent?.map((faq) => (
          <div
            key={faq.id}
            className='w-full border-b border-gray-400 p-4 mb-3'
          >
            <div
              className='flex justify-between items-center cursor-pointer'
              onClick={() => handleToggle(faq.id)}
            >
              <span
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} font-medium uppercase mb-2`}
              >
                {faq.question}
              </span>
              {isOpen === faq.id ? (
                <Image
                  src={faqAssets.faqCrossIcon}
                  height={20}
                  width={20}
                  alt=''
                />
              ) : (
                <Image
                  src={faqAssets.faqPlusIcon}
                  height={20}
                  width={20}
                  alt=''
                />
              )}
            </div>
            {isOpen === faq.id && (
              <div className='sm:ml-[140px]'>
                <p
                  className={`text-[#261F21] ${palette.fontSize.descriptionSmall.mobile} md:${palette.fontSize.descriptionSmall.desktop} border-l-[3px] border-orange-500 pl-4`}
                >
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
