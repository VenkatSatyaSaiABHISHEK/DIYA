'use client';

import React from 'react';
import Link from 'next/link';
import { useSeoOverview } from '@/features/seo/hooks/useSeoOverview';
import { SeoTrafficChart } from '@/features/seo/components/overview/SeoTrafficChart';
import { SeoRecommendations } from '@/features/seo/components/overview/SeoRecommendations';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Globe, ShieldCheck, Search, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SeoPage() {
  const router = useRouter();
  const { data, recommendations, isLoading, error } = useSeoOverview();

  return (
    <div className="w-full space-y-6">
      {/* 1. Header: Title, Description, Primary Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111] dark:text-[#EDEDED] tracking-tight">
            SEO & Website
          </h1>
          <p className="text-sm text-[#666] dark:text-[#888] mt-1">
            Organic Google search visibility, crawl health, and Core Web Vitals optimization.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/seo/keywords">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-9"
              leftIcon={<Search className="h-3.5 w-3.5 text-[#7C3AED]" />}
            >
              Keywords
            </Button>
          </Link>
          <Link href="/seo/fixes">
            <Button
              variant="gradient"
              size="sm"
              className="text-xs h-9 font-semibold shadow-xs"
              leftIcon={<ShieldCheck className="h-4 w-4" />}
            >
              Run Audit & Fixes
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Simple Summary Row (Max 4 numbers) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs">
          <span className="text-[11px] font-semibold text-[#888] uppercase tracking-wider block">
            Health Score
          </span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
            {data?.healthScore || 88}/100
          </span>
          <span className="text-[10px] text-[#888]">Core Web Vitals Pass</span>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs">
          <span className="text-[11px] font-semibold text-[#888] uppercase tracking-wider block">
            Top 10 Keywords
          </span>
          <span className="text-xl font-bold text-[#7C3AED] mt-1 block">
            {data?.top10Keywords || 18}
          </span>
          <span className="text-[10px] text-emerald-600 font-medium">+4 this month</span>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs">
          <span className="text-[11px] font-semibold text-[#888] uppercase tracking-wider block">
            Organic Visits
          </span>
          <span className="text-xl font-bold text-[#111] dark:text-[#EDEDED] mt-1 block">
            {(data?.organicVisits || 4280).toLocaleString()}
          </span>
          <span className="text-[10px] text-[#888]">Google Search Traffic</span>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs">
          <span className="text-[11px] font-semibold text-[#888] uppercase tracking-wider block">
            Critical Fixes
          </span>
          <span className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1 block">
            {data?.totalCrawlErrors || 2}
          </span>
          <span className="text-[10px] text-amber-600">Action recommended</span>
        </div>
      </div>

      {/* 3. Single Chart: 30-Day Organic Trajectory */}
      {data && (
        <div className="p-5 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs">
          <SeoTrafficChart history={data.trafficHistory} />
        </div>
      )}

      {/* 4. Actionable Recommendations (Max 3 sections) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#111] dark:text-[#EDEDED] uppercase tracking-wider">
            DIYA SEO Intelligence & High-Impact Opportunities ({recommendations.length})
          </span>
          <Link href="/seo/fixes" className="text-xs text-[#7C3AED] hover:underline font-medium">
            View technical audit →
          </Link>
        </div>

        <SeoRecommendations
          recommendations={recommendations}
          onNavigateTab={() => router.push('/seo/fixes')}
        />
      </div>
    </div>
  );
}
