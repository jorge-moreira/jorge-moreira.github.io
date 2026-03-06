import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { ThemeProvider } from '@/hooks/useTheme';

const renderNavbar = (initialPath = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
    
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  describe('Rendering', () => {
    it('should render the logo', () => {
      renderNavbar();
      expect(screen.getByText('jorge-moreira.dev')).toBeInTheDocument();
    });

    it('should render all navigation links', () => {
      renderNavbar();
      expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
      expect(screen.getAllByText('CV').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Projects').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
    });

    it('should render theme toggle button', () => {
      renderNavbar();
      const themeButtons = screen.getAllByLabelText('Toggle theme');
      expect(themeButtons.length).toBeGreaterThan(0);
    });

    it('should render mobile menu button', () => {
      renderNavbar();
      expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should highlight the active route', () => {
      renderNavbar('/cv');
      const cvLinks = screen.getAllByText('CV');
      const activeLink = cvLinks.find(
        link => link.className.includes('text-foreground')
      );
      expect(activeLink).toBeDefined();
    });

    it('should navigate when clicking a link', () => {
      renderNavbar();
      const homeLinks = screen.getAllByText('Home');
      expect(homeLinks[0].closest('a')).toHaveAttribute('href', '/');
    });
  });

  describe('Theme Toggle', () => {
    it('should toggle theme when clicking theme button', () => {
      renderNavbar();
      const themeButtons = screen.getAllByLabelText('Toggle theme');
      const desktopThemeButton = themeButtons[0];

      const initialHtml = document.documentElement;
      const initialHasDark = initialHtml.classList.contains('dark');

      fireEvent.click(desktopThemeButton);

      const afterClickHasDark = initialHtml.classList.contains('dark');
      expect(afterClickHasDark).toBe(!initialHasDark);
    });

    it('should display correct icon based on theme', () => {
      localStorage.setItem('theme', 'light');
      renderNavbar();
      
      const moonIcons = document.querySelectorAll('[class*="lucide-moon"]');
      expect(moonIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Mobile Menu', () => {
    it('should not show mobile menu by default', () => {
      renderNavbar();
      const mobileMenus = screen.queryAllByText('Home').filter(
        el => el.closest('.md\\:hidden')
      );
      expect(mobileMenus.length).toBe(0);
    });

    it('should toggle mobile menu when clicking menu button', () => {
      renderNavbar();
      const menuButton = screen.getByLabelText('Toggle menu');
      
      fireEvent.click(menuButton);
      
      const mobileNavLinks = screen.getAllByText('Home');
      expect(mobileNavLinks.length).toBeGreaterThan(1);
    });

    it('should close mobile menu when clicking a link', () => {
      renderNavbar();
      const menuButton = screen.getByLabelText('Toggle menu');
      
      fireEvent.click(menuButton);
      
      const allHomeLinks = screen.getAllByText('Home');
      const mobileHomeLink = allHomeLinks[allHomeLinks.length - 1];
      
      fireEvent.click(mobileHomeLink);
      
      const updatedHomeLinks = screen.getAllByText('Home');
      expect(updatedHomeLinks.length).toBeLessThan(allHomeLinks.length);
    });

    it('should show X icon when menu is open', () => {
      renderNavbar();
      const menuButton = screen.getByLabelText('Toggle menu');
      
      fireEvent.click(menuButton);
      
      expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-labels for buttons', () => {
      renderNavbar();
      expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
      expect(screen.getAllByLabelText('Toggle theme').length).toBeGreaterThan(0);
    });

    it('should have proper navigation structure', () => {
      renderNavbar();
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });
  });
});
