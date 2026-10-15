'use client';

import React, { useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { Sparkles, CheckCircle2, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { animateStagger } from '@/lib/animations/stagger';
import type { HomeActivityItem } from '../types';
import { cn } from '@/lib/utils/cn';

export interface ActivityFeedProps {
  activities: HomeActivityItem[];
  loading: boolean;
  compact?: boolean;
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

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, loading, compact = false }) => {
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!listRef.current || loading || activities.length === 0) return;
      const items = listRef.current.querySelectorAll('.activity-item');
      animateStagger(items, { stagger: 0.05, yOffset: 10 });
    },
    { dependencies: [loading, activities.length], scope: listRef }
  );

  const getStatusBadge = (status: HomeActivityItem['status']) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="success" size="sm" dot>
            Executed
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge variant="info" size="sm" dot>
            Working
          </Badge>
        );
      case 'requires_action':
        return (
          <Badge variant="warning" size="sm" dot>
            Approval Needed
          </Badge>
        );
      default:
        return (
          <Badge variant="neutral" size="sm">
            Logged
          </Badge>
        );
    }
  };

  const getCategoryIcon = (category: HomeActivityItem['category']) => {
    switch (category) {
      case 'optimization':
        return <RefreshCw className="h-3 w-3 text-[#16A34A]" />;
      case 'creative':
        return <Sparkles className="h-3 w-3 text-[#7C3AED]" />;
      case 'campaign':
        return <AlertCircle className="h-3 w-3 text-[#F59E0B]" />;
      default:
        return <CheckCircle2 className="h-3 w-3 text-[#71717A]" />;
    }
  };

  return (
    <Card className={cn('flex flex-col bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626]', compact ? 'p-3.5 h-full' : 'p-5 h-full')}>
      <div className={cn('flex items-center justify-between border-b border-[#F4F4F6] dark:border-[#222]', compact ? 'pb-2.5' : 'pb-4')}>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EDE9FE] dark:bg-[#7C3AED]/20 text-[#7C3AED]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#18181B] dark:text-[#EDEDED]">AI Workforce Activity</h3>
            <p className="text-[10px] sm:text-[11px] text-[#71717A] dark:text-[#888]">Autonomous actions stream</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#7C3AED] dark:text-[#A78BFA] bg-[#EDE9FE]/50 dark:bg-[#7C3AED]/15 px-2 py-0.5 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live Feed
        </span>
      </div>

      <div ref={listRef} className={cn('flex flex-col gap-2 flex-1 overflow-y-auto pr-1', compact ? 'mt-2.5 max-h-[465px]' : 'mt-4')}>
        {loading ? (
          <div className="space-y-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-2.5 p-2.5 rounded-xl border border-[#F4F4F6] dark:border-[#222]">
                <Skeleton width={26} height={26} variant="circle" />
                <div className="flex-1 space-y-1">
                  <Skeleton width="50%" height={12} />
                  <Skeleton width="90%" height={10} />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <EmptyState
            title="No recent AI activities"
            description="Autonomous updates will appear here."
            className="my-auto py-6"
          />
        ) : (
          activities.map((item) => (
            <div
              key={item.id}
              className={cn(
                'activity-item flex items-start gap-2.5 rounded-xl border border-[#EAEAEA] dark:border-[#242426] bg-[#FAFAFC]/60 dark:bg-[#121214]/60 hover:bg-[#FAFAFC] dark:hover:bg-[#18181B] transition-colors',
                compact ? 'p-2' : 'p-3'
              )}
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white dark:bg-[#1E1E22] border border-[#E4E4E7] dark:border-[#333] shadow-2xs mt-0.5">
                {getCategoryIcon(item.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-xs font-bold text-[#18181B] dark:text-[#EDEDED] truncate">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-[#A1A1AA] shrink-0 flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    {formatRelativeTime(item.timestamp)}
                  </span>
                </div>

                <p className="text-[11px] text-[#71717A] dark:text-[#888] mt-0.5 line-clamp-1 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-1.5 flex items-center justify-between gap-1.5">
                  {getStatusBadge(item.status)}
                  {item.impact && (
                    <span className="text-[9px] font-semibold text-[#7C3AED] dark:text-[#A78BFA] bg-[#EDE9FE]/50 dark:bg-[#7C3AED]/20 px-1.5 py-0.2 rounded truncate max-w-[170px]">
                      {item.impact}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
