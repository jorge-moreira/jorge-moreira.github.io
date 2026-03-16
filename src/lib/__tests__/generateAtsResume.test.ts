import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateAtsResume } from '../generateAtsResume';
import type { Profile } from '@/models/Profile';
import type { Experience } from '@/models/Experience';
import type { Skill } from '@/models/Skill';
import type { Education } from '@/models/Education';
import type { Language } from '@/models/Language';

const mockProfile: Profile = {
  name: 'Jane Smith',
  title: 'Software Engineer',
  bio: ['Experienced developer passionate about clean code.'],
  photo: '/photo.jpg',
  location: 'Lisbon, Portugal',
  currentRole: 'Software Engineer',
  focusAreas: ['Backend'],
  social: [
    { platform: 'Email', url: 'mailto:jane@example.com', icon: 'email' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/jane', icon: 'linkedin' },
  ],
};

const mockExperiences: Experience[] = [
  {
    id: '1',
    company: 'Acme Corp',
    role: 'Senior Developer',
    startDate: '2022',
    endDate: undefined,
    description: ['Led backend services', 'Implemented CI/CD pipelines'],
    tags: ['Backend', 'CI/CD'],
    techStack: ['C#', 'ASP.NET Core', 'Docker'],
  },
  {
    id: '2',
    company: 'Old Co',
    role: 'Junior Developer',
    startDate: '2020',
    endDate: '2022',
    description: ['Developed REST APIs'],
    tags: ['Backend'],
    techStack: ['C#', 'SQL Server'],
  },
];

const mockSkills: Skill[] = [
  { name: 'C#', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'ASP.NET Core', category: 'Backend' },
];

const mockEducation: Education[] = [
  {
    id: '1',
    institution: 'University of Lisbon',
    degree: 'B.S. Computer Science',
    startYear: '2014',
    endYear: '2018',
    description: 'Graduated with honors',
  },
];

const mockLanguages: Language[] = [
  { name: 'Portuguese', level: 'Native' },
  { name: 'English', level: 'Fluent' },
];

describe('generateAtsResume', () => {
  let createObjectURLSpy: ReturnType<typeof vi.spyOn>;
  let revokeObjectURLSpy: ReturnType<typeof vi.spyOn>;
  let mockLink: { href: string; download: string; click: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockLink = { href: '', download: '', click: vi.fn() };
    vi.spyOn(document, 'createElement').mockReturnValue(mockLink as unknown as HTMLElement);
    createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
    revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node);
    vi.spyOn(document.body, 'removeChild').mockImplementation((node) => node);
  });

  it('should trigger a .txt file download', async () => {
    await generateAtsResume(mockProfile, mockExperiences, mockSkills, mockEducation, mockLanguages);
    expect(mockLink.download).toBe('Jane-Smith-ATS-Resume.txt');
    expect(mockLink.click).toHaveBeenCalledOnce();
  });

  it('should include the candidate name in the output', async () => {
    let capturedBlob: Blob | undefined;
    createObjectURLSpy.mockImplementation((blob: Blob) => {
      capturedBlob = blob;
      return 'blob:mock';
    });
    await generateAtsResume(mockProfile, mockExperiences, mockSkills, mockEducation, mockLanguages);
    const text = await capturedBlob!.text();
    expect(text).toContain('JANE SMITH');
  });

  it('should include experience company and role', async () => {
    let capturedBlob: Blob | undefined;
    createObjectURLSpy.mockImplementation((blob: Blob) => { capturedBlob = blob; return 'blob:mock'; });
    await generateAtsResume(mockProfile, mockExperiences, mockSkills, mockEducation, mockLanguages);
    const text = await capturedBlob!.text();
    expect(text).toContain('Acme Corp');
    expect(text).toContain('Senior Developer');
  });

  it('should include techStack per experience', async () => {
    let capturedBlob: Blob | undefined;
    createObjectURLSpy.mockImplementation((blob: Blob) => { capturedBlob = blob; return 'blob:mock'; });
    await generateAtsResume(mockProfile, mockExperiences, mockSkills, mockEducation, mockLanguages);
    const text = await capturedBlob!.text();
    expect(text).toContain('C#, ASP.NET Core, Docker');
  });

  it('should include skills grouped by category', async () => {
    let capturedBlob: Blob | undefined;
    createObjectURLSpy.mockImplementation((blob: Blob) => { capturedBlob = blob; return 'blob:mock'; });
    await generateAtsResume(mockProfile, mockExperiences, mockSkills, mockEducation, mockLanguages);
    const text = await capturedBlob!.text();
    expect(text).toContain('Languages: C#, TypeScript');
    expect(text).toContain('Backend: ASP.NET Core');
  });

  it('should include education section', async () => {
    let capturedBlob: Blob | undefined;
    createObjectURLSpy.mockImplementation((blob: Blob) => { capturedBlob = blob; return 'blob:mock'; });
    await generateAtsResume(mockProfile, mockExperiences, mockSkills, mockEducation, mockLanguages);
    const text = await capturedBlob!.text();
    expect(text).toContain('University of Lisbon');
    expect(text).toContain('B.S. Computer Science');
  });

  it('should include languages section', async () => {
    let capturedBlob: Blob | undefined;
    createObjectURLSpy.mockImplementation((blob: Blob) => { capturedBlob = blob; return 'blob:mock'; });
    await generateAtsResume(mockProfile, mockExperiences, mockSkills, mockEducation, mockLanguages);
    const text = await capturedBlob!.text();
    expect(text).toContain('Portuguese');
    expect(text).toContain('Native');
  });

  it('should revoke the object URL after download', async () => {
    await generateAtsResume(mockProfile, mockExperiences, mockSkills, mockEducation, mockLanguages);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url');
  });
});
