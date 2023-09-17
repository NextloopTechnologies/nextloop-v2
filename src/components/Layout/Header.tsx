import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { NextLoopColoredLogo, NextLoopLogo } from '../../../assets';

interface HeaderProps {
  isSticky: boolean;
}

const Header: React.FC<HeaderProps> = ({ isSticky }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerAnimation = useAnimation();

  useEffect(() => {
    function handleScroll() {
      const screenHeight = window?.innerHeight;
      if (window?.scrollY >= screenHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window?.addEventListener('scroll', handleScroll);
    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    headerAnimation.start({
      color: isScrolled ? 'black' : 'white',
      position: isSticky ? 'sticky' : 'absolute',
      top: isSticky ? 0 : undefined,
      transition: {
        duration: 0.5,
      },
    });
  }, [isScrolled, isSticky, headerAnimation]);

  const handleScrollOnClick = () => {
    const windowHeight = window?.innerHeight;
    const documentHeight = document.body.clientHeight;
    const scrollToY = documentHeight - windowHeight;

    window?.scrollTo({
      top: scrollToY,
      behavior: 'smooth',
    });
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={headerAnimation}
      className="px-10 pt-6 absolute top-0 left-0 w-full z-20"
    >
      <div className='flex justify-between '>
        <Image
          src={isScrolled ? NextLoopColoredLogo : NextLoopLogo}
          width={80}
          height={60}
          alt='NextLoopLogo'
        />
        <ul className='flex space-x-4 items-center'>
          <li>
            <a href='#about-us'>About Us</a>
          </li>
          <li>
            <a href='#portfolio'>Portfolio</a>
          </li>
          <li>
            <a href='#services'>Services</a>
          </li>
          <li>
            <a href='#career'>Career</a>
          </li>
          <li>
            <a href='#contact-us'>Blog</a>
          </li>
          <li>
            <button
              onClick={handleScrollOnClick}
              className='bg-orange-500 ml-10 text-white px-5 py-3 rounded-full'
            >
              Request quote &#10230;
            </button>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Header;
