import { motion,Variants } from 'framer-motion';
import React, { FC, useRef } from 'react';

import Coverover from './Coverover'; // Import the Coverover component
import { textVariants } from '../../utils/frameMotionAnimations';

type CoveroverProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const Services: FC<CoveroverProps> = ({ isModalOpen, setIsModalOpen }) => {
  const scrollableRef = useRef<HTMLDivElement | null>(null); // Specify the type of scrollableRef

  const introHeaderVariants: Variants = {
    hide: {
      opacity: 0,
      x: -500,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 2,
      },
    },
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
    // Disable scrolling in the Services content when the modal is open
    // if (scrollableRef.current) {
    //   scrollableRef.current.style.overflowY = 'hidden';
    // }
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Re-enable scrolling in the Services content when the modal is closed
    // if (scrollableRef.current) {
    //   scrollableRef.current.style.overflowY = 'auto';
    // }
  };

  return (
    <>
      <div className='flex justify-center items-center h-screen overflow-x-hidden'>
        <motion.header
          initial='hide'
          whileInView='show'
          exit='hide'
          variants={introHeaderVariants}
          className='flex gap-x-10 w-4/6  px-10 text-center'
        >
          <div className='flex flex-col gap-y-3 px-20 '>
            <span>#OUR VALUES</span>
            <motion.span
              initial='hide'
              animate='show'
              variants={textVariants}
              className='text-6xl font-bold text-center'
            >
              Curious about how we manage to make all this{' '}
              <b className='text-orange-400'>possible?</b>
            </motion.span>
            <motion.span
              initial='hide'
              animate='show'
              variants={textVariants}
              className='text-xs  pt-8 text-center flex items-center'
            >
              <div className='px-20 '>
                Are you curious about our secret behind making all this
                possible? At the heart of our software solutions lies a
                dedication to understanding your needs, which drives our
                approach from concept to creation. Our commitment to delivering
                excellence shines through at every stage, ensuring we provide
                results that truly matter to you.
              </div>
            </motion.span>
            <button onClick={openModal}>Open</button>
          </div>
        </motion.header>
      </div>

      {/* Trigger the modal when reaching the end of Services */}
      <div
        ref={scrollableRef}
        onScroll={(e) => {
          // Capture scroll events and handle them only if the modal is open
          if (isModalOpen) {
            e.stopPropagation();
            e.preventDefault();
            // Implement your custom scrolling logic for the modal content here
          }
        }}
        className='h-96 overflow-y-auto'
      >
        {/* Scrollable content */}
      </div>
      {/* Render the Coverover modal */}
      <Coverover isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Services;
