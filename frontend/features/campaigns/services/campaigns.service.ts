import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { env } from '@/lib/env';
import { mockCampaignsList, mockGeneratedCopy } from '../mocks';
import type {
  Campaign,
  CampaignStatus,
  LaunchDraft,
  StudioBrief,
  GeneratedCopy,
  CreativeVariation,
} from '../types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const campaignsService = {
  /**
   * List all advertising campaigns.
   */
  async listCampaigns(): Promise<Campaign[]> {
    // Replace mock with real API call: apiClient.get<Campaign[]>(API_ENDPOINTS.campaigns.list)
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await sleep(550);
      return [...mockCampaignsList];
    }
    return apiClient.get<Campaign[]>(API_ENDPOINTS.campaigns.list);
  },

  /**
   * Get full details for a single campaign.
   */
  async getCampaign(id: string): Promise<Campaign | null> {
    // Replace mock with real API call: apiClient.get<Campaign>(API_ENDPOINTS.campaigns.detail(id))
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await sleep(450);
      const found = mockCampaignsList.find((c) => c.id === id);
      return found ? { ...found } : null;
    }
    return apiClient.get<Campaign>(API_ENDPOINTS.campaigns.detail(id));
  },

  /**
   * Create a new campaign draft from the launch flow.
   */
  async createDraft(draft: LaunchDraft): Promise<Campaign> {
    // Replace mock with real API call: apiClient.post<Campaign>(API_ENDPOINTS.campaigns.create, draft)
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await sleep(650);
      const newCampaign: Campaign = {
        id: `c-draft-${Date.now()}`,
        name: draft.name,
        platform: draft.platform,
        objective: draft.objective,
        status: 'draft',
        health: 'on_track',
        dailyBudgetINR: draft.budget.amountINR,
        spendTotalINR: 0,
        leadsCount: 0,
        cplINR: 0,
        roas: 0,
        impressions: 0,
        clicks: 0,
        ctr: 0,
        cpcINR: 0,
        schedule: {
          startDate: draft.budget.startDate,
          durationDays: draft.budget.flightDurationDays,
        },
        targetAudience: draft.audience.interests.join(', ') || 'Custom audience',
        sparklineData: [0, 0, 0, 0, 0, 0, 0],
        performanceHistory: [],
        adSets: [
          {
            id: `adset-${Date.now()}`,
            name: `${draft.name} — Ad Set 1`,
            targetingSummary: `${draft.audience.locations.join(', ')} | ${draft.audience.ageMin}-${draft.audience.ageMax}`,
            dailyBudgetINR: draft.budget.amountINR,
            spendINR: 0,
            leads: 0,
            cplINR: 0,
            status: 'draft',
          },
        ],
        creatives: [
          {
            id: `cr-${Date.now()}`,
            headline: draft.creative.headline,
            bodyCopy: draft.creative.bodyCopy,
            callToAction: draft.creative.callToAction,
            placement: 'ig_feed',
            aspectRatio: '1:1',
            status: 'draft',
          },
        ],
        activityLog: [
          {
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: 'Draft campaign created via Launch Flow stepper',
            user: 'Mentneo Owner',
          },
        ],
        createdAt: new Date().toISOString(),
      };
      return newCampaign;
    }
    return apiClient.post<Campaign>(API_ENDPOINTS.campaigns.create, draft);
  },

  /**
   * Save an existing campaign draft in progress.
   */
  async saveDraft(
    id: string,
    draft: Partial<LaunchDraft>
  ): Promise<{ success: boolean; lastSavedAt: string }> {
    // Replace mock with real API call: apiClient.put(API_ENDPOINTS.campaigns.saveDraft(id), draft)
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await sleep(400);
      return { success: true, lastSavedAt: new Date().toISOString() };
    }
    return apiClient.put(API_ENDPOINTS.campaigns.saveDraft(id), draft);
  },

  /**
   * Approve a recommended or draft campaign.
   */
  async approveCampaign(id: string): Promise<{ success: boolean; status: CampaignStatus }> {
    // Replace mock with real API call: apiClient.post(API_ENDPOINTS.campaigns.approve(id))
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await sleep(500);
      return { success: true, status: 'approved' };
    }
    return apiClient.post(API_ENDPOINTS.campaigns.approve(id));
  },

  /**
   * Launch a campaign onto live ad network (demo simulated flow).
   */
  async launchCampaign(
    id: string,
    authorizedBudgetINR: number
  ): Promise<{ success: boolean; status: CampaignStatus; message: string }> {
    // Replace mock with real API call: apiClient.post(API_ENDPOINTS.campaigns.launch(id), { authorizedBudgetINR })
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await sleep(850);
      return {
        success: true,
        status: 'live',
        message: 'Demo mode: no campaign was created or launched on Meta Ads.',
      };
    }
    return apiClient.post(API_ENDPOINTS.campaigns.launch(id), { authorizedBudgetINR });
  },

  /**
   * Pause an active campaign.
   */
  async pauseCampaign(id: string): Promise<{ success: boolean; status: CampaignStatus }> {
    // Replace mock with real API call: apiClient.post(API_ENDPOINTS.campaigns.pause(id))
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await sleep(450);
      return { success: true, status: 'paused' };
    }
    return apiClient.post(API_ENDPOINTS.campaigns.pause(id));
  },

  /**
   * Update or increase budget cap for an ad campaign.
   */
  async updateBudget(
    id: string,
    newDailyBudgetINR: number
  ): Promise<{ success: boolean; updatedBudgetINR: number }> {
    // Replace mock with real API call: apiClient.put(API_ENDPOINTS.campaigns.updateBudget(id), { newDailyBudgetINR })
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await sleep(600);
      return { success: true, updatedBudgetINR: newDailyBudgetINR };
    }
    return apiClient.put(API_ENDPOINTS.campaigns.updateBudget(id), { newDailyBudgetINR });
  },

  /**
   * Ad Studio: Generate copy variations from a creative brief.
   */
  async generateCreative(brief: StudioBrief): Promise<GeneratedCopy> {
    // Replace mock with real API call: apiClient.post<GeneratedCopy>(API_ENDPOINTS.campaigns.generateCreative, brief)
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await sleep(900);
      return { ...mockGeneratedCopy };
    }
    return apiClient.post<GeneratedCopy>(API_ENDPOINTS.campaigns.generateCreative, brief);
  },

  /**
   * Ad Studio: Create additional creative copy variations.
   */
  async createVariations(baseCopy: string): Promise<CreativeVariation[]> {
    // Replace mock with real API call: apiClient.post<CreativeVariation[]>(API_ENDPOINTS.campaigns.createVariations, { baseCopy })
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await sleep(700);
      return [...mockGeneratedCopy.variations];
    }
    return apiClient.post<CreativeVariation[]>(API_ENDPOINTS.campaigns.createVariations, {
      baseCopy,
    });
  },

  /**
   * Ad Studio: Approve a generated variation.
   */
  async approveCreative(id: string): Promise<{ success: boolean; status: string }> {
    // Replace mock with real API call: apiClient.post(API_ENDPOINTS.campaigns.approveCreative(id))
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await sleep(400);
      return { success: true, status: 'approved' };
    }
    return apiClient.post(API_ENDPOINTS.campaigns.approveCreative(id));
  },

  /**
   * Ad Studio: Export creative asset (demo modal flow).
   */
  async exportCreative(
    id: string,
    format: string
  ): Promise<{ success: boolean; message: string }> {
    // Replace mock with real API call: apiClient.post(API_ENDPOINTS.campaigns.exportCreative(id), { format })
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await sleep(650);
      return {
        success: true,
        message: 'Demo mode: export is not available yet. No file was downloaded.',
      };
    }
    return apiClient.post(API_ENDPOINTS.campaigns.exportCreative(id), { format });
  },
};
