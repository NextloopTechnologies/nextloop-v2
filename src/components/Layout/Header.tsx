import { useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import LoaderSvg from '../Loader/loader';
import { NextLoopColoredLogo } from '../../../assets';

interface HeaderProps {
  isSticky: boolean;
  headerColor?: string;
}

const Header: React.FC<HeaderProps> = ({ isSticky, headerColor }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showIndustriesDropdown, setShowIndustriesDropdown] = useState(false);
  const headerAnimation = useAnimation();
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    headerAnimation.start({
      color: !isSticky ? 'white' : 'black',
      position: isSticky ? 'sticky' : 'absolute',
      top: isSticky ? 0 : undefined,
      transition: {
        duration: 0.5,
      },
    });
  }, [isScrolled, isSticky, headerAnimation, headerColor]);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [router]);

  const industries = [
    { name: 'E-commerce', href: '/domain/ecommerce' },
    { name: 'Events', href: '/domain/events' },
    { name: 'Fin-Tech', href: '/domain/fintech' },
    { name: 'Healthcare', href: '/domain/healthcare' },
    // { name: 'Hotel', href: '/domain/hotel' },
    { name: 'Oil And Gas', href: '/domain/oil-and-gas' },
    { name: 'Food and Beverages', href: '/domain/food-and-beverages' },
    { name: 'Travel And Hospitality', href: '/domain/travel-and-hospitality' },
  ];

  // const handleRequestQuote = () => {
  //   const footer = document.getElementById('footer');
  //   if (footer) {
  //     const headerOffset = isSticky ? 250 : 0;
  //     const elementPosition =
  //       footer.getBoundingClientRect().top + window.scrollY;
  //     const offsetPosition = elementPosition - headerOffset;

  //     window.scrollTo({
  //       top: offsetPosition,
  //       behavior: 'smooth',
  //     });
  //   }
  // };

  return (
    <>
      {isLoading && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-95 z-50'>
          <LoaderSvg />
        </div>
      )}
      <nav
        className={`px-10 fixed transition-all duration-300 ease-in-out top-0 left-0 w-full z-30 ${
          isSticky
            ? 'bg-white text-black shadow-md'
            : headerColor ?? 'text-white'
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
            <li
              className={`relative ${
                pathname.startsWith('/domain') && 'text-orange-500'
              }`}
              onMouseEnter={() => setShowIndustriesDropdown(true)}
              onMouseLeave={() => setShowIndustriesDropdown(false)}
            >
              <div
                className='cursor-pointer'
                role='button'
                aria-haspopup='true'
              >
                Industries
              </div>
              {showIndustriesDropdown && (
                <ul className='absolute left-0 mt-0 w-48 rounded-2xl rounded-tl-none shadow-lg bg-black ring-1 ring-black ring-opacity-5 py-2 pr-2 border border-orange-500 space-y-3'>
                  {industries.map((industry) => (
                    <li
                      key={industry.name}
                      className={` hover:bg-orange-500 text-white text-sm rounded-sm ${
                        pathname === industry.href
                          ? 'bg-orange-500 text-white'
                          : ''
                      }`}
                    >
                      <Link href={industry.href} className='block px-3 py-1'>
                        {industry.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className={`${pathname === '/portfolio' && 'text-orange-500'}`}>
              <Link href='/portfolio'>Portfolio</Link>
            </li>
            <li className={`${pathname === '/services' && 'text-orange-500'}`}>
              <Link href='/services'>Services</Link>
            </li>
            <li className={`${pathname === '/career' && 'text-orange-500'}`}>
              <Link href='/career'>Careers</Link>
            </li>
            <li className={`${pathname === '/blog' && 'text-orange-500'}`}>
              <Link href='/blog'>Blogs</Link>
            </li>
            <li>
              <Link
                // onClick={handleRequestQuote}
                className='bg-orange-500 ml-10 text-white px-5 py-3 rounded-full flex items-center justify-center'
                href='/contact-us'
              >
                Contact Us <span className='ml-2'>&#10230;</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
