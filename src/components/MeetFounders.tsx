import Image from 'next/image';

import palette from '../styles/pallette';
import { toTitleCase } from '../utils/helper';

type FounderItem = {
  name: string;
  title: string;
  imageUrl: string;
  linkedinUrl: string;
};

const foundersData: FounderItem[] = [
  {
    name: 'Piyush Shrivastava',
    title: 'Chief Executive Officer',
    imageUrl: '/founders/2.png',
    linkedinUrl: 'https://www.linkedin.com/in/piyush-shrivastava-nextloop/',
  },
  {
    name: 'Rahul Nayak',
    title: 'Chief Operating Officer',
    imageUrl: '/founders/1.png',
    linkedinUrl: 'https://www.linkedin.com/in/rahul-nayak-15552b172/',
  },
];

const LinkedInIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className='w-4 h-4'
  >
    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
  </svg>
);

const MeetFounders = () => {
  return (
    <div className='bg-white text-center px-6 py-20'>
      {/* Header */}
      <div className='max-w-2xl mx-auto mb-16'>
        <p className='text-orange-500 text-xs font-bold tracking-[0.3em] mb-3'>
          Meet the People
        </p>
        <h2
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-black  font-bold`}
        >
          Our <span className='text-orange-500'>Leadership Team</span>
        </h2>
      </div>

      {/* Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16 max-w-4xl mx-auto'>
        {foundersData.map((founder, index) => (
          <div key={index} className='flex flex-col items-center'>
            {/* Card */}
            <div className='group relative w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default bg-black'>
              <div className='relative w-full aspect-[3/4]'>
                <Image
                  src={founder.imageUrl}
                  alt={founder.name}
                  fill
                  className='object-cover object-top group-hover:scale-105 group-hover:opacity-75 transition-all duration-500'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent' />

                {/* LinkedIn icon — top right corner */}
                <a
                  href={founder.linkedinUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-300'
                  onClick={(e) => e.stopPropagation()}
                >
                  <LinkedInIcon />
                </a>

                {/* Bottom info */}
                <div className='absolute bottom-0 left-0 right-0 p-6 text-left'>
                  <div className='w-6 h-[2px] bg-orange-500 mb-3' />
                  <h3 className='text-white text-xl font-bold leading-tight'>
                    {toTitleCase(founder.name)}
                  </h3>
                  <p className='text-orange-400 text-xs font-semibold  tracking-widest mt-1'>
                    {founder.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetFounders;
