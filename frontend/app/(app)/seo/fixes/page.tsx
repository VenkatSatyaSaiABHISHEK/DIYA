'use client';

import React from 'react';
import Link from 'next/link';
import { SeoAuditTab } from '@/features/seo/components/audit/SeoAuditTab';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Search, RefreshCw } from 'lucide-react';

export default function SeoFixesPage() {
  return (
    <div className="w-full space-y-6">
      {/* Back Link */}
      <Link
        href="/seo"
        className="inline-flex items-center gap-1.5 text-xs text-[#888] hover:text-[#111] dark:hover:text-[#FFF] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to SEO Overview</span>
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111] dark:text-[#EDEDED] tracking-tight">
            Technical Audit & Fixes
          </h1>
          <p className="text-sm text-[#666] dark:text-[#888] mt-1">
            Core Web Vitals health, crawl issues, and 1-click autonomous code & meta tag fixes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/seo/keywords">
            <Button size="sm" variant="outline" className="text-xs h-9" leftIcon={<Search className="h-3.5 w-3.5 text-[#7C3AED]" />}>
              View Keywords
            </Button>
          </Link>
          <Button size="sm" variant="gradient" className="text-xs h-9 font-semibold" leftIcon={<RefreshCw className="h-4 w-4" />}>
            Re-Crawl Site
          </Button>
        </div>
      </div>

      <SeoAuditTab />
    </div>
  );
}
