export interface Experience {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string[];
  tags?: string[];
  techStack?: string[];
}
