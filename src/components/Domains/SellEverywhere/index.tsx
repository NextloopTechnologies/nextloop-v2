import Image from 'next/image';

import { ecommerceAssets } from '../../../../assets';
import { getStaticImageData } from '../../../utils/helper';

const data = [
  {
    title: "sell on your website",
    descp: "Engage directly with shoppers and own their full customer journey by selling on your own eCommerce website that fully represents your brand.",
    icon: getStaticImageData(ecommerceAssets.desktopIcon)
  },
  {
    title: "sell in person",
    descp: "Offer products in-store with retail POS or on-the-go with Mobile POS and sync all your inventory and orders.",
    icon: getStaticImageData(ecommerceAssets.bookReaderIcon)
  },
  {
    title: "sell on market places",
    descp: "Reach shoppers on Google, eBay, Etsy, Amazon, Facebook, Instagram, TikTok and Wish, and manage it all from your Wix dashboard.",
    icon: getStaticImageData(ecommerceAssets.marketIcon)
  },
  {
    title: "sell internationally",
    descp: "Take your eCommerce website to international market with Wix Multilingual, currency converter and 80+ trusted payment providers around the world.",
    icon: getStaticImageData(ecommerceAssets.globeIcon)
  },
]

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

      {/* <Image
        src={SellEverywhereImage}
        alt='sell everywhere'
        className='h-[370px] w-[370px] md:h-[700px] md:w-[700px] object-contain mt-[100px]'
      /> */}

      <div className="w-screen h-screen flex justify-center items-center mt-[220px] mb-28 md:mt-14 md:mb-4">
        <div className="grid sm:grid-rows-2 gap-4 text-white">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex sm:rounded-tl-full bg-[#FA8145] px-4 sm:px-0 h-[260px] w-[260px] md:h-[320px] md:w-[320px] lg:h-[340px] lg:w-[340px] relative overflow-hidden">
              <div className='flex flex-col justify-center items-center md:mt-10 lg:mt-10 sm:items-end sm:pr-5'>
                <Image src={data[0]?.icon!} alt='' className='h-8 w-8 md:h-10 md:w-10' height={30} width={30} />
                <h3 className='uppercase text-xs md:text-lg font-medium mb-2 mt-3 px-4 sm:px-0 sm:mb-4 sm:mt-6'>{data[0]?.title}</h3>
                <p className='text-[9px] md:text-sm text-center sm:text-right sm:pl-24'>{data[0]?.descp}</p>
              </div>
            </div>
            <div className="flex sm:rounded-tr-full bg-[#1D1D1D] px-4 sm:px-0 h-[260px] w-[260px] md:h-[320px] md:w-[320px] lg:h-[340px] lg:w-[340px] relative overflow-hidden">
              <div className='flex flex-col justify-center items-center md:mt-5 lg:mt-5 sm:items-start sm:pl-5'>
                <Image src={data[1]?.icon!} alt='' className='h-8 w-8 md:h-10 md:w-10' height={30} width={30} />
                <h3 className='uppercase text-xs md:text-lg font-medium mb-2 mt-3 px-4 sm:px-0 sm:mb-4 sm:mt-6'>{data[1]?.title}</h3>
                <p className='text-[9px] md:text-sm text-center sm:text-left sm:pr-24'>{data[1]?.descp}</p>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex sm:rounded-bl-full  bg-[#1D1D1D] px-4 sm:px-0  h-[260px] w-[260px] md:h-[320px] md:w-[320px] lg:h-[340px] lg:w-[340px] relative overflow-hidden">
              <div className='flex flex-col justify-center items-center mb-10 sm:items-end sm:pr-5'>
                <Image src={data[2]?.icon!} alt='' className='h-7 w-6 md:h-8 md:w-8' height={30} width={30} />
                <h3 className='uppercase text-xs md:text-lg font-medium mb-2 mt-3 px-4 sm:px-0 sm:mb-4 sm:mt-6'>{data[2]?.title}</h3>
                <p className='text-[9px] md:text-sm text-center sm:text-right sm:pl-24'>{data[2]?.descp}</p>
              </div>
            </div>
            <div className="flex sm:rounded-br-full  bg-[#FA8145] px-4 sm:px-0 h-[260px] w-[260px] md:h-[320px] md:w-[320px] lg:h-[340px] lg:w-[340px] relative overflow-hidden">
              <div className='flex flex-col justify-center items-center mb-7 lg:mb-10 sm:items-start sm:pl-5'>
                <Image src={data[3]?.icon!} alt='' className='h-8 w-8 md:h-10 md:w-10' height={30} width={30} />
                <h3 className='uppercase text-xs md:text-lg font-medium mb-2 mt-3 px-4 sm:px-0  sm:mb-4 sm:mt-6'>{data[3]?.title}</h3>
                <p className='text-[9px] md:text-sm text-center sm:text-left sm:pr-24'>{data[3]?.descp}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellEverywhere;
