import React from 'react';
import { LaunchFlowView } from '@/features/campaigns/components/launch/LaunchFlowView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Launch New Campaign — DIYA AI',
  description: 'Focused 6-step cross-network campaign launch engine with automated bid guardrails.',
};

export default function NewCampaignPage() {
  return (
    <div className="w-full py-2">
      <LaunchFlowView />
    </div>
  );
}
