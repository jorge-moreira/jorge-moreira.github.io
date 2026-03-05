import type { IDataSource } from './IDataSource';
import type { Profile } from '@/models/Profile';
import type { Experience } from '@/models/Experience';
import type { Skill } from '@/models/Skill';
import type { Education } from '@/models/Education';
import type { Project } from '@/models/Project';

export class JSONDataSource implements IDataSource {
  async getProfile(): Promise<Profile> {
    const response = await fetch('/data/profile.json');
    return response.json();
  }

  async getExperiences(): Promise<Experience[]> {
    const response = await fetch('/data/experiences.json');
    return response.json();
  }

  async getSkills(): Promise<Skill[]> {
    const response = await fetch('/data/skills.json');
    return response.json();
  }

  async getEducation(): Promise<Education[]> {
    const response = await fetch('/data/education.json');
    return response.json();
  }

  async getProjects(): Promise<Project[]> {
    const response = await fetch('/data/projects.json');
    return response.json();
  }
}
