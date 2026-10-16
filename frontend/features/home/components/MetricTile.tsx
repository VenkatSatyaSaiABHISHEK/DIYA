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
        'flex flex-col justify-between p-3.5 sm:p-5 rounded-[20px] bg-white border border-[#EAEAEA]',
        'shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:border-[#D4D4D8] transition-all duration-200 h-auto min-h-[105px] lg:h-[118px]',
        className
      )}
    >
      {/* Top Row: Small Label and Icon */}
      <div className="flex items-center justify-between gap-1.5">
        <span className="text-xs font-medium text-[#71717A] truncate">
          {title}
        </span>
        {icon && (
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F4F4F6] text-[#71717A] shrink-0">
            {icon}
          </div>
        )}
      </div>

      {/* Bottom Row: Big Number + Trend Chip */}
      <div className="flex items-baseline justify-between gap-1 mt-1">
        <div className="font-sans text-xl xs:text-2xl sm:text-[26px] lg:text-[28px] font-semibold tracking-tight text-[#111111] leading-none truncate">
          {formatValue(displayValue)}
        </div>

        {/* Trend Chip with Tooltip */}
        {changePercentage !== undefined && (
          <Tooltip content={periodLabel}>
            <span
              className={cn(
                'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold leading-none cursor-help shrink-0',
                isPositive && 'bg-emerald-50 text-emerald-700',
                isNegative && 'bg-rose-50 text-rose-700',
                !isPositive && !isNegative && 'bg-zinc-100 text-zinc-600'
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
