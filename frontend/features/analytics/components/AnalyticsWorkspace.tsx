'use client';

import React, { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAnalyticsStore } from '../store/analytics.store';
import { ANALYTICS_SUB_TABS } from '../constants';
import { AnalyticsOverviewTab } from './overview/AnalyticsOverviewTab';
import { AttributionTab } from './attribution/AttributionTab';
import { ChannelsTab } from './channels/ChannelsTab';
import { FunnelTab } from './funnel/FunnelTab';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TrendingUp, Share2, Target, Layers, Sparkles } from 'lucide-react';
import type { AnalyticsSubTab } from '../types';

export const AnalyticsWorkspace: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as AnalyticsSubTab | null;

  const { activeTab, setActiveTab } = useAnalyticsStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state with URL parameter
  useEffect(() => {
    if (tabParam && ['overview', 'attribution', 'channels', 'funnel'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam, setActiveTab]);

  const handleTabChange = (tabId: AnalyticsSubTab) => {
    setActiveTab(tabId);
    router.push(`/analytics?tab=${tabId}`, { scroll: false });
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-[#18181B] tracking-tight">
              Analytics & Attribution
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
              <Sparkles className="h-3 w-3" /> Multi-Touch Engine
            </span>
          </div>
          <p className="text-xs text-[#71717A] mt-1">
            Omnichannel revenue attribution, customer conversion journeys, ROAS benchmarking, and full-funnel diagnostics.
          </p>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Attribution Active: 8.4x Blended ROAS
          </span>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="sticky top-0 z-20 -mx-4 px-4 sm:-mx-6 sm:px-6 py-2.5 bg-white/80 backdrop-blur-md border-b border-[#E4E4E7]/80">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {ANALYTICS_SUB_TABS.map((tab) => {
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
                {tab.id === 'overview' && <TrendingUp className="h-3.5 w-3.5" />}
                {tab.id === 'attribution' && <Share2 className="h-3.5 w-3.5" />}
                {tab.id === 'channels' && <Target className="h-3.5 w-3.5" />}
                {tab.id === 'funnel' && <Layers className="h-3.5 w-3.5" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Content */}
      <div ref={containerRef}>
        {activeTab === 'overview' && <AnalyticsOverviewTab onNavigateTab={handleTabChange} />}
        {activeTab === 'attribution' && <AttributionTab />}
        {activeTab === 'channels' && <ChannelsTab />}
        {activeTab === 'funnel' && <FunnelTab />}
      </div>
    </div>
  );
};
