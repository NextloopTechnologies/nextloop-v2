import Image, { StaticImageData } from 'next/image';

import { ecommerceAssets } from '../../../../assets';
import { getStaticImageData } from '../../../utils/helper';

type DataProps = {
  title: string;
  descp: string;
  icon: StaticImageData;
  round_direction: string;
  bg_color: string;
  contentStyle: string;
  iconStyle?: string;
  descpStyle: string;
}

const data: DataProps[] = [
  {
    title: "sell on your website",
    descp: "Engage directly with shoppers and own their full customer journey by selling on your own eCommerce website that fully represents your brand.",
    icon: getStaticImageData(ecommerceAssets.desktopIcon),
    round_direction: 'rounded-tl-full',
    bg_color: "#FA8145",
    contentStyle: 'md:mt-10 lg:mt-10 sm:items-end sm:pr-5',
    descpStyle: 'sm:text-right sm:pl-24'
  },
  {
    title: "sell in person",
    descp: "Offer products in-store with retail POS or on-the-go with Mobile POS and sync all your inventory and orders.",
    icon: getStaticImageData(ecommerceAssets.bookReaderIcon),
    round_direction: 'rounded-tr-full',
    bg_color: "#1D1D1D",
    contentStyle: 'md:mt-5 lg:mt-5 sm:items-start sm:pl-5',
    descpStyle: 'sm:text-left sm:pr-24'
  },
  {
    title: "sell on market places",
    descp: "Reach shoppers on Google, eBay, Etsy, Amazon, Facebook, Instagram, TikTok and Wish, and manage it all from your Wix dashboard.",
    icon: getStaticImageData(ecommerceAssets.marketIcon),
    round_direction: 'rounded-bl-full',
    bg_color: "#1D1D1D",
    contentStyle: 'mb-10 sm:items-end sm:pr-5',
    iconStyle: 'h-7 w-6 md:h-8 md:w-8',
    descpStyle: 'sm:text-right sm:pl-24'
  },
  {
    title: "sell internationally",
    descp: "Take your eCommerce website to international market with Wix Multilingual, currency converter and 80+ trusted payment providers around the world.",
    icon: getStaticImageData(ecommerceAssets.globeIcon),
    round_direction: 'rounded-br-full',
    bg_color: "#FA8145",
    contentStyle: 'mb-7 lg:mb-10 sm:items-start sm:pl-5',
    descpStyle: 'sm:text-left sm:pr-24'
  },
]

const RoundedTriangle: React.FC<DataProps> = ({
  title,
  descp,
  icon,
  round_direction,
  bg_color,
  contentStyle,
  descpStyle,
  iconStyle = 'h-8 w-8 md:h-10 md:w-10'
}) => {
  return (
    <div className={`flex sm:${round_direction} bg-[${bg_color}] px-4 sm:px-0 h-[260px] w-[260px] md:h-[320px] md:w-[320px] lg:h-[340px] lg:w-[340px] relative overflow-hidden`}>
      <div className={`flex flex-col justify-center items-center ${contentStyle}`}>
        <Image src={icon} alt='sell-icon' className={`${iconStyle}`} height={30} width={30} />
        <h3 className='uppercase text-xs md:text-lg font-medium mb-2 mt-3 px-4 sm:px-0 sm:mb-4 sm:mt-6'>{title}</h3>
        <p className={`text-[9px] md:text-sm text-center ${descpStyle}`}>{descp}</p>
      </div>
    </div>
  )
}

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

      <div className="w-screen h-screen flex justify-center items-center mt-[220px] mb-28 md:mt-14 md:mb-4">
        <div className="grid sm:grid-rows-2 gap-4 text-white">
          <div className="grid sm:grid-cols-2 gap-4">
            {data.slice(0, 2).map(({ title, descp, icon, bg_color, round_direction, contentStyle, descpStyle }, idx) => (
              <RoundedTriangle key={idx} title={title} descp={descp}
                icon={icon} bg_color={bg_color} round_direction={round_direction} contentStyle={contentStyle}
                descpStyle={descpStyle}
              />
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.slice(2, 4).map(({ title, descp, icon, bg_color, round_direction, contentStyle, iconStyle, descpStyle }, idx) => (
              <RoundedTriangle key={idx} title={title} descp={descp}
                icon={icon} bg_color={bg_color} round_direction={round_direction} contentStyle={contentStyle}
                descpStyle={descpStyle} iconStyle={iconStyle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellEverywhere;
