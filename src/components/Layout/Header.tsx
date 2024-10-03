import { useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { NextLoopColoredLogo } from '../../../assets';

interface HeaderProps {
  isSticky: boolean;
}

const Header: React.FC<HeaderProps> = ({ isSticky }) => {
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
  }, [isScrolled, isSticky, headerAnimation]);

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
    { name: 'Oil And Gas', href: '/domain/oilandgas' },
    { name: 'Food and Beverages', href: '/domain/foodandbeverages' },
    { name: 'Travel And Hospitality', href: '/domain/travelandhospitality' },
  ];

  return (
    <>
      {isLoading && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50'>
          <p>Loading...</p>
        </div>
      )}
      <nav
        className={`px-10 fixed transition-all duration-300 ease-in-out top-0 left-0 w-full z-30 ${
          isSticky ? 'bg-white text-black shadow-md' : 'text-white'
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
              <div>Industries</div>
              {showIndustriesDropdown && (
                <ul className='absolute left-0 mt-0 w-40 shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                  {industries.map((industry) => (
                    <li
                      key={industry.name}
                      className='text-gray-700 hover:bg-orange-500 hover:text-white text-sm'
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
              <Link href='/career'>Career</Link>
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
      </nav>
    </>
  );
};

export default Header;
