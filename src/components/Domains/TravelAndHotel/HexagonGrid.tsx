import type { NextPage } from 'next';
import Image, { StaticImageData } from 'next/image';

import { travelandhotelAssets } from '../../../../assets';
import palette from '../../../styles/pallette';

export type HexagonGridType = {
  title: string;
  descp: string;
  icon: StaticImageData;
};

const HexagonGrid: NextPage<HexagonGridType> = ({ title, descp, icon }) => {
  return (
    <div className='relative w-[362px] h-[362px] text-center'>
      <Image
        className='absolute top-[0px] left-[0px] rounded w-full h-full z-[2]'
        alt='Indicators-image'
        width={300}
        height={300}
        src={travelandhotelAssets.polygonOuter}
      />
      <div className='absolute w-[calc(100%_-_18px)] top-[9px] right-[9px] left-[9px] h-[344px]'>
        <Image
          className='absolute top-[0px] left-[0px] rounded w-full h-full z-[3]'
          alt='Dots-image'
          width={300}
          height={300}
          src={travelandhotelAssets.polygonInner}
        />
        <Image
          className='absolute top-[52px] left-[148px] w-12 h-12 overflow-hidden z-[4]'
          loading='lazy'
          width={50}
          height={50}
          alt='chartline-image'
          src={icon}
        />
        <div className='relative top-[117px] z-[4] p-4'>
          <h3
            className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} leading-none uppercase font-bold mb-3`}
          >
            {title}
          </h3>
          <p className='leading-[22px] text-[#1D1D1D]'>{descp}</p>
        </div>
      </div>
    </div>
  );
};

export default HexagonGrid;
