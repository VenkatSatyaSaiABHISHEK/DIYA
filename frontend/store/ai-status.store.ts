'use client';

import { create } from 'zustand';
import type { AIWorkStatus } from '@/types/shared';

export interface TodaySummary {
  tasksCompleted: number;
  tasksAwaitingApproval: number;
}

export interface AIStatusState {
  status: AIWorkStatus;
  statusLabel: string;
  detailMessage: string;
  currentTask: string;
  todaySummary: TodaySummary;
  setStatus: (status: AIWorkStatus, detailMessage?: string) => void;
  setCurrentTask: (task: string) => void;
  setTodaySummary: (summary: Partial<TodaySummary>) => void;
}

const statusLabels: Record<AIWorkStatus, string> = {
  idle: 'Idle',
  analyzing: 'Analyzing',
  planning: 'Planning',
  creating: 'Creating',
  optimizing: 'Optimizing',
  running: 'Running campaigns',
  awaiting_approval: 'Awaiting Approval',
};

export const useAIStatusStore = create<AIStatusState>((set) => ({
  status: 'optimizing',
  statusLabel: statusLabels.optimizing,
  detailMessage: 'Optimizing Meta Ads audience bid caps & creative rotation',
  currentTask: 'Reviewing real estate campaign CPA in Hyderabad and drafting copy variant B',
  todaySummary: {
    tasksCompleted: 8,
    tasksAwaitingApproval: 2,
  },
  setStatus: (status: AIWorkStatus, detailMessage?: string) =>
    set({
      status,
      statusLabel: statusLabels[status],
      detailMessage: detailMessage || `DIYA is currently ${statusLabels[status].toLowerCase()}`,
    }),
  setCurrentTask: (currentTask: string) => set({ currentTask }),
  setTodaySummary: (summary) =>
    set((state) => ({
      todaySummary: { ...state.todaySummary, ...summary },
    })),
}));
