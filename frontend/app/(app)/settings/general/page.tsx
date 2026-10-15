'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUIStore } from '@/store/ui.store';

export default function SettingsGeneralPage() {
  const { addToast } = useUIStore();
  const [workspaceName, setWorkspaceName] = useState('Mentneo Realty');
  const [domain, setDomain] = useState('https://mentneo.ai');
  const [currency, setCurrency] = useState('INR (₹)');
  const [timezone, setTimezone] = useState('Asia/Kolkata (IST +05:30)');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Workspace settings saved successfully.', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-[#111] dark:text-[#EDEDED]">General Preferences</h2>
        <p className="text-xs text-[#666] dark:text-[#888] mt-0.5">
          Workspace metadata, default reporting currency, and timezone.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4 max-w-xl">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#111] dark:text-[#EDEDED]">Workspace Name</label>
          <Input
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#111] dark:text-[#EDEDED]">Primary Monitored Domain</label>
          <Input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="text-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#111] dark:text-[#EDEDED]">Accounting Currency</label>
            <Input
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#111] dark:text-[#EDEDED]">Operational Timezone</label>
            <Input
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="text-xs"
            />
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" size="sm" variant="gradient" className="text-xs font-semibold shadow-xs">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
