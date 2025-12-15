import React from 'react';
import ToolBox from './ToolBox';
import palette from '../../../styles/pallette';
import { Send, Gift, Megaphone } from 'lucide-react';

const growBusinessData = [
  {
    icon: <Send size={28} color="white" />,
    title: 'Expand your reach',
    descp: 'Serve more customers with on-demand delivery integration.',
  },
  {
    icon: <Gift size={28} color="white" />,
    title: 'Reward repeat customers',
    descp: 'Build a strong customer base with an easily customizable loyalty program.',
  },
  {
    icon: <Megaphone size={28} color="white" />,
    title: 'Boost your visibility',
    descp: 'Get a suite of built-in marketing tools to grow and promote your business.',
  },
];

const GrowBusiness = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center mx-auto py-10'>
      <h1
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold uppercase w-full`}
      >
        The tools you need to grow your{' '}
        <span className='text-orange-500'>business</span>
      </h1>

      <div className='container flex flex-col items-center mx-auto p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-[75px] mt-[45px]'>
          {growBusinessData.map(({ icon, title, descp }, idx) => (
            <ToolBox key={idx} icons={icon} title={title} descp={descp} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrowBusiness;
