'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { formatINR } from '@/lib/utils/format';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { useDIYAStore } from '../../store/diya.store';

export const ApprovalModal: React.FC = () => {
  const { approvalModal, closeApprovalModal } = useDIYAStore();
  const { isOpen, request, onConfirm } = approvalModal;

  if (!isOpen || !request) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeApprovalModal}
      maxWidth="md"
      title="High-Impact Marketing Authorization"
      description="Explicit business owner approval is required before live advertising networks are engaged."
    >
      <div className="space-y-4">
        {/* Warning callout */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
          <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-bold">{request.actionTitle}</span>
            <p className="text-amber-900 leading-relaxed">{request.description}</p>
          </div>
        </div>

        {/* Financial Details */}
        {request.financialImpactINR !== undefined && (
          <div className="p-3.5 rounded-xl bg-[#FAFAFC] border border-[#E4E4E7] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#71717A] uppercase font-bold tracking-wider block">
                Authorized Ad Spend Cap
              </span>
              <span className="text-base font-extrabold text-[#18181B] mt-0.5 block">
                {formatINR(request.financialImpactINR)}
              </span>
            </div>
            <div className="text-right text-[11px] text-[#71717A]">
              <span>Capped strictly to this flight</span>
              <span className="block font-medium text-[#16A34A]">Zero unauthorized spend</span>
            </div>
          </div>
        )}

        <div className="p-3 rounded-lg bg-[#FAF5FF] border border-[#E9D5FF] text-[11px] text-[#6D28D9]">
          <p className="font-medium">
            <strong>Audit Record:</strong> This approval will be timestamped, linked to your user account, and logged in the Execution Timeline.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-[#E4E4E7]/60 flex items-center justify-end gap-2.5">
          <Button variant="outline" size="sm" onClick={closeApprovalModal}>
            Cancel & Keep Draft
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (onConfirm) onConfirm();
            }}
            className="font-bold shadow-md shadow-[#7C3AED]/20"
            leftIcon={<CheckCircle2 className="h-4 w-4" />}
          >
            Authorize & Execute
          </Button>
        </div>
      </div>
    </Modal>
  );
};
