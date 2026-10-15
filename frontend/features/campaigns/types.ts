export type Platform = 'meta' | 'google' | 'linkedin' | 'omnichannel';

export type CampaignStatus =
  | 'recommendation'
  | 'draft'
  | 'approved'
  | 'live'
  | 'paused'
  | 'completed';

export type Objective =
  | 'leads'
  | 'awareness'
  | 'traffic'
  | 'conversions'
  | 'sales';

export type PerformanceHealth = 'on_track' | 'needs_attention' | 'underperforming';

export interface PerformancePoint {
  date: string;
  impressions: number;
  clicks: number;
  leads: number;
  spendINR: number;
  cplINR: number;
}

export interface CreativeVariation {
  id: string;
  headline: string;
  primaryText: string;
  description: string;
  callToAction: string;
  hookAngle: string;
  characterCount: {
    headline: number;
    primaryText: number;
  };
  status: 'draft' | 'approved';
}

export interface Creative {
  id: string;
  headline: string;
  bodyCopy: string;
  callToAction: string;
  placement: 'ig_feed' | 'ig_story' | 'ig_reel' | 'fb_feed' | 'google_display';
  brandColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  aspectRatio: string;
  status: 'draft' | 'approved';
  previewUrl?: string;
  brief?: string;
}

export interface AdSet {
  id: string;
  name: string;
  targetingSummary: string;
  dailyBudgetINR: number;
  spendINR: number;
  leads: number;
  cplINR: number;
  status: 'active' | 'paused' | 'draft';
}

export interface CampaignRecommendation {
  problem: string;
  whyItMatters: string;
  fix: string;
  fixBudgetIncrementINR?: number;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  action: string;
  user: string;
}

export interface Campaign {
  id: string;
  name: string;
  platform: Platform;
  objective: Objective;
  status: CampaignStatus;
  health: PerformanceHealth;
  dailyBudgetINR: number;
  lifetimeBudgetINR?: number;
  spendTotalINR: number;
  leadsCount: number;
  cplINR: number;
  roas: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpcINR: number;
  schedule: {
    startDate: string;
    endDate?: string;
    durationDays: number;
  };
  targetAudience: string;
  adSets: AdSet[];
  creatives: Creative[];
  sparklineData: number[];
  performanceHistory: PerformancePoint[];
  underperformingRecommendation?: CampaignRecommendation;
  activityLog: ActivityLogItem[];
  createdAt: string;
}

export interface AudienceConfig {
  locations: string[];
  ageMin: number;
  ageMax: number;
  gender: 'all' | 'men' | 'women';
  languages: Array<'en' | 'te' | 'hi'>;
  interests: string[];
  diyaRecommendation?: string;
}

export interface BudgetEstimate {
  projectedLeadsMin: number;
  projectedLeadsMax: number;
  cplMinINR: number;
  cplMaxINR: number;
  reachMin: number;
  reachMax: number;
  assumptions: string[];
}

export interface BudgetConfig {
  budgetType: 'daily' | 'lifetime';
  amountINR: number;
  startDate: string;
  flightDurationDays: number;
  estimate: BudgetEstimate;
}

export interface TrackingConfig {
  conversionGoal: 'meta_instant_form' | 'landing_page_pixel' | 'whatsapp_crm';
  pixelStatus: 'not_verified' | 'connected' | 'unverified';
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  leadFormFields: string[];
}

export interface LaunchDraft {
  currentStep: number;
  name: string;
  objective: Objective;
  platform: Platform;
  brief: string;
  audience: AudienceConfig;
  budget: BudgetConfig;
  creative: {
    headline: string;
    bodyCopy: string;
    callToAction: string;
    placement: string;
  };
  tracking: TrackingConfig;
  lastSavedAt: string;
}

export interface StudioBrandSettings {
  logoName?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  useBrandKnowledge: boolean;
}

export interface StudioBrief {
  prompt: string;
  objective: Objective;
  offerHook: string;
  targetAudience: string;
  language: 'en' | 'te' | 'hi';
  tone: 'luxurious' | 'professional' | 'urgent' | 'friendly';
  brandSettings: StudioBrandSettings;
  format: 'feed' | 'story' | 'reel' | 'carousel' | 'google_responsive';
}

export interface GeneratedCopy {
  headlines: string[];
  primaryTexts: string[];
  descriptions: string[];
  callToActions: string[];
  hashtags: string[];
  variations: CreativeVariation[];
}

export interface PlatformSpec {
  platform: Platform;
  placement: string;
  maxHeadlineChars: number;
  maxPrimaryTextChars: number;
  aspectRatio: string;
  recommendedResolution: string;
}

export interface CampaignFilterState {
  search: string;
  platform: 'all' | Platform;
  status: 'all' | CampaignStatus;
  objective: 'all' | Objective;
  sortBy: 'recent' | 'spend_high' | 'leads_high' | 'cpl_low';
  viewMode: 'card' | 'table';
  devState: 'default' | 'loading' | 'empty' | 'error';
}

// Backward compatibility alias
export type CampaignDetail = Campaign;
