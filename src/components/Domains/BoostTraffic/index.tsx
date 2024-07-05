import Image from 'next/image';

import { ecommerceAssets } from '../../../../assets';

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
  <div className='bg-[#1A0E0A] justify-center text-center flex flex-col items-center gap-5 mx-auto w-[370px] md:w-[475px] h-[300px]'>
    <h4 className='text-2xl font-bold uppercase text-white'>{title}</h4>

    <h1 className='text-5xl text-orange-500 font-bold'>{percentage}</h1>

    <p className='text-lg mx-5 text-[#BAB7B5] font-normal'>{description}</p>
  </div>
);

const BoostTraffic = () => {
  return (
    <div className='flex h-[250vh] md:h-[130vh]'>
      <div className='w-full min-h-screen relative flex items-center justify-center text-white'>
        <Image
          src={ecommerceAssets.BoostTrafficBg}
          className='absolute h-full w-full object-cover'
          alt='blogs background'
          fill
          sizes='100vw'
          priority
          quality={100}
        />
        <div className='absolute min-h-screen flex flex-col items-center inset-0 bg-black opacity-85 py-20 md:py-32 gap-10'>
          <h1 className='text-3xl md:text-7xl uppercase font-bold text-center max-w-[1200px] mx-auto'>
            Boost traffic and revenue with a full{' '}
            <span className='text-orange-500'>marketing suite</span>
          </h1>

          <div className='flex flex-wrap mt-10 gap-8 max-w-[1500px] mx-auto'>
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
