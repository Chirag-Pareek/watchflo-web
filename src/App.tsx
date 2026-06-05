import { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Toaster } from 'sonner';

import LoadingScreen from '@/components/LoadingScreen';
import Footer from '@/components/Footer';

// Pages
import LandingPage from '@/pages/LandingPage';
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';
import SupportPage from '@/pages/SupportPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.15,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [location.pathname]);

  // Refresh ScrollTrigger after loading
  useEffect(() => {
    if (isLoaded) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [isLoaded]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Toaster position="bottom-right" theme="system" closeButton />
      {/* Loading Screen - only show on initial load on root path */}
      {!isLoaded && location.pathname === '/' && <LoadingScreen onComplete={handleLoadingComplete} />}

      <main>
        <Routes>
          <Route path="/" element={<LandingPage isLoaded={isLoaded || location.pathname !== '/'} lenisRef={lenisRef} />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </main>

      <Footer lenisRef={lenisRef} />
    </>
  );
}
