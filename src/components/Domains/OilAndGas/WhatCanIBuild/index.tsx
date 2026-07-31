import { StaticImageData } from 'next/image';
import Image from 'next/image';
import React from 'react';

import { oilAndGasAssets } from '../../../../../assets';
import palette from '../../../../styles/pallette';
import { getStaticImageData } from '../../../../utils/helper';

const data = [
  {
    id: 1,
    image: getStaticImageData(oilAndGasAssets.productionSoftwareImg),
    title: 'Smart Operations Dashboard ',
    description:
      "Your operation generates enormous amounts of data every single day. The question is whether you're actually using it. Our AI-powered dashboards pull everything together in one clear, visual interface — letting you choose the metrics that matter most and letting AI surface the insights and inefficiencies you might otherwise miss.",
  },
  {
    id: 2,
    image: getStaticImageData(oilAndGasAssets.complianceKeyImg),
    title: 'Asset Lifecycle Management ',
    description:
      ' Continuous monitoring of your equipment means nothing catches you off guard. Our systems track asset health in real time, flag maintenance needs before they become failures, and send push notifications the moment urgent issues are detected — keeping you compliant and your machinery running at full capacity. ',
  },
  {
    id: 3,
    image: getStaticImageData(oilAndGasAssets.employeeSimplifiedImg),
    title: 'Scenario Simulation & Optimization ',
    description:
      'What would happen if you adjusted fluid volumes or gravel figures? Instead of guessing, simulate it. Our scenario modeling tools let you test different operational variables and see projected outcomes instantly — turning complex decisions into confident ones. ',
  },
  {
    id: 4,
    image: getStaticImageData(oilAndGasAssets.dataSoftwareImg),
    title: 'Offshore-Ready Capability ',
    description:
      'Offshore environments come with their own rulebook: unique regulatory requirements, personnel logistics, supply coordination, and connectivity limitations. We build with all of that in mind, so your platform performs reliably whether your team is onshore or in the middle of the ocean. ',
  },
  {
    id: 5,
    image: getStaticImageData(oilAndGasAssets.fleetImg),
    title: 'Centralised Document Management ',
    description:
      'Say goodbye to filing cabinets and scattered spreadsheets. All your critical documents — production reports, energy efficiency data, safety records, inspection logs — live in the cloud, organised and searchable. The right information, always at your fingertips. ',
  },
  {
    id: 6,
    image: getStaticImageData(oilAndGasAssets.operationImg),
    title: 'Seamless Integration ',
    description:
      'Already relying on financial tools or third-party systems that work well for you? No need to replace them. Our platforms are built to integrate cleanly with your existing software stack, so your new solution enhances what you already have rather than disrupting it. ',
  },
];

type ImageWithHoverInfoProps = {
  image: StaticImageData;
  title: string;
  description?: string;
};

const ImageWithHoverInfo: React.FC<ImageWithHoverInfoProps> = ({
  description,
  image,
  title,
}) => (
  <div className='relative flex flex-col items-center text-center justify-center group'>
    <Image
      src={image}
      alt={title}
      height={300}
      width={300}
      className='w-full md:w-[719px] object-fill'
    />
    <div className='absolute bottom-0 flex flex-col items-center text-white mb-4 group-hover:opacity-0 transition-opacity'>
      <h2
        className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} uppercase font-bold`}
      >
        {title}
      </h2>
    </div>
    <div className='absolute inset-0 bg-[#FA8145BF] flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 p-10 m-3 transition-opacity'>
      <h2 className='uppercase text-lg lg:text-base xl:text-2xl font-bold text-white mb-2'>
        {title}
      </h2>
      <p
        className={`${palette.fontSize.descriptionSmall.mobile} md:${palette.fontSize.descriptionSmall.desktop} text-white`}
      >
        {description}
      </p>
    </div>
  </div>
);

const WhatCanIBuild = () => {
  return (
    <div className='flex'>
      <div className='flex flex-col pb-[50px] max-w-[1479px] mx-auto'>
        <h1
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold text-center`}
        >
          What can we <span className='text-orange-500'>build For You ?</span>
        </h1>
        <div
          className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} mx-10  text-center mt-5`}
        >
          <p>
            We deliver custom digital solutions that enhance efficiency,
            optimize operations, and drive innovation in the oil and gas sector.
            From exploration and production to asset management and compliance,
            our expertise helps businesses improve performance and achieve
            sustainable growth.
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-6 gap-1 mt-16'>
          {data.map(({ description, id, image, title }) => (
            <ImageWithHoverInfo
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

export default WhatCanIBuild;
