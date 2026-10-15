'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils/format';
import { Megaphone, Users, Calendar, Layers, ShieldCheck } from 'lucide-react';
import type { CampaignPreviewData } from '../../types';

export interface CampaignPreviewCardProps {
  campaign: CampaignPreviewData;
}

export const CampaignPreviewCard: React.FC<CampaignPreviewCardProps> = ({ campaign }) => {
  return (
    <Card className="p-4 border border-[#E4E4E7] bg-white shadow-xs max-w-xl my-2">
      <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F6]">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EDE9FE] text-[#7C3AED]">
            <Megaphone className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#71717A] font-semibold uppercase tracking-wider block">
              Omnichannel Campaign Flight
            </span>
            <h5 className="text-xs sm:text-sm font-bold text-[#18181B]">{campaign.name}</h5>
          </div>
        </div>

        <Badge variant="primary" size="sm" dot>
          Draft Preview
        </Badge>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5 text-xs">
        <div className="p-2 rounded-lg bg-[#FAFAFC] border border-[#F4F4F6]">
          <span className="text-[10px] text-[#71717A] block font-medium">Objective</span>
          <span className="font-semibold text-[#18181B] mt-0.5 block">{campaign.objective}</span>
        </div>

        <div className="p-2 rounded-lg bg-[#FAFAFC] border border-[#F4F4F6]">
          <span className="text-[10px] text-[#71717A] block font-medium">Daily Budget</span>
          <span className="font-semibold text-[#18181B] mt-0.5 block">
            {formatINR(campaign.dailyBudgetINR)} / day
          </span>
        </div>

        <div className="col-span-2 p-2 rounded-lg bg-[#FAFAFC] border border-[#F4F4F6]">
          <span className="text-[10px] text-[#71717A] block font-medium flex items-center gap-1">
            <Users className="h-3 w-3 text-[#7C3AED]" /> Target Audience Profile
          </span>
          <p className="text-[11px] text-[#18181B] mt-0.5 leading-relaxed font-medium">
            {campaign.targetAudience}
          </p>
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-[#F4F4F6] flex items-center justify-between text-[11px] text-[#71717A]">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3 text-[#A1A1AA]" />
          {campaign.schedule}
        </span>
        <span className="flex items-center gap-1 font-medium text-[#7C3AED]">
          <Layers className="h-3 w-3" />
          {campaign.adSetsCount} Ad Sets Prepared
        </span>
      </div>
    </Card>
  );
};
