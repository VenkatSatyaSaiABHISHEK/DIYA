'use client';

import React from 'react';
import type { ContentStatus } from '../../types';

interface ContentSummaryChipsProps {
  summary: {
    total: number;
    scheduled: number;
    published: number;
    needsApproval: number;
    drafts: number;
  };
  activeStatus: ContentStatus | 'all';
  onSelectStatus: (status: ContentStatus | 'all') => void;
}

export const ContentSummaryChips: React.FC<ContentSummaryChipsProps> = ({
  summary,
  activeStatus,
  onSelectStatus,
}) => {
  const chips: { id: ContentStatus | 'all'; label: string; count: number; colorClass: string }[] = [
    {
      id: 'all',
      label: 'All Content',
      count: summary.total,
      colorClass: 'bg-zinc-100 text-zinc-800 border-zinc-200',
    },
    {
      id: 'scheduled',
      label: 'Scheduled',
      count: summary.scheduled,
      colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'needs_approval',
      label: 'Needs Approval',
      count: summary.needsApproval,
      colorClass: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'draft',
      label: 'Drafts',
      count: summary.drafts,
      colorClass: 'bg-zinc-100 text-zinc-600 border-zinc-200',
    },
    {
      id: 'published',
      label: 'Published (Demo)',
      count: summary.published,
      colorClass: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => {
        const isActive = activeStatus === chip.id;
        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => onSelectStatus(chip.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              isActive
                ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-xs'
                : `${chip.colorClass} hover:opacity-80`
            }`}
          >
            <span>{chip.label}</span>
            <span
              className={`inline-flex items-center justify-center min-w-[18px] h-4.5 px-1.5 rounded-full text-[10px] font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-black/5 text-inherit'
              }`}
            >
              {chip.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
