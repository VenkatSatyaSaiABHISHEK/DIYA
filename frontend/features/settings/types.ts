export interface IntegrationStatus {
  id: string;
  provider: 'meta' | 'google' | 'linkedin' | 'shopify' | 'ga4';
  name: string;
  connected: boolean;
  accountName?: string;
  lastSyncedAt?: string;
}

export interface BusinessProfile {
  businessName: string;
  industry: string;
  websiteUrl: string;
  targetAudience: string;
  monthlyAdBudgetCap: number;
}
