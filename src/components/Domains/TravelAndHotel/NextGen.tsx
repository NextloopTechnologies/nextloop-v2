import Image from 'next/image';
import React from 'react';

import { travelandhotelAssets } from '../../../../assets';
import palette from '../../../styles/pallette';

const NextGen = () => {
  return (
    <div className='bg-white py-[100px] md:mx-10'>
      <h1
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-black font-bold text-center px-10`}
      >
        A Wide Range of Travel & Hotel Web Solutions{' '}
        <span className='text-orange-500'>— All Under One Roof</span>
      </h1>
      <div className='flex flex-col lg:flex-row gap-[20px] justify-between mx-5 mt-[30px]'>
        <Image
          src={travelandhotelAssets.nextGen1}
          alt='next-gen-image'
          className='w-[300px] h-[300px] mx-auto lg:w-[600px] lg:h-[450px] object-fill mt-4'
          height={300}
          width={300}
        />
        <div className='text-[#1D1D1D] px-10 md:px-0 md:mt-5 gap-2'>
          <h3
            className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} uppercase mb-3`}
          >
            At Nextloop, we deliver a comprehensive suite of digital services.
            We dig deep to understand your unique business objectives and
            operational challenges, allowing us to engineer the ultimate custom
            web solution for your hospitality brand.
          </h3>
          <p
            className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop}`}
          >
            Historically, properties relied heavily on word-of-mouth referrals
            and physical marketing collateral to fill rooms. While traditional
            print was once the gold standard for brand awareness, the modern
            landscape dictates a different strategy. Rapid digitalisation has
            fundamentally transformed the travel sector. Research shows that
            even as early as 2017, a staggering 88% of travellers favoured
            making their accommodation reservations online.
          </p>
          <p
            className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop}`}
          >
            The silver lining of this rapid technological evolution is that
            launching a high-performing digital footprint is now more accessible
            and cost-effective than ever. The era of needing astronomical
            budgets just to get a basic page online is over. Today's modern
            infrastructure simplifies deployment, ensuring that even a baseline
            web presence serves as an essential, authoritative proof of your
            brand's existence in a competitive global market.
          </p>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row gap-[54px] justify-between mx-14 mt-5 '>
        <div className='text-[#1D1D1D] md:mt-10 gap-2'>
          <h3
            className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} uppercase mb-3`}
          >
            Custom-Built Travel & Hotel Websites Powered by the Latest Web
            Technologies
          </h3>
          <p
            className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop}`}
          >
            Our focus is on quality not volume. Every travel and hotel website
            we design is a custom build,developed using modern web technologies
            and current best practices. That means fast load times,mobile-first
            layouts, accessible interfaces, and code that holds up as browsers,
            devices, and search algorithms evolve.
          </p>
          <p
            className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop}`}
          >
            Building a professional hotel website no longer has to mean a
            lengthy, expensive development cycle. The tools and techniques
            available today make it possible to deliver polished,
            high-performing websites that genuinely represent your brand
            efficiently and at a price point that makes sense.
          </p>
          <p
            className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop}`}
          >
            What hasn't changed is the importance of doing it properly. A hotel
            website is often the first impression your guests will have of your
            property. It needs to load quickly, communicate clearly, and make
            booking feel effortless. Elevate your business with innovative
            design solutions and a powerful global inventory network that
            enhances visibility, efficiency, and customer experience.
          </p>
        </div>
        <Image
          src={travelandhotelAssets.nextGen2}
          alt='next-gen-image'
          className='w-[300px] h-[300px] mx-auto lg:w-[600px] lg:h-[450px] object-fill'
          height={300}
          width={300}
        />
      </div>
    </div>
  );
};

export default NextGen;
