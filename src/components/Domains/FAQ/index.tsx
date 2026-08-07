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

  const renderAnswer = (answer: string | string[]) => {
    if (Array.isArray(answer)) {
      return (
        <ul className='list-disc space-y-2 border-l-[3px] border-orange-500 pl-6 text-[#261F21]'>
          {answer.map((item, index) => (
            <li key={`${index}-${item}`}>{item}</li>
          ))}
        </ul>
      );
    }

    const lines = answer
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    const bulletIndex = lines.findIndex((line) => line.startsWith('- '));

    if (bulletIndex === -1) {
      return (
        <p className='border-l-[3px] border-orange-500 pl-4 text-[#261F21]'>
          {answer}
        </p>
      );
    }

    const paragraph = lines.slice(0, bulletIndex).join(' ');
    const bullets = lines
      .slice(bulletIndex)
      .map((line) => line.replace(/^-\s*/, '').trim())
      .filter(Boolean);

    return (
      <div className='space-y-3 border-l-[3px] border-orange-500 pl-4 text-[#261F21]'>
        {paragraph && <p>{paragraph}</p>}
        {bullets.length > 0 && (
          <ul className='list-disc space-y-2 pl-5'>
            {bullets.map((item, index) => (
              <li key={`${index}-${item}`}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const handleToggle = (id: number) => {
    setIsOpen(isOpen === id ? null : id);
  };

  return (
    <div className='flex flex-col items-center py-20 mx-auto mb-5'>
      <h2
        className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} font-bold`}
      >
        FAQ'S
      </h2>
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
              <h3
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} font-medium mb-2`}
              >
                {faq.question}
              </h3>
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
                <div
                  className={`text-[#261F21] ${palette.fontSize.descriptionSmall.mobile} md:${palette.fontSize.descriptionSmall.desktop}`}
                >
                  {renderAnswer(faq.answer)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
