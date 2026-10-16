'use client';

import React from 'react';
import {
  Sparkles,
  Eye,
  Building2,
  Calendar,
  MessageSquare,
  Phone,
  ExternalLink,
} from 'lucide-react';
import type { LeadRecord } from '../../types';
import { SOURCE_CONFIG, TIER_CONFIG, PIPELINE_STAGES } from '../../constants';
import { cn } from '@/lib/utils/cn';

interface LeadsDirectoryTableProps {
  leads: LeadRecord[];
  selectedLeadIds: string[];
  onToggleSelectLead: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
  onClearSelection: () => void;
  onOpenDrawer: (id: string) => void;
}

export const LeadsDirectoryTable: React.FC<LeadsDirectoryTableProps> = ({
  leads,
  selectedLeadIds,
  onToggleSelectLead,
  onSelectAll,
  onClearSelection,
  onOpenDrawer,
}) => {
  const isAllSelected = leads.length > 0 && selectedLeadIds.length === leads.length;

  const handleSelectAllChange = () => {
    if (isAllSelected) {
      onClearSelection();
    } else {
      onSelectAll(leads.map((l) => l.id));
    }
  };

  return (
    <>
      {/* Mobile Card View (Best UI on phones) */}
      <div className="md:hidden space-y-3">
        {leads.map((lead) => {
          const isSelected = selectedLeadIds.includes(lead.id);
          const source = SOURCE_CONFIG[lead.source] || SOURCE_CONFIG.meta;
          const tier = TIER_CONFIG[lead.qualificationTier] || TIER_CONFIG.hot;
          const stage = PIPELINE_STAGES.find((s) => s.id === lead.stage) || PIPELINE_STAGES[0];

          return (
            <div
              key={lead.id}
              onClick={() => onOpenDrawer(lead.id)}
              className={cn(
                'p-4 rounded-2xl bg-white border border-[#E4E4E7] shadow-xs active:scale-[0.99] transition-all cursor-pointer space-y-3',
                isSelected ? 'ring-2 ring-[#7C3AED] bg-purple-50/20' : ''
              )}
            >
              {/* Row 1: Name, Channel, and Stage */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSelectLead(lead.id);
                    }}
                    className="p-1 -ml-1"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelectLead(lead.id)}
                      className="rounded border-[#E4E4E7] text-[#7C3AED] focus:ring-[#7C3AED]"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#18181B] text-sm truncate">{lead.fullName}</p>
                    <p className="text-[11px] text-[#71717A] truncate flex items-center gap-1 mt-0.5">
                      <Building2 className="h-3 w-3 shrink-0 text-[#A1A1AA]" />
                      {lead.company || 'Private Investor'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${source.bgColor} ${source.colorClass}`}
                  >
                    {source.label}
                  </span>
                </div>
              </div>

              {/* Row 2: Property & Budget + AI Score */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAFAFC] border border-[#F4F4F6] text-xs">
                <div>
                  <span className="text-[10px] text-[#71717A] block font-medium">Interested In</span>
                  <span className="font-bold text-[#18181B] truncate block max-w-[170px] mt-0.5">
                    {lead.preferredProject}
                  </span>
                  <span className="text-[10px] text-[#71717A]">{lead.budgetRangeINR}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#71717A] block font-medium">AI Score</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border mt-0.5 ${tier.badgeClass}`}
                  >
                    <Sparkles className="h-3 w-3" />
                    {lead.qualificationScore}/100
                  </span>
                </div>
              </div>

              {/* Row 3: Pipeline Stage & Time */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-[#71717A]">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${stage.badgeColor} border ${stage.borderColor}`}
                >
                  <div className={`h-1.5 w-1.5 rounded-full ${stage.dotColor}`} />
                  {stage.label}
                </span>

                <span className="text-[10px] text-[#A1A1AA]">
                  {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-[#E4E4E7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFAFA] border-b border-[#E4E4E7] text-[#71717A] uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAllChange}
                    className="rounded border-[#E4E4E7] text-[#7C3AED] focus:ring-[#7C3AED]"
                    aria-label="Select all leads"
                  />
                </th>
                <th className="py-3 px-4">Prospect & Company</th>
                <th className="py-3 px-4">Channel Origin</th>
                <th className="py-3 px-4">Project & Budget</th>
                <th className="py-3 px-4">AI Score</th>
                <th className="py-3 px-4">Pipeline Stage</th>
                <th className="py-3 px-4">Captured (IST)</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F5]">
              {leads.map((lead) => {
                const isSelected = selectedLeadIds.includes(lead.id);
                const source = SOURCE_CONFIG[lead.source] || SOURCE_CONFIG.meta;
                const tier = TIER_CONFIG[lead.qualificationTier] || TIER_CONFIG.hot;
                const stage = PIPELINE_STAGES.find((s) => s.id === lead.stage) || PIPELINE_STAGES[0];

                return (
                  <tr
                    key={lead.id}
                    onClick={() => onOpenDrawer(lead.id)}
                    className={`hover:bg-[#FAFAFA] cursor-pointer transition-colors ${
                      isSelected ? 'bg-purple-50/30' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td
                      className="py-3.5 px-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSelectLead(lead.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelectLead(lead.id)}
                        className="rounded border-[#E4E4E7] text-[#7C3AED] focus:ring-[#7C3AED]"
                      />
                    </td>

                    {/* Name & Contact */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="font-bold text-[#18181B] truncate">{lead.fullName}</p>
                      <p className="text-[11px] text-[#71717A] truncate flex items-center gap-1 mt-0.5">
                        <Building2 className="h-3 w-3 shrink-0" />
                        {lead.designation ? `${lead.designation}, ` : ''}
                        {lead.company || 'Private Investor'}
                      </p>
                      <p className="text-[10px] text-[#A1A1AA] font-mono mt-0.5">{lead.phone}</p>
                    </td>

                    {/* Source */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${source.bgColor} ${source.colorClass}`}
                      >
                        {source.label}
                      </span>
                    </td>

                    {/* Property & Budget */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <p className="font-semibold text-[#18181B]">{lead.preferredProject}</p>
                      <p className="text-[11px] text-[#71717A] mt-0.5 font-medium">
                        {lead.budgetRangeINR}
                      </p>
                    </td>

                    {/* AI Score */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${tier.badgeClass}`}
                      >
                        <Sparkles className="h-3 w-3" />
                        {lead.qualificationScore}/100
                      </span>
                    </td>

                    {/* Stage */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${stage.badgeColor} border ${stage.borderColor}`}
                      >
                        <div className={`h-1.5 w-1.5 rounded-full ${stage.dotColor}`} />
                        {stage.label}
                      </span>
                    </td>

                    {/* Captured Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-[#71717A] text-[11px]">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    {/* Actions */}
                    <td
                      onClick={(e) => e.stopPropagation()}
                      className="py-3.5 px-4 text-right whitespace-nowrap"
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onOpenDrawer(lead.id)}
                          className="p-1 rounded-md text-[#71717A] hover:text-[#18181B]"
                          title="View Full Profile"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
