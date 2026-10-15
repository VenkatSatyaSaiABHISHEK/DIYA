'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Users, Target, Plus, Sparkles } from 'lucide-react';

const mockAudiences = [
  {
    id: 'aud-1',
    name: 'Hyderabad Ultra HNI Tech Leadership',
    description: 'Founders, VP of Engineering & CXOs living within 15km of Gachibowli / Financial District.',
    size: '14,200 prospective buyers',
    source: 'Meta Ads & LinkedIn Campaign',
    status: 'active',
  },
  {
    id: 'aud-2',
    name: 'US & UAE NRI Property Investors',
    description: 'Non-resident Indians searching for luxury apartments and sky villas in Hyderabad.',
    size: '28,500 prospective buyers',
    source: 'Google Ads Search Intent',
    status: 'active',
  },
  {
    id: 'aud-3',
    name: 'High-Intent Site Visitors (Last 30 Days)',
    description: 'Users who spent > 2 minutes on the 4BHK Sky Villa penthouse virtual tour.',
    size: '3,840 prospective buyers',
    source: 'Website Pixel Retargeting',
    status: 'active',
  },
];

export default function LeadsAudiencesPage() {
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
            Target Audiences
          </h1>
          <p className="text-sm text-[#666] dark:text-[#888] mt-1">
            Custom audience cohorts synchronized across Meta Ads, Google Ads, and CRM tags.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/leads">
            <Button size="sm" variant="outline" className="text-xs h-9" leftIcon={<Users className="h-3.5 w-3.5 text-[#7C3AED]" />}>
              All Leads
            </Button>
          </Link>
          <Button size="sm" variant="gradient" className="text-xs h-9 font-semibold" leftIcon={<Plus className="h-4 w-4" />}>
            Create Audience
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {mockAudiences.map((aud) => (
          <div
            key={aud.id}
            className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-[#7C3AED]" />
                <h3 className="font-bold text-sm text-[#111] dark:text-[#EDEDED]">{aud.name}</h3>
                <Badge variant="success" size="sm" dot>
                  {aud.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-[#666] dark:text-[#888]">{aud.description}</p>
              <div className="flex items-center gap-3 text-[11px] text-[#888] pt-1">
                <span>Source: {aud.source}</span>
                <span>•</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{aud.size}</span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <Button size="sm" variant="outline" className="text-xs h-8">
                Edit Filters
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
