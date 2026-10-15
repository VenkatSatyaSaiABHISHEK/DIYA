'use client';

import { useState, useEffect } from 'react';
import { diyaService } from '../services/diya.service';
import type { DiyaStatusResponse } from '../types';

export function useDiya() {
  const [status, setStatus] = useState<DiyaStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    diyaService
      .getStatus()
      .then(setStatus)
      .finally(() => setLoading(false));
  }, []);

  return { status, loading };
}
