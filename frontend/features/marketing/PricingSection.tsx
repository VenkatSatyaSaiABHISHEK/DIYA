'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const tiers = [
    {
      id: 'starter',
      name: 'Starter Agent',
      price: billingCycle === 'yearly' ? '₹3,999' : '₹4,999',
      period: '/month',
      description: 'Ideal for local businesses starting with autonomous AI ad management.',
      popular: false,
      features: [
        '1 Connected Ad Channel (Meta or Google)',
        '10 AI Creative & Copy Variants / month',
        'Automated Bid Pacing & Budget Caps',
        'Weekly Performance Reports on WhatsApp',
        '1-Click Mobile Flight Approvals',
      ],
      cta: 'Start with Starter',
    },
    {
      id: 'growth',
      name: 'Growth Employee',
      price: billingCycle === 'yearly' ? '₹11,999' : '₹14,999',
      period: '/month',
      description: 'The complete autonomous marketing workforce for high-growth scaling.',
      popular: true,
      features: [
        'Full Omnichannel Autonomy (Meta + Google + IG)',
        'Unlimited AI Ad Creatives, Hooks & Scripts',
        '24/7 Dynamic ROAS & Audience A/B Testing',
        'Instant WhatsApp Lead Qualification & CRM Sync',
        'Real-Time Attribution Cockpit & Metric Stream',
        'Dedicated Solutions Architect Support',
      ],
      cta: 'Deploy Growth Agent',
    },
  ];

  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white select-none">
      <div className="max-w-5xl mx-auto space-y-14 text-center">
        {/* Header */}
        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Sparkles className="h-3.5 w-3.5 text-purple-600" />
            <span>Predictable Pricing</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950">
            Pricing that scales with your team.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            Replace high agency retainers and fragmented subscriptions with transparent autonomy.
          </p>

          {/* Billing Toggle (Monthly / Yearly) */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <div className="inline-flex items-center p-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  billingCycle === 'yearly'
                    ? 'bg-[#7C3AED] text-white shadow-xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <span>Yearly</span>
                <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.2 rounded-full">
                  SAVE 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 2 Elevated Pricing Cards (Matching Section 7 in reference screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 shadow-md ${
                tier.popular
                  ? 'bg-gradient-to-b from-purple-50/70 via-white to-white border-2 border-purple-500 shadow-[0_20px_50px_rgba(124,58,237,0.12)] -translate-y-2'
                  : 'bg-white border border-zinc-200/90 hover:border-purple-300 hover:shadow-xl'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-xl font-bold text-zinc-950">{tier.name}</h3>
                  <span className="text-[10px] uppercase font-mono font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md">
                    Sample plan
                  </span>
                </div>

                <p className="text-xs text-zinc-600 mt-2 min-h-[34px] leading-relaxed">
                  {tier.description}
                </p>

                {/* Price Display */}
                <div className="mt-6 pb-6 border-b border-zinc-100 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-zinc-950">
                    {tier.price}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">{tier.period}</span>
                </div>

                {/* Features List */}
                <ul className="mt-6 space-y-3.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-xs text-zinc-800">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Pill Button */}
              <div className="mt-8 pt-4">
                <Link
                  href="/onboarding"
                  className={`w-full py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ${
                    tier.popular
                      ? 'bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#9333EA] hover:from-[#6D28D9] hover:to-[#7E22CE] text-white shadow-purple-600/30'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
