'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  width?: string;
  side?: 'right' | 'left';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 'max-w-md',
  side = 'right',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#18181B]/35 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div
        className={cn(
          'fixed inset-y-0 flex max-w-full z-10',
          side === 'right' ? 'right-0 pl-0 sm:pl-10' : 'left-0 pr-0 sm:pr-10'
        )}
      >
        <div
          className={cn(
            'w-screen bg-white border-l border-[#EAEAEA] flex flex-col h-full shadow-2xl animate-in duration-300 ease-out text-[#111]',
            side === 'right' ? 'slide-in-from-right' : 'slide-in-from-left',
            width
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#EAEAEA]">
            <div>
              {typeof title === 'string' ? (
                <h3 className="text-base font-semibold text-[#111]">{title}</h3>
              ) : (
                title
              )}
              {subtitle && <p className="text-xs text-[#666] mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              aria-label="Close drawer"
              className="rounded-lg p-2 text-[#666] hover:text-[#111] hover:bg-black/5 active:scale-95 transition-all"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
};
