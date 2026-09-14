import Head from 'next/head';
import React, { ReactNode, useEffect, useState } from 'react';

import Hamburger from './Hamburger';
import Header from './Header';
import PitchThought from '../PitchThought';
import { Section } from '../../pages';
import useWindowSize from '../../utils/useWindowSize';

interface LayoutProps {
  children: ReactNode;
  pitchThoughtSectionEnabled?: boolean;
  divRefs?: (HTMLDivElement | null)[];
  id?: string;
  headerColor?: string;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  pitchThoughtSectionEnabled,
  divRefs,
  id,
  headerColor,
  showFooter = true,
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
    <div>
      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
      <Head>
        <meta
          name='google-site-verification'
          content='rSkhwwyngCBXY24oCD9ERrGDGzkIFubisOa3k-JDjWs'
        />
      </Head>
      {width && width > 1023 ? (
        <Header isSticky={isSticky} headerColor={headerColor} />
      ) : (
        <Hamburger />
      )}

      <div className='z-10'>{children}</div>
      {pitchThoughtSectionEnabled ? (
        <Section className='min-h-screen bg-[#010103] w-screen'>
          <div
            id={id}
            ref={(el: HTMLDivElement | null) => {
              if (divRefs?.length) divRefs[8] = el;
            }}
            className='container mx-auto'
          >
            <PitchThought />
          </div>
        </Section>
      ) : (
        <div className=' bg-[#010103]'>
          <div
            id={id}
            ref={(el: HTMLDivElement | null) => {
              if (divRefs?.length) divRefs[8] = el;
            }}
          >
            {showFooter && <PitchThought />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
