import Image, { StaticImageData } from 'next/image';

import { oilAndGasAssets } from '../../../../assets';
import palette from '../../../styles/pallette';
import { getStaticImageData } from '../../../utils/helper';

const sampleData = [
  {
    id: 1,
    image: getStaticImageData(oilAndGasAssets.WhyWorkWithUs),
    title: 'Try before you buy',
    description:
      'Nextloop is our free prototyping tool. It’s the simple way to create a clickable mockup of your oil and gas software. You can customise everything to see how your app will act and look. Did we mention it takes less than 10 minutes? Play around, get feedback from others and decide exactly how you want your app to behave.',
  },
  {
    id: 2,
    image: getStaticImageData(oilAndGasAssets.MakeItReal),
    title: 'Make it real with our no-code app builder',
    description:
      'Nextloop is where your idea comes to life. If you can order pizza online, you can make an app. Choose a similar idea – the base. Next, add some toppings – your desired features. It’s literally that easy. You don’t need to code. You don’t spend weeks learning to use new systems. It’s simple and our team is always ready to help.',
  },
  {
    id: 3,
    image: getStaticImageData(oilAndGasAssets.WhyWorkWithUs),
    title: 'Cloud bills become a breeze',
    description:
      'Nextloop lets your oil and gas software run on any public cloud – with just one account. You get access to AWS, DigitalOcean, Alibaba Cloud and Microsoft Azure to name a few. Our AI predicts your spending so you can budget accurately. Why? Big savings. Last year alone our clients saved $4.5 million.',
  },
  {
    id: 4,
    image: getStaticImageData(oilAndGasAssets.WhyWorkWithUs),
    title: 'Software that always performs',
    description:
      'Nextloop is our aftercare service. We review your code after any OS updates to make sure everything is running perfectly. And artificial intelligence uses real-time monitoring to catch potential issues before they can develop into a real problem. Your software is always up to date and bug-free – It’ll never become legacy software.',
  },
];

type Props = {
  image: StaticImageData;
  title: string;
  description: string;
};

const InfoOnImage = ({ description, image, title }: Props) => (
  <div className='rounded-lg relative'>
    <div className='absolute flex gap-5 flex-col text-white top-8 left-6 z-10 lg:top-20 lg:left-16 right-6'>
      <h2
        className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} font-bold`}
      >
        {title}
      </h2>

      <p
        className={`${palette.fontSize.descriptionSmall.mobile} md:${palette.fontSize.descriptionSmall.desktop} font-normal max-w-[350px] lg:max-w-xl`}
      >
        {description}
      </p>
    </div>

    <Image
      src={image}
      alt={title}
      height={300}
      width={300}
      className='w-full md:w-[600px] object-fill rounded-lg'
    />
  </div>
);

const WhyWorkWithUs = () => {
  return (
    <div className='flex'>
      <div className='flex flex-col pt-[50px] pb-[122px] max-w-[1479px] mx-auto'>
        <h1
          className={`${palette.fontSize.heading2} md:${palette.fontSize.heading2.desktop} uppercase font-bold text-center`}
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

        <div className='grid grid-cols-1 md:grid-cols-2  lg:mx-0 gap-5 mt-10 px-8'>
          {sampleData.map(({ description, id, image, title }) => (
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
