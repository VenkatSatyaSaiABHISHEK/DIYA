import type { AdPlatform, CampaignStatus } from '@/types/shared';

export interface MetricItem {
  value: number;
  previousValue: number;
  changePercentage: number;
}

export interface HomeMetricsData {
  isConnected: boolean;
  connectedPlatforms: AdPlatform[];
  currency: 'INR' | 'USD';
  metrics: {
    totalAdSpend: MetricItem;
    leadsGenerated: MetricItem;
    costPerLead: MetricItem;
    conversionRate: MetricItem;
  };
}

export interface HomeActivityItem {
  id: string;
  timestamp: string; // ISO 8601
  title: string;
  description: string;
  category: 'campaign' | 'creative' | 'optimization' | 'seo' | 'lead';
  status: 'completed' | 'in_progress' | 'scheduled' | 'requires_action';
  impact?: string;
}

export interface HomeIntelligenceItem {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  whyItMatters: string;
  whatWillHappen?: string;
  impactMetric: string;
  recommendedAction: string;
  actionType: 'approve_budget' | 'launch_variant' | 'pause_underperforming' | 'scale_winner';
  budgetChange?: { from: number; to: number };
  status: 'pending' | 'approved' | 'dismissed';
  createdAt: string;
}

export interface HomeCampaignItem {
  id: string;
  name: string;
  platform: AdPlatform;
  objective: 'Lead Generation' | 'Conversions' | 'Brand Awareness' | 'Sales';
  status: CampaignStatus;
  spend: number;
  leads: number;
  costPerLead: number;
  roas: number;
  budgetDaily: number;
  updatedAt: string;
}

export interface PerformanceTimeSeriesPoint {
  date: string;
  spend: number;
  leads: number;
  conversions: number;
}

export interface HomeIntelligenceActionPayload {
  action: 'approve' | 'dismiss';
  notes?: string;
}

export interface HomeIntelligenceActionResult {
  id: string;
  status: 'approved' | 'dismissed';
  appliedAt: string;
  message: string;
}
