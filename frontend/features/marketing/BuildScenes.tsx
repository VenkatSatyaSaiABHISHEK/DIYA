'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  Sparkles,
  Layers,
  Calendar,
  Search,
  Filter,
  BarChart2,
  ArrowRight,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ensureScrollTrigger } from '@/lib/animations/scrollTrigger';
import { isReducedMotion } from '@/lib/animations/pageTransition';
import { animeCountUp, animeSvgLineDraw } from '@/lib/animations/animeHelpers';

export const BuildScenes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0); // 0 to 4
  const chartPathRef = useRef<SVGPathElement>(null);

  // Numeric count-up refs for Scene 5
  const spendRef = useRef<HTMLSpanElement>(null);
  const leadsRef = useRef<HTMLSpanElement>(null);
  const cplRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion()) return;
      ensureScrollTrigger();

      const el = containerRef.current;
      if (!el) return;

      const st = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=240%',
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            const index = Math.min(4, Math.floor(p * 5));
            setActiveScene(index);
          },
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: containerRef }
  );

  // Trigger anime.js animations when Scene 5 becomes active
  useEffect(() => {
    if (activeScene === 4) {
      if (chartPathRef.current) {
        animeSvgLineDraw(chartPathRef.current, { duration: 1100 });
      }
      if (spendRef.current) {
        animeCountUp(spendRef.current, 0, 124500, (n) => `₹${n.toLocaleString('en-IN')}`, 1000);
      }
      if (leadsRef.current) {
        animeCountUp(leadsRef.current, 0, 418, (n) => n.toLocaleString('en-IN'), 1000);
      }
      if (cplRef.current) {
        animeCountUp(cplRef.current, 0, 298, (n) => `₹${n}`, 1000);
      }
    }
  }, [activeScene]);

  const sceneTitles = [
    { label: 'Creative Assembly', icon: Layers },
    { label: 'Content Calendar', icon: Calendar },
    { label: 'SEO Audit Ring', icon: Search },
    { label: 'Lead Funnel', icon: Filter },
    { label: 'Performance ROI', icon: BarChart2 },
  ];

  return (
    <section
      id="build-scenes"
      ref={containerRef}
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center bg-[#FAFAFC] text-zinc-900 select-none overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-purple-500/8 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
          Autonomous Execution
        </span>
        <h2 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 mt-3">
          DIYA builds in real-time.
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 mt-1.5">
          Watch five complete production outputs created autonomously from your single goal.
        </p>
      </div>

      {/* Main Interactive Stage with Side Progress Indicator */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center gap-6 lg:gap-10">
        {/* Left Side Progress Dots (5 dots) */}
        <div className="hidden sm:flex flex-col items-center gap-3 shrink-0 py-4">
          {sceneTitles.map((item, idx) => {
            const isActive = activeScene === idx;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveScene(idx)}
                aria-label={`Jump to scene ${idx + 1}: ${item.label}`}
                className="group flex items-center gap-2 cursor-pointer"
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-purple-600 scale-125 shadow-[0_0_10px_rgba(124,58,237,0.5)]'
                      : 'bg-zinc-300 hover:bg-zinc-400'
                  }`}
                />
                <span
                  className={`text-[11px] font-medium transition-all duration-200 hidden lg:inline-block ${
                    isActive ? 'text-zinc-900 font-semibold' : 'text-zinc-400 group-hover:text-zinc-600'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Center Card Container */}
        <div className="flex-1 w-full min-h-[440px] rounded-3xl bg-white border border-zinc-200 shadow-[0_16px_48px_rgba(124,58,237,0.06)] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Top Banner: Stage Caption & Sample Preview Tag */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-purple-700">
                0{activeScene + 1} / 05
              </span>
              <span className="text-zinc-400 text-xs">•</span>
              <span className="text-xs font-semibold text-zinc-900">
                {sceneTitles[activeScene].label}
              </span>
            </div>
            <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              Sample preview
            </span>
          </div>

          {/* SCENE CONTENT */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Scene 1: Ad Creative Card Assembly */}
            {activeScene === 0 && (
              <div className="animate-in fade-in zoom-in-95 duration-400 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    Meta & Google Flight • High ROAS
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-zinc-900 leading-tight">
                    Luxury 3 &amp; 4 BHK Sky Villas in Gachibowli
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Experience panoramic skyline views, private plunge pools, and world-class clubhouse amenities. 12 units released for private preview.
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-xs font-semibold text-white shadow-md shadow-purple-600/20 flex items-center gap-1.5"
                    >
                      <span>Book Private Tour</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                    <span className="text-[11px] text-zinc-500 font-mono">₹3.4 Cr onwards</span>
                  </div>
                </div>

                {/* Simulated Graphic Frame */}
                <div className="rounded-2xl overflow-hidden border border-purple-200 bg-gradient-to-br from-purple-50 via-zinc-50 to-white p-5 flex flex-col justify-between h-56 shadow-sm">
                  <div className="flex items-center justify-between text-[11px] text-zinc-700">
                    <span className="font-semibold text-zinc-900">Mentneo Sky Villas</span>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-mono">
                      Active Ad
                    </span>
                  </div>
                  <div className="my-auto text-center">
                    <div className="inline-block p-3 rounded-2xl bg-purple-100 text-purple-700 mb-2">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <span className="block text-xs font-semibold text-zinc-800">
                      Auto-rendered High-Res Creative (1080x1080)
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    CTA CTR: 4.6% • Score: 9.8/10
                  </span>
                </div>
              </div>
            )}

            {/* Scene 2: Content Calendar Drop */}
            {activeScene === 1 && (
              <div className="animate-in fade-in zoom-in-95 duration-400 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-800">
                    Weekly Omnichannel Scheduled Posts
                  </span>
                  <span className="text-[11px] font-mono text-purple-700">October 2026</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { day: 'Mon', title: 'Festive Reel', time: '11:00 AM', tag: 'Instagram' },
                    { day: 'Tue', title: 'Market Trends', time: '02:30 PM', tag: 'LinkedIn' },
                    { day: 'Wed', title: 'Client Story', time: '06:00 PM', tag: 'YouTube' },
                    { day: 'Thu', title: 'Sky Villa Hook', time: '01:15 PM', tag: 'Meta Ads' },
                    { day: 'Fri', title: 'Weekend Tour', time: '05:00 PM', tag: 'WhatsApp' },
                  ].map((post) => (
                    <div
                      key={post.day}
                      className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-purple-300 hover:bg-purple-50/30 transition-all flex flex-col justify-between h-28"
                    >
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                        <span className="font-bold text-zinc-700">{post.day}</span>
                        <span className="text-purple-700 font-semibold">{post.tag}</span>
                      </div>
                      <span className="text-xs font-semibold text-zinc-900 leading-snug">
                        {post.title}
                      </span>
                      <span className="text-[10px] text-zinc-500">{post.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scene 3: SEO Score Ring */}
            {activeScene === 2 && (
              <div className="animate-in fade-in zoom-in-95 duration-400 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Score Ring */}
                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        stroke="#EDE9FE"
                        strokeWidth="10"
                        fill="transparent"
                      />
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        stroke="#7C3AED"
                        strokeWidth="10"
                        strokeDasharray="377"
                        strokeDashoffset="30"
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-zinc-900">92</span>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">EXCELLENT</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-zinc-700 mt-2">Organic Health Audit</span>
                </div>

                {/* Audit checklist */}
                <div className="space-y-2.5">
                  {[
                    { label: 'Core Web Vitals', score: '98/100', ok: true },
                    { label: 'Schema Markup Architecture', score: 'Valid RealEstate Schema', ok: true },
                    { label: 'Keyword Gap Analysis', score: '+18 High-intent keywords added', ok: true },
                    { label: 'Canonical & Hreflang Tags', score: 'Resolved automatically', ok: true },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-zinc-800 font-medium">{item.label}</span>
                      </div>
                      <span className="font-mono text-[11px] text-purple-700 font-semibold">{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scene 4: Lead Funnel */}
            {activeScene === 3 && (
              <div className="animate-in fade-in zoom-in-95 duration-400 space-y-4">
                <div className="flex items-center justify-between text-xs text-zinc-700">
                  <span className="font-semibold">Autonomous Lead Filtering &amp; Routing</span>
                  <span className="font-mono text-purple-700 font-bold">30.2% Conversion</span>
                </div>

                <div className="space-y-3">
                  {[
                    { stage: '1. Ad Impressions', count: '42,500', pct: 100, color: 'from-purple-600 to-indigo-600' },
                    { stage: '2. High-Intent Clicks', count: '3,820', pct: 68, color: 'from-purple-500 to-violet-500' },
                    { stage: '3. Leads Captured', count: '284', pct: 42, color: 'from-violet-500 to-fuchsia-500' },
                    { stage: '4. WhatsApp Verified Buyers', count: '86', pct: 24, color: 'from-emerald-500 to-teal-600' },
                  ].map((bar) => (
                    <div key={bar.stage} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-zinc-900">{bar.stage}</span>
                        <span className="font-mono text-zinc-600 font-semibold">{bar.count}</span>
                      </div>
                      <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${bar.color} transition-all duration-700 ease-out`}
                          style={{ width: `${bar.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scene 5: Performance Chart & Anime.js Numbers */}
            {activeScene === 4 && (
              <div className="animate-in fade-in zoom-in-95 duration-400 space-y-5">
                {/* Big Metric Counters */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono font-medium">Total Ad Spend</span>
                    <div className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
                      <span ref={spendRef}>₹1,24,500</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                      <TrendingUp className="h-3 w-3" /> +18.4% efficiency
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono font-medium">Leads Delivered</span>
                    <div className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
                      <span ref={leadsRef}>418</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-mono font-semibold mt-0.5 block">
                      Target: 400 (Exceeded)
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono font-medium">Average CPL</span>
                    <div className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
                      <span ref={cplRef}>₹298</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-mono font-semibold mt-0.5 block">
                      -24% vs Agency benchmark
                    </span>
                  </div>
                </div>

                {/* SVG Line Chart that draws in */}
                <div className="relative h-28 w-full pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradientLight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 80 Q 70 70 140 45 T 280 30 T 420 18 T 500 8 L 500 100 L 0 100 Z"
                      fill="url(#chartGradientLight)"
                    />
                    <path
                      ref={chartPathRef}
                      d="M 0 80 Q 70 70 140 45 T 280 30 T 420 18 T 500 8"
                      fill="none"
                      stroke="#7C3AED"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Controls / Indicator for Mobile */}
          <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
            <span>Scroll to progress scenes</span>
            <div className="flex items-center gap-1.5 sm:hidden">
              {sceneTitles.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    activeScene === i ? 'bg-purple-600' : 'bg-zinc-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildScenes;
