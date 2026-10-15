'use client';

import { useState, useMemo, useCallback } from 'react';
import { useDIYAStore } from '../store/diya.store';
import { useUIStore } from '@/store/ui.store';
import { diyaService } from '../services/diya.service';
import type { RunStatus } from '../types';

export function useDiyaTimeline() {
  const { timelineRuns, retryTimelineStep } = useDIYAStore();
  const { addToast } = useUIStore();
  const [statusFilter, setStatusFilter] = useState<RunStatus | 'all'>('all');
  const [expandedRunId, setExpandedRunId] = useState<string | null>(
    timelineRuns[0]?.id || null
  );

  const filteredRuns = useMemo(() => {
    if (statusFilter === 'all') return timelineRuns;
    return timelineRuns.filter((r) => r.status === statusFilter);
  }, [timelineRuns, statusFilter]);

  const handleRetry = useCallback(
    async (runId: string, stepId: string) => {
      retryTimelineStep(runId, stepId);
      addToast('Restarting task step...', 'info');
      await diyaService.retryStep(stepId);
    },
    [retryTimelineStep, addToast]
  );

  return {
    timelineRuns: filteredRuns,
    totalCount: timelineRuns.length,
    statusFilter,
    setStatusFilter,
    expandedRunId,
    setExpandedRunId,
    handleRetry,
  };
}
