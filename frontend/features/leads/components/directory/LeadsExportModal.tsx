'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Download, FileSpreadsheet, ShieldCheck, RefreshCw } from 'lucide-react';
import { leadsService } from '../../services/leads.service';

interface LeadsExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLeadIds: string[];
  totalLeadsCount: number;
}

export const LeadsExportModal: React.FC<LeadsExportModalProps> = ({
  isOpen,
  onClose,
  selectedLeadIds,
  totalLeadsCount,
}) => {
  const [targetCrm, setTargetCrm] = useState<'csv' | 'hubspot' | 'salesforce' | 'zoho'>('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const exportCount = selectedLeadIds.length > 0 ? selectedLeadIds.length : totalLeadsCount;

  const handleRunExport = async () => {
    setIsExporting(true);
    await leadsService.exportLeads(selectedLeadIds, targetCrm);
    setIsExporting(false);
    setExportNotice(
      `Demo mode: Simulated export of ${exportCount} leads to ${targetCrm.toUpperCase()} completed. No live CRM APIs were invoked.`
    );
    setTimeout(() => {
      setExportNotice(null);
      onClose();
    }, 2800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Inbound Prospects & Telemetry"
      description={`Sync ${exportCount} qualified lead records to your external sales pipeline`}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#18181B]">Select Destination</label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setTargetCrm('csv')}
              className={`p-3 rounded-xl border text-left transition-all ${
                targetCrm === 'csv'
                  ? 'border-[#7C3AED] bg-purple-50/50 text-[#7C3AED] ring-1 ring-[#7C3AED]'
                  : 'border-[#E4E4E7] bg-white text-[#71717A] hover:bg-zinc-50'
              }`}
            >
              <FileSpreadsheet className="h-4 w-4 mb-1 text-emerald-600" />
              <span className="block text-xs font-bold text-[#18181B]">CSV / Excel</span>
              <span className="text-[10px] text-[#71717A]">Offline spreadsheet file</span>
            </button>

            <button
              type="button"
              onClick={() => setTargetCrm('hubspot')}
              className={`p-3 rounded-xl border text-left transition-all ${
                targetCrm === 'hubspot'
                  ? 'border-[#7C3AED] bg-purple-50/50 text-[#7C3AED] ring-1 ring-[#7C3AED]'
                  : 'border-[#E4E4E7] bg-white text-[#71717A] hover:bg-zinc-50'
              }`}
            >
              <ShieldCheck className="h-4 w-4 mb-1 text-orange-500" />
              <span className="block text-xs font-bold text-[#18181B]">HubSpot CRM</span>
              <span className="text-[10px] text-[#71717A]">Sync contacts & deal stage</span>
            </button>

            <button
              type="button"
              onClick={() => setTargetCrm('salesforce')}
              className={`p-3 rounded-xl border text-left transition-all ${
                targetCrm === 'salesforce'
                  ? 'border-[#7C3AED] bg-purple-50/50 text-[#7C3AED] ring-1 ring-[#7C3AED]'
                  : 'border-[#E4E4E7] bg-white text-[#71717A] hover:bg-zinc-50'
              }`}
            >
              <ShieldCheck className="h-4 w-4 mb-1 text-blue-500" />
              <span className="block text-xs font-bold text-[#18181B]">Salesforce Cloud</span>
              <span className="text-[10px] text-[#71717A]">Enterprise lead router</span>
            </button>

            <button
              type="button"
              onClick={() => setTargetCrm('zoho')}
              className={`p-3 rounded-xl border text-left transition-all ${
                targetCrm === 'zoho'
                  ? 'border-[#7C3AED] bg-purple-50/50 text-[#7C3AED] ring-1 ring-[#7C3AED]'
                  : 'border-[#E4E4E7] bg-white text-[#71717A] hover:bg-zinc-50'
              }`}
            >
              <ShieldCheck className="h-4 w-4 mb-1 text-red-500" />
              <span className="block text-xs font-bold text-[#18181B]">Zoho CRM</span>
              <span className="text-[10px] text-[#71717A]">Indian real estate pipeline</span>
            </button>
          </div>
        </div>

        {exportNotice && (
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold text-center">
            {exportNotice}
          </div>
        )}

        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-[11px] text-zinc-500">
          Demo mode: export is simulated. No real CRM records were synced or files downloaded to
          disk.
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#E4E4E7] text-xs font-semibold text-[#71717A]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isExporting}
            onClick={handleRunExport}
            className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] disabled:opacity-50 shadow-xs flex items-center gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            {isExporting ? 'Exporting...' : `Export ${exportCount} Records`}
          </button>
        </div>
      </div>
    </Modal>
  );
};
