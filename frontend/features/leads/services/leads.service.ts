import { mockLeadRecords, mockCrmIntegrations } from '../mocks';
import type { CrmIntegrationStatus, LeadRecord, LeadStage } from '../types';

let inMemoryLeads = [...mockLeadRecords];
let inMemoryIntegrations = [...mockCrmIntegrations];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const leadsService = {
  /**
   * Retrieves all captured leads across advertising channels with qualification telemetry.
   */
  async listLeads(): Promise<LeadRecord[]> {
    // Replace mock with real API call: GET /api/v1/leads
    await delay(500);
    return [...inMemoryLeads];
  },

  /**
   * Retrieves single lead profile, notes, and activity timeline.
   */
  async getLead(id: string): Promise<LeadRecord | null> {
    // Replace mock with real API call: GET /api/v1/leads/:id
    await delay(400);
    const found = inMemoryLeads.find((l) => l.id === id);
    return found ? { ...found } : null;
  },

  /**
   * Updates pipeline stage for a lead record.
   */
  async updateStage(id: string, stage: LeadStage): Promise<LeadRecord> {
    // Replace mock with real API call: PUT /api/v1/leads/:id/stage
    await delay(450);
    const lead = inMemoryLeads.find((l) => l.id === id);
    if (!lead) throw new Error('Lead not found');
    lead.stage = stage;
    lead.updatedAt = new Date().toISOString();
    return { ...lead };
  },

  /**
   * Exports selected leads to external CRM or CSV.
   */
  async exportLeads(
    leadIds: string[],
    destination: 'hubspot' | 'salesforce' | 'zoho' | 'csv'
  ): Promise<{ exportedCount: number; message: string }> {
    // Replace mock with real API call: POST /api/v1/leads/export
    await delay(750);
    return {
      exportedCount: leadIds.length,
      message: `Successfully prepared ${leadIds.length} leads for ${destination.toUpperCase()} sync.`,
    };
  },

  /**
   * Retrieves list of configured CRM integrations and sync statuses.
   */
  async listIntegrations(): Promise<CrmIntegrationStatus[]> {
    // Replace mock with real API call: GET /api/v1/leads/integrations
    await delay(400);
    return [...inMemoryIntegrations];
  },

  /**
   * Simulates OAuth connection with a CRM partner.
   */
  async connectIntegration(provider: string): Promise<boolean> {
    // Replace mock with real API call: POST /api/v1/leads/integrations/:provider/connect
    await delay(700);
    inMemoryIntegrations = inMemoryIntegrations.map((i) =>
      i.provider === provider
        ? { ...i, connected: true, lastSyncAt: new Date().toISOString() }
        : i
    );
    return true;
  },

  /**
   * Resets in-memory demo data.
   */
  resetDemoData(): void {
    inMemoryLeads = [...mockLeadRecords];
    inMemoryIntegrations = [...mockCrmIntegrations];
  },
};
