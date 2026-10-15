'use client';

import React from 'react';
import Link from 'next/link';
import { AIOrb } from '@/components/brand/AIOrb';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCtaBanner: React.FC = () => {
  return (
    <section className="relative pt-24 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAFAFC] via-[#F8F5FF] to-[#EDE9FE] select-none overflow-hidden text-center">
      {/* Background Ambient Mist Horizon */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, rgba(232, 121, 249, 0.25) 50%, transparent 80%)',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/80 text-purple-900 border border-purple-200/90 shadow-2xs">
          <Sparkles className="h-3.5 w-3.5 text-purple-600 animate-pulse" />
          <span>Deploy In Less Than 3 Minutes</span>
        </div>

        <h2 className="font-sans text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-950 leading-tight">
          Ready to scale your marketing with{' '}
          <span className="text-shine-purple font-extrabold">DIYA AI?</span>
        </h2>

        <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto leading-relaxed">
          Autonomous ad campaigns, viral creatives, SEO auditing, and WhatsApp lead qualification—24/7 without agency overhead.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#9333EA] hover:from-[#6D28D9] hover:to-[#7E22CE] shadow-[0_4px_20px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_28px_rgba(124,58,237,0.5)] active:scale-95 transition-all cursor-pointer"
          >
            <span>Get Started Free</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-zinc-800 bg-white hover:bg-zinc-50 border border-zinc-200 shadow-xs hover:border-zinc-300 transition-all cursor-pointer"
          >
            Request Walkthrough
          </Link>
        </div>

        {/* Center Animated DIYA AI Orb */}
        <div className="pt-8 flex flex-col items-center justify-center">
          <div className="relative p-3.5 rounded-full bg-white shadow-2xl shadow-purple-500/20 border border-purple-200">
            <AIOrb status="running" size={100} speed={1.3} />
          </div>
          <span className="text-xs font-mono font-bold text-zinc-700 mt-3">
            DIYA Autonomous Employee
          </span>
        </div>
      </div>

      {/* Giant Watermark Typography in Background (Matching "Unfold" in reference screenshot) */}
      <div
        aria-hidden="true"
        className="relative -mt-10 sm:-mt-16 pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-sans font-black text-[130px] sm:text-[220px] lg:text-[280px] tracking-tighter text-purple-900/[0.045] block leading-none"
          style={{ letterSpacing: '-0.04em' }}
        >
          DIYA AI
        </span>
      </div>
    </section>
  );
};

export default FinalCtaBanner;
