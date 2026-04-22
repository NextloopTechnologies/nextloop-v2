import Head from 'next/head';
import { StaticImageData } from 'next/image';

import BlogSection from '../../components/BlogSection';
import FAQ from '../../components/Domains/FAQ';
import FlexibleHiringSection from '../../components/FlexibleHiringSection';
import IconTextBoxZebra from '../../components/IconTextBoxZebra';
import IconTitleDescription from '../../components/IconTitleDescription';
import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { ProductCard } from '../../components/ProductCard';
import ScrollingProcess from '../../components/ScrollingProcess';
import Slider from '../../components/Slider';
import StaffingIndustriesSection from '../../components/StaffingIndustriesSection';
import TechStack, { TechCategory } from '../../components/TechStackSection';
import TrustedPartnersSection from '../../components/Trustedpartnerssection';
import WhyBusinessChoosesUsSection from '../../components/WhyBusinessChoosesUsSection';

type ImageLike = StaticImageData | string | React.ReactNode | React.ElementType;

interface ExpertiseItem {
  id: number;
  title: string;
  description: string;
  image: ImageLike;
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

interface StepItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export interface ProcessData {
  headingData: {
    heading: string;
    coloredHeading: string;
    description?: string;
  };
  items: StepItem[];
}
interface StaffingItems {
  id: number;
  image?: ImageLike;
  title: string;
  description?: string;
}

interface WhyChooseUsData {
  id: number;
  title: string;
  descp: string;
  icon: ImageLike;
}

interface BlogData {
  id: number;
  title: string;
  descp: string;
  image: { url: string; fileId: string }[];
}

interface FAQData {
  id: number;
  question: string;
  answer: string;
}

interface AreaOfExpertiseItem {
  image: ImageLike;
  title: string;
  description: string;
  link: string;
}

interface AreaOfExpertiseData {
  mainHeader: string;
  mainDescription: string;
  items: AreaOfExpertiseItem[];
}

interface StaffingData {
  headingData: {
    heading: string;
    coloredHeading: string;
    description: string;
  };
  heroImage?: ImageLike;
  items: StaffingItems[];
}
interface LogoItem {
  title: string;
  image?: ImageLike;
}
interface TrustedPartnersData {
  headingData: {
    heading: string;
    coloredHeading: string;
    description: string;
  };
  items: LogoItem[];
}

export interface ServicePageProps {
  metaData?: {
    pageMetaTitle: string;
    pageMetaDescription: string;
  };
  heroImage?: StaticImageData;
  heroSectionData?: {
    coloredTitle: string;
    title: string;
    subtitle: string;
  };
  expertiseData?: ExpertiseData;
  processData?: ProcessData;
  techStackData?: {
    headingData?: {
      heading: string;
      coloredHeading: string;
      description?: string;
    };
    items: TechCategory[];
  };
  whyChooseUsData?: {
    headingData?: {
      heading: string;
      coloredHeading: string;
      description?: string;
    };
    items: WhyChooseUsData[];
  };
  blogData?: BlogData[];
  faqsContent?: FAQData[];
  areaOfExpertiseData?: AreaOfExpertiseData;
  staffingPartnerData?: TrustedPartnersData;
  staffingIndustriesData?: StaffingData;
  whyBusinessChoosesUsData?: StaffingData;
  // ourProcessData?: StaffingData;
  flexibleHiringData?: StaffingData;
}

const ServicePage: React.FC<ServicePageProps> = ({
  metaData,
  heroImage,
  heroSectionData,
  expertiseData,
  processData,
  techStackData,
  whyChooseUsData,
  blogData = [],
  faqsContent = [],
  areaOfExpertiseData,
  staffingPartnerData,
  staffingIndustriesData,
  whyBusinessChoosesUsData,
  // ourProcessData,
  flexibleHiringData,
}) => {
  return (
    <Layout>
      <Head>
        <title>{metaData?.pageMetaTitle || 'Service Page'}</title>
        <meta
          name='description'
          content={metaData?.pageMetaDescription || 'Service Page Description'}
        />
      </Head>

      {heroImage && heroSectionData && (
        <PageHero
          image={heroImage}
          coloredTitle={heroSectionData.coloredTitle}
          title={heroSectionData.title}
          subtitle={heroSectionData.subtitle}
          opacity='opacity-80'
        />
      )}

      {expertiseData && <IconTextBoxZebra data={expertiseData} />}

      {processData && processData.items.length > 0 && (
        <ScrollingProcess processData={processData} />
      )}

      {staffingPartnerData && staffingPartnerData?.items?.length > 0 && (
        <TrustedPartnersSection data={staffingPartnerData} />
      )}

      {staffingIndustriesData && staffingIndustriesData?.items?.length > 0 && (
        <StaffingIndustriesSection industriesData={staffingIndustriesData} />
      )}

      {/* {ourProcessData && ourProcessData?.items?.length > 0 && (
        <OurProcessSection ourProcess={ourProcessData} />
      )} */}

      {whyBusinessChoosesUsData &&
        whyBusinessChoosesUsData?.items?.length > 0 && (
          <WhyBusinessChoosesUsSection
            whyChooseUsData={whyBusinessChoosesUsData}
          />
        )}

      {flexibleHiringData && flexibleHiringData?.items?.length > 0 && (
        <FlexibleHiringSection hiringData={flexibleHiringData} />
      )}

      {techStackData && techStackData.items.length > 0 && (
        <TechStack techStackData={techStackData} />
      )}

      {whyChooseUsData && whyChooseUsData.items.length > 0 && (
        <IconTitleDescription
          headingData={whyChooseUsData.headingData}
          data={whyChooseUsData.items}
        />
      )}

      {blogData.length > 0 && <BlogSection blogData={blogData} />}

      {areaOfExpertiseData && areaOfExpertiseData?.items?.length > 0 && (
        <Slider
          visibleItems={3}
          showArrows={true}
          swiperParams={{ spaceBetween: 40 }}
          header={
            <div className='p-14 flex flex-col items-center text-center'>
              <div className='text-black font-bold text-2xl md:text-3xl'>
                {areaOfExpertiseData.mainHeader}
              </div>
              <div className='font-semibold text-lg text-gray-600 mt-2'>
                {areaOfExpertiseData.mainDescription}
              </div>
            </div>
          }
          slides={areaOfExpertiseData.items.map((item, index) => (
            <ProductCard {...item} key={index} />
          ))}
        />
      )}

      {faqsContent.length > 0 && <FAQ faqsContent={faqsContent} />}
    </Layout>
  );
};

export default ServicePage;
