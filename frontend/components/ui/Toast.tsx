'use client';

import React from 'react';
import { useUIStore, type ToastMessage } from '@/store/ui.store';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: ToastMessage;
  onDismiss: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />,
    warning: <AlertTriangle className="h-4 w-4 text-[#F59E0B] shrink-0" />,
    danger: <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0" />,
    info: <Info className="h-4 w-4 text-[#7C3AED] shrink-0" />,
  };

  const borders = {
    success: 'border-[#BBF7D0]',
    warning: 'border-[#FDE68A]',
    danger: 'border-[#FECACA]',
    info: 'border-[#DDD6FE]',
  };

  return (
    <div
      role="alert"
      className={cn(
        'pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white shadow-lg border text-sm transition-all animate-in fade-in slide-in-from-bottom-2',
        borders[toast.type]
      )}
    >
      <div className="flex items-center gap-2.5">
        {icons[toast.type]}
        <span className="text-xs font-medium text-[#18181B]">{toast.message}</span>
      </div>
      <button
        onClick={onDismiss}
        aria-label="Dismiss toast"
        className="rounded p-1 text-[#71717A] hover:text-[#18181B] hover:bg-black/5"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
