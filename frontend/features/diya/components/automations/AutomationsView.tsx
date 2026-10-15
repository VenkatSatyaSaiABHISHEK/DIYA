'use client';

import React, { useState } from 'react';
import { useDiyaAutomations } from '../../hooks/useDiyaAutomations';
import { AutomationCard } from './AutomationCard';
import { AutomationFlowBuilder } from './AutomationFlowBuilder';
import { AutomationNodeDrawer } from './AutomationNodeDrawer';
import { AutomationTemplatesModal } from './AutomationTemplatesModal';
import { Button } from '@/components/ui/Button';
import { Plus, Zap } from 'lucide-react';

export const AutomationsView: React.FC = () => {
  const {
    automations,
    selectedAutomation,
    activeNode,
    setSelectedAutomation,
    setActiveNode,
    handleToggle,
    createFromTemplate,
  } = useDiyaAutomations();

  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Subheader */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 rounded-2xl bg-white border border-[#E4E4E7] shadow-xs">
        <div>
          <h3 className="text-lg font-bold text-[#18181B]">Autonomous Marketing Automations</h3>
          <p className="text-xs text-[#71717A]">
            Event-driven triggers, safety gates, and background AI workflows
          </p>
        </div>

        <Button
          size="sm"
          variant="gradient"
          onClick={() => setIsTemplatesModalOpen(true)}
          className="text-xs font-semibold shadow-md shadow-[#7C3AED]/20"
          leftIcon={<Plus className="h-3.5 w-3.5" />}
        >
          Add from Recipe Template
        </Button>
      </div>

      {/* Main Grid: Automations List (Left) + Visual Flow (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Automations List */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#71717A] px-1 block">
            Configured Automations ({automations.length})
          </span>

          <div className="space-y-2.5">
            {automations.map((auto) => (
              <AutomationCard
                key={auto.id}
                automation={auto}
                isSelected={selectedAutomation?.id === auto.id}
                onSelect={setSelectedAutomation}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>

        {/* Right Column (7 cols): Visual Flow Builder */}
        <div className="lg:col-span-7">
          {selectedAutomation ? (
            <AutomationFlowBuilder
              automation={selectedAutomation}
              onSelectNode={setActiveNode}
            />
          ) : (
            <div className="p-12 text-center rounded-2xl border border-dashed border-[#E4E4E7] bg-white">
              <Zap className="h-8 w-8 text-[#A1A1AA] mx-auto mb-2" />
              <p className="text-xs text-[#71717A]">Select an automation to view its workflow graph</p>
            </div>
          )}
        </div>
      </div>

      {/* Node Configuration Drawer */}
      <AutomationNodeDrawer
        node={activeNode}
        onClose={() => setActiveNode(null)}
      />

      {/* Templates Modal */}
      <AutomationTemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelectTemplate={createFromTemplate}
      />
    </div>
  );
};
