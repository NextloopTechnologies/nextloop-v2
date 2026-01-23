import { motion } from 'framer-motion';
import { MoveDown } from 'lucide-react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';

import Certificate from '../components/Certificate';
import ClientSays from '../components/ClientSays';
import Intro from '../components/Intro';
import Layout from '../components/Layout/Layout';
//import LogoSlide from '../components/LogoSlider';
import OurCLient from '../components/OurClinet';
import OurValues from '../components/OurValues';
import Portfolio from '../components/Portfolio';
import Services from '../components/ServicesGroup';
import WhoWeAre from '../components/WhoWeAre';
import { IPortfolio } from '../types';
import supabaseClient from '../utils/client';
import useWindowSize from '../utils/useWindowSize';
//import { LOGOS } from '../../assets';


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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refProp?: any;
}>) {
  return (
    <section id={id} className={className} style={sectionStyle} ref={refProp}>
      <div>{children}</div>
    </section>
  );
}

const Home: React.FC<{ data?: IPortfolio[]; error?: string }> = () => {
  const [showNextPageButton, setShowNextPageButton] = useState(true);
  const [showToTopButton, setShowToTopButton] = useState(false);

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
    };

    window?.addEventListener('scroll', handleScroll);

    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { isMobile } = useWindowSize();

  const [visibleDiv, setVisibleDiv] = useState<string | null>(null);
  const divRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentDivs = [...divRefs.current];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleDiv(entry.target.id);
          }
        });
      },
      { root: null, threshold: 0.1 }
    );

    currentDivs.forEach((div) => {
      if (div) observer.observe(div);
    });

    return () => {
      currentDivs.forEach((div) => {
        if (div) observer.unobserve(div);
      });
    };
  }, []);


  const scrollToNext = () => {
    if (visibleDiv) {
      const currentIndex = divRefs.current.findIndex(
        (div) => div?.id === visibleDiv
      );
      if (currentIndex >= 0 && currentIndex < divRefs.current.length - 1) {
        const nextDiv = divRefs.current[currentIndex + 1];
        if (nextDiv) {
          nextDiv.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const setDivRef = (index: number) => (el: HTMLDivElement | null) => {
    divRefs.current[index] = el;
  };

  return (
    <>
      <Head>
        <title>
          Custom Software, IT & Digital Solutions | Nextloop Technologies
        </title>
        <meta
          name='title'
          content='abcd'
        />
        <meta
          name='description'
          content='Nextloop Technologies delivers custom software, IT consulting, web & mobile app dev, cloud services, AI/ML & digital marketing personalised for your business'
        />
      </Head>
      <Layout divRefs={divRefs?.current} id='connect-with-us'>
        <div
          id="intro"
          ref={setDivRef(0)}
          className="relative sm:min-h-screen min-h-[50vh] aboutUsBackgroundImage"
        >
          <div className="container min-w-[100vw] min-h-full pb-28">
            <Intro />
          </div>

          {/* Bottom-aligned logo slider */}
          {/* <div className="absolute bottom-4 sm:bottom-4 md:bottom-20 lg:bottom-4 left-0 w-full">
            <LogoSlide logos={LOGOS} />
          </div> */}
        </div>


        <div id='who-we-are' ref={setDivRef(1)}>
          <div className="my-10 px-4 sm:px-6 md:my-20">
            <WhoWeAre />
          </div>

        </div>

        <div id='services' ref={setDivRef(2)} className='md:mb-20 '>
          <div className='container mx-auto min-w-[100vw]'>
            <Services />
          </div>
        </div>

        <div
          id='portfolio'
          ref={setDivRef(3)}
          className='sm:min-h-max max-w-[100vw] overflow-hidden'
        >
          <div className='container mx-auto min-w-[100vw]'>
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            <Portfolio
            // caseStudies={data!}
            />
          </div>
        </div>

        <div
          id='our-client'
          ref={setDivRef(4)}
          className='sm:min-h-[50vh] sm:min-w-screen'
        >
          <div className='container mx-auto min-w-[100vw]'>
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            <OurCLient />
          </div>
        </div>

        <div
          id='our-values'
          ref={setDivRef(5)}
          className=' max-w-[100vw] overflow-hidden'
        >
          <div className='container mx-auto min-w-[100vw]'>
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            <OurValues />
          </div>
        </div>

        <div
          id='our-client-says'
          ref={setDivRef(6)}
          className=' max-w-[100vw] overflow-hidden'
        >
          <div className='container mx-auto min-w-[100vw]'>
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            <ClientSays />
          </div>
        </div>

        <div
          id='certificates'
          ref={setDivRef(7)}
          className='certificatesBackgroundImage p-0'
        >
          <div className='container mx-auto min-w-[100vw]'>
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            <Certificate />
          </div>
        </div>

        {showNextPageButton && (
          <motion.button
            initial={{ opacity: isMobile ? 1 : 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className='fixed bottom-10 right-5 bg-orange-500 hover:bg-orange-600 text-white h-10 w-10 justify-center rounded-full flex items-center cursor-pointer'
            // onClick={handleScrollOnClick}
            onClick={scrollToNext}
          >
            <MoveDown className='h-5 w-7' />
          </motion.button>
        )}

        {showToTopButton && (
          <motion.button
            initial={{ opacity: isMobile ? 1 : 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className='fixed bottom-10 right-5 bg-orange-500 hover:bg-orange-600 text-white h-10 w-10 justify-center rounded-full flex items-center z-10 cursor-pointer'
            onClick={handleScrollOnClick}
          >
            <MoveDown className='h-5 w-7 rotate-180' />
          </motion.button>
        )}
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data, error } = await supabaseClient
    .from('portfolio')
    .select('id, title, image')
    .order('id', { ascending: false });

  if (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }

  return {
    props: {
      data: data || [],
    },
  };
};
