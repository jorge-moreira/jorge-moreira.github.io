import { useEffect, useState } from 'react';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getDataSource } from '@/repositories/DataSourceFactory';
import type { Profile, SocialLink } from '@/models/Profile';

const iconMap = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
};

export default function Contact() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const dataSource = getDataSource();
        const data = await dataSource.getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const getSocialValue = (link: SocialLink): string => {
    if (link.platform.toLowerCase() === 'mail') {
      return link.url.replace('mailto:', '');
    }
    try {
      const url = new URL(link.url);
      return url.hostname + url.pathname;
    } catch {
      return link.url;
    }
  };

  const getIcon = (platform: string) => {
    const key = platform.toLowerCase() as keyof typeof iconMap;
    const Icon = iconMap[key] || ExternalLink;
    return Icon;
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Contact</h1>
        <p className="text-lg text-muted-foreground">Let's connect</p>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        {profile?.social.map((link, index) => {
          const Icon = getIcon(link.icon);
          const isMailto = link.url.startsWith('mailto:');

          return (
            <a
              key={index}
              href={link.url}
              target={isMailto ? undefined : '_blank'}
              rel={isMailto ? undefined : 'noopener noreferrer'}
              className="block group"
            >
              <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-lg mb-1 capitalize">
                        {link.platform}
                      </div>
                      <div className="text-sm text-muted-foreground break-all">
                        {getSocialValue(link)}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            </a>
          );
        })}
      </div>
    </div>
  );
}
