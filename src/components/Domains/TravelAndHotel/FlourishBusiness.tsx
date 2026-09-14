import Image, { StaticImageData } from 'next/image';

import HexagonGrid from './HexagonGrid';
import { travelandhotelAssets } from '../../../../assets';
import palette from '../../../styles/pallette';
import { getStaticImageData } from '../../../utils/helper';

const content: { title: string; descp: string; icon: StaticImageData }[] = [
  {
    title: 'Customized Booking Solutions',
    descp:
      'Give your clients the advantage of smooth online reservation platforms, real-time availability, and customized packages that improve user satisfaction.',
    icon: getStaticImageData(travelandhotelAssets.dynamicIcon),
  },
  {
    title: 'AI-Driven Customer Insights',
    descp:
      'To better analyze traveler behavior, enhance services, and provide individualized recommendations for client happiness, use artificial intelligence (AI) and predictive analytics.',
    icon: getStaticImageData(travelandhotelAssets.paymentIcon),
  },
  {
    title: 'Cloud-Based Management Systems',
    descp:
      'With cloud-based property and reservation management systems that guarantee effectiveness and scalability, you can access your company data from any location anytime.',
    icon: getStaticImageData(travelandhotelAssets.pictureIcon),
  },
  {
    title: 'Omnichannel Marketing Support',
    descp:
      'Increase client involvement and awareness through integrated digital marketing tactics, such as social media outreach and customized email campaigns.',
    icon: getStaticImageData(travelandhotelAssets.languageIcon),
  },
  {
    title: 'Smart Automation & Chatbots',
    descp:
      'Automate reservations, questions, and customer care with smart chatbots that offer round-the-clock help, enhancing service quality.',
    icon: getStaticImageData(travelandhotelAssets.travelIcon),
  },
  {
    title: 'Seamless Integration & Data Security',
    descp:
      'Integrate with top payment gateways and OTAs (online travel agencies) while protecting data with cutting-edge cybersecurity techniques.',
    icon: getStaticImageData(travelandhotelAssets.supportIcon),
  },
];

const FlourishBusiness = () => (
  <div className=' relative bg-[#010103]'>
    <h1
      className={` text-white ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} uppercase font-bold text-center py-14 px-10`}
    >
      flourish your <span className='text-orange-500'>travel & hotel</span>{' '}
      business with nextloop technologies
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
