'use client';

import React from 'react';
import { Layers, AlertTriangle, ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { useChannelPerformance } from '../../hooks/useChannelPerformance';

export const FunnelTab: React.FC = () => {
  const { funnelStages, isLoading } = useChannelPerformance();

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-[#18181B] flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#7C3AED]" />
            Full-Funnel Drop-Off & Velocity Diagnostic
          </h2>
          <p className="text-xs text-[#71717A] mt-0.5">
            Pinpoints friction points between top-of-funnel ad views and closed real estate tokens
          </p>
        </div>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          6 Funnel Milestones Active
        </span>
      </div>

      {/* 2. Funnel Stages Breakdown */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs space-y-4">
        <div className="space-y-3">
          {funnelStages.map((stage, idx) => {
            const widthPercentage = Math.max(100 - idx * 14, 25);

            return (
              <div key={stage.stageNumber} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#18181B] text-white text-[10px] font-bold">
                      {stage.stageNumber}
                    </span>
                    <span className="font-bold text-[#18181B]">{stage.stageName}</span>
                    {stage.isBottleneck && (
                      <span className="px-2 py-0.2 rounded-full bg-red-50 text-red-700 text-[10px] font-bold border border-red-200 flex items-center gap-1">
                        <AlertTriangle className="h-2.5 w-2.5" />
                        Bottleneck
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-extrabold text-[#18181B]">
                      {stage.volume.toLocaleString('en-IN')}
                    </span>
                    {idx > 0 && (
                      <span
                        className={`text-[11px] font-bold ${
                          stage.isBottleneck ? 'text-red-600' : 'text-emerald-600'
                        }`}
                      >
                        {stage.conversionRateFromPrevious}% step conv.
                      </span>
                    )}
                  </div>
                </div>

                {/* Funnel Visual Bar */}
                <div className="w-full bg-[#F4F4F5] h-7 rounded-xl overflow-hidden p-1 flex items-center">
                  <div
                    className={`h-full rounded-lg transition-all duration-500 flex items-center px-3 text-white text-[10px] font-bold ${
                      stage.isBottleneck
                        ? 'bg-linear-to-r from-red-500 to-amber-500'
                        : 'bg-linear-to-r from-[#7C3AED] to-purple-500'
                    }`}
                    style={{ width: `${widthPercentage}%` }}
                  >
                    {stage.volume.toLocaleString('en-IN')} prospects
                  </div>
                </div>

                {/* Drop-off Note */}
                {idx > 0 && (
                  <div className="flex items-center justify-between text-[10px] text-[#A1A1AA] px-1">
                    <span>Drop-off from step {idx}: {stage.overallDropOffRate}%</span>
                    <span>Industry Benchmark: {stage.benchmarkRate}%</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Bottleneck Diagnostic Card */}
      <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-700" />
            <h3 className="text-xs font-bold text-amber-950">
              Primary Bottleneck: Landing Page to Lead Form (1.48% vs 2.5% Benchmark)
            </h3>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed max-w-2xl">
            Mobile users on 4G networks in West Hyderabad are abandoning the lengthy 6-field form.
            DIYA recommends replacing the traditional lead form with an instant 2-step WhatsApp
            verification button on mobile landing pages.
          </p>
        </div>

        <button
          type="button"
          className="px-4 py-2 rounded-xl bg-amber-700 text-white text-xs font-semibold hover:bg-amber-800 transition-all flex items-center gap-1.5 shrink-0 self-start shadow-xs"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Apply 1-Click Mobile Fix</span>
        </button>
      </div>
    </div>
  );
};
