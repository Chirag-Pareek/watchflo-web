import { useNavigate, useLocation } from 'react-router';

const LINK_GROUPS: Record<string, { label: string; href: string; isRoute?: boolean }[]> = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Founder', href: '#founder' },
  ],
  Resources: [
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy', isRoute: true },
    { label: 'Terms of Service', href: '/terms', isRoute: true },
  ],
  Connect: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/chirag-pareek-369b4b265/' },
    { label: 'Twitter / X', href: 'https://x.com/lchi_no' },
    { label: 'Email', href: 'mailto:chiragpareek677@gmail.com' },
  ],
};

interface FooterProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Footer({ lenisRef }: FooterProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (href: string, isRoute?: boolean) => {
    if (isRoute) {
      navigate(href);
    } else if (href.startsWith('#')) {
      if (location.pathname === '/') {
        if (lenisRef.current) lenisRef.current.scrollTo(href, { offset: -80 });
      } else {
        navigate('/' + href);
      }
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '100px 0 40px',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Top — tagline */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <img src="/watchflo_logo.png" alt="WatchFlo" className="w-8 h-8 rounded-lg border border-border" />
            <span className="font-heading font-bold text-lg text-primary" style={{ letterSpacing: '-0.02em' }}>
              WatchFlo
            </span>
          </div>
          <p
            className="font-heading font-semibold max-w-sm"
            style={{ fontSize: '22px', color: 'var(--text-secondary)', lineHeight: 1.3, letterSpacing: '-0.02em' }}
          >
            Your time is precious.
            <br />
            Spend it on what matters.
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {Object.entries(LINK_GROUPS).map(([group, links]) => (
            <div key={group}>
              <span
                className="font-mono uppercase tracking-[0.2em] block mb-5 font-semibold"
                style={{ fontSize: '9px', color: 'var(--text-muted)' }}
              >
                {group}
              </span>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleClick(link.href, link.isRoute)}
                      className="cursor-pointer transition-colors duration-300 font-medium text-primary/50 hover:text-primary"
                      style={{ fontSize: '14px' }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <span className="font-mono text-[11px] text-primary/30 tracking-wider">
            © {new Date().getFullYear()} WatchFlo. All rights reserved.
          </span>
          <span className="font-mono text-[11px] text-primary/30 tracking-wider">
            Intentionally Designed.
          </span>
        </div>
      </div>
    </footer>
  );
}
