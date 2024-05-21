import Image from 'next/image';
import { useRouter } from 'next/router';

import { RequestQuote } from '../../../../assets';

type Props = {
  title: string;
};

const CustomRequestQuote = ({ title }: Props) => {
  const router = useRouter();
  return (
    <div className='flex flex-col md:flex-row items-center justify-between bg-[#FA8145] py-6 px-20'>
      <div className='flex flex-col gap-8 max-w-4xl'>
        <h2 className='text-white font-bold text-5xl md:text-[65px] leading-none uppercase'>
          {title}
        </h2>

        <button
          onClick={() => router.push('#footer')}
          className='flex mr-auto bg-white text-[16px] px-5 justify-center items-center rounded-full'
        >
          <span>Request quote</span>{' '}
          <span className='text-[36px]'>&#10230;</span>
        </button>
      </div>

      <Image
        src={RequestQuote}
        className='mt-10 md:mt-0 w-[397px] aspect-square rounded-full'
        alt='request'
      />
    </div>
  );
};

export default CustomRequestQuote;
