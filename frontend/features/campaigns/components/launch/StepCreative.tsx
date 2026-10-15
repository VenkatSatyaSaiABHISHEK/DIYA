'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Sparkles, Eye, ArrowRight, ExternalLink } from 'lucide-react';
import { useCampaignsStore } from '../../store/campaigns.store';
import type { LaunchDraft } from '../../types';

export interface StepCreativeProps {
  draft: LaunchDraft;
  onChange: (partial: Partial<LaunchDraft>) => void;
}

export const StepCreative: React.FC<StepCreativeProps> = ({ draft, onChange }) => {
  const { setActiveTab } = useCampaignsStore();
  const creative = draft.creative;

  const updateCreative = (partial: Partial<typeof creative>) => {
    onChange({
      creative: {
        ...creative,
        ...partial,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Ad Studio Banner Jump */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-violet-50 to-indigo-50 border border-[#DDD6FE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h5 className="font-bold text-[#18181B]">Design in Ad Studio</h5>
            <p className="text-[11px] text-[#71717A]">
              Produce multi-format placements, device mockups, and AI copy variations
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setActiveTab('studio')}
          className="text-xs bg-white"
          rightIcon={<ExternalLink className="h-3 w-3" />}
        >
          Open Ad Studio
        </Button>
      </div>

      {/* Ad Headline */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#18181B] block">
          Primary Headline <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={creative.headline}
          onChange={(e) => updateCreative({ headline: e.target.value })}
          placeholder="e.g. Own a 4BHK Sky Villa in Kokapet with 0% Pre-EMI"
          className="w-full rounded-xl border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-xs text-[#18181B] focus:border-[#7C3AED] focus:outline-none shadow-2xs"
        />
        <span className="text-[10px] text-[#A1A1AA]">
          Recommended limit: 40 characters for optimal feed display.
        </span>
      </div>

      {/* Primary Ad Copy */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#18181B] block">
          Primary Ad Copy / Caption <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={4}
          value={creative.bodyCopy}
          onChange={(e) => updateCreative({ bodyCopy: e.target.value })}
          placeholder="Enter primary copy and value proposition..."
          className="w-full rounded-xl border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-xs text-[#18181B] focus:border-[#7C3AED] focus:outline-none resize-none shadow-2xs leading-relaxed"
        />
      </div>

      {/* Call To Action Button */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#18181B] block">
          Call-To-Action (CTA) Button
        </label>
        <select
          value={creative.callToAction}
          onChange={(e) => updateCreative({ callToAction: e.target.value })}
          className="w-full rounded-xl border border-[#E4E4E7] bg-white px-3.5 py-2 text-xs text-[#18181B] focus:border-[#7C3AED] focus:outline-none"
        >
          <option value="Download Pricing & Floorplan">Download Pricing & Floorplan</option>
          <option value="Book Private Site Visit">Book Private Site Visit</option>
          <option value="Get 0% Pre-EMI Offer">Get 0% Pre-EMI Offer</option>
          <option value="Download Brochure">Download Brochure</option>
          <option value="Speak to Project Director">Speak to Project Director</option>
        </select>
      </div>

      {/* Live Card Preview Mockup */}
      <div className="p-4 rounded-2xl bg-[#FAFAFC] border border-[#E4E4E7] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider">
            Sponsored Feed Mockup
          </span>
          <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            Preview only
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-[#E4E4E7] shadow-xs space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#C4B5FD]" />
            <div>
              <span className="font-bold text-[11px] text-[#18181B] block leading-none">
                Mentneo Brand
              </span>
              <span className="text-[9px] text-[#A1A1AA]">Sponsored</span>
            </div>
          </div>

          <p className="text-xs text-[#18181B] leading-relaxed font-normal">
            {creative.bodyCopy || 'Your ad caption will appear here...'}
          </p>

          <div className="h-32 rounded-lg bg-gradient-to-br from-[#EDE9FE] via-[#DDD6FE] to-[#C4B5FD] flex items-center justify-center text-xs font-bold text-[#4C1D95]">
            <span>Asset Generated in Ad Studio</span>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="font-bold text-xs text-[#18181B]">{creative.headline}</span>
            <span className="px-3 py-1 rounded-lg bg-[#7C3AED] text-white text-[11px] font-bold">
              {creative.callToAction}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
