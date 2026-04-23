import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icons } from '@/lib/icons';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { effectiveTheme, setTheme } = useTheme();
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(effectiveTheme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'CV', path: '/cv' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 w-full shadow-sm dark:shadow backdrop-blur-md" style={{ backgroundColor: 'hsl(var(--color-navbar) / 0.85)' }}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl font-normal hover:opacity-80 transition-opacity"
            >
              jorge-moreira.dev
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium nav-link transition-colors ${isActive(link.path)
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {effectiveTheme === 'dark' ? (
                  <FontAwesomeIcon icon={Icons.Sun} />
                ) : (
                  <FontAwesomeIcon icon={Icons.Moon} />
                )}
              </Button>
            </div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {effectiveTheme === 'dark' ? (
                  <FontAwesomeIcon icon={Icons.Sun} />
                ) : (
                  <FontAwesomeIcon icon={Icons.Moon} />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FontAwesomeIcon icon={Icons.Close} className="!h-5 !w-5" />
                ) : (
                  <FontAwesomeIcon icon={Icons.Menu} className="!h-5 !w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu panel — fixed just below the navbar */}
          <div
            className="fixed top-16 left-0 right-0 z-50 md:hidden shadow-sm dark:shadow backdrop-blur-md"
            style={{ backgroundColor: 'hsl(var(--color-navbar) / 0.85)' }}
          >
            <div className="border-t w-full" />
            <div className="flex flex-col py-2 px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-4 text-base font-medium nav-link transition-colors ${isActive(link.path)
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
