import type { Theme } from '@/hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center w-16 h-8 rounded-full p-1 cursor-pointer transition-colors duration-400 flex-shrink-0"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Sliding indicator */}
      <div
        className="absolute w-6 h-6 rounded-full shadow-md transition-all duration-400"
        style={{
          backgroundColor: 'var(--text-primary)',
          top: '3px',
          left: '3px',
          transform: isDark ? 'translate3d(0, 0, 0)' : 'translate3d(32px, 0, 0)',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
      
      {/* Sun icon */}
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        className="absolute left-[8px] top-[8px] z-10 transition-colors duration-400"
        style={{ stroke: isDark ? 'var(--bg-primary)' : 'var(--text-muted)' }}
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      
      {/* Moon icon */}
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        className="absolute right-[8px] top-[8px] z-10 transition-colors duration-400"
        style={{ stroke: isDark ? 'var(--text-muted)' : 'var(--bg-primary)' }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
