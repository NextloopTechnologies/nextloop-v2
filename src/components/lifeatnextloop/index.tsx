import Link from 'next/link';
import React from 'react';

const LifeAtNextloop = () => {
  return (
    <div className="relative w-full">

      {/* White background (top half) */}
      <div className="h-32 bg-white"></div>

      {/* Black background (bottom half) */}
      <div className="h-32 bg-black"></div>

      {/* Orange CTA Card */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-orange-500 text-black rounded-3xl shadow-2xl w-[90vw] sm:w-[80vw] md:w-[65vw] lg:w-[50vw] px-4 sm:px-6 py-8 sm:py-12 flex flex-col md:flex-row items-center gap-6">

          {/* Text */}
          <div className="text-center md:text-left flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Want to know more about Nextloop?
            </h3>
          </div>

          {/* Button */}
          <button
            type="button"
            className="bg-white text-black font-bold px-6 sm:px-10 py-3 rounded-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            <Link href="/culture">Life@Nextloop</Link>
          </button>
        </div>
      </div>

    </div>

  );
};

export default LifeAtNextloop;
