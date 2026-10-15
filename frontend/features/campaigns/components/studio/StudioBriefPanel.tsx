'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { CAMPAIGNS_CONSTANTS } from '../../constants';
import {
  Sparkles,
  Palette,
  Upload,
  BookOpen,
  Languages,
  Layers,
  Loader2,
  Check,
} from 'lucide-react';
import type { StudioBrief, Objective } from '../../types';
import { cn } from '@/lib/utils/cn';

export interface StudioBriefPanelProps {
  brief: StudioBrief;
  onChange: (partial: Partial<StudioBrief>) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  progressText: string;
}

export const StudioBriefPanel: React.FC<StudioBriefPanelProps> = ({
  brief,
  onChange,
  onGenerate,
  isGenerating,
  progressText,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-white border border-[#E4E4E7] shadow-xs space-y-4 text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-[#F4F4F6]">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#7C3AED]" />
          <h4 className="font-bold text-[#18181B] text-sm">Creative Brief & Parameters</h4>
        </div>
        <span className="text-[10px] font-bold text-[#7C3AED] bg-[#EDE9FE] px-2 py-0.5 rounded-full">
          AI Copy Studio
        </span>
      </div>

      {/* Creative Prompt Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#18181B] block">
          Creative Prompt / Core Theme <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={2}
          value={brief.prompt}
          onChange={(e) => onChange({ prompt: e.target.value })}
          placeholder="e.g. 4BHK Sky Villas in Kokapet with 0% Pre-EMI for IT leaders..."
          className="w-full rounded-xl border border-[#E4E4E7] bg-white px-3 py-2 text-xs text-[#18181B] focus:border-[#7C3AED] focus:outline-none resize-none shadow-2xs leading-relaxed"
        />
      </div>

      {/* Offer / Strategic Hook */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#18181B] block">
          Offer / Key Differentiator Hook
        </label>
        <input
          type="text"
          value={brief.offerHook}
          onChange={(e) => onChange({ offerHook: e.target.value })}
          placeholder="e.g. 0% Pre-EMI Until Handover + Free Modular Kitchen"
          className="w-full rounded-xl border border-[#E4E4E7] bg-white px-3 py-1.5 text-xs text-[#18181B] focus:border-[#7C3AED] focus:outline-none shadow-2xs"
        />
      </div>

      {/* Target Audience */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#18181B] block">Target Audience</label>
        <input
          type="text"
          value={brief.targetAudience}
          onChange={(e) => onChange({ targetAudience: e.target.value })}
          placeholder="e.g. Tech Directors, NRI Investors in West Hyderabad"
          className="w-full rounded-xl border border-[#E4E4E7] bg-white px-3 py-1.5 text-xs text-[#18181B] focus:border-[#7C3AED] focus:outline-none shadow-2xs"
        />
      </div>

      {/* Language and Tone Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Language */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#18181B] block">Language</label>
          <select
            value={brief.language}
            onChange={(e) => onChange({ language: e.target.value as any })}
            className="w-full rounded-xl border border-[#E4E4E7] bg-white px-2.5 py-1.5 text-xs text-[#18181B] focus:border-[#7C3AED] focus:outline-none"
          >
            {CAMPAIGNS_CONSTANTS.languages.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tone */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#18181B] block">Brand Voice Tone</label>
          <select
            value={brief.tone}
            onChange={(e) => onChange({ tone: e.target.value as any })}
            className="w-full rounded-xl border border-[#E4E4E7] bg-white px-2.5 py-1.5 text-xs text-[#18181B] focus:border-[#7C3AED] focus:outline-none"
          >
            {CAMPAIGNS_CONSTANTS.studioTones.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Format Chips */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#18181B] block">Target Creative Format</label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {CAMPAIGNS_CONSTANTS.studioFormats.map((f) => {
            const isSelected = brief.format === f.id;

            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onChange({ format: f.id })}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-medium border transition-all select-none',
                  isSelected
                    ? 'border-[#7C3AED] bg-[#FAF5FF] text-[#7C3AED] font-bold shadow-2xs'
                    : 'border-[#E4E4E7] bg-[#FAFAFC] text-[#52525B] hover:border-[#D4D4D8]'
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Styling Drawer/Box */}
      <div className="p-3 rounded-xl bg-[#FAFAFC] border border-[#E4E4E7] space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[11px] text-[#18181B] flex items-center gap-1.5">
            <Palette className="h-3.5 w-3.5 text-[#7C3AED]" /> Brand Kit & Tone Settings
          </span>
          <label className="flex items-center gap-1.5 text-[10px] text-[#71717A] cursor-pointer">
            <input
              type="checkbox"
              checked={brief.brandSettings.useBrandKnowledge}
              onChange={(e) =>
                onChange({
                  brandSettings: {
                    ...brief.brandSettings,
                    useBrandKnowledge: e.target.checked,
                  },
                })
              }
              className="h-3 w-3 rounded text-[#7C3AED] focus:ring-[#7C3AED]"
            />
            <span>Use Brand Knowledge</span>
          </label>
        </div>

        {/* Color Palette Indicators */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[#71717A]">Active Color Palette</span>
          <div className="flex items-center gap-1.5">
            <span
              className="h-5 w-5 rounded-full border border-black/10 shadow-2xs"
              style={{ backgroundColor: brief.brandSettings.primaryColor }}
              title="Primary Purple"
            />
            <span
              className="h-5 w-5 rounded-full border border-black/10 shadow-2xs"
              style={{ backgroundColor: brief.brandSettings.secondaryColor }}
              title="Secondary Black"
            />
            <span
              className="h-5 w-5 rounded-full border border-black/10 shadow-2xs"
              style={{ backgroundColor: brief.brandSettings.accentColor }}
              title="Accent Gold"
            />
          </div>
        </div>

        {/* Font Picker */}
        <div className="flex items-center justify-between pt-1 border-t border-[#F4F4F6]">
          <span className="text-[10px] text-[#71717A]">Headline Font</span>
          <select
            value={brief.brandSettings.font}
            onChange={(e) =>
              onChange({
                brandSettings: {
                  ...brief.brandSettings,
                  font: e.target.value,
                },
              })
            }
            className="bg-transparent border border-[#E4E4E7] rounded-md px-2 py-0.5 text-[11px] font-medium"
          >
            <option value="Outfit">Outfit</option>
            <option value="Inter">Inter</option>
            <option value="Geist">Geist</option>
            <option value="Playfair">Playfair</option>
          </select>
        </div>
      </div>

      {/* Progress State Banner */}
      {isGenerating && (
        <div className="p-3 rounded-xl bg-violet-50 border border-violet-200 text-xs text-violet-950 flex items-center gap-2.5 animate-pulse">
          <Loader2 className="h-4 w-4 text-[#7C3AED] animate-spin shrink-0" />
          <span className="font-medium">{progressText}</span>
        </div>
      )}

      {/* Generate Creative Button */}
      <Button
        size="md"
        variant="primary"
        disabled={isGenerating || !brief.prompt.trim()}
        onClick={onGenerate}
        className="w-full font-bold shadow-md shadow-[#7C3AED]/20 text-xs py-2.5"
        leftIcon={
          isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )
        }
      >
        {isGenerating ? 'Synthesizing...' : 'Generate Creative Variations'}
      </Button>
    </div>
  );
};
