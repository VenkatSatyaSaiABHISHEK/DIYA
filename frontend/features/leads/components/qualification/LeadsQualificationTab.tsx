'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  CheckCircle2,
  RefreshCw,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { mockLeadRecords } from '../../mocks';
import { useLeadsStore } from '../../store/leads.store';

export const LeadsQualificationTab: React.FC = () => {
  const { openDrawer } = useLeadsStore();

  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanLabel, setScanLabel] = useState('');
  const [scanNotice, setScanNotice] = useState<string | null>(null);

  const hotLeads = mockLeadRecords.filter((l) => l.qualificationTier === 'hot');

  const handleRunScan = async () => {
    setIsScanning(true);
    setScanNotice(null);

    const steps = [
      { step: 1, label: 'Validating Indian mobile numbers & WhatsApp delivery...' },
      { step: 2, label: 'Matching corporate email domains (Google, Qualcomm, Microsoft)...' },
      { step: 3, label: 'Correlating declared budgets with Kokapet unit base rates...' },
      { step: 4, label: 'Computing composite buyer qualification scores...' },
    ];

    for (const s of steps) {
      setScanStep(s.step);
      setScanLabel(s.label);
      await new Promise((r) => setTimeout(r, 450));
    }

    setIsScanning(false);
    setScanNotice('Demo scan complete: 4 hot prospects flagged for priority sales callback.');
    setTimeout(() => setScanNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Scan Trigger */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#7C3AED]" />
            <h2 className="text-sm font-bold text-[#18181B]">
              Autonomous Lead Qualification Engine
            </h2>
          </div>
          <p className="text-xs text-[#71717A]">
            DIYA AI scores every inbound inquiry in real-time before notifying sales executives.
          </p>
        </div>

        <button
          type="button"
          disabled={isScanning}
          onClick={handleRunScan}
          className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <Zap className="h-3.5 w-3.5" />
          {isScanning ? 'Scanning Prospects...' : 'Run Auto-Qualification Scan'}
        </button>
      </div>

      {/* Progress Bar when Scanning */}
      {isScanning && (
        <div className="p-6 rounded-2xl bg-purple-50/70 border border-purple-200 text-center space-y-3">
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 text-[#7C3AED] animate-pulse">
            <RefreshCw className="h-5 w-5 animate-spin" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-purple-900" aria-live="polite">
              Step {scanStep} of 4: {scanLabel}
            </p>
            <div className="w-56 h-1.5 bg-purple-200 rounded-full mx-auto overflow-hidden">
              <div
                className="h-full bg-[#7C3AED] transition-all duration-300"
                style={{ width: `${(scanStep / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {scanNotice && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center">
          {scanNotice}
        </div>
      )}

      {/* 2. Four Scoring Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4.5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#18181B]">1. Budget Verification</span>
            <span className="text-[10px] font-bold text-[#7C3AED] bg-purple-50 px-2 py-0.5 rounded">
              35% Weight
            </span>
          </div>
          <p className="text-xs text-[#71717A] leading-relaxed">
            Flags inquiries matching unit inventory thresholds (&gt; ₹4.5 Cr in Kokapet).
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4.5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#18181B]">2. Purchase Timeline</span>
            <span className="text-[10px] font-bold text-[#7C3AED] bg-purple-50 px-2 py-0.5 rounded">
              25% Weight
            </span>
          </div>
          <p className="text-xs text-[#71717A] leading-relaxed">
            Prioritizes buyers requesting site visits within the current calendar week.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4.5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#18181B]">3. Professional Profile</span>
            <span className="text-[10px] font-bold text-[#7C3AED] bg-purple-50 px-2 py-0.5 rounded">
              25% Weight
            </span>
          </div>
          <p className="text-xs text-[#71717A] leading-relaxed">
            Matches corporate leadership domains (Qualcomm, Google, Microsoft) & NRI status.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4.5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#18181B]">4. Channel Engagement</span>
            <span className="text-[10px] font-bold text-[#7C3AED] bg-purple-50 px-2 py-0.5 rounded">
              15% Weight
            </span>
          </div>
          <p className="text-xs text-[#71717A] leading-relaxed">
            Tracks digital brochure downloads, WhatsApp read receipts, and video watch time.
          </p>
        </div>
      </div>

      {/* 3. Priority Hot Leads Watchlist */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F4F4F5] pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#18181B] flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-emerald-600" />
              High-Priority Prospects Watchlist
            </h3>
            <p className="text-xs text-[#71717A] mt-0.5">
              Scored &gt; 90 by DIYA — Recommended for immediate broker follow-up
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {hotLeads.length} Hot Prospects
          </span>
        </div>

        <div className="divide-y divide-[#F4F4F5]">
          {hotLeads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => openDrawer(lead.id)}
              className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-[#FAFAFA] p-2 rounded-xl cursor-pointer transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#18181B]">{lead.fullName}</span>
                  <span className="text-[11px] text-[#71717A]">
                    ({lead.designation}, {lead.company})
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Score: {lead.qualificationScore}/100
                  </span>
                </div>
                <p className="text-xs text-purple-700 font-medium">
                  {lead.qualificationReason}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-[#71717A]">
                  <span>Project: <strong>{lead.preferredProject}</strong></span>
                  <span>•</span>
                  <span>Budget: <strong>{lead.budgetRangeINR}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDrawer(lead.id);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 text-[#7C3AED] hover:bg-purple-100 font-semibold text-xs transition-all flex items-center gap-1"
                >
                  <span>Review Profile</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
