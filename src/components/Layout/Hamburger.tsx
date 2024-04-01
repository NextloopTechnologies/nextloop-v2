import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { NextLoopColoredLogo } from '../../../assets';
import navIcon from '../../../public/hamburger.svg';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='flex justify-between px-4'>
        <Image
          src={NextLoopColoredLogo}
          width={80}
          height={60}
          alt='NextLoopLogo'
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
          <li>
            <Link href='/about-us'>About us</Link>
          </li>
          <li>
            <Link href='/portfolio'>Portfolio</Link>
          </li>
          <li>
            <Link href='/services'>Services</Link>
          </li>
          <li>
            <Link href='/careers'>Career</Link>
          </li>
          <li className='grow'>
            <Link href='/blog'>Blog</Link>
          </li>
          <li>
            <button className='bg-orange-500 text-white px-5 py-3 rounded-full'>
              Request quote &#10230;
            </button>
          </li>
        </ul>
      </motion.div>
    </>
  );
};

export default Hamburger;
