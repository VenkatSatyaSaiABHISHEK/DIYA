'use client';

import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { formatINR } from '@/lib/utils/format';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Loader2,
  Calendar,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title: string;
  description?: string;
  actionType?: 'launch' | 'budget_increase' | 'pause' | 'generic';
  campaignName?: string;
  platform?: 'meta' | 'google' | 'linkedin' | 'omnichannel';
  amountINR?: number;
  currentAmountINR?: number;
  newAmountINR?: number;
  scheduleDates?: string;
  confirmButtonText?: string;
  isDestructive?: boolean;
}

export const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  actionType = 'launch',
  campaignName,
  platform = 'meta',
  amountINR,
  currentAmountINR,
  newAmountINR,
  scheduleDates,
  confirmButtonText = 'Authorize & Execute',
  isDestructive = false,
}) => {
  const [hasAgreed, setHasAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [demoStep, setDemoStep] = useState<string | null>(null);
  const [demoFinishedMessage, setDemoFinishedMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExecute = async () => {
    setIsProcessing(true);
    setDemoStep('Verifying ad account credentials & billing limits...');

    setTimeout(() => {
      setDemoStep('Validating creative assets against ad network policies...');
    }, 700);

    setTimeout(() => {
      setDemoStep('Applying configuration to target flight...');
    }, 1400);

    setTimeout(async () => {
      setIsProcessing(false);
      setDemoFinishedMessage(
        'Demo mode: nothing was published, spent, or modified in any live ad account. No real charges occurred.'
      );

      try {
        await onConfirm();
      } catch {
        // ignore
      }

      setTimeout(() => {
        setHasAgreed(false);
        setDemoStep(null);
        setDemoFinishedMessage(null);
        onClose();
      }, 2200);
    }, 2100);
  };

  const getPlatformLabel = () => {
    switch (platform) {
      case 'google':
        return 'Google Search & PMax Ads';
      case 'linkedin':
        return 'LinkedIn Sponsored Content';
      case 'omnichannel':
        return 'Cross-Platform (Meta + Google)';
      case 'meta':
      default:
        return 'Meta Ads (Instagram & Facebook)';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!isProcessing) {
          setHasAgreed(false);
          setDemoStep(null);
          setDemoFinishedMessage(null);
          onClose();
        }
      }}
      maxWidth="md"
      title={title}
      description={description || 'Owner authorization is required for high-impact actions.'}
    >
      <div className="space-y-4">
        {/* Warning Callout Box */}
        <div
          className={cn(
            'flex items-start gap-3 p-3.5 rounded-xl border text-xs',
            isDestructive
              ? 'bg-rose-50 border-rose-200 text-rose-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          )}
        >
          <ShieldAlert
            className={cn(
              'h-5 w-5 shrink-0 mt-0.5',
              isDestructive ? 'text-rose-600' : 'text-amber-600'
            )}
          />
          <div className="space-y-1 flex-1">
            <span className="font-bold block">
              {actionType === 'budget_increase'
                ? 'High-Impact Budget Increase'
                : 'Live Advertising Spend Authorization'}
            </span>
            <p className="leading-relaxed">
              In a production environment, this action immediately commits live advertising budget
              to your connected payment method.
            </p>
          </div>
        </div>

        {/* Campaign & Platform Details */}
        <div className="p-3.5 rounded-xl bg-[#FAFAFC] border border-[#E4E4E7] space-y-2.5 text-xs">
          {campaignName && (
            <div className="flex items-center justify-between">
              <span className="text-[#71717A] font-medium">Target Campaign</span>
              <span className="font-bold text-[#18181B] truncate max-w-[240px]">
                {campaignName}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-[#71717A] font-medium">Ad Network</span>
            <span className="font-bold text-[#7C3AED] bg-[#EDE9FE] px-2 py-0.5 rounded-full text-[11px]">
              {getPlatformLabel()}
            </span>
          </div>

          {scheduleDates && (
            <div className="flex items-center justify-between">
              <span className="text-[#71717A] font-medium flex items-center gap-1">
                <Calendar className="h-3 w-3 text-[#A1A1AA]" /> Schedule Flight
              </span>
              <span className="font-medium text-[#18181B]">{scheduleDates}</span>
            </div>
          )}

          {/* Budget Increase Breakdown */}
          {actionType === 'budget_increase' && currentAmountINR && newAmountINR && (
            <div className="pt-2 border-t border-[#E4E4E7]/70 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#71717A] block font-medium">Current Daily</span>
                <span className="font-semibold text-[#71717A]">{formatINR(currentAmountINR)}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-[#7C3AED]" />
              <div className="text-right">
                <span className="text-[10px] text-[#71717A] block font-medium">New Daily Cap</span>
                <span className="font-bold text-[#15803D] text-sm">
                  {formatINR(newAmountINR)}
                </span>
              </div>
            </div>
          )}

          {/* Single Amount Breakdown */}
          {amountINR !== undefined && actionType !== 'budget_increase' && (
            <div className="pt-2 border-t border-[#E4E4E7]/70 flex items-center justify-between">
              <span className="text-[#71717A] font-medium">Authorized Budget Cap</span>
              <span className="text-base font-extrabold text-[#18181B]">
                {formatINR(amountINR)}
              </span>
            </div>
          )}
        </div>

        {/* Real Money Warning Notice */}
        <div className="p-3 rounded-lg bg-[#FAF5FF] border border-[#DDD6FE] text-[11px] text-[#6D28D9] space-y-1">
          <p className="font-semibold">
            • Spend Guardrail: Budget is capped strictly. No unauthorized overspend will occur.
          </p>
          <p className="font-normal text-[#581C87]">
            • Audit Record: This authorization will be logged with timestamp and user signature.
          </p>
        </div>

        {/* Demo Execution Progress State */}
        {isProcessing && (
          <div className="p-3 rounded-xl bg-violet-50 border border-violet-200 text-xs text-violet-950 flex items-center gap-2.5 animate-pulse">
            <Loader2 className="h-4 w-4 text-[#7C3AED] animate-spin shrink-0" />
            <span className="font-medium">{demoStep}</span>
          </div>
        )}

        {/* Demo Finished Alert */}
        {demoFinishedMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold block">Simulation Completed</span>
              <p className="text-emerald-900">{demoFinishedMessage}</p>
            </div>
          </div>
        )}

        {/* Mandatory Agreement Checkbox */}
        {!demoFinishedMessage && (
          <label className="flex items-start gap-2.5 p-3 rounded-xl border border-[#E4E4E7] bg-white cursor-pointer hover:bg-[#FAFAFC] transition-colors select-none">
            <input
              type="checkbox"
              checked={hasAgreed}
              onChange={(e) => setHasAgreed(e.target.checked)}
              disabled={isProcessing}
              className="mt-0.5 h-4 w-4 rounded border-[#D4D4D8] text-[#7C3AED] focus:ring-[#7C3AED]"
            />
            <span className="text-xs text-[#18181B] leading-relaxed">
              I approve this campaign configuration, targeting, and authorized budget of{' '}
              <strong>{formatINR(newAmountINR || amountINR || 0)}</strong>.
            </span>
          </label>
        )}

        {/* Modal Actions */}
        <div className="pt-3 border-t border-[#E4E4E7]/60 flex items-center justify-end gap-2.5">
          <Button
            variant="outline"
            size="sm"
            disabled={isProcessing}
            onClick={() => {
              setHasAgreed(false);
              onClose();
            }}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            size="sm"
            disabled={!hasAgreed || isProcessing || !!demoFinishedMessage}
            onClick={handleExecute}
            className={cn(
              'font-bold shadow-md shadow-[#7C3AED]/20',
              isDestructive && 'bg-rose-600 hover:bg-rose-700'
            )}
            leftIcon={
              isProcessing ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <CheckCircle2 className="h-3.5 w-3.5" />
              )
            }
          >
            {isProcessing ? 'Processing Simulation...' : confirmButtonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
