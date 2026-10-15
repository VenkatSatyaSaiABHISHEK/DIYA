'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import {
  CheckCircle2,
  AlertCircle,
  Copy,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Hash,
} from 'lucide-react';
import type { GeneratedCopy, CreativeVariation, PlatformSpec } from '../../types';
import { CAMPAIGNS_CONSTANTS } from '../../constants';
import { cn } from '@/lib/utils/cn';

export interface StudioCopyPanelProps {
  copy: GeneratedCopy;
  activeHeadline: string;
  onSelectHeadline: (h: string) => void;
  activePrimaryText: string;
  onSelectPrimaryText: (t: string) => void;
  activeCta: string;
  onSelectCta: (c: string) => void;
  approvedVariationIds: string[];
  onToggleApproveVariation: (id: string) => void;
}

export const StudioCopyPanel: React.FC<StudioCopyPanelProps> = ({
  copy,
  activeHeadline,
  onSelectHeadline,
  activePrimaryText,
  onSelectPrimaryText,
  activeCta,
  onSelectCta,
  approvedVariationIds,
  onToggleApproveVariation,
}) => {
  const headlineCharLimit = 40;
  const primaryCharLimit = 125;
  const isHeadlineOver = activeHeadline.length > headlineCharLimit;
  const isPrimaryOver = activePrimaryText.length > primaryCharLimit;

  return (
    <div className="p-4 rounded-2xl bg-white border border-[#E4E4E7] shadow-xs space-y-5 text-xs max-h-[800px] overflow-y-auto scrollbar-thin">
      {/* Header & Character Limit Audits */}
      <div className="space-y-2 pb-3 border-b border-[#F4F4F6]">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-[#18181B] text-sm">Copy Matrix & Variations</h4>
          <span className="text-[10px] text-[#71717A]">4 Generated Angles</span>
        </div>

        {/* Character Limit Indicators */}
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div
            className={cn(
              'p-2 rounded-xl border flex items-center justify-between',
              isHeadlineOver ? 'bg-red-50 border-red-200 text-red-900' : 'bg-[#FAFAFC] border-[#E4E4E7]'
            )}
          >
            <span>Headline Chars</span>
            <span className="font-bold">
              {activeHeadline.length}/{headlineCharLimit}
            </span>
          </div>

          <div
            className={cn(
              'p-2 rounded-xl border flex items-center justify-between',
              isPrimaryOver ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-[#FAFAFC] border-[#E4E4E7]'
            )}
          >
            <span>Primary Chars</span>
            <span className="font-bold">
              {activePrimaryText.length}/{primaryCharLimit}
            </span>
          </div>
        </div>

        {isHeadlineOver && (
          <span className="text-[10px] font-medium text-red-600 block">
            ⚠️ Headline may truncate on mobile feeds.
          </span>
        )}
      </div>

      {/* Headline Variations */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#18181B] block">
          Select Headline Variation
        </label>
        <div className="space-y-1.5">
          {copy.headlines.map((hl, idx) => {
            const isSelected = activeHeadline === hl;

            return (
              <div
                key={idx}
                onClick={() => onSelectHeadline(hl)}
                className={cn(
                  'p-2.5 rounded-xl border text-xs cursor-pointer transition-all select-none flex items-start justify-between gap-2',
                  isSelected
                    ? 'border-[#7C3AED] bg-[#FAF5FF] font-semibold text-[#7C3AED] shadow-2xs'
                    : 'border-[#E4E4E7] bg-white text-[#18181B] hover:border-[#D4D4D8]'
                )}
              >
                <span className="leading-snug">{hl}</span>
                {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-[#7C3AED] shrink-0 mt-0.5" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Primary Text Variants */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#18181B] block">
          Primary Text Angles
        </label>
        <div className="space-y-2">
          {copy.primaryTexts.map((txt, idx) => {
            const isSelected = activePrimaryText === txt;

            return (
              <div
                key={idx}
                onClick={() => onSelectPrimaryText(txt)}
                className={cn(
                  'p-3 rounded-xl border text-xs cursor-pointer transition-all select-none space-y-1',
                  isSelected
                    ? 'border-[#7C3AED] bg-[#FAF5FF] text-[#18181B] shadow-2xs ring-1 ring-[#7C3AED]'
                    : 'border-[#E4E4E7] bg-white text-[#52525B] hover:border-[#D4D4D8]'
                )}
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-[#7C3AED] uppercase">
                  <span>Variant {idx + 1}</span>
                  {isSelected && <span>Selected Active</span>}
                </div>
                <p className="line-clamp-3 leading-relaxed">{txt}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Actions (CTAs) */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#18181B] block">CTA Button Preset</label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {copy.callToActions.map((ctaOption) => {
            const isSelected = activeCta === ctaOption;

            return (
              <button
                key={ctaOption}
                type="button"
                onClick={() => onSelectCta(ctaOption)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-medium border transition-all select-none',
                  isSelected
                    ? 'border-[#7C3AED] bg-[#7C3AED] text-white shadow-2xs font-semibold'
                    : 'border-[#E4E4E7] bg-white text-[#52525B] hover:border-[#D4D4D8]'
                )}
              >
                {ctaOption}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hashtag Suggestions */}
      <div className="space-y-1.5 pt-1">
        <label className="text-xs font-bold text-[#18181B] block flex items-center gap-1">
          <Hash className="h-3 w-3 text-[#7C3AED]" /> Recommended Local Hashtags
        </label>
        <div className="flex items-center gap-1 flex-wrap">
          {copy.hashtags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#FAFAFC] border border-[#E4E4E7] text-[#71717A]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Variations Approved Registry */}
      <div className="space-y-2 pt-2 border-t border-[#F4F4F6]">
        <label className="text-xs font-bold text-[#18181B] block">
          Variation Status Registry
        </label>

        <div className="space-y-1.5">
          {copy.variations.map((v) => {
            const isApproved = approvedVariationIds.includes(v.id);

            return (
              <div
                key={v.id}
                className="p-2.5 rounded-xl border border-[#E4E4E7] bg-[#FAFAFC] flex items-center justify-between gap-2"
              >
                <div>
                  <span className="font-bold text-[11px] text-[#18181B] block">{v.hookAngle}</span>
                  <span className="text-[10px] text-[#71717A] block truncate max-w-[180px]">
                    {v.headline}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleApproveVariation(v.id)}
                  className={cn(
                    'px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors',
                    isApproved
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
                  )}
                >
                  {isApproved ? 'Approved ✓' : 'Mark Draft'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
