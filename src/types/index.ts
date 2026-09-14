import { StaticImageData } from 'next/image';
import { IconType } from 'react-icons';

import { TechCategory } from '../components/TechStackSection';
import { PageSchemaKey } from '../utils/seoSchemas';

// ---------------------------------------------------------------------------
// Shared primitive helpers
// ---------------------------------------------------------------------------

export type ImageLike =
  | StaticImageData
  | string
  | React.ReactNode
  | React.ElementType;

export type TechKey = 'react' | 'aws' | 'angular' | 'python';

// ---------------------------------------------------------------------------
// Author / Blog / Category
// ---------------------------------------------------------------------------

export interface AuthorType {
  name?: string | null;
  designation?: string | null;
  description?: string | null;
  profile?: string | null;
}

export interface CategoryType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface BlogType {
  id: number;
  title: string;
  image?: IFileUpload[] | null;
  descp: string;
  created_at: string;
  updated_at: string;
  slug?: string | null;
  service?: string | null;
  categories?: CategoryType;
  category_id?: number | null;
  author?: AuthorType;
  author_id?: number | null;
}

/** Lightweight blog card data returned by fetchLatestBlogs */
export interface BlogData {
  id: number;
  title: string;
  slug: string;
  descp: string;
  image: { url: string; fileId: string }[];
}

/** Table-of-contents entry used in the blog detail page */
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/** Props for the full blog-detail page component */
export interface BlogIDProps {
  data?: BlogType;
  error?: string;
}

// ---------------------------------------------------------------------------
// Career / Jobs
// ---------------------------------------------------------------------------

type JobMode = 'Remote' | 'On-site' | 'Hybrid';
type JobType = 'Full Time' | 'Part Time' | 'Contract';

export interface Job {
  id: number;
  title: string;
  responsibilities: string[];
  descp: string;
  created_at: string;
  updated_at: string;
  qualifications: string[];
  skills: string[];
  location: string;
  job_mode: JobMode;
  package: string;
  job_type: JobType;
}

export interface AppliedJob {
  job_id: number | null;
  fullname: string;
  email: string;
  phone: string;
  resume_url: string;
  resume_id: string;
  cover_letter: string;
  github_url: string;
  linkedin_url: string;
  experience?: string;
}

// ---------------------------------------------------------------------------
// File upload / Portfolio
// ---------------------------------------------------------------------------

export interface IFileUpload {
  fileId: string;
  url: string;
  status?: string;
}

export interface IPortfolio {
  id: number;
  title: string | null;
  descp?: string | null;
  image?: IFileUpload[] | null;
  active?: boolean;
}

// ---------------------------------------------------------------------------
// FAQ / Why-choose-us
// ---------------------------------------------------------------------------

export interface IFAQ {
  id: number;
  question: string;
  answer: string | string[];
}

export interface IWhyChooseUs {
  title: string;
  descp: string;
  image: StaticImageData;
}

// ---------------------------------------------------------------------------
// Contact / Enquiry
// ---------------------------------------------------------------------------

export interface EnquiryType {
  id?: number | null;
  fullname: string;
  email: string;
  contact?: string;
  subject: string;
  message?: string;
}

/** Dropdown option used in the contact form */
export interface OptionType {
  label: string;
  value: string;
}

/** Form field values for the contact-us form */
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

/** Validation error state for the contact-us form */
export interface ContactFormErrors {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  subject: string | null;
  message: string | null;
}

// ---------------------------------------------------------------------------
// Offers
// ---------------------------------------------------------------------------

export interface DBOffer {
  id: number;
  title: string;
  description: string;
  active: boolean;
  icon: { src: string };
  't&c_points': [];
}

export interface OfferApplicationType {
  id?: number;
  name: string;
  email: string;
  mobile: string;
  company_name?: string;
  offer_id?: number;
}

/** Form field values for the get-offer page */
export interface OfferFormData {
  name: string;
  email: string;
  phone: string;
  company_name?: string;
}

// ---------------------------------------------------------------------------
// Culture / About-Us
// ---------------------------------------------------------------------------

export interface CultureEvent {
  title: string;
  description: string;
  image: StaticImageData | string;
}

export interface CultureSectionProps extends CultureEvent {
  reverse?: boolean;
}

/** Company facts/highlights card used in the about-us page */
export interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

/** Certificate/award card used in the about-us page */
export interface CertificateCardProps {
  img: StaticImageData;
  title: string;
  sub: string;
}

// ---------------------------------------------------------------------------
// Service page — shared data-shape interfaces
// ---------------------------------------------------------------------------

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

export interface AreaOfExpertiseData {
  mainHeader: string;
  mainDescription: string;
  items: AreaOfExpertiseItem[];
}

export interface StaffingData {
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

export interface TrustedPartnersData {
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
  schemaKey?: PageSchemaKey;
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
  teamMembersData?: TeamMembersSectionData;
  comparisonTableData?: ComparisonTableData;
  SecurityData?: SecurityData;
  techTalentData?: TechTalentData;
  NotJustAPartnerData?: NotJustAPartnerData;
  serviceProcessData?: ServiceProcessData;
}
