'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How does DIYA differ from a traditional digital marketing agency?',
    answer:
      'Traditional agencies take weeks to produce campaigns, charge hefty retainer fees, and operate with black-box reporting. DIYA is an autonomous AI marketing employee that plans, generates creatives, writes ad copy, analyzes real-time ROAS, and suggests optimizations in minutes—24/7 without agency markups.',
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
      'Your company assets, customer lead lists, and creative guidelines are encrypted at rest and in transit. DIYA never shares your proprietary marketing data with third parties or uses your private ad performance to train public models.',
  },
];

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div id="faq" className="max-w-4xl mx-auto space-y-8 select-none">
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          <HelpCircle className="h-3.5 w-3.5 text-purple-600" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="font-sans text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
          Everything you need to know about DIYA.
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-purple-50/40 border-purple-300 shadow-sm'
                  : 'bg-white border-zinc-200 hover:border-purple-200 hover:bg-zinc-50/40'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full px-5 sm:px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-sans text-sm sm:text-base font-semibold text-zinc-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-purple-600 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-purple-100 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
