import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { NextLoopColoredLogo } from '../../../assets';

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

  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    headerAnimation.start({
      color: !isSticky ? 'white' : 'black',
      position: isSticky ? 'sticky' : 'absolute',
      top: isSticky ? 0 : undefined,
      transition: {
        duration: 0.5,
      },
    });
  }, [isScrolled, isSticky, headerAnimation]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={headerAnimation}
      className={`px-10 pt-6 absolute top-0 left-0 w-full z-30 ${
        isSticky ? 'bg-white' : ''
      }`}
    >
      <div className='flex justify-between'>
        <Image
          src={NextLoopColoredLogo}
          width={80}
          height={60}
          alt='NextLoopLogo'
          onClick={() => router.push('/')}
        />
        <ul className='flex space-x-4 items-center'>
          <li className={`${pathname === '/' && 'text-orange-500'}`}>
            <Link href='/'>Home</Link>
          </li>
          <li className={`${pathname === '/about-us' && 'text-orange-500'}`}>
            <Link href='/about-us'>About us</Link>
          </li>
          <li className={`${pathname === '/portfolio' && 'text-orange-500'}`}>
            <Link href='/portfolio'>Portfolio</Link>
          </li>
          <li className={`${pathname === '/services' && 'text-orange-500'}`}>
            <Link href='/services'>Services</Link>
          </li>
          <li className={`${pathname === '/careers' && 'text-orange-500'}`}>
            <Link href='/careers'>Career</Link>
          </li>
          <li className={`${pathname === '/blog' && 'text-orange-500'}`}>
            <Link href='/blog'>Blog</Link>
          </li>
          <li>
            <button
              onClick={() => router.push('#footer')}
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
