'use client';

import React, { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useContentStore } from '../store/content.store';
import { CONTENT_SUB_TABS, type ContentSubTab } from '../constants';
import { PostsView } from './posts/PostsView';
import { ContentCalendarView } from './calendar/ContentCalendarView';
import { ContentGeneratorView } from './generator/ContentGeneratorView';
import { ContentLibraryView } from './library/ContentLibraryView';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Sparkles, Calendar, Layers, BookOpen, Plus } from 'lucide-react';

export const ContentWorkspace: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as ContentSubTab | null;

  const { activeTab, setActiveTab, updateBrief } = useContentStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state with URL parameter
  useEffect(() => {
    if (tabParam && ['posts', 'calendar', 'generator', 'library'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam, setActiveTab]);

  const handleTabChange = (tabId: ContentSubTab) => {
    setActiveTab(tabId);
    router.push(`/content?tab=${tabId}`, { scroll: false });
  };

  const handleHookSelectedForStudio = (hookText: string) => {
    updateBrief({ topic: hookText });
    handleTabChange('generator');
  };

  // GSAP Entrance
  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    },
    { dependencies: [activeTab], scope: containerRef }
  );

  return (
    <div className="space-y-6">
      {/* Top Demo Banner */}
      <DemoBanner />

      {/* Header & Sub-Tab Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-[#18181B] tracking-tight">Content & Creatives</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
              <Sparkles className="h-3 w-3" /> Autonomous Studio
            </span>
          </div>
          <p className="text-xs text-[#71717A] mt-1">
            Generate high-converting multi-slide carousels, viral reel cues, and schedule cross-platform social assets.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          {activeTab !== 'generator' && (
            <button
              type="button"
              onClick={() => handleTabChange('generator')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] shadow-xs transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Content</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="sticky top-0 z-20 -mx-4 px-4 sm:-mx-6 sm:px-6 py-2.5 bg-white/80 backdrop-blur-md border-b border-[#E4E4E7]/80">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {CONTENT_SUB_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#7C3AED] text-white shadow-xs'
                    : 'text-[#71717A] hover:text-[#18181B] hover:bg-zinc-100/70'
                }`}
              >
                {tab.id === 'posts' && <Layers className="h-3.5 w-3.5" />}
                {tab.id === 'calendar' && <Calendar className="h-3.5 w-3.5" />}
                {tab.id === 'generator' && <Sparkles className="h-3.5 w-3.5" />}
                {tab.id === 'library' && <BookOpen className="h-3.5 w-3.5" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Content */}
      <div ref={containerRef}>
        {activeTab === 'posts' && (
          <PostsView onNavigateToGenerator={() => handleTabChange('generator')} />
        )}
        {activeTab === 'calendar' && (
          <ContentCalendarView onNavigateToGenerator={() => handleTabChange('generator')} />
        )}
        {activeTab === 'generator' && (
          <ContentGeneratorView onSuccessSchedule={() => handleTabChange('calendar')} />
        )}
        {activeTab === 'library' && (
          <ContentLibraryView onSelectHookForStudio={handleHookSelectedForStudio} />
        )}
      </div>
    </div>
  );
};
