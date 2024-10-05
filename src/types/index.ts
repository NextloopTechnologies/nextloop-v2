import { StaticImageData } from 'next/image';

export interface BlogType {
  id: number;
  title: string;
  image?: IFileUpload[] | null;
  descp: string;
  created_at: string;
  updated_at: string;
}

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

export interface IFAQ {
  id: number;
  question: string;
  answer: string;
}

export interface IWhyChooseUs {
  title: string;
  descp: string;
  image: StaticImageData;
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
}
export interface EnquiryType {
  id?: number | null;
  fullname: string;
  email: string;
  contact?: string;
  subject: string;
  message?: string;
}
