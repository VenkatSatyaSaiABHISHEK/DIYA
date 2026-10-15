'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: 'pill' | 'underline';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
  variant = 'pill',
}) => {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-1.5 p-1 rounded-xl',
        variant === 'pill' ? 'bg-[#F4F4F6] border border-[#E4E4E7]' : 'border-b border-[#E4E4E7]',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150',
              variant === 'pill' && [
                isActive
                  ? 'bg-white text-[#18181B] shadow-xs font-semibold'
                  : 'text-[#71717A] hover:text-[#18181B]',
              ],
              variant === 'underline' && [
                'rounded-none pb-2.5 px-3 border-b-2 -mb-px',
                isActive
                  ? 'border-[#7C3AED] text-[#7C3AED] font-semibold'
                  : 'border-transparent text-[#71717A] hover:text-[#18181B]',
              ]
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.2 text-[10px]',
                  isActive ? 'bg-[#EDE9FE] text-[#6D28D9]' : 'bg-[#E4E4E7] text-[#71717A]'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
