'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  Eye,
  Edit3,
  CheckCircle2,
  Download,
  RotateCcw,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Smartphone,
  Layers,
  Copy,
} from 'lucide-react';
import type { StudioBrief } from '../../types';
import { cn } from '@/lib/utils/cn';

export interface StudioCanvasPreviewProps {
  brief: StudioBrief;
  selectedPlacement: 'ig_feed' | 'ig_story' | 'ig_reel' | 'fb_feed' | 'google_display';
  onPlacementChange: (
    p: 'ig_feed' | 'ig_story' | 'ig_reel' | 'fb_feed' | 'google_display'
  ) => void;
  headline: string;
  onHeadlineChange: (h: string) => void;
  primaryText: string;
  onPrimaryTextChange: (t: string) => void;
  cta: string;
  isEditingInline: boolean;
  onToggleInlineEdit: () => void;
  onRegenerate: () => void;
  onCreateMoreVariations: () => void;
  onOpenExportModal: () => void;
  isApproved: boolean;
  onToggleApprove: () => void;
}

export const StudioCanvasPreview: React.FC<StudioCanvasPreviewProps> = ({
  brief,
  selectedPlacement,
  onPlacementChange,
  headline,
  onHeadlineChange,
  primaryText,
  onPrimaryTextChange,
  cta,
  isEditingInline,
  onToggleInlineEdit,
  onRegenerate,
  onCreateMoreVariations,
  onOpenExportModal,
  isApproved,
  onToggleApprove,
}) => {
  const placements = [
    { id: 'ig_feed' as const, label: 'IG Feed (1:1)' },
    { id: 'ig_story' as const, label: 'Story (9:16)' },
    { id: 'ig_reel' as const, label: 'Reel (9:16)' },
    { id: 'fb_feed' as const, label: 'Facebook' },
    { id: 'google_display' as const, label: 'Google Display' },
  ];

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E4E4E7] shadow-card flex flex-col justify-between space-y-4">
      {/* Top Placement Switcher & Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#F4F4F6]">
        {/* Placement tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F4F4F6] border border-[#E4E4E7] overflow-x-auto no-scrollbar max-w-full">
          {placements.map((p) => {
            const isActive = selectedPlacement === p.id;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onPlacementChange(p.id)}
                className={cn(
                  'px-3 py-1 text-xs font-semibold rounded-lg transition-all select-none shrink-0',
                  isActive
                    ? 'bg-white text-[#7C3AED] shadow-2xs'
                    : 'text-[#71717A] hover:text-[#18181B]'
                )}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Preview Only Notice Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
          <Eye className="h-3 w-3 text-amber-700" />
          <span>Preview only • Layout mockup</span>
        </div>
      </div>

      {/* Realistic Device / Post Mockup Canvas */}
      <div className="flex items-center justify-center py-2 sm:py-4">
        {/* Instagram Feed / Post Frame (1:1) */}
        {(selectedPlacement === 'ig_feed' || selectedPlacement === 'fb_feed') && (
          <div className="w-full max-w-[360px] rounded-2xl border border-[#E4E4E7] bg-white shadow-xl overflow-hidden transition-all">
            {/* Post Header */}
            <div className="p-3 flex items-center justify-between border-b border-[#F4F4F6]">
              <div className="flex items-center gap-2">
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: brief.brandSettings.primaryColor }}
                >
                  M
                </div>
                <div>
                  <span className="font-bold text-xs text-[#18181B] block leading-none">
                    {brief.brandSettings.logoName || 'Mentneo Brand'}
                  </span>
                  <span className="text-[10px] text-[#71717A] mt-0.5 block">Sponsored Ad</span>
                </div>
              </div>
              <MoreHorizontal className="h-4 w-4 text-[#A1A1AA]" />
            </div>

            {/* Post Media: Designed abstract visual layout from brand colors */}
            <div
              className="relative w-full aspect-square flex flex-col justify-between p-5 overflow-hidden select-none"
              style={{
                background: `linear-gradient(135deg, ${brief.brandSettings.primaryColor} 0%, #18181B 100%)`,
              }}
            >
              {/* Abstract decorative ambient geometric rings */}
              <div
                className="absolute top-0 right-0 -mr-12 -mt-12 h-44 w-44 rounded-full opacity-30 blur-2xl pointer-events-none"
                style={{ backgroundColor: brief.brandSettings.accentColor }}
              />
              <div className="absolute bottom-0 left-0 -ml-10 -mb-10 h-36 w-36 rounded-full bg-white/10 blur-xl pointer-events-none" />

              {/* Media Top Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-black shadow-xs"
                  style={{ backgroundColor: brief.brandSettings.accentColor }}
                >
                  Limited Flight
                </span>
                <span className="text-[10px] font-bold text-white/80 uppercase">Kokapet, Hyderabad</span>
              </div>

              {/* Media Central Hero Headline Typography */}
              <div className="relative z-10 space-y-2 text-white my-auto">
                {isEditingInline ? (
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => onHeadlineChange(e.target.value)}
                    className="w-full bg-white/20 text-white font-extrabold text-base rounded px-2 py-1 border border-white/40 focus:outline-none"
                  />
                ) : (
                  <h3
                    className="text-lg sm:text-xl font-extrabold tracking-tight leading-snug drop-shadow-sm"
                    style={{ fontFamily: brief.brandSettings.font }}
                  >
                    {headline}
                  </h3>
                )}

                <p className="text-xs text-white/85 line-clamp-2 leading-relaxed">
                  {brief.offerHook || 'Gated community privacy with private elevator lobbies.'}
                </p>
              </div>

              {/* Media Bottom CTA strip */}
              <div className="relative z-10 pt-2 flex items-center justify-between border-t border-white/20">
                <span className="text-[10px] text-white/70">From ₹3.8 Cr • Sky Villas</span>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white shadow-md transition-transform hover:scale-105"
                  style={{ backgroundColor: brief.brandSettings.primaryColor }}
                >
                  {cta}
                </button>
              </div>
            </div>

            {/* Post Social Interactions Bar */}
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[#18181B]">
                  <Heart className="h-4 w-4 hover:text-red-500 cursor-pointer" />
                  <MessageCircle className="h-4 w-4 hover:text-[#7C3AED] cursor-pointer" />
                  <Send className="h-4 w-4 hover:text-[#7C3AED] cursor-pointer" />
                </div>
                <Bookmark className="h-4 w-4 text-[#71717A] hover:text-[#18181B] cursor-pointer" />
              </div>

              {/* Caption */}
              <div className="text-xs text-[#18181B] leading-relaxed">
                <span className="font-bold mr-1.5">
                  {brief.brandSettings.logoName || 'Mentneo'}
                </span>
                {isEditingInline ? (
                  <textarea
                    rows={3}
                    value={primaryText}
                    onChange={(e) => onPrimaryTextChange(e.target.value)}
                    className="w-full mt-1 bg-[#FAFAFC] text-xs p-2 rounded-lg border border-[#E4E4E7]"
                  />
                ) : (
                  <span className="text-[#52525B]">{primaryText}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Story / Reel Frame (9:16) */}
        {(selectedPlacement === 'ig_story' || selectedPlacement === 'ig_reel') && (
          <div className="w-full max-w-[280px] rounded-3xl border-4 border-[#18181B] bg-[#18181B] shadow-2xl overflow-hidden aspect-[9/16] relative flex flex-col justify-between p-4 text-white">
            {/* Top user bar */}
            <div className="relative z-10 flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#7C3AED] flex items-center justify-center text-[10px] font-bold">
                  M
                </div>
                <span className="font-bold text-[11px]">Mentneo Sky Villas</span>
                <span className="text-[10px] text-white/60">Sponsored</span>
              </div>
              <MoreHorizontal className="h-4 w-4 text-white/80" />
            </div>

            {/* Central typography */}
            <div className="relative z-10 space-y-3 my-auto">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-[#F59E0B] text-black">
                {selectedPlacement === 'ig_reel' ? 'Reel Video Script Mockup' : 'Story Placement'}
              </span>
              <h4 className="text-base font-extrabold leading-snug drop-shadow-md">
                {headline}
              </h4>
              <p className="text-xs text-white/80 line-clamp-3">{primaryText}</p>
            </div>

            {/* Story CTA Swipe Up */}
            <div className="relative z-10 text-center space-y-1">
              <button
                type="button"
                className="w-full py-2 rounded-xl text-xs font-bold bg-[#7C3AED] text-white shadow-lg"
              >
                {cta}
              </button>
              <span className="text-[9px] text-white/60 block">Swipe up to view floorplan</span>
            </div>
          </div>
        )}

        {/* Google Display (300x250) */}
        {selectedPlacement === 'google_display' && (
          <div className="w-[320px] h-[260px] rounded-xl border border-[#E4E4E7] bg-white shadow-lg p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-[#A1A1AA] uppercase">Ad • Google Network</span>
              <span className="text-[10px] font-bold text-[#7C3AED]">Mentneo Realty</span>
            </div>
            <div className="space-y-1 my-auto">
              <h5 className="font-extrabold text-sm text-[#18181B] leading-snug">{headline}</h5>
              <p className="text-[11px] text-[#52525B] line-clamp-2">{primaryText}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#F4F4F6]">
              <span className="text-[10px] text-[#71717A]">Kokapet Luxury Homes</span>
              <button
                type="button"
                className="px-3 py-1 rounded-md text-[11px] font-bold bg-[#7C3AED] text-white"
              >
                {cta}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Canvas Toolbar Controls */}
      <div className="pt-3 border-t border-[#F4F4F6] flex items-center justify-between gap-2 flex-wrap text-xs">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onToggleInlineEdit}
            className="text-xs"
            leftIcon={<Edit3 className="h-3.5 w-3.5" />}
          >
            {isEditingInline ? 'Done Editing' : 'Edit Copy'}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={onRegenerate}
            className="text-xs"
            leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
          >
            Regenerate
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={onCreateMoreVariations}
            className="text-xs hidden sm:inline-flex"
            leftIcon={<Copy className="h-3.5 w-3.5" />}
          >
            + 2 Angles
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={isApproved ? 'primary' : 'outline'}
            onClick={onToggleApprove}
            className={cn('text-xs', isApproved && 'bg-emerald-600 hover:bg-emerald-700')}
            leftIcon={<CheckCircle2 className="h-3.5 w-3.5" />}
          >
            {isApproved ? 'Approved Asset' : 'Approve Asset'}
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={onOpenExportModal}
            className="text-xs font-bold shadow-xs"
            leftIcon={<Download className="h-3.5 w-3.5" />}
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};
