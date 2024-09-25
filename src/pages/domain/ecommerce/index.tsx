import { ecommerceAssets } from '../../../../assets';
import CustomPageHero from '../../../components/CustomPageHero/CustomPageHero';
import BoostTraffic from '../../../components/Domains/BoostTraffic';
import ClientReviews from '../../../components/Domains/ClientReviews';
import CustomRequestQuote from '../../../components/Domains/CustomRequestQuote';
import EnrollForWebsite from '../../../components/Domains/EnrollForWebsite';
import FAQ from '../../../components/Domains/FAQ';
import SellEverywhere from '../../../components/Domains/SellEverywhere';
import WhatWeDo from '../../../components/Domains/WhatWeDo';
import WhyBuild from '../../../components/Domains/WhyBuild';
import Layout from '../../../components/Layout/Layout';
import palette from '../../../styles/pallette';
import { IFAQ } from '../../../types';
import { getStaticImageData } from '../../../utils/helper';

const sampleData = [
  {
    id: 1,
    title: 'Process orders at scale',
    description:
      'Accept payments and manage all fulfillment logistics - for all your sales channels - from start to finish.',
  },
  {
    id: 2,
    title: 'Ship easier with native solutions',
    description:
      'Buy and print discounted shipping labels from a variety of carriers directly from your  dashboard.',
  },
  {
    id: 3,
    title: 'Automate your business',
    description:
      'Sync inventory for all channels, monitor stock levels, track top products and easily set up triggered actions like abandoned cart emails.',
  },
  {
    id: 4,
    title: 'Access the right data to drive sales',
    description:
      'Understand your data at a glance with customized reports, real-time analytics and AI-powered benchmarks.',
  },
];

const faqsContent: IFAQ[] = [
  {
    id: 1,
    question: 'what is ecommerce website?',
    answer:
      'An eCommerce website is a website from which you can buy or sell physical or digital products online. This can include a digital storefront, product galleries, product pages, an online shopping cart, online checkout, and all of the backend features you need to manage payment processing, shipping, customer support and eCommerce marketing.',
  },
  {
    id: 2,
    question: 'what do i need in order to build an ecommerce website?',
    answer:
      'An eCommerce website is a website from which you can buy or sell physical or digital products online. This can include a digital storefront, product galleries, product pages, an online shopping cart, online checkout, and all of the backend features you need to manage payment processing, shipping, customer support and eCommerce marketing.',
  },
  {
    id: 3,
    question: 'where can i host my ecommerce website?',
    answer:
      'An eCommerce website is a website from which you can buy or sell physical or digital products online. This can include a digital storefront, product galleries, product pages, an online shopping cart, online checkout, and all of the backend features you need to manage payment processing, shipping, customer support and eCommerce marketing.',
  },
];

const WhatWeDoData = [
  {
    image: getStaticImageData(ecommerceAssets.WhatWeDo1),
    title: 'Mobile Responsive',
    description:
      'A responsive website get used to the device of each unique visitor, whether desktop, smartphone or  tablet. A responsive website dynamically re-sizes its content and imagery for a variety of different screen size to ensure the website is effective and easy to use on any device. Whether your company is large and established, or just starting. Nextloop can build a website that gets noticed. With our enhanced web design & development for Travel and Hotel, your online visitor enjoys the same experience. ',
  },
  {
    image: getStaticImageData(ecommerceAssets.WhatWeDo2),
    title: 'Mobile Responsive',
    description:
      'A responsive website get used to the device of each unique visitor, whether desktop, smartphone or  tablet. A responsive website dynamically re-sizes its content and imagery for a variety of different screen size to ensure the website is effective and easy to use on any device. Whether your company is large and established, or just starting. Nextloop can build a website that gets noticed. With our enhanced web design & development for Travel and Hotel, your online visitor enjoys the same experience. ',
  },
  {
    image: getStaticImageData(ecommerceAssets.WhatWeDo3),
    title: 'Mobile Responsive',
    description:
      'A responsive website get used to the device of each unique visitor, whether desktop, smartphone or  tablet. A responsive website dynamically re-sizes its content and imagery for a variety of different screen size to ensure the website is effective and easy to use on any device. Whether your company is large and established, or just starting. Nextloop can build a website that gets noticed. With our enhanced web design & development for Travel and Hotel, your online visitor enjoys the same experience. ',
  },
  {
    image: getStaticImageData(ecommerceAssets.WhatWeDo4),
    title: 'Mobile Responsive',
    description:
      'A responsive website get used to the device of each unique visitor, whether desktop, smartphone or  tablet. A responsive website dynamically re-sizes its content and imagery for a variety of different screen size to ensure the website is effective and easy to use on any device. Whether your company is large and established, or just starting. Nextloop can build a website that gets noticed. With our enhanced web design & development for Travel and Hotel, your online visitor enjoys the same experience. ',
  },
];

const Ecommerce = () => {
  return (
    <Layout>
      <CustomPageHero
        image={getStaticImageData(ecommerceAssets.ECommerceBg)}
        titleChildren={
          <h1
            className={`text-white ${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} uppercase font-bold text-center w-full md:max-w-[1500px]`}
          >
            Build an <span className='text-orange-500'>ecommerce website.</span>
            <br />
            Start selling immediately.
            <br />
            Grow without limits.
          </h1>
        }
        customSubtitleClassname={`xl:w-[51%] ${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop}`}
        subtitle='Get everything you need to build, run and scale your business—on one unified platform.'
        opacity='opacity-70'
        title=''
      />

      <WhyBuild
        image={getStaticImageData(ecommerceAssets.WhyBuildEcomIndustry)}
        colouredTitle='Ecommerce Industry'
        infoAndImgClassname='items-center'
        informationSection={
          <div
            className={`mx-5 md:mx-10 lg:mx-0 md:max-w-[600px] ${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
          >
            In this highly competitive eCommerce environment, the struggle to
            acquire customers and keep their interest has made customization
            indispensable. Users are becoming more demanding and impatient. We
            know that setting up your eCommerce business is not an easy job.
            Based on your business goals and needs, we would like to help you
            make the right decision from the start. When we talk about eCommerce
            platforms, there are plenty of choices of already-built software you
            can choose from, but do you want to get lost in the market and be
            like everyone else? Follow along to understand why a custom
            eCommerce solution can be the key ingredient to spike your
            conversions, strengthen user engagement and offer a flawless user
            experience.
          </div>
        }
      />
      <WhatWeDo content={WhatWeDoData} />
      <EnrollForWebsite
        image={getStaticImageData(ecommerceAssets.RobustOnline)}
        imageClassname='w-[450px] h-[450px]'
        data={sampleData}
        titleElement={
          <h1
            className={` ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} uppercase font-bold text-center max-w-[950px] mx-auto`}
          >
            One <span className='text-orange-500'>dashboard</span> for total
            business control
          </h1>
        }
      />
      <SellEverywhere />
      <BoostTraffic />
      <ClientReviews
        title='Real success stories from'
        colouredTitle='Real customer'
      />
      <FAQ faqsContent={faqsContent} />
      <CustomRequestQuote title='Your complete event management platform' />
    </Layout>
  );
};

export default Ecommerce;
