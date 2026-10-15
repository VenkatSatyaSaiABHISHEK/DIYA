'use client';

import React, { useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatINR } from '@/lib/utils/format';
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Layers,
  Send,
  XCircle,
  HelpCircle,
  ShieldAlert,
  Search,
  Megaphone,
  Share2,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { animateStagger } from '@/lib/animations/stagger';
import type { Plan, PlanStep, PlanStepState, StepType } from '../../types';
import { cn } from '@/lib/utils/cn';

export interface PlanCardProps {
  plan: Plan;
  onApprove: (planId: string, financialAmountINR?: number) => void;
  onReject: (planId: string) => void;
  onApproveStep?: (planId: string, stepId: string) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  onApprove,
  onReject,
  onApproveStep,
}) => {
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!stepsContainerRef.current) return;
      const stepItems = stepsContainerRef.current.querySelectorAll('.plan-step-item');
      animateStagger(stepItems, { stagger: 0.08, yOffset: 10 });
    },
    { dependencies: [plan.steps.length], scope: stepsContainerRef }
  );

  const getStepStateBadge = (status: PlanStepState) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="success" size="sm" dot>
            Completed
          </Badge>
        );
      case 'running':
        return (
          <Badge variant="info" size="sm" dot>
            Running
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="primary" size="sm" dot>
            Approved
          </Badge>
        );
      case 'recommendation':
        return (
          <Badge variant="warning" size="sm" dot>
            Recommendation
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="danger" size="sm" dot>
            Rejected
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="danger" size="sm" dot>
            Failed
          </Badge>
        );
      case 'draft':
      default:
        return (
          <Badge variant="neutral" size="sm" dot>
            Draft
          </Badge>
        );
    }
  };

  const getStepTypeIcon = (type: StepType) => {
    switch (type) {
      case 'analysis':
        return <Search className="h-3.5 w-3.5 text-blue-600" />;
      case 'creative':
        return <Sparkles className="h-3.5 w-3.5 text-purple-600" />;
      case 'campaign':
        return <Megaphone className="h-3.5 w-3.5 text-amber-600" />;
      case 'publish':
        return <Share2 className="h-3.5 w-3.5 text-emerald-600" />;
      case 'report':
        return <FileText className="h-3.5 w-3.5 text-indigo-600" />;
      default:
        return <Layers className="h-3.5 w-3.5 text-zinc-600" />;
    }
  };

  const getStepTypeLabel = (type: StepType) => {
    switch (type) {
      case 'analysis':
        return 'Market Analysis';
      case 'creative':
        return 'Creative Generation';
      case 'campaign':
        return 'Ad Campaign Flight';
      case 'publish':
        return 'Live Channel Publish';
      case 'report':
        return 'Performance Audit';
      default:
        return type;
    }
  };

  const isPlanApproved = plan.status === 'approved';
  const isPlanRejected = plan.status === 'rejected';
  const isAwaitingApproval = !isPlanApproved && !isPlanRejected;

  return (
    <Card
      id={isAwaitingApproval ? 'active-plan-card' : undefined}
      className={cn(
        'p-5 border bg-white shadow-card max-w-2xl my-2 transition-all duration-300',
        isAwaitingApproval ? 'border-[#DDD6FE] shadow-md' : 'border-[#E4E4E7]'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-[#F4F4F6]">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold text-[#7C3AED] bg-[#EDE9FE] px-2 py-0.5 rounded-full uppercase tracking-wider">
              Structured Operational Plan
            </span>
            {isPlanApproved ? (
              <Badge variant="success" size="sm" dot>
                Plan Approved
              </Badge>
            ) : isPlanRejected ? (
              <Badge variant="danger" size="sm" dot>
                Plan Rejected
              </Badge>
            ) : (
              <Badge variant="warning" size="sm" dot>
                Awaiting Sign-Off
              </Badge>
            )}
          </div>
          <h4 className="text-sm sm:text-base font-bold text-[#18181B] mt-1.5 leading-snug">
            {plan.goal}
          </h4>
        </div>

        {plan.totalCostINR && (
          <div className="text-right shrink-0 bg-[#FAFAFC] px-3 py-1.5 rounded-xl border border-[#E4E4E7]">
            <span className="text-[10px] text-[#71717A] block font-medium">Allocated Budget</span>
            <span className="text-xs font-bold text-[#18181B]">
              {formatINR(plan.totalCostINR)}
            </span>
          </div>
        )}
      </div>

      {/* Awaiting Approval Action Callout */}
      {isAwaitingApproval && (
        <div className="mt-3.5 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs">
            <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0" />
            <span>
              <strong>Owner Authorization Required:</strong> Live ad spend capped at {formatINR(plan.totalCostINR || 14000)}.
            </span>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={() => onApprove(plan.id, plan.totalCostINR)}
            className="text-xs h-7 font-bold shrink-0 self-end sm:self-auto bg-[#7C3AED] hover:bg-[#6D28D9]"
            rightIcon={<ArrowRight className="h-3 w-3" />}
          >
            Authorize Now
          </Button>
        </div>
      )}

      {/* Assumptions Section */}
      {plan.assumptions.length > 0 && (
        <div className="my-3 p-3 rounded-xl bg-[#FAFAFC] border border-[#F4F4F6]">
          <span className="text-[10px] font-semibold text-[#71717A] uppercase tracking-wider block mb-1.5 flex items-center gap-1">
            <HelpCircle className="h-3 w-3 text-[#A1A1AA]" />
            Operating Assumptions & Parameters
          </span>
          <ul className="space-y-1">
            {plan.assumptions.map((assump, idx) => (
              <li key={idx} className="text-xs text-[#52525B] flex items-start gap-1.5">
                <span className="text-[#7C3AED] mt-0.5">•</span>
                <span>{assump}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Steps List */}
      <div ref={stepsContainerRef} className="mt-3.5 space-y-2.5">
        <span className="text-[10px] font-semibold text-[#71717A] uppercase tracking-wider block">
          Work Execution Steps ({plan.steps.length})
        </span>

        {plan.steps.map((step, idx) => {
          return (
            <div
              key={step.id}
              className={cn(
                'plan-step-item p-3.5 rounded-xl border transition-all text-xs',
                step.status === 'completed'
                  ? 'border-[#BBF7D0] bg-[#F0FDF4]/30'
                  : step.status === 'approved'
                  ? 'border-[#DDD6FE] bg-[#FAF5FF]/30'
                  : 'border-[#E4E4E7] bg-white'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#F4F4F6] text-[11px] font-bold text-[#71717A] mt-0.5">
                    {getStepTypeIcon(step.type)}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[#18181B]">{step.title}</span>
                      <span className="text-[10px] text-[#71717A] bg-[#F4F4F6] px-1.5 py-0.5 rounded">
                        {getStepTypeLabel(step.type)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#71717A] mt-0.5 leading-relaxed">
                      {step.description}
                    </p>

                    {step.outputSummary && (
                      <p className="text-[11px] text-[#15803D] bg-[#F0FDF4] px-2 py-1 rounded-md mt-1.5 font-medium">
                        ✓ {step.outputSummary}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  {getStepStateBadge(step.status)}
                  {step.requiresApproval && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-[#B45309] bg-[#FFFBEB] px-1.5 py-0.5 rounded border border-[#FDE68A]">
                      <ShieldAlert className="h-2.5 w-2.5" />
                      Sign-Off Required
                    </span>
                  )}
                  {step.estimatedCostINR && (
                    <span className="text-[10px] font-semibold text-[#18181B]">
                      {formatINR(step.estimatedCostINR)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Plan Card Actions */}
      {!isPlanApproved && !isPlanRejected && (
        <div className="mt-4 pt-3.5 border-t border-[#F4F4F6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11px] text-[#71717A] italic">
            Review recommendations before live ad network authorization.
          </p>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onReject(plan.id)}
              className="text-xs h-8 text-[#DC2626] hover:bg-red-50 hover:border-red-200"
              leftIcon={<XCircle className="h-3.5 w-3.5" />}
            >
              Reject Plan
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => onApprove(plan.id, plan.totalCostINR)}
              className="text-xs h-8 font-bold shadow-md shadow-[#7C3AED]/20 bg-[#7C3AED] hover:bg-[#6D28D9]"
              leftIcon={<CheckCircle2 className="h-3.5 w-3.5" />}
            >
              Authorize & Execute Plan
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
