'use client';

import React from 'react';
import { useDiyaTimeline } from '../../hooks/useDiyaTimeline';
import { TaskTimelineCard } from '../chat/TaskTimelineCard';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { Clock, Filter, AlertCircle, Sparkles } from 'lucide-react';
import type { RunStatus } from '../../types';

const statusFilterTabs = [
  { id: 'all', label: 'All Operations' },
  { id: 'running', label: 'Running' },
  { id: 'awaiting_approval', label: 'Needs Approval' },
  { id: 'completed', label: 'Completed' },
];

export const TimelineView: React.FC = () => {
  const {
    timelineRuns,
    totalCount,
    statusFilter,
    setStatusFilter,
    handleRetry,
  } = useDiyaTimeline();

  return (
    <div className="space-y-6">
      {/* Subheader */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 rounded-2xl bg-white border border-[#E4E4E7] shadow-xs">
        <div>
          <h3 className="text-lg font-bold text-[#18181B]">Task Execution Timeline</h3>
          <p className="text-xs text-[#71717A]">
            Audit history, live agent run states, log traces, and integration connections
          </p>
        </div>

        {/* Filter Tabs */}
        <Tabs
          tabs={statusFilterTabs}
          activeTab={statusFilter}
          onChange={(tab) => setStatusFilter(tab as RunStatus | 'all')}
          variant="pill"
        />
      </div>

      {/* Runs List */}
      <div className="space-y-4">
        {timelineRuns.length === 0 ? (
          <Card className="p-12 text-center bg-white border border-dashed border-[#E4E4E7]">
            <Clock className="h-8 w-8 text-[#A1A1AA] mx-auto mb-2" />
            <h5 className="text-sm font-bold text-[#18181B]">No task executions found</h5>
            <p className="text-xs text-[#71717A] mt-1">
              Trigger a task or campaign in Command Chat to see live progress traces here.
            </p>
          </Card>
        ) : (
          timelineRuns.map((run) => (
            <TaskTimelineCard
              key={run.id}
              timeline={run}
              onRetryStep={handleRetry}
            />
          ))
        )}
      </div>
    </div>
  );
};
