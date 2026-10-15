import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rect',
  width,
  height,
  style,
  ...props
}) => {
  const variantStyles = {
    text: 'h-4 rounded-md w-full',
    rect: 'rounded-xl',
    circle: 'rounded-full',
  };

  const customStyle: React.CSSProperties = {
    ...style,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  return (
    <div
      aria-hidden="true"
      style={customStyle}
      className={cn(
        'animate-pulse bg-[#E4E4E7]/70',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
};
