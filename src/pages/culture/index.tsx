import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { CultureSectionProps } from '../../types';
import { culturebg, cultureEvents } from '../../utils/staticTextImgData';




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
        image={culturebg}
        coloredTitle='Life at'
        title="Nextloop"
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

      {/* Background */}
      <div className={`absolute inset-0 ${reverse ? 'bg-gray-50' : 'bg-white'}`} />

      {/* Decorative orange blob */}
      <div className={`absolute top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-3xl pointer-events-none ${reverse ? 'right-0' : 'left-0'}`} />

      <motion.div
        className="relative max-w-7xl mx-auto px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">

          {/* IMAGE */}
          <motion.div
            className={`relative lg:col-span-7 ${reverse ? 'lg:order-2 lg:pl-16' : 'lg:order-1 lg:pr-16'}`}
            initial={{ x: reverse ? 80 : -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {/* Offset border accent */}
            <div className={`absolute -z-10 w-full h-full rounded-[36px] border-2 border-orange-500/20
          ${reverse ? '-bottom-4 -right-4' : '-bottom-4 -left-4'}`}
            />

            <motion.div
              className="relative h-[360px] md:h-[480px] rounded-[32px] overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
              {/* Subtle inner vignette */}
              <div className="absolute inset-0 rounded-[32px] shadow-[inset_0_0_40px_rgba(0,0,0,0.08)]" />
            </motion.div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            className={`lg:col-span-5 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.15 }}
          >
            <div className="relative">

              {/* Section tag */}
              <div className="flex items-center gap-2 mb-5">
                <span className="w-6 h-px bg-orange-500" />
                <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.2em]">Life at Nextloop</span>
              </div>

              <h2 className="text-4xl font-bold text-black mb-5 leading-tight uppercase tracking-tight">
                {title}
              </h2>

              {/* Accent line */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-10 h-[2px] bg-orange-500 rounded-full" />
                <span className="w-2 h-2 rounded-full bg-orange-500/30" />
              </div>

              <p className="text-lg text-gray-500 leading-8 max-w-md">
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
