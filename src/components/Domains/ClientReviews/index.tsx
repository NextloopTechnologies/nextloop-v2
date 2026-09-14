import { AnimatePresence, motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { clientReviewsAssets } from '../../../../assets';
import palette from '../../../styles/pallette';
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
    className='flex flex-col md:flex-row items-center gap-[20px] bg-white rounded-[20px] p-3 md:w-[700px] md:px-8 m-5 md:m-0'
  >
    <div className='flex flex-col items-center gap-6'>
      <Image
        src={review.image}
        alt='user'
        height={400}
        width={400}
        className='w-[100px] md:w-[150px] object-cover md:mt-2 mt-5'
      />

      <div className='flex flex-col gap-2 text-center'>
        <h3 className='text-xl font-bold'>{review.name}</h3>
        <h5 className='text-[16px] font-normal'>{review.subTitle}</h5>
      </div>
    </div>

    <div className='flex flex-col gap-12'>
      <Image
        src={getStaticImageData(clientReviewsAssets.InvertedCommaStartOrange)}
        className='w-6 h-6 md:w-8 md:h-6'
        height={50}
        width={50}
        alt='inverted start'
      />

      <p
        className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop} text-[#261F21B2] leading-2 md:ml-[40px] md:w-[400px]`}
      >
        {review.description}
      </p>

      <Image
        src={getStaticImageData(clientReviewsAssets.InvertedCommaEndOrange)}
        className='w-6 h-6 md:w-8 md:h-6 ml-auto'
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
  className?: string;
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
      className={`bg-[#1D1D1D] pt-[50px] pb-[70px] flex flex-col items-center gap-[50px] ${className}`}
    >
      <h1
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} uppercase md:mx-10 font-bold text-white text-center`}
      >
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
        <div className='hidden md:flex items-center md:flex-col'>
          <button
            disabled={index === 0}
            className='arrow_buttons'
            onClick={() => setButtonClicked('left')}
          >
            &larr;
          </button>
        </div>

        <div className='flex flex-col items-center w-full'>
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

          <div className='flex justify-center gap-5 mt-5 md:hidden'>
            <button
              disabled={index === 0}
              className='arrow_buttons'
              onClick={() => setButtonClicked('left')}
            >
              &larr;
            </button>
            <button
              disabled={index === sampleData.length - 1}
              className='arrow_buttons'
              onClick={() => setButtonClicked('right')}
            >
              &rarr;
            </button>
          </div>
        </div>

        <button
          disabled={index === sampleData.length - 1}
          className='hidden md:inline-flex arrow_buttons px-2'
          onClick={() => setButtonClicked('right')}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default ClientReviews;
