'use client';

import React from 'react';
import { useCampaignsStore } from '../../store/campaigns.store';
import { cn } from '@/lib/utils/cn';
import type { CampaignStatus } from '../../types';

export interface CampaignSummaryChipsProps {
  counts: {
    total: number;
    live: number;
    draft: number;
    pendingApproval: number;
    paused: number;
  };
}

export const CampaignSummaryChips: React.FC<CampaignSummaryChipsProps> = ({ counts }) => {
  const { statusFilter, setStatusFilter } = useCampaignsStore();

  const chips: Array<{ id: 'all' | CampaignStatus; label: string; count: number; color?: string }> = [
    { id: 'all', label: 'All Campaigns', count: counts.total },
    { id: 'live', label: 'Live Active', count: counts.live, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { id: 'draft', label: 'Drafts', count: counts.draft, color: 'text-zinc-700 bg-zinc-100 border-zinc-200' },
    {
      id: 'approved',
      label: 'Pending Approval',
      count: counts.pendingApproval,
      color: 'text-amber-800 bg-amber-50 border-amber-200',
    },
    { id: 'paused', label: 'Paused', count: counts.paused, color: 'text-zinc-600 bg-zinc-50 border-zinc-200' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
      {chips.map((chip) => {
        const isActive = statusFilter === chip.id;

        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => setStatusFilter(chip.id)}
            className={cn(
              'shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all select-none',
              isActive
                ? 'bg-[#18181B] text-white border-[#18181B] shadow-2xs'
                : 'bg-white text-[#52525B] border-[#E4E4E7] hover:border-[#D4D4D8] hover:text-[#18181B]'
            )}
          >
            <span>{chip.label}</span>
            <span
              className={cn(
                'px-1.5 py-0.2 rounded-full text-[10px] font-bold',
                isActive ? 'bg-white/20 text-white' : chip.color || 'bg-zinc-100 text-zinc-700'
              )}
            >
              {chip.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
