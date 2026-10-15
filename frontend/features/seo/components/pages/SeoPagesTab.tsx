'use client';

import React from 'react';
import {
  Globe,
  Smartphone,
  Laptop,
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  Code2,
} from 'lucide-react';
import { useSeoPages } from '../../hooks/useSeoPages';

export const SeoPagesTab: React.FC = () => {
  const {
    pages,
    selectedPageId,
    setSelectedPageId,
    activePage,
    updatePageMeta,
    deviceMode,
    setDeviceMode,
    titleLength,
    descriptionLength,
    titleStatus,
    descriptionStatus,
    handleGenerateAiMeta,
    handleSavePage,
    isSaving,
    saveNotice,
    isAiGenerating,
  } = useSeoPages();

  return (
    <div className="space-y-6">
      {/* 2-Column SERP Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Page Selector & Live Meta Editor (7 Columns) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs space-y-4">
          <div className="border-b border-[#F4F4F5] pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#18181B] flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#7C3AED]" />
                On-Page SERP & Metadata Editor
              </h2>
              <p className="text-xs text-[#71717A] mt-0.5">
                Optimize titles, descriptions, and rich snippet schemas for Google ranking
              </p>
            </div>
            <button
              type="button"
              disabled={isAiGenerating}
              onClick={handleGenerateAiMeta}
              className="px-3 py-1.5 rounded-xl bg-purple-50 text-[#7C3AED] hover:bg-purple-100 font-semibold text-xs transition-all flex items-center gap-1.5 border border-purple-200"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isAiGenerating ? 'Generating...' : 'DIYA Auto-Optimize'}</span>
            </button>
          </div>

          {/* Page Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#18181B]">Target Landing Page</label>
            <div className="flex flex-wrap gap-1.5">
              {pages.map((p) => {
                const isSelected = selectedPageId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPageId(p.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-2xs'
                        : 'bg-[#FAFAFA] text-[#71717A] border-[#E4E4E7] hover:bg-zinc-100'
                    }`}
                  >
                    <span>{p.pageName}</span>
                    <span className="ml-1.5 text-[10px] opacity-75">({p.seoScore}/100)</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title Tag Input */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#18181B]">
                Title Tag (`&lt;title&gt;`)
              </label>
              <div className="flex items-center gap-2 text-xs">
                <span className={`font-semibold ${titleStatus.color}`}>
                  {titleLength}/60 chars ({titleStatus.label})
                </span>
              </div>
            </div>
            <input
              type="text"
              value={activePage.title}
              onChange={(e) => updatePageMeta(activePage.id, { title: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
            <p className="text-[11px] text-[#71717A]">
              Google displays roughly 50 to 60 characters before truncating with an ellipsis.
            </p>
          </div>

          {/* Meta Description Textarea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#18181B]">Meta Description</label>
              <div className="flex items-center gap-2 text-xs">
                <span className={`font-semibold ${descriptionStatus.color}`}>
                  {descriptionLength}/160 chars ({descriptionStatus.label})
                </span>
              </div>
            </div>
            <textarea
              rows={3}
              value={activePage.metaDescription}
              onChange={(e) =>
                updatePageMeta(activePage.id, { metaDescription: e.target.value })
              }
              className="w-full text-xs p-3 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
            <div className="w-full bg-zinc-100 h-1 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  descriptionLength > 165
                    ? 'bg-red-500'
                    : descriptionLength > 140
                    ? 'bg-emerald-500'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min((descriptionLength / 160) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Schema & Canonical Tags Preview */}
          <div className="p-3.5 bg-[#FAFAFA] rounded-xl border border-[#E4E4E7] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#18181B] flex items-center gap-1.5">
                <Code2 className="h-4 w-4 text-[#7C3AED]" />
                Structured JSON-LD Schema
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                {activePage.schemaType}
              </span>
            </div>
            <p className="text-[11px] text-[#71717A] font-mono truncate">
              Canonical: {activePage.canonicalUrl}
            </p>
          </div>

          {/* Save Status Notice */}
          {saveNotice && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold text-center">
              {saveNotice}
            </div>
          )}

          {/* Save Button */}
          <div className="pt-2">
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSavePage}
              className="w-full py-2.5 px-4 rounded-xl bg-[#7C3AED] text-white text-xs font-bold hover:bg-[#6D28D9] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Applying to CMS...' : 'Save & Publish Meta Tags (Demo)'}
            </button>
          </div>
        </div>

        {/* Right: Live Google SERP Mockup Box (5 Columns) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs space-y-4">
          <div className="border-b border-[#F4F4F5] pb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-[#18181B]">Google Search Snippet Preview</span>

            {/* Desktop vs Mobile Toggle */}
            <div className="flex items-center gap-1 bg-[#F4F4F5] p-0.5 rounded-lg border border-[#E4E4E7]">
              <button
                type="button"
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 rounded text-xs transition-all ${
                  deviceMode === 'desktop'
                    ? 'bg-white text-[#18181B] shadow-2xs'
                    : 'text-[#71717A] hover:text-[#18181B]'
                }`}
                title="Google Desktop Search"
              >
                <Laptop className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('mobile')}
                className={`p-1.5 rounded text-xs transition-all ${
                  deviceMode === 'mobile'
                    ? 'bg-white text-[#18181B] shadow-2xs'
                    : 'text-[#71717A] hover:text-[#18181B]'
                }`}
                title="Google Mobile Search"
              >
                <Smartphone className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Google SERP Card Container */}
          <div
            className={`p-4 rounded-xl border border-[#E4E4E7] bg-white transition-all ${
              deviceMode === 'mobile' ? 'max-w-xs mx-auto shadow-sm' : ''
            }`}
          >
            {/* Google Search URL Bar */}
            <div className="flex items-center gap-2 mb-1.5 text-xs">
              <div className="h-5 w-5 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-700">
                G
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-[#202124] leading-none">
                  Mentneo Living
                </span>
                <span className="text-[10px] text-[#4d5156] font-mono leading-tight truncate">
                  {activePage.canonicalUrl}
                </span>
              </div>
            </div>

            {/* Title Link */}
            <h3 className="text-sm font-normal text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-2">
              {activePage.title || 'Untitled Page'}
            </h3>

            {/* Snippet Description */}
            <p className="text-xs text-[#4d5156] mt-1 leading-relaxed line-clamp-3">
              {activePage.metaDescription || 'No meta description provided for this URL.'}
            </p>

            {/* Rich Snippet schema pills */}
            <div className="mt-2.5 pt-2 border-t border-[#F4F4F5] flex items-center gap-2 text-[10px] text-[#71717A]">
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                ★ 4.9 (142 reviews)
              </span>
              <span>•</span>
              <span>RERA Registered</span>
            </div>
          </div>

          {/* SERP Quality Audit Tips */}
          <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 text-xs text-purple-900 space-y-2">
            <span className="font-bold flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />
              DIYA SERP Quality Score: {activePage.seoScore}/100
            </span>
            <ul className="text-[11px] text-purple-800 space-y-1 list-disc pl-4">
              <li>Primary local keyword included in first 35 characters</li>
              <li>Brand name appended for CTR recognition in Indian SERPs</li>
              <li>Clear intent hook to increase search click-through rate</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
