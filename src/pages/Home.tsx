import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-20">
        <div className="max-w-2xl w-full space-y-8">
          {/* Profile Photo - Mobile Only */}
          <div className="lg:hidden w-24 h-24 rounded-full overflow-hidden border-2 border-border mx-auto">
            <img 
              src={profile.photo} 
              alt={profile.name}
              className="w-full h-full object-cover scale-125"
            />
          </div>

          {/* Name and Title */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              {profile.name}
            </h1>
            <h2 className="text-2xl sm:text-3xl text-muted-foreground font-light">
              {profile.title}
            </h2>
          </div>

          {/* Bio */}
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            {profile.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg" className="text-base">
              <Link to="/cv">View CV</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link to="/projects">See Projects</Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 pt-4">
            {profile.social.map((link) => {
              const Icon = socialIcons[link.icon as keyof typeof socialIcons];
              return Icon ? (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.platform}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ) : null;
            })}
          </div>

          {/* What I Care About */}
          {profile.carePriorities && profile.carePriorities.length > 0 && (
            <div className="space-y-3 pt-8 border-t">
              <h3 className="text-xl font-semibold">What I Care About</h3>
              <ul className="space-y-2">
                {profile.carePriorities.map((priority, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="text-primary mt-1.5">•</span>
                    <span>{priority}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Profile Sidebar - Desktop Only */}
      <div className="hidden lg:block lg:w-[400px] xl:w-[450px] bg-muted/30 px-6 py-12 lg:py-20 border-l">
        <div className="max-w-sm mx-auto space-y-6">
          {/* Profile Photo */}
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-2 border-border">
            <img 
              src={profile.photo} 
              alt={profile.name}
              className="w-full h-full object-cover scale-125"
            />
          </div>

          {/* Info Cards */}
          <div className="space-y-4">
            {/* Location Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="h-4 w-4 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {profile.location}
                </p>
              </CardContent>
            </Card>

            {/* Current Role Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Briefcase className="h-4 w-4 text-primary" />
                  Current Role
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {profile.currentRole}
                </p>
              </CardContent>
            </Card>

            {/* Focus Areas Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Focus Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.focusAreas.map((area, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
