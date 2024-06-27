import {
  HotelBg,
  WhatWeDo1,
  WhatWeDo2,
  WhatWeDo3,
  WhatWeDo4,
  WhyBuildHotelBooking} from '../../../../assets';
import CustomPageHero from '../../../components/CustomPageHero/CustomPageHero';
import ClientReviews from '../../../components/Domains/ClientReviews';
import CustomRequestQuote from '../../../components/Domains/CustomRequestQuote';
import EnrollForWebsite from '../../../components/Domains/EnrollForWebsite';
import FAQ from '../../../components/Domains/FAQ';
import ProfessionalWebsite from '../../../components/Domains/ProfessionalWebsite';
import SimpleWebsite from '../../../components/Domains/SimpleWebsite';
import WhatWeDo from '../../../components/Domains/WhatWeDo';
import WhyBuild from '../../../components/Domains/WhyBuild';
import Layout from '../../../components/Layout/Layout';
import { IFAQ } from '../../../types';

const faqsContent: IFAQ[] = [
  {
    id: 1,
    question: 'why do you need hotel website design?',
    answer:
      'Hotel website design is a huge influence on the booking behaviour of travellers and helps your hotel address their desires and expectations. It’s very important that potential guests are able to navigate your website easily and quickly understand the content that’s most relevant to them.',
  },
  {
    id: 2,
    question: 'why do I need a  website for my hotel?',
    answer:
      'Hotel website design is a huge influence on the booking behaviour of travellers and helps your hotel address their desires and expectations. It’s very important that potential guests are able to navigate your website easily and quickly understand the content that’s most relevant to them.',
  },
  {
    id: 3,
    question: 'What are the benefits of hotel website design?',
    answer:
      'Hotel website design is a huge influence on the booking behaviour of travellers and helps your hotel address their desires and expectations. It’s very important that potential guests are able to navigate your website easily and quickly understand the content that’s most relevant to them.',
  },
];

const WhatWeDoData = [
  {
    image: WhatWeDo1,
    title: 'Drive more reviews and positive word-of-mouth',
    description:
      'Nextloop is where your idea comes to life. If you can order pizza online, you Embed a Tripadvisor widget on your website so guests who have completed their stay can easily share their feedback.',
  },
  {
    image: WhatWeDo2,
    title: 'Drive more reviews and positive word-of-mouth',
    description:
      'Nextloop is where your idea comes to life. If you can order pizza online, you Embed a Tripadvisor widget on your website so guests who have completed their stay can easily share their feedback.',
  },
  {
    image: WhatWeDo3,
    title: 'Drive more reviews and positive word-of-mouth',
    description:
      'Nextloop is where your idea comes to life. If you can order pizza online, you Embed a Tripadvisor widget on your website so guests who have completed their stay can easily share their feedback.',
  },
  {
    image: WhatWeDo4,
    title: 'Drive more reviews and positive word-of-mouth',
    description:
      'Nextloop is where your idea comes to life. If you can order pizza online, you Embed a Tripadvisor widget on your website so guests who have completed their stay can easily share their feedback.',
  }
];

const Hotel = () => {
  return (
    <Layout>
      <CustomPageHero
        image={HotelBg}
        titleChildren={
          <h1 className='text-white text-3xl md:text-8xl uppercase font-bold text-center w-full md:max-w-[1306px]'>
            Attract more guests with beautiful{' '}
            <span className='text-orange-500'>hotel</span> website creation
          </h1>
        }
        subtitle='Integral to our hotel commerce platform, the website builder lets you create the professional website your hotel deserves. Simply choose from a range of easy-to-use templates to showcase your unique brand to travellers everywhere, all while saving money on web development fees.'
        opacity='opacity-0'
        title=''
      />

      <WhyBuild
        image={WhyBuildHotelBooking}
        colouredTitle='Hotel Booking?'
        infoAndImgClassname='items-center'
        informationSection={
          <div className='mx-10 lg:mx-0 md:max-w-[600px] text-lg font-normal'>
            There was once a time when hotels attracted and retained their
            customers by word of mouth and by distributing physical marketing
            material to potential guests. While that might have been the most
            effective way to let people know about your brand, it's no longer
            true. Digitalisation has grown at a rapid speed across all
            industries, especially travel. In fact, a survey found that in
            pre-pandemic 2017, already 88% of people preferred to make their
            hotel bookings online. The best outcome of this acceleration into
            the future is that many things that used to take a lot of time and
            investment are now more accessible, affordable, and offer ease of
            use, like building your first hotel website. Gone are the days when
            you would have to spend a heavy amount of money to hire a developer
            and designer. It's now as easy as a drag-and-drop tool. And if
            nothing else, a hotel website will tell the world that you really
            exist.
          </div>
        }
      />

      <WhatWeDo content={WhatWeDoData} />

      <SimpleWebsite />

      <EnrollForWebsite />

      <ProfessionalWebsite />

      <ClientReviews
        title='Real success stories from'
        colouredTitle='Real customer'
      />

      <FAQ faqsContent={faqsContent} />

      <CustomRequestQuote title='See what your hotel website could look like' />
    </Layout>
  );
};

export default Hotel;
