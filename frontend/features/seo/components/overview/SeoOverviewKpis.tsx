'use client';

import React from 'react';
import { Globe, TrendingUp, Search, CheckCircle2, ArrowUpRight } from 'lucide-react';
import type { SeoOverviewData } from '../../types';

interface SeoOverviewKpisProps {
  data: SeoOverviewData;
}

export const SeoOverviewKpis: React.FC<SeoOverviewKpisProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Health Score */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#71717A]">Domain Health Score</span>
          <div className="h-8 w-8 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center">
            <Globe className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-[#18181B]">{data.healthScore}</span>
          <span className="text-xs font-semibold text-[#71717A]">/ 100</span>
          <span className="ml-auto inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <ArrowUpRight className="h-3 w-3" />
            +{data.healthScore - data.previousHealthScore} pts
          </span>
        </div>
        <div className="mt-2 w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#7C3AED] h-full rounded-full transition-all duration-500"
            style={{ width: `${data.healthScore}%` }}
          />
        </div>
      </div>

      {/* 2. Monthly Organic Visitors */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#71717A]">Organic Monthly Visits</span>
          <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-[#18181B]">
            {data.organicVisits.toLocaleString('en-IN')}
          </span>
          <span className="ml-auto inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <ArrowUpRight className="h-3 w-3" />
            +{data.organicVisitsChange}% YoY
          </span>
        </div>
        <p className="mt-2 text-[11px] text-[#71717A]">Targeting West Hyderabad tech corridor</p>
      </div>

      {/* 3. Tracked Keywords */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#71717A]">Tracked Keywords</span>
          <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Search className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-[#18181B]">{data.trackedKeywords}</span>
          <span className="text-xs text-[#71717A]">queries</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[11px]">
          <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
            {data.top3Keywords} Top 3
          </span>
          <span className="font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
            {data.top10Keywords} Top 10
          </span>
        </div>
      </div>

      {/* 4. Indexed Pages */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#71717A]">Google Indexed Pages</span>
          <div className="h-8 w-8 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-[#18181B]">{data.indexedPages}</span>
          <span className="text-xs text-[#71717A]">pages</span>
          <span className="ml-auto text-xs font-semibold text-emerald-600">
            0 Crawl Errors
          </span>
        </div>
        <p className="mt-2 text-[11px] text-[#71717A]">100% Mobile indexability validated</p>
      </div>
    </div>
  );
};
