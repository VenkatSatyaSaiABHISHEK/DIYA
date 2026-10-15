'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Tooltip } from '@/components/ui/Tooltip';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { animateCountUp } from '@/lib/animations/countUp';
import { cn } from '@/lib/utils/cn';

export interface MetricTileProps {
  title: string;
  value: number;
  formatValue: (val: number) => string;
  changePercentage?: number;
  periodLabel?: string;
  decimals?: number;
  icon?: React.ReactNode;
  className?: string;
}

export const MetricTile: React.FC<MetricTileProps> = ({
  title,
  value,
  formatValue,
  changePercentage,
  periodLabel = 'vs last 30 days',
  decimals = 0,
  icon,
  className,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);

  // GSAP Count-up animation
  useEffect(() => {
    const tween = animateCountUp(value, {
      decimals,
      duration: 0.5,
      onUpdate: (val) => setDisplayValue(val),
    });
    return () => {
      tween?.kill();
    };
  }, [value, decimals]);

  const isPositive = changePercentage !== undefined && changePercentage > 0;
  const isNegative = changePercentage !== undefined && changePercentage < 0;

  return (
    <Card
      className={cn(
        'flex flex-col justify-between p-4 sm:p-5 rounded-[20px] bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626]',
        'shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:border-[#D4D4D8] dark:hover:border-[#3E3E3E] transition-all duration-200 h-[114px] lg:h-[118px]',
        className
      )}
    >
      {/* Top Row: Small Label and Icon */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-[#71717A] dark:text-[#9CA3AF] truncate">
          {title}
        </span>
        {icon && (
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F4F4F6] dark:bg-[#1A1A1A] text-[#71717A] dark:text-[#A1A1AA] shrink-0">
            {icon}
          </div>
        )}
      </div>

      {/* Bottom Row: Big Number (Geist Semibold 30px) + Trend Chip */}
      <div className="flex items-baseline justify-between gap-2 mt-1">
        <div className="font-sans text-[28px] sm:text-[30px] font-semibold tracking-tight text-[#111111] dark:text-[#EDEDED] leading-none">
          {formatValue(displayValue)}
        </div>

        {/* Trend Chip with Tooltip */}
        {changePercentage !== undefined && (
          <Tooltip content={periodLabel}>
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-semibold leading-none cursor-help shrink-0',
                isPositive && 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400',
                isNegative && 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400',
                !isPositive && !isNegative && 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              )}
            >
              {isPositive && <TrendingUp className="h-3 w-3" />}
              {isNegative && <TrendingDown className="h-3 w-3" />}
              {!isPositive && !isNegative && <Minus className="h-3 w-3" />}
              <span>{Math.abs(changePercentage)}%</span>
            </span>
          </Tooltip>
        )}
      </div>
    </Card>
  );
};
