import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/hooks/useTheme';

gsap.registerPlugin(ScrollTrigger);

export default function PricingSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const isLight = theme === 'light';

  useEffect(() => {
    if (headerRef.current) {
      gsap.set(headerRef.current.children, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(headerRef.current!.children, {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out',
          });
        },
      });
    }
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.pricing-card');
      gsap.set(cards, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          });
        },
      });
    }
  }, []);

  const CheckIcon = ({ dark = false }: { dark?: boolean }) => (
    <div 
      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" 
      style={{ backgroundColor: dark ? '#000000' : '#FFFFFF' }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={dark ? '#FFFFFF' : '#000000'} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );

  return (
    <section id="pricing" style={{ backgroundColor: 'var(--bg-primary)', padding: '120px 0 60px' }}>
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center">
          <span
            className="font-mono uppercase tracking-[0.2em] block mb-4"
            style={{ fontSize: '10px', color: 'var(--text-muted)' }}
          >
            Pricing Plans
          </span>
          <h2
            className="font-heading font-bold text-4xl md:text-5xl text-primary tracking-tight"
            style={{ letterSpacing: '-0.04em' }}
          >
            Simple pricing
          </h2>
          <p className="text-[15px] mt-4 font-medium text-primary/50 max-w-lg">
            Choose the plan that fits your focus needs. Start for free and upgrade as you grow. ✧
          </p>
        </div>
 
        {/* Cards container */}
        <div ref={cardsRef} className="flex flex-col md:flex-row justify-center items-stretch gap-6 mt-14 w-full">
          
          {/* Free Card */}
          <div
            className="pricing-card relative rounded-[28px] p-8 transition-transform duration-300 hover:scale-[1.02] flex-1 flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <div className="h-[24px] mb-2 flex items-start">
                <span className="font-mono text-[9px] uppercase tracking-wider text-primary/40 font-semibold">Basic</span>
              </div>
              <h3 className="font-heading text-2xl font-bold mb-1 text-primary tracking-tight">Free</h3>
              <p className="text-xs text-primary/50 font-medium mb-6">Get started with the basics</p>
              
              <div className="mb-8 flex items-baseline">
                <span className="font-heading text-5xl font-bold tracking-tight text-primary font-mono">
                  $0
                </span>
                <span className="text-sm font-medium ml-1.5 text-primary/40">/month</span>
              </div>
 
              <ul className="space-y-4 flex-1">
                {[
                  '20 AI Credits / week',
                  '20 Channels limit',
                  'Basic AI Summaries',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[13px] font-medium text-primary/75">
                    <CheckIcon dark={isLight} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
 
          {/* Pro Card (High Contrast) */}
          <div
            className="pricing-card relative rounded-[28px] p-8 transition-transform duration-300 hover:scale-[1.02] flex-1 flex flex-col justify-between z-10"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              boxShadow: 'var(--card-shadow)',
              border: '1px solid var(--border-strong)'
            }}
          >
            <div>
              <div className="h-[24px] flex justify-between items-start mb-2">
                <span className="font-mono text-[9px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-muted)' }}>Popular</span>
                <span className="font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}>Save ~20%</span>
              </div>
              <h3 className="font-heading text-2xl font-bold mb-1 tracking-tight text-primary">Pro</h3>
              <p className="text-xs font-medium mb-6" style={{ color: 'var(--text-secondary)' }}>Everything you need to grow</p>
              
              <div className="mb-8 flex items-baseline">
                <span className="font-heading text-5xl font-bold tracking-tight font-mono text-primary">
                  $4.99
                </span>
                <span className="text-sm font-medium ml-1.5 text-primary/40">/month</span>
              </div>
 
              <ul className="space-y-4 flex-1">
                {[
                  '200 AI Credits / week',
                  '100 Channels limit',
                  'Full AI Summaries',
                  'Watch Queue feature',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[13px] font-medium text-primary/80">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" 
                      style={{ backgroundColor: 'var(--text-primary)' }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--bg-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pro Max Card */}
          <div
            className="pricing-card relative rounded-[28px] p-8 transition-transform duration-300 hover:scale-[1.02] flex-1 flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <div className="h-[24px] mb-2 flex items-start">
                <span className="font-mono text-[9px] uppercase tracking-wider text-primary/40 font-semibold">Ultimate</span>
              </div>
              <h3 className="font-heading text-2xl font-bold mb-1 text-primary tracking-tight">Pro Max</h3>
              <p className="text-xs text-primary/50 font-medium mb-6">Maximum power for power users</p>
              
              <div className="mb-8 flex items-baseline">
                <span className="font-heading text-5xl font-bold tracking-tight text-primary font-mono">
                  $12.99
                </span>
                <span className="text-sm font-medium ml-1.5 text-primary/40">/month</span>
              </div>
 
              <ul className="space-y-4 flex-1">
                {[
                  '1,000 AI Credits / week',
                  '300 Channels limit',
                  'Full AI Summaries',
                  'Watch Queue feature',
                  'Priority AI processing',
                  'Early Access to features',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[13px] font-medium text-primary/75">
                    <CheckIcon dark={isLight} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
 
        </div>
      </div>
    </section>
  );
}
