'use client';

import React from 'react';
import { StrategyView } from '@/features/diya/components/strategy/StrategyView';

export default function StrategyPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111] dark:text-[#EDEDED] tracking-tight">
            Marketing Strategy
          </h1>
          <p className="text-sm text-[#666] dark:text-[#888] mt-1">
            30-day autonomous growth roadmap across paid ads, organic content, and lead conversion.
          </p>
        </div>
      </div>

      <StrategyView />
    </div>
  );
}
