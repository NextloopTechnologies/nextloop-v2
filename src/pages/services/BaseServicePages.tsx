import Head from 'next/head';
import { StaticImageData } from 'next/image';
import { IconType } from 'react-icons';

// import { IconType } from 'react-icons';
import BlogSection from '../../components/BlogSection';
import FAQ from '../../components/Domains/FAQ';
import IconTextBoxZebra from '../../components/IconTextBoxZebra';
import IconTitleDescription from '../../components/IconTitleDescription';
import Layout from '../../components/Layout/Layout';
import NotJustAPartner from '../../components/NotJustPartner';
import PageHero from '../../components/PageHero';
import { ProductCard } from '../../components/ProductCard';
import ScrollingProcess from '../../components/ScrollingProcess';
import ServicesProcess from '../../components/ServicesProcess';
import Slider from '../../components/Slider';
import StaffingIndustriesSection from '../../components/StaffingIndustriesSection';
import StaffingSecurity from '../../components/StaffingSecurity';
import StaffingTable from '../../components/StaffingTable';
import TechStack, { TechCategory } from '../../components/TechStackSection';
import TechTalent from '../../components/TechTalent';
import TrustedPartnersSection from '../../components/Trustedpartnerssection';

type ImageLike = StaticImageData | string | React.ReactNode | React.ElementType;
export type TechKey = 'react' | 'aws' | 'angular' | 'python';

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
export interface SecurityItem {
  icon: IconType;
  title: string;
  description: string;
}

export interface SecurityData {
  heading: string;
  items: SecurityItem[];
}
export interface ComparisonRow {
  metric: string;
  traditional: string;
  freelancers: string;
  nextloop: string;
}

export interface ComparisonTableData {
  headingData: {
    heading: string;
    coloredHeading: string;
    description: string;
  };
  columns: {
    metric: string;
    traditional: string;
    freelancers: string;
    nextloop: string;
  };
  rows: ComparisonRow[];
}
export interface TeamMember {
  name: string;
  title: string;
  experience: string;
  role: string;
  techStack: TechKey[];
  domains: string[];
  avatarUrl?: string;
}
export interface TeamMembersSectionData {
  headingData: {
    heading: string;
    coloredHeading: string;
    description: string;
  };
  items: TeamMember[];
}
export interface TechTalentItem {
  label: string;
  icon: IconType;
  title: string;
  description: string;
  position: 'left' | 'right';
  color: 'dark' | 'orange' | 'blue';
}

export interface TechTalentData {
  headingData: {
    heading: string;
    coloredHeading: string;
    description: string;
  };
  items: TechTalentItem[];
}
export interface PartnerItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface NotJustAPartnerData {
  heading: string;
  coloredHeading: string;
  items: PartnerItem[];
}
export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceProcessData {
  heading: string;
  coloredHeading: string;
  description?: string;
  steps: ServiceProcessStep[];
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
  teamMembersData?: TeamMembersSectionData;
  comparisonTableData?: ComparisonTableData;
  SecurityData?: SecurityData;
  techTalentData?: TechTalentData;
  NotJustAPartnerData?: NotJustAPartnerData;
  serviceProcessData?: ServiceProcessData;
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
  // ourProcessData,
  // teamMembersData,
  comparisonTableData,
  SecurityData,
  techTalentData,
  NotJustAPartnerData,
  serviceProcessData,
}) => {
  return (
    <Layout>
      <Head>
        <title>{String(metaData?.pageMetaTitle ?? 'Service Page')}</title>
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

      {/* {teamMembersData && teamMembersData?.items?.length > 0 && <TeamMembers data={teamMembersData} />} */}

      {comparisonTableData && <StaffingTable data={comparisonTableData} />}
      {serviceProcessData && serviceProcessData.steps.length > 0 && (
        <ServicesProcess data={serviceProcessData} />
      )}

      {SecurityData && <StaffingSecurity data={SecurityData} />}
      {techTalentData && <TechTalent data={techTalentData} />}

      {techStackData && techStackData.items.length > 0 && (
        <TechStack techStackData={techStackData} />
      )}
      {NotJustAPartnerData && NotJustAPartnerData.items.length > 0 && (
        <NotJustAPartner data={NotJustAPartnerData} />
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
