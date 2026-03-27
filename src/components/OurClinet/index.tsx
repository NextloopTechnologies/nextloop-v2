import { StaticImageData } from "next/image";
import React, { FC } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import styles from './OurClients.module.css';

import CLientCard from './CLientCard';
import palette from '../../styles/pallette';
import {
  ArthnextLogo,
  AtzeanLogo,
  BlueBird,
  BrainInventory,
  CB1,
  Client2,
  EwaLogo,
  FinsenLogo,
  ItfLogo,
  JhanaLogo,
  LarishaLogo,
  Levram1,
  Millennialz,
  OurCLient,
  ShowerWealth,
  SWAcademy,
} from '../../../assets';

interface ServiceCardProps {
  heading: string;
  image: StaticImageData;
}

const OURVALUES_DATA: ServiceCardProps[] = [
  { heading: 'Persistence', image: OurCLient },
  { heading: 'Customer Centric', image: BlueBird },
  { heading: 'Agility', image: SWAcademy },
  { heading: 'Ideas', image: Client2 },
  { heading: 'Impact', image: Levram1 },
  { heading: 'Customer Centric', image: CB1 },
  { heading: 'Agility', image: ShowerWealth },
  { heading: 'Agility', image: Millennialz },
  { heading: 'Fintech', image: FinsenLogo },
  { heading: 'Brain Inventory', image: BrainInventory },
  { heading: 'Lavender', image: LarishaLogo },
  { heading: 'ITF', image: ItfLogo },
  { heading: 'Jhana', image: JhanaLogo },
  { heading: 'EWA', image: EwaLogo },
  { heading: 'Atzean', image: AtzeanLogo },
  { heading: 'Artha', image: ArthnextLogo },
];

const OurCLients: FC = () => {
  const sliderData = [...OURVALUES_DATA, ...OURVALUES_DATA];

  return (
    <div className="bg-[#1D1D1D] flex flex-col items-center w-full overflow-hidden py-10 md:py-20">
      <header className="flex gap-10 lg:w-4/6 lg:px-10 text-center">
        <div className="pt-2 w-full flex flex-col justify-center items-center gap-y-3 z-10 px-4">
          <div
            className={`${palette.fontSize.heading2.mobile} md:text-4xl text-white font-bold text-center`}
          >
            <h2>
              Our <span className="text-orange-500">Trusted Partners</span>
            </h2>
          </div>

          <h3
            className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} text-white text-center`}
          >
            Serving as the dedicated IT outsourcing partner for ambitious startups, healthcare providers, and global enterprises. 
          </h3>
        </div>
      </header>

      <div className="relative w-full lg:w-11/12 mt-10 px-4 overflow-hidden">
        <div className={styles.fadeLeft}></div>
        <div className={styles.fadeRight}></div>

        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={30}
          loop
          speed={2500}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          allowTouchMove={false}
          className={styles.clientSwiper}
        >
          {sliderData.map((data, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <CLientCard heading={data.heading} image={data.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OurCLients;