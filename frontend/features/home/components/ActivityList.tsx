'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Tooltip } from '@/components/ui/Tooltip';
import {
  Sparkles,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { HomeActivityItem } from '../types';

export interface ActivityListProps {
  activities: HomeActivityItem[];
  loading: boolean;
  className?: string;
}

function formatRelativeTime(dateStr: string): string {
  try {
    const diffSeconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diffSeconds < 60) return 'Just now';
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
    return `${Math.floor(diffSeconds / 86400)}d ago`;
  } catch {
    return 'Recently';
  }
}

export const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  loading,
  className,
}) => {
  // Exactly 3 items
  const displayItems = activities.slice(0, 3);

  const getStatusMeta = (status: HomeActivityItem['status'], category: HomeActivityItem['category']) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Executed autonomously',
          circleBg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
        };
      case 'in_progress':
        return {
          label: 'Action in progress',
          circleBg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
        };
      case 'requires_action':
        return {
          label: 'Waiting for sign-off',
          circleBg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
        };
      default:
        return {
          label: 'Logged operation',
          circleBg: 'bg-purple-50 dark:bg-purple-950/40 text-[#7C3AED] dark:text-[#A78BFA]',
        };
    }
  };

  const getCategoryIcon = (category: HomeActivityItem['category']) => {
    switch (category) {
      case 'optimization':
        return <RefreshCw className="h-3.5 w-3.5" />;
      case 'creative':
        return <Sparkles className="h-3.5 w-3.5" />;
      case 'campaign':
        return <AlertCircle className="h-3.5 w-3.5" />;
      case 'lead':
        return <Users className="h-3.5 w-3.5" />;
      default:
        return <CheckCircle2 className="h-3.5 w-3.5" />;
    }
  };

  return (
    <Card
      className={cn(
        'p-6 rounded-[20px] bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626]',
        'shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between h-full overflow-hidden',
        className
      )}
    >
      {/* Header: Title and View all link */}
      <div className="flex items-center justify-between pb-3 shrink-0">
        <h3 className="font-sans text-sm sm:text-base font-semibold text-[#111111] dark:text-[#EDEDED] tracking-tight">
          DIYA activity
        </h3>

        <Link
          href="/timeline"
          className="text-xs font-semibold text-[#7C3AED] hover:text-[#6D28D9] dark:text-[#A78BFA] transition-colors"
        >
          View all
        </Link>
      </div>

      {/* 3 items: icon in a soft tinted circle, title, time on right, NO dividers */}
      <div className="flex flex-col gap-3 my-auto py-1">
        {displayItems.length === 0 ? (
          <div className="py-6 text-center text-xs text-[#71717A] dark:text-[#888888]">
            No recent autonomous actions recorded.
          </div>
        ) : (
          displayItems.map((item) => {
            const statusMeta = getStatusMeta(item.status, item.category);

            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 px-2.5 py-2 rounded-xl hover:bg-[#F4F4F6]/70 dark:hover:bg-[#1A1A1E]/70 transition-colors text-xs"
              >
                {/* Left: Icon in soft tinted circle with status tooltip, Title */}
                <div className="flex items-center gap-3 min-w-0">
                  <Tooltip content={statusMeta.label}>
                    <div
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform',
                        statusMeta.circleBg
                      )}
                    >
                      {getCategoryIcon(item.category)}
                    </div>
                  </Tooltip>

                  <span className="font-medium text-[#18181B] dark:text-[#EDEDED] truncate leading-tight">
                    {item.title}
                  </span>
                </div>

                {/* Right: Time */}
                <span className="text-[11px] text-[#A1A1AA] dark:text-[#71717A] shrink-0 font-medium">
                  {formatRelativeTime(item.timestamp)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};
