import { motion, useAnimation } from 'framer-motion';
import React, { ReactNode, useEffect, useState } from 'react';

interface ScrollingSectionProps {
  children: ReactNode;
}

const ScrollingSection: React.FC<ScrollingSectionProps> = ({ children }) => {
  const [scrolling, setScrolling] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window?.scrollY;
      if (scrollY > 0 && !scrolling) {
        setScrolling(true);
        controls.start({ opacity: 0 });
      } else if (scrollY === 0 && scrolling) {
        setScrolling(false);
        controls.start({ opacity: 1 });
      }
    };

    const scrollListener = () => {
      window?.requestAnimationFrame(handleScroll);
    };

    window?.addEventListener('scroll', scrollListener);

    return () => {
      window?.removeEventListener('scroll', scrollListener);
    };
  }, [scrolling, controls]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={controls}
      transition={{ opacity: { duration: 0.2 } }}
      className='min-h-screen relative'
    >
      {children}
    </motion.div>
  );
};

export default ScrollingSection;
