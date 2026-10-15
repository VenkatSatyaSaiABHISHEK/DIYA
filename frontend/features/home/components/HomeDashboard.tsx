'use client';

import React, { useRef } from 'react';
import { useHomeData } from '../hooks/useHomeData';
import { HomeHero } from './HomeHero';
import { MetricTile } from './MetricTile';
import { SetupChecklist } from './SetupChecklist';
import { ApprovalCarousel } from './ApprovalCarousel';
import { ActivityList } from './ActivityList';
import { PerformanceChart } from './PerformanceChart';
import { HomeSkeleton } from './HomeSkeleton';
import { DiyaBrandLoader } from '@/components/brand/DiyaBrandLoader';
import { Button } from '@/components/ui/Button';
import { formatINR, formatNumber, formatPercent } from '@/lib/utils/format';
import { Wallet, Users, Target, ArrowUpDown, AlertTriangle, RefreshCw } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { animatePageIn } from '@/lib/animations/pageTransition';

export const HomeDashboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    metrics,
    activities,
    intelligence,
    performance,
    selectedRange,
    setSelectedRange,
    loading,
    error,
    refetch,
    approveIntelligenceItem,
    dismissIntelligenceItem,
  } = useHomeData();

  // Staggered card entrance under 600ms
  useGSAP(
    () => {
      if (!containerRef.current || loading) return;
      animatePageIn(containerRef.current);
    },
    { dependencies: [loading], scope: containerRef }
  );

  // Loading State with Brand Orb & Shining Text Animation
  if (loading && !metrics) {
    return <DiyaBrandLoader size="fullscreen" />;
  }

  // Error State: Short message with Retry button
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center rounded-[20px] border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 min-h-[300px]">
        <AlertTriangle className="h-8 w-8 text-red-500 mb-2" />
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Failed to load marketing dashboard
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 max-w-md">{error}</p>
        <div className="mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={refetch}
            leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
          >
            Retry Loading
          </Button>
        </div>
      </div>
    );
  }

  const m = metrics?.metrics;
  const isConnected = metrics?.isConnected ?? true;

  return (
    <div
      ref={containerRef}
      className="w-full flex-1 flex flex-col gap-3 lg:gap-3.5 lg:grid lg:grid-rows-[auto_auto_1fr] overflow-hidden select-none"
    >
      {/* Row 1: Hero (auto, max 170px) */}
      <section aria-label="Executive Overview" className="h-[155px] lg:h-[162px] max-h-[170px] shrink-0">
        <HomeHero metrics={metrics} userName="Abhishek" />
      </section>

      {/* Row 2: Metric Row (auto, about 110-120px) OR Setup Checklist */}
      <section aria-label="Key Performance Indicators" className="h-[114px] lg:h-[118px] shrink-0">
        {isConnected && m ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-3.5 h-full">
            <MetricTile
              title="Total Ad Spend"
              value={m.totalAdSpend.value}
              formatValue={(val) => formatINR(val)}
              changePercentage={m.totalAdSpend.changePercentage}
              periodLabel="vs last 30 days"
              icon={<Wallet className="h-3.5 w-3.5" />}
            />

            <MetricTile
              title="Leads"
              value={m.leadsGenerated.value}
              formatValue={(val) => formatNumber(val)}
              changePercentage={m.leadsGenerated.changePercentage}
              periodLabel="vs last 30 days"
              icon={<Users className="h-3.5 w-3.5" />}
            />

            <MetricTile
              title="Cost Per Lead"
              value={m.costPerLead.value}
              formatValue={(val) => formatINR(val)}
              changePercentage={m.costPerLead.changePercentage}
              periodLabel="vs last 30 days"
              icon={<Target className="h-3.5 w-3.5" />}
            />

            <MetricTile
              title="Conversion Rate"
              value={m.conversionRate.value}
              formatValue={(val) => formatPercent(val, 1)}
              changePercentage={m.conversionRate.changePercentage}
              periodLabel="vs last 30 days"
              decimals={1}
              icon={<ArrowUpDown className="h-3.5 w-3.5" />}
            />
          </div>
        ) : (
          <SetupChecklist />
        )}
      </section>

      {/* Row 3: Bottom Row — Three Equal Panels (1fr, equal height, no inner scroll) */}
      <section
        aria-label="Core Operations"
        className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-3.5 flex-1 min-h-0 h-full overflow-hidden"
      >
        {/* Panel 1: Needs approval (horizontal Embla slider, Sheet for details) */}
        <div className="h-full min-h-0 overflow-hidden">
          <ApprovalCarousel
            items={intelligence}
            loading={loading}
            onApprove={approveIntelligenceItem}
            onDismiss={dismissIntelligenceItem}
          />
        </div>

        {/* Panel 2: Performance (small area chart, Leads by default, 7D/30D/90D toggle) */}
        <div className="h-full min-h-0 overflow-hidden">
          <PerformanceChart
            data={performance}
            loading={loading}
            selectedRange={selectedRange}
            onRangeChange={setSelectedRange}
          />
        </div>

        {/* Panel 3: DIYA activity (3 items, one line each with time) */}
        <div className="h-full min-h-0 overflow-hidden">
          <ActivityList
            activities={activities}
            loading={loading}
          />
        </div>
      </section>
    </div>
  );
};
