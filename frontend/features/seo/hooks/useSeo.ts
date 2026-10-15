'use client';

import { useState, useEffect } from 'react';
import { seoService } from '../services/seo.service';
import type { SeoOverviewData } from '../types';

export function useSeo() {
  const [overview, setOverview] = useState<SeoOverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    seoService
      .getOverview()
      .then(setOverview)
      .finally(() => setLoading(false));
  }, []);

  return { overview, loading };
}
