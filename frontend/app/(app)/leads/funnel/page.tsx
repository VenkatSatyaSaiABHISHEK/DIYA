'use client';

import React from 'react';
import Link from 'next/link';
import { LeadsQualificationTab } from '@/features/leads/components/qualification/LeadsQualificationTab';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Users, Kanban } from 'lucide-react';

export default function LeadsFunnelPage() {
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
            Funnel Telemetry
          </h1>
          <p className="text-sm text-[#666] dark:text-[#888] mt-1">
            Conversion stages, AI qualification breakdown, and drop-off diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/leads/pipeline">
            <Button size="sm" variant="outline" className="text-xs h-9" leftIcon={<Kanban className="h-3.5 w-3.5 text-[#7C3AED]" />}>
              Pipeline Board
            </Button>
          </Link>
          <Link href="/leads">
            <Button size="sm" variant="gradient" className="text-xs h-9 font-semibold" leftIcon={<Users className="h-4 w-4" />}>
              Directory Table
            </Button>
          </Link>
        </div>
      </div>

      <LeadsQualificationTab />
    </div>
  );
}
