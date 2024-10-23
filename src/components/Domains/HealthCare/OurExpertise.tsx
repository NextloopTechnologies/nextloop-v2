import React from 'react';

import HexagonBox from '../../HexagonBox';
import { healthcareAssets } from '../../../../assets';
import palette from '../../../styles/pallette';
import { getStaticImageData } from '../../../utils/helper';

const expertiseSuccessData = [
  {
    id: 1,
    title: 'Leading with Technology',
    descp:
      'Embracing the latest in AI and technology innovations, we deliver future-ready healthcare software that sets the standard for patient care and operational success.',
    icon: getStaticImageData(healthcareAssets.arrowIcon),
    height: 50, // Reduced size
    width: 50, // Reduced size
  },
  {
    id: 2,
    title: 'Compliance and Security First',
    descp:
      'We prioritize the protection of sensitive data, ensuring our software exceeds the stringent requirements of healthcare regulations, including HIPAA and GDPR, for unmatched cybersecurity and compliance.',
    icon: getStaticImageData(healthcareAssets.trustedIcon),
    height: 40, // Reduced size
    width: 40, // Reduced size
  },
  {
    id: 3,
    title: 'Expertise in Healthcare',
    descp:
      'Our deep understanding of healthcare intricacies ensures solutions are precisely tailored to enhance patient care and provider efficiency.',
    icon: getStaticImageData(healthcareAssets.heartMedicalIcon),
    height: 50, // Reduced size
    width: 50, // Reduced size
  },
];

const OurExpertise = () => {
  return (
    <div className=' bg-white flex'>
      <div className='flex flex-col text-center items-center'>
        <h1
          className={`font-bold  sm:text-4xl w-full mb-[45px] ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop}`}
        >
          OUR EXPERTISE YOUR <span className='text-orange-500'>SUCCESS!</span>
        </h1>
        <p
          className={`xl:mx-[150px] mx-10 ${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
        >
          At Nextloop Technologies, we harness our extensive expertise in the
          healthcare sector alongside our mastery of advanced technological
          innovations to forge software solutions that make a lasting impact. Our
          unwavering dedication to excellence and innovation propels the success
          of your projects, fundamentally enhancing the delivery of patient care
          while streamlining operational efficiencies. By partnering with us, you
          leverage a team committed to transforming the healthcare landscape
          through solutions that are as reliable as they are revolutionary.
        </p>
        <div className='grid gird-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-[85px] gap-14 md:mx-20 mx-10'>
          {expertiseSuccessData?.map(
            ({ descp, id, icon, title, height, width }) => (
              <HexagonBox
                key={id}
                id={id}
                icon={icon}
                title={title}
                descp={descp}
                height={height}
                width={width}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OurExpertise;
