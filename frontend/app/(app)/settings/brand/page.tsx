'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useUIStore } from '@/store/ui.store';
import { Sparkles, Check } from 'lucide-react';

export default function SettingsBrandPage() {
  const { addToast } = useUIStore();
  const [brandName, setBrandName] = useState('Mentneo Realty');
  const [positioning, setPositioning] = useState('Ultra-luxury Sky Villas & gated residences with zero commute stress');
  const [tone, setTone] = useState('Sophisticated, architectural, confident, understated elegance');
  const [targetAudience, setTargetAudience] = useState('HNIs, tech leadership, CXOs in Hyderabad Financial District & NRI real estate investors');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Brand knowledge base updated. DIYA will use these parameters across all copy and campaigns.', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-[#111] dark:text-[#EDEDED]">Brand Knowledge & Persona</h2>
        <p className="text-xs text-[#666] dark:text-[#888] mt-0.5">
          DIYA references this knowledge base to generate brand-accurate ad copy, social reels, and strategies.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4 max-w-xl">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#111] dark:text-[#EDEDED]">Brand Name</label>
          <Input
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#111] dark:text-[#EDEDED]">Brand Positioning & Value Proposition</label>
          <Textarea
            value={positioning}
            onChange={(e) => setPositioning(e.target.value)}
            className="text-xs min-h-[70px]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#111] dark:text-[#EDEDED]">Tone of Voice</label>
          <Input
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#111] dark:text-[#EDEDED]">Ideal Customer Profile (ICP)</label>
          <Textarea
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="text-xs min-h-[70px]"
          />
        </div>

        <div className="pt-2">
          <Button type="submit" size="sm" variant="gradient" className="text-xs font-semibold shadow-xs" leftIcon={<Sparkles className="h-3.5 w-3.5" />}>
            Update Brand Knowledge
          </Button>
        </div>
      </form>
    </div>
  );
}
