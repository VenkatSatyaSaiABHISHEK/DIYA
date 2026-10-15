'use client';

import React, { useState } from 'react';
import { useAdStudio } from '../../hooks/useAdStudio';
import { StudioBriefPanel } from './StudioBriefPanel';
import { StudioCanvasPreview } from './StudioCanvasPreview';
import { StudioCopyPanel } from './StudioCopyPanel';
import { StudioExportModal } from './StudioExportModal';
import { Sparkles, Sliders, Eye, FileText, Info } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const AdStudioView: React.FC = () => {
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
  } = useAdStudio();

  // Mobile active panel toggle
  const [mobilePanel, setMobilePanel] = useState<'brief' | 'canvas' | 'copy'>('canvas');

  const isCurrentApproved = approvedVariationIds.length > 0;

  return (
    <div className="space-y-4">
      {/* Sample Demo Data Banner */}
      <div className="p-3 rounded-xl bg-violet-50/80 border border-violet-200 text-xs text-violet-950 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#7C3AED] shrink-0" />
          <span>
            <strong>AI Ad Studio Sandbox:</strong> Generated creative layouts, copy variants, and placements are synthesized from sample business parameters.
          </span>
        </div>
        <span className="text-[10px] font-bold text-[#7C3AED] uppercase bg-white px-2 py-0.5 rounded border border-violet-200 shrink-0 hidden sm:inline">
          Demo Content
        </span>
      </div>

      {/* Mobile Panel Switcher (< lg) */}
      <div className="lg:hidden flex items-center rounded-xl bg-[#F4F4F6] p-1 border border-[#E4E4E7]">
        {[
          { id: 'brief' as const, label: 'Creative Brief', icon: <Sliders className="h-3.5 w-3.5" /> },
          { id: 'canvas' as const, label: 'Ad Canvas', icon: <Eye className="h-3.5 w-3.5" /> },
          { id: 'copy' as const, label: 'Copy Matrix', icon: <FileText className="h-3.5 w-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMobilePanel(tab.id)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all',
              mobilePanel === tab.id
                ? 'bg-white text-[#7C3AED] shadow-2xs'
                : 'text-[#71717A] hover:text-[#18181B]'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Desktop 3-Panel Layout / Mobile Switcher */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Panel: Brief & Brand Kit (3 cols) */}
        <div
          className={cn(
            'lg:col-span-4 xl:col-span-3 lg:block',
            mobilePanel === 'brief' ? 'block' : 'hidden'
          )}
        >
          <StudioBriefPanel
            brief={studioBrief}
            onChange={updateStudioBrief}
            onGenerate={handleGenerateCreative}
            isGenerating={isGeneratingCreative}
            progressText={generationProgressText}
          />
        </div>

        {/* Center Panel: Device Canvas Preview (5 cols) */}
        <div
          className={cn(
            'lg:col-span-5 xl:col-span-5 lg:block',
            mobilePanel === 'canvas' ? 'block' : 'hidden'
          )}
        >
          <StudioCanvasPreview
            brief={studioBrief}
            selectedPlacement={selectedPlacement}
            onPlacementChange={setSelectedPlacement}
            headline={activeHeadline}
            onHeadlineChange={setActiveHeadline}
            primaryText={activePrimaryText}
            onPrimaryTextChange={setActivePrimaryText}
            cta={activeCta}
            isEditingInline={isEditingInline}
            onToggleInlineEdit={() => setIsEditingInline(!isEditingInline)}
            onRegenerate={handleGenerateCreative}
            onCreateMoreVariations={handleCreateMoreVariations}
            onOpenExportModal={() => setIsExportModalOpen(true)}
            isApproved={isCurrentApproved}
            onToggleApprove={() => toggleApproveVariation('var-1')}
          />
        </div>

        {/* Right Panel: Copy Matrix & Platform Specs (3 cols) */}
        <div
          className={cn(
            'lg:col-span-3 xl:col-span-4 lg:block',
            mobilePanel === 'copy' ? 'block' : 'hidden'
          )}
        >
          <StudioCopyPanel
            copy={generatedCopy}
            activeHeadline={activeHeadline}
            onSelectHeadline={setActiveHeadline}
            activePrimaryText={activePrimaryText}
            onSelectPrimaryText={setActivePrimaryText}
            activeCta={activeCta}
            onSelectCta={setActiveCta}
            approvedVariationIds={approvedVariationIds}
            onToggleApproveVariation={toggleApproveVariation}
          />
        </div>
      </div>

      {/* Export Simulation Modal */}
      <StudioExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        format={exportFormat}
        onFormatChange={setExportFormat}
        onExport={handleExport}
        isExporting={isExporting}
      />
    </div>
  );
};
