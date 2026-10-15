'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Clock, ShieldCheck, Bot, Sparkles, User } from 'lucide-react';

const mockLogs = [
  { id: '1', actor: 'DIYA AI', role: 'Autonomous Agent', action: 'Scaled daily budget on Meta Ads "Sky Villas Q3" by 15%', time: '18 minutes ago', type: 'ai' },
  { id: '2', actor: 'Abhishek Sharma', role: 'Owner', action: 'Authorized live Google Ads PMax flight flight with ₹45,000 cap', time: '2 hours ago', type: 'user' },
  { id: '3', actor: 'DIYA AI', role: 'Autonomous Agent', action: 'Generated 4 multi-slide Instagram carousel variations for Jubilee Hills project', time: '5 hours ago', type: 'ai' },
  { id: '4', actor: 'DIYA AI', role: 'Autonomous Agent', action: 'Identified 2 missing meta tags and applied auto-fix on property landing pages', time: 'Yesterday, 6:30 PM', type: 'ai' },
  { id: '5', actor: 'Priya Reddy', role: 'Marketing Lead', action: 'Exported verified VIP prospect list (14 leads) to CSV', time: 'Oct 13, 2:15 PM', type: 'user' },
  { id: '6', actor: 'DIYA AI', role: 'Autonomous Agent', action: 'Paused underperforming ad set "Broad Tech Interest" due to high CPL', time: 'Oct 12, 11:00 AM', type: 'ai' },
];

export default function SettingsActivityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-[#111] dark:text-[#EDEDED]">Workspace Activity Log</h2>
        <p className="text-xs text-[#666] dark:text-[#888] mt-0.5">
          Immutable audit record of all campaign authorizations, budget edits, and AI workflow executions.
        </p>
      </div>

      <div className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs">
        <div className="divide-y divide-[#EAEAEA] dark:divide-[#222]">
          {mockLogs.map((log) => (
            <div key={log.id} className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-3">
              <div className="p-1.5 rounded-md bg-[#FAFAFA] dark:bg-[#1A1A1A] border border-[#EAEAEA] dark:border-[#333] mt-0.5">
                {log.type === 'ai' ? (
                  <Bot className="h-3.5 w-3.5 text-[#7C3AED]" />
                ) : (
                  <User className="h-3.5 w-3.5 text-[#666] dark:text-[#888]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-xs text-[#111] dark:text-[#EDEDED]">{log.actor}</span>
                  <span className="text-[10px] text-[#888] bg-[#FAFAFA] dark:bg-[#1A1A1A] px-1.5 py-0.2 rounded border border-[#EAEAEA] dark:border-[#333]">
                    {log.role}
                  </span>
                  <span className="text-[10px] text-[#AAA]">•</span>
                  <span className="text-[10px] text-[#888]">{log.time}</span>
                </div>
                <p className="text-xs text-[#444] dark:text-[#AAA] mt-1 leading-snug">
                  {log.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
