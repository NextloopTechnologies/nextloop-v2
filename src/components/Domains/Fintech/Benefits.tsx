import Image, { StaticImageData } from 'next/image';
import React from 'react';

import developmentIcon from "../../../../assets/fintech/benefitDevelopmentIcon.png";
import graphIcon from "../../../../assets/fintech/benefitGraphIcon.png";
import infrastructureIcon from "../../../../assets/fintech/benefitInfrastructureIcon.png";
import reportIcon from "../../../../assets/fintech/benefitReportsIcon.png";
import settingIcon from "../../../../assets/fintech/benefitSettingIcon.png";
import supportIcon from "../../../../assets/fintech/benefitSupportIcon.png";
import updatesIcon from "../../../../assets/fintech/benefitUpdatesIcon.png";

type BoxProps = {
  icon: StaticImageData;
  title: string;
}

const orangeBoxData: BoxProps[] = [
  {
    icon: reportIcon,
    title: "customized reports"
  },
  {
    icon: infrastructureIcon,
    title: "design infrastrusture"
  },
  {
    icon: updatesIcon,
    title: "On demand updates"
  }
];

const blackBoxData: BoxProps[] = [
  {
    icon: graphIcon,
    title: "On demand updates"
  },
  {
    icon: settingIcon,
    title: "custom integration"
  },
  {
    icon: supportIcon,
    title: "constant support"
  },
  {
    icon: developmentIcon,
    title: "development from  scratch"
  },
];

const OrangeBox: React.FC<BoxProps>  = ({
  icon,
  title
}) => {
  return (
    <div className="relative w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[180px] md:h-[180px] bg-[#FA8145] transform rotate-45 flex items-center justify-center rounded">
      <div className="transform -rotate-45">
        <div className="absolute -top-8 left-[30px] sm:-top-10 sm:left-[45px] md:-top-12 md:left-[75px] py-2">
          <Image src={icon} height={32} width={32} alt=''/>
        </div>
        <h3 className='text-center text-xs sm:text-sm md:text-xl mt-3'>{ title }</h3>
      </div>
    </div>
  )
}
const BlackBox: React.FC<BoxProps>  = ({
  icon,
  title
}) => {
  return (
    <div className="relative w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[180px] md:h-[180px] bg-[#1D1D1D] transform rotate-45 flex items-center justify-center rounded">
      <div className="transform -rotate-45">
        <div className="absolute -top-8 left-[30px] sm:-top-10 sm:left-[45px] md:-top-12 md:left-[75px] py-2">
          <Image src={icon} height={32} width={32} alt=''/>
        </div>
        <h3 className='text-center text-xs sm:text-sm md:text-xl mt-3'>{ title }</h3>
      </div>
    </div>
  )
}

const Benefits: React.FC = () => {
  return (
    <div className='bg-white py-[90px]'>
      <div className="flex flex-col text-center items-center">
        <h1 className='text-black text-3xl md:text-5xl lg:text-7xl xl:text-[85px] uppercase font-bold text-center mb-10'>
          benefits
        </h1>
        <p className='text-sm md:text-lg xl:mx-[150px] mx-2 mb-24'>
          In a highly competitive business world, originality and uniqueness have 
          become critical factors for successful business development. That’s why 
          modern companies are increasingly using only software solutions that fully 
          consider all the individual features of their projects. When it comes to 
          Fintech software development, custom solutions can be more cost-effective 
          as Fintech is highly technological. That’s why it can be the best option for 
          you. Moreover, financial custom software development can boost Fintech’s 
          digital acceleration. Find out the significant benefits of custom software 
          development in our article.
        </p>
      </div>
      <div className="flex flex-col items-center text-white uppercase font-bold mb-14">
        <div className="flex space-x-20">
          {orangeBoxData?.map(({ icon, title }, idx) => (
            <OrangeBox
              key={idx}
              title={title}
              icon={icon}
            />
          ))}
        </div>
        <div className="flex space-x-20 -mt-8">
          {blackBoxData?.map(({ icon, title }, idx) => (
            <BlackBox
              key={idx}
              title={title}
              icon={icon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Benefits;