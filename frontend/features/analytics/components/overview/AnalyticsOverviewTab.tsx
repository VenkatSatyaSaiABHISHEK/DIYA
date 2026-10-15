'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useAnalyticsOverview } from '../../hooks/useAnalyticsOverview';
import { AnalyticsKpiCards } from './AnalyticsKpiCards';
import { AnalyticsRevenueChart } from './AnalyticsRevenueChart';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Sparkles, TrendingUp, AlertCircle, RefreshCw, Zap } from 'lucide-react';
import type { AnalyticsSubTab } from '../../types';

interface AnalyticsOverviewTabProps {
  onNavigateTab: (tab: AnalyticsSubTab) => void;
}

export const AnalyticsOverviewTab: React.FC<AnalyticsOverviewTabProps> = ({ onNavigateTab }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error, filters, setFilter, resetFilters, refreshOverview } =
    useAnalyticsOverview();

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
      {/* Dev State Switcher */}
      <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-[#E4E4E7] shadow-xs">
        <span className="text-xs text-[#71717A]">
          Workspace Currency: <strong className="text-[#18181B]">INR (₹)</strong> • Timezone: IST (UTC+05:30)
        </span>

        <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-purple-50/60 border border-purple-200/80 text-[11px] text-purple-900">
          <span className="font-semibold text-purple-700">Dev:</span>
          {(['default', 'loading', 'empty', 'error'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setFilter('devState', mode)}
              className={`px-1.5 py-0.5 rounded capitalize transition-all ${
                filters.devState === mode
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
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && !data && (
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-12 text-center shadow-xs">
          <EmptyState
            icon={<TrendingUp className="h-10 w-10 text-[#7C3AED]" />}
            title="No Attribution Telemetry Available"
            description="Run active ad campaigns to collect multi-touch attribution data."
            action={
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-[#7C3AED] text-white text-xs font-semibold rounded-xl hover:bg-[#6D28D9] flex items-center gap-2 mx-auto shadow-xs"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset Demo Telemetry
              </button>
            }
          />
        </div>
      )}

      {/* Content Render */}
      {!isLoading && !error && data && (
        <div ref={containerRef} className="space-y-6">
          {/* 1. KPIs */}
          <AnalyticsKpiCards data={data} />

          {/* 2. Spend vs Revenue Chart */}
          <AnalyticsRevenueChart trends={data.trends} />

          {/* 3. DIYA Attribution Intelligence Cards */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#18181B] flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#7C3AED]" />
              DIYA Attribution Intelligence & Synthesis
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4.5 shadow-xs space-y-2">
                <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200 uppercase tracking-wide">
                  Channel Split Insight
                </span>
                <h4 className="text-xs font-bold text-[#18181B]">Meta Discovers, Google Closes</h4>
                <p className="text-xs text-[#71717A] leading-relaxed">
                  Meta Ads drives 68% of first-touch prospect discovery, while Google Search captures
                  72% of final physical site gallery bookings.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4.5 shadow-xs space-y-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 uppercase tracking-wide">
                  Growth Opportunity
                </span>
                <h4 className="text-xs font-bold text-[#18181B]">₹30k Budget Scaling Lift</h4>
                <p className="text-xs text-[#71717A] leading-relaxed">
                  Increasing Kokapet Meta daily budget by ₹30,000 is algorithmically forecasted to yield
                  4 additional verified site visits at sub-₹2,400 CPL.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4.5 shadow-xs space-y-2">
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 uppercase tracking-wide">
                  Peak Velocity Slot
                </span>
                <h4 className="text-xs font-bold text-[#18181B]">Saturday 11 AM - 3 PM Surge</h4>
                <p className="text-xs text-[#71717A] leading-relaxed">
                  Inbound prospects responding on Saturday late mornings convert to booked appointments at
                  a 3.4x higher velocity compared to weekday inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
