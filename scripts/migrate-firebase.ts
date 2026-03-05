// Script to migrate data from Firebase to JSON files
const FIREBASE_URL = 'https://jorge-moreira-github-default-rtdb.europe-west1.firebasedatabase.app';

async function fetchData(collection: string) {
  const response = await fetch(`${FIREBASE_URL}/${collection}.json`);
  return response.json();
}

function transformProfile(data: any) {
  return {
    name: data.name,
    title: data.title,
    bio: [
      "I'm a Software Engineer with experience building scalable systems and leading technical initiatives.",
      "Currently working at Planet, I focus on delivering high-quality software solutions.",
      "Passionate about clean code, best practices, and continuous learning."
    ],
    photo: "/profile-photo.jpg",
    location: "Porto, Portugal",
    currentRole: data.title,
    focusAreas: ["Software Engineering", "System Design", "Cloud Architecture", "Team Collaboration"],
    social: [],
    carePriorities: [
      "Building reliable and maintainable systems",
      "Continuous learning and improvement",
      "Collaboration and knowledge sharing"
    ]
  };
}

function transformExperiences(data: any[]) {
  return data
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .map((exp, index) => ({
      id: String(index + 1),
      company: exp.companyName,
      role: exp.title,
      startDate: new Date(exp.startDate).getFullYear().toString(),
      endDate: exp.endDate ? new Date(exp.endDate).getFullYear().toString() : null,
      description: [
        `Worked as ${exp.title} at ${exp.companyName}`,
        "Key responsibilities and achievements to be detailed",
        "Technologies and methodologies used"
      ],
      tags: index < 2 ? ["Engineering", "Leadership"] : ["Engineering"]
    }));
}

function transformSkills(data: any[]) {
  const skillCategories: Record<string, string> = {
    "C#": "Languages",
    "Java": "Languages",
    "SQL": "Languages",
    "Docker": "Tools",
    "Jenkins": "Tools",
    "Git": "Tools",
    "OpenAPI": "Tools",
    "TDD": "Methodologies",
    "DDD": "Methodologies"
  };

  return data.map(skill => ({
    name: skill.name,
    category: skillCategories[skill.name] || "Other"
  }));
}

function transformEducation(data: any[]) {
  return data.map((edu, index) => {
    const startYear = new Date(edu.startDate).getFullYear().toString();
    const endYear = new Date(edu.endDate).getFullYear().toString();
    
    return {
      id: String(index + 1),
      institution: edu.educationalInstitution,
      degree: edu.degree,
      description: edu.studyArea,
      startYear,
      endYear: startYear === endYear ? undefined : endYear
    };
  });
}

function transformContacts(data: any[]) {
  const iconMap: Record<string, string> = {
    email: "mail",
    linked_in: "linkedin",
    github: "github"
  };

  return data.map(contact => ({
    platform: contact.key === "linked_in" ? "LinkedIn" : contact.key === "github" ? "GitHub" : "Email",
    url: contact.link,
    icon: iconMap[contact.key] || contact.key
  }));
}

async function migrateData() {
  console.log('Fetching data from Firebase...');

  const [profile, experiences, skills, education, contacts] = await Promise.all([
    fetchData('profile'),
    fetchData('work_experiences'),
    fetchData('software_skills'),
    fetchData('education'),
    fetchData('contacts')
  ]);

  console.log('Transforming data...');

  const transformedProfile = transformProfile(profile);
  transformedProfile.social = transformContacts(contacts);

  const transformedData = {
    profile: transformedProfile,
    experiences: transformExperiences(experiences),
    skills: transformSkills(skills),
    education: transformEducation(education),
    projects: [
      {
        id: "1",
        title: "Personal Portfolio",
        purpose: "Modern portfolio website showcasing my work and experience",
        techStack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
        company: null,
        link: "https://jorge-moreira.github.io"
      }
    ]
  };

  console.log('Writing files...');

  await Bun.write('public/data/profile.json', JSON.stringify(transformedData.profile, null, 2));
  await Bun.write('public/data/experiences.json', JSON.stringify(transformedData.experiences, null, 2));
  await Bun.write('public/data/skills.json', JSON.stringify(transformedData.skills, null, 2));
  await Bun.write('public/data/education.json', JSON.stringify(transformedData.education, null, 2));
  await Bun.write('public/data/projects.json', JSON.stringify(transformedData.projects, null, 2));

  console.log('✅ Migration complete!');
  console.log('Files created:');
  console.log('- public/data/profile.json');
  console.log('- public/data/experiences.json');
  console.log('- public/data/skills.json');
  console.log('- public/data/education.json');
  console.log('- public/data/projects.json');
}

migrateData().catch(console.error);
