'use client';

import { create } from 'zustand';
import type {
  Campaign,
  CampaignStatus,
  Objective,
  Platform,
  LaunchDraft,
  StudioBrief,
  GeneratedCopy,
  CreativeVariation,
} from '../types';
import { CAMPAIGNS_CONSTANTS } from '../constants';
import { mockGeneratedCopy } from '../mocks';

export interface CampaignsState {
  // Navigation
  activeTab: 'all' | 'launch' | 'studio';
  setActiveTab: (tab: 'all' | 'launch' | 'studio') => void;

  // Toolbar & Filters
  search: string;
  setSearch: (search: string) => void;
  platformFilter: 'all' | Platform;
  setPlatformFilter: (platform: 'all' | Platform) => void;
  statusFilter: 'all' | CampaignStatus;
  setStatusFilter: (status: 'all' | CampaignStatus) => void;
  objectiveFilter: 'all' | Objective;
  setObjectiveFilter: (objective: 'all' | Objective) => void;
  sortBy: 'recent' | 'spend_high' | 'leads_high' | 'cpl_low';
  setSortBy: (sort: 'recent' | 'spend_high' | 'leads_high' | 'cpl_low') => void;
  viewMode: 'card' | 'table';
  setViewMode: (mode: 'card' | 'table') => void;

  // Dev state toggle (Default / Loading / Empty / Error)
  devState: 'default' | 'loading' | 'empty' | 'error';
  setDevState: (state: 'default' | 'loading' | 'empty' | 'error') => void;

  // Compare Mode
  compareIds: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;

  // Detail Drawer
  selectedCampaignId: string | null;
  isDetailDrawerOpen: boolean;
  openDetailDrawer: (id: string) => void;
  closeDetailDrawer: () => void;

  // Underperforming Dismissed
  dismissedRecommendationIds: string[];
  dismissRecommendation: (id: string) => void;

  // Launch Flow Draft
  launchDraft: LaunchDraft;
  updateLaunchDraft: (partial: Partial<LaunchDraft>) => void;
  setLaunchStep: (step: number) => void;
  resetLaunchDraft: () => void;

  // Ad Studio
  studioBrief: StudioBrief;
  updateStudioBrief: (partial: Partial<StudioBrief>) => void;
  generatedCopy: GeneratedCopy;
  selectedPlacement: 'ig_feed' | 'ig_story' | 'ig_reel' | 'fb_feed' | 'google_display';
  setSelectedPlacement: (
    placement: 'ig_feed' | 'ig_story' | 'ig_reel' | 'fb_feed' | 'google_display'
  ) => void;
  activeHeadline: string;
  setActiveHeadline: (headline: string) => void;
  activePrimaryText: string;
  setActivePrimaryText: (text: string) => void;
  activeCta: string;
  setActiveCta: (cta: string) => void;
  approvedVariationIds: string[];
  toggleApproveVariation: (id: string) => void;
  isGeneratingCreative: boolean;
  generationProgressText: string;
  setIsGeneratingCreative: (isGenerating: boolean, text?: string) => void;
  isExportModalOpen: boolean;
  setIsExportModalOpen: (open: boolean) => void;

  // Budget Increase Modal state
  budgetModalCampaign: Campaign | null;
  openBudgetModal: (campaign: Campaign) => void;
  closeBudgetModal: () => void;
}

export const useCampaignsStore = create<CampaignsState>((set) => ({
  // Navigation
  activeTab: 'all',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Toolbar & Filters
  search: '',
  setSearch: (search) => set({ search }),
  platformFilter: 'all',
  setPlatformFilter: (platformFilter) => set({ platformFilter }),
  statusFilter: 'all',
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  objectiveFilter: 'all',
  setObjectiveFilter: (objectiveFilter) => set({ objectiveFilter }),
  sortBy: 'recent',
  setSortBy: (sortBy) => set({ sortBy }),
  viewMode: 'card',
  setViewMode: (viewMode) => set({ viewMode }),

  // Dev state toggle
  devState: 'default',
  setDevState: (devState) => set({ devState }),

  // Compare Mode
  compareIds: [],
  toggleCompare: (id) =>
    set((state) => {
      if (state.compareIds.includes(id)) {
        return { compareIds: state.compareIds.filter((item) => item !== id) };
      }
      if (state.compareIds.length >= 3) {
        return state; // maximum 3 campaigns for comparison
      }
      return { compareIds: [...state.compareIds, id] };
    }),
  clearCompare: () => set({ compareIds: [] }),

  // Detail Drawer
  selectedCampaignId: null,
  isDetailDrawerOpen: false,
  openDetailDrawer: (id) => set({ selectedCampaignId: id, isDetailDrawerOpen: true }),
  closeDetailDrawer: () => set({ isDetailDrawerOpen: false }),

  // Underperforming Dismissed
  dismissedRecommendationIds: [],
  dismissRecommendation: (id) =>
    set((state) => ({
      dismissedRecommendationIds: [...state.dismissedRecommendationIds, id],
    })),

  // Launch Flow Draft
  launchDraft: CAMPAIGNS_CONSTANTS.defaultLaunchDraft,
  updateLaunchDraft: (partial) =>
    set((state) => ({
      launchDraft: {
        ...state.launchDraft,
        ...partial,
        lastSavedAt: new Date().toISOString(),
      },
    })),
  setLaunchStep: (step) =>
    set((state) => ({
      launchDraft: { ...state.launchDraft, currentStep: step },
    })),
  resetLaunchDraft: () =>
    set({
      launchDraft: {
        ...CAMPAIGNS_CONSTANTS.defaultLaunchDraft,
        lastSavedAt: new Date().toISOString(),
      },
    }),

  // Ad Studio
  studioBrief: CAMPAIGNS_CONSTANTS.defaultStudioBrief,
  updateStudioBrief: (partial) =>
    set((state) => ({
      studioBrief: { ...state.studioBrief, ...partial },
    })),
  generatedCopy: mockGeneratedCopy,
  selectedPlacement: 'ig_feed',
  setSelectedPlacement: (selectedPlacement) => set({ selectedPlacement }),
  activeHeadline: mockGeneratedCopy.headlines[0],
  setActiveHeadline: (activeHeadline) => set({ activeHeadline }),
  activePrimaryText: mockGeneratedCopy.primaryTexts[0],
  setActivePrimaryText: (activePrimaryText) => set({ activePrimaryText }),
  activeCta: mockGeneratedCopy.callToActions[0],
  setActiveCta: (activeCta) => set({ activeCta }),
  approvedVariationIds: ['var-1', 'var-2'],
  toggleApproveVariation: (id) =>
    set((state) => {
      const exists = state.approvedVariationIds.includes(id);
      return {
        approvedVariationIds: exists
          ? state.approvedVariationIds.filter((item) => item !== id)
          : [...state.approvedVariationIds, id],
      };
    }),
  isGeneratingCreative: false,
  generationProgressText: 'Understanding brief & audience parameters...',
  setIsGeneratingCreative: (isGeneratingCreative, text) =>
    set({
      isGeneratingCreative,
      generationProgressText: text || 'Synthesizing creative variations...',
    }),
  isExportModalOpen: false,
  setIsExportModalOpen: (isExportModalOpen) => set({ isExportModalOpen }),

  // Budget Increase Modal state
  budgetModalCampaign: null,
  openBudgetModal: (campaign) => set({ budgetModalCampaign: campaign }),
  closeBudgetModal: () => set({ budgetModalCampaign: null }),
}));
