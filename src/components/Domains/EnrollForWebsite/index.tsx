import Image, { StaticImageData } from 'next/image';

import { ecommerceAssets, hotelAssets } from '../../../../assets';

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
};

export const TitleDescCard = ({ title, description }: TitleDescCardProps) => (
  <div className="flex flex-col opacity-85 bg-[#1C1C1D] h-[250px] w-[150px] sm:h-[200px] sm:w-[250px] p-5 md:py-10 md:h-[180px] md:w-[350px] gap-4">
    <h3 className='text-sm md:text-xl font-medium uppercase'>{title}</h3>
    {description && (
      <p className='text-xs md:text-sm font-normal'>{description}</p>
    )}
  </div>
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
      <div className='flex flex-col py-20 md:py-32 gap-10 z-[2] items-center justify-center'>
        {titleElement || (
          <h1 className='text-3xl md:text-7xl uppercase font-bold text-center max-w-[1400px] mx-auto'>
            Enroll for website development to boost your hotel's most{' '}
            <span className='text-orange-500'>profitable channel</span>
          </h1>
        )}

        <div className='grid grid-cols-1 xl:grid-cols-2 place-items-center'>
          <div className='flex  flex-col items-center justify-center xl:ml-24'>
            <div className='flex gap-2 mb-2'>
              {(data || sampleData).slice(0, 2).map((data) => (
                <TitleDescCard
                  key={data.id}
                  title={data.title}
                  description={data.description}
                />
              ))}
            </div>
            <div className='flex gap-2 '>
              {(data || sampleData).slice(2, 4).map((data) => (
                <TitleDescCard
                  key={data.id}
                  title={data.title}
                  description={data.description}
                />
              ))}
            </div>
          </div>
          <div className='flex justify-centrer items-center'>
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