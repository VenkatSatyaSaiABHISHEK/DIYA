'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';
import { useUIStore } from '@/store/ui.store';
import { ShieldCheck, Share2, Globe, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';

interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  description: string;
  connected: boolean;
  account?: string;
}

const initialIntegrations: IntegrationItem[] = [
  {
    id: 'meta',
    name: 'Meta Ads Manager',
    category: 'Advertising',
    description: 'Publish ad creatives and manage bids on Instagram and Facebook feeds.',
    connected: true,
    account: 'act_492019482910481 (Mentneo Ads)',
  },
  {
    id: 'google',
    name: 'Google Ads & PMax',
    category: 'Advertising',
    description: 'Run search and display campaigns targeting high-intent real estate buyers.',
    connected: true,
    account: '918-204-8192 (Mentneo Google)',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Campaign Manager',
    category: 'Advertising',
    description: 'Target CXOs and VP-level engineering leadership across Hyderabad tech parks.',
    connected: false,
  },
  {
    id: 'hubspot',
    name: 'HubSpot CRM',
    category: 'CRM & Pipeline',
    description: 'Sync high-intent prospects directly into your sales team deal stages.',
    connected: false,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Cloud API',
    category: 'Conversational',
    description: 'Automate instant site visit bookings and brochure delivery upon inquiry.',
    connected: false,
  },
  {
    id: 'gsc',
    name: 'Google Search Console',
    category: 'SEO & Crawl',
    description: 'Synchronize organic impressions, crawl errors, and Core Web Vitals telemetry.',
    connected: true,
    account: 'https://mentneo.ai (Verified)',
  },
];

export default function SettingsIntegrationsPage() {
  const { addToast } = useUIStore();
  const [integrations, setIntegrations] = useState<IntegrationItem[]>(initialIntegrations);
  const [selectedToConnect, setSelectedToConnect] = useState<IntegrationItem | null>(null);

  const handleConnect = () => {
    if (!selectedToConnect) return;
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === selectedToConnect.id
          ? { ...item, connected: true, account: 'Demo Account Connected' }
          : item
      )
    );
    addToast(`${selectedToConnect.name} connected successfully in demo mode.`, 'success');
    setSelectedToConnect(null);
  };

  const handleDisconnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, connected: false, account: undefined } : item
      )
    );
    addToast('Integration disconnected.', 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-[#111] dark:text-[#EDEDED]">Connected Ad Networks & CRMs</h2>
        <p className="text-xs text-[#666] dark:text-[#888] mt-0.5">
          Authorize ad networks and marketing channels so DIYA can execute autonomous campaigns on your behalf.
        </p>
      </div>

      <div className="space-y-3">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#111] dark:text-[#EDEDED]">{item.name}</span>
                <span className="text-[10px] text-[#888] bg-[#FAFAFA] dark:bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#EAEAEA] dark:border-[#333]">
                  {item.category}
                </span>
                {item.connected ? (
                  <Badge variant="success" size="sm" dot>
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="neutral" size="sm">
                    Not connected
                  </Badge>
                )}
              </div>
              <p className="text-xs text-[#666] dark:text-[#888]">{item.description}</p>
              {item.account && (
                <p className="text-[11px] text-[#7C3AED] font-mono pt-0.5">
                  ID: {item.account}
                </p>
              )}
            </div>

            <div className="shrink-0 flex items-center gap-2">
              {item.connected ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDisconnect(item.id)}
                  className="text-xs h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  Disconnect
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setSelectedToConnect(item)}
                  className="text-xs h-8 bg-[#7C3AED] hover:bg-[#6D28D9] font-medium"
                >
                  Connect
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Connect Dialog (Demo OAuth Simulation) */}
      {selectedToConnect && (
        <Dialog open={!!selectedToConnect} onOpenChange={(open) => !open && setSelectedToConnect(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-[#111] dark:text-[#EDEDED]">
                Connect {selectedToConnect.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-[#666] dark:text-[#888] pt-1">
                Authorize DIYA AI to access campaign management, audience sync, and conversion reporting.
              </DialogDescription>
            </DialogHeader>

            <div className="p-3.5 rounded-lg bg-[#FAFAFA] dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#333] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Zero financial liability guarantee</span>
              </div>
              <p className="text-[11px] text-[#666] dark:text-[#888] leading-relaxed">
                Demo simulation mode: clicking &ldquo;Authorize Connection&rdquo; will link a verified mock account sandbox without requesting real credentials or OAuth tokens.
              </p>
            </div>

            <DialogFooter className="pt-3">
              <Button size="sm" variant="outline" onClick={() => setSelectedToConnect(null)} className="text-xs">
                Cancel
              </Button>
              <Button size="sm" variant="gradient" onClick={handleConnect} className="text-xs font-semibold shadow-xs">
                Authorize Connection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
