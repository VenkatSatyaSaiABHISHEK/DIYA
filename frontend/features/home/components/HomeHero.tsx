'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AIOrb } from '@/components/brand/AIOrb';
import { useAIStatusStore } from '@/store/ai-status.store';
import { ArrowRight, Sparkles, Send } from 'lucide-react';
import type { HomeMetricsData } from '../types';

export interface HomeHeroProps {
  metrics: HomeMetricsData | null;
  userName?: string;
}

const SUGGESTIONS = [
  'Why did CPL drop 5.4%?',
  'Draft 3 festive hooks',
  'Scale top Meta ad set',
];

export const HomeHero: React.FC<HomeHeroProps> = ({
  metrics,
  userName = 'Abhishek',
}) => {
  const router = useRouter();
  const { status, statusLabel } = useAIStatusStore();
  const [query, setQuery] = useState('');

  const handleSearch = (textToSubmit?: string) => {
    const q = (textToSubmit ?? query).trim();
    if (!q) return;
    router.push(`/chat?q=${encodeURIComponent(q)}`);
  };

  const leadsChange = metrics?.metrics?.leadsGenerated?.changePercentage ?? 18.6;
  const cpl = metrics?.metrics?.costPerLead?.value ?? 176;

  return (
    <div className="relative overflow-hidden rounded-[20px] lg:rounded-[22px] bg-gradient-to-br from-[#160D27] via-[#240D3E] to-[#120722] border border-[#581C87]/45 shadow-[0_4px_24px_rgba(124,58,237,0.12)] px-5 sm:px-6 lg:px-7 py-4 lg:py-4.5 text-white h-[162px] max-h-[170px] flex items-center justify-between">
      {/* Interior Ambient Lighting */}
      <div className="absolute top-0 right-1/4 -mt-12 w-80 h-80 rounded-full bg-[#7C3AED]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-60 h-60 rounded-full bg-[#3B1277]/30 blur-2xl pointer-events-none" />

      {/* Left Column: Greeting, Insight, Glass Search + Chips on ONE row */}
      <div className="relative z-10 flex flex-col justify-between h-full flex-1 min-w-0 pr-4">
        {/* Row A: Status Tag */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-white border border-white/20 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Agent status • {statusLabel}
          </span>
          <span className="text-[11px] text-purple-200/90 font-medium truncate">
            Mentneo Realty
          </span>
        </div>

        {/* Row B: White Title (Geist Semibold 28px) & Single-line Insight */}
        <div className="my-0.5 min-w-0">
          <h1
            className="font-sans text-2xl lg:text-[28px] font-semibold !text-white tracking-tight leading-tight truncate"
            style={{ color: '#FFFFFF' }}
          >
            Good morning, {userName}.
          </h1>
          <p
            className="text-xs lg:text-[13px] font-normal truncate mt-0.5 leading-snug !text-white/80"
            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
          >
            Leads are up{' '}
            <strong className="font-semibold !text-white" style={{ color: '#FFFFFF' }}>
              {leadsChange > 0 ? `+${leadsChange}%` : `${leadsChange}%`}
            </strong>{' '}
            this week with an average{' '}
            <strong className="font-semibold text-emerald-300" style={{ color: '#6EE7B7' }}>
              ₹{cpl}
            </strong>{' '}
            CPL across active Meta &amp; Google ad flights.
          </p>
        </div>

        {/* Row C: Glass Input + 3 Short Chips on ONE row */}
        <div className="flex items-center gap-2.5 w-full min-w-0 pt-0.5">
          {/* Glass Search Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="relative flex items-center w-full max-w-sm sm:max-w-md h-8 sm:h-8.5 rounded-xl bg-white/10 hover:bg-white/[0.14] focus-within:bg-white/[0.18] border border-white/20 focus-within:border-white/45 backdrop-blur-md shadow-xs px-2 transition-all shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-300 ml-1 mr-2 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask DIYA anything..."
              className="w-full bg-transparent text-xs text-white placeholder:text-zinc-300/70 focus:outline-hidden font-normal"
            />
            <button
              type="submit"
              aria-label="Send message to DIYA"
              className="h-6 w-6 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-95 text-white flex items-center justify-center shrink-0 shadow-2xs transition-all cursor-pointer"
            >
              <Send className="h-3 w-3" />
            </button>
          </form>

          {/* 3 Short Suggestion Chips on ONE row (hide chips that don't fit) */}
          <div className="hidden md:flex items-center gap-1.5 overflow-hidden flex-nowrap shrink min-w-0">
            {SUGGESTIONS.map((item, idx) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSearch(item)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/10 hover:bg-white/20 text-zinc-100 border border-white/15 backdrop-blur-xs whitespace-nowrap transition-all hover:scale-[1.02] cursor-pointer shrink-0 ${
                  idx === 2 ? 'hidden xl:inline-flex' : ''
                }`}
              >
                <span>{item}</span>
                <ArrowRight className="h-2.5 w-2.5 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Signature DIYA AI Orb (130px) */}
      <div className="relative z-10 shrink-0 hidden sm:flex flex-col items-center justify-center">
        <AIOrb size={130} status={status} interactive />
      </div>
    </div>
  );
};
