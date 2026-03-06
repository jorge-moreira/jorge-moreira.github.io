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

      {/* Professional Experience Section */}
      <section className="mb-16 md:mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">
          Professional Experience
        </h2>
        
        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden md:block absolute left-[7.5rem] top-0 bottom-0 w-px bg-border" />
          
          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative">
                {/* Timeline dot - hidden on mobile */}
                <div className="hidden md:block absolute left-[7.5rem] top-2 w-3 h-3 rounded-full bg-primary border-4 border-background -translate-x-1/2" />
                
                <div className="md:grid md:grid-cols-[7rem_1fr] md:gap-8">
                  {/* Date */}
                  <div className="text-sm md:text-base font-medium text-muted-foreground mb-2 md:mb-0 md:text-right md:pt-1">
                    {exp.startDate}
                    {exp.endDate && ` - ${exp.endDate}`}
                    {!exp.endDate && ' - Present'}
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">{exp.company}</h3>
                      <p className="text-base md:text-lg text-muted-foreground mt-1">
                        {exp.role}
                      </p>
                    </div>
                    
                    <ul className="space-y-2 text-sm md:text-base">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                    
                    {exp.tags && exp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-16 md:mb-20">
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
      <section className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">Education</h2>
        
        <div className="space-y-6">
          {education.map((edu) => {
            const yearDisplay = edu.endYear && edu.startYear !== edu.endYear
              ? `${edu.startYear} - ${edu.endYear}`
              : edu.startYear;
            
            return (
              <Card key={edu.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">
                        {edu.institution}
                      </h3>
                      <p className="text-base md:text-lg text-muted-foreground mt-1">
                        {edu.degree}
                      </p>
                    </div>
                    <div className="text-sm md:text-base font-medium text-muted-foreground md:text-right">
                      {yearDisplay}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-sm md:text-base text-muted-foreground mt-2">
                      {edu.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
