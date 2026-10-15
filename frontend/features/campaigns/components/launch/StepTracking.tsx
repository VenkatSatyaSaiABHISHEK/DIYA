'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  Link as LinkIcon,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { useUIStore } from '@/store/ui.store';
import type { LaunchDraft } from '../../types';
import { cn } from '@/lib/utils/cn';

export interface StepTrackingProps {
  draft: LaunchDraft;
  onChange: (partial: Partial<LaunchDraft>) => void;
}

export const StepTracking: React.FC<StepTrackingProps> = ({ draft, onChange }) => {
  const { addToast } = useUIStore();
  const [isPixelModalOpen, setIsPixelModalOpen] = useState(false);
  const tracking = draft.tracking;

  const updateTracking = (partial: Partial<typeof tracking>) => {
    onChange({
      tracking: {
        ...tracking,
        ...partial,
      },
    });
  };

  const generatedUtmUrl = `https://yourdomain.com/landing?utm_source=${tracking.utmSource}&utm_medium=${tracking.utmMedium}&utm_campaign=${tracking.utmCampaign}&utm_content=${tracking.utmContent}`;

  const copyUtm = () => {
    navigator.clipboard?.writeText(generatedUtmUrl);
    addToast('UTM parameters copied to clipboard.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Conversion Destination */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#18181B] block">
          Primary Conversion Destination
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 'meta_instant_form' as const,
              title: 'Meta Instant Form',
              desc: 'High conversion rate, autofilled from Facebook/IG user profile',
            },
            {
              id: 'landing_page_pixel' as const,
              title: 'Custom Landing Page',
              desc: 'Direct visits to your domain with Meta & Google Pixel tracking',
            },
            {
              id: 'whatsapp_crm' as const,
              title: 'WhatsApp Direct CRM',
              desc: 'Instantly opens 1-on-1 WhatsApp chat with your sales representative',
            },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => updateTracking({ conversionGoal: item.id })}
              className={cn(
                'p-3.5 rounded-xl border text-xs cursor-pointer transition-all select-none',
                tracking.conversionGoal === item.id
                  ? 'border-[#7C3AED] bg-[#FAF5FF] ring-1 ring-[#7C3AED]'
                  : 'border-[#E4E4E7] bg-white hover:border-[#D4D4D8]'
              )}
            >
              <span className="font-bold text-[#18181B] block">{item.title}</span>
              <p className="text-[11px] text-[#71717A] mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pixel Verification Status Box */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-xs text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
          <div>
            <span className="font-bold text-amber-900 block">
              Meta Pixel Status: Not Verified
            </span>
            <p className="text-[11px] text-amber-800">
              No live tracking pixel detected on your root domain. Live conversions will be simulated in demo mode.
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsPixelModalOpen(true)}
          className="text-xs bg-white text-amber-900 border-amber-300 hover:bg-amber-100"
        >
          Connect Pixel
        </Button>
      </div>

      {/* UTM Parameter Builder */}
      <div className="p-4 rounded-2xl bg-white border border-[#E4E4E7] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#18181B] flex items-center gap-1.5">
            <LinkIcon className="h-3.5 w-3.5 text-[#7C3AED]" /> Live UTM Tracking Parameter Builder
          </label>
          <button
            type="button"
            onClick={copyUtm}
            className="text-[11px] font-semibold text-[#7C3AED] hover:underline flex items-center gap-1"
          >
            <Copy className="h-3 w-3" /> Copy URL
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-[#71717A] block">utm_source</span>
            <input
              type="text"
              value={tracking.utmSource}
              onChange={(e) => updateTracking({ utmSource: e.target.value })}
              className="w-full mt-1 rounded-lg border border-[#E4E4E7] px-2.5 py-1.5 text-xs text-[#18181B] focus:border-[#7C3AED] focus:outline-none"
            />
          </div>

          <div>
            <span className="text-[10px] text-[#71717A] block">utm_medium</span>
            <input
              type="text"
              value={tracking.utmMedium}
              onChange={(e) => updateTracking({ utmMedium: e.target.value })}
              className="w-full mt-1 rounded-lg border border-[#E4E4E7] px-2.5 py-1.5 text-xs text-[#18181B] focus:border-[#7C3AED] focus:outline-none"
            />
          </div>

          <div>
            <span className="text-[10px] text-[#71717A] block">utm_campaign</span>
            <input
              type="text"
              value={tracking.utmCampaign}
              onChange={(e) => updateTracking({ utmCampaign: e.target.value })}
              className="w-full mt-1 rounded-lg border border-[#E4E4E7] px-2.5 py-1.5 text-xs text-[#18181B] focus:border-[#7C3AED] focus:outline-none"
            />
          </div>

          <div>
            <span className="text-[10px] text-[#71717A] block">utm_content</span>
            <input
              type="text"
              value={tracking.utmContent}
              onChange={(e) => updateTracking({ utmContent: e.target.value })}
              className="w-full mt-1 rounded-lg border border-[#E4E4E7] px-2.5 py-1.5 text-xs text-[#18181B] focus:border-[#7C3AED] focus:outline-none"
            />
          </div>
        </div>

        {/* Live URL Output preview */}
        <div className="p-2.5 rounded-lg bg-[#FAFAFC] border border-[#F4F4F6] text-[11px] font-mono text-[#52525B] truncate">
          {generatedUtmUrl}
        </div>
      </div>

      {/* Demo Pixel Modal */}
      <Modal
        isOpen={isPixelModalOpen}
        onClose={() => setIsPixelModalOpen(false)}
        title="Connect Advertising Pixel (Demo)"
        description="Integrate your Meta Pixel or Google Tag Manager for automated attribution tracking."
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-violet-50 border border-violet-200 text-violet-950">
            <span className="font-bold block">Demo Notice</span>
            <p className="mt-0.5 text-violet-900 leading-relaxed">
              In production, you can connect your Meta Pixel via OAuth or add your Pixel ID. In this demo mode, attribution is automatically simulated.
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#18181B]">Meta Pixel ID (16 Digits)</label>
            <input
              type="text"
              placeholder="e.g. 9840294820194820"
              defaultValue="9840294820194820"
              className="w-full rounded-xl border border-[#E4E4E7] px-3 py-2 text-xs"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsPixelModalOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                updateTracking({ pixelStatus: 'connected' });
                setIsPixelModalOpen(false);
                addToast('Demo Pixel connected successfully.', 'info');
              }}
            >
              Save Demo Connection
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
