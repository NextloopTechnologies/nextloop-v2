import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import LoaderSvg from '../Loader/loader';
import {
  availableIndustries,
  availableServices,
} from '../../utils/staticTextImgData';
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
  const [showIndustriesDropdown, setShowIndustriesDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
      setIsOpen(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.events]);

  const toggleIndustriesDropdown = () => {
    setShowIndustriesDropdown((prev) => !prev);
  };
  const toggleServicesDropdown = () => {
    setShowServicesDropdown((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isLoading && (
        <div className='fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-95'>
          <LoaderSvg />
        </div>
      )}

      <div className='relative flex justify-between px-4'>
        <Link href='/' onClick={handleLinkClick}>
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
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>

      <motion.div
        className='fixed top-0 left-0 z-[999] h-full w-3/4 overflow-y-auto bg-white'
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.5 }}
      >
        <ul className='flex h-full flex-col items-start gap-6 px-6 py-16'>
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
              className='flex cursor-pointer items-center justify-between'
              onClick={toggleIndustriesDropdown}
            >
              <span>Industries</span>
              <ChevronIcon isUp={showIndustriesDropdown} />
            </div>

            {showIndustriesDropdown && (
              <ul className='ml-4 mt-2 space-y-2'>
                {availableIndustries.map((industry) => (
                  <li
                    key={industry.name}
                    className={`text-gray-700 opacity-60 hover:text-orange-500 ${
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
              pathname.startsWith('/services') ? 'text-orange-500' : ''
            }`}
          >
            <div className='flex cursor-pointer items-center justify-between'>
              <Link
                href='/services'
                className='flex-1'
                onClick={handleLinkClick}
              >
                Services
              </Link>
              <button
                type='button'
                onClick={toggleServicesDropdown}
                aria-label='Toggle Services dropdown'
                className='px-2'
              >
                <ChevronIcon isUp={showServicesDropdown} />
              </button>
            </div>

            {showServicesDropdown && (
              <ul className='ml-4 mt-2 space-y-2'>
                {availableServices.map((service) => (
                  <li
                    key={service.name}
                    className={`text-gray-700 opacity-60 hover:text-orange-500 ${
                      pathname === service.href ? 'text-orange-500' : ''
                    }`}
                  >
                    <Link
                      href={service.href}
                      className='block py-1'
                      onClick={handleLinkClick}
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
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

          <li className='mt-4 w-full'>
            <Link
              href='/contact-us'
              onClick={handleLinkClick}
              className='inline-block w-full rounded-full bg-orange-500 px-5 py-3 text-center text-white'
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
