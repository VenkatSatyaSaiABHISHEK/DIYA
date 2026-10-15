'use client';

import React from 'react';
import { useAIStatusStore } from '@/store/ai-status.store';
import { Tooltip } from '@/components/ui/Tooltip';
import type { AIWorkStatus } from '@/types/shared';
import { cn } from '@/lib/utils/cn';

export interface AIStatusProps {
  className?: string;
  compact?: boolean;
}

export const AIStatus: React.FC<AIStatusProps> = ({ className, compact = false }) => {
  const { status, statusLabel, detailMessage } = useAIStatusStore();

  const dotClasses: Record<AIWorkStatus, string> = {
    idle: 'bg-[#71717A]',
    analyzing: 'bg-[#2563EB] animate-pulse',
    planning: 'bg-[#7C3AED] animate-pulse',
    creating: 'bg-[#9333EA] animate-pulse',
    optimizing: 'bg-[#16A34A] animate-pulse',
    running: 'bg-[#16A34A] animate-pulse',
    awaiting_approval: 'bg-[#F59E0B]',
  };

  const badgeBg: Record<AIWorkStatus, string> = {
    idle: 'bg-[#F4F4F6] text-[#52525B] border-[#E4E4E7]',
    analyzing: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
    planning: 'bg-[#FAF5FF] text-[#6D28D9] border-[#DDD6FE]',
    creating: 'bg-[#FAF5FF] text-[#7E22CE] border-[#E9D5FF]',
    optimizing: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
    running: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
    awaiting_approval: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
  };

  return (
    <Tooltip content={detailMessage} position="top">
      <div
        className={cn(
          'inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-medium cursor-default transition-all duration-200 select-none',
          badgeBg[status],
          className
        )}
      >
        <span className={cn('h-2 w-2 rounded-full shrink-0', dotClasses[status])} />
        {!compact && <span className="truncate">{statusLabel}</span>}
      </div>
    </Tooltip>
  );
};
