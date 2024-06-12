import React from 'react';

import SuccessSolutionCard from '../SuccessSolutionCard';
import clinicTreatment from "../../../../assets/healthcare/clinicTreatment.png";
import healthAndFitness from "../../../../assets/healthcare/healthAndFitness.png";
import saasPortal from "../../../../assets/healthcare/saasPortal.png";
import solutionManagement from "../../../../assets/healthcare/solutionManagement.png";

const successSolutionContent = [
  {
    image: solutionManagement,
    title: "340B Management solution",
    descp: "This case study reflects our dedication to reshaping the landscape of 340B drug pricing programs. By addressing the intricate challenges of data management, pricing accuracy, and regulatory adherence, we have redefined what it means to deliver comprehensive healthcare solutions. Our initiative not only exemplifies AnAr’s prowess in leveraging advanced technology but also our commitment to enhancing the operational efficiencies of healthcare providers."
  },
  {
    image: saasPortal,
    title: "saas portal for medical practitioners",
    descp: "This case study illustrates our comprehensive approach to developing a tailored SaaS platform, which addresses the multifaceted challenges faced by today’s healthcare practitioners. Our partnership with a leading healthcare product company has been instrumental in constructing a solution that not only meets but exceeds the complex demands of the medical industry. This collaboration aimed to produce a tool that enhances operational efficiency, secures patient data, and simplifies the user experience for both practitioners and patients."
  },
  {
    image: clinicTreatment,
    title: "fertility clinic treatment modernization",
    descp: "This case study spotlights the challenges of outdated technologies and the triumphs through strategic modernization, underscoring AnAr’s expertise in navigating and revitalizing healthcare tech landscapes. Our journey with the healthcare client revolved around replacing the obsolete Silverlight technology, which limited user experience and hindered market expansion. By transitioning to a modern tech stack including Angular 16 and .Net Core 7, we revolutionized both front-end user interfaces and back-end functionality. "
  },
  {
    image: healthAndFitness,
    title: "integrated health and fitness management",
    descp: "Our comprehensive solution caters to the needs of nutritionists and fitness trainers, facilitating a seamless integration of nutrition plans, workout schedules, and client interactions. This case study highlights our journey in creating an all-encompassing wellness tool, showcasing our technical expertise, ethical commitment, and dedication to delivering user-centric solutions."
  }
]

const SuccessStories: React.FC = () => {
  return (
    <div className='py-[100px]'>
      <h1 className='text-black text-3xl md:text-5xl lg:text-7xl xl:text-[85px] uppercase font-bold text-center'>
        success stories in{' '}
        <span className='text-orange-500'>healthcare solutions</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-[50px] p-5">
        {successSolutionContent?.map(({ descp, image, title }, index: number) => (
          <SuccessSolutionCard
            key={index}
            descp={descp}
            image={image}
            title={title}
          />
        ))}
      </div>
    </div>
  )
}

export default SuccessStories;