'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Circle, ArrowRight, PlugZap, Building, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface SetupChecklistProps {
  className?: string;
}

export const SetupChecklist: React.FC<SetupChecklistProps> = ({ className }) => {
  const router = useRouter();

  const steps = [
    {
      id: 'step-1',
      title: 'Connect Meta Ads',
      description: 'Link your Meta ad account to enable automated pacing, AI creative synthesis, and lead syncing.',
      icon: <PlugZap className="h-4 w-4" />,
      completed: false,
      action: () => router.push('/settings/integrations'),
      buttonText: 'Connect account',
    },
    {
      id: 'step-2',
      title: 'Add brand info',
      description: 'Provide your website, core value proposition, and brand voice guidelines for tailored copy.',
      icon: <Building className="h-4 w-4" />,
      completed: true,
      action: () => router.push('/settings/brand'),
      buttonText: 'Edit brand',
    },
    {
      id: 'step-3',
      title: 'Set your budget',
      description: 'Establish daily spending guardrails and target cost-per-lead limits.',
      icon: <Wallet className="h-4 w-4" />,
      completed: false,
      action: () => router.push('/campaigns/new'),
      buttonText: 'Set budget',
    },
  ];

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPct = Math.round((completedCount / steps.length) * 100);

  return (
    <Card
      className={cn(
        'p-6 sm:p-8 rounded-[22px] bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626]',
        'shadow-[0_4px_24px_rgba(124,58,237,0.08)] flex flex-col gap-6',
        className
      )}
    >
      {/* Top Header: Title & Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F4F4F6] dark:border-[#222]">
        <div>
          <h3 className="font-serif text-2xl font-normal text-[#111111] dark:text-[#EDEDED] tracking-tight">
            Complete your growth workspace setup
          </h3>
          <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#888888] mt-1">
            Connect your channels so DIYA can autonomously manage ad spend and optimize conversions.
          </p>
        </div>

        {/* Progress Counter */}
        <div className="shrink-0 flex flex-col sm:items-end gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#7C3AED] dark:text-[#A78BFA]">
              {completedCount} of {steps.length} completed
            </span>
            <span className="text-xs text-[#71717A]">({progressPct}%)</span>
          </div>
          <div className="w-36 h-2 rounded-full bg-[#F4F4F6] dark:bg-[#222] overflow-hidden">
            <div
              className="h-full bg-[#7C3AED] rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            className={cn(
              'p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4',
              step.completed
                ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/20'
                : 'border-[#EAEAEA] dark:border-[#262626] bg-[#FAFAFC] dark:bg-[#121214] hover:border-[#D4D4D8] dark:hover:border-[#383838]'
            )}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-[#71717A] uppercase tracking-wider">
                  Step {idx + 1}
                </span>
                {step.completed ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Done</span>
                  </span>
                ) : (
                  <Circle className="h-4 w-4 text-[#A1A1AA]" />
                )}
              </div>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white dark:bg-[#1C1C20] border border-[#EAEAEA] dark:border-[#2E2E32] text-[#7C3AED]">
                  {step.icon}
                </div>
                <h4 className="text-sm font-bold text-[#18181B] dark:text-[#EDEDED]">
                  {step.title}
                </h4>
              </div>

              <p className="text-xs text-[#71717A] dark:text-[#888888] mt-2 leading-relaxed">
                {step.description}
              </p>
            </div>

            <Button
              size="sm"
              variant={step.completed ? 'outline' : 'primary'}
              onClick={step.action}
              className="w-full text-xs font-semibold shadow-xs"
            >
              <span>{step.buttonText}</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
