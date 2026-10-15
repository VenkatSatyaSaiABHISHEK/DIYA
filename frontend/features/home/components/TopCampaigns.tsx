'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { ArrowRight } from 'lucide-react';
import type { HomeCampaignItem } from '../types';
import type { AdPlatform, CampaignStatus } from '@/types/shared';
import { cn } from '@/lib/utils/cn';

export interface TopCampaignsProps {
  campaigns: HomeCampaignItem[];
  loading: boolean;
  className?: string;
}

const platformMeta: Record<
  AdPlatform,
  { label: string; bg: string; text: string }
> = {
  meta: { label: 'Meta', bg: 'bg-[#1877F2]/10', text: 'text-[#1877F2]' },
  google: { label: 'Google', bg: 'bg-[#EA4335]/10', text: 'text-[#EA4335]' },
  instagram: { label: 'Instagram', bg: 'bg-[#E1306C]/10', text: 'text-[#E1306C]' },
  linkedin: { label: 'LinkedIn', bg: 'bg-[#0A66C2]/10', text: 'text-[#0A66C2]' },
  twitter: { label: 'X', bg: 'bg-black/10', text: 'text-black dark:text-white' },
  youtube: { label: 'YouTube', bg: 'bg-[#FF0000]/10', text: 'text-[#FF0000]' },
};

export const TopCampaigns: React.FC<TopCampaignsProps> = ({
  campaigns,
  loading,
  className,
}) => {
  // 3 compact rows
  const topItems = campaigns.slice(0, 3);

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
          <Badge variant="neutral" size="sm">
            Draft
          </Badge>
        );
    }
  };

  return (
    <Card
      className={cn(
        'p-6 sm:p-7 rounded-[22px] bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626]',
        'shadow-[0_4px_24px_rgba(124,58,237,0.06)] flex flex-col justify-between',
        className
      )}
    >
      {/* Header: Title and View all link */}
      <div className="flex items-center justify-between pb-5 border-b border-[#F4F4F6] dark:border-[#222]">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] dark:text-[#EDEDED] tracking-tight">
            Top campaigns
          </h3>
          <p className="text-xs text-[#71717A] dark:text-[#888888] mt-0.5">
            Active cross-channel ad flights
          </p>
        </div>

        <Link
          href="/campaigns"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#7C3AED] hover:text-[#6D28D9] dark:text-[#A78BFA] transition-colors"
        >
          <span>View all campaigns</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 3 Compact Rows */}
      <div className="mt-5 flex flex-col divide-y divide-[#F4F4F6] dark:divide-[#222]">
        {loading ? (
          <div className="space-y-4 py-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <Skeleton width="40%" height={16} />
                <Skeleton width="20%" height={16} />
              </div>
            ))}
          </div>
        ) : topItems.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#71717A] dark:text-[#888888]">
            No campaigns running yet.
          </div>
        ) : (
          topItems.map((camp) => {
            const p = platformMeta[camp.platform] || platformMeta.meta;

            return (
              <div
                key={camp.id}
                className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs"
              >
                {/* Left: Platform Tag, Name */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={cn(
                      'inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0',
                      p.bg,
                      p.text
                    )}
                  >
                    {p.label}
                  </span>

                  <span className="font-medium text-[#18181B] dark:text-[#EDEDED] truncate">
                    {camp.name}
                  </span>
                </div>

                {/* Right: Status Badge & Key Number */}
                <div className="flex items-center gap-3 shrink-0">
                  {getStatusBadge(camp.status)}
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {camp.roas > 0 ? `${camp.roas}x ROAS` : `${camp.leads} leads`}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};
