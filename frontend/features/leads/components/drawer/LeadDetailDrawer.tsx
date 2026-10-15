'use client';

import React from 'react';
import { Drawer } from '@/components/ui/Drawer';
import {
  Sparkles,
  Building2,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  MessageSquare,
  FileText,
  User,
} from 'lucide-react';
import type { LeadRecord, LeadStage } from '../../types';
import { PIPELINE_STAGES, SOURCE_CONFIG, TIER_CONFIG } from '../../constants';

interface LeadDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lead: LeadRecord | null;
  onStageChange: (leadId: string, stage: LeadStage) => void;
}

export const LeadDetailDrawer: React.FC<LeadDetailDrawerProps> = ({
  isOpen,
  onClose,
  lead,
  onStageChange,
}) => {
  if (!lead) return null;

  const sourceMeta = SOURCE_CONFIG[lead.source] || SOURCE_CONFIG.meta;
  const tierMeta = TIER_CONFIG[lead.qualificationTier] || TIER_CONFIG.hot;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={lead.fullName}
      width="max-w-2xl"
    >
      <div className="space-y-6 pb-6">
        <p className="text-xs text-[#71717A] -mt-2">
          {lead.designation ? `${lead.designation} at ` : ''}
          {lead.company || 'Private Investor'} • Captured via {sourceMeta.label}
        </p>

        {/* Top Score & Stage Bar */}
        <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#7C3AED]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-[#18181B]">
                  {lead.qualificationScore} / 100
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${tierMeta.badgeClass}`}
                >
                  {tierMeta.label}
                </span>
              </div>
              <p className="text-xs text-purple-900 font-medium mt-0.5">
                {lead.qualificationReason}
              </p>
            </div>
          </div>

          {/* Stage Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#71717A]">Stage:</span>
            <select
              value={lead.stage}
              aria-label="Update pipeline stage"
              onChange={(e) => onStageChange(lead.id, e.target.value as LeadStage)}
              className="text-xs py-1.5 px-3 rounded-xl border border-[#E4E4E7] bg-white text-[#18181B] font-semibold focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
            >
              {PIPELINE_STAGES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contact & Property Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-[#E4E4E7] shadow-xs space-y-2.5">
            <span className="text-xs font-bold text-[#18181B]">Contact Telemetry</span>
            <div className="space-y-1.5 text-xs text-[#71717A]">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-emerald-600" />
                <span className="font-mono text-[#18181B]">{lead.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-blue-600" />
                <span className="text-[#18181B]">{lead.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 text-[#7C3AED]" />
                <span className="text-[#18181B]">{lead.company || 'Not specified'}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#E4E4E7] shadow-xs space-y-2.5">
            <span className="text-xs font-bold text-[#18181B]">Property Preferences</span>
            <div className="space-y-1.5 text-xs text-[#71717A]">
              <div>
                Project: <strong className="text-[#18181B]">{lead.preferredProject}</strong>
              </div>
              <div>
                Unit: <strong className="text-[#18181B]">{lead.preferredUnitType}</strong>
              </div>
              <div>
                Budget: <strong className="text-[#18181B]">{lead.budgetRangeINR}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="p-4 bg-white rounded-2xl border border-[#E4E4E7] shadow-xs space-y-3">
          <span className="text-xs font-bold text-[#18181B]">Activity Audit Log</span>

          <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-zinc-200">
            {lead.activities?.map((act) => (
              <div key={act.id} className="relative flex items-start gap-3 pl-7 text-xs">
                <div className="absolute left-2 top-1 h-2.5 w-2.5 rounded-full bg-[#7C3AED] ring-4 ring-white" />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#18181B]">{act.title}</span>
                    <span className="text-[10px] text-[#A1A1AA]">
                      {new Date(act.timestamp).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-[#71717A] text-[11px]">{act.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Internal Broker Notes */}
        {lead.notes && (
          <div className="p-4 bg-[#FAFAFA] rounded-2xl border border-[#E4E4E7] space-y-1.5">
            <span className="text-xs font-bold text-[#18181B] flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-[#7C3AED]" />
              Internal Sales Notes
            </span>
            <p className="text-xs text-[#71717A] leading-relaxed">{lead.notes}</p>
          </div>
        )}
      </div>
    </Drawer>
  );
};
