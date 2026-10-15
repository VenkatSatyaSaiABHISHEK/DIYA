export type LeadStage =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'site_visit'
  | 'negotiation'
  | 'converted'
  | 'lost';

export type LeadSource = 'meta' | 'google' | 'landing_page' | 'whatsapp' | 'direct';

export type QualificationTier = 'hot' | 'warm' | 'cold';

export type LeadsSubTab = 'pipeline' | 'directory' | 'qualification' | 'sync';

export interface LeadActivityEvent {
  id: string;
  timestamp: string; // ISO 8601
  type: 'form_submit' | 'ai_whatsapp' | 'call' | 'email_brochure' | 'site_visit' | 'stage_change';
  title: string;
  description: string;
  actor: 'DIYA AI' | 'Sales Executive' | 'Lead';
}

export interface LeadRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  designation?: string;
  source: LeadSource;
  campaignName: string;
  budgetRangeINR: string; // e.g. "₹4.5 - ₹6.0 Cr"
  preferredProject: string; // e.g. "Kokapet Sky Villas"
  preferredUnitType: string; // e.g. "4 BHK Penthouse"
  qualificationScore: number; // 0 - 100
  qualificationTier: QualificationTier;
  qualificationReason: string;
  stage: LeadStage;
  estimatedDealValueINR: number;
  lastContactedAt?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  activities?: LeadActivityEvent[];
}

export interface LeadFilterState {
  search: string;
  stage: LeadStage | 'all';
  source: LeadSource | 'all';
  tier: QualificationTier | 'all';
  sortBy: 'score' | 'recent' | 'budget';
  devState: 'default' | 'loading' | 'empty' | 'error';
}

export interface CrmIntegrationStatus {
  id: string;
  provider: 'hubspot' | 'salesforce' | 'zoho' | 'leadsquared' | 'sheets';
  name: string;
  logo: string;
  connected: boolean;
  lastSyncAt?: string;
  syncedRecordsCount: number;
  description: string;
}
