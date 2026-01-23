// import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';

import StatCounter from '../StatCounter';
import palette from '../../styles/pallette';
// import {
//   imageVariants,
//   introHeaderVariants,
//   textVariants,
// } from '../../utils/frameMotionAnimations';
// import useWindowSize from '../../utils/useWindowSize';
import { Whoweare } from '../../../assets';

const WhoWeAre: FC = () => {
  const [textAnimationCompleted, setTextAnimationCompleted] = useState(false);
  // const { isMobile } = useWindowSize();

  useEffect(() => {
    // Simulate the completion of text animation after a delay
    const textAnimationTimeout = setTimeout(() => {
      setTextAnimationCompleted(true);
    }, 1500);

    // Clean up the timeout on component unmount
    return () => clearTimeout(textAnimationTimeout);
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16 py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">

        {/* IMAGE SECTION */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          {textAnimationCompleted && (
            <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={Whoweare}
                alt="Who we are"
                className="w-full h-full object-cover"
                priority
              />
            </div>
          )}
        </div>

        {/* TEXT + STATS SECTION */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="flex flex-col max-w-xl text-center lg:text-left">

            <h2
              className={`${palette.fontSize.heading2.mobile} lg:text-4xl 2xl:text-5xl uppercase font-bold leading-snug`}
            >
              Transforming{" "}
              <span className="text-orange-400">
                Ideas into Scalable Digital Solutions
              </span>
            </h2>

            <p
              className={`${palette.fontSize.description.mobile} ${palette.fontSize.description.desktop} mt-6 tracking-wide leading-relaxed text-gray-700`}
            >
              With 8+ years of industry expertise, we specialize in building custom
              software, AI-powered solutions, web & mobile applications, and digital
              ecosystems that drive real business outcomes. We partner with brands to
              innovate faster, operate smarter, and grow sustainably.
            </p>

            {/* STATS */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <StatCounter end={200} suffix="+" />
                <p className="mt-2 text-sm text-gray-600">
                  Successful Projects
                </p>
              </div>

              <div>
                <StatCounter end={150} suffix="+" />
                <p className="mt-2 text-sm text-gray-600">
                  Tech Professionals
                </p>
              </div>

              <div>
                <StatCounter end={98} suffix="%+" />
                <p className="mt-2 text-sm text-gray-600">
                  Client Satisfaction
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </>
  );
};

export default WhoWeAre;
