'use client';

import React from 'react';
import {
  ShieldCheck,
  Zap,
  AlertTriangle,
  Play,
  CheckCircle2,
  Sparkles,
  Info,
  RefreshCw,
} from 'lucide-react';
import { useSeoAudit } from '../../hooks/useSeoAudit';
import { SEVERITY_CONFIG } from '../../constants';
import { Modal } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import type { SeoAuditIssue } from '../../types';

export const SeoAuditTab: React.FC = () => {
  const {
    vitals,
    issues,
    isLoading,
    error,
    isAuditing,
    auditStep,
    auditStepLabel,
    runFullAudit,
    activeFixIssue,
    setActiveFixIssue,
    fixNotice,
    isFixing,
    handleConfirmFix,
    refreshAudit,
  } = useSeoAudit();

  const criticalCount = issues.filter((i) => i.severity === 'critical').length;
  const warningCount = issues.filter((i) => i.severity === 'warning').length;
  const noticeCount = issues.filter((i) => i.severity === 'notice').length;

  return (
    <div className="space-y-6">
      {/* 1. Audit Overview & Core Web Vitals Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Health & Audit Trigger (5 Columns) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#71717A]">Technical Site Health</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                126 Pages Crawled
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#18181B]">88</span>
              <span className="text-xs text-[#71717A]">/ 100</span>
              <span className="ml-2 text-xs font-semibold text-emerald-600">
                Passing Google PageSpeed Vitals
              </span>
            </div>

            {/* Severity Breakdown */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-center">
                <span className="block text-base font-bold text-red-700">{criticalCount}</span>
                <span className="text-[10px] font-semibold text-red-600">Critical</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <span className="block text-base font-bold text-amber-700">{warningCount}</span>
                <span className="text-[10px] font-semibold text-amber-600">Warnings</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-center">
                <span className="block text-base font-bold text-blue-700">{noticeCount}</span>
                <span className="text-[10px] font-semibold text-blue-600">Notices</span>
              </div>
            </div>
          </div>

          {/* Trigger Button */}
          <div className="pt-2">
            <button
              type="button"
              disabled={isAuditing}
              onClick={runFullAudit}
              className="w-full py-2.5 px-4 rounded-xl bg-[#7C3AED] text-white text-xs font-bold hover:bg-[#6D28D9] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <Play className="h-3.5 w-3.5" />
              {isAuditing ? 'Auditing 126 URLs...' : 'Run Full Site Crawler Audit'}
            </button>
          </div>
        </div>

        {/* Right: Real-World Core Web Vitals (7 Columns) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F4F4F5] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#18181B] flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-[#7C3AED]" />
                Google Core Web Vitals (Field Data)
              </h3>
              <p className="text-xs text-[#71717A] mt-0.5">
                Chrome User Experience (CrUX) metrics for Hyderabad mobile users
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Good
            </span>
          </div>

          {vitals && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#FAFAFA] rounded-xl border border-[#E4E4E7] space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#71717A]">LCP (Paint)</span>
                <span className="block text-lg font-bold text-emerald-600">{vitals.lcp.value}</span>
                <span className="text-[10px] text-[#71717A] block">&lt; 2.5s is Good</span>
              </div>

              <div className="p-3 bg-[#FAFAFA] rounded-xl border border-[#E4E4E7] space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#71717A]">
                  INP (Interaction)
                </span>
                <span className="block text-lg font-bold text-emerald-600">{vitals.inp.value}</span>
                <span className="text-[10px] text-[#71717A] block">&lt; 200ms is Good</span>
              </div>

              <div className="p-3 bg-[#FAFAFA] rounded-xl border border-[#E4E4E7] space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#71717A]">CLS (Shift)</span>
                <span className="block text-lg font-bold text-emerald-600">{vitals.cls.value}</span>
                <span className="text-[10px] text-[#71717A] block">&lt; 0.1 is Good</span>
              </div>

              <div className="p-3 bg-[#FAFAFA] rounded-xl border border-[#E4E4E7] space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#71717A]">
                  TTFB (Server)
                </span>
                <span className="block text-lg font-bold text-emerald-600">
                  {vitals.ttfb.value}
                </span>
                <span className="text-[10px] text-[#71717A] block">&lt; 800ms is Good</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Audit Progress Bar when Auditing */}
      {isAuditing && (
        <div className="p-6 rounded-2xl bg-purple-50/70 border border-purple-200 text-center space-y-3">
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 text-[#7C3AED] animate-pulse">
            <RefreshCw className="h-5 w-5 animate-spin" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-purple-900" aria-live="polite">
              Step {auditStep} of 4: {auditStepLabel}
            </p>
            <div className="w-56 h-1.5 bg-purple-200 rounded-full mx-auto overflow-hidden">
              <div
                className="h-full bg-[#7C3AED] transition-all duration-300"
                style={{ width: `${(auditStep / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. Detected Issues List */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F4F4F5] pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#18181B]">Detected Crawl Issues</h3>
            <p className="text-xs text-[#71717A] mt-0.5">
              Ranked by Google algorithm penalty severity
            </p>
          </div>
          <span className="text-xs font-medium text-[#71717A]">{issues.length} Issues Pending</span>
        </div>

        {issues.length === 0 ? (
          <div className="p-8 text-center text-xs text-emerald-600 font-semibold">
            All detected technical issues have been resolved!
          </div>
        ) : (
          <div className="divide-y divide-[#F4F4F5]">
            {issues.map((issue) => {
              const sev = SEVERITY_CONFIG[issue.severity];

              return (
                <div
                  key={issue.id}
                  className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${sev.colorClass}`}
                      >
                        {sev.label}
                      </span>
                      <span className="text-xs font-bold text-[#18181B]">{issue.title}</span>
                    </div>

                    <p className="text-xs text-[#71717A] leading-relaxed">
                      {issue.impactDescription}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-[#71717A]">
                      <span>
                        Affected: <strong className="text-[#18181B]">{issue.affectedPagesCount} URLs</strong>
                      </span>
                      <span>•</span>
                      <span className="text-purple-700 font-medium">
                        Fix: {issue.recommendedFix}
                      </span>
                    </div>
                  </div>

                  {issue.canAutoFix ? (
                    <button
                      type="button"
                      onClick={() => setActiveFixIssue(issue)}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-50 text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white font-semibold text-xs transition-all flex items-center gap-1.5 shrink-0 self-start md:self-auto border border-purple-200"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      1-Click Auto-Fix
                    </button>
                  ) : (
                    <span className="text-xs text-[#71717A] font-medium italic shrink-0">
                      Requires Dev Fix
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Auto-Fix Demo Modal */}
      {activeFixIssue && (
        <Modal
          isOpen={!!activeFixIssue}
          onClose={() => setActiveFixIssue(null)}
          title="DIYA Autonomous SEO Fix"
          description={`Resolve: "${activeFixIssue.title}"`}
        >
          <div className="space-y-4">
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900 space-y-1">
              <p className="font-bold">Proposed Autonomous Action:</p>
              <p>{activeFixIssue.recommendedFix}</p>
            </div>

            {fixNotice && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold text-center">
                {fixNotice}
              </div>
            )}

            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-[11px] text-zinc-500">
              Demo mode: Simulated auto-fix. In production, DIYA writes canonical tags or schema JSON-LD to your website repository.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveFixIssue(null)}
                className="px-4 py-2 rounded-xl border border-[#E4E4E7] text-xs font-semibold text-[#71717A]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isFixing}
                onClick={handleConfirmFix}
                className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] disabled:opacity-50 shadow-xs flex items-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {isFixing ? 'Applying Fix...' : 'Apply Autonomous Fix'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
