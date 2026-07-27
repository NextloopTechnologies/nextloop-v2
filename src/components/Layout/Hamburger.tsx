import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import LoaderSvg from '../Loader/loader';
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
  const [isLoading, setIsLoading] = useState(false);

  const industries = [
    // { name: 'E-commerce', href: '/domain/ecommerce' },
    { name: 'Events', href: '/domain/events' },
    { name: 'Fin-Tech', href: '/domain/fintech' },
    { name: 'Healthcare', href: '/domain/healthcare' },
    { name: 'Oil And Gas', href: '/domain/oil-and-gas' },
    { name: 'Food And Beverages', href: '/domain/food-and-beverages' },
    { name: 'Travel And Hospitality', href: '/domain/travel-and-hospitality' },
  ];

  const toggleIndustriesDropdown = () => {
    setShowIndustriesDropdown(!showIndustriesDropdown);
  };

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        setIsLoading(true);
      }
    };
    const handleComplete = () => setIsLoading(false);
    const handleError = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleRequestQuote = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const footer = document.getElementById('footer');
    if (footer) {
      const headerOffset = 100;
      const elementPosition =
        footer.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setIsOpen(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-95 z-50'>
          <LoaderSvg />
        </div>
      )}
      <div className='relative flex justify-between px-4'>
        <Link href='/' onClick={() => setIsOpen(false)}>
          <Image
            src={NextLoopColoredLogo}
            width={80}
            height={60}
            alt='Nextloop'
          />
        </Link>
        <Image
          src={navIcon}
          alt='Technologies'
          onClick={() => setIsOpen((t) => !t)}
        />
      </div>
      <motion.div
        className='fixed top-0 left-0 w-3/4 h-full bg-white z-[999] overflow-y-auto'
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.5 }}
      >
        <ul className='flex flex-col items-start py-16 px-6 gap-6 h-full'>
          <li className={`w-full ${pathname === '/' ? 'text-orange-500' : ''}`}>
            <Link href='/' onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li
            className={`w-full ${
              pathname === '/about-us' ? 'text-orange-500' : ''
            }`}
          >
            <Link href='/about-us' onClick={handleLinkClick}>
              About us
            </Link>
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
                    <Link
                      href={industry.href}
                      onClick={handleLinkClick}
                      className='block'
                    >
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
            <Link href='/portfolio' onClick={handleLinkClick}>
              Portfolio
            </Link>
          </li>
          <li
            className={`w-full ${
              pathname === '/services' ? 'text-orange-500' : ''
            }`}
          >
            <Link href='/services' onClick={handleLinkClick}>
              Services
            </Link>
          </li>
          <li
            className={`w-full ${
              pathname === '/career' ? 'text-orange-500' : ''
            }`}
          >
            <Link href='/career' onClick={handleLinkClick}>
              Careers
            </Link>
          </li>
          <li
            className={`w-full ${
              pathname === '/blog' ? 'text-orange-500' : ''
            }`}
          >
            <Link href='/blog' onClick={handleLinkClick}>
              Blogs
            </Link>
          </li>
          <li
            className={`w-full ${
              pathname === '/culture' ? 'text-orange-500' : ''
            }`}
          >
            <Link href='/culture' onClick={handleLinkClick}>
              Culture
            </Link>
          </li>
          <li className='w-full mt-4'>
            <Link
              href='#footer'
              onClick={handleRequestQuote}
              className='w-full bg-orange-500 text-white px-5 py-3 rounded-full inline-block text-center'
            >
              Contact Us &#10230;
            </Link>
          </li>
        </ul>
      </motion.div>
    </>
  );
};

export default Hamburger;
