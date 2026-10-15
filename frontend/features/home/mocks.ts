import type {
  HomeMetricsData,
  HomeActivityItem,
  HomeIntelligenceItem,
  HomeCampaignItem,
  PerformanceTimeSeriesPoint,
} from './types';

export const mockHomeMetrics: HomeMetricsData = {
  isConnected: true,
  connectedPlatforms: ['meta', 'google', 'instagram'],
  currency: 'INR',
  metrics: {
    totalAdSpend: {
      value: 148500,
      previousValue: 132000,
      changePercentage: 12.5,
    },
    leadsGenerated: {
      value: 842,
      previousValue: 710,
      changePercentage: 18.6,
    },
    costPerLead: {
      value: 176,
      previousValue: 186,
      changePercentage: -5.4,
    },
    conversionRate: {
      value: 4.8,
      previousValue: 4.1,
      changePercentage: 17.1,
    },
  },
};

export const mockDisconnectedMetrics: HomeMetricsData = {
  isConnected: false,
  connectedPlatforms: [],
  currency: 'INR',
  metrics: {
    totalAdSpend: { value: 0, previousValue: 0, changePercentage: 0 },
    leadsGenerated: { value: 0, previousValue: 0, changePercentage: 0 },
    costPerLead: { value: 0, previousValue: 0, changePercentage: 0 },
    conversionRate: { value: 0, previousValue: 0, changePercentage: 0 },
  },
};

export const mockHomeActivities: HomeActivityItem[] = [
  {
    id: 'act-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18m ago
    title: 'Reviewing campaign performance',
    description: 'Meta Ads CPA dipped by 14% after DIYA autonomously refined the interest targeting cluster.',
    category: 'optimization',
    status: 'completed',
    impact: 'Saved ₹3,400 in wasted ad spend',
  },
  {
    id: 'act-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 54).toISOString(), // 54m ago
    title: 'Generating ad creatives',
    description: 'Synthesized 4 high-converting video hook angles and carousel ad copy for Q4 festive promotions.',
    category: 'creative',
    status: 'completed',
    impact: 'Ready for preview in Content tab',
  },
  {
    id: 'act-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 135).toISOString(), // ~2h ago
    title: 'Preparing a campaign for approval',
    description: 'Generated "High-Intent Retargeting" ad set with ₹2,500 daily budget cap awaiting your sign-off.',
    category: 'campaign',
    status: 'requires_action',
    impact: 'Predicted +22% conversion lift',
  },
  {
    id: 'act-4',
    timestamp: new Date(Date.now() - 1000 * 60 * 320).toISOString(), // ~5h ago
    title: 'Automated Google Search bid adjustment',
    description: 'Adjusted target CPA bids across 16 commercial keywords to capture peak evening search volume.',
    category: 'optimization',
    status: 'completed',
  },
  {
    id: 'act-5',
    timestamp: new Date(Date.now() - 1000 * 60 * 600).toISOString(), // ~10h ago
    title: 'Inbound lead enrichment & routing',
    description: 'Captured and verified 28 phone numbers from Meta Instant Forms; synced with CRM pipeline.',
    category: 'lead',
    status: 'completed',
  },
];

export const mockHomeIntelligence: HomeIntelligenceItem[] = [
  {
    id: 'intel-1',
    priority: 'high',
    title: "Scale winning Meta Creative 'Founder Story Hook'",
    whyItMatters:
      'CTR is at 3.84% (2.6x above account benchmark) with an acquisition cost of ₹142 per lead.',
    whatWillHappen:
      'Increase daily budget from ₹3,500 to ₹5,000 (+₹1,500/day) and launch a 2% lookalike audience variation.',
    impactMetric: '+28% leads at same CPA',
    recommendedAction:
      'Increase daily budget by ₹1,500 and create 2% lookalike audience variation.',
    actionType: 'scale_winner',
    budgetChange: { from: 3500, to: 5000 },
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'intel-2',
    priority: 'medium',
    title: "Pause fatigue ad set 'Broad Interest - Metro Hubs'",
    whyItMatters:
      'Ad frequency reached 4.3 over the last 7 days; cost per click increased by 26% as audience saturation set in.',
    whatWillHappen:
      'Pause underperforming ad set immediately and substitute with fresh lifestyle UGC creatives.',
    impactMetric: 'Prevent ₹8,000 ad fatigue loss',
    recommendedAction:
      'Pause underperforming ad set and substitute with fresh lifestyle UGC creatives.',
    actionType: 'pause_underperforming',
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'intel-3',
    priority: 'medium',
    title: 'Reallocate Google Search budget to High-ROAS Retargeting',
    whyItMatters:
      'Campaign "Brand Search Tier 2" yields 1.4 ROAS, while Meta Warm Retargeting delivers 4.2 ROAS.',
    whatWillHappen:
      'Shift ₹10,000 monthly allocation from under-indexing Google ads to Meta Warm Retargeting.',
    impactMetric: '+₹24,000 projected monthly revenue',
    recommendedAction:
      'Shift ₹10,000 monthly allocation from under-indexing Google ads to Meta Retargeting.',
    actionType: 'approve_budget',
    budgetChange: { from: 10000, to: 20000 },
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
];

export const mockHomeCampaigns: HomeCampaignItem[] = [
  {
    id: 'camp-1',
    name: 'Diwali Festive Hyper-Growth 2026',
    platform: 'meta',
    objective: 'Lead Generation',
    status: 'live',
    spend: 42500,
    leads: 268,
    costPerLead: 158,
    roas: 3.8,
    budgetDaily: 3500,
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'camp-2',
    name: 'Google High-Intent Search & Inbound',
    platform: 'google',
    objective: 'Sales',
    status: 'live',
    spend: 68400,
    leads: 394,
    costPerLead: 173,
    roas: 4.2,
    budgetDaily: 5000,
    updatedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
  },
  {
    id: 'camp-3',
    name: 'Instagram Viral Reels Hook Experiment',
    platform: 'instagram',
    objective: 'Conversions',
    status: 'recommendation',
    spend: 0,
    leads: 0,
    costPerLead: 0,
    roas: 0,
    budgetDaily: 2000,
    updatedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: 'camp-4',
    name: 'B2B Founder & Agency Retargeting Q4',
    platform: 'linkedin',
    objective: 'Lead Generation',
    status: 'approved',
    spend: 37600,
    leads: 180,
    costPerLead: 208,
    roas: 2.9,
    budgetDaily: 4000,
    updatedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
];

export const mockHomePerformance: PerformanceTimeSeriesPoint[] = [
  { date: '01 Oct', spend: 3800, leads: 22, conversions: 18 },
  { date: '03 Oct', spend: 4200, leads: 26, conversions: 21 },
  { date: '05 Oct', spend: 4500, leads: 28, conversions: 24 },
  { date: '07 Oct', spend: 5100, leads: 34, conversions: 29 },
  { date: '09 Oct', spend: 4900, leads: 31, conversions: 27 },
  { date: '11 Oct', spend: 5600, leads: 39, conversions: 33 },
  { date: '13 Oct', spend: 6200, leads: 44, conversions: 38 },
  { date: '15 Oct', spend: 6800, leads: 52, conversions: 46 },
];
