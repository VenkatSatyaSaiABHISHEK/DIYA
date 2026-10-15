'use client';

import React from 'react';
import { Sparkles, ArrowRight, Zap, AlertTriangle, Layers } from 'lucide-react';
import type { SeoRecommendation, SeoSubTab } from '../../types';

interface SeoRecommendationsProps {
  recommendations: SeoRecommendation[];
  onNavigateTab: (tab: SeoSubTab) => void;
}

export const SeoRecommendations: React.FC<SeoRecommendationsProps> = ({
  recommendations,
  onNavigateTab,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#18181B] flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#7C3AED]" />
          DIYA SEO Intelligence & High-Impact Opportunities
        </h3>
        <span className="text-xs text-[#71717A]">
          Autonomous search rankings recommendations
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((rec) => {
          return (
            <div
              key={rec.id}
              className="bg-white rounded-2xl border border-[#E4E4E7] p-4.5 shadow-xs flex flex-col justify-between gap-3 hover:border-[#7C3AED]/40 hover:shadow-sm transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200 uppercase tracking-wide">
                    {rec.category.replace('_', ' ')}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    <Zap className="h-3 w-3" />
                    {rec.impact}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[#18181B] leading-snug">{rec.title}</h4>
                <p className="text-xs text-[#71717A] leading-relaxed">{rec.description}</p>
              </div>

              <div className="pt-2 border-t border-[#F4F4F5]">
                <button
                  type="button"
                  onClick={() => {
                    if (rec.category === 'metadata_missing' || rec.category === 'schema_opportunity') {
                      onNavigateTab('pages');
                    } else {
                      onNavigateTab('keywords');
                    }
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100/80 text-[#7C3AED] text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{rec.actionLabel}</span>
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
