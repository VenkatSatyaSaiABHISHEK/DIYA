import { create } from 'zustand';
import type { KeywordFilterState, SeoPageMeta, SeoSubTab } from '../types';
import { DEFAULT_KEYWORD_FILTERS } from '../constants';
import { mockSeoPages } from '../mocks';

interface SeoStoreState {
  activeTab: SeoSubTab;
  setActiveTab: (tab: SeoSubTab) => void;

  keywordFilters: KeywordFilterState;
  setKeywordFilter: <K extends keyof KeywordFilterState>(key: K, value: KeywordFilterState[K]) => void;
  resetKeywordFilters: () => void;

  selectedKeywordId: string | null;
  setSelectedKeywordId: (id: string | null) => void;

  // Pages SERP Studio State
  pages: SeoPageMeta[];
  selectedPageId: string;
  setSelectedPageId: (id: string) => void;
  updatePageMeta: (id: string, partial: Partial<SeoPageMeta>) => void;

  // Audit Crawler Simulation
  isAuditing: boolean;
  auditStep: number;
  auditStepLabel: string;
  setIsAuditing: (isAuditing: boolean) => void;
  setAuditStep: (step: number, label: string) => void;
}

export const useSeoStore = create<SeoStoreState>((set) => ({
  activeTab: 'overview',
  setActiveTab: (activeTab) => set({ activeTab }),

  keywordFilters: { ...DEFAULT_KEYWORD_FILTERS },
  setKeywordFilter: (key, value) =>
    set((state) => ({
      keywordFilters: { ...state.keywordFilters, [key]: value },
    })),
  resetKeywordFilters: () => set({ keywordFilters: { ...DEFAULT_KEYWORD_FILTERS } }),

  selectedKeywordId: null,
  setSelectedKeywordId: (selectedKeywordId) => set({ selectedKeywordId }),

  pages: [...mockSeoPages],
  selectedPageId: mockSeoPages[0].id,
  setSelectedPageId: (selectedPageId) => set({ selectedPageId }),
  updatePageMeta: (id, partial) =>
    set((state) => ({
      pages: state.pages.map((p) => (p.id === id ? { ...p, ...partial } : p)),
    })),

  isAuditing: false,
  auditStep: 0,
  auditStepLabel: '',
  setIsAuditing: (isAuditing) => set({ isAuditing }),
  setAuditStep: (auditStep, auditStepLabel) => set({ auditStep, auditStepLabel }),
}));
