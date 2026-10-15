'use client';

import React from 'react';
import { AutomationsView } from '@/features/diya/components/automations/AutomationsView';

export default function AutomationsPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111] dark:text-[#EDEDED] tracking-tight">
            Automations
          </h1>
          <p className="text-sm text-[#666] dark:text-[#888] mt-1">
            Event-driven background AI rules, spend safety gates, and automated lead nurturing.
          </p>
        </div>
      </div>

      <AutomationsView />
    </div>
  );
}
