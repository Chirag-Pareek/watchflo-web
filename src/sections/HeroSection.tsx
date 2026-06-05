import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import PhoneMockup from '@/components/PhoneMockup';
import { useTheme } from '@/hooks/useTheme';
import EarlyAccessModal from '@/components/EarlyAccessModal';

interface HeroSectionProps {
  isLoaded: boolean;
  lenisRef: React.MutableRefObject<any>;
}

export default function HeroSection({ isLoaded, lenisRef }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLight = theme === 'light';
  const heroScreenshot = isLight 
    ? '/screenshots/light screenshot/Screenshot_20260528_222040.jpg' 
    : '/screenshots/dark screenshot/Screenshot_20260528_220609.jpg';

  useEffect(() => {
    if (!isLoaded) return;
    const tl = gsap.timeline({ delay: 0.1 });

    if (textRef.current) {
      const els = textRef.current.children;
      gsap.set(els, { opacity: 0, y: 40 });
      tl.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' });
    }

    if (mockupRef.current) {
      gsap.set(mockupRef.current, { opacity: 0, y: 60 });
      tl.to(mockupRef.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.8');
    }

    return () => { tl.kill(); };
  }, [isLoaded]);

  const handleDownload = () => {
    if (lenisRef.current) lenisRef.current.scrollTo('#cta', { offset: -85 });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-32 pb-20 md:pt-44 md:pb-36 flex items-center overflow-hidden"
      style={{ minHeight: '100dvh', backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center gap-20 md:gap-32">
        
        {/* Left Column: Text & CTA */}
        <div ref={textRef} className="flex-1 flex flex-col items-start text-left z-10 pt-6 md:pt-0">
          {/* Announcement Pill */}
          <div 
            className="mb-6 flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase"
            style={{ 
              border: '1px solid var(--border-subtle)', 
              backgroundColor: 'var(--bg-card)', 
              color: 'var(--text-secondary)' 
            }}
          >
            <span>Introducing WatchFlo</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </div>

          <div className="w-full flex flex-col select-none mb-6">
            {/* Line 1: WatchFlo + Line */}
            <div className="flex items-center w-full gap-4">
              <span 
                className="font-pixel font-bold tracking-wide uppercase leading-none" 
                style={{ 
                  fontSize: 'clamp(2rem, 8vw, 4.75rem)', 
                  color: 'var(--text-primary)'
                }}
              >
                WatchFlo
              </span>
              <div className="h-[2px] flex-1 min-w-[40px] mt-2" style={{ backgroundColor: 'var(--border-strong)' }}></div>
            </div>

            {/* Line 2: intentional. */}
            <span 
              className="font-italic-serif leading-none font-normal mt-2 self-end" 
              style={{ 
                fontSize: 'clamp(2.5rem, 10vw, 6.75rem)', 
                color: 'var(--text-primary)'
              }}
            >
              reclaimed.
            </span>
          </div>
          
          <p
            className="font-medium"
            style={{
              fontSize: 'clamp(1.025rem, 1.5vw, 1.15rem)',
              lineHeight: 1.55,
              maxWidth: '460px',
              color: 'var(--text-secondary)'
            }}
          >
            Take back your time with a beautifully designed, AI-driven YouTube companion. Generate instant summaries, curate distraction-free feeds, and lock in your focus like never before.
          </p>

          <div className="mt-8 md:mt-10 flex flex-col items-start gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                style={{
                  fontSize: '15px',
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                }}
              >
                Coming Soon
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-[var(--bg-card-hover)] cursor-pointer"
                style={{
                  fontSize: '15px',
                  borderColor: 'var(--border-strong)',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                }}
              >
                Become a Tester
              </button>
            </div>

            <p
              className="text-xs font-mono"
              style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}
            >
              Join the waitlist to become an early tester and shape the distraction-free Android experience.
            </p>
          </div>
        </div>

        {/* Right Column: Phone Mockup */}
        <div ref={mockupRef} className="flex-1 flex justify-center md:justify-end z-10 w-full mt-8 md:mt-0">
          <PhoneMockup width={300} screenshotSrc={heroScreenshot} />
        </div>

      </div>

      {/* Early Access Modal */}
      <EarlyAccessModal isOpen={isModalOpen} onClose={setIsModalOpen} />
    </section>
  );
}
