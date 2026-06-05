import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQ_ITEMS = [
  {
    q: 'What is WatchFlo?',
    a: 'WatchFlo is an AI-powered YouTube companion app that helps you manage subscriptions, get instant video summaries, set focus timers, and track screen time — making your YouTube experience intentional.',
  },
  {
    q: 'How does the AI summary work?',
    a: 'WatchFlo uses advanced AI to analyze video transcripts and generate concise, accurate summaries. You get the key points in seconds, so you can decide whether to watch the full video.',
  },
  {
    q: 'Is there a free plan?',
    a: 'Not at the moment! We charge a sustainable price (either a low monthly subscription or a one-time lifetime purchase) so that we can run the service permanently without showing ads, selling data, or raising venture capital. This keeps your focus data 100% private.',
  },
  {
    q: 'Does it work with my YouTube account?',
    a: 'Yes. WatchFlo connects directly to your YouTube account to sync subscriptions, watch history, and preferences. Your data stays completely private and secure.',
  },
];

function FAQItem({ item }: { item: typeof FAQ_ITEMS[0] }) {
  const [open, setOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (answerRef.current) {
      if (open) {
        gsap.to(answerRef.current, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' });
      } else {
        gsap.to(answerRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
      }
    }
  }, [open]);

  return (
    <div
      className="faq-item rounded-[20px] mb-4 overflow-hidden"
      style={{ 
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div 
        className="flex items-center justify-between p-6 md:p-7 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <h3
          className="font-heading font-bold text-sm md:text-base text-primary tracking-tight"
        >
          {item.q}
        </h3>
        <div
          className="flex-shrink-0 transition-transform duration-300 ml-4"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      <div ref={answerRef} style={{ height: 0, opacity: 0, overflow: 'hidden' }}>
        <p
          className="pb-6 px-6 md:px-7 max-w-2xl text-[14px] text-primary/60 leading-relaxed font-medium"
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      const els = headerRef.current.children;
      gsap.set(els, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' });
        },
      });
    }

    if (listRef.current) {
      const items = listRef.current.querySelectorAll('.faq-item');
      gsap.set(items, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: listRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(items, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' });
        },
      });
    }
  }, []);

  return (
    <section
      id="faq"
      style={{ backgroundColor: 'var(--bg-primary)', padding: '100px 0 60px' }}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-14 flex flex-col items-center text-center">
          <span
            className="font-mono uppercase tracking-[0.2em] block mb-4"
            style={{ fontSize: '10px', color: 'var(--text-muted)' }}
          >
            Faq
          </span>
          <h2
            className="font-heading font-bold text-primary tracking-tight"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.04em',
            }}
          >
            Frequently asked questions
          </h2>
        </div>

        {/* FAQ list */}
        <div ref={listRef}>
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
