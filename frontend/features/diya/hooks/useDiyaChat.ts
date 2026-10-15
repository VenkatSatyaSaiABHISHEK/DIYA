'use client';

import { useState, useRef, useCallback } from 'react';
import { useDIYAStore } from '../store/diya.store';
import { useAIStatusStore } from '@/store/ai-status.store';
import { useUIStore } from '@/store/ui.store';
import { diyaService } from '../services/diya.service';
import type { Message, Block, ApprovalRequest } from '../types';

export function useDiyaChat() {
  const {
    messages,
    isStreaming,
    streamingMessageId,
    selectedLanguage,
    setSelectedLanguage,
    addMessage,
    updateMessage,
    setIsStreaming,
    approvePlanStep,
    rejectPlanStep,
    approveEntirePlan,
    rejectEntirePlan,
    openApprovalModal,
    closeApprovalModal,
  } = useDIYAStore();

  const { setStatus, setCurrentTask, setTodaySummary, todaySummary } = useAIStatusStore();
  const { addToast } = useUIStore();
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (prompt: string) => {
      if (!prompt.trim() || isStreaming) return;

      const userMsgId = `msg-user-${Date.now()}`;
      const assistantMsgId = `msg-asst-${Date.now()}`;

      // 1. Add User Message
      const userMessage: Message = {
        id: userMsgId,
        role: 'user',
        content: prompt,
        blocks: [{ type: 'text', text: prompt }],
        timestamp: new Date().toISOString(),
        status: 'complete',
      };
      addMessage(userMessage);

      // 2. Prepare Assistant Message Placeholder
      const assistantMessage: Message = {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        blocks: [{ type: 'text', text: '' }],
        timestamp: new Date().toISOString(),
        status: 'streaming',
      };
      addMessage(assistantMessage);

      setIsStreaming(true, assistantMsgId);
      setStatus('analyzing', `DIYA is analyzing request: "${prompt.slice(0, 35)}..."`);
      setCurrentTask(`Synthesizing marketing plan for "${prompt.slice(0, 30)}..."`);

      abortControllerRef.current = new AbortController();

      try {
        await diyaService.sendMessageStream(
          prompt,
          selectedLanguage,
          (accumulatedText) => {
            updateMessage(assistantMsgId, {
              content: accumulatedText,
              blocks: [{ type: 'text', text: accumulatedText }],
            });
          },
          (finalBlocks) => {
            updateMessage(assistantMsgId, {
              blocks: finalBlocks,
              status: 'complete',
            });
            setIsStreaming(false, null);

            // If reply contains plan with approval steps, set status to awaiting_approval
            const hasApproval = finalBlocks.some(
              (b) =>
                (b.type === 'plan' && b.plan.steps.some((s) => s.requiresApproval)) ||
                b.type === 'approval'
            );

            if (hasApproval) {
              setStatus('awaiting_approval', 'Operational plan generated — awaiting your review');
              setTodaySummary({ tasksAwaitingApproval: todaySummary.tasksAwaitingApproval + 1 });
            } else {
              setStatus('optimizing', 'Continuous marketing workforce monitoring active');
            }
          },
          abortControllerRef.current.signal
        );
      } catch (err: unknown) {
        setIsStreaming(false, null);
        setStatus('idle', 'DIYA is ready for your next instruction');
        const errorText = err instanceof Error ? err.message : 'Failed to generate response.';
        updateMessage(assistantMsgId, {
          status: 'error',
          blocks: [{ type: 'text', text: `An error occurred: ${errorText}` }],
        });
        addToast(errorText, 'danger');
      }
    },
    [
      isStreaming,
      selectedLanguage,
      addMessage,
      setIsStreaming,
      setStatus,
      setCurrentTask,
      updateMessage,
      setTodaySummary,
      todaySummary.tasksAwaitingApproval,
      addToast,
    ]
  );

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false, null);
      setStatus('idle', 'Response stopped by user');
    }
  }, [setIsStreaming, setStatus]);

  const handleApprovePlan = useCallback(
    async (planId: string, financialAmountINR?: number) => {
      // High-impact confirmation modal
      const request: ApprovalRequest = {
        id: `appr-${planId}`,
        actionTitle: 'Authorize Marketing Campaign Plan',
        description:
          'This will authorize DIYA to configure ad sets and schedule assets. Any ad spend is capped at the allocated budget.',
        financialImpactINR: financialAmountINR || 14000,
        riskLevel: 'high',
        status: 'pending',
      };

      openApprovalModal(request, async () => {
        closeApprovalModal();
        approveEntirePlan(planId);
        setStatus('creating', 'DIYA is assembling ad sets and pushing draft campaigns');
        addToast('Plan approved. Tasks queued for execution.', 'success');
        setTodaySummary({
          tasksCompleted: todaySummary.tasksCompleted + 1,
          tasksAwaitingApproval: Math.max(0, todaySummary.tasksAwaitingApproval - 1),
        });
        await diyaService.approvePlan(planId);
      });
    },
    [
      openApprovalModal,
      closeApprovalModal,
      approveEntirePlan,
      setStatus,
      addToast,
      setTodaySummary,
      todaySummary,
    ]
  );

  const handleRejectPlan = useCallback(
    async (planId: string) => {
      rejectEntirePlan(planId);
      setStatus('idle', 'Plan rejected — DIYA is ready for revised instructions');
      addToast('Plan dismissed. Feel free to give DIYA new parameters.', 'info');
      setTodaySummary({
        tasksAwaitingApproval: Math.max(0, todaySummary.tasksAwaitingApproval - 1),
      });
      await diyaService.rejectPlan(planId);
    },
    [rejectEntirePlan, setStatus, addToast, setTodaySummary, todaySummary]
  );

  return {
    messages,
    isStreaming,
    streamingMessageId,
    selectedLanguage,
    setSelectedLanguage,
    sendMessage,
    stopStreaming,
    approvePlanStep,
    rejectPlanStep,
    handleApprovePlan,
    handleRejectPlan,
  };
}
