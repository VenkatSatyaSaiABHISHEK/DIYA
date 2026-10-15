import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { env } from '@/lib/env';
import {
  mockDiyaStatus,
  mockInitialMessages,
  mockStrategyOutput,
  mockAutomations,
  mockTimelineRuns,
} from '../mocks';
import type {
  DiyaStatusResponse,
  Message,
  Block,
  StrategyInput,
  StrategyOutput,
  Automation,
  TimelineRun,
} from '../types';

export const diyaService = {
  async getStatus(): Promise<DiyaStatusResponse> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      return mockDiyaStatus;
    }
    return apiClient.get<DiyaStatusResponse>(API_ENDPOINTS.diya.status);
  },

  /**
   * Sends a user command and streams back DIYA's reply token by token,
   * followed by structured operational blocks (Plan, Creative, Campaign Preview).
   */
  async sendMessageStream(
    prompt: string,
    language: 'en' | 'te' | 'hi',
    onChunk: (accumulatedText: string) => void,
    onComplete: (blocks: Block[]) => void,
    signal?: AbortSignal
  ): Promise<void> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      let fullText = '';
      const promptLower = prompt.toLowerCase();

      // Tailored responses based on user query
      let answer = `I've analyzed your request: "${prompt}". Here is the structured marketing blueprint with target audience segmentation, creative copy, and ad flight parameters ready for your approval:`;

      if (promptLower.includes('real estate') || promptLower.includes('hyderabad')) {
        answer =
          'I have mapped high-net-worth buyer clusters across Kokapet, Gachibowli, and Financial District. Here is the operational lead engine blueprint and ad set preview ready for your sign-off:';
      } else if (promptLower.includes('strategy') || promptLower.includes('30-day')) {
        answer =
          'I have drafted a 30-day full-funnel omnichannel growth roadmap. I have configured customer personas, budget splits, and automated lead capture pipelines below:';
      } else if (promptLower.includes('post') || promptLower.includes('creative') || promptLower.includes('instagram')) {
        answer =
          'I have synthesized 5 high-converting Instagram ad copies and 3 video hook scripts designed to minimize CPA. Review the creative card below:';
      } else if (promptLower.includes('seo') || promptLower.includes('website')) {
        answer =
          'I completed an initial crawl of your website. I have pinpointed 3 high-impact organic keyword clusters and 2 schema markup fixes:';
      }

      const words = answer.split(' ');

      for (let i = 0; i < words.length; i++) {
        if (signal?.aborted) return;
        fullText += (i === 0 ? '' : ' ') + words[i];
        onChunk(fullText);
        await new Promise((resolve) => setTimeout(resolve, 45));
      }

      // Generate structured blocks based on context
      const blocks: Block[] = [
        { type: 'text', text: fullText },
        {
          type: 'plan',
          plan: {
            id: `plan-${Date.now()}`,
            goal: `Execute "${prompt.slice(0, 50)}..." with targeted budget efficiency.`,
            assumptions: [
              'Target CPA capped at ₹150 per verified lead.',
              'Cross-platform flight on Meta (70%) and Google Search (30%).',
              'Requires explicit sign-off before ad accounts are billed.',
            ],
            status: 'draft',
            createdAt: new Date().toISOString(),
            totalCostINR: 12000,
            steps: [
              {
                id: `step-${Date.now()}-1`,
                title: 'Market & Competitor Diagnostic',
                description: 'Crawl competing ad sets and keyword density in target geo-zone.',
                type: 'analysis',
                requiresApproval: false,
                status: 'completed',
                impact: 'Identified 3 untapped audience angles',
                outputSummary: 'Discovered high-converting keyword gap with 40% lower competition.',
              },
              {
                id: `step-${Date.now()}-2`,
                title: 'Creative Angle & Ad Copy Production',
                description: 'Produce 3 carousel ads and 2 video hook variants.',
                type: 'creative',
                requiresApproval: false,
                status: 'completed',
                impact: 'Estimated 3.2% Click-Through Rate',
                outputSummary: 'Ready for placement testing across Instagram and Facebook.',
              },
              {
                id: `step-${Date.now()}-3`,
                title: 'Deploy Cross-Channel Ad Campaign',
                description: 'Launch pilot flight with ₹1,800 daily budget cap on Meta.',
                type: 'campaign',
                requiresApproval: true,
                status: 'draft',
                estimatedCostINR: 12600,
                impact: 'Projected 80 - 110 qualified leads',
              },
            ],
          },
        },
        {
          type: 'campaignPreview',
          campaign: {
            id: `camp-${Date.now()}`,
            name: `${prompt.slice(0, 32)} — Pilot Flight`,
            platform: 'meta',
            objective: 'Lead Generation',
            targetAudience: 'Ages 25–50, Metro High-Intent Professionals',
            dailyBudgetINR: 1800,
            schedule: '7-Day Flight (Live upon approval)',
            adSetsCount: 2,
            status: 'draft',
          },
        },
        {
          type: 'creativePreview',
          creative: {
            id: `cr-${Date.now()}`,
            headline: 'Scale Your Marketing Without Agency Fees',
            bodyCopy:
              'Stop burning ad budget on untested campaigns. DIYA plans, writes, and optimizes your Meta & Google ads automatically. See live results in 48 hours.',
            callToAction: 'Book Free Discovery Call',
            placement: 'ig_feed',
            brief: 'High-contrast typography, violet brand accents, and punchy value proposition.',
            hasGeneratedAsset: false,
          },
        },
      ];

      onComplete(blocks);
      return;
    }

    // Live endpoint fallback
    const result = await apiClient.post<{ blocks: Block[] }>(
      API_ENDPOINTS.diya.command,
      { prompt, language }
    );
    onChunk(result.blocks.find((b) => b.type === 'text')?.text || '');
    onComplete(result.blocks);
  },

  async approvePlan(planId: string): Promise<{ success: boolean; message: string }> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 300));
      return { success: true, message: 'Plan approved. Tasks queued for execution.' };
    }
    return apiClient.post(API_ENDPOINTS.diya.approvePlan(planId));
  },

  async rejectPlan(planId: string): Promise<{ success: boolean; message: string }> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 200));
      return { success: true, message: 'Plan rejected. DIYA will draft an alternative.' };
    }
    return apiClient.post(API_ENDPOINTS.diya.rejectPlan(planId));
  },

  async approveStep(stepId: string): Promise<{ success: boolean; message: string }> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 250));
      return { success: true, message: 'Step approved and scheduled.' };
    }
    return apiClient.post(API_ENDPOINTS.diya.approveStep(stepId));
  },

  async retryStep(stepId: string): Promise<{ success: boolean; message: string }> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 350));
      return { success: true, message: 'Step restarted.' };
    }
    return apiClient.post(API_ENDPOINTS.diya.retryStep(stepId));
  },

  async listRuns(): Promise<TimelineRun[]> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      return mockTimelineRuns;
    }
    return apiClient.get<TimelineRun[]>(API_ENDPOINTS.diya.runs);
  },

  async generateStrategy(input: StrategyInput): Promise<StrategyOutput> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 1200)); // Realistic generation delay
      return {
        ...mockStrategyOutput,
        id: `strat-${Date.now()}`,
        summary: `Tailored 30-day marketing strategy for ${input.businessName} in ${input.industry}. Focused on ${input.marketingObjectives.join(', ')} with ₹${input.monthlyBudgetINR.toLocaleString('en-IN')} monthly budget.`,
        createdAt: new Date().toISOString(),
      };
    }
    return apiClient.post<StrategyOutput>(API_ENDPOINTS.diya.generateStrategy, input);
  },

  async listAutomations(): Promise<Automation[]> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      return mockAutomations;
    }
    return apiClient.get<Automation[]>(API_ENDPOINTS.diya.automations);
  },

  async toggleAutomation(id: string): Promise<{ success: boolean }> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      return { success: true };
    }
    return apiClient.post(API_ENDPOINTS.diya.toggleAutomation(id));
  },
};
