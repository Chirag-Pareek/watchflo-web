
import HeroSection from '@/sections/HeroSection';
import FeaturesSection from '@/sections/FeaturesSection';
import FounderSection from '@/sections/FounderSection';
import ScreenshotsSection from '@/sections/ScreenshotsSection';
import HowItWorksSection from '@/sections/HowItWorksSection';
import PricingSection from '@/sections/PricingSection';
import FAQSection from '@/sections/FAQSection';
import CTABannerSection from '@/sections/CTABannerSection';
import Navigation from '@/components/Navigation';

interface LandingPageProps {
  isLoaded: boolean;
  lenisRef: React.MutableRefObject<any>;
}

export default function LandingPage({ isLoaded, lenisRef }: LandingPageProps) {
  return (
    <>
      <Navigation lenisRef={lenisRef} />
      <HeroSection isLoaded={isLoaded} lenisRef={lenisRef} />
      <FeaturesSection />
      <FounderSection />
      <HowItWorksSection />
      <ScreenshotsSection />
      <PricingSection />
      <FAQSection />
      <CTABannerSection />
    </>
  );
}
