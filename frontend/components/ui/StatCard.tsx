'use client';

import React, { useEffect, useState } from 'react';
import { Card } from './Card';
import { TrendingUp, TrendingDown, Minus, PlugZap } from 'lucide-react';
import { Button } from './Button';
import { animateCountUp } from '@/lib/animations/countUp';
import { cn } from '@/lib/utils/cn';

export interface StatCardProps {
  title: string;
  value: number;
  formatValue: (val: number) => string;
  changePercentage?: number;
  periodLabel?: string;
  icon?: React.ReactNode;
  isConnected?: boolean;
  onConnect?: () => void;
  decimals?: number;
  className?: string;
  compact?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  formatValue,
  changePercentage,
  periodLabel = 'vs last 30 days',
  icon,
  isConnected = true,
  onConnect,
  decimals = 0,
  className,
  compact = false,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(isConnected ? 0 : 0);

  useEffect(() => {
    if (!isConnected) return;
    const tween = animateCountUp(value, {
      decimals,
      onUpdate: (val) => setDisplayValue(val),
    });
    return () => {
      tween?.kill();
    };
  }, [value, isConnected, decimals]);

  if (!isConnected) {
    return (
      <Card className={cn('flex flex-col justify-between min-h-[96px] bg-white dark:bg-[#0E0E10] border border-[#E4E4E7] dark:border-[#222]', compact ? 'p-3' : 'min-h-[148px] p-5', className)}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#71717A]">{title}</span>
          {icon && <span className="text-[#A1A1AA]">{icon}</span>}
        </div>
        <div className="my-auto text-center py-2">
          <p className="text-xs text-[#71717A] mb-2 font-medium">Connect ad account to view</p>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<PlugZap className="h-3.5 w-3.5 text-[#7C3AED]" />}
            onClick={onConnect}
            className="text-xs h-7 px-2.5"
          >
            Connect Meta Ads
          </Button>
        </div>
      </Card>
    );
  }

  const isPositive = changePercentage !== undefined && changePercentage > 0;
  const isNegative = changePercentage !== undefined && changePercentage < 0;

  if (compact) {
    return (
      <Card
        className={cn(
          'flex flex-col justify-between h-[98px] p-3 rounded-xl bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626] hover:border-[#D4D4D8] dark:hover:border-[#404040] shadow-xs transition-all select-none',
          className
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold text-[#666] dark:text-[#888] truncate">{title}</span>
          {icon && (
            <div className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md bg-[#F4F4F6] dark:bg-[#1A1A1A] text-[#71717A] dark:text-[#AAA]">
              {icon}
            </div>
          )}
        </div>

        <div className="text-xl font-extrabold tracking-tight text-[#111] dark:text-[#EDEDED] leading-none my-0.5">
          {formatValue(displayValue)}
        </div>

        <div className="flex items-center gap-1.5 text-[10px]">
          {changePercentage !== undefined && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 rounded px-1 py-0.2 font-bold leading-none',
                isPositive && 'bg-[#F0FDF4] dark:bg-emerald-950/40 text-[#15803D] dark:text-emerald-400',
                isNegative && 'bg-[#FEF2F2] dark:bg-red-950/40 text-[#B91C1C] dark:text-red-400',
                !isPositive && !isNegative && 'bg-[#F4F4F6] text-[#71717A]'
              )}
            >
              {isPositive && <TrendingUp className="h-2.5 w-2.5" />}
              {isNegative && <TrendingDown className="h-2.5 w-2.5" />}
              {!isPositive && !isNegative && <Minus className="h-2.5 w-2.5" />}
              <span>{Math.abs(changePercentage)}%</span>
            </span>
          )}
          <span className="text-[#888] dark:text-[#777] truncate">{periodLabel}</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('flex flex-col justify-between min-h-[148px] bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626] hover:border-[#D4D4D8] transition-all', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#71717A] dark:text-[#AAA]">{title}</span>
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F4F4F6] dark:bg-[#1A1A1A] text-[#71717A] dark:text-[#AAA]">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="text-2xl font-bold tracking-tight text-[#18181B] dark:text-[#EDEDED]">
          {formatValue(displayValue)}
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-[#F4F4F6] dark:border-[#222] flex items-center justify-between text-xs">
        {changePercentage !== undefined ? (
          <div className="flex items-center gap-1.5 font-medium">
            <span
              className={cn(
                'inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[11px] font-semibold',
                isPositive && 'bg-[#F0FDF4] text-[#15803D]',
                isNegative && 'bg-[#FEF2F2] text-[#B91C1C]',
                !isPositive && !isNegative && 'bg-[#F4F4F6] text-[#71717A]'
              )}
            >
              {isPositive && <TrendingUp className="h-3 w-3" />}
              {isNegative && <TrendingDown className="h-3 w-3" />}
              {!isPositive && !isNegative && <Minus className="h-3 w-3" />}
              <span>{Math.abs(changePercentage)}%</span>
            </span>
            <span className="text-[11px] text-[#71717A] dark:text-[#888]">{periodLabel}</span>
          </div>
        ) : (
          <span className="text-[11px] text-[#71717A] dark:text-[#888]">{periodLabel}</span>
        )}
      </div>
    </Card>
  );
};
