import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dropdown' | 'drawer' | 'modal';
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variantClasses = {
      default: 'glass rounded-2xl',
      dropdown: 'glass-dropdown rounded-xl',
      drawer: 'glass-drawer',
      modal: 'glass-modal rounded-2xl',
    };

    return (
      <div
        ref={ref}
        className={cn(variantClasses[variant], 'p-5 transition-all duration-200', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
