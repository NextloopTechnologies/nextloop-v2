import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import CLientCard from './CLientCard';
import palette from '../../styles/pallette';
import {
  BlueBird,
  CB1,
  Client2,
  Levram1,
  Millennialz,
  OurCLient,
  ShowerWealth,
  SWAcademy,
  FinsenLogo,
  BrainInventory,
  LarishaLogo,
  ItfLogo,
  JhanaLogo,
  EwaLogo,
  AtzeanLogo,
  ArthnextLogo,
} from '../../../assets';

import 'swiper/css';
import styles from './OurClients.module.css';

interface ServiceCardProps {
  heading: string;
  image: string;
}

const OURVALUES_DATA: ServiceCardProps[] = [
  { heading: 'Persistence', image: OurCLient as unknown as string },
  { heading: 'Customer Centric', image: BlueBird as unknown as string },
  { heading: 'Agility', image: SWAcademy as unknown as string },
  { heading: 'Ideas', image: Client2 as unknown as string },
  { heading: 'Impact', image: Levram1 as unknown as string },
  { heading: 'Customer Centric', image: CB1 as unknown as string },
  { heading: 'Agility', image: ShowerWealth as unknown as string },
  { heading: 'Agility', image: Millennialz as unknown as string },
  { heading: 'Fintech', image: FinsenLogo as unknown as string },
  { heading: 'Brain Inventory', image: BrainInventory as unknown as string },
  { heading: 'Lavender', image: LarishaLogo as unknown as string },
  { heading: 'ITF', image: ItfLogo as unknown as string },
  { heading: 'Jhana', image: JhanaLogo as unknown as string },
  { heading: 'EWA', image: EwaLogo as unknown as string },
  { heading: 'Atzean', image: AtzeanLogo as unknown as string },
  { heading: 'Artha', image: ArthnextLogo as unknown as string },
];

const OurCLients: FC = () => {
  return (
    <div className="bg-[#1D1D1D] flex flex-col items-center w-full overflow-hidden py-10 md:py-20">
      <header className="flex gap-10 lg:w-4/6 lg:px-10 text-center">
        <div className="pt-2 w-full flex flex-col justify-center items-center gap-y-3 z-10 px-4">
          <div className={`${palette.fontSize.heading2.mobile} md:text-4xl text-white uppercase font-bold text-center`}>
            OUR <span className="text-orange-500">Clients</span>
          </div>
          <span className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} text-white text-center`}>
            Accelerating digital outcomes through rapid innovation and strategic execution.
          </span>
        </div>
      </header>

      <div className="relative w-full lg:w-11/12 mt-10 px-4 overflow-hidden">
        <div className={styles.fadeLeft}></div>
        <div className={styles.fadeRight}></div>
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={30}
          loop={true}
          speed={2500}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          freeMode={{
            enabled: true,
          }}
          allowTouchMove={false}
          className={styles.clientSwiper}
        >
          {[...OURVALUES_DATA, ...OURVALUES_DATA].map((data, index) => (
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
