import { AnimatePresence, motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { clientReviewsAssets } from '../../../../assets';
import { getStaticImageData } from '../../../utils/helper';

type Data = {
  id: number;
  name: string;
  subTitle: string;
  image: StaticImageData;
  description: string;
};

type ReviewProps = {
  review: Data;
};

const sampleData: Data[] = [
  {
    id: 1,
    name: 'Charlotte Reiss',
    subTitle: 'Vivi et Margot',
    image: getStaticImageData(clientReviewsAssets.User_1),
    description:
      "Wix Events made this the easiest pivot of all! We piloted our first online program as a free weekend retreat and after a few short days of sending out the eBlast, we had hundreds registered through the frictionless process of Wix's online registration.",
  },
  {
    id: 2,
    name: 'Charlotte Reiss2',
    subTitle: 'Vivi et Margot2',
    image: getStaticImageData(clientReviewsAssets.User_1),
    description:
      "Wix Events made this the easiest pivot of all! We piloted our first online program as a free weekend retreat and after a few short days of sending out the eBlast, we had hundreds registered through the frictionless process of Wix's online registration.",
  },
  {
    id: 3,
    name: 'Charlotte Reiss3',
    subTitle: 'Vivi et Margot3',
    image: getStaticImageData(clientReviewsAssets.User_1),
    description:
      "Wix Events made this the easiest pivot of all! We piloted our first online program as a free weekend retreat and after a few short days of sending out the eBlast, we had hundreds registered through the frictionless process of Wix's online registration.",
  },
  {
    id: 4,
    name: 'Charlotte Reiss4',
    subTitle: 'Vivi et Margot4',
    image: getStaticImageData(clientReviewsAssets.User_1),
    description:
      "Wix Events made this the easiest pivot of all! We piloted our first online program as a free weekend retreat and after a few short days of sending out the eBlast, we had hundreds registered through the frictionless process of Wix's online registration.",
  },
];

const ReviewCard = ({ review }: ReviewProps) => (
  <motion.div
    animate='show'
    exit='hide'
    className='flex flex-col md:flex-row items-center gap-[50px] mx-5 bg-white rounded-[20px] p-10 md:w-[964px] md:pl-[108px] md:pr-14'
  >
    <div className='flex flex-col items-center gap-6'>
      <Image
        src={review.image}
        alt='user'
        height={400}
        width={400}
        className='w-[100px] md:w-[200px] object-cover'
      />

      <div className='flex flex-col gap-2 text-center'>
        <h3 className='text-2xl font-bold'>{review.name}</h3>
        <h5 className='text-[16px] font-normal'>{review.subTitle}</h5>
      </div>
    </div>

    <div className='flex flex-col gap-12'>
      <Image
        src={getStaticImageData(clientReviewsAssets.InvertedCommaStartOrange)}
        className='w-6 h-6 md:w-14 md:h-10'
        height={50}
        width={50}
        alt='inverted start'
      />

      <p className='font-normal text-[16px] text-[#261F21B2] leading-6 md:ml-[53px] md:w-[471px]'>
        {review.description}
      </p>

      <Image
        src={getStaticImageData(clientReviewsAssets.InvertedCommaEndOrange)}
        className='w-6 h-6 md:w-14 md:h-10 ml-auto'
        height={50}
        width={50}
        alt='inverted start'
      />
    </div>
  </motion.div>
);

type Props = {
  title?: string;
  colouredTitle?: string;
  className?: string; // Added className prop
};

const ClientReviews = ({ colouredTitle, title, className }: Props) => {
  const [index, setIndex] = useState(0);
  const [buttonClicked, setButtonClicked] = useState('');

  useEffect(() => {
    if (buttonClicked) {
      if (buttonClicked === 'left' && index > 0) {
        setIndex((prev) => prev - 1);
        setButtonClicked('');
      } else if (buttonClicked === 'right' && index < sampleData.length - 1) {
        setIndex((prev) => prev + 1);
        setButtonClicked('');
      }
    }
  }, [buttonClicked, index]);

  const currentReview = useMemo(() => {
    return sampleData[index];
  }, [index]);

  return (
    <div
      className={`bg-[#1D1D1D] pt-[134px] pb-[112px] flex flex-col items-center gap-[90px] ${className}`}
    >
      {' '}
      {/* Apply className here */}
      <h1 className='text-3xl md:text-7xl uppercase md:mx-72 font-bold text-white text-center'>
        {!title && !colouredTitle ? (
          <>
            What our <span className='text-orange-500'>clients</span> say
          </>
        ) : (
          <>
            {title} <span className='text-orange-500'>{colouredTitle}</span>
          </>
        )}
      </h1>
      <div className='flex flex-col md:flex-row items-center gap-14'>
        <div className='flex items-center gap-5'>
          <button
            disabled={index === 0}
            className='arrow_buttons'
            onClick={() => setButtonClicked('left')}
          >
            &larr;
          </button>
          <button
            disabled={index === sampleData.length - 1}
            className='md:hidden arrow_buttons'
            onClick={() => setButtonClicked('right')}
          >
            &rarr;
          </button>
        </div>

        <AnimatePresence mode='wait'>
          {currentReview && (
            <motion.div
              key={currentReview.id}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: buttonClicked === 'left' ? 100 : -100 }}
              transition={{ duration: 0.5 }}
            >
              <ReviewCard review={currentReview} />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          disabled={index === sampleData.length - 1}
          className='hidden md:inline-flex arrow_buttons'
          onClick={() => setButtonClicked('right')}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default ClientReviews;
