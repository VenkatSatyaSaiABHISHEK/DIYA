import { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analytics.service';
import { useAnalyticsStore } from '../store/analytics.store';
import type { AttributionModelType, ConversionPath } from '../types';

export function useAttributionModel() {
  const [paths, setPaths] = useState<ConversionPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { filters, setFilter } = useAnalyticsStore();

  const fetchPaths = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyticsService.listConversionPaths();
      setPaths(data);
    } catch {
      setError('Failed to fetch attribution paths.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaths();
  }, [fetchPaths]);

  return {
    paths,
    isLoading,
    error,
    activeModel: filters.attributionModel,
    setActiveModel: (model: AttributionModelType) => setFilter('attributionModel', model),
    refreshPaths: fetchPaths,
  };
}
