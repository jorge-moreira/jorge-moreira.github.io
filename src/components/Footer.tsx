import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icons } from '../lib/icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          {/* Left: Copyright */}
          <p className="text-gray-400">© {currentYear} Jorge Moreira</p>
          
          {/* Right: Social links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://www.linkedin.com/in/jorge-moreira/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon transition-colors"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={Icons.Linkedin} className="!h-6 !w-6" />
            </a>
            <a 
              href="https://github.com/Jorge-Moreira" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon transition-colors"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={Icons.Github}  className="!h-6 !w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
