'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/Carousel';
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
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { useUIStore } from '@/store/ui.store';
import { cn } from '@/lib/utils/cn';
import type { HomeIntelligenceItem } from '../types';

export interface ApprovalCarouselProps {
  items: HomeIntelligenceItem[];
  loading: boolean;
  onApprove: (id: string) => Promise<string>;
  onDismiss: (id: string) => Promise<string>;
  className?: string;
}

export const ApprovalCarousel: React.FC<ApprovalCarouselProps> = ({
  items,
  loading,
  onApprove,
  onDismiss,
  className,
}) => {
  const { addToast } = useUIStore();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [sheetItem, setSheetItem] = useState<HomeIntelligenceItem | null>(null);
  const [confirmItem, setConfirmItem] = useState<HomeIntelligenceItem | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const pendingItems = items.filter(
    (i) => i.status !== 'approved' && i.status !== 'dismissed'
  );

  useEffect(() => {
    if (!api) return;
    try {
      api.reInit();
    } catch {
      // safe fallback
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api, pendingItems.length]);

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
      // Auto-slide to next if available
      api?.scrollNext();
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
      api?.scrollNext();
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
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 shrink-0">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            High Priority
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 shrink-0">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Medium Priority
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 shrink-0">
            <span className="h-2 w-2 rounded-full bg-purple-500" />
            Growth Tip
          </span>
        );
    }
  };

  return (
    <>
      <Card
        className={cn(
          'p-6 rounded-[20px] bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626]',
          'shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between h-full overflow-hidden',
          className
        )}
      >
        {/* Header: Title, Counter & View all */}
        <div className="flex items-center justify-between pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <h3 className="font-sans text-sm sm:text-base font-semibold text-[#111111] dark:text-[#EDEDED] tracking-tight">
              Needs approval
            </h3>
            {count > 0 && (
              <span className="text-xs text-[#71717A] dark:text-[#888888] font-medium bg-[#F4F4F6] dark:bg-[#1A1A1E] px-2 py-0.5 rounded-full">
                {current} of {count}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Left/Right Arrow Navigation */}
            {count > 1 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => api?.scrollPrev()}
                  disabled={current <= 1}
                  aria-label="Previous approval"
                  className="p-1 rounded-md text-[#71717A] hover:text-[#111] dark:hover:text-[#FFF] hover:bg-[#F4F4F6] dark:hover:bg-[#1A1A1E] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => api?.scrollNext()}
                  disabled={current >= count}
                  aria-label="Next approval"
                  className="p-1 rounded-md text-[#71717A] hover:text-[#111] dark:hover:text-[#FFF] hover:bg-[#F4F4F6] dark:hover:bg-[#1A1A1E] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            <Link
              href="/campaigns"
              className="text-xs font-semibold text-[#7C3AED] hover:text-[#6D28D9] dark:text-[#A78BFA] transition-colors"
            >
              View all
            </Link>
          </div>
        </div>

        {/* Carousel Slide Area: Full height, soft tinted bg, NO inner border */}
        <div className="flex-1 min-h-0 w-full overflow-hidden my-auto flex flex-col justify-center">
          {pendingItems.length === 0 ? (
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
            <Carousel setApi={setApi} className="w-full h-full flex flex-col justify-between">
              <CarouselContent className="h-full -ml-0">
                {pendingItems.map((item) => {
                  const isActing = processingId === item.id;

                  return (
                    <CarouselItem key={item.id} className="pl-0 h-full flex flex-col justify-between">
                      {/* Slide Box: Soft tinted background, NO border, 16px padding */}
                      <div className="h-full rounded-2xl bg-violet-50/40 dark:bg-violet-950/20 p-4 sm:p-4.5 flex flex-col justify-between gap-2.5">
                        {/* Top: Priority Dot & Info Sheet Trigger */}
                        <div className="flex items-center justify-between gap-2 shrink-0">
                          {getPriorityDot(item.priority)}

                          <button
                            type="button"
                            onClick={() => setSheetItem(item)}
                            aria-label="View rationale details in sheet"
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-[#7C3AED] dark:text-[#A78BFA] hover:underline cursor-pointer"
                          >
                            <Info className="h-3 w-3" />
                            <span>Details</span>
                          </button>
                        </div>

                        {/* Title: Max 2 lines */}
                        <div className="space-y-1 min-w-0">
                          <h4 className="font-sans font-semibold text-xs sm:text-sm text-[#18181B] dark:text-[#EDEDED] leading-snug line-clamp-2">
                            {item.title}
                          </h4>

                          {/* Reason: Max 2 lines, ellipsis (or 1 line on tight laptop) */}
                          <p className="text-xs text-[#52525B] dark:text-[#9CA3AF] leading-relaxed line-clamp-1 sm:line-clamp-2">
                            {item.whyItMatters}
                          </p>
                        </div>

                        {/* Impact Chip */}
                        <div className="shrink-0 flex items-center">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100/70 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400">
                            <TrendingUp className="h-3 w-3 shrink-0" />
                            <span className="truncate">{item.impactMetric}</span>
                          </span>
                        </div>

                        {/* Bottom Pinned: Dismiss and Approve Buttons */}
                        <div className="pt-1 flex items-center justify-end gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => handleDismissClick(e, item.id)}
                            disabled={isActing}
                            className="text-xs font-medium text-[#71717A] hover:text-[#111] dark:hover:text-white px-3 py-1 rounded-lg hover:bg-white/60 dark:hover:bg-zinc-800 transition-colors"
                          >
                            Dismiss
                          </button>

                          <Button
                            size="sm"
                            variant="primary"
                            onClick={(e) => handleApproveClick(e, item)}
                            isLoading={isActing}
                            className="text-xs h-7.5 px-3.5 font-semibold shadow-xs"
                            leftIcon={<Check className="h-3.5 w-3.5" />}
                          >
                            Approve
                          </Button>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          )}
        </div>

        {/* Dot Pagination */}
        {count > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-2 shrink-0">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-200',
                  current === i + 1
                    ? 'w-4 bg-[#7C3AED]'
                    : 'w-1.5 bg-[#E4E4E7] dark:bg-[#333] hover:bg-[#A1A1AA]'
                )}
              />
            ))}
          </div>
        )}
      </Card>

      {/* Slide-over Sheet for Details */}
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
                  Autonomous marketing optimization proposed by DIYA
                </SheetDescription>
              </SheetHeader>

              {/* Why It Matters */}
              <div className="p-4 rounded-xl bg-[#FAFAFC] dark:bg-[#151518] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] dark:text-[#888] block">
                  Why it matters
                </span>
                <p className="text-xs text-[#3F3F46] dark:text-[#D4D4D8] leading-relaxed">
                  {sheetItem.whyItMatters}
                </p>
              </div>

              {/* What Will Happen */}
              <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-[#7C3AED]/10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] dark:text-[#A78BFA] block">
                  What will happen
                </span>
                <p className="text-xs text-[#3F3F46] dark:text-[#D4D4D8] leading-relaxed">
                  {sheetItem.whatWillHappen || sheetItem.recommendedAction}
                </p>
              </div>

              {/* Impact */}
              <div className="p-3.5 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
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
              <div className="p-3.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-purple-900 dark:text-purple-200 font-bold">
                  <Sparkles className="h-4 w-4 text-[#7C3AED]" />
                  <span>{confirmItem.title}</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300">
                  {confirmItem.whatWillHappen || confirmItem.recommendedAction}
                </p>
                <div className="pt-1 flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
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
