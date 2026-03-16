import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '@/hooks/useTheme';

const pageTitles: Record<string, string> = {
  '/': 'Home',
  '/cv': 'CV',
  '/projects': 'Projects',
  '/contact': 'Contact',
};

export default function Layout() {
  const location = useLocation();
  const { effectiveTheme } = useTheme();

  useEffect(() => {
    const pageTitle = pageTitles[location.pathname] ?? 'Jorge Moreira';
    document.title = `${pageTitle} | Jorge Moreira`;
  }, [location.pathname]);

  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (favicon) {
      favicon.href = effectiveTheme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg';
    }
  }, [effectiveTheme]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 animate-fadeIn">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
