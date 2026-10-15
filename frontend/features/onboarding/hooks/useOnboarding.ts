'use client';

import { useState, useEffect } from 'react';
import { onboardingService } from '../services/onboarding.service';
import type { OnboardingStatus } from '../types';

export function useOnboarding() {
  const [status, setStatus] = useState<OnboardingStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onboardingService
      .getStatus()
      .then(setStatus)
      .finally(() => setLoading(false));
  }, []);

  return { status, loading };
}
