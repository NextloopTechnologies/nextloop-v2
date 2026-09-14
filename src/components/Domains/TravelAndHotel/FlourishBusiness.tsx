import Image, { StaticImageData } from 'next/image';

import HexagonGrid from './HexagonGrid';
import { travelandhotelAssets } from '../../../../assets';
import palette from '../../../styles/pallette';
import { getStaticImageData } from '../../../utils/helper';

const content: { title: string; descp: string; icon: StaticImageData }[] = [
  {
    title: 'Bespoke Booking Solutions ',
    descp:
      'Give your clients the advantage of smooth online reservation platforms, real-time availability, and customized packages that improve user satisfaction.',
    icon: getStaticImageData(travelandhotelAssets.dynamicIcon),
  },
  {
    title: 'AI-Powered Traveler Insights ',
    descp:
      'Leverage predictive analytics and artificial intelligence to decode guest behavior, refine your offerings, and deliver tailored recommendations that drive customer loyalty.',
    icon: getStaticImageData(travelandhotelAssets.paymentIcon),
  },
  {
    title: 'Cloud-Enabled Management Hubs ',
    descp:
      'Access critical business intelligence from anywhere with cloud-native property and booking management tools designed for peak efficiency and effortless scalability. ',
    icon: getStaticImageData(travelandhotelAssets.pictureIcon),
  },
  {
    title: 'Omnichannel Marketing Strategies ',
    descp:
      'Boost brand visibility and guest engagement across channels with cohesive digital marketing campaigns, targeted social media initiatives, and personalized email outreach. ',
    icon: getStaticImageData(travelandhotelAssets.languageIcon),
  },
  {
    title: 'Intelligent Automation & AI Chatbots ',
    descp:
      'Streamline bookings and resolve guest inquiries instantly with smart virtual assistants that offer 24/7 support, drastically reducing your operational response times. ',
    icon: getStaticImageData(travelandhotelAssets.travelIcon),
  },
  {
    title: 'Secure Integrations & Advanced Protection ',
    descp:
      'Connect effortlessly with major global payment gateways and leading OTAs while safeguarding sensitive customer data through industry-leading cybersecurity frameworks. ',
    icon: getStaticImageData(travelandhotelAssets.supportIcon),
  },
];

const FlourishBusiness = () => (
  <div className=' relative bg-[#010103]'>
    <h1
      className={` text-white ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop}  font-bold text-center py-14 px-10`}
    >
      Elevate Your Travel & Hospitality Brand{' '}
      <span className='text-orange-500'>with Nextloop Technologies</span>
    </h1>
    <div className='relative w-full'>
      <Image
        className='absolute inset-0 w-full object-cover z-[1]'
        alt='main bg'
        fill
        sizes='100vw'
        priority
        src={travelandhotelAssets.enrollForWebsiteBg}
      />
      <div className='relative flex flex-col justify-center items-center z-[2] gap-y-6 py-3 px-2 lg:flex-row lg:gap-10 olg:gap-6 olg:py-24'>
        {content.slice(0, 2).map(({ title, descp, icon }, idx) => (
          <HexagonGrid key={idx} title={title} descp={descp} icon={icon} />
        ))}
      </div>
      <div className='relative flex flex-col justify-center items-center gap-y-6 py-3 px-2 z-[2] olg:py-0 lg:flex-row lg:gap-10 olg:-top-[163px] olg:gap-[400px]'>
        {content.slice(2, 4).map(({ title, descp, icon }, idx) => (
          <HexagonGrid key={idx} title={title} descp={descp} icon={icon} />
        ))}
      </div>
      <div className='relative flex flex-col justify-center items-center gap-y-6 py-3 px-2 pb-4 z-[2] olg:py-0 lg:flex-row lg:gap-10 olg:-top-[230px] olg:gap-6'>
        {content.slice(4, 6).map(({ title, descp, icon }, idx) => (
          <HexagonGrid key={idx} title={title} descp={descp} icon={icon} />
        ))}
      </div>
    </div>
  </div>
);

export default FlourishBusiness;
