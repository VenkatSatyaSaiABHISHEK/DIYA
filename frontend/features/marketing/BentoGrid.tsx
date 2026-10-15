'use client';

import React from 'react';
import { AIOrb } from '@/components/brand/AIOrb';
import {
  Megaphone,
  Sparkles,
  Palette,
  Network,
  GitBranch,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

export const BentoGrid: React.FC = () => {
  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white select-none">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Sparkles className="h-3.5 w-3.5 text-purple-600" />
            <span>Autonomous Intelligence Suite</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950">
            One AI. Every marketing discipline.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto">
            Replace 5 fragmented tools and agency fees with an interconnected autonomous employee that never sleeps.
          </p>
        </div>

        {/* Bento Grid: 3 Top Row + 2 Bottom Row (Matching Unfold screenshot) */}
        <div className="space-y-6">
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Campaigns Cockpit */}
            <div className="rounded-3xl p-6 bg-zinc-50/70 hover:bg-white border border-zinc-200 hover:border-purple-300 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between h-96 group">
              <div>
                <div className="p-3 rounded-2xl bg-purple-100 text-purple-700 w-fit mb-4 group-hover:bg-[#7C3AED] group-hover:text-white transition-colors">
                  <Megaphone className="h-5 w-5" />
                </div>
                <h3 className="font-sans text-lg font-bold text-zinc-950">
                  Omnichannel Ad Optimization
                </h3>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                  Autonomous Meta &amp; Google ad flight pacing, auto bid capping, and real-time ROAS optimization.
                </p>
              </div>

              {/* UI Mini Graphic */}
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-zinc-800">Meta + Google ROAS</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 4.8x Active
                  </span>
                </div>
                <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 w-4/5" />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>Spend: ₹1.24L</span>
                  <span>Target: ₹1.5L</span>
                </div>
              </div>
            </div>

            {/* Card 2: Collaborative Agent Intelligence */}
            <div className="rounded-3xl p-6 bg-zinc-50/70 hover:bg-white border border-zinc-200 hover:border-purple-300 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between h-96 group">
              <div>
                <div className="p-3 rounded-2xl bg-purple-100 text-purple-700 w-fit mb-4 group-hover:bg-[#7C3AED] group-hover:text-white transition-colors">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-sans text-lg font-bold text-zinc-950">
                  Autonomous Core Intelligence
                </h3>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                  Chat with DIYA in plain English or regional languages to execute complex multi-step campaign strategies.
                </p>
              </div>

              {/* UI Mini Graphic with Glowing Orb */}
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center gap-4">
                <AIOrb status="analyzing" size={54} speed={1.2} />
                <div className="text-left">
                  <span className="text-xs font-bold text-zinc-900 block">DIYA Reasoning Core</span>
                  <span className="text-[10px] text-purple-700 font-mono block">
                    Synthesizing audience data...
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Creative & Copy Studio */}
            <div className="rounded-3xl p-6 bg-zinc-50/70 hover:bg-white border border-zinc-200 hover:border-purple-300 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between h-96 group">
              <div>
                <div className="p-3 rounded-2xl bg-purple-100 text-purple-700 w-fit mb-4 group-hover:bg-[#7C3AED] group-hover:text-white transition-colors">
                  <Palette className="h-5 w-5" />
                </div>
                <h3 className="font-sans text-lg font-bold text-zinc-950">
                  Creative &amp; Copy Generation
                </h3>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                  High-converting headline hooks, carousel graphics, festive video scripts, and A/B variations in seconds.
                </p>
              </div>

              {/* UI Mini Graphic */}
              <div className="p-3.5 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-800">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  <span>3 Ad Variants Ready for Review</span>
                </div>
                <div className="text-[11px] text-zinc-600 p-2 rounded-xl bg-purple-50/60 border border-purple-100 italic">
                  &ldquo;Exclusive 3 BHK Sky Villas overlooking the Hyderabad financial skyline...&rdquo;
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Wider Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 4: Connected Ecosystem */}
            <div className="rounded-3xl p-7 bg-zinc-50/70 hover:bg-white border border-zinc-200 hover:border-purple-300 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between min-h-[300px] group">
              <div>
                <div className="p-3 rounded-2xl bg-purple-100 text-purple-700 w-fit mb-4 group-hover:bg-[#7C3AED] group-hover:text-white transition-colors">
                  <Network className="h-5 w-5" />
                </div>
                <h3 className="font-sans text-xl font-bold text-zinc-950">
                  Integrated Marketing Ecosystem
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 mt-1.5 leading-relaxed max-w-md">
                  DIYA bridges Meta Ads, Google Ads, GA4, Search Console, and WhatsApp CRM into one seamless autonomous loop.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {['Meta Ads', 'Google Ads', 'GA4 Attribution', 'WhatsApp API', 'HubSpot CRM'].map(
                  (tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 shadow-2xs"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      {tool}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Card 5: Autonomous Workflow & Governance */}
            <div className="rounded-3xl p-7 bg-zinc-50/70 hover:bg-white border border-zinc-200 hover:border-purple-300 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between min-h-[300px] group">
              <div>
                <div className="p-3 rounded-2xl bg-purple-100 text-purple-700 w-fit mb-4 group-hover:bg-[#7C3AED] group-hover:text-white transition-colors">
                  <GitBranch className="h-5 w-5" />
                </div>
                <h3 className="font-sans text-xl font-bold text-zinc-950">
                  Autonomous Governance &amp; Budget Safety
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 mt-1.5 leading-relaxed max-w-md">
                  Strict human-in-the-loop controls. DIYA monitors campaign health 24/7, flags budget leaks, and requests 1-click consent.
                </p>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-zinc-950 block">Scale Meta Budget +₹15,000</span>
                  <span className="text-[10px] text-zinc-500">Projected: +42 Leads • ₹312 CAC</span>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 shadow-sm"
                >
                  Authorize 1-Click
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
