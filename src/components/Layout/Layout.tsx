import React, { ReactNode, useEffect, useState } from 'react';

import Hamburger from './Hamburger';
import Header from './Header';
import PitchThought from '../PitchThought';
import { Section } from '../../pages';
import useWindowSize from '../../utils/useWindowSize';

interface LayoutProps {
  children: ReactNode;
  pitchThoughtSectionEnabled?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  pitchThoughtSectionEnabled,
}) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window?.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window?.addEventListener('scroll', handleScroll);

    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { width } = useWindowSize();

  return (
    <>
      {width! > 1023 ? <Header isSticky={isSticky} /> : <Hamburger />}
      <div className='z-10'>{children}</div>
      {pitchThoughtSectionEnabled ? (
        <Section className='min-h-screen bg-[#010103] w-screen'>
          <div className='container mx-auto'>
            <PitchThought />
          </div>
        </Section>
      ) : (
        <div className='min-h-screen bg-[#010103] w-screen'>
          <div className='container mx-auto'>
            <PitchThought />
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
