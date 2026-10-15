'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CreditCard, Sparkles, Check, Download, ShieldCheck } from 'lucide-react';

const mockInvoices = [
  { id: 'INV-2026-09', date: 'Oct 01, 2026', amount: '₹14,999', plan: 'Growth Tier (Monthly)', status: 'Paid' },
  { id: 'INV-2026-08', date: 'Sep 01, 2026', amount: '₹14,999', plan: 'Growth Tier (Monthly)', status: 'Paid' },
  { id: 'INV-2026-07', date: 'Aug 01, 2026', amount: '₹14,999', plan: 'Growth Tier (Monthly)', status: 'Paid' },
];

export default function SettingsBillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-[#111] dark:text-[#EDEDED]">Plan & Billing</h2>
        <p className="text-xs text-[#666] dark:text-[#888] mt-0.5">
          Workspace subscription tier, AI token limits, and past invoices.
        </p>
      </div>

      {/* Active Subscription Card */}
      <div className="p-5 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#7C3AED]" />
            <h3 className="font-bold text-sm text-[#111] dark:text-[#EDEDED]">Growth Tier Plan</h3>
            <Badge variant="success" size="sm" dot>
              Active
            </Badge>
          </div>
          <p className="text-xs text-[#666] dark:text-[#888]">
            Unlimited autonomous campaigns, ad creative generation, Core Web Vitals crawlers, and priority AI routing.
          </p>
          <div className="flex items-center gap-3 text-[11px] text-[#888] pt-1">
            <span>₹14,999 / month</span>
            <span>•</span>
            <span>Renews on Nov 01, 2026</span>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <Button size="sm" variant="outline" className="text-xs h-8">
            Change Plan
          </Button>
          <Button size="sm" variant="gradient" className="text-xs h-8 font-semibold shadow-xs">
            Manage Card
          </Button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-[#111] dark:text-[#EDEDED] uppercase tracking-wider">
          Invoice History
        </h3>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#EAEAEA] dark:border-[#333] text-[#888]">
              <th className="py-2.5 font-medium">Invoice ID</th>
              <th className="py-2.5 font-medium">Date</th>
              <th className="py-2.5 font-medium">Plan Description</th>
              <th className="py-2.5 font-medium">Amount</th>
              <th className="py-2.5 font-medium text-right">PDF</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAEAEA] dark:divide-[#222]">
            {mockInvoices.map((inv) => (
              <tr key={inv.id}>
                <td className="py-3 font-mono font-medium text-[#111] dark:text-[#EDEDED]">{inv.id}</td>
                <td className="py-3 text-[#666] dark:text-[#888]">{inv.date}</td>
                <td className="py-3 text-[#111] dark:text-[#EDEDED]">{inv.plan}</td>
                <td className="py-3 font-semibold text-[#111] dark:text-[#EDEDED]">{inv.amount}</td>
                <td className="py-3 text-right">
                  <button
                    type="button"
                    onClick={() => alert(`Demo Mode: Downloaded invoice ${inv.id}`)}
                    className="inline-flex items-center gap-1 text-[11px] text-[#7C3AED] hover:underline font-medium"
                  >
                    <Download className="h-3 w-3" /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
