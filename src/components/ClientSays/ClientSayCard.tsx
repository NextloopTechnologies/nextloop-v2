import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React, { FC, useCallback, useState } from 'react';

import palette from '../../styles/pallette';
import {
  InvertedQoute,
  Levram1,
  Stamens,
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
    title: 'Brijesh Panchal',
    desc: "Nextloop Technologies LLP delivered the project on time, meeting the client's expectations. They communicated frequently and promptly via email, ensuring an effective workflow. ",
  },
  {
    heading: 'Director, Shower Wealth Academy',
    image: SWAcademy as unknown as string,
    title: 'Ayush Shrivastav',
    desc: 'Nextloop Technologies LLP distinguishes itself in the realm of IT products and services through a myriad of pivotal factors, including innovative solutions.',
  },
  {
    heading: 'Founder, Stamens Software Pvt Ltd',
    image: Stamens as unknown as string,
    title: 'Shushil Kumar',
    desc: 'Their ability to consistently push boundaries and deliver cutting-edge solutions was truly remarkable.',
  },
];



const ClientCard = React.memo(({ card }: { card: ServiceCardProps }) => {
  return (
    <div className="min-w-full p-6 sm:p-10">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex sm:flex-row flex-col justify-center items-center gap-y-4 sm:gap-x-6 px-5 py-6 mx-auto sm:w-[80%]">

        {/* Client Info */}
        <div className="flex flex-col justify-center items-center">
          <Image
            src={card.image}
            alt={card.heading}
            width={64}
            height={64}
            className="object-contain"
            sizes="64px"
          />

          <div className="text-center mt-3">
            <h2
              className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} font-semibold`}
            >
              {card.title}
            </h2>

            <p
              className={`${palette.fontSize.descriptionSmall.mobile} md:${palette.fontSize.descriptionSmall.desktop}`}
            >
              {card.heading}
            </p>
          </div>
        </div>

        {/* Testimonial */}
        <div className="w-full flex flex-col justify-between items-center">

          <span className="self-start">
            <Image
              src={InvertedQoute}
              alt="quote icon"
              width={40}
              height={40}
              loading="lazy"
            />
          </span>

          <p
            className={`${palette.fontSize.descriptionSmall.mobile} md:${palette.fontSize.descriptionSmall.desktop} p-4 text-center`}
          >
            {card.desc}
          </p>

          <span className="self-end">
            <Image
              src={InvertedQoute}
              alt="quote icon"
              width={40}
              height={40}
              className="rotate-180"
              loading="lazy"
            />
          </span>

        </div>
      </div>
    </div>
  );
});

ClientCard.displayName = 'ClientCard';

/* =======================
   Main Component
======================= */

const ClientSaysCard: FC = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === OURVALUES_DATA.length - 1 ? 0 : prev + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? OURVALUES_DATA.length - 1 : prev - 1
    );
  }, []);

  const currentCard = OURVALUES_DATA[currentIndex];

  if (!currentCard) {
    return null;
  }

  return (
    <div className="relative w-full max-w-sm sm:max-w-[800px] mx-auto">

      <ClientCard card={currentCard} />

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
      >
        <ArrowLeft className="text-black" size={18} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
      >
        <ArrowRight className="text-black" size={18} />
      </button>

    </div>
  );
};

export default ClientSaysCard;