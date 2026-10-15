'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useSeoOverview } from '../../hooks/useSeoOverview';
import { SeoOverviewKpis } from './SeoOverviewKpis';
import { SeoTrafficChart } from './SeoTrafficChart';
import { SeoRecommendations } from './SeoRecommendations';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Globe, AlertCircle, RefreshCw } from 'lucide-react';
import type { SeoSubTab } from '../../types';

interface SeoOverviewTabProps {
  onNavigateTab: (tab: SeoSubTab) => void;
}

export const SeoOverviewTab: React.FC<SeoOverviewTabProps> = ({ onNavigateTab }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    data,
    recommendations,
    isLoading,
    error,
    devState,
    setDevState,
    handleResetDemo,
    refreshOverview,
  } = useSeoOverview();

  useGSAP(
    () => {
      if (isLoading || error || !data) return;
      if (!containerRef.current) return;
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
      );
    },
    { dependencies: [data, isLoading], scope: containerRef }
  );

  return (
    <div className="space-y-6">
      {/* Top Dev State Switcher */}
      <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-[#E4E4E7] shadow-xs">
        <span className="text-xs text-[#71717A]">
          Domain monitored: <strong className="text-[#18181B]">https://mentneo.ai</strong> (West
          Hyderabad Properties)
        </span>

        {/* Dev State Switcher */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-purple-50/60 border border-purple-200/80 text-[11px] text-purple-900">
          <span className="font-semibold text-purple-700">Dev:</span>
          {(['default', 'loading', 'empty', 'error'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setDevState(mode)}
              className={`px-1.5 py-0.5 rounded capitalize transition-all ${
                devState === mode
                  ? 'bg-[#7C3AED] text-white font-bold shadow-2xs'
                  : 'text-purple-600 hover:text-purple-950'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={refreshOverview}
            className="px-3 py-1 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-28 rounded-2xl bg-white border border-[#E4E4E7]" />
            ))}
          </div>
          <Skeleton className="h-72 rounded-2xl bg-white border border-[#E4E4E7]" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-36 rounded-2xl bg-white border border-[#E4E4E7]" />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && !data && (
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-12 text-center shadow-xs">
          <EmptyState
            icon={<Globe className="h-10 w-10 text-[#7C3AED]" />}
            title="No SEO Data Available"
            description="No website crawl metrics or search queries found for this workspace."
            action={
              <button
                type="button"
                onClick={handleResetDemo}
                className="mt-4 px-4 py-2 bg-[#7C3AED] text-white text-xs font-semibold rounded-xl hover:bg-[#6D28D9] transition-all flex items-center gap-2 mx-auto shadow-xs"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Seed Demo SEO Data
              </button>
            }
          />
        </div>
      )}

      {/* Content Render */}
      {!isLoading && !error && data && (
        <div ref={containerRef} className="space-y-6">
          {/* 1. KPIs */}
          <SeoOverviewKpis data={data} />

          {/* 2. Traffic Chart */}
          <SeoTrafficChart history={data.trafficHistory} />

          {/* 3. Recommendations */}
          <SeoRecommendations
            recommendations={recommendations}
            onNavigateTab={onNavigateTab}
          />
        </div>
      )}
    </div>
  );
};
