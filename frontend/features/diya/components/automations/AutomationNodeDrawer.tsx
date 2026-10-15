'use client';

import React from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Settings, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import type { AutomationNode } from '../../types';

export interface AutomationNodeDrawerProps {
  node: AutomationNode | null;
  onClose: () => void;
}

export const AutomationNodeDrawer: React.FC<AutomationNodeDrawerProps> = ({
  node,
  onClose,
}) => {
  if (!node) return null;

  return (
    <Drawer
      isOpen={Boolean(node)}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-[#7C3AED]" />
          <span>Configure Workflow Node</span>
        </div>
      }
      subtitle={`Node ID: ${node.id}`}
    >
      <div className="space-y-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] bg-[#EDE9FE] px-2 py-0.5 rounded-full inline-block mb-1.5">
            {node.type.toUpperCase()}
          </span>
          <h4 className="text-base font-bold text-[#18181B]">{node.title}</h4>
          <p className="text-xs text-[#71717A] mt-1 leading-relaxed">{node.description}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#FAFAFC] border border-[#E4E4E7] space-y-3">
          <h5 className="text-xs font-bold text-[#18181B] uppercase tracking-wider">
            Node Parameters
          </h5>

          {node.type === 'trigger' && (
            <div className="space-y-1.5 text-xs">
              <label className="text-[11px] font-semibold text-[#52525B]">Trigger Condition</label>
              <input
                defaultValue="Schedule / Metric Spike"
                className="w-full rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-xs text-[#18181B]"
              />
            </div>
          )}

          {node.type === 'approval' && (
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>Security Guard:</strong> Execution stops here until an authorized workspace owner confirms the action in Command Chat.
              </p>
            </div>
          )}

          {node.type === 'ai_action' && (
            <div className="space-y-1.5 text-xs">
              <label className="text-[11px] font-semibold text-[#52525B]">Model Reasoning Mode</label>
              <select className="w-full rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-xs text-[#18181B]">
                <option>Deep Marketing Intelligence (High Precision)</option>
                <option>Fast Execution Mode</option>
              </select>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-[#F4F4F6] flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={onClose}>
            Save Node Configuration
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
