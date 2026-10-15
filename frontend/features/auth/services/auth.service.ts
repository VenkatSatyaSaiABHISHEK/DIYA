import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { env } from '@/lib/env';
import { mockAuthSession } from '../mocks';
import type { LoginCredentials, AuthSessionResponse } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthSessionResponse> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      apiClient.setAuthToken(mockAuthSession.token);
      return mockAuthSession;
    }
    const result = await apiClient.post<AuthSessionResponse>(
      API_ENDPOINTS.auth.login,
      credentials
    );
    if (result.token) {
      apiClient.setAuthToken(result.token);
    }
    return result;
  },

  async logout(): Promise<void> {
    apiClient.clearAuthToken();
    if (!env.NEXT_PUBLIC_USE_MOCKS) {
      await apiClient.post(API_ENDPOINTS.auth.logout);
    }
  },
};
