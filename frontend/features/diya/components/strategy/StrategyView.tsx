'use client';

import React, { useState } from 'react';
import { useDiyaStrategy } from '../../hooks/useDiyaStrategy';
import { StrategyForm } from './StrategyForm';
import { StrategyOutputView } from './StrategyOutputView';
import { Button } from '@/components/ui/Button';
import { Edit3, Sparkles } from 'lucide-react';

export const StrategyView: React.FC = () => {
  const {
    strategyInput,
    strategyOutput,
    isGeneratingStrategy,
    setStrategyInput,
    generateStrategy,
    turnIntoCampaignPlan,
  } = useDiyaStrategy();

  const [isEditingForm, setIsEditingForm] = useState(!strategyOutput);

  return (
    <div className="space-y-6">
      {/* Subheader */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 rounded-2xl bg-white border border-[#E4E4E7] shadow-xs">
        <div>
          <h3 className="text-lg font-bold text-[#18181B]">AI Strategy Planner</h3>
          <p className="text-xs text-[#71717A]">
            Generate a 30-day cross-channel marketing roadmap tailored to your target audience and budget
          </p>
        </div>

        {strategyOutput && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditingForm(!isEditingForm)}
            className="text-xs"
            leftIcon={<Edit3 className="h-3.5 w-3.5" />}
          >
            {isEditingForm ? 'View Active Strategy' : 'Edit Input Parameters'}
          </Button>
        )}
      </div>

      {/* Form or Output */}
      {isEditingForm ? (
        <StrategyForm
          input={strategyInput}
          onChange={setStrategyInput}
          onSubmit={async () => {
            await generateStrategy();
            setIsEditingForm(false);
          }}
          isLoading={isGeneratingStrategy}
        />
      ) : (
        strategyOutput && (
          <StrategyOutputView
            strategy={strategyOutput}
            onTurnIntoCampaigns={turnIntoCampaignPlan}
          />
        )
      )}
    </div>
  );
};
