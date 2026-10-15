import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { env } from '@/lib/env';
import { mockIntegrations, mockBusinessProfile } from '../mocks';
import type { IntegrationStatus, BusinessProfile } from '../types';

export const settingsService = {
  async getIntegrations(): Promise<IntegrationStatus[]> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      return mockIntegrations;
    }
    return apiClient.get<IntegrationStatus[]>(API_ENDPOINTS.settings.integrations);
  },

  async getBusinessProfile(): Promise<BusinessProfile> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      return mockBusinessProfile;
    }
    return apiClient.get<BusinessProfile>(API_ENDPOINTS.settings.business);
  },
};
