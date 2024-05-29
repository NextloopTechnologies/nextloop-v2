import React from 'react';
import arrowIcon from "../../../../assets/healthcare/arrowIcon.png";
import trustedIcon from "../../../../assets/healthcare/trustedIcon.png";
import heartMedicalIcon from "../../../../assets/healthcare/heartMedicalIcon.png";
import HexagonBox from '../../HexagonBox';

const expertiseSuccessData = [
  {
    id: 1,
    title: "Leading with Technology",
    descp: "Embracing the latest in AI and technology innovations, we deliver future-ready healthcare software that sets the standard for patient care and operational success.",
    icon: arrowIcon,
    height: 60,
    width: 60
  },
  {
    id: 2,
    title: "Compliance and Security First",
    descp: "We prioritize the protection of sensitive data, ensuring our software exceeds the stringent requirements of healthcare regulations, including HIPAA and GDPR, for unmatched cybersecurity and compliance.",
    icon: trustedIcon,
    height: 50,
    width: 50
  },
  {
    id: 3,
    title: "Expertise in Healthcare",
    descp: "Our deep understanding of healthcare intricacies ensures solutions are precisely tailored to enhance patient care and provider efficiency.",
    icon: heartMedicalIcon,
    height: 62,
    width: 62
  }
]

const OurExpertise = () => {
  return (
    <div className='min-h-screen bg-white py-[96px] flex'>
      <div className="flex flex-col text-center items-center">
        <h1 className='font-bold text-3xl uppercase md:text-6xl lg:text-7xl xl:text-[85px] sm:text-4xl w-full mb-[45px]'>
        OUR EXPERTISE YOUR <span className='text-orange-500'>SUCCESS!</span>
        </h1>
        <p className='text-sm md:text-lg mx-[150px]'>
          At Nextloop Technologies, we harness our extensive expertise in the healthcare 
          sector alongside our mastery of advanced technological innovations to forge 
          software solutions that make a lasting impact.Our unwavering dedication to 
          excellence and innovation propels the success of your projects, fundamentally 
          enhancing the delivery of patient care while streamlining operational 
          efficiencies.By partnering with us, you leverage a team committed to 
          transforming the healthcare landscape through solutions that are as reliable 
          as they are revolutionary.
        </p>
          <div className="grid gird-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-[85px] gap-14 mx-5">
          {expertiseSuccessData?.map(({ descp, id, icon, title, height, width }) => (
            <HexagonBox 
              key={id}
              id={id}
              icon={icon} 
              title={title}
              descp={descp}
              height={height}
              width={width}
            />
          ))}
          </div>
      </div>
    </div>
  )
}

export default OurExpertise;