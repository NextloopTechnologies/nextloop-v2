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

const sectionStyle: React.CSSProperties = {
  height: '100vh',
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

  const handleScrollOnClick = () => {
    if (showNextPageButton) {
      window?.scrollBy(0, 500);
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

  // Ref for the Services section
  const servicesSectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Layout>
        <div id='about-us' className='min-h-screen aboutUsBackgroundImage'>
          <div className='container mx-auto'>
            <Intro />
          </div>
        </div>

        <Section id='portfolio' className='min-h-screen'>
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
            {/* <Coverover /> */}
          </div>
        </Section>

        <Section id='career' className='min-h-screen  bg-[#010103] '>
          <div className='container mx-auto z-10 '>
            <Career />
          </div>
        </Section>

        <Section id='contact-us' className='min-h-screen '>
          <div className='container mx-auto'>
            <AboutUs />
          </div>
        </Section>
        <Section className='min-h-screen '>
          <div className='container mx-auto'>
            <Experience />
          </div>
        </Section>
        <Section className='min-h-screen '>
          <div className='container mx-auto'>
            <Portfolio />
          </div>
        </Section>
        <Section className='min-h-screen '>
          <div className='container mx-auto'>
            <ClientReview />
          </div>
        </Section>

        {showNextPageButton && (
          <motion.button
            initial={{ opacity: 0, y: 40 }}
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
            initial={{ opacity: 0, y: 40 }}
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
