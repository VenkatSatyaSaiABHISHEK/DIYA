'use client';

import React from 'react';
import Link from 'next/link';
import { SeoKeywordsTab } from '@/features/seo/components/keywords/SeoKeywordsTab';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Plus, ShieldCheck } from 'lucide-react';

export default function SeoKeywordsPage() {
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
            Tracked Keywords
          </h1>
          <p className="text-sm text-[#666] dark:text-[#888] mt-1">
            Google search rankings, search intent, volume, and competitive positions in Hyderabad.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/seo/fixes">
            <Button size="sm" variant="outline" className="text-xs h-9" leftIcon={<ShieldCheck className="h-3.5 w-3.5 text-[#7C3AED]" />}>
              Site Fixes
            </Button>
          </Link>
          <Button size="sm" variant="gradient" className="text-xs h-9 font-semibold" leftIcon={<Plus className="h-4 w-4" />}>
            Add Keyword
          </Button>
        </div>
      </div>

      <SeoKeywordsTab onNavigateTab={() => {}} />
    </div>
  );
}
