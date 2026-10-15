'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { CAMPAIGNS_CONSTANTS } from '../../constants';
import type { LaunchDraft, Objective, Platform } from '../../types';
import { cn } from '@/lib/utils/cn';

export interface StepGoalProps {
  draft: LaunchDraft;
  onChange: (partial: Partial<LaunchDraft>) => void;
}

export const StepGoal: React.FC<StepGoalProps> = ({ draft, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Campaign Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#18181B] block">
          Campaign Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={draft.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="e.g. Hyderabad Luxury Sky Villas — Lead Engine"
          className="w-full rounded-xl border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-xs text-[#18181B] placeholder:text-[#A1A1AA] focus:border-[#7C3AED] focus:outline-none transition-all shadow-2xs"
        />
      </div>

      {/* Primary Marketing Objective */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#18181B] block">
          Marketing Objective <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CAMPAIGNS_CONSTANTS.objectives.map((obj) => {
            const isSelected = draft.objective === obj.id;

            return (
              <div
                key={obj.id}
                onClick={() => onChange({ objective: obj.id })}
                className={cn(
                  'p-3.5 rounded-xl border text-xs cursor-pointer transition-all select-none',
                  isSelected
                    ? 'border-[#7C3AED] bg-[#FAF5FF] shadow-2xs ring-1 ring-[#7C3AED]'
                    : 'border-[#E4E4E7] bg-white hover:border-[#D4D4D8] hover:bg-[#FAFAFC]'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#18181B]">{obj.label}</span>
                  <input
                    type="radio"
                    name="objective"
                    checked={isSelected}
                    onChange={() => onChange({ objective: obj.id })}
                    className="h-3.5 w-3.5 text-[#7C3AED] focus:ring-[#7C3AED]"
                  />
                </div>
                <p className="text-[11px] text-[#71717A] mt-1 leading-relaxed">
                  {obj.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Advertising Network */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#18181B] block">
          Advertising Network <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CAMPAIGNS_CONSTANTS.platforms.map((plat) => {
            const isSelected = draft.platform === plat.id;

            return (
              <div
                key={plat.id}
                onClick={() => onChange({ platform: plat.id })}
                className={cn(
                  'p-3.5 rounded-xl border text-xs cursor-pointer transition-all select-none',
                  isSelected
                    ? 'border-[#7C3AED] bg-[#FAF5FF] shadow-2xs ring-1 ring-[#7C3AED]'
                    : 'border-[#E4E4E7] bg-white hover:border-[#D4D4D8]'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#18181B]">{plat.name}</span>
                  <input
                    type="radio"
                    name="platform"
                    checked={isSelected}
                    onChange={() => onChange({ platform: plat.id })}
                    className="h-3.5 w-3.5 text-[#7C3AED] focus:ring-[#7C3AED]"
                  />
                </div>
                <span className="text-[11px] text-[#71717A] block mt-1">{plat.channels}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategic Brief / Offer Hook */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#18181B] block">
          Strategic Brief & Core Offer Hook
        </label>
        <textarea
          rows={3}
          value={draft.brief}
          onChange={(e) => onChange({ brief: e.target.value })}
          placeholder="Describe your offer, value proposition, and key differentiators..."
          className="w-full rounded-xl border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-xs text-[#18181B] placeholder:text-[#A1A1AA] focus:border-[#7C3AED] focus:outline-none transition-all resize-none shadow-2xs"
        />
        <span className="text-[10px] text-[#A1A1AA]">
          DIYA synthesizes copy and creative placements based on this brief.
        </span>
      </div>
    </div>
  );
};
