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
      'We build secure, fully featured telemedicine platforms that give healthcare providers everything they need to deliver remote consultations confidently. Real-time video calls, digital prescriptions, and integrated patient management come standard — helping you boost patient engagement by up to 40% and bring quality care to patients wherever they are.',
  },
  {
    image: getStaticImageData(healthcareAssets.saasPortal),
    title: 'AI-Powered Diagnostic Tool',
    descp:
      'Medical imaging analysis that used to take hours can now take minutes. We develop AI-powered diagnostic tools that automate image analysis, support faster clinical decision-making, and help reduce diagnostic time by up to 30% — so your clinicians can focus on the patient, not the process.',
  },
  {
    image: getStaticImageData(healthcareAssets.clinicTreatment),
    title: 'Integrated Patient Management System',
    descp:
      'From appointment scheduling and electronic health records to billing and invoicing, our integrated patient management systems bring your entire administrative operation into one place. The result is up to 50% improvement in administrative efficiency — and a clinical team with more time to spend on care rather than paperwork.',
  },
  {
    image: getStaticImageData(healthcareAssets.healthAndFitness),
    title: 'Healthcare Data Analytics Platform',
    descp:
      'Good decisions in healthcare start with reliable data. We build analytics platforms that turn patient and operational information into actionable insight — helping organisations reduce readmission rates by up to 20%, allocate resources more effectively, and make better-informed decisions across every level of care delivery.',
  },
];

const SuccessStories: React.FC = () => {
  return (
    <div>
      <h1
        className={`text-black font-bold text-center ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} mb-4 `}
      >
        What Our Remote Developers Can{' '}
        <span className='text-orange-500'>Build for Your Business</span>
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
