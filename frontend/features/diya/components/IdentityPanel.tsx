'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { AIOrb } from '@/components/brand/AIOrb';
import { Badge } from '@/components/ui/Badge';
import { useAIStatusStore } from '@/store/ai-status.store';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  Minimize2,
  Radio,
  Share2,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface IdentityPanelProps {
  className?: string;
  isCompact?: boolean;
  onCollapse?: () => void;
}

export const IdentityPanel: React.FC<IdentityPanelProps> = ({
  className,
  isCompact = false,
  onCollapse,
}) => {
  const { status, statusLabel, currentTask, todaySummary } = useAIStatusStore();

  const handleJumpToApproval = () => {
    const planEl = document.getElementById('active-plan-card');
    if (planEl) {
      planEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a quick visual highlight ring
      planEl.classList.add('ring-2', 'ring-[#7C3AED]', 'transition-all');
      setTimeout(() => {
        planEl.classList.remove('ring-2', 'ring-[#7C3AED]');
      }, 2000);
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'awaiting_approval':
        return (
          <Badge variant="warning" size="sm" dot>
            Awaiting Sign-Off
          </Badge>
        );
      case 'analyzing':
      case 'planning':
        return (
          <Badge variant="info" size="sm" dot>
            {statusLabel}
          </Badge>
        );
      case 'creating':
        return (
          <Badge variant="primary" size="sm" dot>
            {statusLabel}
          </Badge>
        );
      case 'optimizing':
      case 'running':
        return (
          <Badge variant="success" size="sm" dot>
            {statusLabel}
          </Badge>
        );
      case 'idle':
      default:
        return (
          <Badge variant="neutral" size="sm">
            {statusLabel}
          </Badge>
        );
    }
  };

  if (isCompact) {
    return (
      <GlassCard className={cn('p-3 flex items-center justify-between gap-3 shadow-xs', className)}>
        <div className="flex items-center gap-2.5">
          <AIOrb status={status} size="sm" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#18181B]">DIYA</span>
              {getStatusBadge()}
            </div>
            <p className="text-[11px] text-[#71717A] truncate max-w-[200px] sm:max-w-xs mt-0.5">
              {currentTask || 'Autonomous operations ready'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {todaySummary.tasksAwaitingApproval > 0 && (
            <button
              type="button"
              onClick={handleJumpToApproval}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors"
            >
              <ShieldAlert className="h-3.5 w-3.5 text-amber-700" />
              <span>{todaySummary.tasksAwaitingApproval} Pending</span>
            </button>
          )}

          <div className="text-right text-xs border-l border-[#E4E4E7]/60 pl-3">
            <span className="text-[10px] text-[#71717A] block">Today</span>
            <span className="font-semibold text-[#18181B]">
              {todaySummary.tasksCompleted} done
            </span>
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className={cn('flex flex-col gap-4 p-4 shadow-glass border border-[#E4E4E7]/90 bg-white/85 rounded-2xl', className)}>
      {/* Header with AIOrb and Title */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F6]">
        <div className="flex items-center gap-3">
          <AIOrb status={status} size="md" interactive />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#18181B]">DIYA</h3>
              <span className="text-[10px] font-semibold text-[#7C3AED] bg-[#EDE9FE] px-2 py-0.5 rounded-full">
                AI Employee
              </span>
            </div>
            <p className="text-[11px] text-[#71717A] mt-0.5">Autonomous Marketing Manager</p>
          </div>
        </div>

        {onCollapse && (
          <button
            type="button"
            onClick={onCollapse}
            aria-label="Collapse side panel"
            className="p-1 rounded-md text-[#71717A] hover:text-[#18181B] hover:bg-black/5 transition-colors"
          >
            <Minimize2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Live Status Pill */}
      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#FAFAFC] border border-[#F4F4F6]">
        <span className="text-[11px] font-medium text-[#71717A]">AI Engine Status</span>
        <div>{getStatusBadge()}</div>
      </div>

      {/* High-Impact Attention Card (Shows when approvals needed) */}
      {todaySummary.tasksAwaitingApproval > 0 && (
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
            <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0" />
            <span>{todaySummary.tasksAwaitingApproval} Actions Require Sign-Off</span>
          </div>
          <p className="text-[11px] text-amber-900 mt-1 leading-relaxed">
            Meta Ads campaign flight (₹14,000) is ready for your authorization.
          </p>
          <button
            type="button"
            onClick={handleJumpToApproval}
            className="mt-2.5 w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-colors"
          >
            <span>Review Approval Plan</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Current Operation Focus */}
      <div className="p-3.5 rounded-xl bg-white border border-[#E4E4E7] shadow-2xs space-y-1.5">
        <div className="flex items-center justify-between text-[10px] font-semibold text-[#71717A] uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Radio className="h-3 w-3 text-emerald-500 animate-pulse" />
            Active Workstream
          </span>
          <span className="text-[#7C3AED] bg-[#FAF5FF] px-1.5 py-0.5 rounded font-bold">
            Meta Ads
          </span>
        </div>
        <p className="text-xs text-[#18181B] leading-relaxed font-medium">
          {currentTask || 'Autonomous operations idle — awaiting task command'}
        </p>
      </div>

      {/* Today's Operational Summary */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-xl bg-[#FAFAFC] border border-[#E4E4E7]/80 text-center">
          <span className="text-[10px] text-[#71717A] block font-medium">Tasks Completed</span>
          <span className="text-lg font-bold text-[#16A34A] mt-0.5 block">
            {todaySummary.tasksCompleted > 0 ? todaySummary.tasksCompleted : '-'}
          </span>
          <span className="text-[9px] text-[#A1A1AA] block mt-0.5">Audits & copies</span>
        </div>

        <div className="p-3 rounded-xl bg-[#FAFAFC] border border-[#E4E4E7]/80 text-center">
          <span className="text-[10px] text-[#71717A] block font-medium">Needs Approval</span>
          <span
            className={cn(
              'text-lg font-bold mt-0.5 block',
              todaySummary.tasksAwaitingApproval > 0 ? 'text-[#D97706]' : 'text-[#71717A]'
            )}
          >
            {todaySummary.tasksAwaitingApproval > 0 ? todaySummary.tasksAwaitingApproval : '-'}
          </span>
          <span className="text-[9px] text-[#A1A1AA] block mt-0.5">Live ad flights</span>
        </div>
      </div>

      {/* Connected Channels Pill Strip */}
      <div className="p-3 rounded-xl bg-white border border-[#E4E4E7] shadow-2xs space-y-2">
        <span className="text-[10px] font-semibold text-[#71717A] uppercase tracking-wider block">
          Connected Ad Channels
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
            <CheckCircle2 className="h-2.5 w-2.5" /> Meta Ads
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
            <CheckCircle2 className="h-2.5 w-2.5" /> Google Ads
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#FAF5FF] text-[#7C3AED] border border-[#DDD6FE]">
            <Share2 className="h-2.5 w-2.5" /> WhatsApp API
          </span>
        </div>
      </div>

      {/* Brand Knowledge Readiness */}
      <div className="p-3 rounded-xl bg-[#EDE9FE]/50 border border-[#DDD6FE] text-left space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#6D28D9]">
            <BookOpen className="h-3.5 w-3.5 text-[#7C3AED]" />
            <span>Brand Knowledge</span>
          </div>
          <span className="text-[10px] font-bold text-[#7C3AED] bg-white px-1.5 py-0.5 rounded">
            85% Trained
          </span>
        </div>
        <p className="text-[11px] text-[#52525B] leading-relaxed">
          Trained on Hyderabad real estate tone, target personas, and Kokapet pricing.
        </p>
        <Link
          href="/settings"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors pt-1"
        >
          <span>Configure Guidelines</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </GlassCard>
  );
};
