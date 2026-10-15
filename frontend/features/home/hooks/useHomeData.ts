'use client';

import { useState, useEffect, useCallback } from 'react';
import { homeService } from '../services/home.service';
import type {
  HomeMetricsData,
  HomeActivityItem,
  HomeIntelligenceItem,
  HomeCampaignItem,
  PerformanceTimeSeriesPoint,
} from '../types';

export function useHomeData() {
  const [selectedRange, setSelectedRange] = useState<string>('30d');
  const [metrics, setMetrics] = useState<HomeMetricsData | null>(null);
  const [activities, setActivities] = useState<HomeActivityItem[]>([]);
  const [intelligence, setIntelligence] = useState<HomeIntelligenceItem[]>([]);
  const [campaigns, setCampaigns] = useState<HomeCampaignItem[]>([]);
  const [performance, setPerformance] = useState<PerformanceTimeSeriesPoint[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (range: string) => {
    setLoading(true);
    setError(null);
    try {
      const [m, a, i, c, p] = await Promise.all([
        homeService.getMetrics(range),
        homeService.getActivities(10),
        homeService.getIntelligence(),
        homeService.getCampaigns(),
        homeService.getPerformance(range),
      ]);

      setMetrics(m);
      setActivities(a);
      setIntelligence(i);
      setCampaigns(c);
      setPerformance(p);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load marketing dashboard metrics';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(selectedRange);
  }, [fetchData, selectedRange]);

  const approveIntelligenceItem = async (id: string): Promise<string> => {
    const result = await homeService.handleIntelligenceAction(id, { action: 'approve' });
    setIntelligence((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'approved' } : item))
    );
    return result.message;
  };

  const dismissIntelligenceItem = async (id: string): Promise<string> => {
    const result = await homeService.handleIntelligenceAction(id, { action: 'dismiss' });
    setIntelligence((prev) => prev.filter((item) => item.id !== id));
    return result.message;
  };

  return {
    metrics,
    activities,
    intelligence,
    campaigns,
    performance,
    selectedRange,
    setSelectedRange,
    loading,
    error,
    refetch: () => fetchData(selectedRange),
    approveIntelligenceItem,
    dismissIntelligenceItem,
  };
}
