import type { IntegrationStatus, BusinessProfile } from './types';

export const mockIntegrations: IntegrationStatus[] = [
  {
    id: 'int-1',
    provider: 'meta',
    name: 'Meta Ads Manager',
    connected: true,
    accountName: 'Mentneo Growth Account',
    lastSyncedAt: new Date().toISOString(),
  },
  {
    id: 'int-2',
    provider: 'google',
    name: 'Google Ads & Search',
    connected: true,
    accountName: 'Mentneo Commercial Ads',
    lastSyncedAt: new Date().toISOString(),
  },
  {
    id: 'int-3',
    provider: 'shopify',
    name: 'Shopify Store',
    connected: false,
  },
];

export const mockBusinessProfile: BusinessProfile = {
  businessName: 'Mentneo Technologies',
  industry: 'B2B Software & AI SaaS',
  websiteUrl: 'https://mentneo.ai',
  targetAudience: 'SMB Founders, Marketing Directors, Agency Owners',
  monthlyAdBudgetCap: 250000,
};
