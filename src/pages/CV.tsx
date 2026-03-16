import { useEffect, useState } from 'react';
import { getDataSource } from '@/repositories/DataSourceFactory';
import type { Profile } from '@/models/Profile';
import type { Experience } from '@/models/Experience';
import type { Skill } from '@/models/Skill';
import type { Education } from '@/models/Education';
import type { Language } from '@/models/Language';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { generateCVPdf } from '@/lib/generatePdf';
import { generateAtsResume } from '@/lib/generateAtsResume';
import { Timeline, TimelineItem } from '@/components/Timeline';

// Color palette for company dots
const companyColors = [
  'bg-blue-500 shadow-blue-500/50',
  'bg-purple-500 shadow-purple-500/50',
  'bg-green-500 shadow-green-500/50',
  'bg-orange-500 shadow-orange-500/50',
  'bg-pink-500 shadow-pink-500/50',
  'bg-cyan-500 shadow-cyan-500/50',
  'bg-red-500 shadow-red-500/50',
  'bg-yellow-500 shadow-yellow-500/50',
  'bg-indigo-500 shadow-indigo-500/50',
];

const getCompanyColor = (company: string): string => {
  const hash = company.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return companyColors[hash % companyColors.length];
};

export default function CV() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingAts, setDownloadingAts] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataSource = getDataSource();
        const [profileData, experiencesData, skillsData, educationData, languagesData] = await Promise.all([
          dataSource.getProfile(),
          dataSource.getExperiences(),
          dataSource.getSkills(),
          dataSource.getEducation(),
          dataSource.getLanguages()
        ]);
        
        setProfile(profileData);
        setExperiences(experiencesData);
        setSkills(skillsData);
        setEducation(educationData);
        setLanguages(languagesData);
      } catch (error) {
        console.error('Error fetching CV data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadPdf = async () => {
    if (!profile) return;
    
    setDownloadingPdf(true);
    try {
      await generateCVPdf(profile, experiences, skills, education, languages);
    } catch (error) {
      console.error('Failed to download PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleDownloadAts = async () => {
    if (!profile) return;

    setDownloadingAts(true);
    try {
      await generateAtsResume(profile, experiences, skills, education, languages);
    } catch (error) {
      console.error('Failed to download ATS resume:', error);
      alert('Failed to generate ATS resume. Please try again.');
    } finally {
      setDownloadingAts(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Unable to load CV data</p>
        </div>
      </div>
    );
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="container max-w-5xl mx-auto px-4 py-6 md:py-10">
      {/* Header Section */}
      <header className="mb-12 md:mb-16 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight">
            {profile.name}
          </h1>
          <p className="text-xl md:text-2xl font-extralight text-muted-foreground">
            {profile.title}
          </p>
        </div>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {profile.bio.map((paragraph, index) => (
            <p key={index} className="text-base md:text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="pt-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="gap-2 bg-slate-500 text-white hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
                disabled={downloadingPdf || downloadingAts}
                aria-label="Download options"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                {downloadingPdf || downloadingAts ? 'Generating...' : 'Download'}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="bg-slate-400 dark:bg-slate-500 border-slate-400 dark:border-slate-500 p-0 min-w-[var(--radix-dropdown-menu-trigger-width)]"
            >
              <DropdownMenuItem
                onClick={handleDownloadPdf}
                disabled={downloadingPdf || downloadingAts}
                className="text-white focus:bg-slate-500 dark:focus:bg-slate-600 cursor-pointer rounded-none pl-4"
              >
                PDF
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDownloadAts}
                disabled={downloadingPdf || downloadingAts}
                className="text-white focus:bg-slate-500 dark:focus:bg-slate-600 cursor-pointer rounded-none pl-4"
              >
                ATS friendly
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content - Two Column Layout on Desktop */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-12 lg:gap-24">
        {/* Left Column: Professional Experience */}
        <section>
          <h2 className="text-3xl md:text-4xl font-normal mb-8 md:mb-12">
            Professional Experience
          </h2>
          
          <Timeline>
            {experiences.map((exp, index) => {
              const startYear = exp.startDate.split(' ').pop() || exp.startDate;
              const dotColor = getCompanyColor(exp.company);
              const isLast = index === experiences.length - 1;
              
              return (
                <TimelineItem key={exp.id} dotColor={dotColor} isLast={isLast}>
                  <div className="space-y-3">
                    {/* Role with inline year badge */}
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-normal">{exp.role}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-normal mt-1">{startYear}</span>
                    </div>
                    
                    {/* Company with primary color */}
                    <p className="text-lg font-light dark:text-blue-200">{exp.company}</p>
                    
                    {/* Description bullets */}
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex gap-2 leading-relaxed">
                          <span className="text-muted-foreground/60 select-none">·</span>
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Tags */}
                    {exp.tags && exp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.tags.map((tag, idx) => (
                          <Badge key={idx} className="text-xs font-normal border-0 !bg-slate-200 !text-slate-700 dark:!bg-slate-600 dark:!text-slate-100">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </TimelineItem>
              );
            })}
          </Timeline>
        </section>

        {/* Right Column: Skills & Education */}
        <aside className="space-y-14 lg:space-y-20">
          {/* Skills Section */}
          <section>
            <h2 className="text-3xl md:text-4xl font-normal mb-8">Skills</h2>
            
            <div className="space-y-8">
              {Object.entries(groupedSkills).map(([category, skillList]) => (
                <div key={category}>
                  <h3 className="text-lg md:text-xl font-normal mb-4 text-muted-foreground">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skillName, idx) => (
                      <Badge key={idx} className="text-xs font-normal border-0 !bg-slate-200 !text-slate-700 dark:!bg-slate-600 dark:!text-slate-100">
                        {skillName}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-3xl md:text-4xl font-normal mb-8 md:mb-6">Education</h2>
            
            <div className="space-y-6">
              {education.map((edu) => {
                const yearDisplay = edu.endYear && edu.startYear !== edu.endYear
                  ? `${edu.startYear} - ${edu.endYear}`
                  : edu.startYear;
                
                return (
                  <div key={edu.id} className="space-y-1">
                    {edu.description && (
                      <h3 className="text-lg font-medium">{edu.description}</h3>
                    )}
                    <p className="text-sm font-normal">{edu.degree}</p>
                    <p className="text-sm font-light dark:text-blue-200">{edu.institution}</p>
                    <p className="text-xs font-normal text-gray-500 dark:text-gray-400">{yearDisplay}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Languages Section */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-3xl md:text-4xl font-normal mb-8 md:mb-6">Languages</h2>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <span className="text-base font-medium">{lang.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
