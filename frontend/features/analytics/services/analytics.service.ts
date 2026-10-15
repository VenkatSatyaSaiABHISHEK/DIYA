import {
  mockAnalyticsOverview,
  mockConversionPaths,
  mockChannelPerformance,
  mockFunnelStages,
} from '../mocks';
import type {
  AnalyticsOverviewData,
  ChannelPerformanceItem,
  ConversionPath,
  FunnelStageData,
} from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const analyticsService = {
  /**
   * Retrieves high-level marketing revenue attribution and blended ROAS.
   */
  async getOverview(): Promise<AnalyticsOverviewData> {
    // Replace mock with real API call: GET /api/v1/analytics/overview
    await delay(500);
    return { ...mockAnalyticsOverview };
  },

  /**
   * Retrieves multi-touch conversion path journeys and touchpoint attribution splits.
   */
  async listConversionPaths(): Promise<ConversionPath[]> {
    // Replace mock with real API call: GET /api/v1/analytics/attribution/paths
    await delay(450);
    return [...mockConversionPaths];
  },

  /**
   * Retrieves comparative performance across ad networks (Meta vs Google).
   */
  async listChannelPerformance(): Promise<ChannelPerformanceItem[]> {
    // Replace mock with real API call: GET /api/v1/analytics/channels
    await delay(500);
    return [...mockChannelPerformance];
  },

  /**
   * Retrieves full-funnel drop-off stages and diagnostic bottleneck recommendations.
   */
  async getFunnelStages(): Promise<FunnelStageData[]> {
    // Replace mock with real API call: GET /api/v1/analytics/funnel
    await delay(400);
    return [...mockFunnelStages];
  },
};
