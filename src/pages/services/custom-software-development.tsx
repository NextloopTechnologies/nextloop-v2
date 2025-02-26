import Head from 'next/head';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import BlogSection from '../../components/BlogSection';
import FAQ from '../../components/Domains/FAQ';
import IconTextBoxZebra from '../../components/IconTextBoxZebra';
import IconTitleDescription from '../../components/IconTitleDescription';
import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { ProductCard } from '../../components/ProductCard';
import Slider from '../../components/Slider';
import TechStack from '../../components/TechStackSection';
import {
  blogData,
  expertiseData,
  faqsContent,
  servicesAreaOfExpertiseData,
  servicesWhyChooseUsData,
} from '../../utils/staticTextImgData';
import servicesWebdevelopmentHero from '../../../assets/services/servicesWebdevelopmentHero.png';

const CustomSoftwareDevelopment = () => {
  return (
    <Layout>
      <Head>
        <title>NextLoop Technologies | Our Services</title>
        <meta
          name='description'
          content='Elevate your business with NextLoop Technologies. Our diverse range of services is crafted to optimize performance and foster sustainable growth.'
        />
      </Head>
      <PageHero
        image={servicesWebdevelopmentHero}
        coloredTitle='CUSTOM SOFTWARE '
        title='DEVELOPMENT'
        subtitle='NextLoop Technologies, specialize in creating custom software solutions that are built to solve your unique business challenges. Our team of skilled developers and designers work collaboratively to develop software that enhances your efficiency, productivity, and overall business performance.'
        opacity='opacity-80'
      />
      <IconTextBoxZebra data={expertiseData} />
      <TechStack />
      <IconTitleDescription data={servicesWhyChooseUsData} />
      <BlogSection blogData={blogData} />
      <Slider
        visibleItems={3}
        showArrows={true}
        swiperParams={{ spaceBetween: 40 }}
        header={
          <div className='p-14 flex flex-col items-center text-center'>
            <div className='text-black font-bold text-2xl md:text-3xl'>
              {servicesAreaOfExpertiseData.mainHeader}
            </div>
            <div className='font-semibold text-lg text-gray-600 mt-2'>
              {servicesAreaOfExpertiseData.mainDescription}
            </div>
          </div>
        }
        slides={servicesAreaOfExpertiseData.items.map((item, index) => (
          <ProductCard {...item} key={index} />
        ))}
      />
      <FAQ faqsContent={faqsContent} />
    </Layout>
  );
};

export default CustomSoftwareDevelopment;
