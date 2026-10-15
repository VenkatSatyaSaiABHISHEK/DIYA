'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils/format';
import {
  Download,
  Share2,
  Sparkles,
  ArrowRight,
  Users,
  PieChart as PieIcon,
  Calendar,
  AlertCircle,
  HelpCircle,
  Target,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from 'recharts';
import type { StrategyOutput } from '../../types';
import { useUIStore } from '@/store/ui.store';

export interface StrategyOutputViewProps {
  strategy: StrategyOutput;
  onTurnIntoCampaigns: () => void;
}

const channelColors: Record<string, string> = {
  meta: '#7C3AED',
  google: '#16A34A',
  linkedin: '#0A66C2',
  instagram: '#E1306C',
};

export const StrategyOutputView: React.FC<StrategyOutputViewProps> = ({
  strategy,
  onTurnIntoCampaigns,
}) => {
  const { addToast } = useUIStore();

  const handleExport = () => {
    // Generate clean markdown content and trigger client download
    const md = `# Marketing Strategy — DIYA AI\n\n${strategy.summary}\n\n## Personas\n${strategy.personas
      .map((p) => `### ${p.name} (${p.role})\n${p.demographics}\n- Motivation: ${p.buyingMotivation}`)
      .join('\n\n')}\n\n## 30-Day Roadmap\n${strategy.roadmap
      .map((r) => `### ${r.dayRange}: ${r.title}\n- Deliverables: ${r.deliverables.join(', ')}\n- Target: ${r.expectedMilestone}`)
      .join('\n\n')}`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diya-marketing-strategy-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);

    addToast('Strategy exported as Markdown successfully!', 'success');
  };

  const pieData = strategy.channelAllocations.map((c) => ({
    name: c.platform.toUpperCase(),
    value: c.percentage,
    amount: c.monthlyBudgetINR,
  }));

  const barData = strategy.channelAllocations.map((c) => ({
    name: c.platform.toUpperCase(),
    budget: c.monthlyBudgetINR,
    minLeads: c.projectedLeadsRange[0],
    maxLeads: c.projectedLeadsRange[1],
  }));

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#E4E4E7] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#7C3AED] bg-[#EDE9FE] px-2 py-0.5 rounded-full uppercase tracking-wider">
              Autonomous Growth Blueprint
            </span>
            <span className="text-xs text-[#71717A]">
              Generated {new Date(strategy.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h3 className="text-base font-bold text-[#18181B] mt-1">
            30-Day Omnichannel Growth Playbook
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleExport}
            className="text-xs"
            leftIcon={<Download className="h-3.5 w-3.5" />}
          >
            Export Strategy
          </Button>

          <Button
            size="sm"
            variant="gradient"
            onClick={onTurnIntoCampaigns}
            className="text-xs font-semibold shadow-md shadow-[#7C3AED]/20"
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
          >
            Turn into Campaigns
          </Button>
        </div>
      </div>

      {/* Strategy Summary Card */}
      <Card className="p-5 border border-[#E4E4E7] bg-white">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C3AED] mb-2 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" /> Executive Strategic Thesis
        </h4>
        <p className="text-sm text-[#18181B] leading-relaxed font-medium">
          {strategy.summary}
        </p>

        {/* Forecasts banner with transparent assumptions */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#FAFAFC] border border-[#F4F4F6] grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <span className="text-[10px] font-semibold text-[#71717A] uppercase tracking-wider block">
              Projected Monthly Leads (Estimate)
            </span>
            <span className="text-lg font-extrabold text-[#7C3AED] mt-0.5 block">
              {strategy.projectedMonthlyLeadsRange[0]} – {strategy.projectedMonthlyLeadsRange[1]} Leads
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-[#71717A] uppercase tracking-wider block">
              Projected CPL Range (Estimate)
            </span>
            <span className="text-lg font-extrabold text-[#16A34A] mt-0.5 block">
              {formatINR(strategy.projectedCpaRangeINR[0])} – {formatINR(strategy.projectedCpaRangeINR[1])}
            </span>
          </div>

          <div className="text-[11px] text-[#71717A] italic border-t sm:border-t-0 sm:border-l border-[#E4E4E7] sm:pl-3 pt-2 sm:pt-0">
            <span className="font-semibold not-italic block text-[#18181B] mb-0.5">
              Assumptions:
            </span>
            {strategy.forecastAssumptions[0]}
          </div>
        </div>
      </Card>

      {/* Target Buyer Personas */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-[#18181B] flex items-center gap-2">
          <Users className="h-4 w-4 text-[#7C3AED]" /> Target Buyer Personas
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {strategy.personas.map((persona, idx) => (
            <Card key={idx} className="p-4 border border-[#E4E4E7] bg-white space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="text-sm font-bold text-[#18181B]">{persona.name}</h5>
                  <span className="text-xs text-[#7C3AED] font-medium">{persona.role}</span>
                </div>
                <Badge variant="primary" size="sm">
                  Priority Persona
                </Badge>
              </div>

              <p className="text-xs text-[#52525B] leading-relaxed">
                {persona.demographics}
              </p>

              <div className="p-2.5 rounded-lg bg-[#FAFAFC] border border-[#F4F4F6] text-xs">
                <span className="text-[10px] font-semibold text-[#71717A] uppercase tracking-wider block mb-1">
                  Core Buying Motivation
                </span>
                <p className="text-[#18181B] font-medium">{persona.buyingMotivation}</p>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[10px] text-[#71717A] font-medium">Channels:</span>
                {persona.preferredChannels.map((ch, chIdx) => (
                  <span
                    key={chIdx}
                    className="text-[10px] font-semibold text-[#52525B] bg-[#F4F4F6] px-2 py-0.5 rounded-md"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Channel Allocation (Donut) & Budget Distribution (Bar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Donut Chart: Channel Share */}
        <Card className="lg:col-span-5 p-4 border border-[#E4E4E7] bg-white flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#18181B] flex items-center gap-1.5">
              <PieIcon className="h-3.5 w-3.5 text-[#7C3AED]" /> Channel Budget Allocation
            </h4>
            <p className="text-[11px] text-[#71717A] mt-0.5">
              Recommended cross-channel split based on CPA benchmarks
            </p>
          </div>

          <div className="h-48 my-3">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={channelColors[entry.name.toLowerCase()] || '#7C3AED'}
                    />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(value: any, name: any) => [`${value}% share`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-[#F4F4F6] text-xs">
            {strategy.channelAllocations.map((c) => (
              <div key={c.platform} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: channelColors[c.platform] || '#7C3AED' }}
                  />
                  <span className="font-semibold text-[#18181B] uppercase">{c.platform}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#71717A]">{c.percentage}%</span>
                  <span className="font-bold text-[#18181B]">
                    {formatINR(c.monthlyBudgetINR)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Bar Chart: Projected Leads Per Channel */}
        <Card className="lg:col-span-7 p-4 border border-[#E4E4E7] bg-white flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#18181B] flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-[#16A34A]" /> Projected Lead Volume By Platform
            </h4>
            <p className="text-[11px] text-[#71717A] mt-0.5">
              Estimated lead volume ranges (Estimate based on target CPA)
            </p>
          </div>

          <div className="h-48 my-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <RechartsTooltip />
                <Bar dataKey="maxLeads" name="Max Estimated Leads" fill="#7C3AED" radius={[6, 6, 0, 0]} />
                <Bar dataKey="minLeads" name="Min Estimated Leads" fill="#C4B5FD" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-2.5 rounded-lg bg-[#FAFAFC] border border-[#F4F4F6] text-[11px] text-[#71717A]">
            Estimates are projected using historical CPMs and conversion baselines. Real metrics are tracked dynamically once ads are deployed.
          </div>
        </Card>
      </div>

      {/* Visual 30-Day Roadmap */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-[#18181B] flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#7C3AED]" /> Visual 30-Day Execution Roadmap
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {strategy.roadmap.map((m, idx) => (
            <Card key={idx} className="p-4 border border-[#E4E4E7] bg-white flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#7C3AED] bg-[#EDE9FE] px-2 py-0.5 rounded-md inline-block mb-1.5">
                  {m.dayRange}
                </span>
                <h5 className="text-xs font-bold text-[#18181B]">{m.title}</h5>

                <ul className="mt-2.5 space-y-1">
                  {m.deliverables.map((d, dIdx) => (
                    <li key={dIdx} className="text-[11px] text-[#52525B] flex items-start gap-1.5">
                      <span className="text-[#16A34A] font-bold">✓</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-2.5 border-t border-[#F4F4F6] text-[11px] text-[#15803D] bg-[#F0FDF4] p-2 rounded-lg font-medium">
                Goal: {m.expectedMilestone}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
