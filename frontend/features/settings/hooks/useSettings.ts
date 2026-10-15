'use client';

import { useState, useEffect } from 'react';
import { settingsService } from '../services/settings.service';
import type { IntegrationStatus, BusinessProfile } from '../types';

export function useSettings() {
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([]);
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([settingsService.getIntegrations(), settingsService.getBusinessProfile()])
      .then(([i, p]) => {
        setIntegrations(i);
        setProfile(p);
      })
      .finally(() => setLoading(false));
  }, []);

  return { integrations, profile, loading };
}
