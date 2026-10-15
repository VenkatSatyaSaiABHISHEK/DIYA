'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Download, FileImage, Video, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface StudioExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  format: 'png' | 'mp4' | 'pdf' | 'text';
  onFormatChange: (f: 'png' | 'mp4' | 'pdf' | 'text') => void;
  onExport: () => void;
  isExporting: boolean;
}

export const StudioExportModal: React.FC<StudioExportModalProps> = ({
  isOpen,
  onClose,
  format,
  onFormatChange,
  onExport,
  isExporting,
}) => {
  const formats = [
    { id: 'png' as const, label: 'High-Res Image (PNG)', desc: '1080 x 1080 px for Feed and Stories', icon: <FileImage className="h-4 w-4" /> },
    { id: 'mp4' as const, label: 'Animated Reel Video (MP4)', desc: '9:16 Vertical Video format (1080 x 1920)', icon: <Video className="h-4 w-4" /> },
    { id: 'pdf' as const, label: 'Creative Pitch Deck (PDF)', desc: 'Formatted multi-page client presentation', icon: <FileText className="h-4 w-4" /> },
    { id: 'text' as const, label: 'Copy & Hashtag Matrix', desc: 'Raw text for manual campaign staging', icon: <Download className="h-4 w-4" /> },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Ad Creative Asset"
      description="Choose your target export format for manual publishing or team sign-off."
    >
      <div className="space-y-4 text-xs">
        {/* Notice */}
        <div className="p-3.5 rounded-xl bg-violet-50 border border-violet-200 text-violet-950 flex items-start gap-2.5">
          <ShieldAlert className="h-4 w-4 text-[#7C3AED] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold">Sandbox Environment</span>
            <p className="text-violet-900 leading-relaxed text-[11px]">
              This is a demonstration sandbox. Triggering export will run a simulation flow and verify format packaging without triggering real downloads.
            </p>
          </div>
        </div>

        {/* Format Selector Cards */}
        <div className="space-y-2">
          {formats.map((fmt) => {
            const isSelected = format === fmt.id;

            return (
              <div
                key={fmt.id}
                onClick={() => onFormatChange(fmt.id)}
                className={cn(
                  'p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all select-none',
                  isSelected
                    ? 'border-[#7C3AED] bg-[#FAF5FF] ring-1 ring-[#7C3AED]'
                    : 'border-[#E4E4E7] bg-white hover:border-[#D4D4D8]'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      'p-2 rounded-lg',
                      isSelected ? 'bg-[#EDE9FE] text-[#7C3AED]' : 'bg-[#F4F4F6] text-[#71717A]'
                    )}
                  >
                    {fmt.icon}
                  </div>
                  <div>
                    <span className="font-bold text-[#18181B] block">{fmt.label}</span>
                    <span className="text-[11px] text-[#71717A] block">{fmt.desc}</span>
                  </div>
                </div>

                <input
                  type="radio"
                  name="exportFormat"
                  checked={isSelected}
                  onChange={() => onFormatChange(fmt.id)}
                  className="h-4 w-4 text-[#7C3AED] focus:ring-[#7C3AED]"
                />
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-[#E4E4E7]/60 flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onExport}
            disabled={isExporting}
            className="font-bold"
            leftIcon={<Download className="h-3.5 w-3.5" />}
          >
            {isExporting ? 'Packaging Asset...' : 'Simulate Asset Export'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
