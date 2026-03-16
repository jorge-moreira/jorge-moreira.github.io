export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string[];
  photo: string;
  location: string;
  currentRole: string;
  focusAreas: string[];
  social: SocialLink[];
  carePriorities?: string[];
  interests?: string[];
}
