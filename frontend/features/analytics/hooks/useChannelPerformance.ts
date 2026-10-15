import { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analytics.service';
import type { ChannelPerformanceItem, FunnelStageData } from '../types';

export function useChannelPerformance() {
  const [channels, setChannels] = useState<ChannelPerformanceItem[]>([]);
  const [funnelStages, setFunnelStages] = useState<FunnelStageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [channelList, stages] = await Promise.all([
        analyticsService.listChannelPerformance(),
        analyticsService.getFunnelStages(),
      ]);
      setChannels(channelList);
      setFunnelStages(stages);
    } catch {
      setError('Failed to fetch channel performance metrics.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    channels,
    funnelStages,
    isLoading,
    error,
    refreshData: fetchData,
  };
}
