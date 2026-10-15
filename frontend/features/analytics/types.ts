export type AnalyticsSubTab = 'overview' | 'attribution' | 'channels' | 'funnel';

export type AttributionModelType = 'first_touch' | 'last_touch' | 'linear' | 'data_driven';

export interface RevenueTrendPoint {
  date: string;
  adSpendINR: number;
  pipelineRevenueINR: number;
  leadsCount: number;
}

export interface AnalyticsOverviewData {
  totalPipelineRevenueINR: number;
  revenueChangeMoM: number;
  blendedRoas: number;
  roasBenchmark: number;
  customerAcquisitionCostINR: number;
  cacChange: number;
  totalLeadsGenerated: number;
  averageCostPerLeadINR: number;
  trends: RevenueTrendPoint[];
}

export interface ConversionPath {
  id: string;
  pathName: string;
  steps: { channel: string; icon: string; label: string }[];
  conversionsCount: number;
  revenueAttributedINR: number;
  averageDaysToConvert: number;
  sharePercentage: number;
}

export interface ChannelPerformanceItem {
  id: string;
  channel: 'meta' | 'google' | 'linkedin' | 'organic_seo' | 'whatsapp';
  channelName: string;
  adSpendINR: number;
  leadsCount: number;
  costPerLeadINR: number;
  siteVisitsBooked: number;
  attributedRevenueINR: number;
  roas: number;
  sharePercentage: number;
}

export interface FunnelStageData {
  stageNumber: number;
  stageName: string;
  volume: number;
  conversionRateFromPrevious: number; // percentage
  overallDropOffRate: number; // percentage
  benchmarkRate: number;
  isBottleneck: boolean;
  bottleneckFixSuggestion?: string;
}

export interface AnalyticsFilterState {
  timeRange: '7d' | '30d' | '90d' | 'ytd';
  attributionModel: AttributionModelType;
  devState: 'default' | 'loading' | 'empty' | 'error';
}
