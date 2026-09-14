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
    title: 'Production Monitoring Systems',
    description:
      'With real-time data tracking of wells, pipelines, and facilities, you can get total control over your production assets. Our solutions guarantee maximum output with little downtime, assist locate bottlenecks, and enhance performance.',
  },
  {
    id: 2,
    image: getStaticImageData(oilAndGasAssets.complianceKeyImg),
    title: 'Asset Management Solutions',
    description:
      ' Use cutting-edge systems for asset tracking, maintenance planning, and inspections to increase the effectiveness of your machinery and infrastructure. You may decrease operating expenses, prolong asset life, and prevent unplanned failures by proactively managing lifecycles.',
  },
  {
    id: 3,
    image: getStaticImageData(oilAndGasAssets.employeeSimplifiedImg),
    title: 'Compliance Platforms for Regulations',
    description:
      'Automated reporting and compliance management can help you stay ahead of evolving safety, health, and environmental standards. With our systems, you may lower your risk of penalties, operational delays, or legal problems while still meeting industry requirements.',
  },
  {
    id: 4,
    image: getStaticImageData(oilAndGasAssets.dataSoftwareImg),
    title: 'Supply Chain Management Tools',
    description:
      'For seamless operations, use integrated tools for inventory, logistics, and procurement management. You may cut lead times, avoid shortages, and keep operations uniform across distant locations by streamlining the supply chain.',
  },
  {
    id: 5,
    image: getStaticImageData(oilAndGasAssets.fleetImg),
    title: 'Dashboards for Predictive Analytics',
    description:
      'Make better decisions by using data to estimate maintenance requirements and equipment breakdowns. You can reduce downtime and increase operational efficiency with the help of our dashboards actionable insights.',
  },
  {
    id: 6,
    image: getStaticImageData(oilAndGasAssets.operationImg),
    title: 'Systems for Workforce Management',
    description:
      'Effectively manage your staff by using technologies for remote task management, scheduling, and training. Our solutions provide the best possible team coordination for both administrative and field workers, cutting down on delays and increasing output.',
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
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} uppercase font-bold text-center`}
        >
          What can we <span className='text-orange-500'>build?</span>
        </h1>
        <div
          className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} mx-10  text-center mt-5`}
        >
          <p>
            We develop tailored solutions to enhance operational efficiency and
            drive innovation in the oil and gas sector. Our capabilities include
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
