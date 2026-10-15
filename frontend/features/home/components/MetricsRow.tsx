'use client';

import React from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatINR, formatNumber, formatPercent } from '@/lib/utils/format';
import { Wallet, Users, Target, ArrowUpDown } from 'lucide-react';
import type { HomeMetricsData } from '../types';
import { useUIStore } from '@/store/ui.store';
import { cn } from '@/lib/utils/cn';

export interface MetricsRowProps {
  metrics: HomeMetricsData | null;
  loading: boolean;
  compact?: boolean;
}

export const MetricsRow: React.FC<MetricsRowProps> = ({ metrics, loading, compact = false }) => {
  const { addToast } = useUIStore();

  const handleConnect = () => {
    addToast('Ad integration flow will open in Settings (Part 6).', 'info');
  };

  if (loading || !metrics) {
    return (
      <div className={compact ? 'grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={cn('content-card flex flex-col justify-between', compact ? 'p-3 h-[98px]' : 'p-5 h-[148px]')}>
            <div className="flex justify-between items-center">
              <Skeleton width="45%" height={12} />
              <Skeleton width={compact ? 22 : 32} height={compact ? 22 : 32} variant="circle" />
            </div>
            <Skeleton width="60%" height={compact ? 20 : 28} />
            <Skeleton width="75%" height={10} />
          </div>
        ))}
      </div>
    );
  }

  const { isConnected, metrics: m } = metrics;

  return (
    <div className={compact ? 'grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'}>
      <StatCard
        title="Total Ad Spend"
        value={m.totalAdSpend.value}
        formatValue={(val) => formatINR(val)}
        changePercentage={m.totalAdSpend.changePercentage}
        periodLabel="vs prev"
        icon={<Wallet className="h-3.5 w-3.5" />}
        isConnected={isConnected}
        onConnect={handleConnect}
        compact={compact}
      />

      <StatCard
        title="Leads Generated"
        value={m.leadsGenerated.value}
        formatValue={(val) => formatNumber(val)}
        changePercentage={m.leadsGenerated.changePercentage}
        periodLabel="vs prev"
        icon={<Users className="h-3.5 w-3.5" />}
        isConnected={isConnected}
        onConnect={handleConnect}
        compact={compact}
      />

      <StatCard
        title="Cost Per Lead (CPL)"
        value={m.costPerLead.value}
        formatValue={(val) => formatINR(val)}
        changePercentage={m.costPerLead.changePercentage}
        periodLabel="vs prev"
        icon={<Target className="h-3.5 w-3.5" />}
        isConnected={isConnected}
        onConnect={handleConnect}
        compact={compact}
      />

      <StatCard
        title="Conversion Rate"
        value={m.conversionRate.value}
        formatValue={(val) => formatPercent(val, 1)}
        changePercentage={m.conversionRate.changePercentage}
        periodLabel="vs prev"
        icon={<ArrowUpDown className="h-3.5 w-3.5" />}
        isConnected={isConnected}
        onConnect={handleConnect}
        decimals={1}
        compact={compact}
      />
    </div>
  );
};
