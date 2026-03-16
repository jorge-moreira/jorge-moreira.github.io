import { pdf } from '@react-pdf/renderer';
import { CVPdfTemplate } from '@/components/CVPdfTemplate';
import type { Profile } from '@/models/Profile';
import type { Experience } from '@/models/Experience';
import type { Skill } from '@/models/Skill';
import type { Education } from '@/models/Education';
import type { Language } from '@/models/Language';

export async function generateCVPdf(
  profile: Profile,
  experiences: Experience[],
  skills: Skill[],
  education: Education[],
  languages: Language[]
): Promise<void> {
  try {
    const blob = await pdf(
      CVPdfTemplate({ profile, experiences, skills, education, languages })
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.replace(/\s+/g, '-')}-CV.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}
