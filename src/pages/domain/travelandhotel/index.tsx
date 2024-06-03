import React from 'react';
import Layout from '../../../components/Layout/Layout';
import CustomPageHero from '../../../components/CustomPageHero/CustomPageHero';
import hotelAndTravelBg from '../../../../assets/travelandhotel/mainBg.png';
import whyBuildImg from '../../../../assets/travelandhotel/whyBuild.png';
import WhyBuild from '../../../components/Domains/WhyBuild';
import ClientReviews from '../../../components/Domains/ClientReviews';
import FAQ from '../../../components/Domains/FAQ';
import CustomRequestQuote from '../../../components/Domains/CustomRequestQuote';
import { IFAQ } from '../../../types';
import NextGen from '../../../components/Domains/TravelAndHotel/NextGen';
import GlobalInventory from '../../../components/Domains/TravelAndHotel/GlobalInventory';

const faqsContent: IFAQ[] = [
  {
    id: 1,
    question: 'why do you need travel & hotel website design?',
    answer:
      'Fintech businesses frequently shell out over £7,000 for a straightforward lead-generating website. But Web Choice also offers a longer-term solution that generates money from excellent inbound leads, typically costing around £10,000.',
  },
  {
    id: 2,
    question: 'why do I need a  website for my hotel?',
    answer:
      'Fintech businesses frequently shell out over £7,000 for a straightforward lead-generating website. But Web Choice also offers a longer-term solution that generates money from excellent inbound leads, typically costing around £10,000.',
  },
  {
    id: 3,
    question: 'What are the benefits of hotel website design?',
    answer:
      'Fintech businesses frequently shell out over £7,000 for a straightforward lead-generating website. But Web Choice also offers a longer-term solution that generates money from excellent inbound leads, typically costing around £10,000.',
  },
];

const HotelAndTravel = () => {
  return (
    <Layout>
      <CustomPageHero
        image={hotelAndTravelBg}
        titleChildren={
          <h1 className='text-white text-8xl uppercase font-bold text-center max-w-[1306px]'>
            uncover new business opportunities with appealing{' '}
            <span className='text-orange-500'>travel & hotel website</span>
            <br /> design & development
          </h1>
        }
        subtitle=''
        opacity='opacity-10'
        title=''
      />

      <WhyBuild
        image={whyBuildImg}
        colouredTitle='travel & hotel industry'
        informationSection={
          <div className='max-w-[737px] flex flex-col justify-center pr-14'>
            <p className=' text-sm md:text-lg mx-5 md:mx-0'>
              There was once a time when hotels attracted and retained their
              customers by word of mouth and by distributing physical marketing
              material to potential guests. While that might have been the most
              effective way to let people know about your brand, it’s no longer
              true.
            </p>
            <p className=' text-sm md:text-lg mx-5 md:mx-0'>
              Digitalisation has grown at a rapid speed across all industries,
              especially travel. In fact,  a survey found that in pre-pandemic
              2017, already 88% of people preferred to make their hotel bookings
              online.
            </p>
            <p className=' text-sm md:text-lg mx-5 md:mx-0'>
              The best outcome of this acceleration into the future is that many
              things that used to take a lot of time and investment are now more
              accessible, affordable, and offer ease of use, like building your
              first hotel website.
            </p>
            <p className=' text-sm md:text-lg mx-5 md:mx-0'>
              Gone are the days when you would have to spend a heavy amount of
              money to hire a developer and designer. It’s now as easy as a
              drag-and-drop tool. And if nothing else, a hotel website will tell
              the world that you really exist.
            </p>
          </div>
        }
      />

      <NextGen />

      <GlobalInventory />

      <ClientReviews />

      <FAQ faqsContent={faqsContent} />

      <CustomRequestQuote title='see what your travel & hotel website could look like' />
    </Layout>
  );
};

export default HotelAndTravel;
