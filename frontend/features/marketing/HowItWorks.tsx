'use client';

import React, { useState } from 'react';
import { AIOrb } from '@/components/brand/AIOrb';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Connect your accounts in 3 minutes',
    description:
      'Link your Meta Ads Manager, Google Ads, GA4, and WhatsApp Cloud API via one-click OAuth. DIYA never takes custody of credentials.',
    previewTitle: 'Secure Account Authorization',
    previewItems: ['Meta Ads Manager Connected', 'Google Ads Manager Connected', 'WhatsApp API Ready'],
  },
  {
    step: '02',
    title: 'Define your growth goals & daily budget',
    description:
      'Specify your target cost per lead, target cities, and monthly budget pacing in plain English. No complicated spreadsheet modeling.',
    previewTitle: 'Strategy & Budget Scoping',
    previewItems: ['Target CPL: ₹300', 'Locations: Hyderabad & Bengaluru', 'Daily Budget: ₹5,000'],
  },
  {
    step: '03',
    title: 'Approve flights & scale revenue automatically',
    description:
      'DIYA generates high-converting creative variants, bids dynamically, and continuously optimizes campaigns 24/7 with 1-click approvals.',
    previewTitle: 'Autonomous Flight Deployment',
    previewItems: ['Live Flight Pacing Active', 'A/B Testing Enabled', 'Lead Verification Active'],
  },
];

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep];

  return (
    <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFC] select-none border-t border-zinc-100">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Zap className="h-3.5 w-3.5 text-purple-600" />
            <span>Fast Onboarding</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950">
            Deploy your AI employee in three simple steps.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            From setup to your first live autonomous ad flight in less than 15 minutes.
          </p>
        </div>

        {/* 3 Step Cards + Center Interactive Preview (Matching Section 6 in reference screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 3 Clickable Steps */}
          <div className="lg:col-span-5 space-y-4">
            {STEPS.map((s, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={s.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer text-left ${
                    isActive
                      ? 'bg-white border-2 border-purple-500 shadow-lg shadow-purple-500/8 -translate-x-1'
                      : 'bg-white/70 hover:bg-white border-zinc-200/90 shadow-2xs hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                      Step {s.step}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Active Step
                      </span>
                    )}
                  </div>
                  <h3 className="font-sans text-base font-bold text-zinc-950">
                    {s.title}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Step Preview Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-zinc-200 shadow-xl p-8 sm:p-10 space-y-6 text-left relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <AIOrb status={activeStep === 2 ? 'creating' : 'running'} size={32} speed={1.2} />
                  <div>
                    <span className="text-xs font-mono text-zinc-400 block">
                      DIYA SETUP WIZARD • STEP {current.step}
                    </span>
                    <h4 className="font-sans text-base font-bold text-zinc-950">
                      {current.previewTitle}
                    </h4>
                  </div>
                </div>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                  Status: Ready
                </span>
              </div>

              {/* Step Checklist Items */}
              <div className="space-y-3 py-2">
                {current.previewItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-800"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold">{item}</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-600 font-bold">VERIFIED</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1.5 text-zinc-600 font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Enterprise 256-bit AES encryption
                </span>
                <button
                  type="button"
                  onClick={() => setActiveStep((activeStep + 1) % STEPS.length)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 font-semibold transition-colors"
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
