import { create } from 'zustand';
import type { AnalyticsFilterState, AnalyticsSubTab } from '../types';
import { DEFAULT_ANALYTICS_FILTERS } from '../constants';

interface AnalyticsStoreState {
  activeTab: AnalyticsSubTab;
  setActiveTab: (tab: AnalyticsSubTab) => void;

  filters: AnalyticsFilterState;
  setFilter: <K extends keyof AnalyticsFilterState>(key: K, value: AnalyticsFilterState[K]) => void;
  resetFilters: () => void;
}

export const useAnalyticsStore = create<AnalyticsStoreState>((set) => ({
  activeTab: 'overview',
  setActiveTab: (activeTab) => set({ activeTab }),

  filters: { ...DEFAULT_ANALYTICS_FILTERS },
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () => set({ filters: { ...DEFAULT_ANALYTICS_FILTERS } }),
}));
