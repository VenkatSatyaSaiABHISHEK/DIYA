'use client';

import React, { useRef } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Settings } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { animatePageIn } from '@/lib/animations/pageTransition';
import { SETTINGS_CONSTANTS } from '../constants';

export const SettingsView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      animatePageIn(containerRef.current);
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="rounded-2xl border border-[#E4E4E7] bg-white p-6 shadow-xs">
        <h2 className="text-xl font-bold text-[#18181B]">{SETTINGS_CONSTANTS.tabTitle}</h2>
        <p className="text-xs text-[#71717A] mt-1">{SETTINGS_CONSTANTS.comingSoonSubtitle}</p>
      </div>

      <div className="content-card p-12 bg-white">
        <EmptyState
          icon={<Settings className="h-8 w-8 text-[#7C3AED]" />}
          title="Settings: Coming in Part 6"
          description="In Part 6, configure your Meta Ads and Google Ads OAuth connections, specify brand tone and guidelines, and establish hard budget limit guards."
        />
      </div>
    </div>
  );
};
