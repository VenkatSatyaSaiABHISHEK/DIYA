import { useState } from 'react';
import { useContentStore } from '../store/content.store';
import { contentService } from '../services/content.service';
import type { ContentPost } from '../types';

export function useContentGenerator(onSuccessSchedule?: (post: ContentPost) => void) {
  const {
    generatorBrief,
    updateBrief,
    isGenerating,
    setIsGenerating,
    generationStep,
    generationStepLabel,
    setGenerationStep,
    generatedResult,
    setGeneratedResult,
    activePreviewSlideIndex,
    setActivePreviewSlideIndex,
  } = useContentStore();

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [scheduleNotice, setScheduleNotice] = useState<string | null>(null);

  const generate = async () => {
    setIsGenerating(true);
    setGeneratedResult(null);

    const steps = [
      { step: 1, label: 'Analyzing target audience persona & Hyderabad market intent...' },
      { step: 2, label: 'Synthesizing retention-optimized hooks & contrarian angles...' },
      { step: 3, label: 'Generating slide-by-slide narrative, visual cues & audio prompts...' },
      { step: 4, label: 'Applying brand kit aesthetics, localized hashtags & CTA...' },
    ];

    try {
      for (const s of steps) {
        setGenerationStep(s.step, s.label);
        await new Promise((r) => setTimeout(r, 450));
      }

      const result = await contentService.generateContent(generatorBrief);
      setGeneratedResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleScheduleGenerated = async () => {
    if (!generatedResult) return;
    try {
      const scheduled = await contentService.reschedulePost(
        generatedResult.id,
        '2026-10-20T14:00:00.000Z'
      );
      setScheduleNotice('Demo mode: Post added to October publishing calendar.');
      setTimeout(() => setScheduleNotice(null), 4000);
      if (onSuccessSchedule) onSuccessSchedule(scheduled);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExport = (format: 'png' | 'pdf' | 'text') => {
    setExportNotice(
      `Demo mode: Export as ${format.toUpperCase()} is simulated. No files were written to disk.`
    );
    setTimeout(() => {
      setExportNotice(null);
      setIsExportModalOpen(false);
    }, 2800);
  };

  return {
    generatorBrief,
    updateBrief,
    isGenerating,
    generationStep,
    generationStepLabel,
    generatedResult,
    activePreviewSlideIndex,
    setActivePreviewSlideIndex,
    generate,
    handleScheduleGenerated,
    isExportModalOpen,
    setIsExportModalOpen,
    exportNotice,
    scheduleNotice,
    handleExport,
  };
}
