import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Github, Linkedin, FileText, FolderGit2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getDataSource } from "@/repositories/DataSourceFactory";
import type { Profile } from "@/models/Profile";

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const dataSource = getDataSource();
        const data = await dataSource.getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Failed to load profile data.</p>
      </div>
    );
  }

  const socialIcons = {
    mail: Mail,
    github: Github,
    linkedin: Linkedin,
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-6 md:py-10">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-16 items-start">

        {/* Left Column */}
        <div className="flex-1 space-y-8">
          {/* Profile Photo - Mobile Only */}
          <div className="lg:hidden w-32 h-32 rounded-full overflow-hidden mx-auto">
            <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover scale-125" />
          </div>

          {/* Name and Title */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight">
              {profile.name}
            </h1>
            <h2 className="text-2xl sm:text-3xl text-muted-foreground font-extralight">
              {profile.title}
            </h2>
          </div>

          {/* Bio */}
          <div className="space-y-3 text-lg leading-relaxed text-muted-foreground">
            {profile.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/cv"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-md text-base font-normal transition-colors bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100"
            >
              <FileText className="h-4 w-4 mr-2"/> View CV
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-md text-base font-normal transition-colors bg-slate-500 text-white hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
            >
              <FolderGit2 className="h-4 w-4 mr-2"/>Check Projects
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-5">
            {profile.social.map((link) => {
              const Icon = socialIcons[link.icon as keyof typeof socialIcons];
              return Icon ? (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground social-icon transition-colors"
                  aria-label={link.platform}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ) : null;
            })}
          </div>

          {/* What I Stand For */}
          {profile.carePriorities && profile.carePriorities.length > 0 && (
            <div className="space-y-3">
              <p className="text-lg font-semibold">What I stand for</p>
              <ul className="space-y-2">
                {profile.carePriorities.map((priority, index) => (
                  <li key={index} className="flex items-start gap-2 text-base font-extralight text-muted-foreground">
                    <span className="mt-0.5">→</span>
                    <span>{priority}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Sidebar - Desktop Only */}
        <div className="hidden lg:flex flex-col lg:w-60 space-y-6">
          {/* Profile Photo */}
          <div className="w-38 h-38 rounded-full overflow-hidden">
            <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover scale-125" />
          </div>

          {/* Meta info */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-0.5">Location</p>
              <p className="text-sm font-extralight">{profile.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-0.5">Current role</p>
              <p className="text-sm font-extralight">{profile.currentRole}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-0.5">Focus areas</p>
              <p className="text-sm font-extralight">
                {profile.focusAreas.join(' · ')}
              </p>
            </div>
          </div>

          {/* Separator */}
          <Separator className="bg-slate-300 dark:bg-slate-600"/>

          {/* Beyond the keyboard */}
          {profile.interests && profile.interests.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-semibold">Beyond the keyboard</p>
              <p className="text-sm font-extralight text-muted-foreground leading-relaxed">
                {profile.interests.join('. ')}.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
