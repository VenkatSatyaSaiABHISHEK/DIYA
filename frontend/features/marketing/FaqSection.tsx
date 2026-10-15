'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How does DIYA differ from a traditional digital marketing agency?',
    answer:
      'Traditional agencies take weeks to produce campaigns, charge hefty retainer fees, and operate with opaque reporting. DIYA is an autonomous AI employee that plans, generates creatives, writes ad copy, analyzes real-time ROAS, and executes optimizations in minutes—24/7 without agency markups.',
  },
  {
    question: 'Do I retain control over my marketing budgets and ad spend?',
    answer:
      'Yes, 100%. DIYA operates with strict financial guardrails. The AI will never launch a new campaign, increase daily ad spend, or reallocate budgets without your explicit 1-click confirmation on the dashboard or WhatsApp.',
  },
  {
    question: 'Which marketing platforms and tools can DIYA connect with?',
    answer:
      'DIYA natively connects with Meta Ads Manager (Facebook & Instagram), Google Ads, Google Analytics (GA4), Google Search Console, WhatsApp Business Cloud API, and standard CRMs via secure OAuth. You maintain full ownership of all accounts.',
  },
  {
    question: 'How quickly does DIYA start delivering results after setup?',
    answer:
      'Onboarding takes under 3 minutes. Once your brand profile and ad accounts are connected, DIYA immediately audits your historical performance and produces your first high-converting campaign flight within 15 minutes.',
  },
  {
    question: 'How does DIYA protect my brand guidelines and confidential business data?',
    answer:
      'Your company assets, customer lead lists, and creative guidelines are encrypted with 256-bit AES encryption at rest and in transit. DIYA never shares your proprietary marketing data with third parties or uses your private ad performance to train public models.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFC] select-none border-t border-zinc-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        {/* Left Column: Heading, Subtitle & Support Button */}
        <div className="lg:col-span-5 space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <HelpCircle className="h-3.5 w-3.5 text-purple-600" />
            <span>Support &amp; Answers</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 leading-tight">
            Questions? We&apos;ve got answers for you.
          </h2>

          <p className="text-sm text-zinc-600 leading-relaxed">
            Everything you need to know about deploying an autonomous AI marketing workforce for your business. Can&apos;t find what you&apos;re looking for? Reach out to our team anytime.
          </p>

          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-zinc-900 bg-white hover:bg-zinc-50 border border-zinc-200 shadow-xs hover:border-zinc-300 transition-all cursor-pointer"
            >
              <span>Contact AI Specialist</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Clean Accordion List (Matching Section 10 in reference screenshot) */}
        <div className="lg:col-span-7 space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-purple-300 shadow-sm'
                    : 'bg-white/80 border-zinc-200 hover:border-zinc-300 hover:bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full px-5 sm:px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-sans text-sm sm:text-base font-bold text-zinc-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-purple-700 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
