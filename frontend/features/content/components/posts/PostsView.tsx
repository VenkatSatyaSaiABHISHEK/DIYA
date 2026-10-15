'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useContentPosts } from '../../hooks/useContentPosts';
import { ContentSummaryChips } from './ContentSummaryChips';
import { ContentToolbar } from './ContentToolbar';
import { ContentPostCard } from './ContentPostCard';
import { ContentPostTable } from './ContentPostTable';
import { ContentDetailDrawer } from './ContentDetailDrawer';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Sparkles, Calendar, AlertCircle, RefreshCw } from 'lucide-react';
import type { ContentPost } from '../../types';

interface PostsViewProps {
  onNavigateToGenerator: () => void;
}

export const PostsView: React.FC<PostsViewProps> = ({ onNavigateToGenerator }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    posts,
    rawPosts,
    isLoading,
    error,
    summary,
    filters,
    setFilter,
    resetFilters,
    activeDrawerPost,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    handleApprove,
    handleDelete,
    handleResetDemo,
    refreshPosts,
  } = useContentPosts();

  // Reschedule Modal
  const [rescheduleTarget, setRescheduleTarget] = useState<ContentPost | null>(null);
  const [selectedDate, setSelectedDate] = useState('2026-10-18T14:00');
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [rescheduleNotice, setRescheduleNotice] = useState<string | null>(null);

  // GSAP Entrance
  useGSAP(
    () => {
      if (isLoading || error || posts.length === 0) return;
      const cards = containerRef.current?.querySelectorAll('.content-post-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
          }
        );
      }
    },
    { dependencies: [posts, filters.viewMode, isLoading], scope: containerRef }
  );

  const handleConfirmReschedule = async () => {
    if (!rescheduleTarget) return;
    setIsRescheduling(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsRescheduling(false);
    setRescheduleNotice('Demo mode: Post date updated on simulated calendar.');
    setTimeout(() => {
      setRescheduleNotice(null);
      setRescheduleTarget(null);
      refreshPosts();
    }, 2000);
  };

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Top Filter Chips */}
      <ContentSummaryChips
        summary={summary}
        activeStatus={filters.status}
        onSelectStatus={(status) => setFilter('status', status)}
      />

      {/* Toolbar */}
      <ContentToolbar
        filters={filters}
        onFilterChange={setFilter}
        onResetFilters={resetFilters}
      />

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={refreshPosts}
            className="px-3 py-1 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#E4E4E7] p-4 space-y-3 shadow-xs"
            >
              <Skeleton className="h-6 w-1/3 rounded-full" />
              <Skeleton className="aspect-4/3 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && posts.length === 0 && (
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-12 text-center shadow-xs">
          <EmptyState
            icon={<Sparkles className="h-10 w-10 text-[#7C3AED]" />}
            title="No Content Matches Filters"
            description="No social posts or ad creatives found matching your active filter criteria."
            action={
              <div className="flex items-center justify-center gap-3 mt-4">
                <button
                  type="button"
                  onClick={onNavigateToGenerator}
                  className="px-4 py-2 bg-[#7C3AED] text-white text-xs font-semibold rounded-xl hover:bg-[#6D28D9] transition-all flex items-center gap-2 shadow-xs"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Generate New with DIYA
                </button>
                <button
                  type="button"
                  onClick={handleResetDemo}
                  className="px-4 py-2 bg-white border border-[#E4E4E7] text-[#18181B] text-xs font-semibold rounded-xl hover:bg-zinc-50 transition-all flex items-center gap-2"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Reset Demo Content
                </button>
              </div>
            }
          />
        </div>
      )}

      {/* Content Render: Grid vs Table */}
      {!isLoading && !error && posts.length > 0 && (
        <>
          {filters.viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post) => (
                <div key={post.id} className="content-post-card">
                  <ContentPostCard
                    post={post}
                    onOpenDrawer={openDrawer}
                    onOpenReschedule={(p) => {
                      setRescheduleTarget(p);
                      if (p.scheduledFor) {
                        setSelectedDate(p.scheduledFor.slice(0, 16));
                      }
                    }}
                    onApprove={handleApprove}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          ) : (
            <ContentPostTable
              posts={posts}
              onOpenDrawer={openDrawer}
              onOpenReschedule={(p) => {
                setRescheduleTarget(p);
                if (p.scheduledFor) {
                  setSelectedDate(p.scheduledFor.slice(0, 16));
                }
              }}
              onApprove={handleApprove}
              onDelete={handleDelete}
            />
          )}
        </>
      )}

      {/* Detail Drawer */}
      <ContentDetailDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        post={activeDrawerPost}
        onApprove={handleApprove}
        onOpenReschedule={(p) => {
          setRescheduleTarget(p);
          if (p.scheduledFor) {
            setSelectedDate(p.scheduledFor.slice(0, 16));
          }
        }}
      />

      {/* Demo Reschedule Modal */}
      {rescheduleTarget && (
        <Modal
          isOpen={!!rescheduleTarget}
          onClose={() => setRescheduleTarget(null)}
          title="Reschedule Content Flight"
          description={`Set optimal publishing date & time for "${rescheduleTarget.title}"`}
        >
          <div className="space-y-4">
            <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200 text-xs text-purple-900 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#7C3AED] shrink-0" />
              <span>
                DIYA AI optimal posting slot: <strong>Tomorrow, 7:30 PM IST</strong> for peak
                engagement.
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#18181B]">
                Publishing Date & Time (IST)
              </label>
              <input
                type="datetime-local"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#E4E4E7] bg-white text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
              />
            </div>

            {rescheduleNotice && (
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold text-center">
                {rescheduleNotice}
              </div>
            )}

            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-[11px] text-zinc-500">
              Demo mode: No social media tokens or live OAuth APIs are connected. Changes reflect on
              your simulated calendar only.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRescheduleTarget(null)}
                className="px-4 py-2 rounded-xl border border-[#E4E4E7] text-xs font-semibold text-[#71717A] hover:bg-zinc-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isRescheduling}
                onClick={handleConfirmReschedule}
                className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] shadow-xs disabled:opacity-50 flex items-center gap-1.5"
              >
                <Calendar className="h-3.5 w-3.5" />
                {isRescheduling ? 'Updating...' : 'Confirm Reschedule'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
