'use client';

import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analytics.service';
import type { AnalyticsOverviewData } from '../types';

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsOverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsService
      .getOverview()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
