import { motion } from 'framer-motion';
import React, { FC, useState } from 'react';

import {
  inputFieldVariants,
  introHeaderVariants,
  introHeaderVariants2,
  textVariants,
} from '../../utils/frameMotionAnimations';
import useWindowSize from '../../utils/useWindowSize';

const PitchThought: FC = () => {
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const handleDescriptionChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDescription(e.target.value);
  };

  const { isMobile } = useWindowSize();

  return (
    <>
      <div
        id='footer'
        className='flex lg:flex-row flex-col gap-x-32 items-center h-screen overflow-x-hidden px-4'
      >
        <motion.header
          initial={isMobile ? 'visible' : 'hide'}
          whileInView='show'
          exit='hide'
          variants={introHeaderVariants}
          className='flex justify-end w-full text-white'
        >
          <div className='flex flex-col justify-end lg:w-4/6 gap-y-20 w-full'>
            <div className='lg:text-right text-center'>
              <span className='flex lg:justify-end justify-center'>
                #connect with us
              </span>
              <motion.span
                initial={isMobile ? 'visible' : 'hide'}
                animate='show'
                variants={textVariants} // Apply animation variants to this text element
                className='text-7xl font-bold text-right'
              >
                PITCH your <b className='text-orange-500'>thoughts</b> here
              </motion.span>
            </div>

            <motion.span
              initial={isMobile ? 'visible' : 'hide'}
              animate='show'
              variants={textVariants} // Apply animation variants to this text element
              className='text-sm '
            >
              Send us some details about your project, and feel free to ask
              questions about our process. Our consultants will be with you
              ASAP.
            </motion.span>
          </div>
        </motion.header>
        <motion.header
          initial={isMobile ? 'visible' : 'hide'}
          whileInView='show'
          exit='hide'
          variants={introHeaderVariants2}
          className='flex gap-x-10 justify-center   w-full text-white'
        >
          <div className='flex flex-col lg:w-2/3 pt-20 gap-y-12 w-full'>
            <motion.div
              className='relative'
              variants={inputFieldVariants}
              initial='unfocused'
              whileFocus='focused'
            >
              <input
                type='text'
                value={description}
                onChange={handleDescriptionChange}
                className='border-b border-gray-400 w-full h-10 bg-transparent focus:outline-none focus:border-gray-400 transition-all duration-300'
                placeholder='Describe your idea'
              />
            </motion.div>
            <motion.div
              className='relative'
              variants={inputFieldVariants}
              initial='unfocused'
              whileFocus='focused'
            >
              <input
                type='text'
                value={email}
                onChange={handleEmailChange}
                className='border-b border-gray-400 w-full  h-10 bg-transparent focus:outline-none focus:border-gray-400 transition-all duration-300'
                placeholder='Your email'
              />
            </motion.div>
            <motion.a
              className='flex justify-center items-center py-4 bg-white text-black rounded-full font-medium cursor-pointer'
              variants={inputFieldVariants}
              initial='unfocused'
              whileFocus='focused'
              href='mailto:info@nextlooptechnologies.com'
            >
              Send your idea!
            </motion.a>
            <motion.div
              className='flex '
              variants={inputFieldVariants}
              initial='unfocused'
              whileFocus='focused'
            >
              101, Kanchan Sagar, 18/1, Near Industry House, Old Palasia,
              Indore, Madhya Pradesh 452001
            </motion.div>
            <motion.div
              className='flex text-xl'
              variants={inputFieldVariants}
              initial='unfocused'
              whileFocus='focused'
            >
              info@nextlooptechnologies.com
            </motion.div>
          </div>
        </motion.header>
      </div>
    </>
  );
};

export default PitchThought;
