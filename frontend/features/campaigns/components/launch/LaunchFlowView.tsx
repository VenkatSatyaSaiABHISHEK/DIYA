'use client';

import React, { useRef } from 'react';
import { useCampaignLaunch } from '../../hooks/useCampaignLaunch';
import { StepGoal } from './StepGoal';
import { StepAudience } from './StepAudience';
import { StepBudget } from './StepBudget';
import { StepCreative } from './StepCreative';
import { StepTracking } from './StepTracking';
import { StepReview } from './StepReview';
import { LaunchSummaryPanel } from './LaunchSummaryPanel';
import { ConfirmActionModal } from '@/components/ui/ConfirmActionModal';
import { Button } from '@/components/ui/Button';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Clock,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { animatePageIn } from '@/lib/animations/pageTransition';
import { cn } from '@/lib/utils/cn';

export const LaunchFlowView: React.FC = () => {
  const {
    launchDraft,
    updateLaunchDraft,
    currentStep,
    nextStep,
    prevStep,
    jumpToStep,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    handleLaunchSubmit,
  } = useCampaignLaunch();

  const stepContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!stepContainerRef.current) return;
      animatePageIn(stepContainerRef.current);
    },
    { dependencies: [currentStep], scope: stepContainerRef }
  );

  const steps = [
    { number: 1, title: 'Goal & Network' },
    { number: 2, title: 'Target Audience' },
    { number: 3, title: 'Budget & Flight' },
    { number: 4, title: 'Creative Copy' },
    { number: 5, title: 'Attribution Tracking' },
    { number: 6, title: 'Review & Launch' },
  ];

  return (
    <div className="space-y-6">
      {/* Stepper Header Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#E4E4E7] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#18181B]">
              New Campaign Launch Engine
            </h3>
            <p className="text-[11px] text-[#71717A]">
              Step-by-step cross-network campaign setup with automated bid guardrails
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#71717A] bg-[#FAFAFC] px-2.5 py-1 rounded-lg border border-[#F4F4F6]">
            <Clock className="h-3 w-3 text-emerald-600" />
            <span>Draft auto-saved</span>
          </div>
        </div>

        {/* Desktop Horizontal Stepper */}
        <div className="hidden md:flex items-center justify-between gap-1 pt-2">
          {steps.map((st, idx) => {
            const isCompleted = currentStep > st.number;
            const isCurrent = currentStep === st.number;

            return (
              <React.Fragment key={st.number}>
                <button
                  type="button"
                  onClick={() => jumpToStep(st.number)}
                  className="flex items-center gap-2 text-left group select-none"
                >
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all',
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-[#7C3AED] text-white ring-2 ring-[#EDE9FE]'
                        : 'bg-[#F4F4F6] text-[#71717A] group-hover:bg-[#E4E4E7]'
                    )}
                  >
                    {isCompleted ? <CheckCircle2 className="h-3.5 w-3.5" /> : st.number}
                  </span>
                  <span
                    className={cn(
                      'text-xs font-medium transition-colors hidden lg:inline',
                      isCurrent
                        ? 'text-[#7C3AED] font-bold'
                        : isCompleted
                        ? 'text-[#18181B]'
                        : 'text-[#71717A]'
                    )}
                  >
                    {st.title}
                  </span>
                </button>

                {idx < steps.length - 1 && (
                  <div
                    className={cn(
                      'h-0.5 flex-1 mx-2 rounded-full transition-colors',
                      currentStep > st.number ? 'bg-emerald-500' : 'bg-[#E4E4E7]'
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile Stepper Progress Bar */}
        <div className="md:hidden space-y-1 pt-1">
          <div className="flex items-center justify-between text-xs font-semibold text-[#18181B]">
            <span>Step {currentStep} of 6: {steps[currentStep - 1]?.title}</span>
            <span className="text-[#7C3AED]">{Math.round((currentStep / 6) * 100)}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#F4F4F6] overflow-hidden">
            <div
              className="h-full bg-[#7C3AED] transition-all duration-300"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Layout (Step Form + Live Summary Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Step Body (Left/Center 2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div
            ref={stepContainerRef}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E4E4E7] shadow-card min-h-[460px]"
          >
            {currentStep === 1 && (
              <StepGoal draft={launchDraft} onChange={updateLaunchDraft} />
            )}
            {currentStep === 2 && (
              <StepAudience draft={launchDraft} onChange={updateLaunchDraft} />
            )}
            {currentStep === 3 && (
              <StepBudget draft={launchDraft} onChange={updateLaunchDraft} />
            )}
            {currentStep === 4 && (
              <StepCreative draft={launchDraft} onChange={updateLaunchDraft} />
            )}
            {currentStep === 5 && (
              <StepTracking draft={launchDraft} onChange={updateLaunchDraft} />
            )}
            {currentStep === 6 && (
              <StepReview
                draft={launchDraft}
                onEditStep={jumpToStep}
                onLaunchClick={() => setIsConfirmModalOpen(true)}
              />
            )}
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button
              size="sm"
              variant="outline"
              disabled={currentStep === 1}
              onClick={prevStep}
              className="text-xs"
              leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}
            >
              Previous Step
            </Button>

            {currentStep < 6 ? (
              <Button
                size="sm"
                variant="primary"
                onClick={nextStep}
                className="text-xs font-semibold shadow-xs"
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              >
                Continue to {steps[currentStep]?.title}
              </Button>
            ) : (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setIsConfirmModalOpen(true)}
                className="text-xs font-bold shadow-md shadow-[#7C3AED]/20"
                rightIcon={<Sparkles className="h-3.5 w-3.5" />}
              >
                Authorize & Launch
              </Button>
            )}
          </div>
        </div>

        {/* Live Flight Summary Panel (Right Column) */}
        <div className="hidden lg:block lg:col-span-1 sticky top-28">
          <LaunchSummaryPanel draft={launchDraft} />
        </div>
      </div>

      {/* Global Confirmation Launch Modal */}
      <ConfirmActionModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleLaunchSubmit}
        actionType="launch"
        title="Authorize Live Ad Network Flight"
        campaignName={launchDraft.name}
        platform={launchDraft.platform}
        amountINR={launchDraft.budget.amountINR * launchDraft.budget.flightDurationDays}
        scheduleDates={`${launchDraft.budget.startDate} (${launchDraft.budget.flightDurationDays} days)`}
        confirmButtonText="Confirm & Launch Flight"
      />
    </div>
  );
};
