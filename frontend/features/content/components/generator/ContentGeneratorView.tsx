'use client';

import React from 'react';
import {
  Sparkles,
  Layers,
  Play,
  Share2,
  Calendar,
  Download,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Sliders,
  AlertCircle,
} from 'lucide-react';
import { useContentGenerator } from '../../hooks/useContentGenerator';
import { CHANNELS, FORMATS, LANGUAGES, TONES, OBJECTIVES } from '../../constants';
import { Modal } from '@/components/ui/Modal';
import type { ContentChannel, ContentFormat, ContentLanguage, ContentTone } from '../../types';

interface ContentGeneratorViewProps {
  onSuccessSchedule?: () => void;
}

export const ContentGeneratorView: React.FC<ContentGeneratorViewProps> = ({
  onSuccessSchedule,
}) => {
  const {
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
  } = useContentGenerator();

  return (
    <div className="space-y-6">
      {/* 2-Panel Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Panel: Creative Brief (5 Columns) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs space-y-4">
          <div className="border-b border-[#F4F4F5] pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#18181B] flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#7C3AED]" />
                Creative Synthesis Brief
              </h2>
              <p className="text-xs text-[#71717A] mt-0.5">
                AI crafts retention-optimized copies & scene breakdowns
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200">
              Demo Studio
            </span>
          </div>

          {/* Topic / Prompt */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#18181B]">Topic & Value Angle</label>
            <textarea
              rows={2}
              value={generatorBrief.topic}
              onChange={(e) => updateBrief({ topic: e.target.value })}
              placeholder="e.g. Why Kokapet luxury villas beat Gachibowli in 2026..."
              className="w-full text-xs p-3 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
          </div>

          {/* Format Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#18181B]">Content Format</label>
            <div className="grid grid-cols-2 gap-2">
              {FORMATS.slice(0, 4).map((f) => {
                const isActive = generatorBrief.format === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => updateBrief({ format: f.id })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'border-[#7C3AED] bg-purple-50/60 text-[#7C3AED] ring-1 ring-[#7C3AED]'
                        : 'border-[#E4E4E7] bg-white text-[#71717A] hover:bg-zinc-50'
                    }`}
                  >
                    <span className="block text-xs font-bold text-[#18181B]">{f.label}</span>
                    <span className="block text-[10px] text-[#71717A] line-clamp-1 mt-0.5">
                      {f.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Channel Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#18181B]">Target Channel</label>
            <div className="flex flex-wrap gap-2">
              {CHANNELS.map((c) => {
                const isActive = generatorBrief.channel === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => updateBrief({ channel: c.id as ContentChannel })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      isActive
                        ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-2xs'
                        : 'bg-white text-[#71717A] border-[#E4E4E7] hover:bg-zinc-50'
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language & Tone */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#18181B]">Language</label>
              <select
                value={generatorBrief.language}
                onChange={(e) => updateBrief({ language: e.target.value as ContentLanguage })}
                className="w-full text-xs p-2 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label} ({l.subLabel})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#18181B]">Tone of Voice</label>
              <select
                value={generatorBrief.tone}
                onChange={(e) => updateBrief({ tone: e.target.value as ContentTone })}
                className="w-full text-xs p-2 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
              >
                {TONES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Persona & Signature CTA */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#18181B]">Target Audience Persona</label>
            <input
              type="text"
              value={generatorBrief.targetPersona}
              onChange={(e) => updateBrief({ targetPersona: e.target.value })}
              placeholder="e.g. HNW Tech Executives & NRIs"
              className="w-full text-xs p-2.5 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#18181B]">Signature Call to Action</label>
            <input
              type="text"
              value={generatorBrief.signatureCta}
              onChange={(e) => updateBrief({ signatureCta: e.target.value })}
              placeholder='e.g. DM "KOKAPET" for floor plans'
              className="w-full text-xs p-2.5 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
            />
          </div>

          {/* Generate Button */}
          <button
            type="button"
            disabled={isGenerating || !generatorBrief.topic.trim()}
            onClick={generate}
            className="w-full py-3 px-4 rounded-xl bg-[#7C3AED] text-white text-xs font-bold hover:bg-[#6D28D9] shadow-sm disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            {isGenerating ? 'Synthesizing with DIYA...' : 'Generate Multi-Format Content'}
          </button>
        </div>

        {/* Right Panel: Output & Live Interactive Canvas (7 Columns) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs space-y-4">
          <div className="border-b border-[#F4F4F5] pb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-[#18181B] flex items-center gap-1.5">
              <Share2 className="h-4 w-4 text-[#7C3AED]" />
              Generated Asset Canvas
            </span>
            <span className="text-[11px] text-[#71717A]">
              Preview Only • No automated publishing
            </span>
          </div>

          {/* Banner */}
          <div className="p-3 bg-purple-50/70 border border-purple-200/80 rounded-xl text-xs text-purple-900 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-[#7C3AED] shrink-0" />
            <span>
              <strong>Demo content:</strong> sample structured data synthesized for testing. Not a
              live AI model.
            </span>
          </div>

          {/* Generating Progress State */}
          {isGenerating && (
            <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-4">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-[#7C3AED] animate-pulse">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#18181B]" aria-live="polite">
                  Step {generationStep} of 4: {generationStepLabel}
                </p>
                <div className="w-48 h-1.5 bg-zinc-200 rounded-full mx-auto overflow-hidden">
                  <div
                    className="h-full bg-[#7C3AED] transition-all duration-300"
                    style={{ width: `${(generationStep / 4) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Empty Prompt State before Generation */}
          {!isGenerating && !generatedResult && (
            <div className="p-12 text-center rounded-2xl bg-zinc-50/50 border border-dashed border-[#E4E4E7] space-y-2">
              <Sparkles className="h-8 w-8 text-[#A1A1AA] mx-auto" />
              <h3 className="text-xs font-bold text-[#18181B]">No Content Generated Yet</h3>
              <p className="text-[11px] text-[#71717A] max-w-sm mx-auto">
                Configure your brief on the left and click &ldquo;Generate Multi-Format Content&rdquo; to
                synthesize carousels, reel scripts, or caption matrices.
              </p>
            </div>
          )}

          {/* Generated Result Canvas */}
          {!isGenerating && generatedResult && (
            <div className="space-y-4">
              {/* Canvas Device Preview */}
              <div className="rounded-2xl border border-[#E4E4E7] bg-[#18181B] text-white overflow-hidden shadow-xs">
                <div className="p-3 border-b border-white/10 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#A78BFA]">
                    {generatedResult.channel.toUpperCase()} • {generatedResult.format.toUpperCase()}
                  </span>
                  {generatedResult.carouselSlides && (
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400 text-xs">
                        Slide {activePreviewSlideIndex + 1} of{' '}
                        {generatedResult.carouselSlides.length}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={activePreviewSlideIndex === 0}
                          onClick={() => setActivePreviewSlideIndex(activePreviewSlideIndex - 1)}
                          className="p-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-20"
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={
                            activePreviewSlideIndex ===
                            generatedResult.carouselSlides.length - 1
                          }
                          onClick={() => setActivePreviewSlideIndex(activePreviewSlideIndex + 1)}
                          className="p-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-20"
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Box */}
                <div className="p-6 min-h-[220px] flex flex-col justify-center items-center text-center bg-linear-to-b from-[#27272A] to-[#18181B] relative">
                  {generatedResult.carouselSlides ? (
                    <div className="max-w-md space-y-3">
                      <span className="text-[10px] uppercase tracking-widest text-[#A78BFA] font-bold">
                        Card {activePreviewSlideIndex + 1}
                      </span>
                      <h3 className="text-base font-bold text-white">
                        {generatedResult.carouselSlides[activePreviewSlideIndex]?.title}
                      </h3>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {generatedResult.carouselSlides[activePreviewSlideIndex]?.body}
                      </p>
                      {generatedResult.carouselSlides[activePreviewSlideIndex]?.bulletPoints && (
                        <ul className="text-left text-xs text-zinc-300 space-y-1 mt-2 inline-block">
                          {generatedResult.carouselSlides[
                            activePreviewSlideIndex
                          ]?.bulletPoints?.map((bp, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                              {bp}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : generatedResult.reelScript ? (
                    <div className="w-full text-left space-y-2 max-h-56 overflow-y-auto pr-1">
                      {generatedResult.reelScript.map((scene, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1"
                        >
                          <div className="text-[11px] font-bold text-[#A78BFA]">
                            {scene.timecode} • {scene.phase}
                          </div>
                          <p className="text-white">&ldquo;{scene.spokenAudio}&rdquo;</p>
                          <p className="text-zinc-400 text-[10px]">Visual: {scene.visualCue}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="max-w-md space-y-2">
                      <h3 className="text-base font-bold text-white">{generatedResult.title}</h3>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {generatedResult.caption}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Caption Inspector */}
              <div className="p-3.5 bg-[#FAFAFA] rounded-xl border border-[#E4E4E7] space-y-2 text-xs">
                <span className="font-semibold text-[#18181B] block">Generated Primary Copy</span>
                <p className="text-[#71717A] whitespace-pre-line leading-relaxed">
                  {generatedResult.caption}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {generatedResult.hashtags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Success Notification if Scheduled */}
              {scheduleNotice && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center">
                  {scheduleNotice}
                </div>
              )}

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsExportModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl border border-[#E4E4E7] text-xs font-semibold text-[#18181B] hover:bg-zinc-50 flex items-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export Asset
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleScheduleGenerated}
                    className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] shadow-xs flex items-center gap-1.5 transition-all"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Add to Calendar (Demo)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Demo Export Modal */}
      {isExportModalOpen && (
        <Modal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          title="Export Creative Package"
          description="Download synthesized asset files for social media distribution"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {(['png', 'pdf', 'text'] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => handleExport(fmt)}
                  className="p-4 rounded-xl border border-[#E4E4E7] hover:border-[#7C3AED] hover:bg-purple-50/40 text-center transition-all group"
                >
                  <span className="block text-xs font-bold text-[#18181B] group-hover:text-[#7C3AED] uppercase">
                    {fmt}
                  </span>
                  <span className="text-[10px] text-[#71717A] mt-1 block">
                    {fmt === 'png' ? 'Images' : fmt === 'pdf' ? 'Carousel' : 'Copy'}
                  </span>
                </button>
              ))}
            </div>

            {exportNotice && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs font-medium text-center">
                {exportNotice}
              </div>
            )}

            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-[11px] text-zinc-500">
              Demo mode: export is not available yet. No files were written to disk.
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#E4E4E7] text-xs font-semibold text-[#71717A]"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
