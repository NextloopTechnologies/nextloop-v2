import Image, { StaticImageData } from 'next/image';

import { Building, EnrollForWebsiteBg } from '../../../../assets';

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
  <div className='flex flex-col opacity-85 bg-[#1C1C1D] py-5 md:py-10 px-5 gap-4 h-[130px] md:h-[180px] w-[350px]'>
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
    <div className='flex'>
      <div className='w-full h-screen relative flex items-center justify-center text-white'>
        <Image
          src={EnrollForWebsiteBg}
          className='absolute h-full w-full object-cover'
          alt='blogs background'
          quality={100}
        />
        <div className='absolute h-screen flex flex-col inset-0 bg-black opacity-85 py-20 md:py-32 gap-10'>
          {titleElement || (
            <h1 className='text-3xl md:text-7xl uppercase font-bold text-center max-w-[1400px] mx-auto'>
              Enroll for website development to boost your hotel's most{' '}
              <span className='text-orange-500'>profitable channel</span>
            </h1>
          )}

          <div className='flex flex-col md:flex-row items-centers px-10 gap-8 md:gap-10 md:px-[170px]'>
            <div className='flex flex-wrap gap-8'>
              {(data || sampleData).map((data) => (
                <TitleDescCard
                  key={data.id}
                  title={data.title}
                  description={data.description}
                />
              ))}
            </div>

            <Image
              src={image || Building}
              alt='building'
              className={`hidden md:inline-flex md:w-[406px] md:h-[406px] object-contain ml-auto ${imageClassname}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollForWebsite;