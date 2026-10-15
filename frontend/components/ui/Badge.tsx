import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  dot = false,
  children,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-[#EDE9FE] text-[#6D28D9] border-[#DDD6FE]',
    success: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
    warning: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    danger: 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]',
    info: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
    neutral: 'bg-[#F4F4F6] text-[#52525B] border-[#E4E4E7]',
  };

  const dotColors = {
    primary: 'bg-[#7C3AED]',
    success: 'bg-[#16A34A]',
    warning: 'bg-[#F59E0B]',
    danger: 'bg-[#DC2626]',
    info: 'bg-[#2563EB]',
    neutral: 'bg-[#71717A]',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('inline-block h-1.5 w-1.5 rounded-full shrink-0', dotColors[variant])}
        />
      )}
      <span>{children}</span>
    </span>
  );
};
