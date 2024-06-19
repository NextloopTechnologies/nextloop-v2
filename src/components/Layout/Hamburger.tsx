import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { NextLoopColoredLogo } from '../../../assets';
import navIcon from '../../../public/hamburger.svg';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      <div className='flex justify-between px-4'>
        <Image
          src={NextLoopColoredLogo}
          width={80}
          height={60}
          alt='NextLoopLogo'
          onClick={() => router.push('/')}
        />
        <Image
          src={navIcon}
          alt='navbar'
          onClick={() => setIsOpen((t) => !t)}
        />
      </div>
      <motion.div
        className='fixed top-0 left-0 w-1/2 h-full bg-white z-[999]'
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.5 }}
      >
        <ul className='flex flex-col items-center py-16 gap-8 h-full'>
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
          <li className={`${pathname === '/career' && 'text-orange-500'}`}>
            <Link href='/career'>Career</Link>
          </li>
          <li className={`${pathname === '/blog' && 'text-orange-500'}`}>
            <Link href='/blog'>Blog</Link>
          </li>
          <li>
            <button
              onClick={() => router.push('#footer')}
              className='bg-orange-500 text-white px-5 py-3 rounded-full'
            >
              Request quote &#10230;
            </button>
          </li>
        </ul>
      </motion.div>
    </>
  );
};

export default Hamburger;
