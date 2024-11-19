import Head from 'next/head';

import {
  digitalProducts,
  dropshipping,
  ecommerceAssets,
  physicalProducts,
  printOnDemand,
  subscriptions,
} from '../../../../assets';
import CustomPageHero from '../../../components/CustomPageHero/CustomPageHero';
import BoostTraffic from '../../../components/Domains/BoostTraffic';
// import ClientReviews from '../../../components/Domains/ClientReviews';
import CustomRequestQuote from '../../../components/Domains/CustomRequestQuote';
import EnrollForWebsite from '../../../components/Domains/EnrollForWebsite';
import FAQ from '../../../components/Domains/FAQ';
import ProductServices from '../../../components/Domains/ProductServices';
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
    title: 'Customized Solutions for E-Commerce',
    description:
      'We create platforms that are specifically matched to your brand identity, ensuring smooth operation, customized user interfaces, and features that are maximized for engagement, client retention, and business expansion.',
  },
  {
    image: getStaticImageData(ecommerceAssets.WhatWeDo2),
    title: 'Integration of Advanced Technology',
    description:
      'We include cutting-edge technology, such as chatbots driven by AI for customized support, real-time inventory sync for productivity, and smooth third-party interfaces to improve functionality and optimize platform operations.',
  },
  {
    image: getStaticImageData(ecommerceAssets.WhatWeDo3),
    title: 'Scalability & Growth Support',
    description:
      'We provide scalable systems with cloud infrastructure to handle growing traffic, new features, and market demands, ensuring smooth performance and adaptability for long-term business expansion.',
  },
  {
    image: getStaticImageData(ecommerceAssets.WhatWeDo4),
    title: 'Secure & Reliable Systems',
    description:
      'To prevent attacks on your e-commerce platform and ensure regular business operations, we use robust system design along with advanced cybersecurity solutions like encryption, firewalls, and secure payment gateways.',
  },
];

const productServiceContent = [
  {
    icon: physicalProducts,
    title: 'physical products',
    descp:
      'Add an extensive catalog of products to your online store with up to 1,000 variants each. Import and export CSV files with products or seamlessly migrate your catalog with the Cart2Cart app.',
  },
  {
    icon: dropshipping,
    title: 'dropshipping',
    descp:
      'Add ready-to-sell products from our dropshipping platform, or third-party apps, and let suppliers take care of fulfillment.',
  },
  {
    icon: printOnDemand,
    title: 'print on demand',
    descp:
      'Add your designs to hundreds of high-quality products, from t-shirts to headphones and let suppliers ship your custom merchandise directly to customers.',
  },
  {
    icon: digitalProducts,
    title: 'digital products',
    descp:
      'Sell digital products such as music files, ebooks, online courses, images or gift cards.',
  },
  {
    icon: subscriptions,
    title: 'subscriptions',
    descp:
      'Easily create and manage recurring products and sell subscriptions to generate a steady revenue stream.',
  },
];

const Ecommerce = () => {
  return (
    <>
      <Head>
        <title>E-commerce IT Solutions for Your Growing Business</title>
        <meta
          name='description'
          content='Boost your online business with Nextloop Technologies’ e-commerce IT solutions. From custom e-commerce platforms to secure payment integration, we provide innovative, scalable solutions to drive your e-commerce success.'
        />
      </Head>
      <Layout>
        <CustomPageHero
          image={getStaticImageData(ecommerceAssets.ECommerceBg)}
          titleChildren={
            <h1
              className={`text-white ${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} uppercase font-bold text-center w-full md:max-w-[1500px]`}
            >
              Build an{' '}
              <span className='text-orange-500'>ecommerce website.</span>
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
              className={`mx-12 md:mx-10 lg:mx-0 md:max-w-[600px] ${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
            >
              In this highly competitive eCommerce environment, the struggle to
              acquire customers and keep their interest has made customization
              indispensable. Users are becoming more demanding and impatient. We
              know that setting up your eCommerce business is not an easy job.
              Based on your business goals and needs, we would like to help you
              make the right decision from the start. When we talk about
              eCommerce platforms, there are plenty of choices of already-built
              software you can choose from, but do you want to get lost in the
              market and be like everyone else? Follow along to understand why a
              custom eCommerce solution can be the key ingredient to spike your
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
              className={` ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} uppercase font-bold text-center md:max-w-[950px] max-w-[350px] mx-auto`}
            >
              One <span className='text-orange-500'>dashboard</span> for total
              business control
            </h1>
          }
        />
        <SellEverywhere />
        <BoostTraffic />

        <ProductServices
          title={
            <h1
              className={`text-black ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} uppercase font-bold text-center max-w-[1306px]`}
            >
              sell your <span className='text-orange-500'>own products</span> or
              find products to sell
            </h1>
          }
          data={productServiceContent}
        />

        {/* <ClientReviews
          title='Real success stories from'
          colouredTitle='Real customer'
        /> */}
        <FAQ faqsContent={faqsContent} />
        <CustomRequestQuote title='Your complete event management platform' />
      </Layout>
    </>
  );
};

export default Ecommerce;
