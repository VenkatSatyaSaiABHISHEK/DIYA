import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLeadsStore } from '../store/leads.store';
import { leadsService } from '../services/leads.service';
import type { LeadRecord } from '../types';

export function useLeadsDirectory() {
  const {
    leads,
    setLeads,
    filters,
    setFilter,
    resetFilters,
    selectedLeadId,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    selectedLeadIds,
    toggleSelectLead,
    selectAllLeads,
    clearSelection,
    isExportModalOpen,
    setIsExportModalOpen,
  } = useLeadsStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await leadsService.listLeads();
      setLeads(data);
    } catch {
      setError('Failed to fetch leads records.');
    } finally {
      setIsLoading(false);
    }
  }, [setLeads]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    if (filters.devState === 'empty') return [];

    let list = [...leads];

    // Search query
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (l) =>
          l.fullName.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q) ||
          (l.company && l.company.toLowerCase().includes(q)) ||
          l.preferredProject.toLowerCase().includes(q)
      );
    }

    // Stage filter
    if (filters.stage !== 'all') {
      list = list.filter((l) => l.stage === filters.stage);
    }

    // Source filter
    if (filters.source !== 'all') {
      list = list.filter((l) => l.source === filters.source);
    }

    // Tier filter
    if (filters.tier !== 'all') {
      list = list.filter((l) => l.qualificationTier === filters.tier);
    }

    // Sort
    list.sort((a, b) => {
      if (filters.sortBy === 'score') return b.qualificationScore - a.qualificationScore;
      if (filters.sortBy === 'budget') return b.estimatedDealValueINR - a.estimatedDealValueINR;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return list;
  }, [leads, filters]);

  // Summary counts
  const summary = useMemo(() => {
    return {
      total: leads.length,
      hot: leads.filter((l) => l.qualificationTier === 'hot').length,
      siteVisit: leads.filter((l) => l.stage === 'site_visit').length,
      negotiation: leads.filter((l) => l.stage === 'negotiation').length,
      converted: leads.filter((l) => l.stage === 'converted').length,
    };
  }, [leads]);

  const activeDrawerLead = useMemo(() => {
    return leads.find((l) => l.id === selectedLeadId) || null;
  }, [leads, selectedLeadId]);

  const handleResetDemo = () => {
    leadsService.resetDemoData();
    fetchLeads();
  };

  return {
    leads: filteredLeads,
    rawLeads: leads,
    summary,
    isLoading: filters.devState === 'loading' ? true : isLoading,
    error: filters.devState === 'error' ? 'Dev State: Simulated Network Error' : error,
    filters,
    setFilter,
    resetFilters,
    selectedLeadId,
    activeDrawerLead,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    selectedLeadIds,
    toggleSelectLead,
    selectAllLeads,
    clearSelection,
    isExportModalOpen,
    setIsExportModalOpen,
    handleResetDemo,
    refreshLeads: fetchLeads,
  };
}
