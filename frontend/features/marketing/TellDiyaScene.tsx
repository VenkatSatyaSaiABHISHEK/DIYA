'use client';

import React, { useRef, useState } from 'react';
import { AIOrb } from '@/components/brand/AIOrb';
import { CheckCircle2, Sparkles, Clock, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ensureScrollTrigger } from '@/lib/animations/scrollTrigger';
import { isReducedMotion } from '@/lib/animations/pageTransition';

const PLAN_STEPS = [
  'Analyze market & competitor ROAS in Hyderabad',
  'Build high-intent HNI property buyer audiences',
  'Write persuasive Meta & Google ad copy variations',
  'Generate 3 festive creative variants with CTAs',
  'Set ₹15,000 test flight budget with automated bid caps',
];

export const TellDiyaScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

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
          end: '+=160%',
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.33) {
              setActiveStep(0);
            } else if (p < 0.68) {
              setActiveStep(1);
            } else {
              setActiveStep(2);
            }
          },
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-[#FFFFFF] text-zinc-900 select-none overflow-hidden"
    >
      {/* Ambient background light */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-500/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-violet-400/8 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Dynamic Step Text */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 w-fit">
            <Sparkles className="h-3.5 w-3.5 text-purple-600" />
            <span>Autonomous Execution • 3 Steps</span>
          </div>

          <div className="space-y-4">
            {/* Step 1 Title */}
            <div
              className={`p-4.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activeStep === 0
                  ? 'bg-purple-50/70 border-purple-300 shadow-sm'
                  : 'bg-transparent border-transparent opacity-50 hover:opacity-75'
              }`}
              onClick={() => setActiveStep(0)}
            >
              <span className="text-xs font-mono text-purple-700 font-bold">01 / PROMPT</span>
              <h3 className="font-sans text-xl sm:text-2xl font-semibold text-zinc-900 mt-1">
                Tell DIYA the goal
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                Provide instructions in plain English or your preferred regional language. No marketing jargon needed.
              </p>
            </div>

            {/* Step 2 Title */}
            <div
              className={`p-4.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activeStep === 1
                  ? 'bg-purple-50/70 border-purple-300 shadow-sm'
                  : 'bg-transparent border-transparent opacity-50 hover:opacity-75'
              }`}
              onClick={() => setActiveStep(1)}
            >
              <span className="text-xs font-mono text-purple-700 font-bold">02 / PLAN</span>
              <h3 className="font-sans text-xl sm:text-2xl font-semibold text-zinc-900 mt-1">
                DIYA plans the work
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                DIYA audits historical data, researches competitive angles, drafts creatives, and scopes budget pacing.
              </p>
            </div>

            {/* Step 3 Title */}
            <div
              className={`p-4.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activeStep === 2
                  ? 'bg-purple-50/70 border-purple-300 shadow-sm'
                  : 'bg-transparent border-transparent opacity-50 hover:opacity-75'
              }`}
              onClick={() => setActiveStep(2)}
            >
              <span className="text-xs font-mono text-purple-700 font-bold">03 / AUTHORIZE</span>
              <h3 className="font-sans text-xl sm:text-2xl font-semibold text-zinc-900 mt-1">
                Review before anything runs
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                Nothing spends your money without your 1-click authorization. Full financial transparency.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Pinned Glass Chat Window */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl bg-white border border-zinc-200/90 shadow-[0_16px_48px_rgba(124,58,237,0.08)] overflow-hidden">
            {/* Chat Window Top Bar */}
            <div className="px-5 py-3.5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-mono text-zinc-500 ml-2">diya-agent://live-session</span>
              </div>

              {/* Miniature Corner Orb */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-medium text-purple-700">
                  {activeStep === 2 ? 'Planning Complete' : activeStep === 1 ? 'Planning...' : 'Listening'}
                </span>
                <AIOrb
                  status={activeStep === 1 ? 'planning' : 'optimizing'}
                  size={26}
                  speed={activeStep === 1 ? 1.6 : 1}
                />
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-5 sm:p-6 space-y-4 min-h-[380px] flex flex-col justify-start bg-white">
              {/* Step 1 Message: User typed goal */}
              <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="max-w-md bg-purple-600 text-white rounded-2xl rounded-tr-xs px-4.5 py-3 text-xs sm:text-sm shadow-md shadow-purple-600/15">
                  <p className="font-medium">
                    Generate leads for my real estate business in Hyderabad.
                  </p>
                  <span className="block text-[10px] text-purple-200 text-right mt-1 font-mono">
                    10:14 AM • User
                  </span>
                </div>
              </div>

              {/* Step 2 & 3: DIYA Autonomous Plan Checklist */}
              {activeStep >= 1 && (
                <div className="flex justify-start animate-in fade-in slide-in-from-bottom-3 duration-400">
                  <div className="max-w-lg bg-zinc-50 border border-zinc-200/90 text-zinc-900 rounded-2xl rounded-tl-xs p-4.5 sm:p-5 shadow-sm space-y-3.5 w-full">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-600" />
                      <span className="text-xs font-bold text-zinc-900">
                        Autonomous Action Plan Generated
                      </span>
                    </div>

                    {/* Step-by-step checklist items */}
                    <div className="space-y-2">
                      {PLAN_STEPS.map((step, idx) => (
                        <div
                          key={step}
                          className={`flex items-center gap-2.5 text-xs transition-all duration-300 ${
                            idx <= (activeStep === 1 ? 3 : 4)
                              ? 'text-zinc-800 font-medium'
                              : 'text-zinc-400 opacity-50'
                          }`}
                        >
                          <CheckCircle2
                            className={`h-3.5 w-3.5 shrink-0 ${
                              idx <= (activeStep === 1 ? 3 : 4)
                                ? 'text-emerald-500'
                                : 'text-zinc-300'
                            }`}
                          />
                          <span className="truncate">{step}</span>
                        </div>
                      ))}
                    </div>

                    {/* Step 3: Timeline Progress Bar + Status */}
                    {activeStep >= 2 && (
                      <div className="pt-3 border-t border-zinc-200 space-y-2 animate-in fade-in duration-300">
                        <div className="flex items-center justify-between text-[11px] text-zinc-600">
                          <span className="flex items-center gap-1.5 font-semibold text-emerald-600">
                            <Clock className="h-3 w-3" />
                            Ready for your authorization
                          </span>
                          <span className="font-mono text-purple-700 font-bold">100% scoped</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-600 to-emerald-500 w-full animate-pulse" />
                        </div>
                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-[11px] text-zinc-500 font-mono">
                            Estimated CAC: ₹320 | Target: 50 Leads
                          </span>
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100"
                          >
                            <span>Approve flight</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TellDiyaScene;
