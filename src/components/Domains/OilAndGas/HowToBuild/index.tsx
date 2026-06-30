import Image, { StaticImageData } from 'next/image';
import React from 'react';

import { oilAndGasAssets } from '../../../../../assets';
import palette from '../../../../styles/pallette';
import { getStaticImageData } from '../../../../utils/helper';

const data = [
  {
    id: 1,
    title: 'Smart Operations Dashboard ',
    descp:
      'Your operation generates more data than any spreadsheet can handle. Our AI-powered dashboard turns that data into clarity — letting you choose the metrics that matter most, visualise performance in real time, and automatically surface the areas where improvement will have the greatest impact.',
    icon: getStaticImageData(oilAndGasAssets.miningIcon),
  },
  {
    id: 2,
    title: 'Asset Lifecycle Management ',
    descp:
      'Continuous equipment monitoring keeps your operation running at full capacity and your compliance records clean. When something needs attention, push notifications flag it immediately — so your team can act before a minor issue becomes a costly one. ',
    icon: getStaticImageData(oilAndGasAssets.lifeCycleIcon),
  },
  {
    id: 3,
    title: 'Scenario Planning and Optimisation ',
    descp:
      'Use your operational data to model outcomes before committing to them. Adjust fluid volumes, gravel figures, or resource allocations and see the projected impact instantly. Smarter decisions, made faster — without the guesswork. ',
    icon: getStaticImageData(oilAndGasAssets.optimiseIcon),
  },
  {
    id: 4,
    title: 'Offshore-Ready Capability ',
    descp:
      'Offshore environments come with their own rules: stricter regulations, personnel logistics, supply coordination, and connectivity constraints. Your platform is built to handle all of it — reliably, wherever your operation is based. ',
    icon: getStaticImageData(oilAndGasAssets.readyIcon),
  },
  {
    id: 5,
    title: 'Everything in one place',
    descp:
      'No more scattered files or overflowing cabinets. Every document — production reports, energy efficiency records, safety documentation — is stored securely in the cloud, fully searchable and accessible the moment you need it. ',
    icon: getStaticImageData(oilAndGasAssets.onePlaceIcon),
  },
  {
    id: 6,
    title: 'Seamless Integration ',
    descp:
      'Your new platform can function as a complete standalone solution. But if there are existing financial tools or third-party systems your team already relies on, those can be integrated cleanly — no disruption, no forced replacements. ',
    icon: getStaticImageData(oilAndGasAssets.easyIntegrationIcon),
  },
  {
    id: 7,
    title: 'Fixed Price Guarantee ',
    descp:
      "Once we understand your project requirements, we lock in your price. It doesn't increase as the build progresses — and if we deliver ahead of schedule, you pay less. No surprises. No scope creep.",
    icon: getStaticImageData(oilAndGasAssets.fixedPriceIcon),
  },
  {
    id: 8,
    title: 'Cross-Platform Support ',
    descp:
      'Your oil and gas software needs to perform in the office, in the field, and everywhere in between. We deliver web, desktop, and mobile support as standard — so your team has full access to the platform wherever the work takes them.',
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
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold text-center`}
        >
          How to Build an{' '}
          <span className='text-orange-500'>Oil and Gas Software App </span>
        </h1>
        <div
          className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} text-center mt-5 md:mx-20 mx-10`}
        >
          <p>
            Put Next Loop's expertise in cloud, IoT, and AI to work for your
            operation. From asset management and real-time monitoring to system
            integration and regulatory compliance, our domain specialists handle
            the complexity — delivering a scalable, future-ready platform built
            around how your business actually operates.
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
