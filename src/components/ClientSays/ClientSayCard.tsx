import Image from 'next/image';
import React, { FC, useState } from 'react';

import {
  BlueBird,
  InvertedQoute,
  Levram1,
  RightArrow,
  SWAcademy,
} from '../../../assets';

interface ServiceCardProps {
  heading: string;
  image: string;
  title: string;
  desc: string;
}

const OURVALUES_DATA: ServiceCardProps[] = [
  {
    heading: 'Manager, Levram Lifesciesnce Private Limited',
    image: Levram1 as unknown as string,
    title: 'Piyush Agrawal',
    desc: 'We commend their quick response.',
  },
  {
    heading: 'Founder, Stamens Software Pvt Ltd',
    image: SWAcademy as unknown as string,
    title: 'Shushil Kumar',
    desc: 'Their ability to consistently push boundaries and deliver cutting-edge solutions was truly remarkable.',
  },
  {
    heading: 'Director, Shower Wealth Academy',
    image: BlueBird as unknown as string,
    title: 'Ayush Shrivastav',
    desc: 'Nextloop Technologies LLP distinguishes itself in the realm of IT products and services through a myriad of pivotal factors, including innovative solutions.',
  },
];

const ClientSaysCard: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === OURVALUES_DATA.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === 0 ? OURVALUES_DATA.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className='relative w-full max-w-sm  sm:max-w-lg mx-auto'>
        <div className='overflow-hidden'>
          <div
            className='flex transition-transform duration-500 ease-out'
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {OURVALUES_DATA.map((card, index) => (
              <div key={index} className='min-w-full min-h-full p-10'>
                <div className='bg-white rounded-lg shadow-lg overflow-hidden flex sm:flex-row flex-col justify-center items-center gap-y-4 sm:gap-x-4 px-5 py-5'>
                  {/* <img
                    src={card.image}
                    alt={card.heading}
                    className='w-full h-48 object-cover'
                  /> */}

                  <div className='flex flex-col justify-center items-center'>
                    <Image
                      // width={60}
                      // height={60}
                      src={card.image}
                      alt={card.heading}
                      className='h-16 w-16 object-contain'
                    />
                    <div className='text-center mt-3'>
                      <h2 className='text-[14px] font-semibold whitespace-nowrap'>
                        {card.title}
                      </h2>
                      <p className='text-[10px] whitespace-nowrap'>
                        {card?.heading}
                      </p>
                      {/* <p className='text-gray-600 mt-2'>{card.description}</p> */}
                    </div>
                  </div>

                  <div className='w-full'>
                    <span>
                      <Image
                        // width={60}
                        // height={60}
                        src={InvertedQoute}
                        alt={card.heading}
                        className=' w-10 object-cover'
                      />{' '}
                    </span>
                    <p className='text-[12px] p-4 h-[120px]'>{card?.desc}</p>
                    <span className='rotate-90  w-full'>
                      <Image
                        // width={60}
                        // height={60}
                        src={InvertedQoute}
                        alt={card.heading}
                        className='w-10 object-cover rotate-180 ml-auto'
                      />{' '}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className='absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-white text-white rounded-full'
        >
          <Image
            // width={60}
            // height={60}
            src={RightArrow}
            alt='right-arrow'
            className='w-3 object-cover rotate-180'
          />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className='absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-white text-white rounded-full'
        >
          <Image
            // width={60}
            // height={60}
            src={RightArrow}
            alt='right-arrow'
            className='w-3 object-cover'
          />
        </button>
      </div>
    </>
  );
};

export default ClientSaysCard;
