import Image from 'next/image';
import React from 'react';

import { travelandhotelAssets } from '../../../../assets';
import palette from '../../../styles/pallette';

const NextGen = () => {
  return (
    <div className='bg-white py-[100px] md:mx-10'>
      <h1
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-black uppercase font-bold text-center px-10`}
      >
        build <span className='text-orange-500'>next gen</span> online travel &
        hotel website
      </h1>
      <div className='flex flex-col lg:flex-row gap-[20px] justify-between mx-5 mt-[30px]'>
        <Image
          src={travelandhotelAssets.nextGen1}
          alt='next-gen-image'
          className='w-[300px] h-[300px] mx-auto lg:w-[600px] lg:h-[450px] object-fill mt-4'
          height={300}
          width={300}
        />
        <div className='text-[#1D1D1D] px-10 md:px-0 md:mt-5'>
          <h3
            className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} uppercase mb-3`}
          >
            we provide wide range of services. At nextloop , we dig deep,
            understand our clients objective and unique business challenge to
            provide the best suitable travel & hotel web solution.
          </h3>
          <p
            className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop}`}
          >
            There was once a time when hotels attracted and retained their
            customers by word of mouth and by distributing physical marketing
            material to potential guests. While that might have been the most
            effective way to let people know about your brand, it’s no longer
            true. Digitalisation has grown at a rapid speed across all
            industries, especially travel. In fact, a survey found that in
            pre-pandemic 2017, already 88% of people preferred to make their
            hotel bookings online.
          </p>
          <p
            className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop}`}
          >
            The best outcome of this acceleration into the future is that many
            things that used to take a lot of time and investment are now more
            accessible, affordable, and offer ease of use, like building your
            first hotel website. Gone are the days when you would have to spend
            a heavy amount of money to hire a developer and designer. It’s now
            as easy as a drag-and-drop tool. And if nothing else, a hotel
            website will tell the world that you really exist.
          </p>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row gap-[54px] justify-between mx-14 mt-5 '>
        <div className='text-[#1D1D1D] md:mt-10'>
          <h3
            className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} uppercase mb-3`}
          >
            our focus is on the design of high quality custom built travel &
            Hotel website that incorporate the latest web technologies and best
            practices.
          </h3>
          <p
            className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop}`}
          >
            There was once a time when hotels attracted and retained their
            customers by word of mouth and by distributing physical marketing
            material to potential guests. While that might have been the most
            effective way to let people know about your brand, it’s no longer
            true. Digitalisation has grown at a rapid speed across all
            industries, especially travel. In fact, a survey found that in
            pre-pandemic 2017, already 88% of people preferred to make their
            hotel bookings online.
          </p>
          <p
            className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop}`}
          >
            The best outcome of this acceleration into the future is that many
            things that used to take a lot of time and investment are now more
            accessible, affordable, and offer ease of use, like building your
            first hotel website. Gone are the days when you would have to spend
            a heavy amount of money to hire a developer and designer. It’s now
            as easy as a drag-and-drop tool. And if nothing else, a hotel
            website will tell the world that you really exist.
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
