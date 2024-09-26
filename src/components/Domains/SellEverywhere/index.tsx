import Image from 'next/image';

import { SellEverywhereImage } from '../../../../assets';
import palette from '../../../styles/pallette';

const SellEverywhere = () => {
  return (
    <div className='flex flex-col items-center pt-[96px] pb-[122px]  gap-5 px-8'>
      <h1
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} uppercase font-bold text-center w-2/3`}
      >
        Sell everywhere your <span className='text-orange-500'>customers</span>{' '}
        are
      </h1>

      <p
        className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} w-[90%] md:w-[52%] mx-auto text-center`}
      >
        Sell your products in more places with ease - in store, on the go, on
        your eCommerce website and on leading marketplaces - all synced to one
        dashboard.
      </p>

      <Image
        src={SellEverywhereImage}
        alt='sell everywhere'
        className='h-[370px] w-[370px] md:h-[500px] md:w-[500px] object-contain mt-10'
      />
    </div>
  );
};

export default SellEverywhere;
