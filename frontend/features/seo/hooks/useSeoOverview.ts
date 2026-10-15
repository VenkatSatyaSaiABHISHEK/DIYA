import { useState, useEffect, useCallback } from 'react';
import { seoService } from '../services/seo.service';
import { useSeoStore } from '../store/seo.store';
import type { SeoOverviewData, SeoRecommendation } from '../types';

export function useSeoOverview() {
  const [data, setData] = useState<SeoOverviewData | null>(null);
  const [recommendations, setRecommendations] = useState<SeoRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { keywordFilters, setKeywordFilter } = useSeoStore();

  const fetchOverview = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [overviewData, recs] = await Promise.all([
        seoService.getOverview(),
        seoService.listRecommendations(),
      ]);
      setData(overviewData);
      setRecommendations(recs);
    } catch {
      setError('Failed to fetch SEO performance data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  const handleResetDemo = () => {
    seoService.resetDemoData();
    fetchOverview();
  };

  return {
    data: keywordFilters.devState === 'empty' ? null : data,
    recommendations: keywordFilters.devState === 'empty' ? [] : recommendations,
    isLoading: keywordFilters.devState === 'loading' ? true : isLoading,
    error: keywordFilters.devState === 'error' ? 'Dev State: Simulated Network Error' : error,
    devState: keywordFilters.devState,
    setDevState: (mode: 'default' | 'loading' | 'empty' | 'error') =>
      setKeywordFilter('devState', mode),
    handleResetDemo,
    refreshOverview: fetchOverview,
  };
}
