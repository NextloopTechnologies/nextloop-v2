import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

import { introHeaderVariants } from '../../utils/frameMotionAnimations';
import { DoubleQuotes, User_1 } from '../../../assets';

interface CardData {
  name: string;
  title: string;
  quote: any;
}

const cardData = [
  {
    name: 'Harry Adetola',
    title: 'CEO, Harris Energy',
    quote: (
      <span>
        Nextloop has expertise that{' '}
        <b className='text-orange-400'>transformed our business,</b> making them
        an invaluable partner for our growth and innovation.
      </span>
    ),
  },
  {
    name: 'Rishabh Pandey',
    title: 'CEO, Harris Energy',
    quote: (
      <span>
        Nextloop has expertise that{' '}
        <b className='text-orange-400'>transformed our business,</b> making them
        an invaluable partner for our growth and innovation.
      </span>
    ),
  },
  {
    name: 'Rakshit',
    title: 'CEO, Harris Energy',
    quote: (
      <span>
        Nextloop has expertise that{' '}
        <b className='text-orange-400'>transformed our business,</b> making them
        an invaluable partner for our growth and innovation.
      </span>
    ),
  },
  {
    name: 'Harsh',
    title: 'CEO, Harris Energy',
    quote: (
      <span>
        Nextloop has expertise that{' '}
        <b className='text-orange-400'>transformed our business,</b> making them
        an invaluable partner for our growth and innovation.
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
  return (
    <motion.div
      initial='hide'
      animate='show'
      exit='hide' // Add exit animation
      variants={textVariants}
      className='text-2xl pt-8 flex h-full'
      key={card.name} // Add a unique key to force a re-render when card changes
    >
      <div className='flex'>
        <div className='relative'>
          <div>
            <Image src={DoubleQuotes} alt="Mobile" width={250} height={100} />
          </div>

          <Image
            src={User_1}
            alt="Mobile"
            width={50}
            height={50}
            className='absolute top-4 right-5'
          />
        </div>
        <div className='flex flex-col gap-y-1 pt-5 pl-2'>
          <span className='text-sm font-medium text-gray-600'>{card.name}</span>
          <span className='text-xs font-medium text-gray-500'>
            {card.title}
          </span>
          <span className='text-2xl w-3/6 italic pt-5'>{card.quote}</span>
          <span className='text-xs  pt-5 flex justify-between w-5/6'>
            <span className='w-3/6'>
              Under tight deadlines and with high expectations, Nextloop
              Technologies was a pleasure to partner with. Professional,
              conscientious and thoroughly competent - I wouldn't hesitate in
              recommending them to other agencies.
            </span>
          </span>
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

  return (
    <div className='flex items-center justify-center h-screen'>
      <motion.header
        initial='hide'
        whileInView='show'
        exit='hide'
        variants={introHeaderVariants}
        className='flex gap-x-10 w-5/6 '
      >
        <div className='flex flex-col h-full gap-y-20'>
          <motion.span
            initial='hide'
            animate='show'
            variants={textVariants}
            className='text-6xl font-bold  flex justify-end'
          >
            {/* <span className='text-sm'>#TESTIMONIAL</span> */}
            <div className='w-2/3 text-right'>
              What <b className='text-orange-400'>clients</b> have to say about
              our work.
            </div>
          </motion.span>
          <div className='flex'>
            <AnimatePresence mode='wait'>
              {currentCardData && (
                <motion.div
                  key={currentCard}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card card={currentCardData} />
                </motion.div>
              )}
            </AnimatePresence>
            <div className=' flex gap-x-4  pr-10 items-end'>
              <button
                onClick={prevCard}
                className={`text-2xl hover:bg-gray-100 cursor-pointer border w-10 h-10 rounded-full flex items-center justify-center text-center ${
                  currentCard === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={currentCard === 0}
              >
                &larr;
              </button>
              <button
                onClick={nextCard}
                className={`text-2xl border hover:bg-gray-100 cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-center ${
                  currentCard === cardData.length - 1
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
    </div>
  );
};

export default CardSlider;
