import { motion } from 'framer-motion';
import Head from 'next/head';
import Image, { StaticImageData } from 'next/image';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import birthday from '../../../assets/birthday.jpeg';
import careerBg from '../../../assets/careerBg.png';
import christmas from '../../../assets/christmas.jpeg';
import diwali from '../../../assets/DoubleQuotes.png';
import ganesh from '../../../assets/ganesh.jpeg';
import holi from '../../../assets/holi.jpg';
import pizzaParty from '../../../assets/pizzaPart.jpeg';
import teamTrip from '../../../assets/teamDay.jpeg';
import turfDay from '../../../assets/turfDay.jpeg';
import womensDay from '../../../assets/womensDay.jpeg';





interface CultureEvent {
  title: string;
  description: string;
  image: StaticImageData;
}

interface CultureSectionProps extends CultureEvent {
  reverse?: boolean;
}

const cultureEvents: CultureEvent[] = [
  {
    title: 'Team Trip',
    image: teamTrip,
    description: `We kicked off the year with our annual team trip, a refreshing break filled with nature, conversations, and shared experiences. It was the perfect way to reset, reconnect, and begin the year with stronger bonds and renewed energy.`,
  },
  {
    title: 'Pizza Party',
    image: pizzaParty,
    description: `A simple pizza party turned into a moment of laughter and togetherness. Because sometimes, the best celebrations are the simplest ones.`,
  },
  {
    title: 'Women’s Day',
    image: womensDay,
    description: `Women’s Day at Nextloop was all about appreciation and empowerment. A reminder that respect and recognition should be everyday values.`,
  },
  {
    title: 'Holi Celebration',
    image: holi,
    description: `Holi brought vibrant colors, laughter, and festive energy into our workplace. Work felt lighter, brighter, and more joyful that day.`,
  },
  {
    title: 'Turf Day',
    image: turfDay,
    description: `Our turf day brought out energy, enthusiasm, and friendly competition. Because teamwork grows stronger when shared beyond the office.`,
  },
  {
    title: 'Birthday Celebrations',
    image: birthday,
    description: `Birthdays at Nextloop are celebrated with warmth and appreciation. Because people are at the heart of everything we do.`,
  },
  {
    title: 'Ganesh Chaturthi',
    image: ganesh,
    description: `Ganesh Chaturthi was celebrated with devotion and joy, from Sthapna to Visarjan. The festival filled our workspace with positivity and unity.`,
  },
  {
    title: 'Diwali Celebration',
    image: diwali,
    description: `Diwali at Nextloop was a celebration of gratitude and joy. Moments that truly reflected the spirit of togetherness.`,
  },
  {
    title: 'Christmas Celebration',
    image: christmas,
    description: `We wrapped up the year with festive cheer and laughter. A joyful close to a year filled with growth and meaningful connections.`,
  },
];

const CulturePage = () => {
  return (
    <Layout>
      <Head>
        <title>Life at Nextloop</title>
        <meta
          name="description"
          content="Explore life at Nextloop — team trips, celebrations, festivals, and everyday moments that reflect our people-first culture."
        />
      </Head>

      <PageHero
        image={careerBg}
        title="Life at Nextloop"
        subtitle="From celebrations to everyday wins, every moment at Nextloop reflects our people-first culture."
        opacity="opacity-80"
      />

      <div className="bg-white">
        {cultureEvents.map((event, index) => (
          <div
            key={event.title}
            className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
          >
            <CultureSection
              {...event}
              reverse={index % 2 !== 0}
            />
          </div>
        ))}
      </div>

    </Layout>
  );
};

const CultureSection = ({
  title,
  description,
  image,
  reverse = false,
}: CultureSectionProps) => {
  return (
    <section className="relative py-32 overflow-hidden">
      
      {/* Soft background shape */}
      <div
        className={`absolute inset-0 ${
          reverse ? 'bg-gray-50' : 'bg-white'
        }`}
      />

      <motion.div
        className="relative max-w-7xl mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">

          {/* IMAGE */}
          <motion.div
            className={`relative lg:col-span-7 ${
              reverse ? 'lg:order-2 lg:pl-20' : 'lg:order-1 lg:pr-20'
            }`}
            initial={{ x: reverse ? 80 : -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <motion.div
              className="relative h-[360px] md:h-[460px] rounded-[32px] overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            className={`lg:col-span-5 ${
              reverse ? 'lg:order-1' : 'lg:order-2'
            }`}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          >
            <div className="relative">

              <h2 className="text-4xl font-semibold text-gray-900 mb-5 leading-tight">
                {title}
              </h2>

              {/* Accent line */}
              <span className="block w-12 h-[2px] bg-gray-900 mb-6" />

              <p className="text-lg text-gray-600 leading-8 max-w-md">
                {description}
              </p>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};





export default CulturePage;
