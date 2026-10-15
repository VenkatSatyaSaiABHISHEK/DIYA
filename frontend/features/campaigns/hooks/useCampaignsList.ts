'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { campaignsService } from '../services/campaigns.service';
import { useCampaignsStore } from '../store/campaigns.store';
import { useUIStore } from '@/store/ui.store';
import type { Campaign, CampaignStatus } from '../types';

export function useCampaignsList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    search,
    platformFilter,
    statusFilter,
    objectiveFilter,
    sortBy,
    viewMode,
    devState,
    compareIds,
    toggleCompare,
    clearCompare,
    selectedCampaignId,
    isDetailDrawerOpen,
    openDetailDrawer,
    closeDetailDrawer,
    dismissedRecommendationIds,
    dismissRecommendation,
    budgetModalCampaign,
    openBudgetModal,
    closeBudgetModal,
  } = useCampaignsStore();

  const { addToast } = useUIStore();

  const fetchCampaigns = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await campaignsService.listCampaigns();
      setCampaigns(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load campaigns';
      setError(msg);
      addToast(msg, 'danger');
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  // Handle Dev state overrides
  const effectiveLoading = devState === 'loading' ? true : isLoading;
  const effectiveError = devState === 'error' ? 'Simulated error: Failed to fetch ad network data' : error;

  // Filtered & Sorted campaigns
  const filteredCampaigns = useMemo(() => {
    if (devState === 'empty') return [];

    return campaigns
      .filter((camp) => {
        // Search
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = camp.name.toLowerCase().includes(q);
          const matchAudience = camp.targetAudience.toLowerCase().includes(q);
          if (!matchName && !matchAudience) return false;
        }

        // Platform
        if (platformFilter !== 'all' && camp.platform !== platformFilter) {
          return false;
        }

        // Status
        if (statusFilter !== 'all' && camp.status !== statusFilter) {
          return false;
        }

        // Objective
        if (objectiveFilter !== 'all' && camp.objective !== objectiveFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'spend_high':
            return b.spendTotalINR - a.spendTotalINR;
          case 'leads_high':
            return b.leadsCount - a.leadsCount;
          case 'cpl_low':
            return (a.cplINR || 9999) - (b.cplINR || 9999);
          case 'recent':
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
  }, [campaigns, search, platformFilter, statusFilter, objectiveFilter, sortBy, devState]);

  // Counts summary chips
  const counts = useMemo(() => {
    return {
      total: campaigns.length,
      live: campaigns.filter((c) => c.status === 'live').length,
      draft: campaigns.filter((c) => c.status === 'draft').length,
      pendingApproval: campaigns.filter((c) => c.status === 'approved' || c.status === 'recommendation').length,
      paused: campaigns.filter((c) => c.status === 'paused').length,
    };
  }, [campaigns]);

  // Compare campaigns list
  const comparedCampaigns = useMemo(() => {
    return campaigns.filter((c) => compareIds.includes(c.id));
  }, [campaigns, compareIds]);

  // Selected campaign for detail drawer
  const selectedCampaign = useMemo(() => {
    return campaigns.find((c) => c.id === selectedCampaignId) || null;
  }, [campaigns, selectedCampaignId]);

  // Campaign Actions
  const handlePauseCampaign = async (id: string) => {
    try {
      const res = await campaignsService.pauseCampaign(id);
      setCampaigns((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: res.status } : c))
      );
      addToast('Campaign flight paused. Daily spend halted.', 'info');
    } catch {
      addToast('Failed to pause campaign.', 'danger');
    }
  };

  const handleApproveCampaign = async (id: string) => {
    try {
      const res = await campaignsService.approveCampaign(id);
      setCampaigns((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: res.status } : c))
      );
      addToast('Campaign approved. Ready for ad network launch.', 'success');
    } catch {
      addToast('Failed to approve campaign.', 'danger');
    }
  };

  const handleUpdateBudget = async (id: string, newBudgetINR: number) => {
    try {
      await campaignsService.updateBudget(id, newBudgetINR);
      setCampaigns((prev) =>
        prev.map((c) => (c.id === id ? { ...c, dailyBudgetINR: newBudgetINR } : c))
      );
      addToast(`Daily budget cap updated to ₹${newBudgetINR.toLocaleString('en-IN')}`, 'success');
      closeBudgetModal();
    } catch {
      addToast('Failed to update campaign budget.', 'danger');
    }
  };

  return {
    campaigns: filteredCampaigns,
    allCampaignsRaw: campaigns,
    counts,
    isLoading: effectiveLoading,
    error: effectiveError,
    viewMode,
    refetch: fetchCampaigns,
    compareIds,
    comparedCampaigns,
    toggleCompare,
    clearCompare,
    selectedCampaign,
    isDetailDrawerOpen,
    openDetailDrawer,
    closeDetailDrawer,
    dismissedRecommendationIds,
    dismissRecommendation,
    budgetModalCampaign,
    openBudgetModal,
    closeBudgetModal,
    handlePauseCampaign,
    handleApproveCampaign,
    handleUpdateBudget,
  };
}
