//

import { Cpu, HeartPulse, ShieldCheck } from 'lucide-react';
import React from 'react';

import HexagonBox from '../../HexagonBox';
import palette from '../../../styles/pallette';

const expertiseSuccessData = [
  {
    id: 1,
    title: 'Leading with Technology',
    descp:
      "We don't chase trends—we apply AI, cloud, and smart automation where they add real clinical and operational value, helping healthcare teams deliver better care and run efficiently today and tomorrow.",
    icon: <Cpu size={50} />,
  },
  {
    id: 2,
    title: 'Compliance and Security First',
    descp:
      'Patient data demands more than standard protection. We exceed HIPAA and GDPR rules with end-to-end encryption, role-based access, and rigorous security testing built into every solution.',
    icon: <ShieldCheck size={40} />,
  },
  {
    id: 3,
    title: 'Deep Healthcare Expertise ',
    descp:
      "Healthcare isn't learned from a book. Our team brings hands-on experience with clinical workflows, pressures, and compliance. Every solution fits how healthcare actually operates, not how software firms imagine it.",
    icon: <HeartPulse size={50} />,
  },
];

const OurExpertise = () => {
  return (
    <div className=' bg-white flex'>
      <div className='flex flex-col text-center items-center'>
        <h1
          className={`font-bold sm:text-4xl w-full mb-[45px] ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop}`}
        >
          Our expertise Your <span className='text-orange-500'>Success!</span>
        </h1>

        <p
          className={`xl:mx-[150px] mx-10 ${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop}`}
        >
          At Next Loop Technologies, we combine genuine healthcare sector
          knowledge with proven technical capability to build software that
          makes a real difference — not just to operations, but to the people
          those operations serve. When you Hire Healthcare Software Developers
          from our team, you're not just bringing in code writers. You're
          partnering with specialists who understand clinical workflows,
          compliance pressures, and the human stakes involved in getting
          healthcare technology right. That understanding shapes everything we
          build — from the architecture to the final user interface.
        </p>

        <div className='grid gird-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-[85px] gap-14 md:mx-20 mx-10'>
          {expertiseSuccessData?.map(({ descp, id, icon, title }) => (
            <HexagonBox
              key={id}
              id={id}
              icon={icon}
              title={title}
              descp={descp}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurExpertise;
