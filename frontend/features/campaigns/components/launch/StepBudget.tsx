'use client';

import React from 'react';
import { CAMPAIGNS_CONSTANTS } from '../../constants';
import { formatINR } from '@/lib/utils/format';
import { Calendar, ShieldAlert, Sparkles, TrendingUp, Info } from 'lucide-react';
import type { LaunchDraft } from '../../types';
import { cn } from '@/lib/utils/cn';

export interface StepBudgetProps {
  draft: LaunchDraft;
  onChange: (partial: Partial<LaunchDraft>) => void;
}

export const StepBudget: React.FC<StepBudgetProps> = ({ draft, onChange }) => {
  const budget = draft.budget;

  const updateBudget = (partial: Partial<typeof budget>) => {
    // Dynamically recalculate estimated leads based on budget amount
    const amount = partial.amountINR !== undefined ? partial.amountINR : budget.amountINR;
    const days = partial.flightDurationDays !== undefined ? partial.flightDurationDays : budget.flightDurationDays;
    const totalINR = amount * days;

    const projectedLeadsMin = Math.round(totalINR / 155);
    const projectedLeadsMax = Math.round(totalINR / 115);
    const reachMin = Math.round(totalINR * 6.5);
    const reachMax = Math.round(totalINR * 9.2);

    onChange({
      budget: {
        ...budget,
        ...partial,
        estimate: {
          ...budget.estimate,
          projectedLeadsMin,
          projectedLeadsMax,
          reachMin,
          reachMax,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Budget Type Toggle */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#18181B] block">
          Budget Pacing & Allocation Type
        </label>
        <div className="grid grid-cols-2 gap-3 max-w-md">
          {[
            { id: 'daily' as const, label: 'Daily Spend Cap', desc: 'Recommended for continuous bid optimization' },
            { id: 'lifetime' as const, label: 'Lifetime Campaign Cap', desc: 'Strict upper limit across flight' },
          ].map((type) => (
            <div
              key={type.id}
              onClick={() => updateBudget({ budgetType: type.id })}
              className={cn(
                'p-3 rounded-xl border text-xs cursor-pointer transition-all select-none',
                budget.budgetType === type.id
                  ? 'border-[#7C3AED] bg-[#FAF5FF] ring-1 ring-[#7C3AED]'
                  : 'border-[#E4E4E7] bg-white hover:border-[#D4D4D8]'
              )}
            >
              <span className="font-bold text-[#18181B] block">{type.label}</span>
              <span className="text-[10px] text-[#71717A] block mt-0.5">{type.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Amount Quick Chips & Custom Input */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#18181B]">
            {budget.budgetType === 'daily' ? 'Daily Spend Amount (INR)' : 'Lifetime Spend Amount (INR)'}
          </label>
          <span className="text-xs font-extrabold text-[#7C3AED]">
            {formatINR(budget.amountINR)}
          </span>
        </div>

        {/* Quick Amount Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CAMPAIGNS_CONSTANTS.budgetChipsINR.map((amt) => {
            const isSelected = budget.amountINR === amt;

            return (
              <button
                key={amt}
                type="button"
                onClick={() => updateBudget({ amountINR: amt })}
                className={cn(
                  'py-2.5 px-3 rounded-xl text-xs font-bold border transition-all select-none',
                  isSelected
                    ? 'border-[#7C3AED] bg-[#7C3AED] text-white shadow-xs'
                    : 'border-[#E4E4E7] bg-white text-[#18181B] hover:border-[#D4D4D8] hover:bg-[#FAFAFC]'
                )}
              >
                {formatINR(amt)}
              </button>
            );
          })}
        </div>

        {/* Custom Input */}
        <div className="pt-1">
          <input
            type="number"
            min="500"
            step="500"
            value={budget.amountINR}
            onChange={(e) => updateBudget({ amountINR: Math.max(500, Number(e.target.value)) })}
            placeholder="Custom INR amount..."
            className="w-full rounded-xl border border-[#E4E4E7] bg-white px-3.5 py-2 text-xs text-[#18181B] focus:border-[#7C3AED] focus:outline-none"
          />
        </div>
      </div>

      {/* Schedule Flight & Duration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 p-3.5 rounded-xl border border-[#E4E4E7] bg-white">
          <label className="text-xs font-bold text-[#18181B] flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-[#7C3AED]" /> Start Flight Date
          </label>
          <input
            type="date"
            value={budget.startDate}
            onChange={(e) => updateBudget({ startDate: e.target.value })}
            className="w-full rounded-xl border border-[#E4E4E7] bg-[#FAFAFC] px-3 py-1.5 text-xs text-[#18181B] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5 p-3.5 rounded-xl border border-[#E4E4E7] bg-white">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#18181B]">Flight Duration</label>
            <span className="text-xs font-bold text-[#7C3AED]">{budget.flightDurationDays} Days</span>
          </div>
          <input
            type="range"
            min="3"
            max="30"
            value={budget.flightDurationDays}
            onChange={(e) => updateBudget({ flightDurationDays: Number(e.target.value) })}
            className="w-full accent-[#7C3AED] mt-2"
          />
        </div>
      </div>

      {/* Forecast & Estimation Range Card */}
      <div className="p-4 rounded-2xl bg-white border border-[#E4E4E7] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <h5 className="font-bold text-[#18181B] text-xs">Projected Flight Outcomes</h5>
          </div>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            Estimate, not guaranteed
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 text-xs text-center">
          <div className="p-2.5 rounded-xl bg-[#FAFAFC] border border-[#F4F4F6]">
            <span className="text-[10px] text-[#71717A] block">Projected Leads</span>
            <span className="font-extrabold text-[#16A34A] text-sm mt-0.5 block">
              {budget.estimate.projectedLeadsMin} – {budget.estimate.projectedLeadsMax}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAFAFC] border border-[#F4F4F6]">
            <span className="text-[10px] text-[#71717A] block">Est. Cost / Lead</span>
            <span className="font-extrabold text-[#18181B] text-sm mt-0.5 block">
              {formatINR(budget.estimate.cplMinINR)} – {formatINR(budget.estimate.cplMaxINR)}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAFAFC] border border-[#F4F4F6]">
            <span className="text-[10px] text-[#71717A] block">Estimated Reach</span>
            <span className="font-extrabold text-[#7C3AED] text-sm mt-0.5 block">
              {budget.estimate.reachMin.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Assumptions */}
        <div className="pt-2 border-t border-[#F4F4F6] space-y-1">
          <span className="text-[10px] font-bold text-[#71717A] uppercase flex items-center gap-1">
            <Info className="h-3 w-3 text-[#A1A1AA]" /> Underlying Assumptions & Guardrails
          </span>
          <ul className="space-y-0.5 text-[11px] text-[#52525B]">
            {budget.estimate.assumptions.map((assump, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#7C3AED]">•</span>
                <span>{assump}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
