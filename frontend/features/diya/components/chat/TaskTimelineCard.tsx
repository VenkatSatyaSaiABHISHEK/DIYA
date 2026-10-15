'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  PlugZap,
  ShieldAlert,
} from 'lucide-react';
import type { TimelineRun, TimelineStep, RunStatus } from '../../types';
import { cn } from '@/lib/utils/cn';

export interface TaskTimelineCardProps {
  timeline: TimelineRun;
  onRetryStep?: (runId: string, stepId: string) => void;
}

export const TaskTimelineCard: React.FC<TaskTimelineCardProps> = ({
  timeline,
  onRetryStep,
}) => {
  const [expandedStepId, setExpandedStepId] = useState<string | null>(
    timeline.steps.find((s) => s.status === 'running' || s.status === 'awaiting_approval')?.id ||
      timeline.steps[0]?.id ||
      null
  );

  const toggleExpand = (id: string) => {
    setExpandedStepId(expandedStepId === id ? null : id);
  };

  const getStatusIcon = (status: RunStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />;
      case 'running':
        return (
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3AED] opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#7C3AED]" />
          </span>
        );
      case 'awaiting_approval':
        return <ShieldAlert className="h-4 w-4 text-[#F59E0B]" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-[#DC2626]" />;
      case 'pending':
      default:
        return <Clock className="h-4 w-4 text-[#A1A1AA]" />;
    }
  };

  return (
    <Card className="p-4 border border-[#E4E4E7] bg-white shadow-xs max-w-xl my-2">
      <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F6]">
        <div>
          <span className="text-[10px] text-[#71717A] font-semibold uppercase tracking-wider block">
            Execution Progress
          </span>
          <h5 className="text-xs sm:text-sm font-bold text-[#18181B]">{timeline.title}</h5>
        </div>

        <Badge
          variant={
            timeline.status === 'completed'
              ? 'success'
              : timeline.status === 'running'
              ? 'info'
              : timeline.status === 'awaiting_approval'
              ? 'warning'
              : 'neutral'
          }
          size="sm"
          dot
        >
          {timeline.status.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>

      {/* Vertical Steps */}
      <div className="relative mt-4 space-y-4 pl-6">
        {/* Continuous vertical timeline connector line */}
        <div className="absolute left-2.5 top-2 bottom-3 w-0.5 bg-[#E4E4E7]" />

        {timeline.steps.map((step, idx) => {
          const isExpanded = expandedStepId === step.id;

          return (
            <div key={step.id} className="relative text-xs">
              {/* Step indicator node */}
              <div className="absolute -left-6 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-white ring-4 ring-white">
                {getStatusIcon(step.status)}
              </div>

              <div className="p-2.5 rounded-xl border border-[#F4F4F6] bg-[#FAFAFC]/70 hover:bg-[#FAFAFC] transition-colors">
                <div
                  className="flex items-center justify-between cursor-pointer select-none"
                  onClick={() => toggleExpand(step.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#18181B]">{step.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {step.requiresApproval && step.status === 'awaiting_approval' && (
                      <span className="text-[10px] font-semibold text-[#B45309] bg-[#FFFBEB] px-1.5 py-0.5 rounded border border-[#FDE68A]">
                        Awaiting sign-off
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="h-3.5 w-3.5 text-[#71717A]" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 text-[#71717A]" />
                    )}
                  </div>
                </div>

                {/* Expanded Details & Log lines */}
                {isExpanded && (
                  <div className="mt-2.5 pt-2 border-t border-[#E4E4E7]/60 space-y-2">
                    {step.missingIntegration && (
                      <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between">
                        <span className="text-[11px] font-medium">
                          Needs {step.missingIntegration.toUpperCase()} connection
                        </span>
                        <Link
                          href="/settings"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7C3AED] hover:underline"
                        >
                          <PlugZap className="h-3 w-3" /> Connect
                        </Link>
                      </div>
                    )}

                    {step.logs.length > 0 && (
                      <div className="p-2 rounded-lg bg-[#18181B] text-[#A1A1AA] font-mono text-[10px] space-y-1">
                        {step.logs.map((log, logIdx) => (
                          <div key={logIdx} className="leading-tight">
                            <span className="text-[#7C3AED] mr-1.5">›</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      {step.outputLink && (
                        <Link
                          href={step.outputLink.href}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7C3AED] hover:underline"
                        >
                          <span>{step.outputLink.label}</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      )}

                      {step.status === 'failed' && onRetryStep && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onRetryStep(timeline.id, step.id)}
                          className="text-xs h-7 ml-auto"
                          leftIcon={<RefreshCw className="h-3 w-3" />}
                        >
                          Retry Step
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
