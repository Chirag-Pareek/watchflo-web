import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: '01',
    title: 'Sync your universe',
    description: 'Link your YouTube account securely. WatchFlo seamlessly imports your subscriptions, watch history, and personal preferences.',
  },
  {
    number: '02',
    title: 'Design your focus',
    description: 'Choose what you want to achieve today—learn, stay informed, or unwind. WatchFlo tailors your feeds to match your goals.',
  },
  {
    number: '03',
    title: 'Engage with purpose',
    description: 'Read concise AI summaries before hitting play, lock in distraction-free focus sessions, and visualize your productive watch time.',
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      const els = headerRef.current.children;
      gsap.set(els, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' });
        },
      });
    }

    if (stepsRef.current) {
      const cards = stepsRef.current.querySelectorAll('.step-card');
      cards.forEach((card) => {
        gsap.set(card, { opacity: 0, y: 50 });
        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(card, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
          },
        });
      });
    }
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg-primary)', padding: '120px 0 60px' }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20 text-center flex flex-col items-center">
          <span
            className="font-mono uppercase tracking-[0.2em] block mb-4"
            style={{ fontSize: '10px', color: 'var(--text-muted)' }}
          >
            Workflow
          </span>
          <h2
            className="font-heading font-bold leading-tight"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              letterSpacing: '-0.04em',
              maxWidth: '800px',
              color: 'var(--text-primary)'
            }}
          >
            Your path to intentional viewing.
          </h2>
        </div>
 
        {/* Steps Grid */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="step-card flex flex-col p-6 md:p-10 rounded-[28px] transition-colors duration-300 hover:bg-[var(--bg-card-hover)]"
              style={{ 
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)' 
              }}
            >
              {/* Giant Number Outline */}
              <div className="mb-6 flex justify-between items-start">
                <span className="font-heading font-bold text-5xl font-mono tracking-tighter" style={{ color: 'var(--border-strong)' }}>
                  {step.number}
                </span>
                <span className="w-1.5 h-1.5 rounded-full mt-3" style={{ backgroundColor: 'var(--text-muted)' }} />
              </div>
 
              {/* Content */}
              <div className="flex flex-col gap-3">
                <h3
                  className="font-heading font-semibold text-lg tracking-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {step.title}
                </h3>
                <p className="text-[14px] leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
