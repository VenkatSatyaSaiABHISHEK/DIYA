'use client';

import React, { useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils/format';
import {
  Megaphone,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Sliders,
  Pause,
  Play,
  Share2,
  Calendar,
  Layers,
  ShieldAlert,
} from 'lucide-react';
import { useCampaignsStore } from '../../store/campaigns.store';
import type { Campaign, CampaignStatus, PerformanceHealth } from '../../types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { isReducedMotion } from '@/lib/animations/pageTransition';
import { cn } from '@/lib/utils/cn';

export interface CampaignCardProps {
  campaign: Campaign;
  onPause: (id: string) => void;
  onApprove: (id: string) => void;
  onOpenBudgetModal: (campaign: Campaign) => void;
  onDismissRecommendation: (id: string) => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onPause,
  onApprove,
  onOpenBudgetModal,
  onDismissRecommendation,
}) => {
  const {
    openDetailDrawer,
    compareIds,
    toggleCompare,
    dismissedRecommendationIds,
  } = useCampaignsStore();

  const sparklineRef = useRef<SVGPathElement>(null);
  const isCompared = compareIds.includes(campaign.id);
  const isRecommendationDismissed = dismissedRecommendationIds.includes(campaign.id);

  useGSAP(
    () => {
      if (!sparklineRef.current || isReducedMotion()) return;
      const length = sparklineRef.current.getTotalLength();
      gsap.fromTo(
        sparklineRef.current,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out' }
      );
    },
    { dependencies: [campaign.id], scope: sparklineRef }
  );

  const getStatusBadge = (status: CampaignStatus) => {
    switch (status) {
      case 'live':
        return (
          <Badge variant="success" size="sm" dot>
            Live Active
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="primary" size="sm" dot>
            Approved
          </Badge>
        );
      case 'recommendation':
        return (
          <Badge variant="warning" size="sm" dot>
            Recommendation
          </Badge>
        );
      case 'paused':
        return (
          <Badge variant="neutral" size="sm" dot>
            Paused
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="info" size="sm">
            Completed
          </Badge>
        );
      case 'draft':
      default:
        return (
          <Badge variant="neutral" size="sm" dot>
            Draft
          </Badge>
        );
    }
  };

  const getHealthBadge = (health: PerformanceHealth) => {
    switch (health) {
      case 'underperforming':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            Underperforming
          </span>
        );
      case 'needs_attention':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Needs Attention
          </span>
        );
      case 'on_track':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            On Track
          </span>
        );
    }
  };

  // Sparkline SVG Path generator
  const renderSparkline = () => {
    const data = campaign.sparklineData;
    if (!data || data.length === 0) return null;
    const max = Math.max(...data, 1);
    const min = Math.min(...data, 0);
    const range = max - min || 1;
    const width = 100;
    const height = 28;

    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    });

    const pathD = `M ${points.join(' L ')}`;
    const strokeColor =
      campaign.health === 'underperforming'
        ? '#DC2626'
        : campaign.health === 'needs_attention'
        ? '#F59E0B'
        : '#10B981';

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-24 h-7 overflow-visible shrink-0"
        aria-hidden="true"
      >
        <path
          ref={sparklineRef}
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <Card className="p-4 sm:p-5 border border-[#E4E4E7] bg-white shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Header: Checkbox, Platform tag, Status & Health */}
        <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#F4F4F6]">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Compare Checkbox */}
            <label
              className="flex items-center gap-1.5 text-[11px] text-[#71717A] cursor-pointer hover:text-[#18181B] select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={isCompared}
                onChange={() => toggleCompare(campaign.id)}
                className="h-3.5 w-3.5 rounded border-[#D4D4D8] text-[#7C3AED] focus:ring-[#7C3AED]"
              />
              <span className="hidden sm:inline">Compare</span>
            </label>

            {/* Platform indicator badge */}
            <span
              className={cn(
                'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                campaign.platform === 'meta'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : campaign.platform === 'google'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-purple-50 text-purple-700 border border-purple-200'
              )}
            >
              {campaign.platform === 'meta'
                ? 'Meta Ads'
                : campaign.platform === 'google'
                ? 'Google Ads'
                : 'Omnichannel'}
            </span>

            {/* Objective tag */}
            <span className="text-[10px] font-medium text-[#71717A] bg-[#F4F4F6] px-2 py-0.5 rounded-md capitalize">
              {campaign.objective}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {getStatusBadge(campaign.status)}
            {getHealthBadge(campaign.health)}
          </div>
        </div>

        {/* Campaign Name & Target Audience */}
        <div className="mt-3">
          <h4
            onClick={() => openDetailDrawer(campaign.id)}
            className="text-sm sm:text-base font-bold text-[#18181B] group-hover:text-[#7C3AED] transition-colors cursor-pointer leading-snug line-clamp-1"
          >
            {campaign.name}
          </h4>
          <p className="text-xs text-[#71717A] mt-1 line-clamp-1">
            {campaign.targetAudience}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-[#FAFAFC] border border-[#F4F4F6] text-xs">
          <div>
            <span className="text-[10px] text-[#71717A] block font-medium">Daily Budget</span>
            <span className="font-bold text-[#18181B] mt-0.5 block">
              {formatINR(campaign.dailyBudgetINR)}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-[#71717A] block font-medium">Total Spend</span>
            <span className="font-bold text-[#18181B] mt-0.5 block">
              {formatINR(campaign.spendTotalINR)}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-[#71717A] block font-medium">Leads Captured</span>
            <span className="font-bold text-[#16A34A] mt-0.5 block">
              {campaign.leadsCount > 0 ? campaign.leadsCount : '-'}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-[#71717A] block font-medium">Cost / Lead</span>
            <span className="font-bold text-[#18181B] mt-0.5 block">
              {campaign.cplINR > 0 ? formatINR(campaign.cplINR) : '-'}
            </span>
          </div>
        </div>

        {/* Sparkline & Schedule Row */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-[#71717A]">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-[#A1A1AA]" />
            {campaign.schedule.startDate} • {campaign.schedule.durationDays} days flight
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#A1A1AA] hidden sm:inline">7-day trend</span>
            {renderSparkline()}
          </div>
        </div>

        {/* DIYA Recommends Banner (if underperforming) */}
        {campaign.health === 'underperforming' &&
          campaign.underperformingRecommendation &&
          !isRecommendationDismissed && (
            <div className="mt-3.5 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-xs text-amber-950 space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-amber-900">
                  <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />
                  DIYA Operational Recommendation
                </span>
                <button
                  type="button"
                  onClick={() => onDismissRecommendation(campaign.id)}
                  className="text-[10px] text-amber-700 hover:text-amber-950 underline"
                >
                  Dismiss
                </button>
              </div>

              <p className="text-[11px] text-amber-900 leading-relaxed">
                <strong>Problem:</strong> {campaign.underperformingRecommendation.problem}
              </p>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                <strong>Recommended Fix:</strong> {campaign.underperformingRecommendation.fix}
              </p>

              <div className="pt-1 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openDetailDrawer(campaign.id)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7C3AED] hover:text-[#6D28D9]"
                >
                  <span>Review Strategy in Drawer</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
      </div>

      {/* Card Action Footer */}
      <div className="mt-4 pt-3 border-t border-[#F4F4F6] flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => openDetailDrawer(campaign.id)}
          className="text-xs font-semibold text-[#7C3AED] hover:text-[#6D28D9] transition-colors inline-flex items-center gap-1"
        >
          <span>View Performance Details</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-center gap-1.5">
          {campaign.status === 'recommendation' && (
            <button
              type="button"
              onClick={() => onApprove(campaign.id)}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#7C3AED] text-white hover:bg-[#6D28D9] transition-colors"
            >
              Approve Campaign
            </button>
          )}

          {campaign.status === 'live' && (
            <>
              <button
                type="button"
                onClick={() => onOpenBudgetModal(campaign)}
                className="px-2.5 py-1 text-xs font-medium rounded-lg border border-[#E4E4E7] bg-white text-[#52525B] hover:text-[#18181B] hover:bg-[#FAFAFC] transition-colors"
                title="Increase Daily Budget Cap"
              >
                + Budget
              </button>

              <button
                type="button"
                onClick={() => onPause(campaign.id)}
                className="p-1 rounded-lg border border-[#E4E4E7] text-[#71717A] hover:text-[#DC2626] hover:bg-red-50 transition-colors"
                title="Pause Campaign"
              >
                <Pause className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
