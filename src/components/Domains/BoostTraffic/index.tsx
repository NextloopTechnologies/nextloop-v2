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
  <div className='relative flex flex-col justify-center text-center items-center mx-auto p-8'>
    <Image src={ecommerceAssets.rectangleBg} height={300} width={300} alt='' className='absolute object-cover h-full w-full' />
    <h4 className='text-2xl font-bold uppercase text-white mb-4'>{title}</h4>
    <h1 className='text-5xl text-orange-500 font-bold mb-4'>{percentage}</h1>
    <p className='mx-5 text-white font-normal mb-4'>{description}</p>
  </div>
);

const BoostTraffic = () => {
  return (
    <div className='h-full bg-[#010103] relative flex items-center justify-center text-white'>
      <Image
        src={ecommerceAssets.BoostTrafficBg}
        className='absolute h-full w-full object-cover z-[1]'
        alt='blogs background'
        fill
        sizes='100vw'
        priority
        quality={100}
      />
      <div className='flex flex-col items-center py-20 md:py-32 gap-10 z-[2]'>
        <h1 className='text-3xl md:text-7xl uppercase font-bold text-center max-w-[1200px] mx-auto'>
          Boost traffic and revenue with a full{' '}
          <span className='text-orange-500'>marketing suite</span>
        </h1>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 mx-4'>
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
  );
};

export default BoostTraffic;
