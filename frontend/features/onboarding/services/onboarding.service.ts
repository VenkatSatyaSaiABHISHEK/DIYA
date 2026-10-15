import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { env } from '@/lib/env';
import { mockOnboardingStatus } from '../mocks';
import type { OnboardingStatus, SetupBusinessRequest } from '../types';

export const onboardingService = {
  async getStatus(): Promise<OnboardingStatus> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      return mockOnboardingStatus;
    }
    return apiClient.get<OnboardingStatus>(API_ENDPOINTS.onboarding.status);
  },

  async setupBusiness(data: SetupBusinessRequest): Promise<OnboardingStatus> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      return { step: 2, totalSteps: 4, completed: false, businessName: data.businessName };
    }
    return apiClient.post<OnboardingStatus>(API_ENDPOINTS.onboarding.setup, data);
  },
};
