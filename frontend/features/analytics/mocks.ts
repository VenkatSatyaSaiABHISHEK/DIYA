import type {
  AnalyticsOverviewData,
  ChannelPerformanceItem,
  ConversionPath,
  FunnelStageData,
} from './types';

export const mockAnalyticsOverview: AnalyticsOverviewData = {
  totalPipelineRevenueINR: 384000000, // ₹38.4 Cr
  revenueChangeMoM: 24.8,
  blendedRoas: 8.4,
  roasBenchmark: 4.2,
  customerAcquisitionCostINR: 18450,
  cacChange: -22.4, // -22.4% reduction
  totalLeadsGenerated: 184,
  averageCostPerLeadINR: 640,
  trends: [
    { date: 'Sep 16', adSpendINR: 12000, pipelineRevenueINR: 2800000, leadsCount: 4 },
    { date: 'Sep 20', adSpendINR: 14500, pipelineRevenueINR: 3400000, leadsCount: 6 },
    { date: 'Sep 24', adSpendINR: 15200, pipelineRevenueINR: 4200000, leadsCount: 7 },
    { date: 'Sep 28', adSpendINR: 16800, pipelineRevenueINR: 4600000, leadsCount: 8 },
    { date: 'Oct 02', adSpendINR: 18000, pipelineRevenueINR: 5200000, leadsCount: 9 },
    { date: 'Oct 06', adSpendINR: 19500, pipelineRevenueINR: 5800000, leadsCount: 11 },
    { date: 'Oct 10', adSpendINR: 21000, pipelineRevenueINR: 6100000, leadsCount: 12 },
    { date: 'Oct 14', adSpendINR: 22400, pipelineRevenueINR: 6300000, leadsCount: 14 },
  ],
};

export const mockConversionPaths: ConversionPath[] = [
  {
    id: 'path-1',
    pathName: 'Omnichannel Digital Nurture',
    steps: [
      { channel: 'instagram', icon: 'Instagram', label: 'Feed Carousel' },
      { channel: 'landing_page', icon: 'Globe', label: 'Villas Landing' },
      { channel: 'facebook', icon: 'Facebook', label: 'Retargeting' },
      { channel: 'google', icon: 'Search', label: 'Google Brand Search' },
      { channel: 'whatsapp', icon: 'MessageSquare', label: 'WhatsApp Site Booking' },
    ],
    conversionsCount: 38,
    revenueAttributedINR: 182000000, // ₹18.2 Cr
    averageDaysToConvert: 14.2,
    sharePercentage: 48,
  },
  {
    id: 'path-2',
    pathName: 'Direct Search Intent',
    steps: [
      { channel: 'google', icon: 'Search', label: 'Google Search PMax' },
      { channel: 'landing_page', icon: 'Globe', label: 'Pricing Calculator' },
      { channel: 'phone', icon: 'Phone', label: 'Instant Gallery Site Visit' },
    ],
    conversionsCount: 24,
    revenueAttributedINR: 124000000, // ₹12.4 Cr
    averageDaysToConvert: 6.1,
    sharePercentage: 31,
  },
  {
    id: 'path-3',
    pathName: 'Thought Leadership & Video',
    steps: [
      { channel: 'linkedin', icon: 'Linkedin', label: 'CMO Insight Article' },
      { channel: 'youtube', icon: 'Play', label: 'Shorts Video Tour' },
      { channel: 'direct', icon: 'Globe', label: 'Organic Direct Walk-in' },
    ],
    conversionsCount: 16,
    revenueAttributedINR: 78000000, // ₹7.8 Cr
    averageDaysToConvert: 18.5,
    sharePercentage: 21,
  },
];

export const mockChannelPerformance: ChannelPerformanceItem[] = [
  {
    id: 'perf-meta',
    channel: 'meta',
    channelName: 'Meta Ads (Instagram & Facebook)',
    adSpendINR: 284000,
    leadsCount: 126,
    costPerLeadINR: 2253,
    siteVisitsBooked: 42,
    attributedRevenueINR: 245000000, // ₹24.5 Cr
    roas: 8.6,
    sharePercentage: 58,
  },
  {
    id: 'perf-google',
    channel: 'google',
    channelName: 'Google Ads (Search & PMax)',
    adSpendINR: 196000,
    leadsCount: 58,
    costPerLeadINR: 3379,
    siteVisitsBooked: 22,
    attributedRevenueINR: 139000000, // ₹13.9 Cr
    roas: 7.1,
    sharePercentage: 42,
  },
];

export const mockFunnelStages: FunnelStageData[] = [
  {
    stageNumber: 1,
    stageName: 'Ad Impressions Delivered',
    volume: 480000,
    conversionRateFromPrevious: 100,
    overallDropOffRate: 0,
    benchmarkRate: 100,
    isBottleneck: false,
  },
  {
    stageNumber: 2,
    stageName: 'Clicks & Page Visitors',
    volume: 32400,
    conversionRateFromPrevious: 6.75,
    overallDropOffRate: 93.25,
    benchmarkRate: 5.2,
    isBottleneck: false,
  },
  {
    stageNumber: 3,
    stageName: 'Lead Inquiries Captured',
    volume: 480,
    conversionRateFromPrevious: 1.48,
    overallDropOffRate: 98.52,
    benchmarkRate: 2.5,
    isBottleneck: true,
    bottleneckFixSuggestion:
      'Mobile form abandonment detected. Simplify 6 fields into a 2-step phone verification dialog.',
  },
  {
    stageNumber: 4,
    stageName: 'DIYA AI Qualified Prospects',
    volume: 184,
    conversionRateFromPrevious: 38.33,
    overallDropOffRate: 61.67,
    benchmarkRate: 30.0,
    isBottleneck: false,
  },
  {
    stageNumber: 5,
    stageName: 'Physical Site Visits Booked',
    volume: 64,
    conversionRateFromPrevious: 34.78,
    overallDropOffRate: 65.22,
    benchmarkRate: 28.0,
    isBottleneck: false,
  },
  {
    stageNumber: 6,
    stageName: 'Closed Booking Tokens',
    volume: 18,
    conversionRateFromPrevious: 28.12,
    overallDropOffRate: 71.88,
    benchmarkRate: 20.0,
    isBottleneck: false,
  },
];
