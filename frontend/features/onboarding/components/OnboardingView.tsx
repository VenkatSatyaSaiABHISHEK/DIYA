'use client';

import React, { useRef } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Sparkles } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { animatePageIn } from '@/lib/animations/pageTransition';
import { ONBOARDING_CONSTANTS } from '../constants';

export const OnboardingView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      animatePageIn(containerRef.current);
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto py-12 space-y-6">
      <div className="rounded-2xl border border-[#E4E4E7] bg-white p-6 shadow-xs text-center">
        <h2 className="text-xl font-bold text-[#18181B]">{ONBOARDING_CONSTANTS.title}</h2>
        <p className="text-xs text-[#71717A] mt-1">{ONBOARDING_CONSTANTS.subtitle}</p>
      </div>

      <div className="content-card p-12 bg-white">
        <EmptyState
          icon={<Sparkles className="h-8 w-8 text-[#7C3AED]" />}
          title="Onboarding Wizard: Coming in Part 6"
          description="In Part 6, new business owners walk through a frictionless 3-step setup to connect Meta Ads, define their ideal customer persona, and initialize DIYA."
        />
      </div>
    </div>
  );
};
