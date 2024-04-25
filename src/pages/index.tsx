import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import AboutUs from '../components/AboutUs';
import Career from '../components/Career';
import ClientReview from '../components/ClientReview';
import Experience from '../components/Experience';
import Intro from '../components/Intro';
import Layout from '../components/Layout/Layout';
import Portfolio from '../components/Portfolio';
import Services from '../components/ServicesGroup';
import WhoWeAre from '../components/WhoWeAre';
import useWindowSize from '../utils/useWindowSize';

const sectionStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  scrollSnapAlign: 'start',
  perspective: '500px',
  scrollSnapStop: 'always',
  overflow: 'hidden',
};

export function Section({
  children,
  id,
  className,
  refProp,
}: React.PropsWithChildren<{
  id?: string;
  className?: string;
  refProp?: any;
}>) {
  return (
    <section id={id} className={className} style={sectionStyle} ref={refProp}>
      <div>{children}</div>
    </section>
  );
}

export default function Home() {
  const [showNextPageButton, setShowNextPageButton] = useState(true);
  const [showToTopButton, setShowToTopButton] = useState(false);
  const [scrollBelowServices, setScrollBelowServices] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const introRef = useRef<HTMLDivElement | null>(null);
  const whoWeAreRef = useRef<HTMLDivElement | null>(null);
  const servicesSectionRef = useRef<HTMLDivElement | null>(null);
  const careersRef = useRef<HTMLDivElement | null>(null);

  const aboutUsRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const portfolioRef = useRef<HTMLDivElement | null>(null);
  const clientReviewRef = useRef<HTMLDivElement | null>(null);

  const handleScrollOnClick = () => {
    if (showNextPageButton) {
      window?.scrollBy({ top: 1000, behavior: 'smooth' });
    } else if (showToTopButton) {
      window?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window?.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (window?.scrollY + windowHeight >= documentHeight - 100) {
        setShowNextPageButton(false);
        setShowToTopButton(true);
      } else {
        setShowNextPageButton(true);
        setShowToTopButton(false);
      }
      if (
        servicesSectionRef?.current &&
        window?.scrollY + windowHeight >=
          servicesSectionRef.current.offsetTop +
            servicesSectionRef.current.clientHeight
      ) {
        if (!scrollBelowServices) {
          // You have just scrolled to the Services section
          setScrollBelowServices(true);
          setIsModalOpen(true);
          // Call your specific function here
        }
      }
      if (window?.scrollY + windowHeight === 2803) {
        setScrollBelowServices(false);
        // setIsModalOpen(false);
      }
    };

    window?.addEventListener('scroll', handleScroll);

    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { isMobile } = useWindowSize();

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const introOffset = introRef.current!.offsetTop;
      const whoWeAreRefOffset = whoWeAreRef.current!.offsetTop;
      const servicesSectionRefOffset = servicesSectionRef.current!.offsetTop;
      const careersOffset = careersRef.current!.offsetTop;
      const aboutUsOffset = aboutUsRef.current!.offsetTop;
      const experienceOffset = experienceRef.current!.offsetTop;
      const portfolioOffset = portfolioRef.current!.offsetTop;
      const clientReviewOffset = clientReviewRef.current!.offsetTop;

      if (e.deltaY > 0) {
        if (scrollY < introOffset) {
          introRef.current!.scrollIntoView({ behavior: 'smooth' });
        } else if (
          scrollY >= introOffset &&
          scrollY < whoWeAreRefOffset - windowHeight
        ) {
          whoWeAreRef.current!.scrollIntoView({ behavior: 'smooth' });
        } else if (
          scrollY >= whoWeAreRefOffset &&
          scrollY < servicesSectionRefOffset - windowHeight
        ) {
          servicesSectionRef.current!.scrollIntoView({ behavior: 'smooth' });
        } else if (
          scrollY >= servicesSectionRefOffset &&
          scrollY < careersOffset - windowHeight
        ) {
          careersRef.current!.scrollIntoView({ behavior: 'smooth' });
        } else if (
          scrollY >= careersOffset &&
          scrollY < aboutUsOffset - windowHeight
        ) {
          aboutUsRef.current!.scrollIntoView({ behavior: 'smooth' });
        } else if (
          scrollY >= aboutUsOffset &&
          scrollY < experienceOffset - windowHeight
        ) {
          experienceRef.current!.scrollIntoView({ behavior: 'smooth' });
        } else if (
          scrollY >= experienceOffset &&
          scrollY < portfolioOffset - windowHeight
        ) {
          portfolioRef.current!.scrollIntoView({ behavior: 'smooth' });
        } else if (
          scrollY >= portfolioOffset &&
          scrollY < clientReviewOffset - windowHeight
        ) {
          clientReviewRef.current!.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        if (
          scrollY >= clientReviewOffset - windowHeight &&
          scrollY < portfolioOffset
        ) {
          portfolioRef.current!.scrollIntoView({ behavior: 'smooth' });
        } else if (scrollY >= portfolioOffset && scrollY < experienceOffset) {
          experienceRef.current!.scrollIntoView({ behavior: 'smooth' });
        } else if (scrollY >= experienceOffset && scrollY < aboutUsOffset) {
          aboutUsRef.current!.scrollIntoView({ behavior: 'smooth' });
        } else if (scrollY >= aboutUsOffset && scrollY < careersOffset) {
          careersRef.current!.scrollIntoView({ behavior: 'smooth' });
        } else if (scrollY >= careersOffset && scrollY < whoWeAreRefOffset) {
          whoWeAreRef.current!.scrollIntoView({ behavior: 'smooth' });
        }
      }

      e.preventDefault(); // Prevent default scrolling behavior
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <>
      <Layout>
        <Section
          refProp={introRef}
          id='about-us'
          className='min-h-screen aboutUsBackgroundImage'
        >
          <div className='container mx-auto'>
            <Intro />
          </div>
        </Section>

        <Section refProp={whoWeAreRef} id='portfolio' className='min-h-screen'>
          <div className='container mx-auto '>
            <WhoWeAre />
          </div>
        </Section>

        <Section
          id='services'
          refProp={servicesSectionRef}
          className='min-h-screen'
        >
          <div className='container mx-auto'>
            <Services
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
            />
          </div>
        </Section>

        <Section
          refProp={careersRef}
          id='career'
          className='min-h-screen bg-[#010103] '
        >
          <div className='container mx-auto z-10 '>
            <Career />
          </div>
        </Section>

        <Section refProp={aboutUsRef} id='contact-us' className='min-h-screen '>
          <div className='container mx-auto'>
            <AboutUs />
          </div>
        </Section>
        <Section refProp={experienceRef} className='min-h-screen '>
          <div className='container mx-auto'>
            <Experience />
          </div>
        </Section>
        <Section refProp={portfolioRef} className='min-h-screen '>
          <div className='container mx-auto'>
            <Portfolio />
          </div>
        </Section>
        <Section refProp={clientReviewRef} className='min-h-screen '>
          <div className='container mx-auto'>
            <ClientReview />
          </div>
        </Section>

        {showNextPageButton && (
          <motion.button
            initial={{ opacity: isMobile ? 1 : 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className='fixed bottom-10 right-5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 cursor-pointer'
            onClick={handleScrollOnClick}
          >
            Down
            <span>Next Page</span>
          </motion.button>
        )}

        {showToTopButton && (
          <motion.button
            initial={{ opacity: isMobile ? 1 : 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className='fixed bottom-10 right-5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 cursor-pointer'
            onClick={handleScrollOnClick}
          >
            UP
            <span>To the Top</span>
          </motion.button>
        )}
      </Layout>
    </>
  );
}
export async function getServerSideProps() {
  // Return an empty object to make the page SSR
  return {
    props: {},
  };
}
