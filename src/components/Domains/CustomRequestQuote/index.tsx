import Image from 'next/image';
import { useRouter } from 'next/router';

import { requestQuoteAssets } from '../../../../assets';
import palette from '../../../styles/pallette';

type Props = {
  title: string;
};

const CustomRequestQuote = ({ title }: Props) => {
  const router = useRouter();
  return (
    <div className='flex flex-col md:flex-row items-center justify-between bg-[#FA8145] py-7 px-20'>
      <div className='flex flex-col gap-8 max-w-4xl'>
        <h2
          className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} text-white font-bold leading-none uppercase`}
        >
          {title}
        </h2>

        <button
          onClick={() => router.push('#footer')}
          className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} flex mx-auto bg-white  px-5 py-1 justify-center items-center rounded-full`}
        >
          <span className='flex items-center'>
            {' '}
            {/* Added flex and items-center */}
            Request quote
          </span>{' '}
          <span
            className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} flex items-center ml-1`}
          >
            &#8594;
          </span>
        </button>
      </div>

      <Image
        src={requestQuoteAssets.RequestQuote}
        className='mt-10 md:mt-0 w-[397px] aspect-square rounded-full'
        height={500}
        width={500}
        alt='request'
      />
    </div>
  );
};

export default CustomRequestQuote;
