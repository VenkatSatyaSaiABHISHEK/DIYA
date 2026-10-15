'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { formatINR } from '@/lib/utils/format';
import { X, Columns, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCampaignsStore } from '../../store/campaigns.store';
import type { Campaign } from '../../types';

export interface CampaignComparePanelProps {
  campaigns: Campaign[];
}

export const CampaignComparePanel: React.FC<CampaignComparePanelProps> = ({ campaigns }) => {
  const { clearCompare, toggleCompare } = useCampaignsStore();

  if (campaigns.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-8 sm:w-[860px] z-40 animate-slideUp">
      <GlassCard className="p-4 rounded-2xl shadow-2xl border border-white/80 bg-white/95 backdrop-blur-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F6]">
          <div className="flex items-center gap-2">
            <Columns className="h-4 w-4 text-[#7C3AED]" />
            <h4 className="text-xs sm:text-sm font-bold text-[#18181B]">
              Side-by-Side Comparison ({campaigns.length} Selected)
            </h4>
            <span className="text-[11px] text-[#71717A] hidden sm:inline">
              Compare efficiency and acquisition metrics
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={clearCompare}
              className="text-xs text-[#71717A] hover:text-[#DC2626] font-medium"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={clearCompare}
              className="p-1 rounded-lg text-[#71717A] hover:text-[#18181B] hover:bg-black/5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div
          className={`mt-3 grid gap-3 divide-y sm:divide-y-0 sm:divide-x divide-[#F4F4F6] grid-cols-1 sm:grid-cols-${campaigns.length}`}
        >
          {campaigns.map((camp) => (
            <div key={camp.id} className="pt-2 sm:pt-0 sm:px-3 first:pl-0 last:pr-0 space-y-2 text-xs">
              <div className="flex items-start justify-between gap-1">
                <div>
                  <span className="text-[10px] font-bold text-[#7C3AED] uppercase">
                    {camp.platform} • {camp.objective}
                  </span>
                  <h5 className="font-bold text-[#18181B] line-clamp-1">{camp.name}</h5>
                </div>
                <button
                  type="button"
                  onClick={() => toggleCompare(camp.id)}
                  className="text-[#A1A1AA] hover:text-[#18181B]"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-1.5 rounded-lg bg-[#FAFAFC] border border-[#F4F4F6]">
                  <span className="text-[10px] text-[#71717A] block">Total Spend</span>
                  <span className="font-bold text-[#18181B]">{formatINR(camp.spendTotalINR)}</span>
                </div>

                <div className="p-1.5 rounded-lg bg-[#FAFAFC] border border-[#F4F4F6]">
                  <span className="text-[10px] text-[#71717A] block">Leads</span>
                  <span className="font-bold text-[#16A34A]">{camp.leadsCount || '-'}</span>
                </div>

                <div className="p-1.5 rounded-lg bg-[#FAFAFC] border border-[#F4F4F6]">
                  <span className="text-[10px] text-[#71717A] block">Cost / Lead</span>
                  <span className="font-bold text-[#18181B]">
                    {camp.cplINR > 0 ? formatINR(camp.cplINR) : '-'}
                  </span>
                </div>

                <div className="p-1.5 rounded-lg bg-[#FAFAFC] border border-[#F4F4F6]">
                  <span className="text-[10px] text-[#71717A] block">ROAS</span>
                  <span className="font-bold text-[#7C3AED]">
                    {camp.roas > 0 ? `${camp.roas}x` : '-'}
                  </span>
                </div>

                <div className="p-1.5 rounded-lg bg-[#FAFAFC] border border-[#F4F4F6]">
                  <span className="text-[10px] text-[#71717A] block">Clicks (CTR)</span>
                  <span className="font-medium text-[#18181B]">
                    {camp.clicks} ({camp.ctr}%)
                  </span>
                </div>

                <div className="p-1.5 rounded-lg bg-[#FAFAFC] border border-[#F4F4F6]">
                  <span className="text-[10px] text-[#71717A] block">CPC</span>
                  <span className="font-medium text-[#18181B]">
                    {camp.cpcINR > 0 ? formatINR(camp.cpcINR) : '-'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
