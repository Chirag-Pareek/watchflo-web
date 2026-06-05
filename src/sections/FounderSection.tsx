import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FounderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(containerRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
        },
      });
    }
  }, []);

  return (
    <section
      id="founder"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg-primary)', padding: '120px 0 60px' }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span
            className="font-mono uppercase tracking-[0.2em] block mb-4"
            style={{ fontSize: '10px', color: 'var(--text-muted)' }}
          >
            Behind the project
          </span>
          <h2
            className="font-heading font-bold text-primary tracking-tight"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              letterSpacing: '-0.04em',
            }}
          >
            Why this app exists
          </h2>
        </div>

        {/* Content Box / Founder Letter */}
        <div 
          ref={containerRef} 
          className="flex flex-col md:flex-row gap-10 md:gap-14 relative overflow-hidden rounded-[32px] p-8 md:p-12"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          {/* Letter Column */}
          <div className="flex-1 z-10">
            <h3 className="font-heading font-bold text-xl md:text-2xl mb-6 text-primary tracking-tight">
              Hi, I'm the developer of WatchFlo ✽
            </h3>
            
            <div className="space-y-5 text-[14px] font-medium text-primary/60 leading-relaxed">
              <p>
                I built WatchFlo because I was spending way too much time scrolling YouTube feeds without real purpose. The algorithms are built to keep us watching, not learning.
              </p>
              <p>
                I tried a lot of productivity blockers, but they were either too strict (blocking YouTube entirely) or too clunky. I wanted a companion that encourages intentional learning instead of mindless binging.
              </p>
              <p>
                So I decided to build my own YouTube companion, based on two core ideas:
              </p>
              <ul className="list-none pl-0 space-y-2.5 my-4">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 flex-shrink-0" />
                  <span><strong>Mindful Intentions:</strong> It prompts you to decide what you want to learn or achieve before you open your subscription feed.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 flex-shrink-0" />
                  <span><strong>Premium Design:</strong> Clean, minimalist typography that makes focus actually feel premium and enjoyable.</span>
                </li>
              </ul>
              <p>
                This app is a pure passion project. If WatchFlo helps you gain even an hour of productive focus back every week, it will have achieved its purpose.
              </p>
              <p>
                Thanks for taking the time to check out the app!
              </p>
            </div>

            {/* Sign-off & Profile Pic Placeholder */}
            <div className="mt-12 pt-8 border-t flex flex-row items-center justify-between gap-6" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <div className="font-bold text-[14px] text-primary">Founder</div>
                <div className="text-[12px] text-primary/40 font-mono mt-0.5">WatchFlo Creator</div>
              </div>
              
              {/* Profile Pic */}
              <div className="w-14 h-14 rounded-full overflow-hidden border flex-shrink-0" style={{ borderColor: 'var(--border-subtle)' }}>
                <img 
                  src="/developer-profile.png" 
                  alt="Developer Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
