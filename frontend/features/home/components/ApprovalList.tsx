'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/Sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Dialog';
import {
  Check,
  ChevronRight,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { useUIStore } from '@/store/ui.store';
import { cn } from '@/lib/utils/cn';
import type { HomeIntelligenceItem } from '../types';

export interface ApprovalListProps {
  items: HomeIntelligenceItem[];
  loading: boolean;
  onApprove: (id: string) => Promise<string>;
  onDismiss: (id: string) => Promise<string>;
  className?: string;
}

export const ApprovalList: React.FC<ApprovalListProps> = ({
  items,
  loading,
  onApprove,
  onDismiss,
  className,
}) => {
  const { addToast } = useUIStore();
  const [sheetItem, setSheetItem] = useState<HomeIntelligenceItem | null>(null);
  const [confirmItem, setConfirmItem] = useState<HomeIntelligenceItem | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const pendingItems = items.filter(
    (i) => i.status !== 'approved' && i.status !== 'dismissed'
  );
  // Show top 2 items
  const displayItems = pendingItems.slice(0, 2);

  const handleApproveClick = (e: React.MouseEvent, item: HomeIntelligenceItem) => {
    e.stopPropagation();
    if (
      item.actionType === 'approve_budget' ||
      item.actionType === 'scale_winner' ||
      item.budgetChange
    ) {
      setConfirmItem(item);
    } else {
      executeApprove(item.id);
    }
  };

  const executeApprove = async (id: string) => {
    setProcessingId(id);
    try {
      const msg = await onApprove(id);
      addToast(msg, 'success');
      setConfirmItem(null);
      setSheetItem(null);
    } catch {
      addToast('Failed to approve recommendation.', 'danger');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDismissClick = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setProcessingId(id);
    try {
      const msg = await onDismiss(id);
      addToast(msg, 'info');
      setSheetItem(null);
    } catch {
      addToast('Failed to dismiss recommendation.', 'danger');
    } finally {
      setProcessingId(null);
    }
  };

  const getPriorityDot = (priority: HomeIntelligenceItem['priority']) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-rose-600 dark:text-rose-400 shrink-0">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400 shrink-0">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Medium
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-purple-600 dark:text-purple-400 shrink-0">
            <span className="h-2 w-2 rounded-full bg-purple-500" />
            Tip
          </span>
        );
    }
  };

  return (
    <>
      <Card
        className={cn(
          'p-4 lg:p-5 rounded-[20px] bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626]',
          'shadow-[0_2px_16px_rgba(124,58,237,0.05)] flex flex-col justify-between h-full overflow-hidden',
          className
        )}
      >
        {/* Header: Title and View all (3) link */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F6] dark:border-[#222]">
          <h3 className="font-sans text-sm sm:text-base font-semibold text-[#111111] dark:text-[#EDEDED] tracking-tight">
            Needs approval
          </h3>

          <Link
            href="/campaigns"
            className="text-xs font-semibold text-[#7C3AED] hover:text-[#6D28D9] dark:text-[#A78BFA] transition-colors"
          >
            View all ({pendingItems.length || 3})
          </Link>
        </div>

        {/* List of top 2 approval rows (no inner scrolling) */}
        <div className="flex flex-col gap-2.5 my-auto py-1">
          {displayItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <ShieldCheck className="h-8 w-8 text-emerald-500 mb-1.5" />
              <p className="text-xs font-semibold text-[#18181B] dark:text-[#EDEDED]">
                You&apos;re all caught up
              </p>
              <p className="text-[11px] text-[#71717A] mt-0.5">
                No decisions pending approval
              </p>
            </div>
          ) : (
            displayItems.map((item, idx) => {
              const isActing = processingId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSheetItem(item)}
                  className={cn(
                    'p-2.5 sm:p-3 rounded-xl border border-[#EAEAEA] dark:border-[#262626] bg-[#FAFAFC] dark:bg-[#121214]',
                    'hover:border-[#D4D4D8] dark:hover:border-[#3E3E3E] transition-all cursor-pointer flex flex-col justify-between gap-1.5',
                    idx === 1 && 'max-h-[820px]:hidden xl:flex' // hides 2nd item on short screens <=800px to guarantee zero scroll
                  )}
                >
                  {/* Top: Priority Dot & Title */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {getPriorityDot(item.priority)}
                      <span className="font-semibold text-xs text-[#18181B] dark:text-[#EDEDED] truncate">
                        {item.title}
                      </span>
                    </div>

                    <button
                      type="button"
                      aria-label="View recommendation details in sheet"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSheetItem(item);
                      }}
                      className="p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors shrink-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* One-line reason (max 1 line, ellipsis) */}
                  <p className="text-[11px] text-[#52525B] dark:text-[#9CA3AF] truncate leading-tight">
                    {item.whyItMatters}
                  </p>

                  {/* Bottom: Impact tag + Approve & Dismiss buttons */}
                  <div className="flex items-center justify-between pt-1 gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                      <TrendingUp className="h-3 w-3 shrink-0" />
                      <span className="truncate">{item.impactMetric}</span>
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleDismissClick(e, item.id)}
                        disabled={isActing}
                        className="text-[11px] font-medium text-[#71717A] hover:text-[#111] dark:hover:text-white px-2 py-0.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        Dismiss
                      </button>

                      <Button
                        size="sm"
                        variant="primary"
                        onClick={(e) => handleApproveClick(e, item)}
                        isLoading={isActing}
                        className="text-[11px] h-6 px-2.5 font-semibold shadow-2xs"
                        leftIcon={<Check className="h-3 w-3" />}
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>

      {/* Slide-over Sheet for Accordion Details (keeps Home card completely unscrollable) */}
      <Sheet open={Boolean(sheetItem)} onOpenChange={(open) => !open && setSheetItem(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md p-6 flex flex-col justify-between">
          {sheetItem && (
            <div className="space-y-5">
              <SheetHeader>
                <div className="flex items-center gap-2 mb-1">
                  {getPriorityDot(sheetItem.priority)}
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-full">
                    {sheetItem.actionType.replace('_', ' ')}
                  </span>
                </div>
                <SheetTitle className="text-lg font-semibold text-[#18181B] dark:text-[#EDEDED]">
                  {sheetItem.title}
                </SheetTitle>
                <SheetDescription className="text-xs text-[#71717A]">
                  Autonomous marketing strategy proposed by DIYA
                </SheetDescription>
              </SheetHeader>

              {/* Why It Matters */}
              <div className="p-4 rounded-xl bg-[#FAFAFC] dark:bg-[#151518] border border-[#EAEAEA] dark:border-[#262626] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] dark:text-[#888] block">
                  Why it matters
                </span>
                <p className="text-xs text-[#3F3F46] dark:text-[#D4D4D8] leading-relaxed">
                  {sheetItem.whyItMatters}
                </p>
              </div>

              {/* What Will Happen */}
              <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-[#7C3AED]/10 border border-purple-100 dark:border-purple-900/30 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] dark:text-[#A78BFA] block">
                  What will happen
                </span>
                <p className="text-xs text-[#3F3F46] dark:text-[#D4D4D8] leading-relaxed">
                  {sheetItem.whatWillHappen || sheetItem.recommendedAction}
                </p>
              </div>

              {/* Impact */}
              <div className="p-3.5 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30 flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" />
                <span>Projected Impact: {sheetItem.impactMetric}</span>
              </div>
            </div>
          )}

          {sheetItem && (
            <SheetFooter className="flex items-center justify-end gap-2 pt-4 border-t border-[#EAEAEA] dark:border-[#262626]">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => handleDismissClick(e, sheetItem.id)}
              >
                Dismiss
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => handleApproveClick(e, sheetItem)}
                className="font-semibold"
                leftIcon={<Check className="h-3.5 w-3.5" />}
              >
                Approve & Execute
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>

      {/* Confirmation Dialog for Budget Changes */}
      <Dialog
        open={Boolean(confirmItem)}
        onOpenChange={(open) => !open && setConfirmItem(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Budget Adjustment</DialogTitle>
            <DialogDescription>
              This action will adjust campaign budget allocations across active channels.
            </DialogDescription>
          </DialogHeader>

          {confirmItem && (
            <div className="space-y-4 pt-2">
              <div className="p-3.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs">
                <div className="flex items-center gap-2 text-purple-900 dark:text-purple-200 font-bold mb-1">
                  <Sparkles className="h-4 w-4 text-[#7C3AED]" />
                  <span>{confirmItem.title}</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 mt-1">
                  {confirmItem.whatWillHappen || confirmItem.recommendedAction}
                </p>
                <div className="mt-2.5 flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Impact: {confirmItem.impactMetric}</span>
                </div>
              </div>

              <DialogFooter className="flex items-center justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirmItem(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => executeApprove(confirmItem.id)}
                  isLoading={processingId === confirmItem.id}
                  className="font-semibold shadow-xs"
                >
                  Confirm & Execute
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
