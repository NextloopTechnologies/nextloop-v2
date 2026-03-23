import Image from 'next/image';
import React, { FC } from 'react';

import StatCounter from '../StatCounter';
import palette from '../../styles/pallette';
import { Whoweare } from '../../../assets';

const WhoWeAre: FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-16 py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">

      {/* IMAGE SECTION */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
        <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={Whoweare}
            alt="Who we are"
            width={600}
            height={400}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
            className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
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
            software, AI-powered solutions, web & mobile applications and digital
            ecosystems that drive real business outcomes.We partner with brands to
              innovate faster, operate smarter and grow sustainably.
          </p>

          {/* STATS */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <StatCounter end={40} suffix="+" />
              <p className="mt-2 text-sm text-gray-600">
                Successful Projects
              </p>
            </div>

            <div>
              <StatCounter end={80} suffix="+" />
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
  );
};

export default WhoWeAre;