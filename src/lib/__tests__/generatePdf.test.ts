import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateCVPdf } from '../generatePdf';
import * as ReactPdf from '@react-pdf/renderer';
import type { Profile } from '@/models/Profile';
import type { Experience } from '@/models/Experience';
import type { Skill } from '@/models/Skill';
import type { Education } from '@/models/Education';

vi.mock('@react-pdf/renderer', () => ({
  pdf: vi.fn(),
}));

vi.mock('@/components/CVPdfTemplate', () => ({
  CVPdfTemplate: vi.fn((props) => props),
}));

describe('generatePdf', () => {
  let mockBlob: Blob;
  let mockUrl: string;
  let createElementSpy: any;
  let createObjectURLSpy: any;
  let revokeObjectURLSpy: any;

  const mockProfile: Profile = {
    name: 'John Doe',
    title: 'Software Developer',
    bio: ['Test bio'],
    photo: '/photo.jpg',
    location: 'Test City',
    currentRole: 'Developer',
    focusAreas: ['React'],
    social: [],
  };

  const mockExperiences: Experience[] = [
    {
      id: '1',
      company: 'Test Company',
      role: 'Developer',
      startDate: '2020',
      endDate: null,
      description: ['Test description'],
      tags: ['React'],
    },
  ];

  const mockSkills: Skill[] = [
    { id: '1', name: 'React', category: 'Frontend' },
  ];

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

  beforeEach(() => {
    mockBlob = new Blob(['test pdf content'], { type: 'application/pdf' });
    mockUrl = 'blob:test-url';

    createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tag) => {
      if (tag === 'a') {
        const mockAnchor = {
          href: '',
          download: '',
          click: vi.fn(),
          setAttribute: vi.fn(),
          getAttribute: vi.fn(),
          removeAttribute: vi.fn(),
        };
        return mockAnchor as any;
      }
      return document.createElement(tag);
    });

    createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue(mockUrl);
    revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    const mockAppendChild = vi.fn();
    const mockRemoveChild = vi.fn();
    vi.spyOn(document.body, 'appendChild').mockImplementation(mockAppendChild);
    vi.spyOn(document.body, 'removeChild').mockImplementation(mockRemoveChild);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('PDF Generation', () => {
    it('should generate PDF with correct data', async () => {
      const mockPdfInstance = {
        toBlob: vi.fn().mockResolvedValue(mockBlob),
      };

      vi.mocked(ReactPdf.pdf).mockReturnValue(mockPdfInstance as any);

      await generateCVPdf(mockProfile, mockExperiences, mockSkills, mockEducation);

      expect(ReactPdf.pdf).toHaveBeenCalled();
      expect(mockPdfInstance.toBlob).toHaveBeenCalled();
    });

    it('should create download link with correct filename', async () => {
      const mockPdfInstance = {
        toBlob: vi.fn().mockResolvedValue(mockBlob),
      };

      vi.mocked(ReactPdf.pdf).mockReturnValue(mockPdfInstance as any);

      await generateCVPdf(mockProfile, mockExperiences, mockSkills, mockEducation);

      expect(createElementSpy).toHaveBeenCalledWith('a');
    });

    it('should format filename with profile name', async () => {
      const mockPdfInstance = {
        toBlob: vi.fn().mockResolvedValue(mockBlob),
      };

      vi.mocked(ReactPdf.pdf).mockReturnValue(mockPdfInstance as any);

      let capturedAnchor: any;
      createElementSpy.mockImplementation((tag: string) => {
        if (tag === 'a') {
          const mockAnchor = {
            href: '',
            download: '',
            click: vi.fn(),
            setAttribute: vi.fn(),
            getAttribute: vi.fn(),
            removeAttribute: vi.fn(),
          };
          capturedAnchor = mockAnchor;
          return mockAnchor as any;
        }
        return document.createElement(tag);
      });

      await generateCVPdf(mockProfile, mockExperiences, mockSkills, mockEducation);

      expect(capturedAnchor.download).toBe('John-Doe-CV.pdf');
    });

    it('should handle profile name with multiple spaces', async () => {
      const profileWithSpaces = { ...mockProfile, name: 'John   Michael   Doe' };
      const mockPdfInstance = {
        toBlob: vi.fn().mockResolvedValue(mockBlob),
      };

      vi.mocked(ReactPdf.pdf).mockReturnValue(mockPdfInstance as any);

      let capturedAnchor: any;
      createElementSpy.mockImplementation((tag: string) => {
        if (tag === 'a') {
          const mockAnchor = {
            href: '',
            download: '',
            click: vi.fn(),
            setAttribute: vi.fn(),
            getAttribute: vi.fn(),
            removeAttribute: vi.fn(),
          };
          capturedAnchor = mockAnchor;
          return mockAnchor as any;
        }
        return document.createElement(tag);
      });

      await generateCVPdf(profileWithSpaces, mockExperiences, mockSkills, mockEducation);

      expect(capturedAnchor.download).toBe('John-Michael-Doe-CV.pdf');
    });

    it('should create and revoke object URL', async () => {
      const mockPdfInstance = {
        toBlob: vi.fn().mockResolvedValue(mockBlob),
      };

      vi.mocked(ReactPdf.pdf).mockReturnValue(mockPdfInstance as any);

      await generateCVPdf(mockProfile, mockExperiences, mockSkills, mockEducation);

      expect(createObjectURLSpy).toHaveBeenCalledWith(mockBlob);
      expect(revokeObjectURLSpy).toHaveBeenCalledWith(mockUrl);
    });

    it('should trigger download by clicking link', async () => {
      const mockPdfInstance = {
        toBlob: vi.fn().mockResolvedValue(mockBlob),
      };

      vi.mocked(ReactPdf.pdf).mockReturnValue(mockPdfInstance as any);

      let capturedAnchor: any;
      createElementSpy.mockImplementation((tag: string) => {
        if (tag === 'a') {
          const mockAnchor = {
            href: '',
            download: '',
            click: vi.fn(),
            setAttribute: vi.fn(),
            getAttribute: vi.fn(),
            removeAttribute: vi.fn(),
          };
          capturedAnchor = mockAnchor;
          return mockAnchor as any;
        }
        return document.createElement(tag);
      });

      await generateCVPdf(mockProfile, mockExperiences, mockSkills, mockEducation);

      expect(capturedAnchor.click).toHaveBeenCalled();
    });

    it('should append and remove link from DOM', async () => {
      const mockPdfInstance = {
        toBlob: vi.fn().mockResolvedValue(mockBlob),
      };

      vi.mocked(ReactPdf.pdf).mockReturnValue(mockPdfInstance as any);

      await generateCVPdf(mockProfile, mockExperiences, mockSkills, mockEducation);

      expect(document.body.appendChild).toHaveBeenCalled();
      expect(document.body.removeChild).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should throw error when PDF generation fails', async () => {
      const mockPdfInstance = {
        toBlob: vi.fn().mockRejectedValue(new Error('PDF generation failed')),
      };

      vi.mocked(ReactPdf.pdf).mockReturnValue(mockPdfInstance as any);

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await expect(
        generateCVPdf(mockProfile, mockExperiences, mockSkills, mockEducation)
      ).rejects.toThrow('Failed to generate PDF. Please try again.');

      consoleSpy.mockRestore();
    });

    it('should log error to console when generation fails', async () => {
      const testError = new Error('PDF generation failed');
      const mockPdfInstance = {
        toBlob: vi.fn().mockRejectedValue(testError),
      };

      vi.mocked(ReactPdf.pdf).mockReturnValue(mockPdfInstance as any);

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      try {
        await generateCVPdf(mockProfile, mockExperiences, mockSkills, mockEducation);
      } catch (error) {
        // Expected error
      }

      expect(consoleSpy).toHaveBeenCalledWith('Error generating PDF:', testError);

      consoleSpy.mockRestore();
    });

    it('should handle blob creation errors', async () => {
      const mockPdfInstance = {
        toBlob: vi.fn().mockRejectedValue(new Error('Blob creation failed')),
      };

      vi.mocked(ReactPdf.pdf).mockReturnValue(mockPdfInstance as any);

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await expect(
        generateCVPdf(mockProfile, mockExperiences, mockSkills, mockEducation)
      ).rejects.toThrow();

      consoleSpy.mockRestore();
    });
  });

  describe('Data Validation', () => {
    it('should work with empty experiences', async () => {
      const mockPdfInstance = {
        toBlob: vi.fn().mockResolvedValue(mockBlob),
      };

      vi.mocked(ReactPdf.pdf).mockReturnValue(mockPdfInstance as any);

      await expect(
        generateCVPdf(mockProfile, [], mockSkills, mockEducation)
      ).resolves.not.toThrow();
    });

    it('should work with empty skills', async () => {
      const mockPdfInstance = {
        toBlob: vi.fn().mockResolvedValue(mockBlob),
      };

      vi.mocked(ReactPdf.pdf).mockReturnValue(mockPdfInstance as any);

      await expect(
        generateCVPdf(mockProfile, mockExperiences, [], mockEducation)
      ).resolves.not.toThrow();
    });

    it('should work with empty education', async () => {
      const mockPdfInstance = {
        toBlob: vi.fn().mockResolvedValue(mockBlob),
      };

      vi.mocked(ReactPdf.pdf).mockReturnValue(mockPdfInstance as any);

      await expect(
        generateCVPdf(mockProfile, mockExperiences, mockSkills, [])
      ).resolves.not.toThrow();
    });
  });
});
