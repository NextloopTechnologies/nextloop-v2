import { domAnimation, LazyMotion, m } from 'framer-motion';
import { MoveDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
const ClientSays = dynamic(() => import('../components/ClientSays'), {
  ssr: false,
});
import Intro from '../components/Intro';
import Layout from '../components/Layout/Layout';
import OurCLient from '../components/OurClinet';
const Portfolio = dynamic(() => import('../components/Portfolio'));
const ProcessWeFollow = dynamic(() => import('../components/ProcessWeFollow'));
import PopupForm from '../components/PopupForm';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refProp?: any;
}>) {
  return (
    <section id={id} className={className} style={sectionStyle} ref={refProp}>
      <div>{children}</div>
    </section>
  );
}

const Home: React.FC = () => {
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
      { root: null, threshold: 0.1 },
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
        (div) => div?.id === visibleDiv,
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

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.nextlooptechnologies.com/#organization',
        name: 'Nextloop Technologies',
        legalName: 'Nextloop Technologies LLP',
        url: 'https://www.nextlooptechnologies.com/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.nextlooptechnologies.com/wp-content/uploads/2023/logo.png',
        },
        email: 'nextlooptechnologies@gmail.com',
        foundingDate: '2020',
        founders: [
          {
            '@type': 'Person',
            name: 'Piyush Shrivastava',
          },
          {
            '@type': 'Person',
            name: 'Rahul Alekhachandra Nayak',
          },
        ],
        sameAs: [
          'https://www.facebook.com/nextlooptechnologies',
          'https://www.linkedin.com/company/nextlooptechnologies',
          'https://www.instagram.com/nextlooptechnologies',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.nextlooptechnologies.com/#website',
        url: 'https://www.nextlooptechnologies.com/',
        name: 'Nextloop Technologies',
        publisher: {
          '@id': 'https://www.nextlooptechnologies.com/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target:
            'https://www.nextlooptechnologies.com/?s={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://www.nextlooptechnologies.com/#professionalservice',
        name: 'Nextloop Technologies',
        image:
          'https://www.nextlooptechnologies.com/wp-content/uploads/2023/office.jpg',
        url: 'https://www.nextlooptechnologies.com/',
        telephone: '+91-9893738323',
        address: {
          '@type': 'PostalAddress',
          streetAddress:
            '101, Kanchan Sagar, 18/1, Near Industry House, Old Palasia',
          addressLocality: 'Indore',
          addressRegion: 'MP',
          postalCode: '452001',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 22.7244,
          longitude: 75.8839,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '10:00',
          closes: '22:00',
        },
      },
      {
        '@type': 'ItemList',
        name: 'Our Services',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'Service',
              name: 'Custom Software Development',
              description:
                'Tailored software solutions to solve unique business challenges.',
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'Service',
              name: 'Mobile App Development',
              description:
                'High-performance Android and iOS applications built with Flutter and Native technologies.',
            },
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@type': 'Service',
              name: 'Web Development',
              description:
                'Modern, responsive, and SEO-friendly websites and web applications.',
            },
          },
          {
            '@type': 'ListItem',
            position: 4,
            item: {
              '@type': 'Service',
              name: 'Cloud & AI Solutions',
              description:
                'AWS/Azure cloud migration and Artificial Intelligence/Machine Learning implementation.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>
          Custom Software, IT & Digital Solutions | Nextloop Technologies
        </title>
        <meta
          name='title'
          content='IT Staff Augmentation | Custom Software Solutions | AI Remote Teams'
        />
        <meta
          name='description'
          content='Leading IT outsourcing company in Indore & USA. We provide custom software development, staff augmentation & dedicated developers for AI, SaaS & MVP development'
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      </Head>
      <Layout divRefs={divRefs?.current} id='connect-with-us'>
        <div
          id='intro'
          ref={setDivRef(0)}
          className='relative w-full sm:min-h-screen  min-h-[50vh] max-h-[90vh] '
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload='none'
            className='absolute w-full h-full object-cover'
          >
            <source
              src='https://res.cloudinary.com/deznt6msy/video/upload/v1775021803/Video_Project_m3ecam.mp4'
              type='video/mp4'
            />
          </video>

          <div className='relative z-10 w-full min-h-[50vh] sm:min-h-screen pb-28 flex items-center'>
            <div className='container mx-auto'>
              <Intro />
            </div>
          </div>
        </div>

        <div id='who-we-are' ref={setDivRef(1)}>
          <div className='my-10 px-4 sm:px-6 md:my-20'>
            <WhoWeAre />
          </div>
        </div>

        <div
          id='services'
          ref={setDivRef(2)}
          className='md:mb-20 items-center '
        >
          <div className='container mx-auto w-full'>
            <Services />
          </div>
        </div>

        <div
          id='portfolio'
          ref={setDivRef(3)}
          className='sm:min-h-max max-w-[100vw] overflow-hidden'
        >
          <Portfolio />
        </div>

        <div
          id='our-client'
          ref={setDivRef(4)}
          className='sm:min-h-[50vh] sm:min-w-screen'
        >
          <OurCLient />
        </div>

        <div
          id='process-we-follow'
          ref={setDivRef(5)}
          className='container mx-auto min-w-[100vw]'
        >
          <ProcessWeFollow />
        </div>

        <div
          id='our-client-says'
          ref={setDivRef(6)}
          className=' max-w-[100vw] overflow-hidden'
        >
          <ClientSays />
        </div>
        <LazyMotion features={domAnimation}>
          {showNextPageButton && (
            <m.button
              initial={{ opacity: isMobile ? 1 : 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              className='fixed bottom-10 right-5 bg-orange-500 hover:bg-orange-600 text-white h-10 w-10 justify-center rounded-full flex items-center z-10 cursor-pointer'
              onClick={scrollToNext}
            >
              <MoveDown className='h-5 w-7' />
            </m.button>
          )}
          {showToTopButton && (
            <m.button
              initial={{ opacity: isMobile ? 1 : 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              className='fixed bottom-10 right-5 bg-orange-500 hover:bg-orange-600 text-white h-10 w-10 justify-center rounded-full flex items-center z-10 cursor-pointer'
              onClick={handleScrollOnClick}
            >
              <MoveDown className='h-5 w-7 rotate-180' />
            </m.button>
          )}
        </LazyMotion>
        <PopupForm />
      </Layout>
    </>
  );
};

export default Home;
