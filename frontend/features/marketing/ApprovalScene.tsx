'use client';

import React, { useRef, useState } from 'react';
import { ShieldCheck, History, Lock, Check, X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ensureScrollTrigger } from '@/lib/animations/scrollTrigger';
import { isReducedMotion } from '@/lib/animations/pageTransition';

export const ApprovalScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isApproved, setIsApproved] = useState(false);

  useGSAP(
    () => {
      if (isReducedMotion()) return;
      ensureScrollTrigger();

      const el = containerRef.current;
      const card = cardRef.current;
      if (!el || !card) return;

      gsap.fromTo(
        card,
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            end: 'center center',
            scrub: false,
            once: true,
            onEnter: () => {
              setTimeout(() => {
                setIsApproved(true);
              }, 1400);
            },
          },
        }
      );
    },
    { scope: containerRef }
  );

  const trustPoints = [
    {
      icon: ShieldCheck,
      title: 'Approval first',
      description: 'DIYA never commits ad spend or publishes campaigns without your explicit approval.',
    },
    {
      icon: History,
      title: 'Full audit log',
      description: 'Every prompt, audience tweak, budget shift, and creative is logged with timestamped traces.',
    },
    {
      icon: Lock,
      title: 'Your data stays yours',
      description: 'Your Meta/Google ad accounts and customer leads remain 100% in your custody and ownership.',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-[#FFFFFF] text-zinc-900 select-none overflow-hidden"
    >
      {/* Ambient background light */}
      <div className="absolute top-1/2 right-1/4 w-[480px] h-[480px] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading, Subtitle, and 3 Trust Points */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Safe &amp; Governed Autonomy
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-900 mt-4">
              You stay in complete control.
            </h2>
            <p className="text-base text-zinc-600 mt-3 max-w-md">
              DIYA operates as an autonomous executive employee, preparing proposals and executing only upon your confirmation.
            </p>
          </div>

          {/* 3 Trust Points with Icons */}
          <div className="space-y-4 pt-2">
            {trustPoints.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 shrink-0 mt-0.5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">{item.title}</h3>
                    <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sliding Approval Card */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div
            ref={cardRef}
            className="w-full max-w-lg rounded-3xl bg-white border border-zinc-200/90 p-6 sm:p-7 shadow-[0_20px_60px_rgba(124,58,237,0.08)] space-y-5"
          >
            {/* Header: Priority and AI Status */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                HIGH PRIORITY RECOMMENDATION
              </span>
              <span className="text-xs font-mono text-zinc-500">diya-opt://meta-ads</span>
            </div>

            {/* Title and Impact */}
            <div>
              <h3 className="text-lg font-bold text-zinc-900">
                Scale Daily Budget for &ldquo;Sky Villas Q3&rdquo; by +₹15,000
              </h3>
              <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                Cost per acquisition dropped to ₹312 and conversion probability is 94% due to festive weekend demand.
              </p>
            </div>

            {/* Impact Chip */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-800">
                +42 Projected Qualified Buyer Leads
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-700">Est. ROAS: 4.8x</span>
            </div>

            {/* Actions & Running Progress State */}
            <div className="pt-2 border-t border-zinc-100 space-y-3">
              {isApproved ? (
                /* Running State */
                <div className="space-y-2 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                      <Check className="h-4 w-4" />
                      Approved • Executing Meta Ad Flight
                    </span>
                    <span className="text-[11px] font-mono text-purple-700 font-bold">Active</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-[#7C3AED] w-3/4 animate-pulse" />
                  </div>
                </div>
              ) : (
                /* Pre-Approval Buttons */
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsApproved(true)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 active:scale-95 text-white font-semibold text-xs shadow-md shadow-emerald-700/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Approve &amp; Scale Budget</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    className="py-2.5 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-medium border border-zinc-200 flex items-center gap-1 transition-all"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>Dismiss</span>
                  </button>
                </div>
              )}
            </div>

            {/* Explicit Caption */}
            <p className="text-[11px] text-zinc-500 text-center font-mono pt-1">
              &ldquo;DIYA never spends money without your approval.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApprovalScene;
