import { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analytics.service';
import { useAnalyticsStore } from '../store/analytics.store';
import type { AnalyticsOverviewData } from '../types';

export function useAnalyticsOverview() {
  const [data, setData] = useState<AnalyticsOverviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { filters, setFilter, resetFilters } = useAnalyticsStore();

  const fetchOverview = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyticsService.getOverview();
      setData(result);
    } catch {
      setError('Failed to fetch analytics metrics.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  return {
    data: filters.devState === 'empty' ? null : data,
    isLoading: filters.devState === 'loading' ? true : isLoading,
    error: filters.devState === 'error' ? 'Dev State: Simulated Network Error' : error,
    filters,
    setFilter,
    resetFilters,
    refreshOverview: fetchOverview,
  };
}
