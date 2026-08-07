import Image, { StaticImageData } from 'next/image';

import { ecommerceAssets, hotelAssets } from '../../../../assets';
import palette from '../../../styles/pallette';

const sampleData = [
  {
    id: 1,
    title: 'Booking Engine Integration',
    description:
      'Easily integrate the website builder with the SiteMinder Booking Engine to provide a seamless booking experience for travellers.',
  },
  {
    id: 2,
    title: 'Promotions and offers',
    description:
      'Once integrated with the booking engine, your website can display promotions and optional extras to convert last minute bookings.',
  },
  {
    id: 3,
    title: 'Free website domain hosting',
    description:
      'Enjoy complete control of your website with a free SiteMinder web domain.',
  },
  {
    id: 4,
    title: 'Globally available',
    description:
      'Make it easy for international guests with multi-language options available.',
  },
];

type Props = {
  image?: StaticImageData;
  imageClassname?: string;
  titleElement?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
};

type TitleDescCardProps = {
  title: string;
  description?: string;
  className?: string; // Added className prop
};

export const TitleDescCard = ({
  title,
  description,
  className,
}: TitleDescCardProps) => (
  <article
    className={`flex h-auto w-full max-w-[340px] flex-col rounded-2xl border border-white/5 bg-[#1C1C1D]/95 p-5 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 md:max-w-[320px] md:p-6 ${className}`}
  >
    <h3
      className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} uppercase`}
    >
      {title}
    </h3>
    {description && (
      <p
        className={`${palette.fontSize.descriptionSmall.mobile} md:${palette.fontSize.descriptionSmall.desktop}`}
      >
        {description}
      </p>
    )}
  </article>
);

const EnrollForWebsite = ({
  image,
  imageClassname,
  titleElement,
  data,
}: Props) => {
  return (
    <div className='h-full bg-[#010103] relative flex items-center text-white justify-center'>
      <Image
        src={ecommerceAssets.EnrollForWebsiteBg}
        className='absolute h-full w-full object-cover z-[1]'
        alt='blogs background'
        fill
        sizes='100vw'
        priority
        quality={100}
      />
      <div className='flex flex-col py-10 md:py-20 gap-5 z-[2] items-center justify-center'>
        {titleElement || (
          <h1 className='text-3xl md:text-7xl uppercase font-bold text-center max-w-[1400px] mx-auto'>
            Enroll for website development to boost your hotel's most{' '}
            <span className='text-orange-500'>profitable channel</span>
          </h1>
        )}

        <div className='grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 md:px-6 lg:px-10'>
          <div className='flex w-full flex-col items-center justify-center'>
            <div className='mb-4 flex w-full flex-col items-stretch gap-4 md:ml-10 md:flex-row md:justify-center'>
              {(data || sampleData).slice(0, 2).map((data) => (
                <TitleDescCard
                  key={data.id}
                  title={data.title}
                  description={data.description}
                  className='w-full md:flex-1 md:max-w-[320px]'
                />
              ))}
            </div>
            <div className='flex w-full flex-col items-stretch gap-4 md:ml-10 md:flex-row md:justify-center'>
              {(data || sampleData).slice(2, 4).map((data) => (
                <TitleDescCard
                  key={data.id}
                  title={data.title}
                  description={data.description}
                  className='w-full md:flex-1 md:max-w-[320px]'
                />
              ))}
            </div>
          </div>
          <div className='flex w-full items-center justify-center'>
            <Image
              src={image || hotelAssets.Building}
              width={400}
              height={400}
              alt='building'
              className={`object-contain ${imageClassname}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollForWebsite;
