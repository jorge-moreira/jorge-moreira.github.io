import { useEffect, useState } from 'react';
import { getDataSource } from '@/repositories/DataSourceFactory';
import type { Profile } from '@/models/Profile';
import type { Experience } from '@/models/Experience';
import type { Skill } from '@/models/Skill';
import type { Education } from '@/models/Education';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { generateCVPdf } from '@/lib/generatePdf';
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
  const [loading, setLoading] = useState(true);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataSource = getDataSource();
        const [profileData, experiencesData, skillsData, educationData] = await Promise.all([
          dataSource.getProfile(),
          dataSource.getExperiences(),
          dataSource.getSkills(),
          dataSource.getEducation()
        ]);
        
        setProfile(profileData);
        setExperiences(experiencesData);
        setSkills(skillsData);
        setEducation(educationData);
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
      await generateCVPdf(profile, experiences, skills, education);
    } catch (error) {
      console.error('Failed to download PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloadingPdf(false);
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
    <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Header Section */}
      <header className="mb-12 md:mb-16 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {profile.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
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
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
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
            {downloadingPdf ? 'Generating PDF...' : 'Download PDF'}
          </Button>
        </div>
      </header>

      {/* Main Content - Two Column Layout on Desktop */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16">
        {/* Left Column: Work Experience */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">
            Work Experience
          </h2>
          
          <Timeline>
            {experiences.map((exp, index) => {
              const startYear = exp.startDate.split('-')[0] || exp.startDate;
              const dotColor = getCompanyColor(exp.company);
              const isLast = index === experiences.length - 1;
              
              return (
                <TimelineItem key={exp.id} dotColor={dotColor} isLast={isLast}>
                  <div className="space-y-3">
                    {/* Role with inline year badge */}
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold">{exp.role}</h3>
                      <span className="text-xs text-gray-400 font-normal mt-1">{startYear}</span>
                    </div>
                    
                    {/* Company with primary color */}
                    <p className="text-lg font-medium text-primary">{exp.company}</p>
                    
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
                          <Badge key={idx} variant="outline" className="text-xs font-normal">
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
        <aside className="space-y-12 lg:space-y-16">
          {/* Skills Section */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">Skills</h2>
            
            <div className="space-y-8">
              {Object.entries(groupedSkills).map(([category, skillList]) => (
                <div key={category}>
                  <h3 className="text-lg md:text-xl font-semibold mb-4 text-muted-foreground">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skillName, idx) => (
                      <Badge key={idx} variant="outline" className="text-sm">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">Education</h2>
            
            <div className="space-y-6">
              {education.map((edu) => {
                const yearDisplay = edu.endYear && edu.startYear !== edu.endYear
                  ? `${edu.startYear} - ${edu.endYear}`
                  : edu.startYear;
                
                return (
                  <Card key={edu.id}>
                    <CardContent className="p-6">
                      {/* Description - First and most highlighted */}
                      {edu.description && (
                        <h3 className="text-xl md:text-2xl font-bold mb-3">
                          {edu.description}
                        </h3>
                      )}
                      
                      {/* Degree */}
                      <p className="text-base md:text-lg font-semibold mb-2">
                        {edu.degree}
                      </p>
                      
                      {/* Institution */}
                      <p className="text-sm md:text-base text-muted-foreground mb-1">
                        {edu.institution}
                      </p>
                      
                      {/* Years - smaller and lighter */}
                      <p className="text-xs md:text-sm text-gray-400">
                        {yearDisplay}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
