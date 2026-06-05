import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Read active theme directly from localStorage on load to render correct loading colors
  const isLight = typeof window !== 'undefined' && localStorage.getItem('watchflo-theme') === 'light';

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete,
        });
      },
    });

    gsap.set(logoRef.current, { opacity: 0, y: 20 });
    gsap.set(lineRef.current, { scaleX: 0 });

    tl.to(logoRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .to(lineRef.current, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, '-=0.3')
      .to({}, { duration: 0.3 });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ 
        backgroundColor: isLight ? '#FFFFFF' : '#000000', 
        transformOrigin: 'top' 
      }}
    >
      <div className="flex flex-col items-center gap-8">
        <div ref={logoRef} className="flex items-center gap-3">
          <img src="/watchflo_logo.png" alt="" className="w-10 h-10 rounded-xl" />
          <span
            className="font-heading text-2xl tracking-tight"
            style={{ color: isLight ? '#000000' : '#FFFFFF' }}
          >
            WatchFlo
          </span>
        </div>
        <div 
          className="h-[2px] w-64 rounded-full relative overflow-hidden"
          style={{ backgroundColor: isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.08)' }}
        >
          <div
            ref={lineRef}
            className="absolute inset-y-0 left-0 w-full rounded-full"
            style={{ 
              backgroundColor: isLight ? '#000000' : '#FFFFFF', 
              transformOrigin: 'left' 
            }}
          />
        </div>
      </div>
    </div>
  );
}
