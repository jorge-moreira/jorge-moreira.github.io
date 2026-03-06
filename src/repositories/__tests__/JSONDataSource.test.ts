import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { JSONDataSource } from '../JSONDataSource';
import type { Profile } from '@/models/Profile';
import type { Experience } from '@/models/Experience';
import type { Skill } from '@/models/Skill';
import type { Education } from '@/models/Education';
import type { Project } from '@/models/Project';

describe('JSONDataSource', () => {
  let dataSource: JSONDataSource;
  let fetchMock: any;

  beforeEach(() => {
    dataSource = new JSONDataSource();
    fetchMock = vi.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getProfile', () => {
    it('should fetch profile data from correct endpoint', async () => {
      const mockProfile: Profile = {
        name: 'Test User',
        title: 'Developer',
        bio: ['Bio text'],
        photo: '/photo.jpg',
        location: 'Test City',
        currentRole: 'Developer',
        focusAreas: ['React'],
        social: [],
      };

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockProfile,
      });

      const result = await dataSource.getProfile();

      expect(fetchMock).toHaveBeenCalledWith('/data/profile.json');
      expect(result).toEqual(mockProfile);
    });

    it('should return parsed JSON profile data', async () => {
      const mockProfile: Profile = {
        name: 'Jane Doe',
        title: 'Senior Engineer',
        bio: ['Experienced developer', 'Passionate about tech'],
        photo: '/jane.jpg',
        location: 'San Francisco',
        currentRole: 'Tech Lead',
        focusAreas: ['TypeScript', 'React', 'Node.js'],
        social: [
          { platform: 'GitHub', url: 'https://github.com/jane', icon: 'github' },
        ],
      };

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockProfile,
      });

      const result = await dataSource.getProfile();

      expect(result.name).toBe('Jane Doe');
      expect(result.focusAreas).toHaveLength(3);
    });

    it('should handle fetch errors', async () => {
      fetchMock.mockRejectedValue(new Error('Network error'));

      await expect(dataSource.getProfile()).rejects.toThrow('Network error');
    });
  });

  describe('getExperiences', () => {
    it('should fetch experiences data from correct endpoint', async () => {
      const mockExperiences: Experience[] = [
        {
          id: '1',
          company: 'Tech Corp',
          role: 'Developer',
          startDate: '2020',
          endDate: null,
          description: ['Built features'],
          tags: ['React'],
        },
      ];

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockExperiences,
      });

      const result = await dataSource.getExperiences();

      expect(fetchMock).toHaveBeenCalledWith('/data/experiences.json');
      expect(result).toEqual(mockExperiences);
    });

    it('should return array of experiences', async () => {
      const mockExperiences: Experience[] = [
        {
          id: '1',
          company: 'Company A',
          role: 'Senior Developer',
          startDate: '2020',
          endDate: null,
          description: ['Led team', 'Built features'],
          tags: ['React', 'TypeScript'],
        },
        {
          id: '2',
          company: 'Company B',
          role: 'Developer',
          startDate: '2018',
          endDate: '2020',
          description: ['Maintained codebase'],
          tags: ['JavaScript'],
        },
      ];

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockExperiences,
      });

      const result = await dataSource.getExperiences();

      expect(result).toHaveLength(2);
      expect(result[0].company).toBe('Company A');
    });

    it('should handle empty experiences array', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => [],
      });

      const result = await dataSource.getExperiences();

      expect(result).toEqual([]);
    });

    it('should handle fetch errors', async () => {
      fetchMock.mockRejectedValue(new Error('Failed to fetch'));

      await expect(dataSource.getExperiences()).rejects.toThrow('Failed to fetch');
    });
  });

  describe('getSkills', () => {
    it('should fetch skills data from correct endpoint', async () => {
      const mockSkills: Skill[] = [
        { id: '1', name: 'React', category: 'Frontend' },
      ];

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockSkills,
      });

      const result = await dataSource.getSkills();

      expect(fetchMock).toHaveBeenCalledWith('/data/skills.json');
      expect(result).toEqual(mockSkills);
    });

    it('should return array of skills with categories', async () => {
      const mockSkills: Skill[] = [
        { id: '1', name: 'React', category: 'Frontend' },
        { id: '2', name: 'TypeScript', category: 'Frontend' },
        { id: '3', name: 'Node.js', category: 'Backend' },
        { id: '4', name: 'PostgreSQL', category: 'Backend' },
      ];

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockSkills,
      });

      const result = await dataSource.getSkills();

      expect(result).toHaveLength(4);
      expect(result[0].category).toBe('Frontend');
      expect(result[2].category).toBe('Backend');
    });

    it('should handle empty skills array', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => [],
      });

      const result = await dataSource.getSkills();

      expect(result).toEqual([]);
    });

    it('should handle fetch errors', async () => {
      fetchMock.mockRejectedValue(new Error('Network failure'));

      await expect(dataSource.getSkills()).rejects.toThrow('Network failure');
    });
  });

  describe('getEducation', () => {
    it('should fetch education data from correct endpoint', async () => {
      const mockEducation: Education[] = [
        {
          id: '1',
          institution: 'Test University',
          degree: 'B.S. Computer Science',
          startYear: '2016',
          endYear: '2020',
          description: null,
        },
      ];

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockEducation,
      });

      const result = await dataSource.getEducation();

      expect(fetchMock).toHaveBeenCalledWith('/data/education.json');
      expect(result).toEqual(mockEducation);
    });

    it('should return array of education entries', async () => {
      const mockEducation: Education[] = [
        {
          id: '1',
          institution: 'University A',
          degree: 'B.S. Computer Science',
          startYear: '2014',
          endYear: '2018',
          description: 'Graduated with honors',
        },
        {
          id: '2',
          institution: 'Bootcamp B',
          degree: 'Web Development',
          startYear: '2017',
          endYear: '2017',
          description: null,
        },
      ];

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockEducation,
      });

      const result = await dataSource.getEducation();

      expect(result).toHaveLength(2);
      expect(result[0].institution).toBe('University A');
    });

    it('should handle empty education array', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => [],
      });

      const result = await dataSource.getEducation();

      expect(result).toEqual([]);
    });

    it('should handle fetch errors', async () => {
      fetchMock.mockRejectedValue(new Error('Connection failed'));

      await expect(dataSource.getEducation()).rejects.toThrow('Connection failed');
    });
  });

  describe('getProjects', () => {
    it('should fetch projects data from correct endpoint', async () => {
      const mockProjects: Project[] = [
        {
          id: '1',
          name: 'Test Project',
          description: 'A test project',
          technologies: ['React', 'TypeScript'],
          url: 'https://example.com',
          github: 'https://github.com/test/project',
        },
      ];

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockProjects,
      });

      const result = await dataSource.getProjects();

      expect(fetchMock).toHaveBeenCalledWith('/data/projects.json');
      expect(result).toEqual(mockProjects);
    });

    it('should return array of projects', async () => {
      const mockProjects: Project[] = [
        {
          id: '1',
          name: 'Project A',
          description: 'Description A',
          technologies: ['React'],
          url: 'https://projecta.com',
          github: 'https://github.com/user/projecta',
        },
        {
          id: '2',
          name: 'Project B',
          description: 'Description B',
          technologies: ['Node.js', 'Express'],
          url: 'https://projectb.com',
          github: 'https://github.com/user/projectb',
        },
      ];

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockProjects,
      });

      const result = await dataSource.getProjects();

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Project A');
      expect(result[1].technologies).toContain('Node.js');
    });

    it('should handle empty projects array', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => [],
      });

      const result = await dataSource.getProjects();

      expect(result).toEqual([]);
    });

    it('should handle fetch errors', async () => {
      fetchMock.mockRejectedValue(new Error('Request timeout'));

      await expect(dataSource.getProjects()).rejects.toThrow('Request timeout');
    });
  });

  describe('Integration', () => {
    it('should handle multiple concurrent requests', async () => {
      const mockProfile: Profile = {
        name: 'Test',
        title: 'Dev',
        bio: [],
        photo: '',
        location: '',
        currentRole: '',
        focusAreas: [],
        social: [],
      };

      const mockExperiences: Experience[] = [];
      const mockSkills: Skill[] = [];

      let callCount = 0;
      fetchMock.mockImplementation((url: string) => {
        callCount++;
        if (url === '/data/profile.json') {
          return Promise.resolve({
            ok: true,
            json: async () => mockProfile,
          });
        }
        if (url === '/data/experiences.json') {
          return Promise.resolve({
            ok: true,
            json: async () => mockExperiences,
          });
        }
        if (url === '/data/skills.json') {
          return Promise.resolve({
            ok: true,
            json: async () => mockSkills,
          });
        }
        return Promise.reject(new Error('Unknown URL'));
      });

      const [profile, experiences, skills] = await Promise.all([
        dataSource.getProfile(),
        dataSource.getExperiences(),
        dataSource.getSkills(),
      ]);

      expect(callCount).toBe(3);
      expect(profile).toEqual(mockProfile);
      expect(experiences).toEqual(mockExperiences);
      expect(skills).toEqual(mockSkills);
    });
  });
});
