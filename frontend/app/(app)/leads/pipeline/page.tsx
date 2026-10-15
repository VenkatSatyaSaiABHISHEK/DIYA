'use client';

import React from 'react';
import Link from 'next/link';
import { LeadsPipelineBoard } from '@/features/leads/components/pipeline/LeadsPipelineBoard';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Users, Plus } from 'lucide-react';

export default function LeadsPipelinePage() {
  return (
    <div className="w-full space-y-6">
      {/* Back Link */}
      <Link
        href="/leads"
        className="inline-flex items-center gap-1.5 text-xs text-[#888] hover:text-[#111] dark:hover:text-[#FFF] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Leads Directory</span>
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111] dark:text-[#EDEDED] tracking-tight">
            Pipeline Board
          </h1>
          <p className="text-sm text-[#666] dark:text-[#888] mt-1">
            Visual deal stages: New Inbound, AI Qualified, Site Visit Booked, Negotiation, Won.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/leads">
            <Button size="sm" variant="outline" className="text-xs h-9" leftIcon={<Users className="h-3.5 w-3.5 text-[#7C3AED]" />}>
              Table View
            </Button>
          </Link>
          <Button size="sm" variant="gradient" className="text-xs h-9 font-semibold" leftIcon={<Plus className="h-4 w-4" />}>
            Add Deal
          </Button>
        </div>
      </div>

      <LeadsPipelineBoard />
    </div>
  );
}
