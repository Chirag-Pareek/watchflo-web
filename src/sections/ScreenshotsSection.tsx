import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PhoneMockup from '@/components/PhoneMockup';
import type { WireframeType } from '@/components/PhoneMockup';
import { useTheme } from '@/hooks/useTheme';

gsap.registerPlugin(ScrollTrigger);

interface ScreenshotItem {
  label: string;
  wireframeType: WireframeType;
  screenshotSrc?: string;
}

const WIREFRAME_SCREENS: ScreenshotItem[] = [
  { label: 'Home Feed', wireframeType: 'feed', screenshotSrc: '/screenshots/dark screenshot/Screenshot_20260528_220609.jpg' },
  { label: 'AI Actions', wireframeType: 'player', screenshotSrc: '/screenshots/dark screenshot/Screenshot_20260528_220623.jpg' },
  { label: 'AI Chatbot', wireframeType: 'summary', screenshotSrc: '/screenshots/dark screenshot/Screenshot_20260528_220633.jpg' },
  { label: 'Screen Time', wireframeType: 'charts', screenshotSrc: '/screenshots/dark screenshot/Screenshot_20260528_220654.jpg' },
  { label: 'Focus Score', wireframeType: 'feed', screenshotSrc: '/screenshots/dark screenshot/Screenshot_20260528_220708.jpg' },
  { label: 'User Profile', wireframeType: 'feed', screenshotSrc: '/screenshots/dark screenshot/Screenshot_20260528_220809.jpg' },
  { label: 'Manage Subscribers', wireframeType: 'feed', screenshotSrc: '/screenshots/dark screenshot/Screenshot_20260528_220822.jpg' },
  { label: 'AI Suggestions', wireframeType: 'feed', screenshotSrc: '/screenshots/dark screenshot/Screenshot_20260528_220839.jpg' },
  { label: 'Focus Setup', wireframeType: 'timers', screenshotSrc: '/screenshots/dark screenshot/Screenshot_20260528_220925.jpg' },
];

const SCREENSHOT_MAP: Record<string, string> = {
  'Screenshot_20260528_220609.jpg': 'Screenshot_20260528_222040.jpg', // Home Feed
  'Screenshot_20260528_220623.jpg': 'Screenshot_20260528_222114.jpg', // AI Actions
  'Screenshot_20260528_220633.jpg': 'Screenshot_20260528_222029.jpg', // AI Chatbot
  'Screenshot_20260528_220654.jpg': 'Screenshot_20260528_220956.jpg', // Screen Time
  'Screenshot_20260528_220708.jpg': 'Screenshot_20260528_221945.jpg', // Focus Score
  'Screenshot_20260528_220809.jpg': 'Screenshot_20260528_222009.jpg', // User Profile
  'Screenshot_20260528_220822.jpg': 'Screenshot_20260528_222604.jpg', // Manage Subscribers
  'Screenshot_20260528_220839.jpg': 'Screenshot_20260528_221959.jpg', // AI Suggestions
  'Screenshot_20260528_220925.jpg': 'Screenshot_20260528_220946.jpg', // Focus Setup
};

const getThemeScreenshot = (darkPath: string | undefined, theme: string) => {
  if (!darkPath) return undefined;
  const isLight = theme === 'light';
  if (!isLight) return darkPath;
  const filename = darkPath.split('/').pop() || '';
  const lightFilename = SCREENSHOT_MAP[filename];
  if (!lightFilename) return darkPath;
  return `/screenshots/light screenshot/${lightFilename}`;
};

export default function ScreenshotsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Animate header entrance
    if (headerRef.current) {
      const els = headerRef.current.children;
      gsap.set(els, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(els, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' });
        },
      });
    }

    // Smooth scroll to the center on load
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setTimeout(() => {
        const targetScroll = (container.scrollWidth - container.clientWidth) / 2;
        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }, 500);
    }
  }, []);

  return (
    <section
      id="screenshots"
      style={{
        backgroundColor: 'var(--bg-primary)',
        padding: '100px 0',
      }}
    >
      {/* Header */}
      <div ref={headerRef} className="max-w-5xl mx-auto px-6 md:px-12 mb-16 md:mb-20 text-center flex flex-col items-center">
        <span
          className="font-mono uppercase tracking-[0.2em] block mb-4"
          style={{ fontSize: '10px', color: 'var(--text-muted)' }}
        >
          Gallery
        </span>
        <h2
          className="font-heading font-bold leading-tight tracking-tight"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            maxWidth: '540px',
            color: 'var(--text-primary)'
          }}
        >
          Crafted for deep focus.
        </h2>
        <p className="mt-3 font-medium" style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
          Discover the sleek, distraction-free interface of WatchFlo.
        </p>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollContainerRef}
        className="no-scrollbar"
        data-lenis-prevent
        style={{
          display: 'flex',
          gap: '28px',
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingLeft: 'max(24px, calc((100vw - 1200px) / 2 + 24px))',
          paddingRight: '6vw',
          paddingBottom: '32px',
          paddingTop: '8px',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {WIREFRAME_SCREENS.map((screen, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-4 gpu-accelerated"
            style={{
              flexShrink: 0,
              scrollSnapAlign: 'center',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate3d(0, -8px, 0)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate3d(0, 0, 0)'; }}
          >
            <PhoneMockup width={260} wireframeType={screen.wireframeType} screenshotSrc={getThemeScreenshot(screen.screenshotSrc, theme)} />
            <span className="font-mono text-[9px] uppercase tracking-wider font-semibold mt-1" style={{ color: 'var(--text-muted)' }}>
              {screen.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
