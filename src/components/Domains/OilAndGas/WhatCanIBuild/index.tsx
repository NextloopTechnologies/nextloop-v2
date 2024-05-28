import { StaticImageData } from 'next/image';
import Image from 'next/image';
import React from 'react';

import complianceKeyImg from '../../../../../assets/oilAndGasComplianceKey.png';
import dataSoftwareImg from '../../../../../assets/oilAndGasDataSoftware.png';
import employeeSimplifiedImg from '../../../../../assets/oilAndGasEmployeeSimplified.png';
import fleetImg from '../../../../../assets/oilAndGasFleet.png';
import operationImg from '../../../../../assets/oilAndGasOperation.png';
import productionSoftwareImg from '../../../../../assets/oilAndGasProdSoftware.png';

const data = [
  {
    id: 1,
    image: productionSoftwareImg,
    title: 'Oil  and gas production software',
    description:
      'Oil and gas is one of the most heavily regulated industries. Your custom software makes compliance easier. Gas operators can complete safety checklists as they progress through a job. Anyone can report issues via your app. Keep your field operations safe – and you have digitised accountability records just in case anything goes wrong.',
  },
  {
    id: 2,
    image: complianceKeyImg,
    title: 'Compliance is key',
    description:
      'Oil and gas is one of the most heavily regulated industries. Your custom software makes compliance easier. Gas operators can complete safety checklists as they progress through a job. Anyone can report issues via your app. Keep your field operations safe – and you have digitised accountability records just in case anything goes wrong.',
  },
  {
    id: 3,
    image: employeeSimplifiedImg,
    title: 'Employee management simplified',
    description:
      'Oil and gas is one of the most heavily regulated industries. Your custom software makes compliance easier. Gas operators can complete safety checklists as they progress through a job. Anyone can report issues via your app. Keep your field operations safe – and you have digitised accountability records just in case anything goes wrong.',
  },
  {
    id: 4,
    image: dataSoftwareImg,
    title: 'Oil  and gas data management software',
    description:
      'Oil and gas is one of the most heavily regulated industries. Your custom software makes compliance easier. Gas operators can complete safety checklists as they progress through a job. Anyone can report issues via your app. Keep your field operations safe – and you have digitised accountability records just in case anything goes wrong.',
  },
  {
    id: 5,
    image: fleetImg,
    title: 'FLEET management',
    description:
      'Oil and gas is one of the most heavily regulated industries. Your custom software makes compliance easier. Gas operators can complete safety checklists as they progress through a job. Anyone can report issues via your app. Keep your field operations safe – and you have digitised accountability records just in case anything goes wrong.',
  },
  {
    id: 6,
    image: operationImg,
    title: 'operation overview',
    description:
      'Oil and gas is one of the most heavily regulated industries. Your custom software makes compliance easier. Gas operators can complete safety checklists as they progress through a job. Anyone can report issues via your app. Keep your field operations safe – and you have digitised accountability records just in case anything goes wrong.',
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
      className='w-full md:w-[719px] object-fill'
    />
    <div className='absolute bottom-0 flex flex-col items-center text-white mb-4 group-hover:opacity-0 transition-opacity'>
      <h2 className='uppercase lg:text-2xl font-bold'>{title}</h2>
    </div>
    <div className='absolute inset-0 bg-[#FA8145BF] flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 p-10 m-3 transition-opacity'>
      <h2 className='uppercase text-lg lg:text-base xl:text-2xl font-bold text-white mb-2'>
        {title}
      </h2>
      <p className='text-base lg:text-sm text-white'>{description}</p>
    </div>
  </div>
);

const WhatCanIBuild = () => {
  return (
    <div className='flex bg-[#1D1D1D0D]'>
      <div className='flex flex-col pt-[96px] pb-[122px] max-w-[1479px] mx-auto'>
        <h1 className='text-3xl md:text-7xl uppercase font-bold text-center'>
          What can i <span className='text-orange-500'>build?</span>
        </h1>
        <div className='text-sm mx-10 md:text-lg text-center mt-5'>
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
