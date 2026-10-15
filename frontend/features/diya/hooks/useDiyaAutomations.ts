'use client';

import { useCallback } from 'react';
import { useDIYAStore } from '../store/diya.store';
import { useUIStore } from '@/store/ui.store';
import { diyaService } from '../services/diya.service';
import type { Automation, AutomationNode } from '../types';

export function useDiyaAutomations() {
  const {
    automations,
    selectedAutomation,
    activeNode,
    setSelectedAutomation,
    setActiveNode,
    toggleAutomationStatus,
    addAutomation,
  } = useDIYAStore();

  const { addToast } = useUIStore();

  const handleToggle = useCallback(
    async (id: string) => {
      toggleAutomationStatus(id);
      const auto = automations.find((a) => a.id === id);
      const nextStatus = auto?.status === 'active' ? 'paused' : 'active';
      addToast(
        `Automation "${auto?.name || id}" is now ${nextStatus}.`,
        nextStatus === 'active' ? 'success' : 'info'
      );
      await diyaService.toggleAutomation(id);
    },
    [automations, toggleAutomationStatus, addToast]
  );

  const createFromTemplate = useCallback(
    (template: { id: string; name: string; trigger: string; description: string }) => {
      const newAuto: Automation = {
        id: `auto-${Date.now()}`,
        name: template.name,
        trigger: template.trigger,
        status: 'active',
        permissions: {
          canReadAdData: true,
          canCreateDrafts: true,
          canSpendMoneyWithoutApproval: false,
        },
        nodes: [
          {
            id: `n1-${Date.now()}`,
            type: 'trigger',
            title: 'Schedule or Event Trigger',
            description: template.trigger,
            config: {},
          },
          {
            id: `n2-${Date.now()}`,
            type: 'ai_action',
            title: 'AI Processing Engine',
            description: template.description,
            config: {},
          },
          {
            id: `n3-${Date.now()}`,
            type: 'approval',
            title: 'Owner Sign-Off Gate',
            description: 'Requires owner review before modifying live ad accounts',
            config: {},
          },
          {
            id: `n4-${Date.now()}`,
            type: 'execution',
            title: 'Dispatch & Report',
            description: 'Execute approved modifications and log to timeline',
            config: {},
          },
        ],
      };

      addAutomation(newAuto);
      addToast(`Created automation "${template.name}"`, 'success');
    },
    [addAutomation, addToast]
  );

  return {
    automations,
    selectedAutomation,
    activeNode,
    setSelectedAutomation,
    setActiveNode,
    handleToggle,
    createFromTemplate,
  };
}
