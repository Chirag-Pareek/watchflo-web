import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTABannerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = [headlineRef.current, ctaRef.current].filter(Boolean);
    gsap.set(elements, { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 80%', once: true },
    });

    tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.6');

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg-primary)', padding: 'clamp(100px, 14vw, 180px) 0' }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <h2
          ref={headlineRef}
          className="font-heading font-bold leading-tight"
          style={{
            fontSize: 'clamp(2rem, 6.5vw, 5rem)',
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
          }}
        >
          Don't let algorithms dictate your time.
          <br />
          <span style={{ color: 'var(--text-secondary)' }}>Reclaim your attention today.</span>
        </h2>

        <div ref={ctaRef} className="mt-12 flex flex-col items-center">
          <button
            className="flex items-center gap-2.5 px-8 py-4 rounded-full font-bold cursor-pointer transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
            style={{
              fontSize: '16px',
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-primary)',
            }}
          >
            Coming Soon
          </button>
        </div>
      </div>
    </section>
  );
}
