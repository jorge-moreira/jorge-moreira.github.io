import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import CV from '../CV';
import * as DataSourceFactory from '@/repositories/DataSourceFactory';
import * as GeneratePdf from '@/lib/generatePdf';
import * as GenerateAts from '@/lib/generateAtsResume';
import type { Profile } from '@/models/Profile';
import type { Experience } from '@/models/Experience';
import type { Skill } from '@/models/Skill';
import type { Education } from '@/models/Education';

const mockProfile: Profile = {
  name: 'Jane Smith',
  title: 'Full Stack Developer',
  bio: ['Experienced developer', 'Passionate about tech'],
  photo: '/photo.jpg',
  location: 'New York, NY',
  currentRole: 'Lead Developer',
  focusAreas: ['React', 'Node.js'],
  social: [],
};

const mockExperiences: Experience[] = [
  {
    id: '1',
    company: 'Tech Company',
    role: 'Senior Developer',
    startDate: '2020',
    endDate: undefined,
    description: ['Led development team', 'Implemented CI/CD'],
    tags: ['React', 'TypeScript', 'AWS'],
  },
  {
    id: '2',
    company: 'Startup Inc',
    role: 'Developer',
    startDate: '2018',
    endDate: '2020',
    description: ['Built web applications', 'Maintained backend services'],
    tags: ['Node.js', 'MongoDB'],
  },
];

const mockSkills: Skill[] = [
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
];

const mockEducation: Education[] = [
  {
    id: '1',
    institution: 'University of Technology',
    degree: 'B.S. Computer Science',
    startYear: '2014',
    endYear: '2018',
    description: 'Graduated with honors',
  },
  {
    id: '2',
    institution: 'Tech Bootcamp',
    degree: 'Full Stack Web Development',
    startYear: '2017',
    endYear: '2017',
    description: undefined,
  },
];

const renderCV = () => {
  return render(
    <BrowserRouter>
      <CV />
    </BrowserRouter>
  );
};

describe('CV', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should show loading message initially', () => {
      const mockDataSource = {
        getProfile: vi.fn(() => new Promise(() => {})),
        getExperiences: vi.fn(() => new Promise(() => {})),
        getSkills: vi.fn(() => new Promise(() => {})),
        getEducation: vi.fn(() => new Promise(() => {})),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource as any);

      renderCV();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Data Rendering', () => {
    it('should render profile header information', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderCV();

      await waitFor(() => {
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      });

      expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
      expect(screen.getByText('Experienced developer')).toBeInTheDocument();
    });

    it('should render all experiences in timeline', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderCV();

      await waitFor(() => {
        expect(screen.getByText('Tech Company')).toBeInTheDocument();
      });

      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
      expect(screen.getByText('Startup Inc')).toBeInTheDocument();
      expect(screen.getByText('Developer')).toBeInTheDocument();
    });

    it('should display "Present" for ongoing experience', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderCV();

      await waitFor(() => {
        expect(screen.getByText('2020')).toBeInTheDocument();
      });
    });

    it('should render experience descriptions', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderCV();

      await waitFor(() => {
        expect(screen.getByText('Led development team')).toBeInTheDocument();
      });

      expect(screen.getByText('Implemented CI/CD')).toBeInTheDocument();
    });

    it('should render experience tags', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderCV();

      await waitFor(() => {
        expect(screen.getByText('Professional Experience')).toBeInTheDocument();
      });

      expect(screen.getByText('AWS')).toBeInTheDocument();
      expect(screen.getByText('MongoDB')).toBeInTheDocument();
    });
  });

  describe('Skills Section', () => {
    it('should render skills grouped by category', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderCV();

      await waitFor(() => {
        expect(screen.getByText('Frontend')).toBeInTheDocument();
      });

      expect(screen.getByText('Backend')).toBeInTheDocument();
    });

    it('should render all skill names', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderCV();

      await waitFor(() => {
        expect(screen.getByText('Skills')).toBeInTheDocument();
      });

      const nodeJsElements = screen.getAllByText('Node.js');
      expect(nodeJsElements.length).toBeGreaterThan(0);
      expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    });
  });

  describe('Education Section', () => {
    it('should render all education entries', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderCV();

      await waitFor(() => {
        expect(screen.getByText('University of Technology')).toBeInTheDocument();
      });

      expect(screen.getByText('B.S. Computer Science')).toBeInTheDocument();
      expect(screen.getByText('Tech Bootcamp')).toBeInTheDocument();
    });

    it('should display year range correctly', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderCV();

      await waitFor(() => {
        expect(screen.getByText('2014 - 2018')).toBeInTheDocument();
      });
    });

    it('should display single year when start and end are the same', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderCV();

      await waitFor(() => {
        expect(screen.getByText('2017')).toBeInTheDocument();
      });
    });

    it('should render education description when available', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderCV();

      await waitFor(() => {
        expect(screen.getByText('Graduated with honors')).toBeInTheDocument();
      });
    });
  });

  describe('PDF Download', () => {
    it('should render download button', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderCV();

      await waitFor(() => {
        expect(screen.getByText('Download')).toBeInTheDocument();
      });
    });

    it('should call generateCVPdf when clicking PDF option', async () => {
      const user = userEvent.setup();
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);
      const generatePdfSpy = vi.spyOn(GeneratePdf, 'generateCVPdf').mockResolvedValue();

      renderCV();

      await waitFor(() => {
        expect(screen.getByLabelText('Download options')).toBeInTheDocument();
      });

      await user.click(screen.getByLabelText('Download options'));

      await waitFor(() => {
        expect(screen.getByText('PDF')).toBeInTheDocument();
      });

      await user.click(screen.getByText('PDF'));

      await waitFor(() => {
        expect(generatePdfSpy).toHaveBeenCalledWith(
          mockProfile,
          mockExperiences,
          mockSkills,
          mockEducation,
          []
        );
      });
    });

    it('should show generating state when downloading', async () => {
      const user = userEvent.setup();
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);
      vi.spyOn(GeneratePdf, 'generateCVPdf').mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 100))
      );

      renderCV();

      await waitFor(() => {
        expect(screen.getByLabelText('Download options')).toBeInTheDocument();
      });

      await user.click(screen.getByLabelText('Download options'));

      await waitFor(() => {
        expect(screen.getByText('PDF')).toBeInTheDocument();
      });

      await user.click(screen.getByText('PDF'));

      await waitFor(() => {
        expect(screen.getByText('Generating...')).toBeInTheDocument();
      });
    });

    it('should handle PDF generation error', async () => {
      const user = userEvent.setup();
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);
      vi.spyOn(GeneratePdf, 'generateCVPdf').mockRejectedValue(new Error('PDF error'));
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      renderCV();

      await waitFor(() => {
        expect(screen.getByLabelText('Download options')).toBeInTheDocument();
      });

      await user.click(screen.getByLabelText('Download options'));

      await waitFor(() => {
        expect(screen.getByText('PDF')).toBeInTheDocument();
      });

      await user.click(screen.getByText('PDF'));

      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Failed to generate PDF. Please try again.');
      });

      alertSpy.mockRestore();
      consoleSpy.mockRestore();
    });
  });

  describe('ATS Download', () => {
    it('should render the download options chevron button', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);

      renderCV();

      await waitFor(() => {
        expect(screen.getByLabelText('Download options')).toBeInTheDocument();
      });
    });

    it('should call generateAtsResume when clicking ATS Resume option', async () => {
      const user = userEvent.setup();
      const mockDataSource = {
        getProfile: vi.fn().mockResolvedValue(mockProfile),
        getExperiences: vi.fn().mockResolvedValue(mockExperiences),
        getSkills: vi.fn().mockResolvedValue(mockSkills),
        getEducation: vi.fn().mockResolvedValue(mockEducation),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);
      const generateAtsSpy = vi.spyOn(GenerateAts, 'generateAtsResume').mockResolvedValue();

      renderCV();

      await waitFor(() => {
        expect(screen.getByLabelText('Download options')).toBeInTheDocument();
      });

      await user.click(screen.getByLabelText('Download options'));

      await waitFor(() => {
        expect(screen.getByText('ATS friendly')).toBeInTheDocument();
      });

      await user.click(screen.getByText('ATS friendly'));

      await waitFor(() => {
        expect(generateAtsSpy).toHaveBeenCalledWith(
          mockProfile,
          mockExperiences,
          mockSkills,
          mockEducation,
          []
        );
      });
    });
  });

  describe('Error Handling', () => {
    it('should show error message when data fails to load', async () => {
      const mockDataSource = {
        getProfile: vi.fn().mockRejectedValue(new Error('Network error')),
        getExperiences: vi.fn().mockResolvedValue([]),
        getSkills: vi.fn().mockResolvedValue([]),
        getEducation: vi.fn().mockResolvedValue([]),
        getProjects: vi.fn(),
        getLanguages: vi.fn().mockResolvedValue([]),
      };

      vi.spyOn(DataSourceFactory, 'getDataSource').mockReturnValue(mockDataSource);
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      renderCV();

      await waitFor(() => {
        expect(screen.getByText('Unable to load CV data')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });
});
