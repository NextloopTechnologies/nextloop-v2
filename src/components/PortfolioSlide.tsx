import { MoveLeft, MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import palette from '../styles/pallette';
import {
  Portfolio1,
  Portfolio2,
  Portfolio3,
  Portfolio4,
} from '../../assets/';
interface PortfolioCardProps {
  image: string;
  caption: string;
  link: string;
}

const IMAGE_DATA: PortfolioCardProps[] = [
  { image: Portfolio1 as unknown as string, caption: 'BrewPod', link: 'portfolio/4/?scrollToHeader=true' },
  { image: Portfolio2 as unknown as string, caption: 'Shower Wealth Academy', link: 'portfolio/5/?scrollToHeader=true' },
  { image: Portfolio3 as unknown as string, caption: 'Millennials', link: 'portfolio/2/?scrollToHeader=true' },
  { image: Portfolio4 as unknown as string, caption: 'Blue Bird Event', link: 'portfolio/1/?scrollToHeader=true' },
];

const PortfolioSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setItemsPerView(2); // Tablet & Desktop
      } else {
        setItemsPerView(1); // Mobile
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    if (currentIndex + itemsPerView < IMAGE_DATA.length) {
      setCurrentIndex(currentIndex + itemsPerView);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerView >= 0) {
      setCurrentIndex(currentIndex - itemsPerView);
    }
  };

  return (
    <section className="w-full bg-black py-16 px-4">
      <div className="w-[80vw] mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className={`${palette.fontSize.heading2.mobile} md:text-4xl uppercase font-bold text-white`}>
            Our <span className="text-orange-500">Portfolio</span>
          </h2>
          <p className="mt-3 text-gray-300 max-w-3xl mx-auto">
            Showcasing innovative software and digital solutions that deliver measurable business impact
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">

          {/* GRID FIXED HERE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {IMAGE_DATA.slice(currentIndex, currentIndex + itemsPerView).map((item, index) => (
              <div
                key={index}
                className="flex flex-col w-full"
              >
                {/* Image */}
                <div className="relative w-full h-[300px] sm:h-[380px] md:h-[420px] lg:h-[480px] xl:h-[520px]">
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-2xl"
                  />

                  {/* Mobile arrows */}
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 p-2 rounded-full disabled:opacity-30"
                  >
                    <MoveLeft className="text-orange-500 w-6 h-6" />
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentIndex + itemsPerView >= IMAGE_DATA.length}
                    className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 p-2 rounded-full disabled:opacity-30"
                  >
                    <MoveRight className="text-orange-500 w-6 h-6" />
                  </button>
                </div>

                {/* Caption */}
                <div className="py-4 flex justify-center">
                  <Link href={item.link}>
                    <p className="text-xl sm:text-2xl md:text-3xl font-semibold underline text-white hover:text-orange-500 transition-colors duration-300 text-center tracking-tighter">
                      {item.caption}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop arrows */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="hidden md:block absolute left-[-60px] top-1/2 -translate-y-1/2 z-20 disabled:opacity-30"
          >
            <MoveLeft className="text-orange-500 w-11 h-11" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex + itemsPerView >= IMAGE_DATA.length}
            className="hidden md:block absolute right-[-60px] top-1/2 -translate-y-1/2 z-20 disabled:opacity-30"
          >
            <MoveRight className="text-orange-500 w-11 h-11" />
          </button>

        </div>
      </div>
    </section>
  );
};

export default PortfolioSlide;
