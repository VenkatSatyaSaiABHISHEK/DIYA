'use client';

import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Clock,
  TrendingUp,
  Share2,
  CheckCircle2,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { useAttributionModel } from '../../hooks/useAttributionModel';
import { ATTRIBUTION_MODELS } from '../../constants';
import type { AttributionModelType } from '../../types';

export const AttributionTab: React.FC = () => {
  const { paths, isLoading, activeModel, setActiveModel } = useAttributionModel();

  return (
    <div className="space-y-6">
      {/* 1. Attribution Model Switcher */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F4F4F5] pb-3">
          <div>
            <h2 className="text-sm font-bold text-[#18181B] flex items-center gap-1.5">
              <Share2 className="h-4 w-4 text-[#7C3AED]" />
              Attribution Model Configuration
            </h2>
            <p className="text-xs text-[#71717A] mt-0.5">
              Select how credit for closed deals is weighted across intermediate marketing touches
            </p>
          </div>
          <span className="text-[10px] font-bold text-[#7C3AED] bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
            Multi-Touch Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ATTRIBUTION_MODELS.map((m) => {
            const isActive = activeModel === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveModel(m.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'border-[#7C3AED] bg-purple-50/50 text-[#7C3AED] ring-1 ring-[#7C3AED]'
                    : 'border-[#E4E4E7] bg-white text-[#71717A] hover:bg-zinc-50'
                }`}
              >
                <span className="block text-xs font-bold text-[#18181B]">{m.label}</span>
                <span className="block text-[11px] text-[#71717A] mt-1 leading-relaxed">
                  {m.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Top Customer Conversion Paths */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F4F4F5] pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#18181B]">
              Top Multi-Touch Customer Conversion Journeys
            </h3>
            <p className="text-xs text-[#71717A] mt-0.5">
              Sequence of ads, landing pages, and bots engaged prior to booking a Kokapet site visit
            </p>
          </div>
          <span className="text-xs font-semibold text-[#71717A]">
            Avg Conversion Velocity: <strong className="text-[#18181B]">12.4 Days</strong>
          </span>
        </div>

        <div className="space-y-4">
          {paths.map((p) => {
            const revCrores = (p.revenueAttributedINR / 10000000).toFixed(1);

            return (
              <div
                key={p.id}
                className="p-4 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] space-y-3 hover:border-[#7C3AED]/30 transition-all"
              >
                {/* Path Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#18181B]">{p.pathName}</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200">
                      {p.sharePercentage}% of Revenue
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-[#71717A]">
                      Conversions: <strong className="text-[#18181B]">{p.conversionsCount}</strong>
                    </span>
                    <span className="text-[#71717A]">
                      Attributed: <strong className="text-emerald-600">₹{revCrores} Cr</strong>
                    </span>
                    <span className="text-[#71717A] flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {p.averageDaysToConvert} Days
                    </span>
                  </div>
                </div>

                {/* Step Journey Flow */}
                <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
                  {p.steps.map((st, idx) => (
                    <React.Fragment key={idx}>
                      <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E4E4E7] shadow-2xs text-xs font-semibold text-[#18181B] whitespace-nowrap shrink-0 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#7C3AED]" />
                        <span>{st.label}</span>
                      </div>
                      {idx < p.steps.length - 1 && (
                        <ChevronRight className="h-4 w-4 text-[#A1A1AA] shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
