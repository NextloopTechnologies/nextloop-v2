import Image, { StaticImageData } from 'next/image'
import React from 'react'

import { EnrollForWebsiteBg } from '../../../../assets'

// import HexagonBox from '../../HexagonBox';
import arrowIcon from '../../../../assets/healthcare/arrowIcon.png';
import heartMedicalIcon from '../../../../assets/healthcare/heartMedicalIcon.png';
import trustedIcon from '../../../../assets/healthcare/trustedIcon.png';

import polygonImg from "../../../../assets/healthcare/Polygon.png"
import Flourish from './Flourish';



const expertiseSuccessData = [
  {
    id: 1,
    title: 'Leading with Technology',
    descp:
      'Embracing the latest in AI and technology innovations, we deliver future-ready healthcare software that sets the standard for patient care and operational success.',
    icon: arrowIcon,
    height: 60,
    width: 60,
  },
  {
    id: 2,
    title: 'Compliance and Security First',
    descp:
      'We prioritize the protection of sensitive data, ensuring our software exceeds the stringent requirements of healthcare regulations, including HIPAA and GDPR, for unmatched cybersecurity and compliance.',
    icon: trustedIcon,
    height: 50,
    width: 50,
  },
  {
    id: 3,
    title: 'Expertise in Healthcare',
    descp:
      'Our deep understanding of healthcare intricacies ensures solutions are precisely tailored to enhance patient care and provider efficiency.',
    icon: heartMedicalIcon,
    height: 62,
    width: 62,
  },
];

const FlourishBusiness = () => {
  return (
    <Flourish />
    // <div className='bg-[#010103] flex flex-col items-center px-4 py-14 relative'>
    //   <h1 className='text-white text-3xl md:text-5xl lg:text-7xl xl:text-[85px] uppercase font-bold text-center'>
    //     flourish your <span className='text-orange-500'>travel & hotel</span> business with nextloop technologies
    //   </h1>
    //   <div className='w-full relative'>
    //     <Image src={EnrollForWebsiteBg} alt='' className="absolute inset-0 w-full h-full object-cover z-[-1]" />

    //     <div className='relative z-10 grid gird-cols-2 mt-[85px] gap-14 mx-5'>
    //       {expertiseSuccessData?.map(
    //         ({ descp, id, icon, title, height, width }) => (
    //           <HexagonBox
    //             key={id}
    //             id={id}
    //             icon={icon}
    //             title={title}
    //             descp={descp}
    //             height={height}
    //             width={width}
    //           />
    //         )
    //       )}
    //     </div>

    //   </div>

    // </div>
  )
}

export default FlourishBusiness


type HexagonBoxProps = {
  id: number;
  icon: StaticImageData;
  title: string;
  descp: string;
  height?: number;
  width?: number;
}

const HexagonBox: React.FC<HexagonBoxProps> = ({
  id,
  icon,
  title,
  descp,
  height,
  width
}) => {
  return (
    <div className="relative flex justify-center items-center">
      <Image
        src={polygonImg}
        height={390}
        width={390}
        alt='ploygon-img'
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8'>
        <Image
          src={icon}
          alt={title}
          width={width}
          height={height}
        />
        <h3 className="font-bold text-[#1D1D1D] text-2xl px-8 mt-5">{title}</h3>
        <p className="text-[#1D1D1D] text-sm sm:text-lg mt-2 mb-2">{descp}</p>
      </div>
    </div>
  );
}

const HexagonGrid = () => {
  return (
    // <div className="flex items-center justify-center min-h-screen ">
    <div className="flex gap-y-3 ">
      <div className='flex relative gap-3'>
        <div className="hexagon absolute top-0 left-1/2 transform -translate-x-1/2">
          <HexagonBox icon={arrowIcon} id={1} title='Title' descp='descp' />
        </div>
        <div className="hexagon absolute top-0 left-1/2 transform -translate-x-1/2"></div>
      </div>
      <div className='flex relative gap-3'>
        <div className="hexagon absolute top-[97px] right-[160px] transform -translate-x-1/2"></div>
        <div className="hexagon absolute top-[126px] right-[102px] transform -translate-y-1/2"></div>
      </div>
      <div className='flex relative gap-3'>
        <div className="hexagon absolute top-[194px] right-[368px]"></div>
        <div className="hexagon absolute top-[194px] right-[368px] "></div>
      </div>
    </div>
    // </div>
  );
};