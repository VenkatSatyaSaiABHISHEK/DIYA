'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Zap, Clock, ShieldCheck, Play, Pause } from 'lucide-react';
import type { Automation } from '../../types';
import { cn } from '@/lib/utils/cn';

export interface AutomationCardProps {
  automation: Automation;
  isSelected: boolean;
  onSelect: (auto: Automation) => void;
  onToggle: (id: string) => void;
}

export const AutomationCard: React.FC<AutomationCardProps> = ({
  automation,
  isSelected,
  onSelect,
  onToggle,
}) => {
  const isActive = automation.status === 'active';

  return (
    <Card
      onClick={() => onSelect(automation)}
      className={cn(
        'p-4 border transition-all cursor-pointer bg-white',
        isSelected
          ? 'border-[#7C3AED] ring-2 ring-[#7C3AED]/20 shadow-sm'
          : 'border-[#E4E4E7] hover:border-[#D4D4D8]'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg mt-0.5',
              isActive
                ? 'bg-[#EDE9FE] text-[#7C3AED]'
                : 'bg-[#F4F4F6] text-[#71717A]'
            )}
          >
            <Zap className="h-4 w-4" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h5 className="text-sm font-bold text-[#18181B]">{automation.name}</h5>
              <Badge variant={isActive ? 'success' : 'neutral'} size="sm" dot>
                {isActive ? 'Active' : 'Paused'}
              </Badge>
            </div>

            <p className="text-xs text-[#71717A] mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Trigger: {automation.trigger}
            </p>
          </div>
        </div>

        {/* Toggle button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(automation.id);
          }}
          aria-label={isActive ? 'Pause automation' : 'Activate automation'}
          className={cn(
            'px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors',
            isActive
              ? 'bg-[#F4F4F6] text-[#71717A] hover:bg-black/10'
              : 'bg-[#7C3AED] text-white hover:bg-[#6D28D9]'
          )}
        >
          {isActive ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          <span>{isActive ? 'Pause' : 'Enable'}</span>
        </button>
      </div>

      {/* Permissions Summary Tag */}
      <div className="mt-3 pt-2.5 border-t border-[#F4F4F6] flex items-center justify-between text-[10px] text-[#71717A]">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-[#16A34A]" />
          Can create drafts • Cannot spend without approval
        </span>
        <span>{automation.nodes.length} connected nodes</span>
      </div>
    </Card>
  );
};
