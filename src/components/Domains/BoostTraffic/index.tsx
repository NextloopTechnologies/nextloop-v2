import Image from 'next/image';

import { ecommerceAssets } from '../../../../assets';
import palette from '../../../styles/pallette';

const sampleData = [
  {
    id: 1,
    title: 'SEO',
    percentage: '24%',
    description:
      'Increase in monthly revenue for stores using Nextloop SEO tools. Optimize your store for search engines with Nextloop built-in SEO tools',
  },
  {
    id: 2,
    title: 'Paid advertising',
    percentage: '30%',
    description:
      'More revenue on average for Wix sites using paid ad features. Run precise ad campaigns on Google and Facebook without technical expertise',
  },
  {
    id: 3,
    title: 'Email Marketing',
    percentage: '45%',
    description:
      'Higher revenues on average for Wix stores using automated emails. Bring in returning customers with email marketing templates and AI-generated emails',
  },
  {
    id: 4,
    title: 'Blogs',
    percentage: '71%',
    description:
      "More organic traffic on average for stores using Wix blog tools. Create a blog to attract online shoppers and boost your brand's authority",
  },
  {
    id: 5,
    title: 'Gift cards',
    percentage: '65%',
    description:
      'Increase in average order value for Wix sites accepting gift cards. Improve sales and bring in new shoppers with your own digital gift cards',
  },
  {
    id: 6,
    title: 'Social media marketing',
    percentage: '6X',
    description:
      'More revenue from social media activity for sites using Wix tools. Promote your store with social media templates and AI-powered captions and hashtags',
  },
];

type TitleDescCardProps = {
  title: string;
  description?: string;
  percentage: string;
};

export const TitleDescCard = ({
  title,
  description,
  percentage,
}: TitleDescCardProps) => (
  <div className='bg-[#1A0E0A] justify-center text-center flex flex-col items-center gap-5 w-full h-[300px] p-4'>
    <h4
      className={`${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop} font-bold uppercase text-white`}
    >
      {title}
    </h4>
    <h1
      className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-orange-500 font-bold`}
    >
      {percentage}
    </h1>
    <p
      className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} text-[#BAB7B5] font-normal`}
    >
      {description}
    </p>
  </div>
);

const BoostTraffic = () => {
  return (
    <div className='relative w-full min-h-screen'>
      <Image
        src={ecommerceAssets.BoostTrafficBg}
        className='absolute inset-0 w-full h-full object-cover'
        alt='blogs background'
        fill
        sizes='100vw'
        priority
        quality={100}
      />
      <div className='relative z-10 w-full min-h-screen bg-black bg-opacity-85 py-12 px-4 md:py-24 md:px-8'>
        <div className='max-w-7xl mx-auto flex flex-col h-full'>
          <h1
            className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} uppercase font-bold text-center mb-16 text-white`}
          >
            Boost traffic and revenue with a full{' '}
            <span className='text-orange-500'>marketing suite</span>
          </h1>

          <div className='flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr'>
            {sampleData.map((data) => (
              <TitleDescCard
                key={data.id}
                title={data.title}
                description={data.description}
                percentage={data.percentage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostTraffic;
