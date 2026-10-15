'use client';

import React from 'react';
import Link from 'next/link';
import { useAnalyticsOverview } from '@/features/analytics/hooks/useAnalyticsOverview';
import { AnalyticsRevenueChart } from '@/features/analytics/components/overview/AnalyticsRevenueChart';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatINR } from '@/lib/utils/format';
import { BarChart3, TrendingUp, Download, Sparkles, Layers } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AnalyticsPage() {
  const router = useRouter();
  const { data, isLoading, error } = useAnalyticsOverview();

  return (
    <div className="w-full space-y-6">
      {/* 1. Header: Title, Description, Primary Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111] dark:text-[#EDEDED] tracking-tight">
            Analytics & Attribution
          </h1>
          <p className="text-sm text-[#666] dark:text-[#888] mt-1">
            Multi-touch customer journeys, blended ROAS, and real-time conversion telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/analytics/reports">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-9"
              leftIcon={<Layers className="h-3.5 w-3.5 text-[#7C3AED]" />}
            >
              Attribution Journeys
            </Button>
          </Link>
          <Button
            variant="gradient"
            size="sm"
            className="text-xs h-9 font-semibold shadow-xs"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={() => alert('Demo Mode: Performance report exported successfully.')}
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* 2. Simple Summary Row (3-4 numbers) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs">
          <span className="text-[11px] font-semibold text-[#888] uppercase tracking-wider block">
            Blended ROAS
          </span>
          <span className="text-xl font-bold text-[#7C3AED] mt-1 block">
            {data?.blendedRoas || 4.8}x
          </span>
          <span className="text-[10px] text-emerald-600 font-medium">+0.8x vs last quarter</span>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs">
          <span className="text-[11px] font-semibold text-[#888] uppercase tracking-wider block">
            Customer Acquisition Cost
          </span>
          <span className="text-xl font-bold text-[#111] dark:text-[#EDEDED] mt-1 block">
            {formatINR(data?.customerAcquisitionCostINR || 1820)}
          </span>
          <span className="text-[10px] text-emerald-600 font-medium">18% under target cap</span>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs">
          <span className="text-[11px] font-semibold text-[#888] uppercase tracking-wider block">
            Attributed Revenue
          </span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
            {formatINR(data?.totalPipelineRevenueINR || 14200000)}
          </span>
          <span className="text-[10px] text-[#888]">Across Meta & Google Ads</span>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs">
          <span className="text-[11px] font-semibold text-[#888] uppercase tracking-wider block">
            Conversion Velocity
          </span>
          <span className="text-xl font-bold text-[#111] dark:text-[#EDEDED] mt-1 block">
            14 Days
          </span>
          <span className="text-[10px] text-[#888]">First click to site visit</span>
        </div>
      </div>

      {/* 3. Single Chart: Weekly Revenue & Spend Trajectory */}
      {data && (
        <div className="p-5 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs">
          <AnalyticsRevenueChart trends={data.trends} />
        </div>
      )}

      {/* 4. Channel Attribution Table (Max 3 sections) */}
      <div className="p-5 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#111] dark:text-[#EDEDED]">
            Channel Breakdown & First-Touch Attribution
          </h3>
          <Link href="/analytics/reports" className="text-xs text-[#7C3AED] hover:underline font-medium">
            View multi-touch report →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEAEA] dark:border-[#333] text-[#888]">
                <th className="py-2.5 font-medium">Channel Network</th>
                <th className="py-2.5 font-medium">Spend (₹)</th>
                <th className="py-2.5 font-medium">Attributed Pipeline</th>
                <th className="py-2.5 font-medium">ROAS</th>
                <th className="py-2.5 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAEA] dark:divide-[#222]">
              <tr>
                <td className="py-3 font-semibold text-[#111] dark:text-[#EDEDED]">Meta Ads (Instagram & FB)</td>
                <td className="py-3 font-mono text-[#666] dark:text-[#AAA]">₹28,400</td>
                <td className="py-3 font-semibold text-emerald-600 dark:text-emerald-400">₹82,00,000</td>
                <td className="py-3 font-bold text-[#7C3AED]">5.2x</td>
                <td className="py-3 text-right">
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    High Efficiency
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-[#111] dark:text-[#EDEDED]">Google Search Ads</td>
                <td className="py-3 font-mono text-[#666] dark:text-[#AAA]">₹16,800</td>
                <td className="py-3 font-semibold text-emerald-600 dark:text-emerald-400">₹60,00,000</td>
                <td className="py-3 font-bold text-[#7C3AED]">4.3x</td>
                <td className="py-3 text-right">
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    Scaling
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
