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
      'Track well pipelines and facilities in real time. Get total control over your production assets. Our solutions maximize output locate bottlenecks minimize downtime and dramatically enhance your overall field performance.',
  },
  {
    id: 2,
    image: getStaticImageData(oilAndGasAssets.complianceKeyImg),
    title: 'Oil and Gas Field Service Management Software',
    description:
      'Use smart technology for tracking maintenance planning and daily inspections. Decrease your operating expenses prolong your asset life and easily prevent unplanned equipment failures by proactively managing all machinery lifecycles.',
  },
  {
    id: 3,
    image: getStaticImageData(oilAndGasAssets.employeeSimplifiedImg),
    title: 'Compliance Platforms for Energy',
    description:
      'Automated reporting helps you stay ahead of evolving safety health and environmental standards. Lower your risk of expensive penalties operational delays or legal problems while easily meeting global industry requirements.',
  },
  {
    id: 4,
    image: getStaticImageData(oilAndGasAssets.dataSoftwareImg),
    title: 'Supply Chain Optimization for Oilfield Services',
    description:
      'Use integrated tools for better inventory logistics and procurement management. Cut your lead times totally avoid material shortages and keep field operations uniform across distant remote locations without any stress.',
  },
  {
    id: 5,
    image: getStaticImageData(oilAndGasAssets.fleetImg),
    title: 'Digital Twin Technology for Oil and Gas',
    description:
      'Make much smarter decisions using virtual replicas to estimate equipment breakdowns early. You can dramatically reduce downtime and increase daily operational efficiency with our clear actionable data driven insights.',
  },
  {
    id: 6,
    image: getStaticImageData(oilAndGasAssets.operationImg),
    title: 'Systems for Workforce Management',
    description:
      'Effectively manage your staff using smart technologies for remote task management scheduling and training. Provide the best possible team coordination for administrative and field workers while significantly increasing output.',
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
        className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}  font-bold`}
      >
        {title}
      </h2>
    </div>
    <div className='absolute inset-0 bg-[#FA8145BF] flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 p-10 m-3 transition-opacity'>
      <h2 className='text-lg lg:text-base xl:text-2xl font-bold text-white mb-2'>
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
        <h2
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold text-center`}
        >
          How to Improve Operational Efficiency{' '}
          <span className='text-orange-500'>in Oil and Gas</span>
        </h2>
        <div
          className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} mx-10  text-center mt-5`}
        >
          <p>
            We develop tailored digital tools that drive true innovation. Our
            specialized capabilities include:
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
