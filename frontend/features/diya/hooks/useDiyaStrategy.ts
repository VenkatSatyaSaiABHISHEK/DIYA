'use client';

import { useCallback } from 'react';
import { useDIYAStore } from '../store/diya.store';
import { useAIStatusStore } from '@/store/ai-status.store';
import { useUIStore } from '@/store/ui.store';
import { diyaService } from '../services/diya.service';
import type { StrategyInput, Message } from '../types';

export function useDiyaStrategy() {
  const {
    strategyInput,
    strategyOutput,
    isGeneratingStrategy,
    setStrategyInput,
    setStrategyOutput,
    setIsGeneratingStrategy,
    setActiveTab,
    addMessage,
  } = useDIYAStore();

  const { setStatus, setCurrentTask } = useAIStatusStore();
  const { addToast } = useUIStore();

  const generateStrategy = useCallback(
    async (inputOverride?: Partial<StrategyInput>) => {
      const payload: StrategyInput = {
        ...strategyInput,
        ...inputOverride,
      };

      setIsGeneratingStrategy(true);
      setStatus('planning', `DIYA is synthesizing a 30-day marketing strategy for ${payload.businessName}...`);
      setCurrentTask(`Drafting buyer personas, channel donuts, and budget breakdown for ${payload.industry}`);

      try {
        const result = await diyaService.generateStrategy(payload);
        setStrategyOutput(result);
        setStatus('optimizing', 'Strategy synthesized — ready for execution');
        addToast('30-Day Marketing Strategy generated successfully!', 'success');
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to generate strategy';
        addToast(msg, 'danger');
        setStatus('idle');
      } finally {
        setIsGeneratingStrategy(false);
      }
    },
    [
      strategyInput,
      setIsGeneratingStrategy,
      setStatus,
      setCurrentTask,
      setStrategyOutput,
      addToast,
    ]
  );

  const turnIntoCampaignPlan = useCallback(() => {
    if (!strategyOutput) return;

    // Create a new structured plan message in Command Chat
    const planMessageId = `msg-strat-plan-${Date.now()}`;
    const planMessage: Message = {
      id: planMessageId,
      role: 'assistant',
      content: `I've imported your 30-Day Strategy for ${strategyInput.businessName} into an actionable campaign flight:`,
      blocks: [
        {
          type: 'text',
          text: `Here is the operational rollout for **${strategyInput.businessName}** generated from your strategy blueprint. Approve the plan to begin asset drafting and channel launch:`,
        },
        {
          type: 'plan',
          plan: {
            id: `plan-strat-${Date.now()}`,
            goal: `Execute Phase 1 of 30-Day Strategy for ${strategyInput.businessName} (${strategyOutput.roadmap[0].title}).`,
            assumptions: strategyOutput.forecastAssumptions,
            status: 'draft',
            createdAt: new Date().toISOString(),
            totalCostINR: Math.round(strategyInput.monthlyBudgetINR * 0.25),
            steps: [
              {
                id: `s-1`,
                title: 'Phase 1: Foundation & Setup',
                description: strategyOutput.roadmap[0].deliverables.join(' • '),
                type: 'campaign',
                requiresApproval: true,
                status: 'draft',
                estimatedCostINR: Math.round(strategyInput.monthlyBudgetINR * 0.25),
                impact: strategyOutput.roadmap[0].expectedMilestone,
              },
              {
                id: `s-2`,
                title: 'Persona Creative Briefing',
                description: `Targeting: ${strategyOutput.personas.map((p) => p.name).join(' and ')}`,
                type: 'creative',
                requiresApproval: false,
                status: 'completed',
                impact: 'Ready for preview in Ad Studio',
              },
            ],
          },
        },
      ],
      timestamp: new Date().toISOString(),
      status: 'complete',
    };

    addMessage(planMessage);
    setActiveTab('chat');
    addToast('Strategy converted to operational plan in Command Chat!', 'success');
  }, [strategyOutput, strategyInput, addMessage, setActiveTab, addToast]);

  return {
    strategyInput,
    strategyOutput,
    isGeneratingStrategy,
    setStrategyInput,
    generateStrategy,
    turnIntoCampaignPlan,
  };
}
