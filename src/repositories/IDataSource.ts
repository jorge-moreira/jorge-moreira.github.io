import type { Profile } from '@/models/Profile';
import type { Experience } from '@/models/Experience';
import type { Skill } from '@/models/Skill';
import type { Education } from '@/models/Education';
import type { Project } from '@/models/Project';

export interface IDataSource {
  getProfile(): Promise<Profile>;
  getExperiences(): Promise<Experience[]>;
  getSkills(): Promise<Skill[]>;
  getEducation(): Promise<Education[]>;
  getProjects(): Promise<Project[]>;
}
