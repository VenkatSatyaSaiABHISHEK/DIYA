'use client';

import React from 'react';
import { Sparkles, Star, Quote, CheckCircle2, TrendingUp } from 'lucide-react';

export const TestimonialSpotlight: React.FC = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white select-none border-t border-zinc-100">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Sparkles className="h-3.5 w-3.5 text-purple-600" />
            <span>Proven Business Impact</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950">
            What our clients say about DIYA.
          </h2>
        </div>

        {/* Elevated Spotlight Card (Matching Section 9 in reference screenshot) */}
        <div className="rounded-3xl bg-zinc-50/70 border border-zinc-200/90 p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center gap-8 sm:gap-12 text-left">
          {/* Avatar / Person Card */}
          <div className="shrink-0 flex flex-col items-center text-center">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-2 border-purple-200 shadow-md relative bg-gradient-to-tr from-purple-200 via-violet-100 to-white flex items-center justify-center">
              <span className="text-3xl font-bold text-purple-800">AS</span>
              <div className="absolute bottom-2 right-2 p-1 rounded-full bg-emerald-500 text-white shadow-xs">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-3">
              <span className="block text-sm font-bold text-zinc-950">Abhishek Sharma</span>
              <span className="block text-xs text-zinc-500">CMO, Mentneo Realty</span>
            </div>
          </div>

          {/* Quote & Quantified Metrics */}
          <div className="space-y-6 flex-1">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              <span className="text-xs font-bold text-zinc-700 ml-2">5.0 / 5.0 Rating</span>
            </div>

            <p className="font-sans text-base sm:text-lg text-zinc-800 leading-relaxed font-normal">
              &ldquo;DIYA AI completely replaced our expensive digital agency retainer. It autonomously created our luxury villa ad flights, continuously audited negative keyword waste, and slashed our CPL from ₹420 to ₹176 in three weeks.&rdquo;
            </p>

            {/* Metric Chips */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
                <span className="text-2xl sm:text-3xl font-extrabold text-purple-700 block">
                  +184%
                </span>
                <span className="text-xs text-zinc-600 font-medium mt-0.5 block">
                  Qualified Lead Volume
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 block">
                  -58%
                </span>
                <span className="text-xs text-zinc-600 font-medium mt-0.5 block">
                  Customer Acquisition Cost
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSpotlight;
