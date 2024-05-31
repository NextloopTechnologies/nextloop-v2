import Image from 'next/image';

import { SellEverywhereImage } from '../../../../assets';

const SellEverywhere = () => {
  return (
    <div className='flex flex-col items-center pt-[96px] pb-[122px] max-w-[1479px] mx-auto gap-5'>
      <h1 className='text-3xl md:text-7xl uppercase font-bold text-center w-2/3'>
        Sell everywhere your <span className='text-orange-500'>customers</span>{' '}
        are
      </h1>

      <p className='text-lg font-normal w-[90%] md:w-[52%] mx-auto text-center'>
        Sell your products in more places with ease - in store, on the go, on
        your eCommerce website and on leading marketplaces - all synced to one
        dashboard.
      </p>

      <Image
        src={SellEverywhereImage}
        alt='sell everywhere'
        className='h-[370px] w-[370px] md:h-[700px] md:w-[700px] object-contain mt-[100px]'
      />
    </div>
  );
};

export default SellEverywhere;
