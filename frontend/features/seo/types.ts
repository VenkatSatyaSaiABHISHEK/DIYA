export type SeoSubTab = 'overview' | 'keywords' | 'audit' | 'pages';

export type SearchIntent = 'commercial' | 'informational' | 'transactional' | 'navigational';

export type IssueSeverity = 'critical' | 'warning' | 'notice';

export interface TrafficPoint {
  date: string; // "Oct 01"
  organicClicks: number;
  impressions: number;
  averagePosition: number;
}

export interface SeoOverviewData {
  healthScore: number; // 0 - 100
  previousHealthScore: number;
  organicVisits: number;
  organicVisitsChange: number; // percentage
  trackedKeywords: number;
  top3Keywords: number;
  top10Keywords: number;
  indexedPages: number;
  totalCrawlErrors: number;
  trafficHistory: TrafficPoint[];
}

export interface SeoKeywordItem {
  id: string;
  keyword: string;
  position: number;
  previousPosition: number;
  volume: number;
  difficulty: number; // 0 - 100 KD%
  intent: SearchIntent;
  targetUrl: string;
  serpFeatures: ('snippet' | 'people_also_ask' | 'local_pack' | 'video')[];
  lastUpdated: string;
}

export interface SeoAuditIssue {
  id: string;
  title: string;
  severity: IssueSeverity;
  category: 'performance' | 'metadata' | 'indexing' | 'content';
  affectedPagesCount: number;
  impactDescription: string;
  recommendedFix: string;
  canAutoFix: boolean;
}

export interface CoreWebVitals {
  lcp: { value: string; status: 'good' | 'needs_improvement' | 'poor'; score: number };
  inp: { value: string; status: 'good' | 'needs_improvement' | 'poor'; score: number };
  cls: { value: string; status: 'good' | 'needs_improvement' | 'poor'; score: number };
  ttfb: { value: string; status: 'good' | 'needs_improvement' | 'poor'; score: number };
}

export interface SeoPageMeta {
  id: string;
  path: string;
  pageName: string;
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  schemaType: string;
  seoScore: number;
  lastAudited: string;
}

export interface SeoRecommendation {
  id: string;
  title: string;
  description: string;
  impact: string;
  category: 'keyword_loss' | 'metadata_missing' | 'speed_issue' | 'schema_opportunity';
  actionLabel: string;
}

export interface KeywordFilterState {
  search: string;
  intent: SearchIntent | 'all';
  rankingTier: 'all' | 'top3' | 'top10' | 'striking';
  sortBy: 'rank' | 'volume' | 'difficulty';
  devState: 'default' | 'loading' | 'empty' | 'error';
}
