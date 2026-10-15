'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { BarChart3, TrendingUp, TrendingDown, HelpCircle, ArrowRight } from 'lucide-react';
import type { ReportData } from '../../types';
import { cn } from '@/lib/utils/cn';

export interface ReportCardProps {
  report: ReportData;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  return (
    <Card className="p-4 border border-[#E4E4E7] bg-white shadow-xs max-w-xl my-2">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F6]">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EDE9FE] text-[#7C3AED]">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#71717A] font-semibold uppercase tracking-wider block">
              DIYA Performance Diagnostic
            </span>
            <h5 className="text-xs sm:text-sm font-bold text-[#18181B]">{report.title}</h5>
          </div>
        </div>

        <span className="text-[11px] font-medium text-[#71717A] bg-[#F4F4F6] px-2 py-0.5 rounded-md">
          {report.period}
        </span>
      </div>

      {/* Metrics Row */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        {report.metrics.map((m, idx) => (
          <div key={idx} className="p-2.5 rounded-lg bg-[#FAFAFC] border border-[#F4F4F6]">
            <span className="text-[10px] text-[#71717A] block font-medium">{m.label}</span>
            <span className="text-sm font-bold text-[#18181B] mt-0.5 block">{m.value}</span>
            <span
              className={cn(
                'text-[10px] font-semibold inline-flex items-center gap-0.5 mt-0.5',
                m.isPositive ? 'text-[#15803D]' : 'text-[#B91C1C]'
              )}
            >
              {m.isPositive ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
              {m.change}
            </span>
          </div>
        ))}
      </div>

      {/* Analysis Callout */}
      <div className="mt-3 space-y-2 text-xs">
        <div className="p-2.5 rounded-lg bg-[#FAFAFC] border border-[#F4F4F6]">
          <span className="text-[10px] font-bold text-[#18181B] uppercase tracking-wider block mb-0.5">
            What Changed
          </span>
          <p className="text-[#52525B] leading-relaxed">{report.whatChanged}</p>
        </div>

        <div className="p-2.5 rounded-lg bg-[#FAFAFC] border border-[#F4F4F6]">
          <span className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-wider block mb-0.5">
            Likely Root Cause (Supported by Ad Data)
          </span>
          <p className="text-[#52525B] leading-relaxed">{report.likelyCause}</p>
        </div>

        <div className="p-2.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0]">
          <span className="text-[10px] font-bold text-[#15803D] uppercase tracking-wider block mb-0.5">
            Recommended Next Action
          </span>
          <p className="text-[#166534] font-medium leading-relaxed">{report.recommendedNextAction}</p>
        </div>
      </div>
    </Card>
  );
};
