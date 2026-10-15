import { useMemo, useCallback } from 'react';
import { useLeadsStore } from '../store/leads.store';
import { leadsService } from '../services/leads.service';
import { PIPELINE_STAGES } from '../constants';
import type { LeadRecord, LeadStage } from '../types';

export function useLeadsPipeline() {
  const { leads, updateLeadStage, openDrawer } = useLeadsStore();

  const stagesData = useMemo(() => {
    return PIPELINE_STAGES.map((stage) => {
      const stageLeads = leads.filter((l) => l.stage === stage.id);
      const totalValueINR = stageLeads.reduce((acc, l) => acc + l.estimatedDealValueINR, 0);

      return {
        ...stage,
        leads: stageLeads,
        count: stageLeads.length,
        totalValueCrores: (totalValueINR / 10000000).toFixed(1), // e.g. "18.4" Cr
      };
    });
  }, [leads]);

  const moveLeadToStage = useCallback(
    async (leadId: string, newStage: LeadStage) => {
      // Optimistic update
      updateLeadStage(leadId, newStage);
      try {
        await leadsService.updateStage(leadId, newStage);
      } catch (err) {
        console.error('Failed to update stage on backend:', err);
      }
    },
    [updateLeadStage]
  );

  return {
    stagesData,
    moveLeadToStage,
    openDrawer,
  };
}
