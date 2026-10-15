'use client';

import React from 'react';
import Link from 'next/link';
import { GlobeHero } from './GlobeHero';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCta: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FF] to-[#EDE9FE] text-zinc-900 select-none overflow-hidden flex flex-col items-center text-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/12 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-100/90 text-purple-900 border border-purple-300">
          <Sparkles className="h-3.5 w-3.5 text-purple-600 animate-pulse" />
          <span>Transform Your Growth Today</span>
        </div>

        <h2 className="font-sans text-4xl sm:text-6xl font-semibold tracking-tight text-zinc-900 leading-tight">
          One AI. Your entire{' '}
          <span className="text-shine-purple font-bold">marketing workforce.</span>
        </h2>

        <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto">
          Scale ad campaigns, publish creatives, optimize SEO, and acquire customers automatically—24/7.
        </p>

        {/* Big Purple Gradient "Get Started" Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#9333EA] hover:from-[#6D28D9] hover:to-[#7E22CE] shadow-[0_6px_28px_rgba(124,58,237,0.35)] hover:shadow-[0_8px_36px_rgba(124,58,237,0.5)] active:scale-95 transition-all cursor-pointer"
          >
            <span>Get started with DIYA</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-4 rounded-2xl text-sm font-semibold text-zinc-700 hover:text-zinc-950 bg-white hover:bg-zinc-50 border border-zinc-200 transition-all cursor-pointer shadow-xs"
          >
            Sign in to Cockpit
          </Link>
        </div>
      </div>

      {/* Center Signature Orb */}
      <div className="relative mt-10 sm:mt-12 flex items-center justify-center pointer-events-auto">
        <GlobeHero size={220} interactive />
      </div>
    </section>
  );
};

export default FinalCta;
