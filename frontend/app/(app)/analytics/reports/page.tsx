'use client';

import React from 'react';
import Link from 'next/link';
import { AttributionTab } from '@/features/analytics/components/attribution/AttributionTab';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, BarChart3, Download } from 'lucide-react';

export default function AnalyticsReportsPage() {
  return (
    <div className="w-full space-y-6">
      {/* Back Link */}
      <Link
        href="/analytics"
        className="inline-flex items-center gap-1.5 text-xs text-[#888] hover:text-[#111] dark:hover:text-[#FFF] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Analytics Overview</span>
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111] dark:text-[#EDEDED] tracking-tight">
            Attribution Journeys
          </h1>
          <p className="text-sm text-[#666] dark:text-[#888] mt-1">
            Multi-touch prospect paths, touchpoint credit distribution, and assisted conversions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/analytics">
            <Button size="sm" variant="outline" className="text-xs h-9" leftIcon={<BarChart3 className="h-3.5 w-3.5 text-[#7C3AED]" />}>
              Overview
            </Button>
          </Link>
          <Button size="sm" variant="gradient" className="text-xs h-9 font-semibold" leftIcon={<Download className="h-4 w-4" />}>
            Export Attribution
          </Button>
        </div>
      </div>

      <AttributionTab />
    </div>
  );
}
