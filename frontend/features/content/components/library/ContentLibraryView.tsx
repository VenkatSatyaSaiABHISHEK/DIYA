'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, BookOpen, Layers, Shield, Copy, Check } from 'lucide-react';
import { mockHookTemplates } from '../../mocks';
import { useContentStore } from '../../store/content.store';
import type { HookTemplate } from '../../types';

interface ContentLibraryViewProps {
  onSelectHookForStudio: (hookText: string) => void;
}

export const ContentLibraryView: React.FC<ContentLibraryViewProps> = ({
  onSelectHookForStudio,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (hook: HookTemplate) => {
    navigator.clipboard.writeText(hook.hookText);
    setCopiedId(hook.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Brand Guidelines Card */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <h3 className="text-sm font-bold text-[#18181B]">Brand Knowledge & Guidelines Active</h3>
          </div>
          <p className="text-xs text-[#71717A]">
            DIYA AI synthesizes all copy adhering to your verified brand persona and compliance rules.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 font-semibold flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#7C3AED]" />
            #7C3AED Royal Purple
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-800 font-semibold">
            Geist Font
          </div>
        </div>
      </div>

      {/* Hooks Grid Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#18181B] flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#7C3AED]" />
            High-Converting Hook Matrix
          </h2>
          <p className="text-xs text-[#71717A] mt-0.5">
            Proven frameworks tested for Indian real estate, SaaS, and luxury lifestyle marketing
          </p>
        </div>
      </div>

      {/* Hooks Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockHookTemplates.map((hook) => {
          const isCopied = copiedId === hook.id;
          return (
            <div
              key={hook.id}
              className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs hover:border-[#7C3AED]/40 hover:shadow-md transition-all flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200 uppercase tracking-wider">
                    {hook.category.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] font-bold text-[#7C3AED] flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Score {hook.performanceScore}/100
                  </span>
                </div>

                <p className="text-xs font-semibold text-[#18181B] leading-relaxed">
                  &ldquo;{hook.hookText}&rdquo;
                </p>

                <div className="text-[11px] text-[#71717A] bg-[#FAFAFA] p-2 rounded-lg border border-[#F4F4F5]">
                  <strong className="text-zinc-600">Framework:</strong> {hook.framework}
                </div>
              </div>

              <div className="pt-3 border-t border-[#F4F4F5] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(hook)}
                  className="inline-flex items-center gap-1 text-xs text-[#71717A] hover:text-[#18181B]"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Hook</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onSelectHookForStudio(hook.hookText)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] shadow-xs transition-all"
                >
                  <span>Use in Studio</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
