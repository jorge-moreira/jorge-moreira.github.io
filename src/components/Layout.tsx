import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const pageTitles: Record<string, string> = {
  '/': 'Home',
  '/cv': 'CV',
  '/projects': 'Projects',
  '/contact': 'Contact',
};

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = pageTitles[location.pathname] ?? 'Jorge Moreira';
    document.title = `${pageTitle} | Jorge Moreira`;
  }, [location.pathname]);

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
