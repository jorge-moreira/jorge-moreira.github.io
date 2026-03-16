import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { Profile } from '@/models/Profile';
import type { Experience } from '@/models/Experience';
import type { Skill } from '@/models/Skill';
import type { Education } from '@/models/Education';
import type { Language } from '@/models/Language';

interface CVPdfTemplateProps {
  profile: Profile;
  experiences: Experience[];
  skills: Skill[];
  education: Education[];
  languages: Language[];
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #333333',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  headerInfo: {
    flexDirection: 'row',
    gap: 20,
    fontSize: 9,
    color: '#666666',
  },
  section: {
    marginTop: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  company: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 2,
  },
  location: {
    fontSize: 9,
    color: '#888888',
    marginBottom: 4,
  },
  dates: {
    fontSize: 9,
    color: '#666666',
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 3,
    paddingLeft: 15,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 6,
  },
  tag: {
    fontSize: 8,
    backgroundColor: '#f0f0f0',
    padding: '3 6',
    borderRadius: 3,
    color: '#333333',
  },
  skillCategory: {
    marginBottom: 8,
  },
  skillCategoryName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 4,
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skill: {
    fontSize: 9,
    backgroundColor: '#f5f5f5',
    padding: '3 8',
    borderRadius: 3,
    border: '1 solid #e0e0e0',
  },
  educationItem: {
    marginBottom: 10,
  },
  educationDescription: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  degree: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  institution: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 2,
  },
  year: {
    fontSize: 8,
    color: '#999999',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  languageName: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  languageLevel: {
    fontSize: 10,
    color: '#666666',
  },
});

export function CVPdfTemplate({ profile, experiences, skills, education, languages }: CVPdfTemplateProps) {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.title}>{profile.title}</Text>
          <View style={styles.headerInfo}>
            <Text>{profile.location}</Text>
            {profile.social.find(s => s.platform.toLowerCase() === 'email') && (
              <Text>
                {profile.social.find(s => s.platform.toLowerCase() === 'email')?.url.replace('mailto:', '')}
              </Text>
            )}
          </View>
        </View>

        {/* Professional Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {experiences.map((exp) => (
            <View key={exp.id} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.role}>{exp.role}</Text>
                  {exp.location && (
                    <Text style={styles.location}>{exp.location}</Text>
                  )}
                </View>
                <Text style={styles.dates}>
                  {exp.startDate}{exp.endDate ? ` - ${exp.endDate}` : ' - Present'}
                </Text>
              </View>
              
              {exp.description.map((item, idx) => (
                <Text key={idx} style={styles.bulletPoint}>
                  • {item}
                </Text>
              ))}
              
              {exp.tags && exp.tags.length > 0 && (
                <View style={styles.tags}>
                  {exp.tags.map((tag, idx) => (
                    <Text key={idx} style={styles.tag}>{tag}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {Object.entries(groupedSkills).map(([category, skillList]) => (
            <View key={category} style={styles.skillCategory}>
              <Text style={styles.skillCategoryName}>{category}</Text>
              <View style={styles.skillList}>
                {skillList.map((skillName, idx) => (
                  <Text key={idx} style={styles.skill}>{skillName}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu) => {
            const yearDisplay = edu.endYear && edu.startYear !== edu.endYear
              ? `${edu.startYear} - ${edu.endYear}`
              : edu.startYear;
            
            return (
              <View key={edu.id} style={styles.educationItem}>
                {/* Description - Most prominent */}
                {edu.description && (
                  <Text style={styles.educationDescription}>{edu.description}</Text>
                )}
                
                {/* Degree */}
                <Text style={styles.degree}>{edu.degree}</Text>
                
                {/* Institution */}
                <Text style={styles.institution}>{edu.institution}</Text>
                
                {/* Years - Smallest and lightest */}
                <Text style={styles.year}>{yearDisplay}</Text>
              </View>
            );
          })}
        </View>
        {/* Languages */}
        {languages && languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {languages.map((lang, idx) => (
              <View key={idx} style={styles.languageItem}>
                <Text style={styles.languageName}>{lang.name}</Text>
                <Text style={styles.languageLevel}>{lang.level}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
