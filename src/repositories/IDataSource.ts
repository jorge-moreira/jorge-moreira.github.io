import type { Profile } from '@/models/Profile';
import type { Experience } from '@/models/Experience';
import type { Skill } from '@/models/Skill';
import type { Education } from '@/models/Education';
import type { Project } from '@/models/Project';
import type { Language } from '@/models/Language';

export interface IDataSource {
  getProfile(): Promise<Profile>;
  getExperiences(): Promise<Experience[]>;
  getSkills(): Promise<Skill[]>;
  getEducation(): Promise<Education[]>;
  getProjects(): Promise<Project[]>;
  getLanguages(): Promise<Language[]>;
}
