import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { useRouter } from 'next/router';
import React, { FC } from 'react';

// import { caseStudies } from '../../pages/portfolio';
import { introHeaderVariants } from '../../utils/frameMotionAnimations';
import useWindowSize from '../../utils/useWindowSize';
0
const Portfolio: FC = () => {
  const { isMobile } = useWindowSize();
  // const router = useRouter();
  return (
    <>
      <div className='flex justify-center items-center min-h-screen'>
        <motion.header
          initial={isMobile ? 'visible' : 'hide'}
          whileInView='show'
          exit='hide'
          variants={introHeaderVariants}
          className='flex gap-x-10 w-5/6'
          // Enable drag interactions
          // Adjust constraints as needed
        >
          <div className='flex flex-col gap-y-1 w-full'>
            <motion.span
              initial={isMobile ? 'visible' : 'hide'}
              whileInView='show'
              exit='hide'
              drag='x'
              dragConstraints={{ left: -1000, right: 0 }}
              className=''
            >
              <div className='flex gap-4 flex-col lg:flex-row '>
                {/* {caseStudies.map((proj, index) => (
                  <span key={index} className='relative'>
                    <span
                      onClick={() => {
                        router.push(`/portfolio/${index}`);
                      }}
                      className='bg-gray-200 pt-10 w-full lg:w-[650px] rounded-md flex items-center justify-center'
                    >
                      <Image
                        src={`/portfolio/${index}.svg`}
                        alt='Mobile'
                        width={300}
                        height={100}
                        className='object-contain h-[600px]'
                      />
                    </span>
                    <span className='bg-white bottom-0 w-5/6 h-28 absolute px-4 pt-4'>
                      <p className='text-2xl font-medium'>{proj.title}</p>
                    </span>
                  </span>
                ))} */}
              </div>
            </motion.span>
          </div>
        </motion.header>
      </div>
    </>
  );
};

export default Portfolio;
