'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Lightbulb, Check, X, TrendingUp, AlertTriangle } from 'lucide-react';
import { useUIStore } from '@/store/ui.store';
import { cn } from '@/lib/utils/cn';
import type { HomeIntelligenceItem } from '../types';

export interface IntelligencePanelProps {
  items: HomeIntelligenceItem[];
  loading: boolean;
  onApprove: (id: string) => Promise<string>;
  onDismiss: (id: string) => Promise<string>;
  compact?: boolean;
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({
  items,
  loading,
  onApprove,
  onDismiss,
  compact = false,
}) => {
  const { addToast } = useUIStore();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    try {
      const msg = await onApprove(id);
      addToast(msg, 'success');
    } catch {
      addToast('Failed to approve recommendation.', 'danger');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDismiss = async (id: string) => {
    setProcessingId(id);
    try {
      const msg = await onDismiss(id);
      addToast(msg, 'info');
    } catch {
      addToast('Failed to dismiss item.', 'danger');
    } finally {
      setProcessingId(null);
    }
  };

  const getPriorityBadge = (priority: HomeIntelligenceItem['priority']) => {
    switch (priority) {
      case 'high':
        return (
          <Badge variant="danger" size="sm" dot>
            High Priority
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="warning" size="sm" dot>
            Medium Priority
          </Badge>
        );
      default:
        return (
          <Badge variant="info" size="sm" dot>
            Growth Tip
          </Badge>
        );
    }
  };

  return (
    <Card className={cn('flex flex-col bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626]', compact ? 'p-3.5 h-full' : 'p-5 h-full')}>
      <div className={cn('flex items-center justify-between border-b border-[#F4F4F6] dark:border-[#222]', compact ? 'pb-2.5' : 'pb-4')}>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EDE9FE] dark:bg-[#7C3AED]/20 text-[#7C3AED]">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#18181B] dark:text-[#EDEDED]">DIYA Intelligence</h3>
            <p className="text-[10px] sm:text-[11px] text-[#71717A] dark:text-[#888]">
              {items.filter((i) => i.status !== 'approved').length} decisions requiring approval
            </p>
          </div>
        </div>
        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/40">
          Proactive
        </span>
      </div>

      <div className={cn('flex flex-col gap-2.5 flex-1 overflow-y-auto pr-1', compact ? 'mt-2.5 max-h-[465px]' : 'mt-4')}>
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="p-3 rounded-xl border border-[#F4F4F6] dark:border-[#222] space-y-2">
                <div className="flex justify-between">
                  <Skeleton width="60%" height={16} />
                  <Skeleton width="25%" height={16} />
                </div>
                <Skeleton width="100%" height={12} />
                <Skeleton width="80%" height={12} />
                <div className="flex gap-2 pt-1">
                  <Skeleton width={100} height={28} />
                  <Skeleton width={60} height={28} />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            title="All recommendations reviewed"
            description="DIYA is continuously monitoring your ad spend and conversion signals. New opportunities will show up here."
            className="my-auto py-6"
          />
        ) : (
          items.map((item) => {
            const isApproved = item.status === 'approved';
            const isActing = processingId === item.id;

            return (
              <div
                key={item.id}
                className={cn(
                  'rounded-xl border transition-all shadow-2xs',
                  compact ? 'p-2.5' : 'p-3.5',
                  isApproved
                    ? 'border-[#EAEAEA] dark:border-[#222] bg-[#FAFAFC]/50 dark:bg-[#121214]/50 opacity-65'
                    : 'border-[#EAEAEA] dark:border-[#262626] bg-white dark:bg-[#0E0E10] hover:border-[#D4D4D8] dark:hover:border-[#383838]'
                )}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-xs font-bold text-[#18181B] dark:text-[#EDEDED] leading-snug">
                      {item.title}
                    </h4>
                    {getPriorityBadge(item.priority)}
                  </div>
                  {isApproved && (
                    <Badge variant="success" size="sm" dot>
                      Approved
                    </Badge>
                  )}
                </div>

                {/* Why It Matters */}
                <div className="mt-2 p-2 rounded-lg bg-[#FAFAFC] dark:bg-[#161618] border border-[#F4F4F6] dark:border-[#262626]">
                  <span className="text-[9px] font-bold text-[#71717A] dark:text-[#888] uppercase tracking-wider block mb-0.5">
                    Why It Matters
                  </span>
                  <p className="text-[11px] text-[#52525B] dark:text-[#AAA] leading-relaxed">{item.whyItMatters}</p>
                </div>

                {/* Impact Metric & Recommendation */}
                <div className="mt-2 flex items-center justify-between text-xs flex-wrap gap-1.5">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#16A34A] dark:text-emerald-400">
                    <TrendingUp className="h-3 w-3" />
                    <span>{item.impactMetric}</span>
                  </div>
                  <p className="text-[10px] text-[#71717A] dark:text-[#888] italic truncate max-w-[200px]">
                    Action: {item.recommendedAction}
                  </p>
                </div>

                {/* Action Buttons */}
                {!isApproved && (
                  <div className="mt-2.5 pt-2 border-t border-[#F4F4F6] dark:border-[#222] flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleDismiss(item.id)}
                      disabled={isActing}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-[#71717A] dark:text-[#888] hover:text-[#18181B] dark:hover:text-[#EDEDED] hover:bg-[#F4F4F6] dark:hover:bg-[#1E1E20] transition-colors"
                    >
                      <X className="h-3 w-3" />
                      <span>Dismiss</span>
                    </button>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleApprove(item.id)}
                      isLoading={isActing}
                      className="text-[11px] h-7 px-2.5 font-semibold shadow-xs"
                      leftIcon={<Check className="h-3 w-3" />}
                    >
                      Approve & Execute
                    </Button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};
