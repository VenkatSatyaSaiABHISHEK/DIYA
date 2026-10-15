import { create } from 'zustand';
import type {
  ContentFilterState,
  ContentPost,
  GeneratorBrief,
} from '../types';
import { DEFAULT_BRIEF, DEFAULT_FILTER_STATE, type ContentSubTab } from '../constants';

interface ContentStoreState {
  activeTab: ContentSubTab;
  setActiveTab: (tab: ContentSubTab) => void;

  filters: ContentFilterState;
  setFilter: <K extends keyof ContentFilterState>(key: K, value: ContentFilterState[K]) => void;
  resetFilters: () => void;

  selectedPostId: string | null;
  isDrawerOpen: boolean;
  openDrawer: (postId: string) => void;
  closeDrawer: () => void;

  // Generator State
  generatorBrief: GeneratorBrief;
  updateBrief: (partial: Partial<GeneratorBrief>) => void;
  isGenerating: boolean;
  generationStep: number;
  generationStepLabel: string;
  generatedResult: ContentPost | null;
  activePreviewSlideIndex: number;
  setIsGenerating: (loading: boolean) => void;
  setGenerationStep: (step: number, label: string) => void;
  setGeneratedResult: (result: ContentPost | null) => void;
  setActivePreviewSlideIndex: (index: number) => void;

  // Demo Reschedule Modal
  rescheduleModalPost: ContentPost | null;
  openRescheduleModal: (post: ContentPost) => void;
  closeRescheduleModal: () => void;
}

export const useContentStore = create<ContentStoreState>((set) => ({
  activeTab: 'posts',
  setActiveTab: (activeTab) => set({ activeTab }),

  filters: { ...DEFAULT_FILTER_STATE },
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () => set({ filters: { ...DEFAULT_FILTER_STATE } }),

  selectedPostId: null,
  isDrawerOpen: false,
  openDrawer: (selectedPostId) => set({ selectedPostId, isDrawerOpen: true }),
  closeDrawer: () => set({ selectedPostId: null, isDrawerOpen: false }),

  generatorBrief: { ...DEFAULT_BRIEF },
  updateBrief: (partial) =>
    set((state) => ({
      generatorBrief: { ...state.generatorBrief, ...partial },
    })),
  isGenerating: false,
  generationStep: 0,
  generationStepLabel: '',
  generatedResult: null,
  activePreviewSlideIndex: 0,
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setGenerationStep: (generationStep, generationStepLabel) =>
    set({ generationStep, generationStepLabel }),
  setGeneratedResult: (generatedResult) =>
    set({ generatedResult, activePreviewSlideIndex: 0 }),
  setActivePreviewSlideIndex: (activePreviewSlideIndex) =>
    set({ activePreviewSlideIndex }),

  rescheduleModalPost: null,
  openRescheduleModal: (rescheduleModalPost) => set({ rescheduleModalPost }),
  closeRescheduleModal: () => set({ rescheduleModalPost: null }),
}));
