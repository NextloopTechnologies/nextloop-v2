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
      'We build custom websites and mobile apps that give attendees everything they need in one place — speaker bios, event schedules, interactive maps, real-time updates, and personalised agendas — all designed to make the experience feel seamless from the first click.',
  },
  {
    id: 2,
    image: getStaticImageData(oilAndGasAssets.MakeItReal),
    title: 'Virtual & Hybrid Event Solutions',
    description:
      'Live streaming, real-time Q&A, networking lounges, and interactive breakout spaces — built to bring online and in-person audiences together without the friction that usually comes with it.',
  },
  {
    id: 3,
    image: getStaticImageData(oilAndGasAssets.WhyWorkWithUs),
    title: 'Event Branding & Customization',
    description:
      'Distinctive themes, logos, and immersive digital designs that carry your brand consistently across every touchpoint — creating an experience that feels intentional and keeps guests engaged from registration through to close.',
  },
  {
    id: 4,
    image: getStaticImageData(oilAndGasAssets.WhyWorkWithUs),
    title: 'Streamlined Promotion & Marketing of Events',
    description:
      'Targeted email campaigns, social media content, and marketing automation tools that build awareness, drive registrations, and put your event in front of exactly the right audience at exactly the right time.',
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
  title?: string;
  colouredTitle?: string;
  subtitle?: string;
};
type InfoOnImageProps = {
  description: string;
  image: StaticImageData | string | undefined;
  title: string;
};

const InfoOnImage = ({ description, image, title }: InfoOnImageProps) => (
  <article className='group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl'>
    <div className='absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent' />

    <div className='relative z-20 flex h-full min-h-[320px] flex-col justify-end gap-2 p-5 text-white md:min-h-[380px] md:p-6 lg:p-8'>
      <h2
        className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} font-bold`}
      >
        {title}
      </h2>

      <p
        className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop} max-w-[350px] font-normal text-white/90 lg:max-w-xl`}
      >
        {description}
      </p>
    </div>

    {image && (
      <Image
        src={image}
        alt={title}
        fill
        sizes='(max-width: 768px) 100vw, 50vw'
        className='absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105'
      />
    )}
  </article>
);

const WhyWorkWithUs = ({
  data = [],
  title = 'Why',
  colouredTitle = 'Nextloop Technologies?',
  subtitle = "Your platform is delivered faster and more cost-effectively than you'd expect — no technical background needed on your end. Your delivery date is confirmed upfront, and your price is locked in from day one.",
}: Props) => {
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
      <div className='flex flex-col pt-[50px] pb-[122px] max-w-[1479px] mx-auto  justify-center items-center'>
        <h2
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold text-center`}
        >
          {title} <span className='text-orange-500'>{colouredTitle}</span>
        </h2>
        <div
          className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} flex flex-col justify-center items-center w-3/4 text-center mt-5`}
        >
          <p>{subtitle}</p>
        </div>

        <div className='mt-10 grid w-full grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-8 lg:mx-0 lg:gap-8'>
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
