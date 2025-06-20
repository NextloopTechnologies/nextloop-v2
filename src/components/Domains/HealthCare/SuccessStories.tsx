import React from 'react';

import SuccessSolutionCard from '../SuccessSolutionCard';
import { healthcareAssets } from '../../../../assets';
import palette from '../../../styles/pallette';
import { getStaticImageData } from '../../../utils/helper';

const successSolutionContent = [
  {
    image: getStaticImageData(healthcareAssets.solutionManagement),
    title: 'Telemedicine Platform for Remote Consultations',
    descp:
      'Our developers can build a secure Telemedicine Platform that enables healthcare providers to offer remote consultations seamlessly. Features include real-time video calls, digital prescriptions, and comprehensive patient management, helping you boost patient engagement by up to 40% and expand access to healthcare services.',
  },
  {
    image: getStaticImageData(healthcareAssets.saasPortal),
    title: 'AI-Powered Diagnostic Tool',
    descp:
      'Leverage our expertise to develop an AI-powered diagnostic Tool that automates the analysis of medical imaging data. Our solutions can help reduce diagnostic time by 30%, allowing healthcare professionals to deliver faster, more accurate diagnoses and significantly improve patient outcomes.',
  },
  {
    image: getStaticImageData(healthcareAssets.clinicTreatment),
    title: 'Integrated Patient Management System',
    descp:
      'Our team can design an Integrated Patient Management System tailored to streamline appointment scheduling, electronic health records (EHR), and billing processes. This can lead to a 50% increase in administrative efficiency, freeing up healthcare staff to focus on delivering quality patient care.',
  },
  {
    image: getStaticImageData(healthcareAssets.healthAndFitness),
    title: 'Healthcare Data Analytics Platform',
    descp:
      'Partner with us to build a robust Healthcare Data Analytics Platform that leverages big data for actionable insights. Our solutions can optimize patient data analysis, reduce readmission rates by 20%, and empower healthcare organizations with better decision-making capabilities in patient care and resource management.',
  },
];

const SuccessStories: React.FC = () => {
  return (
    <div>
      <h1
        className={`text-black uppercase font-bold text-center ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} mb-4 uppercase`}
      >
        What Our Developers{' '}
        <span className='text-orange-500'>Can Create for You</span>
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-[20px] md:p-20 p-10'>
        {successSolutionContent?.map(
          ({ descp, image, title }, index: number) => (
            <SuccessSolutionCard
              key={index}
              descp={descp}
              image={image}
              title={title}
            />
          )
        )}
      </div>
    </div>
  );
};

export default SuccessStories;
