import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

import { introHeaderVariants } from '../../utils/frameMotionAnimations';
import useWindowSize from '../../utils/useWindowSize';
import { clientReviewsAssets, DoubleQuotes } from '../../../assets';

interface CardData {
  name: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  quote: any;
}

const cardData = [
  {
    name: 'Sushil Kumar',
    title: 'Founder, Stemens Software Pvt. Ltd.',
    quote: (
      <span>
        I have been associated with NextLoop for a while now, and I can say with
        confidence that they are the real deal.
      </span>
    ),
  },
  {
    name: 'Vivek Pandey',
    title: 'CEO, Bright Hustle',
    quote: (
      <span>
        Working with NextLoop Technologies has been a game-changer for my
        business. They have helped me to improve employee productivity, and
        enhance my overall software process.
      </span>
    ),
  },
  {
    name: 'Mohit Chawla',
    title: 'CEO, Chawla Bearings',
    quote: (
      <span>
        I've been utilizing NextLoop's services for some time, and without a
        doubt, they excel in their field. They have helped me streamline my CRM
        processes, reduce costs, and improve employee engagement.
      </span>
    ),
  },
  {
    name: 'Shivansh Sharma',
    title: 'Founder, Blue Bird Events',
    quote: (
      <span>
        Nextloop team is friendly, knowledgeable, and always available to answer
        any questions we may have.
      </span>
    ),
  },
  {
    name: 'Brijesh panchal',
    title: 'Manager, Levram Lifesciences',
    quote: (
      <span>
        Nextloop Technologies LLP delivered the project on time, meeting the
        client's expectations. They communicated frequently and promptly via
        email, ensuring an effective workflow. Their expertise, knowledge,
        customized solutions, proactivity, and transparent pricing were
        hallmarks of their work.
      </span>
    ),
  },
  // Add data for other cards here
];

const textVariants = {
  hide: { opacity: 0 },
  show: { opacity: 1 },
};

const Card = ({ card }: { card: CardData }) => {
  const { isMobile } = useWindowSize();
  return (
    <motion.div
      initial={isMobile ? 'visible' : 'hide'}
      animate='show'
      exit='hide' // Add exit animation
      variants={textVariants}
      className='text-2xl pt-8 flex h-full lg:w-full'
      key={card.name} // Add a unique key to force a re-render when card changes
    >
      <div className='flex w-full max-h-40'>
        <div className='relative'>
          <div>
            <Image src={DoubleQuotes} alt='Mobile' width={250} height={100} />
          </div>

          <Image
            src={clientReviewsAssets.User_1}
            alt='Mobile'
            width={50}
            height={50}
            className='absolute top-4 right-5'
          />
        </div>
        <div className='flex flex-col gap-y-1 pt-5 pl-2 w-full lg:w-auto'>
          <span className='text-sm font-medium text-gray-600'>{card.name}</span>
          <span className='text-xs font-medium text-gray-500'>
            {card.title}
          </span>
          <span className='text-2xl lg:w-3/6 w-full italic pt-5'>
            {card.quote}
          </span>
          {/* <span className='text-xs  pt-5 flex justify-between lg:w-5/6 w-full'>
            <span className='lg:w-3/6 w-full'>
              Under tight deadlines and with high expectations, Nextloop
              Technologies was a pleasure to partner with. Professional,
              conscientious and thoroughly competent - I wouldn't hesitate in
              recommending them to other agencies.
            </span>
          </span> */}
        </div>
      </div>
    </motion.div>
  );
};
const CardSlider = () => {
  const [currentCard, setCurrentCard] = useState(0);

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const nextCard = () => {
    if (currentCard < cardData.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  // Use optional chaining to safely access the cardData element and provide a default value if it's undefined
  const currentCardData = cardData[currentCard] || {
    name: '',
    title: '',
    quote: '',
  };

  const { isMobile } = useWindowSize();

  return (
    <div className='flex items-center justify-center min-h-screen w-screen md:w-[1400px]'>
      <motion.header
        initial={isMobile ? 'visible' : 'hide'}
        whileInView='show'
        exit='hide'
        variants={introHeaderVariants}
        className='flex gap-x-10 lg:w-5/6 w-full'
      >
        <div className='flex flex-col h-full gap-y-20'>
          <motion.span
            initial={isMobile ? 'visible' : 'hide'}
            animate='show'
            variants={textVariants}
            className='lg:text-6xl text-3xl font-bold flex flex-col items-center lg:items-end lg:justify-end'
          >
            <span className='text-sm'>TESTIMONIAL</span>
            <div className='lg:w-2/3 lg:text-right w-full text-center'>
              What <b className='text-orange-500'>clients</b> have to say about
              our work.
            </div>
          </motion.span>
          <div className='flex'>
            <AnimatePresence mode='wait'>
              {currentCardData && (
                <motion.div
                  key={currentCard}
                  initial={{ opacity: isMobile ? 1 : 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card card={currentCardData} />
                </motion.div>
              )}
            </AnimatePresence>
            <div className='flex gap-x-4 lg:hidden items-end'>
              <button
                onClick={prevCard}
                className={`text-2xl hover:bg-gray-100 cursor-pointer border w-10 h-10 rounded-full flex items-center justify-center text-center ${currentCard === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                disabled={currentCard === 0}
              >
                &larr;
              </button>
              <button
                onClick={nextCard}
                className={`text-2xl border hover:bg-gray-100 cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-center ${currentCard === cardData.length - 1
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                  }`}
                disabled={currentCard === cardData.length - 1}
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className='hidden lg:inline-flex absolute gap-x-4 bottom-20 right-20 lg:pr-10'>
        <button
          onClick={prevCard}
          className={`text-2xl hover:bg-gray-100 cursor-pointer border w-10 h-10 rounded-full flex items-center justify-center text-center ${currentCard === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          disabled={currentCard === 0}
        >
          &larr;
        </button>
        <button
          onClick={nextCard}
          className={`text-2xl border hover:bg-gray-100 cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-center ${currentCard === cardData.length - 1
              ? 'opacity-50 cursor-not-allowed'
              : ''
            }`}
          disabled={currentCard === cardData.length - 1}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default CardSlider;
