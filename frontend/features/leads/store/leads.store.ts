import { create } from 'zustand';
import type { LeadFilterState, LeadRecord, LeadsSubTab, LeadStage } from '../types';
import { DEFAULT_LEAD_FILTERS } from '../constants';
import { mockLeadRecords } from '../mocks';

interface LeadsStoreState {
  activeTab: LeadsSubTab;
  setActiveTab: (tab: LeadsSubTab) => void;

  filters: LeadFilterState;
  setFilter: <K extends keyof LeadFilterState>(key: K, value: LeadFilterState[K]) => void;
  resetFilters: () => void;

  selectedLeadId: string | null;
  isDrawerOpen: boolean;
  openDrawer: (id: string) => void;
  closeDrawer: () => void;

  // In-memory lead collection
  leads: LeadRecord[];
  setLeads: (leads: LeadRecord[]) => void;
  updateLeadStage: (id: string, newStage: LeadStage) => void;

  // Batch Selection
  selectedLeadIds: string[];
  toggleSelectLead: (id: string) => void;
  selectAllLeads: (ids: string[]) => void;
  clearSelection: () => void;

  // Export Modal
  isExportModalOpen: boolean;
  setIsExportModalOpen: (open: boolean) => void;
}

export const useLeadsStore = create<LeadsStoreState>((set) => ({
  activeTab: 'pipeline',
  setActiveTab: (activeTab) => set({ activeTab }),

  filters: { ...DEFAULT_LEAD_FILTERS },
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () => set({ filters: { ...DEFAULT_LEAD_FILTERS } }),

  selectedLeadId: null,
  isDrawerOpen: false,
  openDrawer: (selectedLeadId) => set({ selectedLeadId, isDrawerOpen: true }),
  closeDrawer: () => set({ selectedLeadId: null, isDrawerOpen: false }),

  leads: [...mockLeadRecords],
  setLeads: (leads) => set({ leads }),
  updateLeadStage: (id, newStage) =>
    set((state) => ({
      leads: state.leads.map((l) =>
        l.id === id ? { ...l, stage: newStage, updatedAt: new Date().toISOString() } : l
      ),
    })),

  selectedLeadIds: [],
  toggleSelectLead: (id) =>
    set((state) => {
      const exists = state.selectedLeadIds.includes(id);
      return {
        selectedLeadIds: exists
          ? state.selectedLeadIds.filter((item) => item !== id)
          : [...state.selectedLeadIds, id],
      };
    }),
  selectAllLeads: (selectedLeadIds) => set({ selectedLeadIds }),
  clearSelection: () => set({ selectedLeadIds: [] }),

  isExportModalOpen: false,
  setIsExportModalOpen: (isExportModalOpen) => set({ isExportModalOpen }),
}));
