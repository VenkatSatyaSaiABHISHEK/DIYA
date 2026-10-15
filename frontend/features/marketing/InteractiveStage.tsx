'use client';

import React, { useState } from 'react';
import { AIOrb } from '@/components/brand/AIOrb';
import {
  Megaphone,
  FileText,
  Search,
  Users,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const TABS = [
  { id: 'ads', label: 'Meta & Google Ads', icon: Megaphone },
  { id: 'content', label: 'Content Studio', icon: FileText },
  { id: 'seo', label: 'SEO Audit', icon: Search },
  { id: 'funnel', label: 'Lead Funnel', icon: Users },
];

export const InteractiveStage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ads');

  return (
    <section id="platform" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white select-none overflow-hidden">
      {/* Background Soft Horizon Mist */}
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(232, 121, 249, 0.2) 50%, transparent 80%)',
        }}
      />

      <div className="max-w-5xl mx-auto space-y-10 text-center">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Sparkles className="h-3.5 w-3.5 text-purple-600" />
            <span>Unified Production Environment</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950">
            Everything your team needs to move work forward.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto">
            Switch effortlessly between ad scaling, creative drafts, organic keyword auditing, and verified leads.
          </p>
        </div>

        {/* Centered Pill Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#7C3AED] text-white shadow-md shadow-purple-600/25 scale-105'
                    : 'bg-zinc-100/90 text-zinc-700 hover:bg-zinc-200/80 hover:text-zinc-950'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Center Stage Card */}
        <div className="relative rounded-3xl bg-white border border-zinc-200 shadow-[0_20px_60px_rgba(124,58,237,0.1)] p-6 sm:p-10 text-left min-h-[380px] flex flex-col justify-between overflow-hidden">
          {activeTab === 'ads' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 gap-2">
                <div>
                  <h4 className="font-sans text-lg font-bold text-zinc-950">
                    Active Flight Pacing: Hyderabad Sky Villas
                  </h4>
                  <span className="text-xs text-zinc-500">
                    Dual flight on Meta Feed &amp; Google Search • High intent buyer targeting
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    ● Pacing Optimal
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                  <span className="text-[11px] text-zinc-500 font-medium">Daily Budget</span>
                  <span className="block text-2xl font-bold text-zinc-900 mt-1">₹15,000</span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">
                    +15% scale authorized
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                  <span className="text-[11px] text-zinc-500 font-medium">Cost Per Lead</span>
                  <span className="block text-2xl font-bold text-zinc-900 mt-1">₹312</span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">
                    -28% vs city benchmark
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                  <span className="text-[11px] text-zinc-500 font-medium">Predicted ROAS</span>
                  <span className="block text-2xl font-bold text-zinc-900 mt-1">5.2x</span>
                  <span className="text-[10px] text-purple-700 font-semibold mt-0.5 block">
                    Festive weekend velocity
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div>
                  <h4 className="font-sans text-lg font-bold text-zinc-950">
                    Content &amp; Creative Studio
                  </h4>
                  <span className="text-xs text-zinc-500">
                    Auto-generated captions, hooks, and localized video scripts
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                  3 Variants Ready
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                  <span className="text-[11px] font-bold text-purple-700">Variant A • Hook 1</span>
                  <p className="text-xs text-zinc-800 italic leading-relaxed">
                    &ldquo;Only 12 families will call this private plunge pool sanctuary home in Gachibowli. Book your private preview.&rdquo;
                  </p>
                  <span className="text-[10px] text-zinc-500 block">Estimated CTR: 4.8%</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                  <span className="text-[11px] font-bold text-purple-700">Variant B • Festive Special</span>
                  <p className="text-xs text-zinc-800 italic leading-relaxed">
                    &ldquo;This festive season, elevate your lifestyle with 360-degree skyline views and ultra-luxurious private clubhouse amenities.&rdquo;
                  </p>
                  <span className="text-[10px] text-zinc-500 block">Estimated CTR: 5.2%</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div>
                  <h4 className="font-sans text-lg font-bold text-zinc-950">
                    Organic Ranking &amp; Keyword Health
                  </h4>
                  <span className="text-xs text-zinc-500">
                    Continuous site crawling and automated search indexing
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  SEO Score: 92/100
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  '18 High-intent property keywords ranked in Top 5 SERP',
                  'Core Web Vitals passed with LCP of 1.2s across all landing pages',
                  'Schema markup for luxury real estate structured successfully',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs text-zinc-700 p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'funnel' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div>
                  <h4 className="font-sans text-lg font-bold text-zinc-950">
                    WhatsApp Lead Verification Funnel
                  </h4>
                  <span className="text-xs text-zinc-500">
                    60-second automated response with verified HNI lead qualification
                  </span>
                </div>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                  94% Verification Rate
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                  <span className="text-[11px] text-zinc-500">Impressions</span>
                  <span className="block text-xl font-bold text-zinc-900 mt-1">42,500</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                  <span className="text-[11px] text-zinc-500">Clicks</span>
                  <span className="block text-xl font-bold text-zinc-900 mt-1">3,820</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                  <span className="text-[11px] text-zinc-500">Leads</span>
                  <span className="block text-xl font-bold text-zinc-900 mt-1">284</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200">
                  <span className="text-[11px] text-purple-700 font-semibold">Verified Buyers</span>
                  <span className="block text-xl font-bold text-purple-900 mt-1">86</span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Card Bar */}
          <div className="pt-6 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
            <span className="flex items-center gap-2">
              <AIOrb status="running" size={20} speed={1.2} />
              <span>DIYA Autonomous Engine Active</span>
            </span>
            <span className="font-mono text-purple-700 font-semibold">
              Live Preview
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveStage;
