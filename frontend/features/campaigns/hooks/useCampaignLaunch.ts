'use client';

import { useState, useCallback } from 'react';
import { useCampaignsStore } from '../store/campaigns.store';
import { campaignsService } from '../services/campaigns.service';
import { useUIStore } from '@/store/ui.store';
import type { LaunchDraft } from '../types';

export function useCampaignLaunch() {
  const {
    launchDraft,
    updateLaunchDraft,
    setLaunchStep,
    resetLaunchDraft,
    setActiveTab,
  } = useCampaignsStore();

  const { addToast } = useUIStore();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = useCallback(() => {
    if (launchDraft.currentStep < 6) {
      setLaunchStep(launchDraft.currentStep + 1);
    }
  }, [launchDraft.currentStep, setLaunchStep]);

  const prevStep = useCallback(() => {
    if (launchDraft.currentStep > 1) {
      setLaunchStep(launchDraft.currentStep - 1);
    }
  }, [launchDraft.currentStep, setLaunchStep]);

  const jumpToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= 6) {
        setLaunchStep(step);
      }
    },
    [setLaunchStep]
  );

  const handleLaunchSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await campaignsService.launchCampaign(
        'new-campaign',
        launchDraft.budget.amountINR
      );
      addToast(res.message, 'info');
      setIsConfirmModalOpen(false);
      resetLaunchDraft();
      setActiveTab('all');
    } catch {
      addToast('Failed to process launch simulation.', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    launchDraft,
    updateLaunchDraft,
    currentStep: launchDraft.currentStep,
    nextStep,
    prevStep,
    jumpToStep,
    resetLaunchDraft,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    isSubmitting,
    handleLaunchSubmit,
  };
}
