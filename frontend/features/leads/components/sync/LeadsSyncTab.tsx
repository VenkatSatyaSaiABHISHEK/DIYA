'use client';

import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, RefreshCw, Layers } from 'lucide-react';
import { mockCrmIntegrations } from '../../mocks';
import { Modal } from '@/components/ui/Modal';
import { leadsService } from '../../services/leads.service';
import type { CrmIntegrationStatus } from '../../types';

export const LeadsSyncTab: React.FC = () => {
  const [integrations, setIntegrations] = useState<CrmIntegrationStatus[]>([...mockCrmIntegrations]);
  const [activeModalCrm, setActiveModalCrm] = useState<CrmIntegrationStatus | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectNotice, setConnectNotice] = useState<string | null>(null);

  const handleConnect = async () => {
    if (!activeModalCrm) return;
    setIsConnecting(true);
    await leadsService.connectIntegration(activeModalCrm.provider);
    setIsConnecting(false);
    setConnectNotice(`Demo mode: ${activeModalCrm.name} connected in simulated workspace.`);
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === activeModalCrm.id
          ? { ...i, connected: true, lastSyncAt: new Date().toISOString() }
          : i
      )
    );
    setTimeout(() => {
      setConnectNotice(null);
      setActiveModalCrm(null);
    }, 2200);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-[#18181B] flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#7C3AED]" />
            Enterprise CRM & Webhook Routing
          </h2>
          <p className="text-xs text-[#71717A] mt-0.5">
            Automatically dispatch qualified prospects into your existing sales software
          </p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold border border-zinc-200">
          OAuth & Webhooks
        </span>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs hover:border-[#7C3AED]/40 hover:shadow-sm transition-all flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#18181B]">{item.name}</span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.connected
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                  }`}
                >
                  {item.connected ? 'Connected' : 'Not Connected'}
                </span>
              </div>

              <p className="text-xs text-[#71717A] leading-relaxed">{item.description}</p>
            </div>

            <div className="pt-3 border-t border-[#F4F4F5]">
              {item.connected ? (
                <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Sync Active
                  </span>
                  <span className="text-[10px] text-[#A1A1AA]">
                    {new Date(item.lastSyncAt || '').toLocaleTimeString()}
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveModalCrm(item)}
                  className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100/80 text-[#7C3AED] text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Connect Integration</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Connect Modal */}
      {activeModalCrm && (
        <Modal
          isOpen={!!activeModalCrm}
          onClose={() => setActiveModalCrm(null)}
          title={`Connect ${activeModalCrm.name}`}
          description="Map DIYA AI qualification fields to your CRM contact schema"
        >
          <div className="space-y-4">
            <div className="p-3 bg-[#FAFAFA] rounded-xl border border-[#E4E4E7] text-xs space-y-1.5">
              <p className="font-semibold text-[#18181B]">Simulated Field Mapping:</p>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#71717A] font-mono">
                <span>DIYA.fullName</span>
                <span className="text-zinc-900">&rarr; Contact.Name</span>
                <span>DIYA.budgetRangeINR</span>
                <span className="text-zinc-900">&rarr; Deal.Amount</span>
                <span>DIYA.qualificationScore</span>
                <span className="text-zinc-900">&rarr; Contact.LeadScore</span>
              </div>
            </div>

            {connectNotice && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold text-center">
                {connectNotice}
              </div>
            )}

            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-[11px] text-zinc-500">
              Demo mode: No real OAuth credentials or API keys were transmitted. Status updates in
              your local simulated session.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveModalCrm(null)}
                className="px-4 py-2 rounded-xl border border-[#E4E4E7] text-xs font-semibold text-[#71717A]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isConnecting}
                onClick={handleConnect}
                className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] disabled:opacity-50 shadow-xs flex items-center gap-1.5"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                {isConnecting ? 'Authorizing...' : 'Authorize Demo Connection'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
