'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { AIOrb } from '@/components/brand/AIOrb';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Wallet,
  Users,
  Target,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { isReducedMotion } from '@/lib/animations/pageTransition';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (pillRef.current) {
        tl.fromTo(pillRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.5 });
      }

      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.hero-word');
        tl.fromTo(
          words,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 },
          '-=0.25'
        );
      }

      if (sublineRef.current) {
        tl.fromTo(
          sublineRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.3'
        );
      }

      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        );
      }

      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power2.out' },
          '-=0.35'
        );
      }
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative w-full pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center overflow-hidden bg-white select-none"
    >
      {/* Background Soft Radiant Gradient Horizon (Violet & Rose mist) */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] pointer-events-none rounded-full blur-3xl opacity-35"
        style={{
          background:
            'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(232, 121, 249, 0.25) 35%, rgba(245, 243, 255, 0.1) 70%, transparent 80%)',
        }}
      />

      {/* Hero Header Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Top Super Pill */}
        <div
          ref={pillRef}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200/80 shadow-2xs mb-6"
        >
          <Sparkles className="h-3.5 w-3.5 text-purple-600 animate-pulse" />
          <span>All-In-One AI Marketing Platform</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span className="text-zinc-600 font-normal hidden sm:inline">Autonomous Employee</span>
        </div>

        {/* Bold Punchy Headline (Geist Sans) with highlighted badge */}
        <h1
          ref={titleRef}
          className="font-sans text-4xl sm:text-6xl lg:text-[68px] font-bold tracking-tight text-zinc-950 leading-[1.08] max-w-3xl"
        >
          <span className="hero-word inline-block mr-2.5">Manage</span>
          <span className="hero-word inline-block mr-2.5">Ads,</span>
          <span className="hero-word inline-block mr-2.5">Content</span>
          <span className="hero-word inline-block mr-2.5">&amp;</span>
          <span className="hero-word inline-block mr-2.5">Growth</span>
          <span className="hero-word inline-block mr-2.5">–</span>
          <span className="hero-word inline-block mr-2.5">All</span>
          <span className="hero-word inline-block mr-2.5">in</span>
          <span className="hero-word inline-block mr-2.5">One</span>
          <span className="hero-word inline-block px-3.5 py-1 rounded-2xl bg-gradient-to-r from-purple-100 to-fuchsia-100 border border-purple-200/70 text-purple-800 text-shine-purple">
            AI Employee
          </span>
        </h1>

        {/* Subline */}
        <p
          ref={sublineRef}
          className="font-sans text-base sm:text-lg lg:text-xl text-zinc-600 mt-5 max-w-2xl leading-relaxed font-normal"
        >
          Run high-performing Meta &amp; Google ad flights, generate creatives, optimize organic SEO, and qualify WhatsApp leads automatically. Zero agency retainers.
        </p>

        {/* Dual Pill CTA Buttons */}
        <div
          ref={buttonsRef}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
        >
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-zinc-800 bg-white hover:bg-zinc-50 border border-zinc-200 shadow-xs hover:border-zinc-300 transition-all cursor-pointer"
          >
            Request Walkthrough
          </Link>

          <Link
            href="/onboarding"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#9333EA] hover:from-[#6D28D9] hover:to-[#7E22CE] shadow-[0_4px_16px_rgba(124,58,237,0.32)] hover:shadow-[0_6px_22px_rgba(124,58,237,0.48)] active:scale-95 transition-all cursor-pointer"
          >
            <span>Get Started Free</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ELEVATED HERO UI CARD (Matching Unfold Reference Layout) */}
      <div
        ref={cardRef}
        className="relative z-20 w-full max-w-5xl mx-auto mt-14 sm:mt-18"
      >
        {/* Soft Ambient Horizon Behind the Card */}
        <div
          aria-hidden="true"
          className="absolute -inset-x-8 -bottom-16 h-72 rounded-[48px] pointer-events-none blur-2xl opacity-40"
          style={{
            background:
              'linear-gradient(to top, rgba(237, 233, 254, 0.7) 0%, rgba(250, 232, 255, 0.4) 50%, transparent 100%)',
          }}
        />

        {/* Main Elevated Glass Card */}
        <div className="relative rounded-3xl bg-white border border-zinc-200/90 shadow-[0_20px_70px_rgba(124,58,237,0.12)] p-4 sm:p-7 overflow-hidden text-left">
          {/* Card Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-zinc-100 gap-3">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <AIOrb status="running" size={36} speed={1.2} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-zinc-950">DIYA Autonomous Cockpit</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Agent Active
                  </span>
                </div>
                <span className="text-[11px] text-zinc-500">
                  Mentneo Realty • Autonomous Meta &amp; Google Flight Control
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-600 bg-zinc-50 border border-zinc-200/80 px-2.5 py-1 rounded-xl">
                ROAS Target: 4.5x
              </span>
              <button
                type="button"
                className="px-3 py-1 rounded-xl bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200 hover:bg-purple-100 transition-colors"
              >
                1-Click Optimize
              </button>
            </div>
          </div>

          {/* 4 KPI Metric Tiles Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-5">
            <div className="p-3.5 rounded-2xl bg-zinc-50/70 border border-zinc-200/80 hover:bg-white hover:border-purple-200 transition-all">
              <div className="flex items-center justify-between text-zinc-500 text-[11px]">
                <span>Total Ad Spend</span>
                <Wallet className="h-3.5 w-3.5 text-purple-600" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-zinc-950 mt-1">₹1,24,500</div>
              <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <TrendingUp className="h-3 w-3" /> +18.4% efficiency vs budget
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50/70 border border-zinc-200/80 hover:bg-white hover:border-purple-200 transition-all">
              <div className="flex items-center justify-between text-zinc-500 text-[11px]">
                <span>Qualified Leads</span>
                <Users className="h-3.5 w-3.5 text-purple-600" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-zinc-950 mt-1">418</div>
              <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <TrendingUp className="h-3 w-3" /> +42 leads this week
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50/70 border border-zinc-200/80 hover:bg-white hover:border-purple-200 transition-all">
              <div className="flex items-center justify-between text-zinc-500 text-[11px]">
                <span>Cost Per Lead (CPL)</span>
                <Target className="h-3.5 w-3.5 text-purple-600" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-zinc-950 mt-1">₹298</div>
              <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <TrendingUp className="h-3 w-3" /> -24% acquisition cost
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50/70 border border-zinc-200/80 hover:bg-white hover:border-purple-200 transition-all">
              <div className="flex items-center justify-between text-zinc-500 text-[11px]">
                <span>Autonomous ROAS</span>
                <BarChart3 className="h-3.5 w-3.5 text-purple-600" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-zinc-950 mt-1">4.8x</div>
              <div className="text-[10px] text-purple-700 font-semibold flex items-center gap-1 mt-0.5">
                <Zap className="h-3 w-3" /> Peak weekend flight
              </div>
            </div>
          </div>

          {/* Active Flights Stream Table */}
          <div className="rounded-2xl border border-zinc-200/90 overflow-hidden bg-white">
            <div className="px-4 py-2.5 bg-zinc-50/80 border-b border-zinc-100 flex items-center justify-between text-xs text-zinc-600 font-medium">
              <span>Active Autonomous Flights</span>
              <span className="font-mono text-[11px] text-purple-700 font-semibold">
                Auto-governed by DIYA
              </span>
            </div>
            <div className="divide-y divide-zinc-100 text-xs">
              <div className="px-4 py-3 flex items-center justify-between hover:bg-purple-50/20 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-bold text-[10px]">
                    Meta
                  </span>
                  <div>
                    <span className="font-semibold text-zinc-900 block">
                      Luxury Sky Villas Q3 • High HNI Audience
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      Hyderabad Financial District • Auto-optimized 42 min ago
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-zinc-950 block">₹312 CPL</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Score: 9.8/10</span>
                </div>
              </div>

              <div className="px-4 py-3 flex items-center justify-between hover:bg-purple-50/20 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[10px]">
                    Google
                  </span>
                  <div>
                    <span className="font-semibold text-zinc-900 block">
                      3 &amp; 4 BHK Gachibowli High-Intent Search
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      Exact keyword matching • Zero negative match waste
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-zinc-950 block">₹240 CPL</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">ROAS: 8.4x</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Card Trust Note */}
          <div className="mt-4 pt-3 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-zinc-500 border-t border-zinc-100 gap-2">
            <span className="flex items-center gap-1.5 text-zinc-600 font-medium">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              Guaranteed financial safety: DIYA never spends budgets without 1-click authorization.
            </span>
            <span className="font-mono text-purple-700 font-semibold">
              Live Demo Preview
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
