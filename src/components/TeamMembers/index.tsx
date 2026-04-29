import Image from 'next/image';
import React from 'react';
import { FaAngular, FaAws, FaPython, FaReact } from 'react-icons/fa';

import type {
  TeamMember,
  TeamMembersSectionData,
  TechKey,
} from '../../pages/services/BaseServicePages';
import palette from '../../styles/pallette';

const techIconMap: Record<TechKey, React.ReactNode> = {
  react: <FaReact className='w-8 h-8 text-[#61DAFB]' />,
  aws: <FaAws className='w-8 h-8 text-[#FF9900]' />,
  angular: <FaAngular className='w-8 h-8 text-[#DD0031]' />,
  python: <FaPython className='w-8 h-8 text-[#3776AB]' />,
};

const MemberCard = ({ member }: { member: TeamMember }) => (
  <div className='flex flex-col gap-4 border border-gray-200 rounded-xl p-6 bg-white shadow-sm'>
    <div className='flex items-center gap-4'>
      {member.avatarUrl ? (
        <Image
          src={member.avatarUrl}
          alt={member.name}
          className='w-16 h-16 rounded-full object-cover shrink-0'
        />
      ) : (
        <div className='w-16 h-16 rounded-full bg-gray-300 shrink-0' />
      )}
      <div className='flex flex-col'>
        <span className='font-bold text-base text-gray-900'>{member.name}</span>
        <span className='text-sm text-gray-500'>({member.title})</span>
        <span className='text-sm text-gray-500'>{member.experience}</span>
      </div>
    </div>

    <p className='text-sm text-gray-700 leading-relaxed'>
      <span className='font-bold'>Role:</span> {member.role}
    </p>

    <div>
      <p className='font-bold text-sm text-gray-900 mb-2'>Tech Stack:</p>
      <div className='flex items-center gap-3 flex-wrap'>
        {member.techStack.map((tech: TechKey, i: number) => (
          <span key={i} className='flex items-center'>
            {techIconMap[tech]}
          </span>
        ))}
      </div>
    </div>

    <div>
      <p className='font-bold text-sm text-gray-900 mb-2'>Domain Expertise:</p>
      <div className='flex flex-wrap gap-2'>
        {member.domains.map((domain: string, i: number) => (
          <span
            key={i}
            className='border border-gray-300 rounded-md px-3 py-1 text-xs text-gray-600 bg-gray-50'
          >
            {domain}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export const TeamMembers = ({ data }: { data: TeamMembersSectionData }) => {
  return (
    <div className='flex flex-col items-center text-center min-h-fit w-full md:max-w-7xl mx-auto p-16 '>
      <h2
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-black font-bold leading-none text-center `}
      >
        {data.headingData.heading}{' '}
        <span className='text-orange-500'>
          {data.headingData.coloredHeading}
        </span>
      </h2>
      {data.headingData.description && (
        <p className='text-gray-400 mt-4 mb-12'>
          {data.headingData.description}
        </p>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
        {data.items.map((member: TeamMember, i: number) => (
          <MemberCard key={i} member={member} />
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
