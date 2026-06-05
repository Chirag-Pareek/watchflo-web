import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/hooks/useTheme';
import ThemeToggle from '@/components/ThemeToggle';

gsap.registerPlugin(ScrollTrigger);

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>;
}

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Founder', href: '#founder' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navigation({ lenisRef }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Scroll trigger for scrolled background style
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: '50vh top',
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    // Listener for reveal on scroll up, hide on scroll down
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setVisible(false); // Hide on scroll down
      } else {
        setVisible(true); // Show on scroll up
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      trigger.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      if (lenisRef.current) lenisRef.current.scrollTo(href, { offset: -80 });
    } else {
      navigate('/' + href);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between"
        style={{
          padding: '0 max(24px, calc((100vw - 1200px) / 2 + 24px))',
          backgroundColor: scrolled ? 'var(--bg-primary)' : 'transparent',
          opacity: scrolled ? 0.95 : 1,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
          transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s, border-color 0.4s',
          willChange: 'transform',
        }}
      >
        {/* Left: Logo */}
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              if (lenisRef.current) lenisRef.current.scrollTo(0);
            }
          }}
          className="flex items-center gap-3 flex-shrink-0 w-40"
        >
          <img src="/watchflo_logo.png" alt="WatchFlo" className="w-8 h-8 rounded-lg" style={{ border: '1px solid var(--border-subtle)' }} />
          <span className="font-heading font-bold text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>
            WatchFlo
          </span>
        </Link>

        {/* Center: Links */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="font-heading text-[15px] font-medium cursor-pointer transition-colors duration-300"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right: CTA Button & Theme Toggle */}
        <div className="hidden md:flex items-center justify-end flex-shrink-0 gap-5 w-56">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            onClick={() => handleNavClick('#cta')}
            className="px-5 py-2.5 rounded-full font-bold text-sm cursor-pointer transition-transform hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-primary)',
            }}
          >
            Get WatchFlo
          </button>
        </div>

        {/* Mobile Toggle & Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            className="flex flex-col gap-1.5 cursor-pointer p-2"
            onClick={() => setMenuOpen(true)}
          >
            <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: 'var(--text-primary)' }} />
            <span className="block w-5 h-[2px] rounded-full" style={{ backgroundColor: 'var(--text-primary)' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col p-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="flex justify-end">
            <button onClick={() => setMenuOpen(false)} className="p-2 cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="font-heading text-2xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#cta')}
              className="px-8 py-4 rounded-full font-bold mt-4"
              style={{
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-primary)',
              }}
            >
              Get WatchFlo
            </button>
          </div>
        </div>
      )}
    </>
  );
}
