'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCampaignsList } from '@/features/campaigns/hooks/useCampaignsList';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils/format';
import { ArrowLeft, Megaphone, PlusCircle, Sparkles, TrendingUp, DollarSign, Layers } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { campaigns } = useCampaignsList();

  const id = params?.id as string;
  const campaign = campaigns.find((c) => c.id === id) || campaigns[0];

  if (!campaign) {
    return (
      <div className="py-12 text-center space-y-3">
        <p className="text-sm text-[#888]">Campaign not found.</p>
        <Link href="/campaigns">
          <Button size="sm" variant="outline">
            Back to Campaigns
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Back Link */}
      <Link
        href="/campaigns"
        className="inline-flex items-center gap-1.5 text-xs text-[#888] hover:text-[#111] dark:hover:text-[#FFF] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Campaigns</span>
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111] dark:text-[#EDEDED] tracking-tight">
              {campaign.name}
            </h1>
            <Badge variant="success" size="sm" dot>
              {campaign.status.toUpperCase()}
            </Badge>
          </div>
          <p className="text-sm text-[#666] dark:text-[#888] mt-1">
            {campaign.platform.toUpperCase()} flight • Objective: {campaign.objective.toUpperCase()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/campaigns/studio">
            <Button size="sm" variant="outline" className="text-xs h-9">
              Creative Canvas
            </Button>
          </Link>
          <Link href="/campaigns/new">
            <Button size="sm" variant="gradient" className="text-xs h-9 font-semibold">
              Edit Campaign
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs">
          <span className="text-[11px] font-semibold text-[#888] uppercase block">Total Spend</span>
          <span className="text-xl font-bold text-[#111] dark:text-[#EDEDED] mt-1 block">
            {formatINR(campaign.spendTotalINR)}
          </span>
          <span className="text-[10px] text-[#888]">of {formatINR(campaign.dailyBudgetINR * 7)} cap</span>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs">
          <span className="text-[11px] font-semibold text-[#888] uppercase block">Leads Captured</span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
            {campaign.leadsCount || 0}
          </span>
          <span className="text-[10px] text-[#888]">verified phone prospects</span>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs">
          <span className="text-[11px] font-semibold text-[#888] uppercase block">Cost Per Lead (CPL)</span>
          <span className="text-xl font-bold text-[#111] dark:text-[#EDEDED] mt-1 block">
            {campaign.cplINR > 0 ? formatINR(campaign.cplINR) : '-'}
          </span>
          <span className="text-[10px] text-emerald-600">18% under target cap</span>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs">
          <span className="text-[11px] font-semibold text-[#888] uppercase block">Attributed ROAS</span>
          <span className="text-xl font-bold text-[#7C3AED] mt-1 block">
            {campaign.roas > 0 ? `${campaign.roas}x` : '-'}
          </span>
          <span className="text-[10px] text-[#888]">pipeline return</span>
        </div>
      </div>

      {/* Chart Section */}
      {campaign.performanceHistory.length > 0 && (
        <div className="p-5 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111] dark:text-[#EDEDED]">
              7-Day Performance & Spend Trajectory
            </h3>
            <span className="text-xs text-[#888]">Daily captured prospects</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={campaign.performanceHistory} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.15} vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10, 10, 10, 0.95)',
                    borderRadius: '8px',
                    border: '1px solid #333',
                    fontSize: '11px',
                    color: '#EDEDED',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="leads"
                  name="Leads"
                  stroke="#16A34A"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#16A34A' }}
                />
                <Line
                  type="monotone"
                  dataKey="spendINR"
                  name="Spend (₹)"
                  stroke="#7C3AED"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
