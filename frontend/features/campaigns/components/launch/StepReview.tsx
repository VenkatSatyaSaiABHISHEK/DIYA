'use client';

import React from 'react';
import { formatINR } from '@/lib/utils/format';
import { Button } from '@/components/ui/Button';
import {
  CheckCircle2,
  AlertTriangle,
  Edit2,
  ShieldAlert,
  ArrowRight,
  Megaphone,
  Users,
  Calendar,
  Sparkles,
  Link as LinkIcon,
} from 'lucide-react';
import type { LaunchDraft } from '../../types';

export interface StepReviewProps {
  draft: LaunchDraft;
  onEditStep: (step: number) => void;
  onLaunchClick: () => void;
}

export const StepReview: React.FC<StepReviewProps> = ({
  draft,
  onEditStep,
  onLaunchClick,
}) => {
  return (
    <div className="space-y-6 text-xs text-[#18181B]">
      {/* Readiness Checklist Banner */}
      <div className="p-4 rounded-2xl bg-[#FAFAFC] border border-[#E4E4E7] space-y-3">
        <h5 className="font-bold text-xs uppercase tracking-wider text-[#71717A]">
          Pre-Flight Launch Readiness Audit
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Campaign Goal & Objective verified</span>
          </div>

          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Target Audience clusters defined ({draft.audience.locations.length} locations)</span>
          </div>

          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Ad Spend budget cap configured ({formatINR(draft.budget.amountINR)}/day)</span>
          </div>

          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Creative Headline & Copy ready</span>
          </div>

          <div className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>Meta Ads Account: Unconnected (Demo simulation active)</span>
          </div>

          <div className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>Tracking Pixel: Simulated fallback active</span>
          </div>
        </div>
      </div>

      {/* Review Section Cards with Quick Edit Links */}
      <div className="space-y-3">
        {/* Section 1: Goal */}
        <div className="p-4 rounded-xl border border-[#E4E4E7] bg-white flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#7C3AED] uppercase">1. Campaign Goal</span>
            <h6 className="font-bold text-sm text-[#18181B]">{draft.name}</h6>
            <p className="text-[11px] text-[#71717A]">
              Network: <strong>{draft.platform.toUpperCase()}</strong> • Objective: <strong>{draft.objective.toUpperCase()}</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1"
          >
            <Edit2 className="h-3 w-3" /> Edit
          </button>
        </div>

        {/* Section 2: Audience */}
        <div className="p-4 rounded-xl border border-[#E4E4E7] bg-white flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#7C3AED] uppercase">2. Target Audience</span>
            <p className="font-semibold text-xs text-[#18181B]">
              {draft.audience.locations.join(', ')} • Ages {draft.audience.ageMin}–{draft.audience.ageMax} ({draft.audience.gender})
            </p>
            <p className="text-[11px] text-[#71717A]">
              Interests: {draft.audience.interests.join(', ')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1"
          >
            <Edit2 className="h-3 w-3" /> Edit
          </button>
        </div>

        {/* Section 3: Budget */}
        <div className="p-4 rounded-xl border border-[#E4E4E7] bg-white flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#7C3AED] uppercase">3. Budget & Schedule</span>
            <p className="font-semibold text-xs text-[#18181B]">
              {formatINR(draft.budget.amountINR)} / day • {draft.budget.flightDurationDays} Days Flight
            </p>
            <p className="text-[11px] text-[#71717A]">
              Total Flight Budget Cap: <strong>{formatINR(draft.budget.amountINR * draft.budget.flightDurationDays)}</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(3)}
            className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1"
          >
            <Edit2 className="h-3 w-3" /> Edit
          </button>
        </div>

        {/* Section 4: Creative */}
        <div className="p-4 rounded-xl border border-[#E4E4E7] bg-white flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#7C3AED] uppercase">4. Ad Creative Blueprint</span>
            <h6 className="font-bold text-xs text-[#18181B]">{draft.creative.headline}</h6>
            <p className="text-[11px] text-[#52525B] line-clamp-1">{draft.creative.bodyCopy}</p>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(4)}
            className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1"
          >
            <Edit2 className="h-3 w-3" /> Edit
          </button>
        </div>
      </div>

      {/* High-Impact Real Money Authorization Callout */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold block">Final Approval Step</span>
          <p className="leading-relaxed text-[11px] text-amber-900">
            Clicking Launch will open the high-impact confirmation authorization modal. In this sandbox environment, a simulation will run and no real money will be charged.
          </p>
        </div>
      </div>

      {/* Launch CTA */}
      <div className="pt-2 flex justify-end">
        <Button
          size="md"
          variant="primary"
          onClick={onLaunchClick}
          className="font-bold shadow-md shadow-[#7C3AED]/20 text-xs px-6 py-2.5"
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          Review Authorization & Launch
        </Button>
      </div>
    </div>
  );
};
