import Head from 'next/head';
import { StaticImageData } from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import BlogSection from '../../components/BlogSection';
import DiamondGridBoxes from '../../components/DiamondGridBoxes';
import FAQ from '../../components/Domains/FAQ';
import IconTextBoxZebra from '../../components/IconTextBoxZebra';
import IconTitleDescription from '../../components/IconTitleDescription';
import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { ProductCard } from '../../components/ProductCard';
import Slider from '../../components/Slider';
import TechStack, { TechCategory } from '../../components/TechStackSection';

interface ExpertiseItem {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  dark: boolean;
}

export interface ExpertiseData {
  headingData: {
    heading: string;
    coloredHeading: string;
    description: string;
  };
  items: ExpertiseItem[];
}

interface StepData {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface WhyChooseUsData {
  id: number;
  title: string;
  descp: string;
  icon: StaticImageData;
}

interface BlogData {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
}

interface FAQData {
  id: number;
  question: string;
  answer: string;
}

interface AreaOfExpertiseItem {
  image: StaticImageData;
  title: string;
  description: string;
  link: string;
}

interface AreaOfExpertiseData {
  mainHeader: string;
  mainDescription: string;
  items: AreaOfExpertiseItem[];
}

export interface ServicePageProps {
  metaData: {
    pageMetaTitle: string;
    pageMetaDescription: string;
  };
  heroImage: StaticImageData;
  heroSectionData: {
    coloredTitle: string;
    title: string;
    subtitle: string;
  };
  expertiseData: ExpertiseData;
  topSteps: StepData[];
  bottomSteps: StepData[];
  techStackData: TechCategory[];
  whyChooseUsData: WhyChooseUsData[];
  blogData: BlogData[];
  faqsContent: FAQData[];
  areaOfExpertiseData: AreaOfExpertiseData;
}

const ServicePage: React.FC<ServicePageProps> = ({
  metaData,
  heroImage,
  heroSectionData,
  expertiseData,
  topSteps,
  bottomSteps,
  techStackData,
  whyChooseUsData,
  blogData,
  faqsContent,
  areaOfExpertiseData,
}) => {
  return (
    <Layout>
      <Head>
        <title>{metaData.pageMetaTitle}</title>
        <meta name='description' content={metaData.pageMetaDescription} />
      </Head>
      <PageHero
        image={heroImage}
        coloredTitle={heroSectionData.coloredTitle}
        title={heroSectionData.title}
        subtitle={heroSectionData.subtitle}
        opacity='opacity-80'
      />
      <IconTextBoxZebra data={expertiseData} />
      <DiamondGridBoxes
        topSteps={topSteps}
        bottomSteps={bottomSteps}
        coloredText='OUR&nbsp;'
        heading='PROCESS'
      />
      <TechStack techStackData={techStackData} />
      <IconTitleDescription data={whyChooseUsData} />
      <BlogSection blogData={blogData} />
      <Slider
        visibleItems={3}
        showArrows={true}
        swiperParams={{ spaceBetween: 40 }}
        header={
          <div className='p-14 flex flex-col items-center text-center'>
            <div className='text-black font-bold text-2xl md:text-3xl'>
              {areaOfExpertiseData?.mainHeader}
            </div>
            <div className='font-semibold text-lg text-gray-600 mt-2'>
              {areaOfExpertiseData?.mainDescription}
            </div>
          </div>
        }
        slides={areaOfExpertiseData?.items?.map((item, index) => (
          <ProductCard {...item} key={index} />
        ))}
      />
      <FAQ faqsContent={faqsContent} />
    </Layout>
  );
};

export default ServicePage;
