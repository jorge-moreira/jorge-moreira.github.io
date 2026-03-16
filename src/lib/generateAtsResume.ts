import type { Profile } from '@/models/Profile';
import type { Experience } from '@/models/Experience';
import type { Skill } from '@/models/Skill';
import type { Education } from '@/models/Education';
import type { Language } from '@/models/Language';

const SEPARATOR = '─'.repeat(60);

function buildText(
  profile: Profile,
  experiences: Experience[],
  skills: Skill[],
  education: Education[],
  languages: Language[]
): string {
  const lines: string[] = [];

  // Header
  const email = profile.social.find(s => s.platform.toLowerCase() === 'email')?.url.replace('mailto:', '');
  const linkedin = profile.social.find(s => s.platform.toLowerCase() === 'linkedin')?.url;
  const contacts = [profile.location, email, linkedin].filter(Boolean).join(' | ');

  lines.push(profile.name.toUpperCase());
  lines.push(profile.title);
  lines.push(contacts);
  lines.push('');
  lines.push(SEPARATOR);

  // Summary
  if (profile.bio.length > 0) {
    lines.push('');
    lines.push('SUMMARY');
    lines.push('');
    profile.bio.forEach(p => lines.push(p));
    lines.push('');
    lines.push(SEPARATOR);
  }

  // Experience
  lines.push('');
  lines.push('EXPERIENCE');
  lines.push('');
  experiences.forEach(exp => {
    const dateRange = exp.endDate ? `${exp.startDate} - ${exp.endDate}` : `${exp.startDate} - Present`;
    lines.push(`${exp.company} | ${exp.role} | ${dateRange}`);
    if (exp.location) lines.push(`  ${exp.location}`);
    exp.description.forEach(item => lines.push(`  • ${item}`));
    if (exp.techStack && exp.techStack.length > 0) {
      lines.push(`  Technologies: ${exp.techStack.join(', ')}`);
    }
    lines.push('');
  });
  lines.push(SEPARATOR);

  // Skills
  lines.push('');
  lines.push('SKILLS');
  lines.push('');
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);
  Object.entries(grouped).forEach(([category, names]) => {
    lines.push(`${category}: ${names.join(', ')}`);
  });
  lines.push('');
  lines.push(SEPARATOR);

  // Education
  lines.push('');
  lines.push('EDUCATION');
  lines.push('');
  education.forEach(edu => {
    const years = edu.endYear && edu.startYear !== edu.endYear
      ? `${edu.startYear} - ${edu.endYear}`
      : edu.startYear;
    lines.push(`${edu.degree} | ${edu.institution} | ${years}`);
    if (edu.description) lines.push(`  ${edu.description}`);
    lines.push('');
  });
  lines.push(SEPARATOR);

  // Languages
  if (languages.length > 0) {
    lines.push('');
    lines.push('LANGUAGES');
    lines.push('');
    languages.forEach(lang => lines.push(`${lang.name} — ${lang.level}`));
    lines.push('');
  }

  return lines.join('\n');
}

export async function generateAtsResume(
  profile: Profile,
  experiences: Experience[],
  skills: Skill[],
  education: Education[],
  languages: Language[]
): Promise<void> {
  const text = buildText(profile, experiences, skills, education, languages);
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${profile.name.replace(/\s+/g, '-')}-ATS-Resume.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
