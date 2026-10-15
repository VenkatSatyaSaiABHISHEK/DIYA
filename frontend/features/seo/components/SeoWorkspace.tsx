'use client';

import React, { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSeoStore } from '../store/seo.store';
import { SEO_SUB_TABS } from '../constants';
import { SeoOverviewTab } from './overview/SeoOverviewTab';
import { SeoKeywordsTab } from './keywords/SeoKeywordsTab';
import { SeoAuditTab } from './audit/SeoAuditTab';
import { SeoPagesTab } from './pages/SeoPagesTab';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Globe, Search, ShieldCheck, FileCode, Sparkles } from 'lucide-react';
import type { SeoSubTab } from '../types';

export const SeoWorkspace: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as SeoSubTab | null;

  const { activeTab, setActiveTab } = useSeoStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state with URL parameter
  useEffect(() => {
    if (tabParam && ['overview', 'keywords', 'audit', 'pages'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam, setActiveTab]);

  const handleTabChange = (tabId: SeoSubTab) => {
    setActiveTab(tabId);
    router.push(`/seo?tab=${tabId}`, { scroll: false });
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
            <h1 className="text-xl font-bold text-[#18181B] tracking-tight">SEO & Website</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Globe className="h-3 w-3" /> Autonomous Crawler Active
            </span>
          </div>
          <p className="text-xs text-[#71717A] mt-1">
            Track Google rankings in Hyderabad tech corridors, audit Core Web Vitals, and let DIYA auto-optimize meta descriptions.
          </p>
        </div>

        {/* Quick Audit Action */}
        <div className="flex items-center gap-2">
          {activeTab !== 'audit' && (
            <button
              type="button"
              onClick={() => handleTabChange('audit')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] shadow-xs transition-all"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Run Technical Audit</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="sticky top-0 z-20 -mx-4 px-4 sm:-mx-6 sm:px-6 py-2.5 bg-white/80 backdrop-blur-md border-b border-[#E4E4E7]/80">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {SEO_SUB_TABS.map((tab) => {
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
                {tab.id === 'overview' && <Globe className="h-3.5 w-3.5" />}
                {tab.id === 'keywords' && <Search className="h-3.5 w-3.5" />}
                {tab.id === 'audit' && <ShieldCheck className="h-3.5 w-3.5" />}
                {tab.id === 'pages' && <FileCode className="h-3.5 w-3.5" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Content */}
      <div ref={containerRef}>
        {activeTab === 'overview' && <SeoOverviewTab onNavigateTab={handleTabChange} />}
        {activeTab === 'keywords' && <SeoKeywordsTab onNavigateTab={handleTabChange} />}
        {activeTab === 'audit' && <SeoAuditTab />}
        {activeTab === 'pages' && <SeoPagesTab />}
      </div>
    </div>
  );
};
