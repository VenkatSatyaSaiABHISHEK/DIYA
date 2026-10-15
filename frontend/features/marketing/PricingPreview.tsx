'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  popular?: boolean;
  features: string[];
  cta: string;
}

const TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹4,999',
    period: '/month',
    description: 'Perfect for local businesses launching autonomous AI marketing.',
    features: [
      '1 Connected Ad Channel (Meta or Google)',
      '10 AI Creative & Copy Variants / month',
      'Automated Budget Pacing & Bid Caps',
      'Weekly Autonomous Action Reports',
      '1-Click Mobile Approvals',
    ],
    cta: 'Start with Starter',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '₹14,999',
    period: '/month',
    description: 'The complete AI marketing workforce for scaling revenue.',
    popular: true,
    features: [
      'Full Omnichannel Autonomy (Meta + Google + IG)',
      'Unlimited Ad Creatives & Video Scripts',
      'Autonomous Audience Optimization & A/B Testing',
      'Instant WhatsApp Lead Qualification & Routing',
      'Real-Time Attribution Cockpit & ROAS Tracking',
      'Dedicated Agent Support Channel',
    ],
    cta: 'Deploy Growth Agent',
  },
  {
    id: 'scale',
    name: 'Scale',
    price: 'Custom',
    period: 'tailored',
    description: 'Custom fine-tuned AI employees for multi-location enterprises.',
    features: [
      'Multi-Brand & Multi-Location Orchestration',
      'Custom Brand Voice & Fine-Tuned Visual Models',
      'Direct CRM & ERP Deep API Synchronization',
      'Custom Governance & Compliance Approval Workflows',
      'Dedicated Solutions Architect & 99.9% SLA',
    ],
    cta: 'Contact Enterprise',
  },
];

export const PricingPreview: React.FC = () => {
  return (
    <div id="pricing" className="space-y-12 select-none">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          <Sparkles className="h-3.5 w-3.5 text-purple-600" />
          <span>Sample Pricing • Zero Lock-In</span>
        </div>
        <h2 className="font-sans text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-900">
          Transparent, agency-replacing plans.
        </h2>
        <p className="text-sm sm:text-base text-zinc-600">
          Replace 5 fragmented tools and agency fees with one autonomous marketing employee.
        </p>
      </div>

      {/* 3 Glass Cards with Hover Lift */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`group relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2.5 shadow-md ${
              tier.popular
                ? 'bg-gradient-to-b from-purple-50/90 to-white border-2 border-purple-500 shadow-[0_16px_48px_rgba(124,58,237,0.12)]'
                : 'bg-white border border-zinc-200 hover:border-purple-300 hover:shadow-xl'
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white shadow-md">
                Most Popular
              </span>
            )}

            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-sans text-lg font-bold text-zinc-900">{tier.name}</h3>
                <span className="text-[10px] uppercase font-mono text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded font-semibold">
                  Sample plan
                </span>
              </div>

              <p className="text-xs text-zinc-600 mt-2 min-h-[32px]">
                {tier.description}
              </p>

              {/* Price */}
              <div className="mt-5 pb-5 border-b border-zinc-100 flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-extrabold text-zinc-900">
                  {tier.price}
                </span>
                <span className="text-xs text-zinc-500 font-mono">{tier.period}</span>
              </div>

              {/* Features List */}
              <ul className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-xs text-zinc-700">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-4">
              <Link
                href="/onboarding"
                className={`w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
                  tier.popular
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#9333EA] hover:from-[#6D28D9] hover:to-[#7E22CE] text-white shadow-purple-600/25'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200'
                }`}
              >
                <span>{tier.cta}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPreview;
