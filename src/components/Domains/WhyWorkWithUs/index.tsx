import Image, { StaticImageData } from 'next/image';

import { oilAndGasAssets } from '../../../../assets';
import palette from '../../../styles/pallette';
import { getStaticImageData } from '../../../utils/helper';

const sampleData = [
  {
    id: 1,
    image: getStaticImageData(oilAndGasAssets.WhyWorkWithUs),
    title: 'Custom Event Websites & Apps',
    description:
      'We design custom mobile applications and websites for events, giving participants quick access to speaker bios, event schedules, interactive maps, real-time updates, and personalised agendas for a better experience.',
  },
  {
    id: 2,
    image: getStaticImageData(oilAndGasAssets.MakeItReal),
    title: 'Virtual & Hybrid Event Solutions',
    description:
      'We provide innovative solutions for smooth virtual and hybrid events, such as interactive breakout spaces, real-time Q&A, networking lounges, high-quality live streaming, and audience interaction tools to bring together both online and in-person guests.',
  },
  {
    id: 3,
    image: getStaticImageData(oilAndGasAssets.WhyWorkWithUs),
    title: 'Event Branding & Customization',
    description:
      'We enhance the brand of your event by developing unique themes, logos, and immersive designs for digital media, providing a seamless experience that matches your vision and keeps guests engaged from start to finish.',
  },
  {
    id: 4,
    image: getStaticImageData(oilAndGasAssets.WhyWorkWithUs),
    title: 'Streamlined Promotion & Marketing of Events',
    description:
      'We use innovative marketing automation tools to optimize promotion on websites, email campaigns, and social media platforms, increasing awareness, engagement, and attendance by specifically targeting the right audience.',
  },
];

type DataItem = {
  id: number;
  image?: StaticImageData;
  title: string;
  description: string;
};

type Props = {
  data?: DataItem[];
};

const InfoOnImage = ({ description, image, title }: any) => (
  <div className='rounded-lg relative'>
    <div className='absolute flex gap-1 flex-col text-white top-3 left-5 z-10 lg:top-20 lg:left-16 right-6'>
      <h2
        className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} font-bold`}
      >
        {title}
      </h2>

      <p
        className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop} font-normal max-w-[350px] lg:max-w-xl`}
      >
        {description}
      </p>
    </div>

    <Image
      src={image}
      alt={title}
      height={500}
      width={500}
      className='w-full object-contain rounded-lg'
    />
  </div>
);

const WhyWorkWithUs = ({ data = [] }: Props) => {
  const finalData =
    data.length > 0
      ? data
          .map((item) =>
            typeof item === 'object' && item !== null
              ? {
                  ...item,
                  image:
                    item?.image ||
                    sampleData.find((sample) => sample.id === item.id)?.image,
                }
              : null
          )
          .filter((item) => item !== null)
      : sampleData;

  return (
    <div className='flex'>
      <div className='flex flex-col pt-[50px] pb-[122px] max-w-[1479px] mx-auto'>
        <h1
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} uppercase font-bold text-center`}
        >
          Why <span className='text-orange-500'>Work</span> With Us
        </h1>
        <div
          className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} mx-10 md:mx-0 text-center mt-5`}
        >
          <p>
            You get your app faster and more cost effective – no tech skills are
            needed. Your delivery date is calculated upfront and we lock in a
            fixed price.
          </p>
          <p>But we offer more than just fantastic software. Take a look.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:mx-0 gap-5 mt-10 px-8'>
          {finalData.map(({ description, id, image, title }) => (
            <InfoOnImage
              key={id}
              description={description}
              image={image}
              title={title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyWorkWithUs;
