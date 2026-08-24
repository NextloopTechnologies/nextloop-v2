import { Gift, Megaphone, Send } from 'lucide-react';
import React from 'react';

import ToolBox from './ToolBox';
import palette from '../../../styles/pallette';

const growBusinessData = [
  {
    icon: <Send size={28} color='white' />,
    title: 'Grow Your Business',
    descp:
      'Tap into on-demand delivery integrations that connect your kitchen to more customers, wherever they are.',
  },
  {
    icon: <Gift size={28} color='white' />,
    title: 'Reward Repeat Customers ',
    descp:
      ' Strengthen loyalty with a fully customizable rewards program designed to turn first-time visitors into regulars.',
  },
  {
    icon: <Megaphone size={28} color='white' />,
    title: 'Boost Your Visibility ',
    descp:
      'Leverage a built-in suite of marketing tools that help you promote your brand, fill more seats, and stay top of mind.',
  },
];

const GrowBusiness = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center mx-auto py-10'>
      <h1
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold  w-full`}
      >
        The Tools Built to{' '}
        <span className='text-orange-500'>Grow Your Business</span>
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
