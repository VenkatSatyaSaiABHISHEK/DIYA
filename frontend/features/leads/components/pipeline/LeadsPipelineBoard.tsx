'use client';

import React from 'react';
import {
  Sparkles,
  Phone,
  Building2,
  Calendar,
  ChevronRight,
  User,
  ArrowRight,
  MoreVertical,
} from 'lucide-react';
import { useLeadsPipeline } from '../../hooks/useLeadsPipeline';
import { SOURCE_CONFIG, TIER_CONFIG, PIPELINE_STAGES } from '../../constants';
import type { LeadRecord, LeadStage } from '../../types';

export const LeadsPipelineBoard: React.FC = () => {
  const { stagesData, moveLeadToStage, openDrawer } = useLeadsPipeline();

  return (
    <div className="space-y-4">
      {/* Board Columns Grid */}
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar items-start">
        {stagesData.map((stage) => {
          return (
            <div
              key={stage.id}
              className="w-80 shrink-0 bg-[#F4F4F5]/60 rounded-2xl border border-[#E4E4E7] p-3 flex flex-col max-h-[750px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between p-2 mb-2 bg-white rounded-xl border border-[#E4E4E7] shadow-2xs">
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${stage.dotColor}`} />
                  <span className="text-xs font-bold text-[#18181B]">{stage.label}</span>
                  <span className="inline-flex items-center justify-center h-4.5 px-1.5 rounded-full bg-zinc-100 text-[#71717A] text-[10px] font-bold">
                    {stage.count}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#7C3AED]">
                  ₹{stage.totalValueCrores} Cr
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                {stage.leads.length === 0 ? (
                  <div className="p-8 text-center rounded-xl bg-white/50 border border-dashed border-[#E4E4E7] text-[11px] text-[#A1A1AA]">
                    No prospects in this stage
                  </div>
                ) : (
                  stage.leads.map((lead) => {
                    const sourceMeta = SOURCE_CONFIG[lead.source] || SOURCE_CONFIG.meta;
                    const tierMeta = TIER_CONFIG[lead.qualificationTier] || TIER_CONFIG.hot;

                    return (
                      <div
                        key={lead.id}
                        onClick={() => openDrawer(lead.id)}
                        className="group bg-white rounded-xl border border-[#E4E4E7] p-3.5 shadow-xs hover:border-[#7C3AED]/40 hover:shadow-sm cursor-pointer transition-all space-y-2.5"
                      >
                        {/* Top: Source & AI Score */}
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${sourceMeta.bgColor} ${sourceMeta.colorClass}`}
                          >
                            {sourceMeta.label}
                          </span>

                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${tierMeta.badgeClass}`}
                          >
                            <Sparkles className="h-2.5 w-2.5" />
                            {lead.qualificationScore}/100
                          </span>
                        </div>

                        {/* Name & Company */}
                        <div>
                          <h4 className="text-xs font-bold text-[#18181B] group-hover:text-[#7C3AED] transition-colors">
                            {lead.fullName}
                          </h4>
                          <p className="text-[11px] text-[#71717A] truncate flex items-center gap-1 mt-0.5">
                            <Building2 className="h-3 w-3 shrink-0" />
                            {lead.designation ? `${lead.designation}, ` : ''}
                            {lead.company || 'Private Investor'}
                          </p>
                        </div>

                        {/* Property & Budget */}
                        <div className="p-2 rounded-lg bg-[#FAFAFA] border border-[#F4F4F5] text-[11px] space-y-0.5">
                          <div className="text-[#18181B] font-medium truncate">
                            {lead.preferredProject}
                          </div>
                          <div className="text-[#71717A] text-[10px]">
                            Budget: <strong className="text-zinc-800">{lead.budgetRangeINR}</strong>
                          </div>
                        </div>

                        {/* Footer: Quick Stage Transition Buttons */}
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="pt-2 border-t border-[#F4F4F5] flex items-center justify-between text-[11px]"
                        >
                          <span className="text-[10px] text-[#A1A1AA]">
                            {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>

                          {/* Quick Stage Forward Button */}
                          <div className="flex items-center gap-1">
                            {stage.id !== 'converted' && (
                              <button
                                type="button"
                                onClick={() => {
                                  const stageOrder: LeadStage[] = [
                                    'new',
                                    'contacted',
                                    'qualified',
                                    'site_visit',
                                    'negotiation',
                                    'converted',
                                  ];
                                  const currentIndex = stageOrder.indexOf(stage.id);
                                  if (currentIndex < stageOrder.length - 1) {
                                    moveLeadToStage(lead.id, stageOrder[currentIndex + 1]);
                                  }
                                }}
                                className="px-2 py-0.5 rounded-md bg-purple-50 text-[#7C3AED] hover:bg-purple-100 font-semibold text-[10px] flex items-center gap-0.5 transition-colors"
                                title="Advance to next pipeline stage"
                              >
                                <span>Advance</span>
                                <ChevronRight className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
