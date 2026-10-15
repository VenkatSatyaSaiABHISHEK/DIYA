'use client';

import React from 'react';
import { env } from '@/lib/env';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface DemoBadgeProps {
  className?: string;
  forceShow?: boolean;
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({ className, forceShow = false }) => {
  if (!env.NEXT_PUBLIC_USE_MOCKS && !forceShow) {
    return null;
  }

  return (
    <div
      title="Mock adapter is active: simulated marketing data for demonstration purposes."
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide bg-amber-50 text-amber-800 border border-amber-200 shadow-xs select-none',
        className
      )}
    >
      <Sparkles className="w-3 h-3 text-amber-600 animate-pulse" />
      <span>Demo data</span>
    </div>
  );
};
