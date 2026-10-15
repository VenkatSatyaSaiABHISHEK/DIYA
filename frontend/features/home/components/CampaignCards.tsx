'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatINR, formatNumber } from '@/lib/utils/format';
import { Megaphone, Globe, Layers, ArrowUpRight } from 'lucide-react';
import type { HomeCampaignItem } from '../types';
import type { AdPlatform, CampaignStatus } from '@/types/shared';
import { cn } from '@/lib/utils/cn';

export interface CampaignCardsProps {
  campaigns: HomeCampaignItem[];
  loading: boolean;
  compact?: boolean;
}

const platformMeta: Record<
  AdPlatform,
  { label: string; bg: string; text: string; icon: string }
> = {
  meta: { label: 'Meta Ads', bg: 'bg-[#1877F2]/10', text: 'text-[#1877F2]', icon: 'Meta' },
  google: { label: 'Google Ads', bg: 'bg-[#EA4335]/10', text: 'text-[#EA4335]', icon: 'Google' },
  instagram: { label: 'Instagram', bg: 'bg-[#E1306C]/10', text: 'text-[#E1306C]', icon: 'IG' },
  linkedin: { label: 'LinkedIn', bg: 'bg-[#0A66C2]/10', text: 'text-[#0A66C2]', icon: 'IN' },
  twitter: { label: 'X (Twitter)', bg: 'bg-black/10', text: 'text-black', icon: 'X' },
  youtube: { label: 'YouTube', bg: 'bg-[#FF0000]/10', text: 'text-[#FF0000]', icon: 'YT' },
};

export const CampaignCards: React.FC<CampaignCardsProps> = ({ campaigns, loading, compact = false }) => {
  const getStatusBadge = (status: CampaignStatus) => {
    switch (status) {
      case 'live':
        return (
          <Badge variant="success" size="sm" dot>
            Live
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="primary" size="sm" dot>
            Approved
          </Badge>
        );
      case 'recommendation':
        return (
          <Badge variant="warning" size="sm" dot>
            Recommendation
          </Badge>
        );
      case 'draft':
      default:
        return (
          <Badge variant="neutral" size="sm" dot>
            Draft
          </Badge>
        );
    }
  };

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#EDE9FE] dark:bg-[#7C3AED]/20 text-[#7C3AED]">
              <Layers className="h-3.5 w-3.5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#18181B] dark:text-[#EDEDED]">Active Marketing Campaigns</h3>
              <p className="text-[10px] text-[#71717A] dark:text-[#888]">4 cross-channel flights scaled by DIYA</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-[#7C3AED] dark:text-[#A78BFA] bg-[#EDE9FE]/50 dark:bg-[#7C3AED]/15 px-2 py-0.5 rounded-full">
            Autonomous
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-2.5 rounded-xl border border-[#EAEAEA] dark:border-[#262626] bg-white dark:bg-[#0E0E10] h-[106px] flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <Skeleton width="40%" height={14} />
                  <Skeleton width="25%" height={14} />
                </div>
                <Skeleton width="85%" height={14} />
                <div className="grid grid-cols-4 gap-1 pt-1 border-t border-[#F4F4F6] dark:border-[#222]">
                  <Skeleton width="100%" height={10} />
                  <Skeleton width="100%" height={10} />
                  <Skeleton width="100%" height={10} />
                  <Skeleton width="100%" height={10} />
                </div>
              </div>
            ))}
          </div>
        ) : campaigns.length === 0 ? (
          <EmptyState
            title="No campaigns running"
            description="Ask DIYA to generate an omnichannel campaign."
            className="py-4"
          />
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {campaigns.slice(0, 4).map((camp) => {
              const p = platformMeta[camp.platform] || platformMeta.meta;

              return (
                <Card
                  key={camp.id}
                  hoverEffect
                  className="flex flex-col justify-between p-2.5 bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626] h-[106px] shadow-2xs"
                >
                  <div>
                    {/* Platform & Status */}
                    <div className="flex items-center justify-between gap-1.5">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold ${p.bg} ${p.text}`}
                      >
                        {p.label}
                      </span>
                      {getStatusBadge(camp.status)}
                    </div>

                    {/* Campaign Name */}
                    <h4 className="text-xs font-bold text-[#18181B] dark:text-[#EDEDED] truncate leading-tight mt-1">
                      {camp.name}
                    </h4>
                    <span className="text-[10px] text-[#71717A] dark:text-[#888] truncate block">
                      {camp.objective}
                    </span>
                  </div>

                  {/* Metrics 4-Col Row */}
                  <div className="pt-1.5 border-t border-[#F4F4F6] dark:border-[#222] grid grid-cols-4 gap-1 text-center">
                    <div className="text-left">
                      <span className="text-[9px] text-[#71717A] dark:text-[#888] block">Spend</span>
                      <span className="text-[11px] font-bold text-[#18181B] dark:text-[#EDEDED] block leading-tight">
                        {camp.spend > 0 ? (camp.spend >= 1000 ? `₹${(camp.spend / 1000).toFixed(camp.spend % 1000 === 0 ? 0 : 1)}k` : `₹${camp.spend}`) : '₹0'}
                      </span>
                    </div>

                    <div className="text-left">
                      <span className="text-[9px] text-[#71717A] dark:text-[#888] block">Leads</span>
                      <span className="text-[11px] font-bold text-[#18181B] dark:text-[#EDEDED] block leading-tight">
                        {camp.leads > 0 ? camp.leads : '0'}
                      </span>
                    </div>

                    <div className="text-left">
                      <span className="text-[9px] text-[#71717A] dark:text-[#888] block">CPL</span>
                      <span className="text-[11px] font-bold text-[#18181B] dark:text-[#EDEDED] block leading-tight">
                        {camp.costPerLead > 0 ? `₹${camp.costPerLead}` : '—'}
                      </span>
                    </div>

                    <div className="text-left">
                      <span className="text-[9px] text-[#71717A] dark:text-[#888] block">ROAS</span>
                      <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 block leading-tight">
                        {camp.roas > 0 ? `${camp.roas}x` : '—'}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#18181B] dark:text-[#EDEDED]">Active Marketing Campaigns</h3>
          <p className="text-xs text-[#71717A] dark:text-[#888]">
            Autonomous cross-channel campaigns monitored and scaled by DIYA
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="content-card p-4 space-y-3">
              <div className="flex justify-between items-center">
                <Skeleton width="40%" height={16} />
                <Skeleton width="25%" height={16} />
              </div>
              <Skeleton width="80%" height={18} />
              <div className="pt-2 border-t border-[#F4F4F6] grid grid-cols-2 gap-2">
                <Skeleton width="60%" height={12} />
                <Skeleton width="60%" height={12} />
              </div>
            </div>
          ))}
        </div>
      ) : campaigns.length === 0 ? (
        <EmptyState
          title="No campaigns running"
          description="Ask DIYA to generate an omnichannel campaign or link your Meta and Google Ads accounts."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {campaigns.map((camp) => {
            const p = platformMeta[camp.platform] || platformMeta.meta;

            return (
              <Card
                key={camp.id}
                hoverEffect
                className="flex flex-col justify-between p-4 bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626]"
              >
                <div>
                  {/* Platform & Status */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${p.bg} ${p.text}`}
                    >
                      {p.label}
                    </span>
                    {getStatusBadge(camp.status)}
                  </div>

                  {/* Campaign Name & Objective */}
                  <div className="mt-3">
                    <h4 className="text-sm font-bold text-[#18181B] dark:text-[#EDEDED] line-clamp-1 leading-snug">
                      {camp.name}
                    </h4>
                    <span className="text-[11px] text-[#71717A] dark:text-[#888] mt-0.5 block">
                      Objective: {camp.objective}
                    </span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="mt-4 pt-3 border-t border-[#F4F4F6] dark:border-[#222] grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-[#71717A] dark:text-[#888] block font-medium">Spend</span>
                    <span className="text-xs font-bold text-[#18181B] dark:text-[#EDEDED]">
                      {camp.spend > 0 ? formatINR(camp.spend) : '₹0'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#71717A] dark:text-[#888] block font-medium">Leads</span>
                    <span className="text-xs font-bold text-[#18181B] dark:text-[#EDEDED]">
                      {camp.leads > 0 ? formatNumber(camp.leads) : '0'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#71717A] dark:text-[#888] block font-medium">Cost / Lead</span>
                    <span className="text-xs font-bold text-[#18181B] dark:text-[#EDEDED]">
                      {camp.costPerLead > 0 ? formatINR(camp.costPerLead) : '—'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#71717A] dark:text-[#888] block font-medium">ROAS</span>
                    <span className="text-xs font-bold text-[#16A34A] dark:text-emerald-400">
                      {camp.roas > 0 ? `${camp.roas}x` : '—'}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
