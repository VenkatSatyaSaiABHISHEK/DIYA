'use client';

import React, { useRef, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDIYAStore } from '../store/diya.store';
import { DIYA_CONSTANTS } from '../constants';
import { ChatView } from './chat/ChatView';
import { StrategyView } from './strategy/StrategyView';
import { AutomationsView } from './automations/AutomationsView';
import { TimelineView } from './timeline/TimelineView';
import { MessageSquare, Target, Zap, Clock } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { animatePageIn } from '@/lib/animations/pageTransition';
import { cn } from '@/lib/utils/cn';

export const DiyaWorkspace: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTabParam = searchParams.get('tab') as
    | 'chat'
    | 'strategy'
    | 'automations'
    | 'timeline'
    | null;

  const { activeTab, setActiveTab } = useDIYAStore();
  const contentRef = useRef<HTMLDivElement>(null);

  // Sync state from URL parameter on initial load or browser back/forward
  useEffect(() => {
    if (
      currentTabParam &&
      ['chat', 'strategy', 'automations', 'timeline'].includes(currentTabParam)
    ) {
      if (currentTabParam !== activeTab) {
        setActiveTab(currentTabParam);
      }
    }
  }, [currentTabParam, activeTab, setActiveTab]);

  const handleTabChange = (newTab: 'chat' | 'strategy' | 'automations' | 'timeline') => {
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
    chat: <MessageSquare className="h-3.5 w-3.5" />,
    strategy: <Target className="h-3.5 w-3.5" />,
    automations: <Zap className="h-3.5 w-3.5" />,
    timeline: <Clock className="h-3.5 w-3.5" />,
  };

  // Ensure page stays at the top when navigating or switching tabs so navigation is never hidden
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  return (
    <div className="space-y-3">
      {/* Sub-tab Navigation Bar - Sticky below Topbar so it is never lost */}
      <div className="sticky top-16 z-20 bg-[#FAFAFC]/95 backdrop-blur-md pt-0.5 pb-1.5 border-b border-[#E4E4E7]">
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="DIYA Sub-tabs">
          {DIYA_CONSTANTS.subTabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() =>
                  handleTabChange(tab.id as 'chat' | 'strategy' | 'automations' | 'timeline')
                }
                className={cn(
                  'relative flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-medium transition-colors select-none',
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
        {activeTab === 'chat' && <ChatView />}
        {activeTab === 'strategy' && <StrategyView />}
        {activeTab === 'automations' && <AutomationsView />}
        {activeTab === 'timeline' && <TimelineView />}
      </div>
    </div>
  );
};
