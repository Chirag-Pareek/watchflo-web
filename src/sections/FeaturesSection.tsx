import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PhoneMockup from '@/components/PhoneMockup';
import type { WireframeType } from '@/components/PhoneMockup';
import { useTheme } from '@/hooks/useTheme';

gsap.registerPlugin(ScrollTrigger);

interface FeatureItem {
  chip: string;
  title: string;
  desc: string;
  wireframeType: WireframeType;
  screenshotSrc?: string;
}

const BASICS_FEATURES: FeatureItem[] = [
  {
    chip: '[ Intention ]',
    title: 'Intention Feed',
    desc: 'Curated feeds that only show videos matching your daily learning or focus goals.',
    wireframeType: 'feed',
    screenshotSrc: '/screenshots/dark screenshot/Screenshot_20260528_220609.jpg',
  },
  {
    chip: '[ AI Suite ]',
    title: 'AI Video Actions',
    desc: 'Instantly summarize long videos, generate interactive quizzes to test your knowledge, and discover similar recommendations in one tap.',
    wireframeType: 'player',
    screenshotSrc: '/screenshots/dark screenshot/Screenshot_20260528_220623.jpg',
  },
  {
    chip: '[ Timer ]',
    title: 'Focus Alerts',
    desc: 'Custom timers that gently nudge you to log off when you hit your screen time limit.',
    wireframeType: 'timers',
    screenshotSrc: '/screenshots/dark screenshot/Screenshot_20260528_220925.jpg',
  },
];

const POWERFUL_FEATURES: FeatureItem[] = [
  {
    chip: '[ AI Summary ]',
    title: 'AI Summaries',
    desc: 'Get a comprehensive smart summary of long videos in under 10 seconds.',
    wireframeType: 'summary',
    screenshotSrc: '/screenshots/dark screenshot/Screenshot_20260528_220633.jpg',
  },
  {
    chip: '[ Sync ]',
    title: 'Manage Subscribers',
    desc: 'Easily toggle channels active or inactive to selectively filter high-value creators directly into your intention feed.',
    wireframeType: 'feed',
    screenshotSrc: '/screenshots/dark screenshot/Screenshot_20260528_220822.jpg',
  },
  {
    chip: '[ Analytics ]',
    title: 'Watch Analytics',
    desc: 'Sleek weekly breakdown of how much watch time was productive vs scrolling.',
    wireframeType: 'charts',
    screenshotSrc: '/screenshots/dark screenshot/Screenshot_20260528_220654.jpg',
  },
];

const SCREENSHOT_MAP: Record<string, string> = {
  'Screenshot_20260528_220609.jpg': 'Screenshot_20260528_222040.jpg', // Feed
  'Screenshot_20260528_220623.jpg': 'Screenshot_20260528_222114.jpg', // AI Actions
  'Screenshot_20260528_220925.jpg': 'Screenshot_20260528_220946.jpg', // Focus Setup (Timer)
  'Screenshot_20260528_220633.jpg': 'Screenshot_20260528_222029.jpg', // AI Summaries
  'Screenshot_20260528_220822.jpg': 'Screenshot_20260528_222604.jpg', // Manage Subscribers
  'Screenshot_20260528_220654.jpg': 'Screenshot_20260528_220956.jpg', // Watch Analytics
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

export default function FeaturesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const header2Ref = useRef<HTMLDivElement>(null);
  const grid2Ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const setupAnimation = (triggerRef: React.RefObject<any>, isGrid: boolean = false) => {
      if (!triggerRef.current) return;
      const els = isGrid ? triggerRef.current.querySelectorAll('.feature-card') : triggerRef.current.children;
      gsap.set(els, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(els, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' });
        },
      });
    };

    setupAnimation(headerRef);
    setupAnimation(gridRef, true);
    setupAnimation(header2Ref);
    setupAnimation(grid2Ref, true);
  }, []);

  const renderGrid = (features: FeatureItem[], ref: React.RefObject<any>) => {
    // Inner component to maintain local hover states cleanly
    function FeatureCardComponent({ feature }: { feature: FeatureItem }) {
      const [hovered, setHovered] = useState(false);

      return (
        <div 
          className="feature-card flex flex-col items-start text-left w-full cursor-pointer gpu-accelerated"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Bento Card container */}
          <div 
            className="w-full flex items-end justify-center rounded-[28px] overflow-hidden mb-6 relative gpu-accelerated"
            style={{
              backgroundColor: hovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
              border: hovered ? '1px solid var(--border-medium)' : '1px solid var(--border-subtle)',
              height: '420px',
              boxShadow: hovered ? 'var(--card-shadow-hover)' : 'none',
              transition: 'background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div 
              className="gpu-accelerated"
              style={{ 
                transform: hovered ? 'translate3d(0, 85px, 0) scale(1.08)' : 'translate3d(0, 85px, 0) scale(1)', 
                transformOrigin: 'bottom center',
                transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
                willChange: 'transform'
              }}
            >
              <PhoneMockup
                width={230}
                wireframeType={feature.wireframeType}
                screenshotSrc={getThemeScreenshot(feature.screenshotSrc, theme)}
              />
            </div>
          </div>
          
          {/* Label Chip */}
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 block mb-2" style={{ color: 'var(--text-muted)' }}>
            {feature.chip}
          </span>
          
          {/* Title */}
          <h3 className="font-heading font-bold text-xl mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-[14px] leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
            {feature.desc}
          </p>
        </div>
      );
    }

    return (
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, i) => (
          <FeatureCardComponent key={i} feature={feature} />
        ))}
      </div>
    );
  };

  return (
    <section
      id="features"
      style={{ backgroundColor: 'var(--bg-primary)', padding: '120px 0 60px' }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-32">
        
        {/* Block 1: Basics */}
        <div>
          <div ref={headerRef} className="mb-14 flex flex-col items-start text-left">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/40 block mb-3">
              Overview
            </span>
            <h2
              className="font-heading font-bold leading-[1.1] text-primary"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', letterSpacing: '-0.03em' }}
            >
              The basics, but better ✦
            </h2>
            <p className="mt-3 font-medium text-primary/60 max-w-lg" style={{ fontSize: '15px', lineHeight: 1.5 }}>
              Built from scratch so you will actually want to open it and build intentional habits.
            </p>
          </div>
          {renderGrid(BASICS_FEATURES, gridRef)}
        </div>

        {/* Block 2: Advanced */}
        <div>
          <div ref={header2Ref} className="mb-14 flex flex-col items-start text-left">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/40 block mb-3">
              Advanced
            </span>
            <h2
              className="font-heading font-bold leading-[1.1] text-primary"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', letterSpacing: '-0.03em' }}
            >
              Simple, but powerful ✺
            </h2>
            <p className="mt-3 font-medium text-primary/60 max-w-lg" style={{ fontSize: '15px', lineHeight: 1.5 }}>
              Almost all features can be turned on/off so you can make the app as simple (or powerful) as you need it to be.
            </p>
          </div>
          {renderGrid(POWERFUL_FEATURES, grid2Ref)}
        </div>

      </div>
    </section>
  );
}
