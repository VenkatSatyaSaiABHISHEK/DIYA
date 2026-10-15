'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Zap, Sliders, Shield } from 'lucide-react';

interface FeatureCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  badge: string;
  metrics: { label: string; value: string }[];
  bulletPoints: string[];
}

const FEATURES: FeatureCard[] = [
  {
    id: 'launch',
    tag: '⚡ SPEED TO MARKET',
    title: 'From Prompt to Live Ad Flights in 15 Minutes',
    description:
      'Describe your target audience and goal. DIYA conducts competitor research, creates 3 visual variants, writes copy, and prepares the campaign flight for review.',
    badge: '15 min deployment',
    metrics: [
      { label: 'Setup Time', value: '3 mins' },
      { label: 'Creative Generation', value: '45 secs' },
      { label: 'Quality Score', value: '9.8 / 10' },
    ],
    bulletPoints: [
      'Automatic HNI audience targeting based on historical conversions',
      'High-CTR copy generation with localized city references',
      'Zero agency coordination or delayed review meetings',
    ],
  },
  {
    id: 'optimize',
    tag: '🎯 ROAS PROTECTION',
    title: 'Autonomous A/B Testing & Fatigue Detection',
    description:
      'Never let ad fatigue drain your marketing budget. DIYA continuously monitors click-through decay and automatically swaps underperforming creatives.',
    badge: '24/7 Autonomy',
    metrics: [
      { label: 'Average ROAS', value: '4.8x' },
      { label: 'CPL Reduction', value: '-24%' },
      { label: 'Wasted Spend', value: '₹0' },
    ],
    bulletPoints: [
      'Proactive creative refresh before CPC spikes occur',
      'Dynamic budget shift to high-velocity conversion flights',
      'Direct WhatsApp alerts when critical milestones are met',
    ],
  },
  {
    id: 'leads',
    tag: '🚀 LEAD ROUTING',
    title: 'Instant WhatsApp Qualification & CRM Sync',
    description:
      'Inbound leads from Meta & Google forms are verified via WhatsApp within 60 seconds, screened for intent and budget, and routed directly to your sales reps.',
    badge: '60s Response',
    metrics: [
      { label: 'Lead Verification', value: '94%' },
      { label: 'Response Velocity', value: '< 60 secs' },
      { label: 'Qualified Ratio', value: '3.2x higher' },
    ],
    bulletPoints: [
      'Zero manual spreadsheet data entry or lost opportunities',
      'Automated reminder sequencing for scheduled site visits',
      'Real-time lead scoring tied back to ad flight attribution',
    ],
  },
];

export const FeatureTabs: React.FC = () => {
  const [activeId, setActiveId] = useState(FEATURES[0].id);
  const activeFeature = FEATURES.find((f) => f.id === activeId) || FEATURES[0];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFC] select-none border-t border-zinc-100">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Zap className="h-3.5 w-3.5 text-purple-600" />
            <span>Built for High Growth</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950">
            Built to make marketing simpler and faster.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            Focus on closing deals and scaling your enterprise while DIYA handles production, pacing, and optimization.
          </p>
        </div>

        {/* 3 Interactive Cards (Matching Section 4 in reference screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const isActive = activeId === feature.id;
            return (
              <div
                key={feature.id}
                onClick={() => setActiveId(feature.id)}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left ${
                  isActive
                    ? 'bg-white border-2 border-purple-500 shadow-[0_16px_40px_rgba(124,58,237,0.12)] -translate-y-1.5'
                    : 'bg-white/80 hover:bg-white border border-zinc-200/90 hover:border-purple-300 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                      {feature.tag}
                    </span>
                    <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="font-sans text-lg font-bold text-zinc-950 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Metrics Mini-Strip */}
                <div className="mt-6 pt-5 border-t border-zinc-100 grid grid-cols-3 gap-2 text-center">
                  {feature.metrics.map((m) => (
                    <div key={m.label} className="p-2 rounded-xl bg-zinc-50 border border-zinc-100">
                      <span className="block text-xs font-bold text-zinc-950">{m.value}</span>
                      <span className="block text-[9px] text-zinc-500 truncate mt-0.5">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureTabs;
