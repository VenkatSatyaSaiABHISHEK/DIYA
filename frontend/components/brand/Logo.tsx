'use client';

import React from 'react';
import Link from 'next/link';
import { AIOrb } from './AIOrb';
import { useAIStatusStore } from '@/store/ai-status.store';
import { cn } from '@/lib/utils/cn';

export interface LogoProps {
  showTagline?: boolean;
  className?: string;
  collapsed?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  showTagline = true,
  className,
  collapsed = false,
}) => {
  const { status } = useAIStatusStore();

  return (
    <Link
      href="/home"
      className={cn(
        'group flex items-center gap-3 transition-opacity hover:opacity-90 select-none',
        className
      )}
    >
      <AIOrb status={status} size="sm" />

      {!collapsed && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1 leading-none">
            <span className="text-base font-bold tracking-tight text-[#18181B]">DIYA</span>
            <span className="text-base font-semibold tracking-tight text-[#A78BFA]">AI</span>
          </div>
          {showTagline && (
            <span className="text-[10px] text-[#71717A] tracking-tight mt-0.5 font-medium">
              AI Marketing Workforce
            </span>
          )}
        </div>
      )}
    </Link>
  );
};
