import React from 'react';
import { cn } from '@/lib/utils/cn';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    const selectId = id || React.useId();

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-medium text-[#18181B]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full appearance-none rounded-xl border border-[#E4E4E7] bg-white px-3.5 py-2 pr-9 text-sm text-[#18181B] transition-colors',
              'focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20',
              'disabled:bg-[#F4F4F6] disabled:text-[#A1A1AA] disabled:cursor-not-allowed cursor-pointer',
              error && 'border-[#DC2626] focus:border-[#DC2626]',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 flex items-center text-[#71717A]">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        {error && <p className="text-xs text-[#DC2626] font-medium">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
