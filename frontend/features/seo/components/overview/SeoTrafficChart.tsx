'use client';

import React, { useState, useRef } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { TrafficPoint } from '../../types';

interface SeoTrafficChartProps {
  history: TrafficPoint[];
}

export const SeoTrafficChart: React.FC<SeoTrafficChartProps> = ({ history }) => {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d');
  const chartWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!chartWrapperRef.current) return;
      gsap.fromTo(
        chartWrapperRef.current,
        { opacity: 0, scaleY: 0.96 },
        { opacity: 1, scaleY: 1, duration: 0.45, ease: 'power2.out' }
      );
    },
    { dependencies: [range], scope: chartWrapperRef }
  );

  return (
    <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-[#18181B]">
            Google Search Organic Traffic & Visibility
          </h3>
          <p className="text-xs text-[#71717A] mt-0.5">
            Organic clicks from Google Search across West Hyderabad target keywords
          </p>
        </div>

        {/* Range Selector */}
        <div className="flex items-center gap-1 bg-[#F4F4F5] p-0.5 rounded-xl border border-[#E4E4E7] self-start sm:self-auto">
          {(['7d', '30d', '90d'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                range === r
                  ? 'bg-white text-[#18181B] shadow-2xs'
                  : 'text-[#71717A] hover:text-[#18181B]'
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Legend & Summary */}
      <div className="flex items-center gap-5 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
          <span className="text-[#71717A]">
            Organic Clicks:{' '}
            <strong className="text-[#18181B]">
              {history.reduce((acc, curr) => acc + curr.organicClicks, 0).toLocaleString()}
            </strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-blue-400" />
          <span className="text-[#71717A]">
            Search Impressions:{' '}
            <strong className="text-[#18181B]">
              {(history.reduce((acc, curr) => acc + curr.impressions, 0) / 1000).toFixed(1)}k
            </strong>
          </span>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div ref={chartWrapperRef} className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="purpleTraffic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="blueTraffic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F5" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#A1A1AA"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#18181B] text-white p-3 rounded-xl shadow-lg border border-white/10 text-xs space-y-1">
                      <p className="font-bold text-[#A78BFA]">{label}</p>
                      <p className="text-zinc-200">
                        Clicks:{' '}
                        <strong className="text-white">
                          {payload[0]?.value?.toLocaleString()}
                        </strong>
                      </p>
                      <p className="text-zinc-200">
                        Impressions:{' '}
                        <strong className="text-white">
                          {payload[1]?.value?.toLocaleString()}
                        </strong>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="organicClicks"
              stroke="#7C3AED"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#purpleTraffic)"
            />
            <Area
              type="monotone"
              dataKey="impressions"
              stroke="#60A5FA"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#blueTraffic)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
