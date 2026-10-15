'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Eye, Smartphone } from 'lucide-react';
import type { CreativePreviewData } from '../../types';
import { cn } from '@/lib/utils/cn';

export interface CreativePreviewCardProps {
  creative: CreativePreviewData;
}

export const CreativePreviewCard: React.FC<CreativePreviewCardProps> = ({ creative }) => {
  const [placement, setPlacement] = useState<CreativePreviewData['placement']>(creative.placement);

  const placementOptions = [
    { id: 'ig_feed' as const, label: 'IG Feed' },
    { id: 'ig_story' as const, label: 'Story' },
    { id: 'ig_reel' as const, label: 'Reel Script' },
    { id: 'fb_feed' as const, label: 'Facebook' },
  ];

  return (
    <Card className="p-4 border border-[#E4E4E7] bg-white shadow-xs max-w-xl my-2">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F6]">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EDE9FE] text-[#7C3AED]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#71717A] font-semibold uppercase tracking-wider block">
              Ad Creative & Copy Blueprint
            </span>
            <span className="text-xs font-bold text-[#18181B]">Copy & Layout Mockup</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <Eye className="h-3 w-3" />
          <span>Preview only • Asset generation in Part 3</span>
        </div>
      </div>

      {/* Placement Switcher */}
      <div className="mt-3 flex items-center gap-1.5 p-1 rounded-lg bg-[#F4F4F6] border border-[#E4E4E7]">
        {placementOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setPlacement(opt.id)}
            className={cn(
              'px-2.5 py-1 text-xs font-medium rounded-md transition-all flex-1 text-center',
              placement === opt.id
                ? 'bg-white text-[#7C3AED] shadow-2xs font-semibold'
                : 'text-[#71717A] hover:text-[#18181B]'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Simulated Creative Canvas Box */}
      <div className="mt-3 rounded-xl border border-[#E4E4E7] bg-[#FAFAFC] p-4 flex flex-col justify-between min-h-[170px] relative overflow-hidden">
        {/* Subtle decorative mesh background */}
        <div className="absolute top-0 right-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-[#EDE9FE]/70 blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#7C3AED] bg-white px-2 py-0.5 rounded border border-[#DDD6FE] inline-block shadow-2xs">
            Sponsored Ad • {placementOptions.find((p) => p.id === placement)?.label}
          </span>

          <h5 className="text-sm font-bold text-[#18181B] leading-snug">
            {creative.headline}
          </h5>

          <p className="text-xs text-[#52525B] leading-relaxed line-clamp-3">
            {creative.bodyCopy}
          </p>
        </div>

        <div className="relative z-10 mt-3 pt-2.5 border-t border-[#E4E4E7]/60 flex items-center justify-between">
          <span className="text-[10px] text-[#71717A] italic">
            Brief: {creative.brief}
          </span>
          <button
            type="button"
            className="px-3 py-1 rounded-lg bg-[#7C3AED] text-white text-xs font-semibold shadow-xs"
          >
            {creative.callToAction}
          </button>
        </div>
      </div>
    </Card>
  );
};
