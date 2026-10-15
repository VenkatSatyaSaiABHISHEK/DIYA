'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils/format';
import { Pause, ArrowRight, TrendingUp } from 'lucide-react';
import { useCampaignsStore } from '../../store/campaigns.store';
import type { Campaign, CampaignStatus, PerformanceHealth } from '../../types';
import { cn } from '@/lib/utils/cn';

export interface CampaignTableProps {
  campaigns: Campaign[];
  onPause: (id: string) => void;
  onApprove: (id: string) => void;
  onOpenBudgetModal: (campaign: Campaign) => void;
}

export const CampaignTable: React.FC<CampaignTableProps> = ({
  campaigns,
  onPause,
  onApprove,
  onOpenBudgetModal,
}) => {
  const { openDetailDrawer, compareIds, toggleCompare } = useCampaignsStore();

  const getStatusBadge = (status: CampaignStatus) => {
    switch (status) {
      case 'live':
        return <Badge variant="success" size="sm" dot>Live</Badge>;
      case 'approved':
        return <Badge variant="primary" size="sm" dot>Approved</Badge>;
      case 'recommendation':
        return <Badge variant="warning" size="sm" dot>Recommendation</Badge>;
      case 'paused':
        return <Badge variant="neutral" size="sm" dot>Paused</Badge>;
      case 'completed':
        return <Badge variant="info" size="sm">Completed</Badge>;
      case 'draft':
      default:
        return <Badge variant="neutral" size="sm" dot>Draft</Badge>;
    }
  };

  const getHealthBadge = (health: PerformanceHealth) => {
    switch (health) {
      case 'underperforming':
        return (
          <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
            Underperforming
          </span>
        );
      case 'needs_attention':
        return (
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            Needs Attention
          </span>
        );
      case 'on_track':
      default:
        return (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            On Track
          </span>
        );
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-[20px] border border-[#EAEAEA] dark:border-[#262626] bg-white dark:bg-[#0E0E10] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-[#EAEAEA] dark:border-[#262626] bg-[#FAFAFC] dark:bg-[#151518] text-[#71717A] dark:text-[#888] font-semibold text-[11px] uppercase tracking-wider">
            <th className="py-3.5 px-3 w-10 text-center">Compare</th>
            <th className="py-3.5 px-4">Campaign Name</th>
            <th className="py-3.5 px-3">Network</th>
            <th className="py-3.5 px-3">Status</th>
            <th className="py-3.5 px-3">Health</th>
            <th className="py-3.5 px-3 text-right">Daily Cap</th>
            <th className="py-3.5 px-3 text-right">Total Spend</th>
            <th className="py-3.5 px-3 text-right">Leads</th>
            <th className="py-3.5 px-3 text-right">Cost / Lead</th>
            <th className="py-3.5 px-3 text-right">ROAS</th>
            <th className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F0F0F2] dark:divide-[#222]">
          {campaigns.map((camp) => {
            const isCompared = compareIds.includes(camp.id);

            return (
              <tr
                key={camp.id}
                onClick={() => openDetailDrawer(camp.id)}
                className="hover:bg-[#F9F9FB] dark:hover:bg-[#1A1A1E] transition-colors cursor-pointer group"
              >
                {/* Compare Checkbox */}
                <td
                  className="py-3.5 px-3 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={isCompared}
                    onChange={() => toggleCompare(camp.id)}
                    aria-label={`Compare ${camp.name}`}
                    className="h-3.5 w-3.5 rounded border-[#D4D4D8] text-[#7C3AED] focus:ring-[#7C3AED]"
                  />
                </td>

                {/* Campaign Name */}
                <td className="py-3.5 px-4">
                  <div className="font-bold text-[#18181B] dark:text-[#EDEDED] group-hover:text-[#7C3AED] transition-colors line-clamp-1 max-w-md lg:max-w-xl">
                    {camp.name}
                  </div>
                  <div className="text-[10px] text-[#A1A1AA] dark:text-[#71717A] line-clamp-1 max-w-md lg:max-w-xl mt-0.5">
                    {camp.targetAudience}
                  </div>
                </td>

                {/* Network */}
                <td className="py-3.5 px-3">
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                      camp.platform === 'meta'
                        ? 'bg-blue-50 text-blue-700'
                        : camp.platform === 'google'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-purple-50 text-purple-700'
                    )}
                  >
                    {camp.platform}
                  </span>
                </td>

                {/* Status */}
                <td className="py-3.5 px-3">{getStatusBadge(camp.status)}</td>

                {/* Health */}
                <td className="py-3.5 px-3">{getHealthBadge(camp.health)}</td>

                {/* Daily Cap */}
                <td className="py-3.5 px-3 text-right font-medium text-[#18181B]">
                  {formatINR(camp.dailyBudgetINR)}
                </td>

                {/* Total Spend */}
                <td className="py-3.5 px-3 text-right font-semibold text-[#18181B]">
                  {formatINR(camp.spendTotalINR)}
                </td>

                {/* Leads */}
                <td className="py-3.5 px-3 text-right font-bold text-[#16A34A]">
                  {camp.leadsCount > 0 ? camp.leadsCount : '-'}
                </td>

                {/* Cost / Lead */}
                <td className="py-3.5 px-3 text-right font-medium text-[#18181B]">
                  {camp.cplINR > 0 ? formatINR(camp.cplINR) : '-'}
                </td>

                {/* ROAS */}
                <td className="py-3.5 px-3 text-right font-semibold text-[#7C3AED]">
                  {camp.roas > 0 ? `${camp.roas}x` : '-'}
                </td>

                {/* Actions */}
                <td
                  className="py-3.5 px-4 text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    {camp.status === 'live' && (
                      <button
                        type="button"
                        onClick={() => onOpenBudgetModal(camp)}
                        className="px-2 py-1 rounded text-[11px] font-medium border border-[#E4E4E7] text-[#52525B] hover:text-[#18181B] hover:bg-[#F4F4F6]"
                      >
                        + Budget
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => openDetailDrawer(camp.id)}
                      className="p-1 rounded text-[#7C3AED] hover:bg-[#EDE9FE]"
                      title="View Details"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
