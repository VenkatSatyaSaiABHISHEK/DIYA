'use client';

import React, { useRef, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCampaignsStore } from '../store/campaigns.store';
import { CAMPAIGNS_CONSTANTS } from '../constants';
import { AllCampaignsView } from './all/AllCampaignsView';
import { LaunchFlowView } from './launch/LaunchFlowView';
import { AdStudioView } from './studio/AdStudioView';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { Megaphone, Rocket, Sparkles } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { animatePageIn } from '@/lib/animations/pageTransition';
import { cn } from '@/lib/utils/cn';

export const CampaignsWorkspace: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTabParam = searchParams.get('tab') as 'all' | 'launch' | 'studio' | null;

  const { activeTab, setActiveTab } = useCampaignsStore();
  const contentRef = useRef<HTMLDivElement>(null);

  // Sync state from URL parameter on initial load or browser navigation
  useEffect(() => {
    if (currentTabParam && ['all', 'launch', 'studio'].includes(currentTabParam)) {
      if (currentTabParam !== activeTab) {
        setActiveTab(currentTabParam);
      }
    }
  }, [currentTabParam, activeTab, setActiveTab]);

  const handleTabChange = (newTab: 'all' | 'launch' | 'studio') => {
    setActiveTab(newTab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', newTab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useGSAP(
    () => {
      if (!contentRef.current) return;
      animatePageIn(contentRef.current);
    },
    { dependencies: [activeTab], scope: contentRef }
  );

  const tabIcons = {
    all: <Megaphone className="h-3.5 w-3.5" />,
    launch: <Rocket className="h-3.5 w-3.5" />,
    studio: <Sparkles className="h-3.5 w-3.5" />,
  };

  return (
    <div className="space-y-4">
      {/* Top Demo Simulation Banner */}
      <DemoBanner />

      {/* Sub-tab Navigation Bar - Sticky below Topbar */}
      <div className="sticky top-16 z-20 bg-[#FAFAFC]/95 backdrop-blur-md pt-0.5 pb-1.5 border-b border-[#E4E4E7]">
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Campaigns Sub-tabs">
          {CAMPAIGNS_CONSTANTS.subTabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(tab.id as 'all' | 'launch' | 'studio')}
                className={cn(
                  'relative flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors select-none',
                  isActive
                    ? 'text-[#7C3AED] font-bold'
                    : 'text-[#71717A] hover:text-[#18181B]'
                )}
              >
                <span>{tabIcons[tab.id as keyof typeof tabIcons]}</span>
                <span>{tab.label}</span>

                {/* Animated active underline indicator */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C3AED] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Dynamic Tab Body */}
      <div ref={contentRef} className="w-full">
        {activeTab === 'all' && <AllCampaignsView />}
        {activeTab === 'launch' && <LaunchFlowView />}
        {activeTab === 'studio' && <AdStudioView />}
      </div>
    </div>
  );
};
