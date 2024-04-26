export interface BlogType {
  id: number;
  title: string;
  image: string | null;
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
