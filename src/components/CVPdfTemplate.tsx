import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
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

// Light-mode website tokens
const BLUE = 'hsl(211, 74%, 40%)';       // --color-primary light
const FOREGROUND = '#1c1c1c';             // --color-foreground light
const MUTED_FG = '#707070';              // --color-muted-foreground light
const BORDER = '#e0e0e0';               // --color-border light
const TAG_BG = 'hsl(211, 40%, 90%)';    // --color-accent light
const TAG_FG = 'hsl(211, 74%, 28%)';    // --color-accent-foreground light
const SKILL_BG = '#f5f5f5';             // --color-muted light
const SKILL_BORDER = '#e8e8e8';

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    color: FOREGROUND,
  },

  // Header: avatar left + text right
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 18,
    marginBottom: 18,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 6,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'light',
    color: FOREGROUND,
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 12,
    color: BLUE,
    marginBottom: 8,
  },
  contacts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    fontSize: 9,
    color: MUTED_FG,
  },

  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginBottom: 20,
  },

  // Section
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#aaaaaa',
    borderBottom: `1 solid #f0f0f0`,
    paddingBottom: 4,
    marginBottom: 10,
  },

  // Experience row: dates left + content right
  expRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 12,
  },
  expDates: {
    width: 72,
    fontSize: 8,
    color: '#aaaaaa',
    paddingTop: 1,
    lineHeight: 1.5,
  },
  expBody: {
    flex: 1,
  },
  expCompany: {
    fontSize: 11,
    fontWeight: 'bold',
    color: FOREGROUND,
    marginBottom: 1,
  },
  expRole: {
    fontSize: 10,
    color: MUTED_FG,
    marginBottom: 4,
  },
  bulletPoint: {
    fontSize: 9,
    color: '#444444',
    marginBottom: 2,
    paddingLeft: 10,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    marginTop: 5,
  },
  tag: {
    fontSize: 8,
    backgroundColor: TAG_BG,
    color: TAG_FG,
    padding: '2 6',
    borderRadius: 3,
  },

  // Skills
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skill: {
    fontSize: 8,
    backgroundColor: SKILL_BG,
    color: '#444444',
    padding: '2 7',
    borderRadius: 3,
    border: `1 solid ${SKILL_BORDER}`,
  },

  // Education row: year left + content right
  eduRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 10,
  },
  eduYear: {
    width: 72,
    fontSize: 8,
    color: '#aaaaaa',
    paddingTop: 1,
  },
  eduBody: {
    flex: 1,
  },
  eduDegree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: FOREGROUND,
    marginBottom: 1,
  },
  eduInstitution: {
    fontSize: 9,
    color: MUTED_FG,
  },

  // Languages
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    fontSize: 9,
  },
  langName: {
    fontWeight: 'bold',
    color: FOREGROUND,
  },
  langLevel: {
    color: MUTED_FG,
  },
});

export function CVPdfTemplate({ profile, experiences, skills, education, languages }: CVPdfTemplateProps) {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  const email = profile.social.find(s => s.platform.toLowerCase() === 'email')?.url.replace('mailto:', '');
  const linkedin = profile.social.find(s => s.platform.toLowerCase() === 'linkedin')?.url.replace('https://', '');
  const github = profile.social.find(s => s.platform.toLowerCase() === 'github')?.url.replace('https://', '');

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          {profile.photo && (
            <Image src={profile.photo} style={styles.avatar} />
          )}
          <View style={styles.headerText}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.jobTitle}>{profile.title}</Text>
            <View style={styles.contacts}>
              {profile.location && <Text>{profile.location}</Text>}
              {email && <Text>{email}</Text>}
              {linkedin && <Text>{linkedin}</Text>}
              {github && <Text>{github}</Text>}
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Professional Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {experiences.map((exp) => (
            <View key={exp.id} style={styles.expRow}>
              <Text style={styles.expDates}>
                {exp.startDate}{'\n'}{exp.endDate ?? 'Present'}
              </Text>
              <View style={styles.expBody}>
                <Text style={styles.expCompany}>{exp.company}</Text>
                <Text style={styles.expRole}>{exp.role}</Text>
                {exp.description.map((item, idx) => (
                  <Text key={idx} style={styles.bulletPoint}>• {item}</Text>
                ))}
                {exp.tags && exp.tags.length > 0 && (
                  <View style={styles.tags}>
                    {exp.tags.map((tag, idx) => (
                      <Text key={idx} style={styles.tag}>{tag}</Text>
                    ))}
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {Object.entries(groupedSkills).map(([category, skillList]) => (
            <View key={category} style={{ marginBottom: 6 }}>
              <Text style={{ fontSize: 8, color: MUTED_FG, marginBottom: 3 }}>{category}</Text>
              <View style={styles.skillsRow}>
                {skillList.map((name, idx) => (
                  <Text key={idx} style={styles.skill}>{name}</Text>
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
              ? `${edu.startYear} – ${edu.endYear}`
              : edu.startYear;
            return (
              <View key={edu.id} style={styles.eduRow}>
                <Text style={styles.eduYear}>{yearDisplay}</Text>
                <View style={styles.eduBody}>
                  {edu.description && (
                    <Text style={styles.eduDegree}>{edu.description}</Text>
                  )}
                  <Text style={edu.description ? { fontSize: 9, color: MUTED_FG, marginBottom: 1 } : styles.eduDegree}>
                    {edu.degree}
                  </Text>
                  <Text style={styles.eduInstitution}>{edu.institution}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Languages */}
        {languages && languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {languages.map((lang, idx) => (
              <View key={idx} style={styles.langRow}>
                <Text style={styles.langName}>{lang.name}</Text>
                <Text style={styles.langLevel}>{lang.level}</Text>
              </View>
            ))}
          </View>
        )}

      </Page>
    </Document>
  );
}
