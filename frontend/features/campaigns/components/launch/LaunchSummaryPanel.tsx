'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { formatINR } from '@/lib/utils/format';
import {
  Megaphone,
  Users,
  Calendar,
  Sparkles,
  Link as LinkIcon,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import type { LaunchDraft } from '../../types';

export interface LaunchSummaryPanelProps {
  draft: LaunchDraft;
}

export const LaunchSummaryPanel: React.FC<LaunchSummaryPanelProps> = ({ draft }) => {
  return (
    <GlassCard className="p-4 sm:p-5 rounded-2xl shadow-glass border border-white/80 bg-white/85 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F6]">
        <div>
          <span className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-wider block">
            Live Flight Preview
          </span>
          <h4 className="text-sm font-bold text-[#18181B] line-clamp-1">{draft.name || 'Untitled Flight'}</h4>
        </div>
        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-violet-100 text-[#7C3AED]">
          Step {draft.currentStep}/6
        </span>
      </div>

      <div className="space-y-3 text-xs">
        {/* Network & Objective */}
        <div className="flex items-center justify-between">
          <span className="text-[#71717A]">Ad Network</span>
          <span className="font-bold text-[#18181B] uppercase">{draft.platform}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#71717A]">Objective</span>
          <span className="font-semibold text-[#18181B] capitalize">{draft.objective}</span>
        </div>

        {/* Budget & Flight */}
        <div className="p-3 rounded-xl bg-[#FAFAFC] border border-[#F4F4F6] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[#71717A] text-[11px]">Daily Cap</span>
            <span className="font-bold text-[#18181B]">{formatINR(draft.budget.amountINR)}/day</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#71717A] text-[11px]">Flight Duration</span>
            <span className="font-medium text-[#18181B]">{draft.budget.flightDurationDays} Days</span>
          </div>
          <div className="pt-1 border-t border-[#E4E4E7]/60 flex items-center justify-between">
            <span className="text-[#71717A] text-[11px] font-semibold">Total Commitment</span>
            <span className="font-extrabold text-[#7C3AED] text-sm">
              {formatINR(draft.budget.amountINR * draft.budget.flightDurationDays)}
            </span>
          </div>
        </div>

        {/* Audience Target */}
        <div className="space-y-1">
          <span className="text-[10px] font-semibold text-[#71717A] uppercase flex items-center gap-1">
            <Users className="h-3 w-3 text-[#7C3AED]" /> Target Demographics
          </span>
          <p className="text-[11px] text-[#18181B] line-clamp-2">
            {draft.audience.locations.slice(0, 2).join(', ')} • Ages {draft.audience.ageMin}–{draft.audience.ageMax}
          </p>
        </div>

        {/* Forecast Projection */}
        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1 text-emerald-950">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-900 uppercase">Estimated Leads</span>
            <span className="font-extrabold text-emerald-700 text-sm">
              {draft.budget.estimate.projectedLeadsMin} – {draft.budget.estimate.projectedLeadsMax}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-emerald-800">
            <span>Estimated CPL</span>
            <span className="font-semibold">
              {formatINR(draft.budget.estimate.cplMinINR)} – {formatINR(draft.budget.estimate.cplMaxINR)}
            </span>
          </div>
        </div>

        {/* Guardrail status */}
        <div className="flex items-center gap-1.5 text-[10px] text-[#71717A] pt-1">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
          <span>Automated bid capping active • Zero unauthorized spend</span>
        </div>
      </div>
    </GlassCard>
  );
};
