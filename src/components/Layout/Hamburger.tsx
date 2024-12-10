import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
    { name: 'E-commerce', href: '/domain/ecommerce' },
    { name: 'Events', href: '/domain/events' },
    { name: 'Fin-Tech', href: '/domain/fintech' },
    { name: 'Healthcare', href: '/domain/healthcare' },
    { name: 'Oil And Gas', href: '/domain/oilandgas' },
    { name: 'Food and Beverages', href: '/domain/foodandbeverages' },
    { name: 'Travel And Hospitality', href: '/domain/travelandhospitality' },
  ];

  const toggleIndustriesDropdown = () => {
    setShowIndustriesDropdown(!showIndustriesDropdown);
  };

  const handleNavigation = (href: string) => {
    setIsLoading(true);
    router.push(href).then(() => {
      setIsLoading(false);
      setIsOpen(false);
    });
  };

  const handleRequestQuote = () => {
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
        <Image
          src={NextLoopColoredLogo}
          width={80}
          height={60}
          alt='NextLoop'
          onClick={() => handleNavigation('/')}
        />
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
            <button onClick={() => handleNavigation('/')}>Home</button>
          </li>
          <li
            className={`w-full ${
              pathname === '/about-us' ? 'text-orange-500' : ''
            }`}
          >
            <button onClick={() => handleNavigation('/about-us')}>
              About us
            </button>
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
                    <button
                      onClick={() => handleNavigation(industry.href)}
                      className='block'
                    >
                      {industry.name}
                    </button>
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
            <button onClick={() => handleNavigation('/portfolio')}>
              Portfolio
            </button>
          </li>
          <li
            className={`w-full ${
              pathname === '/services' ? 'text-orange-500' : ''
            }`}
          >
            <button onClick={() => handleNavigation('/services')}>
              Services
            </button>
          </li>
          <li
            className={`w-full ${
              pathname === '/career' ? 'text-orange-500' : ''
            }`}
          >
            <button onClick={() => handleNavigation('/career')}>Careers</button>
          </li>
          <li
            className={`w-full ${
              pathname === '/blog' ? 'text-orange-500' : ''
            }`}
          >
            <button onClick={() => handleNavigation('/blog')}>Blogs</button>
          </li>
          <li className='w-full mt-4'>
            <button
              onClick={handleRequestQuote}
              className='w-full bg-orange-500 text-white px-5 py-3 rounded-full'
            >
              Contact Us &#10230;
            </button>
          </li>
        </ul>
      </motion.div>
    </>
  );
};

export default Hamburger;
