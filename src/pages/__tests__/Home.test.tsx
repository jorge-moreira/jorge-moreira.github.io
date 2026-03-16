import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import * as DataSourceFactory from '@/repositories/DataSourceFactory';
import type { Profile } from '@/models/Profile';

const mockProfile: Profile = {
  name: 'John Doe',
  title: 'Software Engineer',
  bio: ['First paragraph of bio', 'Second paragraph of bio'],
  photo: '/photo.jpg',
  location: 'San Francisco, CA',
  currentRole: 'Senior Developer at Tech Corp',
  focusAreas: ['Web Development', 'Cloud Architecture', 'DevOps'],
  social: [
    { platform: 'GitHub', url: 'https://github.com/johndoe', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe', icon: 'linkedin' },
    { platform: 'Email', url: 'mailto:john@example.com', icon: 'mail' },
  ],
  carePriorities: ['Code Quality', 'Team Collaboration', 'Continuous Learning'],
  interests: ['Owned by a black cat', 'Photography', 'Surfing'],
};

const renderHome = () => {
  return render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should show loading spinner initially', () => {
      const mockDataSource = {
        getProfile: vi.fn(() => new Promise(() => {})),
        getExperiences: vi.fn(),
        getSkills: vi.fn(),
        getEducation: vi.fn(),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource as any);

      renderHome();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Data Rendering', () => {
    it('should render profile data after loading', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn(),
        getSkills: vi.fn(),
        getEducation: vi.fn(),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderHome();

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });

      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });

    it('should render bio paragraphs', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn(),
        getSkills: vi.fn(),
        getEducation: vi.fn(),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderHome();

      await waitFor(() => {
        expect(screen.getByText('First paragraph of bio')).toBeInTheDocument();
      });

      expect(screen.getByText('Second paragraph of bio')).toBeInTheDocument();
    });

    it('should render location information', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn(),
        getSkills: vi.fn(),
        getEducation: vi.fn(),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderHome();

      await waitFor(() => {
        expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
      });
    });

    it('should render current role', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn(),
        getSkills: vi.fn(),
        getEducation: vi.fn(),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderHome();

      await waitFor(() => {
        expect(screen.getByText('Senior Developer at Tech Corp')).toBeInTheDocument();
      });
    });

    it('should render focus areas', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn(),
        getSkills: vi.fn(),
        getEducation: vi.fn(),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderHome();

      await waitFor(() => {
        expect(screen.getByText(/Web Development/)).toBeInTheDocument();
      });

      expect(screen.getByText(/Cloud Architecture/)).toBeInTheDocument();
      expect(screen.getByText(/DevOps/)).toBeInTheDocument();
    });

    it('should render care priorities when available', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn(),
        getSkills: vi.fn(),
        getEducation: vi.fn(),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderHome();

      await waitFor(() => {
        expect(screen.getAllByText('What I stand for').length).toBeGreaterThan(0);
      });

      expect(screen.getAllByText('Code Quality').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Team Collaboration').length).toBeGreaterThan(0);
    });

    it('should not render care priorities section when empty', async () => {
      const profileWithoutPriorities = { ...mockProfile, carePriorities: [] };
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(profileWithoutPriorities),
        getExperiences: vi.fn(),
        getSkills: vi.fn(),
        getEducation: vi.fn(),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderHome();

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });

      expect(screen.queryAllByText('What I stand for')).toHaveLength(0);
    });

    it('should render interests (Beyond the keyboard) when available', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn(),
        getSkills: vi.fn(),
        getEducation: vi.fn(),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderHome();

      await waitFor(() => {
        expect(screen.getAllByText('Beyond the keyboard').length).toBeGreaterThan(0);
      });

      expect(screen.getAllByText(/Photography/).length).toBeGreaterThan(0);
    });
  });

  describe('CTA Buttons', () => {
    it('should render View CV button with correct link', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn(),
        getSkills: vi.fn(),
        getEducation: vi.fn(),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderHome();

      await waitFor(() => {
        const cvLink = screen.getByText('View CV').closest('a');
        expect(cvLink).toHaveAttribute('href', '/cv');
      });
    });

    it('should render See Projects button with correct link', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn(),
        getSkills: vi.fn(),
        getEducation: vi.fn(),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderHome();

      await waitFor(() => {
        const projectsLink = screen.getByText('See Projects').closest('a');
        expect(projectsLink).toHaveAttribute('href', '/projects');
      });
    });
  });

  describe('Social Links', () => {
    it('should render social links with correct attributes', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn(),
        getSkills: vi.fn(),
        getEducation: vi.fn(),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderHome();

      await waitFor(() => {
        const githubLink = screen.getByLabelText('GitHub');
        expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe');
        expect(githubLink).toHaveAttribute('target', '_blank');
        expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Error Handling', () => {
    it('should show error message when profile fails to load', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockRejectedValue(new Error('Network error')),
        getExperiences: vi.fn(),
        getSkills: vi.fn(),
        getEducation: vi.fn(),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      renderHome();

      await waitFor(() => {
        expect(screen.getByText('Failed to load profile data.')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });
});
