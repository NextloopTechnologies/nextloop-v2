import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import Certificate from '../components/Certificate';
import ClientSays from '../components/ClientSays';
// import AboutUs from '../components/AboutUs';
// import Career from '../components/Career';
// import ClientReview from '../components/ClientReview';
// import Experience from '../components/Experience';
import Intro from '../components/Intro';
import Layout from '../components/Layout/Layout';
// import ClientSays from '../components/ClientSays';
import OurCLient from '../components/OurClinet';
import OurValues from '../components/OurValues';
import Portfolio from '../components/Portfolio';
import Services from '../components/ServicesGroup';
import WhoWeAre from '../components/WhoWeAre';
import { IPortfolio } from '../types';
import supabaseClient from '../utils/client';
import useWindowSize from '../utils/useWindowSize';
import { DownArrow } from '../../assets';

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
  // const [scrollBelowServices, setScrollBelowServices] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const introRef = useRef<HTMLDivElement | null>(null);
  // const whoWeAreRef = useRef<HTMLDivElement | null>(null);
  // const servicesSectionRef = useRef<HTMLDivElement | null>(null);
  // const careersRef = useRef<HTMLDivElement | null>(null);

  // const aboutUsRef = useRef<HTMLDivElement | null>(null);
  // const experienceRef = useRef<HTMLDivElement | null>(null);
  // const portfolioRef = useRef<HTMLDivElement | null>(null);
  // const clientReviewRef = useRef<HTMLDivElement | null>(null);

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
      // if (
      //   servicesSectionRef?.current &&
      //   window?.scrollY + windowHeight >=
      //     servicesSectionRef.current.offsetTop +
      //       servicesSectionRef.current.clientHeight
      // ) {
      //   if (!scrollBelowServices) {
      //     // You have just scrolled to the Services section
      //     setScrollBelowServices(true);
      //     setIsModalOpen(true);
      //     // Call your specific function here
      //   }
      // }
      // if (window?.scrollY + windowHeight === 2803) {
      //   setScrollBelowServices(false);
      //   // setIsModalOpen(false);
      // }
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleDiv(entry.target.id);
          }
        });
      },
      {
        root: null, // Use the viewport as the container
        threshold: 0.1, // Adjust threshold as needed
      }
    );

    divRefs.current.forEach((div) => {
      if (div) observer.observe(div);
    });

    return () => {
      divRefs.current.forEach((div) => {
        if (div) observer.unobserve(div);
      });
    };
  }, []);

  // useEffect(() => {
  //   const handleScroll = (e: WheelEvent) => {
  //     const scrollY = window.scrollY;
  //     const windowHeight = window.innerHeight;
  //     const introOffset = introRef.current!.offsetTop;
  //     const whoWeAreRefOffset = whoWeAreRef.current!.offsetTop;
  //     const servicesSectionRefOffset = servicesSectionRef.current!.offsetTop;
  //     const careersOffset = careersRef.current!.offsetTop;
  //     const aboutUsOffset = aboutUsRef.current!.offsetTop;
  //     const experienceOffset = experienceRef.current!.offsetTop;
  //     const portfolioOffset = portfolioRef.current!.offsetTop;
  //     const clientReviewOffset = clientReviewRef.current!.offsetTop;

  //     if (e.deltaY > 0) {
  //       if (scrollY < introOffset) {
  //         introRef.current!.scrollIntoView({ behavior: 'smooth' });
  //       } else if (
  //         scrollY >= introOffset &&
  //         scrollY < whoWeAreRefOffset - windowHeight
  //       ) {
  //         whoWeAreRef.current!.scrollIntoView({ behavior: 'smooth' });
  //       } else if (
  //         scrollY >= whoWeAreRefOffset &&
  //         scrollY < servicesSectionRefOffset - windowHeight
  //       ) {
  //         servicesSectionRef.current!.scrollIntoView({ behavior: 'smooth' });
  //       } else if (
  //         scrollY >= servicesSectionRefOffset &&
  //         scrollY < careersOffset - windowHeight
  //       ) {
  //         careersRef.current!.scrollIntoView({ behavior: 'smooth' });
  //       } else if (
  //         scrollY >= careersOffset &&
  //         scrollY < aboutUsOffset - windowHeight
  //       ) {
  //         aboutUsRef.current!.scrollIntoView({ behavior: 'smooth' });
  //       } else if (
  //         scrollY >= aboutUsOffset &&
  //         scrollY < experienceOffset - windowHeight
  //       ) {
  //         experienceRef.current!.scrollIntoView({ behavior: 'smooth' });
  //       } else if (
  //         scrollY >= experienceOffset &&
  //         scrollY < portfolioOffset - windowHeight
  //       ) {
  //         portfolioRef.current!.scrollIntoView({ behavior: 'smooth' });
  //       } else if (
  //         scrollY >= portfolioOffset &&
  //         scrollY < clientReviewOffset - windowHeight
  //       ) {
  //         clientReviewRef.current!.scrollIntoView({ behavior: 'smooth' });
  //       }
  //     } else {
  //       if (
  //         scrollY >= clientReviewOffset - windowHeight &&
  //         scrollY < portfolioOffset
  //       ) {
  //         portfolioRef.current!.scrollIntoView({ behavior: 'smooth' });
  //       } else if (scrollY >= portfolioOffset && scrollY < experienceOffset) {
  //         experienceRef.current!.scrollIntoView({ behavior: 'smooth' });
  //       } else if (scrollY >= experienceOffset && scrollY < aboutUsOffset) {
  //         aboutUsRef.current!.scrollIntoView({ behavior: 'smooth' });
  //       } else if (scrollY >= aboutUsOffset && scrollY < careersOffset) {
  //         careersRef.current!.scrollIntoView({ behavior: 'smooth' });
  //       } else if (scrollY >= careersOffset && scrollY < whoWeAreRefOffset) {
  //         whoWeAreRef.current!.scrollIntoView({ behavior: 'smooth' });
  //       }
  //     }

  //     e.preventDefault(); // Prevent default scrolling behavior
  //   };

  //   window.addEventListener('wheel', handleScroll);

  //   return () => {
  //     window.removeEventListener('wheel', handleScroll);
  //   };
  // }, []);
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

  return (
    <>
      <Head>
        <title>
          Custom Software, IT & Digital Solutions | Nextloop Technologies{' '}
        </title>
        <meta
          name='description'
          content='Nextloop Technologies delivers custom software, IT consulting, web & mobile app dev, cloud services, AI/ML & digital marketing personalised for your business'
        />
      </Head>
      <Layout divRefs={divRefs?.current} id='connect-with-us'>
        <div
          id='intro'
          ref={(el: any) => (divRefs.current[0] = el)}
          className='sm:min-h-screen min-h-[50vh] aboutUsBackgroundImage'
        >
          <div className='container min-w-[100vw]'>
            <Intro />
          </div>
        </div>

        <div
          id='who-we-are'
          ref={(el: any) => (divRefs.current[1] = el)}
          className=''
        >
          <div className='md:my-20 md:mb-40 md:mx-22'>
            <WhoWeAre />
          </div>
        </div>

        <div
          id='services'
          ref={(el: any) => (divRefs.current[2] = el)}
          className='md:mb-20 '
        >
          <div className='container mx-auto min-w-[100vw]'>
            <Services />
          </div>
        </div>

        <div
          id='portfolio'
          ref={(el: any) => (divRefs.current[3] = el)}
          className='sm:min-h-screen max-w-[100vw] overflow-hidden'
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
          ref={(el: any) => (divRefs.current[4] = el)}
          className='sm:min-h-[50vh] sm:min-w-screen'
        >
          <div className='container mx-auto min-w-[100vw]'>
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            <OurCLient />
          </div>
        </div>

        <div
          id='our-values'
          ref={(el: any) => (divRefs.current[5] = el)}
          className=' max-w-[100vw] overflow-hidden'
        >
          <div className='container mx-auto min-w-[100vw]'>
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            <OurValues />
          </div>
        </div>

        <div
          id='our-client-says'
          ref={(el: any) => (divRefs.current[6] = el)}
          className=' max-w-[100vw] overflow-hidden'
        >
          <div className='container mx-auto min-w-[100vw]'>
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            <ClientSays />
          </div>
        </div>

        <div
          id='certificates'
          ref={(el: any) => (divRefs.current[7] = el)}
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
            <Image src={DownArrow} alt='Down arrow' className='h-5 w-7' />
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
            <Image
              src={DownArrow}
              alt='Up arrow'
              className='h-5 w-7 rotate-180'
            />
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
