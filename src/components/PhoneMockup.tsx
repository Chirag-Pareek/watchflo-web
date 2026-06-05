import type { ReactNode } from 'react';

export type WireframeType = 'feed' | 'summary' | 'charts' | 'player' | 'timers' | 'blank';

interface PhoneMockupProps {
  width?: number;
  children?: ReactNode;
  className?: string;
  screenshotSrc?: string; // Kept for compatibility but overridden if wireframeType is set
  wireframeType?: WireframeType;
}

export default function PhoneMockup({
  width = 240,
  children,
  className = '',
  screenshotSrc,
  wireframeType = 'blank',
}: PhoneMockupProps) {
  
  // Render wireframe screens based on type
  const renderWireframe = () => {
    switch (wireframeType) {
      case 'feed':
        return (
          <div className="w-full h-full flex flex-col text-left py-4">
            {/* Minimal App Header */}
            <div className="flex justify-between items-center px-4 mb-4">
              <div className="w-16 h-3 rounded bg-white/30" />
              <div className="w-6 h-3 rounded bg-white/10" />
            </div>

            {/* Search Bar Outline */}
            <div className="mx-4 mb-6 h-8 rounded-full border border-white/10 bg-white/5 flex items-center px-3 gap-2">
              <div className="w-3.5 h-3.5 rounded-full border border-white/30 flex-shrink-0" />
              <div className="w-20 h-2 rounded bg-white/15" />
            </div>

            {/* Section label */}
            <div className="mx-4 mb-3 w-28 h-2 rounded bg-white/20" />

            {/* List items representing a YouTube feed companion */}
            <div className="flex-1 flex flex-col gap-4">
              {[80, 65, 75, 45].map((w, i) => (
                <div key={i} className="mx-4 flex gap-3 items-center">
                  {/* Aspect-ratio thumbnail placeholder */}
                  <div className="w-16 h-10 rounded border border-white/10 bg-white/5 flex-shrink-0 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  {/* Detail placeholder lines */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="h-2 rounded bg-white/25" style={{ width: `${w}%` }} />
                    <div className="h-1.5 rounded bg-white/10 w-[40%]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="w-full h-full flex flex-col text-left">
            {/* Video Player Header */}
            <div className="w-full aspect-[16/10] bg-white/5 border-b border-white/10 relative flex items-center justify-center flex-shrink-0">
              {/* Play button circle */}
              <div className="w-9 h-9 rounded-full border border-white/25 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </div>
              {/* Timeline bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <div className="h-full bg-white/40" style={{ width: '40%' }} />
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4 flex flex-col gap-2">
              <div className="h-2.5 rounded bg-white/35 w-[90%]" />
              <div className="h-2.5 rounded bg-white/35 w-[60%]" />
              <div className="h-1.5 rounded bg-white/10 w-[35%] mt-1" />
            </div>

            <div className="w-full h-[1px] bg-white/10 my-1" />

            {/* Smart Summary Segment */}
            <div className="p-4 flex-1 flex flex-col gap-3 overflow-hidden">
              <div className="font-mono text-[9px] uppercase tracking-widest text-white/40 mb-1 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                AI Summary
              </div>
              
              {[
                { w1: '95%', w2: '75%' },
                { w1: '90%', w2: '50%' },
                { w1: '85%', w2: '60%' },
              ].map((item, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1 flex-shrink-0" />
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="h-1.5 rounded bg-white/20" style={{ width: item.w1 }} />
                    <div className="h-1.5 rounded bg-white/15" style={{ width: item.w2 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'charts':
        return (
          <div className="w-full h-full flex flex-col text-left py-4">
            {/* Header */}
            <div className="flex justify-between items-center px-4 mb-4">
              <div className="w-20 h-3 rounded bg-white/20" />
              <div className="w-8 h-4 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>

            {/* Metric Display */}
            <div className="px-4 mb-4 flex flex-col gap-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/45">Watch Analytics</div>
              <div className="text-xl font-bold font-mono tracking-tight text-white">2h 15m</div>
              <div className="h-1.5 rounded bg-white/20 w-24 mt-1" />
            </div>

            {/* SVG Line Graph */}
            <div className="mx-4 h-24 rounded-2xl border border-white/10 bg-white/5 p-3 flex flex-col justify-end relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full p-2 overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
                {/* Horizontal gridlines */}
                <line x1="0" y1="12" x2="100" y2="12" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                <line x1="0" y1="37" x2="100" y2="37" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                {/* Line graph line */}
                <path d="M 0 45 Q 20 30 40 38 T 80 15 T 100 10" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                <circle cx="80" cy="15" r="2.5" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Bar charts below */}
            <div className="mx-4 mt-4 p-3 rounded-2xl border border-white/10 bg-white/5 flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-end gap-1.5 h-12 px-1">
                {[15, 35, 20, 50, 30, 45, 60].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full bg-white/20 rounded-t-sm" style={{ height: `${h}%` }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[8px] font-mono text-white/30 px-0.5 mt-2">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
              </div>
            </div>
          </div>
        );

      case 'player':
        return (
          <div className="w-full h-full flex flex-col justify-between text-center py-5 px-4">
            {/* Top Bar */}
            <div className="flex justify-between items-center w-full">
              <div className="w-5 h-5 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </div>
              <div className="w-16 h-3 rounded bg-white/25" />
              <div className="w-5 h-5 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                <div className="w-2.5 h-[1.5px] bg-white/60" />
              </div>
            </div>

            {/* Central Media Disc/Mockup */}
            <div className="my-auto flex flex-col items-center gap-6">
              <div className="w-28 h-28 rounded-full border border-dashed border-white/20 flex items-center justify-center relative">
                <div className="w-24 h-24 rounded-full border border-white/10 bg-white/5 flex items-center justify-center animate-spin" style={{ animationDuration: '10s' }}>
                  <div className="w-12 h-12 rounded-full border border-white/30 bg-black flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white/60" />
                  </div>
                </div>
              </div>

              {/* Title & Channel */}
              <div className="flex flex-col gap-2">
                <div className="h-3 rounded bg-white/30 w-36 mx-auto" />
                <div className="h-2 rounded bg-white/15 w-20 mx-auto" />
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-col gap-6 w-full">
              {/* Slider */}
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono text-white/40">1:42</span>
                <div className="flex-1 h-[2px] rounded bg-white/10 relative">
                  <div className="absolute left-0 top-0 h-full bg-white w-[55%]" />
                  <div className="absolute left-[55%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-lg" />
                </div>
                <span className="text-[8px] font-mono text-white/40">3:05</span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center items-center gap-7">
                {/* Prev */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white/40">
                  <polygon points="19 20 9 12 19 4 19 20" /><rect x="5" y="4" width="2" height="16" />
                </svg>
                {/* Play circle */}
                <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white ml-0.5">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                {/* Next */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white/40">
                  <polygon points="5 4 15 12 5 20 5 4" /><rect x="17" y="4" width="2" height="16" />
                </svg>
              </div>
            </div>
          </div>
        );

      case 'timers':
        return (
          <div className="w-full h-full flex flex-col justify-between text-center py-6 px-4">
            {/* Header */}
            <div className="flex justify-between items-center w-full">
              <div className="w-14 h-3 rounded bg-white/15" />
              <div className="w-14 h-3 rounded bg-white/15" />
            </div>

            {/* Large dial in the center */}
            <div className="my-auto flex flex-col items-center">
              <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center relative bg-white/[0.01]">
                {/* SVG Dial border */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="58" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
                  <circle cx="64" cy="64" r="58" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="364" strokeDashoffset="120" strokeLinecap="round" />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold font-mono text-white tracking-tight">18:45</span>
                  <span className="text-[7px] font-mono uppercase tracking-widest text-white/40">Focus Session</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 w-full">
              <div className="h-9 w-28 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mx-auto cursor-pointer transition-colors hover:bg-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white">Pause Session</span>
              </div>
              <div className="text-[9px] font-mono text-white/35">Target: 30 minutes</div>
            </div>
          </div>
        );

      case 'blank':
      default:
        return (
          <div className="w-full h-full flex items-center justify-center text-white/10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className={`relative flex-shrink-0 ${className}`} style={{ width, maxWidth: '100%' }}>
      {/* Outer shell (outline phone) */}
      <div
        className="relative rounded-[40px] p-[2.5px] shadow-2xl"
        style={{ 
          background: 'var(--border-strong)',
          boxShadow: 'var(--phone-shadow)'
        }}
      >
        {/* Inner bezel */}
        <div
          className="relative rounded-[38px] p-[5px]"
          style={{ background: '#000000' }}
        >
          {/* Dynamic Screen */}
          <div
            className="relative rounded-[33px] overflow-hidden"
            style={{ 
              backgroundColor: '#000000', 
              aspectRatio: '9/19.5',
              border: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            {screenshotSrc ? (
              <img src={screenshotSrc} alt="App Screenshot" className="w-full h-full object-cover" loading="lazy" />
            ) : (
              renderWireframe()
            )}
            {children}
          </div>
        </div>
      </div>

      {/* Side buttons outlines */}
      <div className="absolute left-[-1.5px] rounded-l-full" style={{ top: '22%', width: '1.5px', height: '5%', backgroundColor: 'var(--border-strong)' }} />
      <div className="absolute left-[-1.5px] rounded-l-full" style={{ top: '29%', width: '1.5px', height: '8%', backgroundColor: 'var(--border-strong)' }} />
      <div className="absolute right-[-1.5px] rounded-r-full" style={{ top: '26%', width: '1.5px', height: '8%', backgroundColor: 'var(--border-strong)' }} />
    </div>
  );
}
