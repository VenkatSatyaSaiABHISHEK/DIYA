'use client';

import { useState, useCallback } from 'react';
import { useCampaignsStore } from '../store/campaigns.store';
import { campaignsService } from '../services/campaigns.service';
import { useUIStore } from '@/store/ui.store';
import type { StudioBrief, CreativeVariation } from '../types';

export function useAdStudio() {
  const {
    studioBrief,
    updateStudioBrief,
    generatedCopy,
    selectedPlacement,
    setSelectedPlacement,
    activeHeadline,
    setActiveHeadline,
    activePrimaryText,
    setActivePrimaryText,
    activeCta,
    setActiveCta,
    approvedVariationIds,
    toggleApproveVariation,
    isGeneratingCreative,
    generationProgressText,
    setIsGeneratingCreative,
    isExportModalOpen,
    setIsExportModalOpen,
  } = useCampaignsStore();

  const { addToast } = useUIStore();
  const [isEditingInline, setIsEditingInline] = useState(false);
  const [exportFormat, setExportFormat] = useState<'png' | 'mp4' | 'pdf' | 'text'>('png');
  const [isExporting, setIsExporting] = useState(false);

  // Generate creative demo flow
  const handleGenerateCreative = useCallback(async () => {
    setIsGeneratingCreative(true, 'Understanding creative brief & target audience...');

    setTimeout(() => {
      setIsGeneratingCreative(true, 'Synthesizing persuasive copy variations & hooks...');
    }, 600);

    setTimeout(() => {
      setIsGeneratingCreative(true, 'Designing layout structure & checking brand guidelines...');
    }, 1200);

    setTimeout(async () => {
      try {
        const copy = await campaignsService.generateCreative(studioBrief);
        if (copy.headlines[0]) setActiveHeadline(copy.headlines[0]);
        if (copy.primaryTexts[0]) setActivePrimaryText(copy.primaryTexts[0]);
        if (copy.callToActions[0]) setActiveCta(copy.callToActions[0]);
        addToast('New creative variations generated from your brief.', 'success');
      } catch {
        addToast('Failed to generate variations.', 'danger');
      } finally {
        setIsGeneratingCreative(false);
      }
    }, 1800);
  }, [
    studioBrief,
    setIsGeneratingCreative,
    setActiveHeadline,
    setActivePrimaryText,
    setActiveCta,
    addToast,
  ]);

  // Create additional variations
  const handleCreateMoreVariations = useCallback(async () => {
    setIsGeneratingCreative(true, 'Synthesizing 2 new copy angles...');
    try {
      await campaignsService.createVariations(activePrimaryText);
      addToast('Created 2 new variation angles.', 'info');
    } catch {
      addToast('Failed to create variations.', 'danger');
    } finally {
      setIsGeneratingCreative(false);
    }
  }, [activePrimaryText, setIsGeneratingCreative, addToast]);

  // Handle Export demo
  const handleExport = useCallback(async () => {
    setIsExporting(true);
    try {
      const res = await campaignsService.exportCreative('active-creative', exportFormat);
      addToast(res.message, 'info');
      setIsExportModalOpen(false);
    } catch {
      addToast('Export simulation error.', 'danger');
    } finally {
      setIsExporting(false);
    }
  }, [exportFormat, setIsExportModalOpen, addToast]);

  return {
    studioBrief,
    updateStudioBrief,
    generatedCopy,
    selectedPlacement,
    setSelectedPlacement,
    activeHeadline,
    setActiveHeadline,
    activePrimaryText,
    setActivePrimaryText,
    activeCta,
    setActiveCta,
    approvedVariationIds,
    toggleApproveVariation,
    isGeneratingCreative,
    generationProgressText,
    handleGenerateCreative,
    handleCreateMoreVariations,
    isEditingInline,
    setIsEditingInline,
    isExportModalOpen,
    setIsExportModalOpen,
    exportFormat,
    setExportFormat,
    isExporting,
    handleExport,
  };
}
