'use client';

import React from 'react';
import { TrendingUp, DollarSign, Target, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { AnalyticsOverviewData } from '../../types';

interface AnalyticsKpiCardsProps {
  data: AnalyticsOverviewData;
}

export const AnalyticsKpiCards: React.FC<AnalyticsKpiCardsProps> = ({ data }) => {
  const revenueCrores = (data.totalPipelineRevenueINR / 10000000).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Attributed Pipeline Revenue */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#71717A]">Attributed Pipeline Revenue</span>
          <div className="h-8 w-8 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center">
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-[#18181B]">₹{revenueCrores} Cr</span>
          <span className="ml-auto inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <ArrowUpRight className="h-3 w-3" />
            +{data.revenueChangeMoM}% MoM
          </span>
        </div>
        <p className="mt-2 text-[11px] text-[#71717A]">Directly tracked from Meta & Google campaigns</p>
      </div>

      {/* 2. Blended ROAS */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#71717A]">Blended Return on Ad Spend</span>
          <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Target className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-emerald-600">{data.blendedRoas}x</span>
          <span className="text-xs text-[#71717A]">ROAS</span>
          <span className="ml-auto text-[11px] font-semibold text-[#71717A]">
            vs {data.roasBenchmark}x Benchmark
          </span>
        </div>
        <div className="mt-2 w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '84%' }} />
        </div>
      </div>

      {/* 3. Customer Acquisition Cost */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#71717A]">Customer Acquisition Cost</span>
          <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <DollarSign className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-[#18181B]">
            ₹{data.customerAcquisitionCostINR.toLocaleString('en-IN')}
          </span>
          <span className="ml-auto inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <ArrowDownRight className="h-3 w-3" />
            {data.cacChange}%
          </span>
        </div>
        <p className="mt-2 text-[11px] text-[#71717A]">Cost per closed booking unit</p>
      </div>

      {/* 4. Total Inbound Leads */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#71717A]">Total Inbound Inquiries</span>
          <div className="h-8 w-8 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center">
            <Users className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-[#18181B]">{data.totalLeadsGenerated}</span>
          <span className="text-xs text-[#71717A]">leads</span>
          <span className="ml-auto text-xs font-semibold text-[#7C3AED]">
            Avg CPL: ₹{data.averageCostPerLeadINR}
          </span>
        </div>
        <p className="mt-2 text-[11px] text-[#71717A]">100% Verified phone & WhatsApp delivery</p>
      </div>
    </div>
  );
};
