import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { NextLoopColoredLogo } from '../../../assets';
import navIcon from '../../../public/hamburger.svg';

const ChevronIcon = ({ isUp }: { isUp: boolean }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points={isUp ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
  </svg>
);

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const [showIndustriesDropdown, setShowIndustriesDropdown] = useState(false);

  const industries = [
    { name: 'E-commerce', href: '/domain/ecommerce' },
    { name: 'Events', href: '/domain/events' },
    { name: 'Fin-Tech', href: '/domain/fintech' },
    { name: 'Healthcare', href: '/domain/healthcare' },
    // { name: 'Hotel', href: '/domain/hotel' },
    { name: 'Oil And Gas', href: '/domain/oilandgas' },
    { name: 'Food and Beverages', href: '/domain/foodandbeverages' },
    { name: 'Travel And Hospitality', href: '/domain/travelandhospitality' },
  ];

  const toggleIndustriesDropdown = () => {
    setShowIndustriesDropdown(!showIndustriesDropdown);
  };

  return (
    <>
      <div className='relative flex justify-between px-4'>
        <Image
          src={NextLoopColoredLogo}
          width={80}
          height={60}
          alt='NextLoop'
          onClick={() => router.push('/')}
        />
        <Image
          src={navIcon}
          alt='Technologies'
          onClick={() => setIsOpen((t) => !t)}
        />
      </div>
      <div
        onClick={() => setIsOpen(false)}
        className={`z-[99] ${
          isOpen ? 'w-screen h-screen' : 'w-0 h-0'
        } fixed top-0 bg-black opacity-0`}
      ></div>
      <motion.div
        className='fixed top-0 left-0 w-3/4 h-full bg-white z-[999] overflow-y-auto'
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.5 }}
      >
        <ul className='flex flex-col items-start py-16 px-6 gap-6 h-full'>
          <li className={`w-full ${pathname === '/' ? 'text-orange-500' : ''}`}>
            <Link href='/'>Home</Link>
          </li>
          <li
            className={`w-full ${
              pathname === '/about-us' ? 'text-orange-500' : ''
            }`}
          >
            <Link href='/about-us'>About us</Link>
          </li>
          <li
            className={`w-full ${
              pathname.startsWith('/domain') ? 'text-orange-500' : ''
            }`}
          >
            <div
              className='flex justify-between items-center cursor-pointer'
              onClick={toggleIndustriesDropdown}
            >
              <span>Industries</span>
              <ChevronIcon isUp={showIndustriesDropdown} />
            </div>
            {showIndustriesDropdown && (
              <ul className='mt-2 ml-4 space-y-2'>
                {industries.map((industry) => (
                  <li
                    key={industry.name}
                    className={`text-gray-700 hover:text-orange-500 opacity-60 ${
                      pathname === industry.href ? 'text-orange-500' : ''
                    }`}
                  >
                    <Link href={industry.href} className='block'>
                      {industry.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li
            className={`w-full ${
              pathname === '/portfolio' ? 'text-orange-500' : ''
            }`}
          >
            <Link href='/portfolio'>Portfolio</Link>
          </li>
          <li
            className={`w-full ${
              pathname === '/services' ? 'text-orange-500' : ''
            }`}
          >
            <Link href='/services'>Services</Link>
          </li>
          <li
            className={`w-full ${
              pathname === '/career' ? 'text-orange-500' : ''
            }`}
          >
            <Link href='/career'>Career</Link>
          </li>
          <li
            className={`w-full ${
              pathname === '/blog' ? 'text-orange-500' : ''
            }`}
          >
            <Link href='/blog'>Blog</Link>
          </li>
          <li className='w-full mt-4'>
            <button
              onClick={() => {
                router.push('#footer');
                setIsOpen(false);
              }}
              className='w-full bg-orange-500 text-white px-5 py-3 rounded-full'
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
