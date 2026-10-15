'use client';

import React, { useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatINR } from '@/lib/utils/format';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from 'recharts';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { isReducedMotion } from '@/lib/animations/pageTransition';
import type { PerformanceTimeSeriesPoint } from '../types';
import { cn } from '@/lib/utils/cn';

export interface PerformanceChartProps {
  data: PerformanceTimeSeriesPoint[];
  loading: boolean;
  selectedRange: string;
  onRangeChange: (range: string) => void;
  className?: string;
}

const rangeTabs = [
  { id: '7d', label: '7D' },
  { id: '30d', label: '30D' },
  { id: '90d', label: '90D' },
];

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  loading,
  selectedRange,
  onRangeChange,
  className,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // GSAP path draw animation under 600ms
  useGSAP(
    () => {
      if (!chartRef.current || loading || isReducedMotion() || data.length === 0) return;

      const paths = chartRef.current.querySelectorAll('.recharts-area-curve');
      if (paths.length > 0) {
        paths.forEach((path) => {
          const el = path as SVGPathElement;
          try {
            const length = el.getTotalLength?.() || 1000;
            gsap.fromTo(
              el,
              { strokeDasharray: length, strokeDashoffset: length },
              { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }
            );
          } catch {
            // Safe fallback
          }
        });
      }
    },
    { dependencies: [data, loading], scope: chartRef }
  );

  return (
    <Card
      className={cn(
        'p-6 rounded-[20px] bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626]',
        'shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between h-full overflow-hidden',
        className
      )}
    >
      {/* Header: Title and Leads label on ONE line, 7D/30D/90D toggle on the right */}
      <div className="flex items-center justify-between pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="font-sans text-sm sm:text-base font-semibold text-[#111111] dark:text-[#EDEDED] tracking-tight">
            Performance
          </h3>
          <span className="text-xs text-[#71717A] dark:text-[#888888] font-medium">
            (Leads)
          </span>
        </div>

        {/* 7D / 30D / 90D Toggle on the Right */}
        <Tabs
          tabs={rangeTabs}
          activeTab={selectedRange}
          onChange={onRangeChange}
          variant="pill"
        />
      </div>

      {/* Area Chart: Faint horizontal guides only, no vertical lines, no axis lines, round line cap, dot only on hover */}
      <div ref={chartRef} className="flex-1 w-full min-h-[120px] pt-1">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Skeleton width="100%" height="90%" />
          </div>
        ) : data.length === 0 ? (
          <EmptyState
            title="No performance data"
            description="Campaign trends will render here once ads are active."
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 10, left: -26, bottom: 0 }}>
              <defs>
                <linearGradient id="purpleAreaGradientSoft" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              {/* Only 3 very faint horizontal guides, no vertical grid lines */}
              <CartesianGrid
                vertical={false}
                horizontalPoints={[40, 90, 140]}
                stroke="rgba(0, 0, 0, 0.05)"
                strokeDasharray="4 4"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: '#888888' }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: '#888888' }}
              />
              <RechartsTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload as PerformanceTimeSeriesPoint;
                    return (
                      <div className="rounded-xl bg-[#18181B] p-2.5 text-xs text-white shadow-xl border border-zinc-800">
                        <p className="font-semibold text-zinc-300">{label}</p>
                        <div className="mt-1 space-y-0.5">
                          <p className="text-[#A78BFA]">
                            Leads: <span className="font-bold text-white">{d.leads}</span>
                          </p>
                          <p className="text-emerald-400">
                            Spend: <span className="font-bold text-white">{formatINR(d.spend)}</span>
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="#7C3AED"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="url(#purpleAreaGradientSoft)"
                dot={false}
                activeDot={{ r: 4, stroke: '#7C3AED', strokeWidth: 2, fill: '#FFFFFF' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};
