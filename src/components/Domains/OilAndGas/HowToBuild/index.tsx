import Image, { StaticImageData } from 'next/image';
import React from 'react';

import { oilAndGasAssets } from '../../../../../assets';
import palette from '../../../../styles/pallette';
import { getStaticImageData } from '../../../../utils/helper';

const data = [
  {
    id: 1,
    title: 'Oil and gas operations management software',
    descp:
      'Your operation produces huge amounts of data. Understand and visualise it easily. Pick the metrics you monitor and AI instantly identifies your improvement areas.',
    icon: getStaticImageData(oilAndGasAssets.miningIcon),
  },
  {
    id: 2,
    title: 'Predictive maintenance software for oil and gas',
    descp:
      'Continuous equipment monitoring ensures everything runs optimally. Stay fully compliant effortlessly. Push notifications send you fast reminders when any urgent machine issues are found.',
    icon: getStaticImageData(oilAndGasAssets.lifeCycleIcon),
  },
  {
    id: 3,
    title: 'Reservoir modeling and simulation tools',
    descp:
      'Use collected data to safely simulate various outcomes. Want to see how fluid or gravel figures change things? Do it easily with just one click.',
    icon: getStaticImageData(oilAndGasAssets.optimiseIcon),
  },
  {
    id: 4,
    title: 'Offshore oil and gas software solutions',
    descp:
      'Working offshore brings unique regulations and complex connectivity issues. Do not worry. Our dedicated offline ready apps handle all of these challenges easily for you.',
    icon: getStaticImageData(oilAndGasAssets.readyIcon),
  },
  {
    id: 5,
    title: 'Regulatory compliance tracking software for energy',
    descp:
      'No more messy cabinets. Store all your documents safely in the cloud. Simple search features make your production and safety reports instantly accessible to everyone.',
    icon: getStaticImageData(oilAndGasAssets.onePlaceIcon),
  },
  {
    id: 6,
    title: 'Seamless software integration',
    descp:
      'Your custom app functions as a complete solution. Prefer the legacy financial services you currently use? These tools seamlessly integrate right into your new ecosystem.',
    icon: getStaticImageData(oilAndGasAssets.easyIntegrationIcon),
  },
  {
    id: 7,
    title: 'Fixed price guarantee',
    descp:
      'Our AI calculates your price after we know your exact project details. This price is permanently locked in. If done quicker you pay much less.',
    icon: getStaticImageData(oilAndGasAssets.fixedPriceIcon),
  },
  {
    id: 8,
    title: 'Cross platform energy support',
    descp:
      'Your energy software needs to work perfectly everywhere. That is exactly why we provide full web desktop and mobile support designed purely for your business.',
    icon: getStaticImageData(oilAndGasAssets.platformIcon),
  },
];

type SoftwareAppBoxProps = {
  title: string;
  descp: string;
  icon: StaticImageData;
};

const SoftwareAppBox: React.FC<SoftwareAppBoxProps> = ({
  title,
  descp,
  icon,
}) => {
  return (
    <div
      className='relative flex flex-col items-center text-center p-5 bg-white rounded-lg mb-[90px]'
      style={{ boxShadow: '0px 1px 10px 1px #0000001A' }}
    >
      <div className='absolute top-[-60px] left-1/2 transform -translate-x-1/2'>
        <Image
          src={icon}
          height={128}
          width={128}
          quality={100}
          alt='tools-icon'
        />
      </div>
      <h3
        className={`${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop} text-[#1D1D1D] font-bold mb-5 mt-[60px] uppercase`}
      >
        {title}
      </h3>
      <p
        className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} text-[#1D1D1D] mb-2`}
      >
        {descp}
      </p>
    </div>
  );
};

const HowToBuild = () => {
  return (
    <div className='flex bg-white mx-auto max-w-7xl'>
      <div className='flex flex-col pb-2'>
        <h2
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold text-center`}
        >
          Enterprise oil and gas{' '}
          <span className='text-orange-500'>software development process</span>
        </h2>
        <div
          className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} text-center mt-5 md:mx-20 mx-10`}
        >
          <p>
            Utilize our oil and gas digital transformation company to create
            unique cloud and AI solutions. Our domain experts guarantee smooth
            system integration adherence to regulations and future ready
            scalability.
          </p>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-3 w-full max-w-7xl mt-[100px] px-10'>
          {data?.map(({ descp, id, icon, title }) => (
            <SoftwareAppBox key={id} descp={descp} icon={icon} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToBuild;
