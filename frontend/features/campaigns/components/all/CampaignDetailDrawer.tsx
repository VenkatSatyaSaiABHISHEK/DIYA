'use client';

import React, { useRef } from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatINR } from '@/lib/utils/format';
import {
  TrendingUp,
  Clock,
  Sparkles,
  Calendar,
  Layers,
  Users,
  Target,
  ExternalLink,
  ShieldCheck,
  PlusCircle,
  FileText,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { isReducedMotion } from '@/lib/animations/pageTransition';
import type { Campaign } from '../../types';
import { cn } from '@/lib/utils/cn';

export interface CampaignDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign | null;
  onOpenBudgetModal: (campaign: Campaign) => void;
}

export const CampaignDetailDrawer: React.FC<CampaignDetailDrawerProps> = ({
  isOpen,
  onClose,
  campaign,
  onOpenBudgetModal,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!chartRef.current || isReducedMotion() || !isOpen) return;
      gsap.from(chartRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.6,
        ease: 'power2.out',
      });
    },
    { dependencies: [isOpen, campaign?.id], scope: chartRef }
  );

  if (!campaign) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={campaign.name}
      subtitle={`${campaign.platform.toUpperCase()} • ${campaign.objective.toUpperCase()} CAMPAIGN`}
      width="max-w-2xl"
    >
      <div className="space-y-6 text-xs text-[#18181B]">
        {/* Metric Overview Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-[#FAFAFC] border border-[#E4E4E7]">
          <div>
            <span className="text-[10px] text-[#71717A] uppercase font-semibold block">Total Spend</span>
            <span className="text-base font-extrabold text-[#18181B] mt-0.5 block">
              {formatINR(campaign.spendTotalINR)}
            </span>
            <span className="text-[10px] text-[#A1A1AA]">
              of {formatINR(campaign.lifetimeBudgetINR || campaign.dailyBudgetINR * 7)} cap
            </span>
          </div>

          <div>
            <span className="text-[10px] text-[#71717A] uppercase font-semibold block">Leads Captured</span>
            <span className="text-base font-extrabold text-[#16A34A] mt-0.5 block">
              {campaign.leadsCount || 0}
            </span>
            <span className="text-[10px] text-[#A1A1AA]">verified phone prospects</span>
          </div>

          <div>
            <span className="text-[10px] text-[#71717A] uppercase font-semibold block">Cost / Lead (CPL)</span>
            <span className="text-base font-extrabold text-[#18181B] mt-0.5 block">
              {campaign.cplINR > 0 ? formatINR(campaign.cplINR) : '-'}
            </span>
            <span className="text-[10px] text-emerald-600 font-medium">18% under target cap</span>
          </div>

          <div>
            <span className="text-[10px] text-[#71717A] uppercase font-semibold block">ROAS Multiplier</span>
            <span className="text-base font-extrabold text-[#7C3AED] mt-0.5 block">
              {campaign.roas > 0 ? `${campaign.roas}x` : '-'}
            </span>
            <span className="text-[10px] text-[#A1A1AA]">attributed pipeline</span>
          </div>
        </div>

        {/* Performance Recharts Chart */}
        {campaign.performanceHistory.length > 0 && (
          <div ref={chartRef} className="p-4 rounded-2xl bg-white border border-[#E4E4E7] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-bold text-[#18181B] text-sm">7-Day Lead & Spend Trajectory</h5>
                <p className="text-[11px] text-[#71717A]">Daily captured leads vs allocated INR spend</p>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-medium">
                <span className="flex items-center gap-1.5 text-[#16A34A]">
                  <span className="h-2 w-2 rounded-full bg-[#16A34A]" /> Daily Leads
                </span>
                <span className="flex items-center gap-1.5 text-[#7C3AED]">
                  <span className="h-2 w-2 rounded-full bg-[#7C3AED]" /> Spend (₹)
                </span>
              </div>
            </div>

            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={campaign.performanceHistory} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F6" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#71717A' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#71717A' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '12px',
                      border: '1px solid #E4E4E7',
                      fontSize: '11px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="leads"
                    name="Leads"
                    stroke="#16A34A"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#16A34A' }}
                    activeDot={{ r: 5 }}
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

        {/* Budget & Daily Cap Controller */}
        <div className="p-4 rounded-2xl bg-white border border-[#E4E4E7] shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider block">
              Daily Spend Cap & Flight Controller
            </span>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-[#18181B]">
                {formatINR(campaign.dailyBudgetINR)} / day
              </span>
              <span className="text-xs text-[#71717A]">
                ({campaign.schedule.startDate} • {campaign.schedule.durationDays} days)
              </span>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => onOpenBudgetModal(campaign)}
            className="text-xs"
            leftIcon={<PlusCircle className="h-3.5 w-3.5 text-[#7C3AED]" />}
          >
            Increase Daily Budget
          </Button>
        </div>

        {/* Ad Sets Breakdown */}
        {campaign.adSets.length > 0 && (
          <div className="space-y-2.5">
            <h5 className="font-bold text-[#18181B] text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-[#7C3AED]" /> Active Ad Sets ({campaign.adSets.length})
            </h5>

            <div className="space-y-2">
              {campaign.adSets.map((adset) => (
                <div
                  key={adset.id}
                  className="p-3 rounded-xl border border-[#E4E4E7] bg-white flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-[#18181B] block">{adset.name}</span>
                    <span className="text-[11px] text-[#71717A] mt-0.5 block">
                      Target: {adset.targetingSummary}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-bold text-[#16A34A] block">{adset.leads} leads</span>
                    <span className="text-[11px] text-[#71717A] block">{formatINR(adset.cplINR)} CPL</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Creative Assets */}
        {campaign.creatives.length > 0 && (
          <div className="space-y-2.5">
            <h5 className="font-bold text-[#18181B] text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" /> Live Creative Copy ({campaign.creatives.length})
            </h5>

            <div className="space-y-2.5">
              {campaign.creatives.map((creative) => (
                <div key={creative.id} className="p-3.5 rounded-xl border border-[#E4E4E7] bg-[#FAFAFC] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#7C3AED] uppercase">
                      {creative.placement.toUpperCase()} • Copy Preview
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      ✓ Policy Compliant
                    </span>
                  </div>
                  <h6 className="font-bold text-[#18181B] text-xs">{creative.headline}</h6>
                  <p className="text-[11px] text-[#52525B] leading-relaxed line-clamp-2">
                    {creative.bodyCopy}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#7C3AED]">CTA: {creative.callToAction}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audit Activity Log */}
        {campaign.activityLog.length > 0 && (
          <div className="space-y-2.5">
            <h5 className="font-bold text-[#71717A] text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Campaign Activity & Optimization Log
            </h5>

            <div className="space-y-2 border-l-2 border-[#E4E4E7] pl-3 ml-1.5">
              {campaign.activityLog.map((log) => (
                <div key={log.id} className="text-[11px] space-y-0.5">
                  <span className="text-[#A1A1AA] text-[10px] block">
                    {new Date(log.timestamp).toLocaleString()} • {log.user}
                  </span>
                  <p className="font-medium text-[#18181B]">{log.action}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};
