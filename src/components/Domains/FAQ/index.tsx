import React, { useState } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa';
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
    <div className="min-h-screen flex flex-col items-center py-[122px] mx-auto gap-[109px]">
      <h1 className="text-8xl font-bold mb-7">FAQ'S</h1>
      <div className="w-full p-10">
        { faqsContent?.map((faq) => (
          <div key={faq.id} className="w-full border-b border-gray-400 p-4 mb-3">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleToggle(faq.id)}
            >
              <span className="text-xl font-medium uppercase mb-4">{faq.question}</span>
              {isOpen === faq.id ? <FaTimes /> : <FaPlus />}
            </div>
            {isOpen === faq.id  && (
              <div className="sm:ml-[140px]">
                  <p className="text-[#261F21] text-lg border-l-[3px] border-orange-500 pl-4">
                    {faq.answer}
                  </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ