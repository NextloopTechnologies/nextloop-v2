import Image, { StaticImageData } from 'next/image';
import React from 'react';

import { oilAndGasAssets } from '../../../../../assets';
import palette from '../../../../styles/pallette';
import { getStaticImageData } from '../../../../utils/helper';

const data = [
  {
    id: 1,
    title: 'Smart mining dashboard',
    descp:
      'Your operation produces huge amounts of data. Understand and visualise it with your dashboard. Pick the metrics you want to monitor and AI identifies areas of improvement.',
    icon: getStaticImageData(oilAndGasAssets.miningIcon),
  },
  {
    id: 2,
    title: 'Asset life cycle management',
    descp:
      'Continuous monitoring of your equipment ensures everything runs optimally and you stay fully compliant. Push notifications send reminders when urgent issues are found.',
    icon: getStaticImageData(oilAndGasAssets.lifeCycleIcon),
  },
  {
    id: 3,
    title: 'Run scenarios and optimise',
    descp:
      'Use the data you’ve collected to simulate various outcomes. Want to see how different fluid or gravel figures change things? It’s as easy as clicking a button.',
    icon: getStaticImageData(oilAndGasAssets.optimiseIcon),
  },
  {
    id: 4,
    title: 'Offshore ready',
    descp:
      'Working offshore comes with its own set of challenges: unique regulations, moving personnel, managing supplies and connectivity issues. Your app handles it all.',
    icon: getStaticImageData(oilAndGasAssets.readyIcon),
  },
  {
    id: 5,
    title: 'Everything in one place',
    descp:
      'No more messy cabinets. All your documents are stored in the cloud. Sort and search features make everything accessible: production, energy efficiency and safety reports.',
    icon: getStaticImageData(oilAndGasAssets.onePlaceIcon),
  },
  {
    id: 6,
    title: 'Easy integration',
    descp:
      'Your app can be a complete solution. But maybe you like the financial services you currently use? No worries, these tools can be seamlessly integrated into your solution.',
    icon: getStaticImageData(oilAndGasAssets.easyIntegrationIcon),
  },
  {
    id: 7,
    title: 'Fixed price guarantee',
    descp:
      'Our AI calculates your price after we know your project details. This price is locked in and never goes up – if it’s done quicker, you pay less.',
    icon: getStaticImageData(oilAndGasAssets.fixedPriceIcon),
  },
  {
    id: 8,
    title: 'The platform you need',
    descp:
      'Your oil and gas software needs to work everywhere. That’s why we can provide web, desktop and mobile support. It’s designed for your business needs.',
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
        <h1
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} uppercase font-bold text-center`}
        >
          How to build
          <br /> an <span className='text-orange-500'>oil and gas </span>
          software app
        </h1>
        <div
          className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} text-center mt-5 md:mx-20 mx-10`}
        >
          <p>
            Whether it’s mining or the oil and gas industry... you care about
            That’s your choice. Bespoke mining industry software solutions are
            created to meet your needs. Maybe an iOS or Android app for
            monitoring production data in real-time? Perhaps modelling software
            for macOS or Windows? Maybe even a website or Progressive Web App
            (PWA) for staff to view and manage their rosters. We make your idea
            a reality.
          </p>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-3 w-full max-w-7xl mt-[100px]'>
          {data?.map(({ descp, id, icon, title }) => (
            <SoftwareAppBox key={id} descp={descp} icon={icon} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToBuild;
