'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Sparkles, Building, Target, MapPin, DollarSign, Globe } from 'lucide-react';
import type { StrategyInput } from '../../types';
import type { AdPlatform } from '@/types/shared';

export interface StrategyFormProps {
  input: StrategyInput;
  onChange: (updates: Partial<StrategyInput>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const availablePlatforms: { id: AdPlatform; label: string }[] = [
  { id: 'meta', label: 'Meta Ads (Instagram & FB)' },
  { id: 'google', label: 'Google Search & YouTube' },
  { id: 'linkedin', label: 'LinkedIn Ads' },
];

export const StrategyForm: React.FC<StrategyFormProps> = ({
  input,
  onChange,
  onSubmit,
  isLoading,
}) => {
  const togglePlatform = (p: AdPlatform) => {
    const next = input.preferredPlatforms.includes(p)
      ? input.preferredPlatforms.filter((item) => item !== p)
      : [...input.preferredPlatforms, p];
    onChange({ preferredPlatforms: next });
  };

  return (
    <Card className="p-6 border border-[#E4E4E7] bg-white shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F6]">
        <div>
          <h4 className="text-base font-bold text-[#18181B]">Strategy Input Parameters</h4>
          <p className="text-xs text-[#71717A]">
            Define business parameters to generate a full 30-day omnichannel playbook
          </p>
        </div>
        <span className="text-[10px] font-semibold text-[#7C3AED] bg-[#EDE9FE] px-2.5 py-1 rounded-full">
          Auto-prefilled from Brand Profile
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Business Name"
          value={input.businessName}
          onChange={(e) => onChange({ businessName: e.target.value })}
          placeholder="e.g. Mentneo Realty"
          leftIcon={<Building className="h-4 w-4" />}
        />

        <Input
          label="Industry & Vertical"
          value={input.industry}
          onChange={(e) => onChange({ industry: e.target.value })}
          placeholder="e.g. Real Estate, SaaS, D2C Ecommerce"
          leftIcon={<Globe className="h-4 w-4" />}
        />

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-[#18181B] mb-1.5">
            Core Products or Services
          </label>
          <input
            value={input.productsServices}
            onChange={(e) => onChange({ productsServices: e.target.value })}
            placeholder="e.g. Ultra-luxury 3BHK & 4BHK Sky Villas in Kokapet"
            className="w-full rounded-xl border border-[#E4E4E7] bg-white px-3.5 py-2 text-sm text-[#18181B] focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 shadow-2xs"
          />
        </div>

        <Input
          label="Target Locations"
          value={input.locations}
          onChange={(e) => onChange({ locations: e.target.value })}
          placeholder="e.g. Hyderabad, Bangalore, Mumbai"
          leftIcon={<MapPin className="h-4 w-4" />}
        />

        <Input
          label="Monthly Ad Budget (INR ₹)"
          type="number"
          value={input.monthlyBudgetINR}
          onChange={(e) => onChange({ monthlyBudgetINR: Number(e.target.value) || 0 })}
          placeholder="e.g. 100000"
          leftIcon={<DollarSign className="h-4 w-4" />}
        />

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-[#18181B] mb-1.5">
            Primary Target Audience & Demographics
          </label>
          <input
            value={input.targetAudience}
            onChange={(e) => onChange({ targetAudience: e.target.value })}
            placeholder="e.g. High-Net-Worth tech directors, NRI investors, ages 30-55"
            className="w-full rounded-xl border border-[#E4E4E7] bg-white px-3.5 py-2 text-sm text-[#18181B] focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 shadow-2xs"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-[#18181B] mb-1.5">
            Preferred Ad Channels
          </label>
          <div className="flex flex-wrap gap-2">
            {availablePlatforms.map((p) => {
              const active = input.preferredPlatforms.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => togglePlatform(p.id)}
                  className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all ${
                    active
                      ? 'bg-[#EDE9FE] text-[#6D28D9] border-[#DDD6FE] shadow-2xs font-semibold'
                      : 'bg-white text-[#71717A] border-[#E4E4E7] hover:border-[#D4D4D8]'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-[#F4F4F6] flex justify-end">
        <Button
          variant="gradient"
          size="md"
          isLoading={isLoading}
          onClick={onSubmit}
          leftIcon={<Sparkles className="h-4 w-4" />}
        >
          Generate 30-Day Strategy
        </Button>
      </div>
    </Card>
  );
};
