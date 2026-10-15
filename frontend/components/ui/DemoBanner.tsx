'use client';

import React, { useState } from 'react';
import { Sparkles, X, Info, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface DemoBannerProps {
  className?: string;
  message?: string;
  dismissible?: boolean;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  className,
  message = 'Demo Mode: All campaigns, audience targeting, and ad creatives shown are simulated for testing. No real money is spent and no live ads are published.',
  dismissible = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'relative flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl',
        'bg-amber-50/90 border border-amber-200/90 text-amber-950 text-xs shadow-2xs transition-all',
        className
      )}
    >
      <div className="flex items-center gap-2 flex-1">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-500 text-white font-bold text-[10px]">
          DEMO
        </span>
        <span className="leading-snug text-amber-900 font-medium">
          {message}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md">
          <ShieldCheck className="h-3 w-3 text-amber-700" /> Safe Simulation
        </span>

        {dismissible && (
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss demo banner"
            className="p-1 rounded-md text-amber-700 hover:text-amber-950 hover:bg-amber-100/80 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
