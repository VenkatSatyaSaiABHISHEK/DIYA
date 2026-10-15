'use client';

import React from 'react';
import type { LeadStage } from '../../types';

interface LeadsSummaryChipsProps {
  summary: {
    total: number;
    hot: number;
    siteVisit: number;
    negotiation: number;
    converted: number;
  };
  activeStage: LeadStage | 'all';
  onSelectStage: (stage: LeadStage | 'all') => void;
}

export const LeadsSummaryChips: React.FC<LeadsSummaryChipsProps> = ({
  summary,
  activeStage,
  onSelectStage,
}) => {
  const chips: { id: LeadStage | 'all'; label: string; count: number; colorClass: string }[] = [
    {
      id: 'all',
      label: 'All Inbound Leads',
      count: summary.total,
      colorClass: 'bg-zinc-100 text-zinc-800 border-zinc-200',
    },
    {
      id: 'site_visit',
      label: 'Site Visits Booked',
      count: summary.siteVisit,
      colorClass: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'negotiation',
      label: 'Negotiation / Token',
      count: summary.negotiation,
      colorClass: 'bg-orange-50 text-orange-700 border-orange-200',
    },
    {
      id: 'converted',
      label: 'Converted Deals',
      count: summary.converted,
      colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => {
        const isActive = activeStage === chip.id;
        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => onSelectStage(chip.id)}
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
