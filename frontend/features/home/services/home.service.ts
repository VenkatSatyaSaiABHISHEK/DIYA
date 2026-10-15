import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { env } from '@/lib/env';
import {
  mockHomeMetrics,
  mockHomeActivities,
  mockHomeIntelligence,
  mockHomeCampaigns,
  mockHomePerformance,
} from '../mocks';
import type {
  HomeMetricsData,
  HomeActivityItem,
  HomeIntelligenceItem,
  HomeCampaignItem,
  PerformanceTimeSeriesPoint,
  HomeIntelligenceActionPayload,
  HomeIntelligenceActionResult,
} from '../types';

/**
 * Service handling all Home marketing dashboard data interactions.
 * Integrates directly with API_ENDPOINTS when live or mock data when NEXT_PUBLIC_USE_MOCKS=true.
 */
export const homeService = {
  async getMetrics(range = '30d'): Promise<HomeMetricsData> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return mockHomeMetrics;
    }
    return apiClient.get<HomeMetricsData>(API_ENDPOINTS.home.metrics, {
      params: { range },
    });
  },

  async getActivities(limit = 10): Promise<HomeActivityItem[]> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      return mockHomeActivities;
    }
    return apiClient.get<HomeActivityItem[]>(API_ENDPOINTS.home.activities, {
      params: { limit },
    });
  },

  async getIntelligence(): Promise<HomeIntelligenceItem[]> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 220));
      return mockHomeIntelligence;
    }
    return apiClient.get<HomeIntelligenceItem[]>(API_ENDPOINTS.home.intelligence);
  },

  async handleIntelligenceAction(
    id: string,
    payload: HomeIntelligenceActionPayload
  ): Promise<HomeIntelligenceActionResult> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        id,
        status: payload.action === 'approve' ? 'approved' : 'dismissed',
        appliedAt: new Date().toISOString(),
        message:
          payload.action === 'approve'
            ? 'Action approved and queued for autonomous execution by DIYA.'
            : 'Recommendation dismissed.',
      };
    }
    return apiClient.post<HomeIntelligenceActionResult>(
      API_ENDPOINTS.home.intelligenceAction(id),
      payload
    );
  },

  async getCampaigns(): Promise<HomeCampaignItem[]> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 240));
      return mockHomeCampaigns;
    }
    return apiClient.get<HomeCampaignItem[]>(API_ENDPOINTS.home.campaigns);
  },

  async getPerformance(range = '30d'): Promise<PerformanceTimeSeriesPoint[]> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 260));
      return mockHomePerformance;
    }
    return apiClient.get<PerformanceTimeSeriesPoint[]>(API_ENDPOINTS.home.performance, {
      params: { range },
    });
  },
};
