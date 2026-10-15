'use client';

import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { LogoCloud } from './LogoCloud';
import { BentoGrid } from './BentoGrid';
import { FeatureTabs } from './FeatureTabs';
import { InteractiveStage } from './InteractiveStage';
import { HowItWorks } from './HowItWorks';
import { PricingSection } from './PricingSection';
import { IntegrationsArc } from './IntegrationsArc';
import { TestimonialSpotlight } from './TestimonialSpotlight';
import { FaqSection } from './FaqSection';
import { FinalCtaBanner } from './FinalCtaBanner';
import { Footer } from './Footer';
import { initSmoothScroll } from '@/lib/animations/lenis';

export const MarketingPage: React.FC = () => {
  // Initialize Lenis smooth scroll tied to ScrollTrigger
  useEffect(() => {
    const { destroy } = initSmoothScroll();
    return () => {
      destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans antialiased selection:bg-[#EDE9FE] selection:text-[#6D28D9]">
      {/* 1. Floating Pill Navbar */}
      <Navbar />

      <main>
        {/* 2. Hero Section: Headline, dual buttons, elevated DIYA Cockpit UI card with Orb */}
        <Hero />

        {/* 3. Logo Cloud / Connected Platforms Bar */}
        <LogoCloud />

        {/* 4. Bento Grid: 3 cards top row, 2 wider cards bottom row */}
        <BentoGrid />

        {/* 5. Feature Highlights: Built to make marketing simpler & faster */}
        <FeatureTabs />

        {/* 6. Interactive Platform Stage: Pill tabs + live preview card */}
        <InteractiveStage />

        {/* 7. How It Works: 3-step interactive deployment walkthrough */}
        <HowItWorks />

        {/* 8. Pricing Section: Monthly / Yearly toggle with 2 elevated cards */}
        <PricingSection />

        {/* 9. Integrations Arc: Semicircular floating tool arc over radiant horizon */}
        <IntegrationsArc />

        {/* 10. Client Impact Spotlight: Verified metrics and founder quote */}
        <TestimonialSpotlight />

        {/* 11. FAQ Split Section: Header on left, accordion on right */}
        <FaqSection />

        {/* 12. Grand Final CTA Banner: Giant watermark typography + glowing Orb */}
        <FinalCtaBanner />
      </main>

      {/* 13. Minimalist Clean Footer */}
      <Footer />
    </div>
  );
};

export default MarketingPage;
