import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { FC } from 'react'; // Import FC (Functional Component) type from React

import useWindowSize from '../../utils/useWindowSize';
import {
  CompositeLayer_1,
  CompositeLayer_2,
  CompositeLayer_3,
  CompositeLayer_4,
} from '../../../assets';

type CoveroverProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Coverover: FC<CoveroverProps> = ({ isOpen, onClose }) => {
  const imageArray = [
    CompositeLayer_1,
    CompositeLayer_2,
    CompositeLayer_3,
    CompositeLayer_4,
  ];
  const content = [
    {
      heading: 'we first,',
      subHeading: 'Analyse the Need',
      description:
        'We begin by thoroughly understanding your requirements, ensuring our solutions align with your specific business needs.',
    },
    {
      heading: 'second we,',
      subHeading: 'Design Blueprint',
      description:
        'Our team creates a comprehensive wireframe that outlines the architecture and functionalities of the solution.',
    },
    {
      heading: 'In Third we,',
      subHeading: 'Program Code',
      description:
        'With precision & expertise, we write efficient code to bring your project to life, focusing on quality & scalability.',
    },
    {
      heading: 'At last we,',
      subHeading: 'Deliver Solution',
      description:
        'A tailored, reliable, and fully functional IT solution that meets your goals, ensuring a seamless transition into your business.',
    },
  ];

  const { isMobile } = useWindowSize();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: isMobile ? 1 : 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 2xl:bg-transparent bg-white z-50 overflow-y-auto hidden lg:block'
        >
          {/* Your modal content goes here */}
          <div className='w-full min-h-screen p-4'>
            <button
              onClick={onClose}
              className='absolute top-4 right-4 text-red-500'
            >
              Close
            </button>
            <div className='flex flex-col overflow-x-hidden  lg:px-20 z-50'>
              {imageArray.map((item, index) => {
                return (
                  <div key={index} className=''>
                    <div
                      className={`flex ${
                        index % 2 !== 0 ? 'justify-start' : 'justify-end'
                      } m-4 lg:flex-row flex-col`}
                    >
                      <div className='relative'>
                        <Image
                          src={item}
                          width={500}
                          height={300}
                          // className='absolute'
                          alt={`${index}`}
                        />

                        <div className='absolute mt-[-250px] pl-56 text-gray-600'>
                          <div>
                            <span className=' font-semibold  text-gray-800'>
                              {content[index]?.heading}
                            </span>
                            <h3 className='text-2xl font-medium '>
                              {content[index]?.subHeading}
                            </h3>
                            <p className='text-gray-500 text-xs mt-4 w-4/6'>
                              {content[index]?.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Coverover;
