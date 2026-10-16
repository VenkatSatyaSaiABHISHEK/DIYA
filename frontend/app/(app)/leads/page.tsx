'use client';

import React from 'react';
import Link from 'next/link';
import { useLeadsDirectory } from '@/features/leads/hooks/useLeadsDirectory';
import { LeadsDirectoryTable } from '@/features/leads/components/directory/LeadsDirectoryTable';
import { LeadDetailDrawer } from '@/features/leads/components/drawer/LeadDetailDrawer';
import { LeadsExportModal } from '@/features/leads/components/directory/LeadsExportModal';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Users, Kanban, Sparkles, Download, Filter } from 'lucide-react';

export default function LeadsPage() {
  const {
    leads,
    summary,
    isLoading,
    error,
    activeDrawerLead,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    selectedLeadIds,
    toggleSelectLead,
    selectAllLeads,
    clearSelection,
    isExportModalOpen,
    setIsExportModalOpen,
  } = useLeadsDirectory();

  return (
    <div className="w-full space-y-6">
      {/* 1. Header: Title, Description, Primary Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111] dark:text-[#EDEDED] tracking-tight">
            Leads
          </h1>
          <p className="text-sm text-[#666] dark:text-[#888] mt-1">
            Inbound verified prospects, autonomous AI qualification, and deal statuses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/leads/funnel">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-9"
              leftIcon={<Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />}
            >
              Funnel Telemetry
            </Button>
          </Link>
          <Link href="/leads/pipeline">
            <Button
              variant="gradient"
              size="sm"
              className="text-xs h-9 font-semibold shadow-xs"
              leftIcon={<Kanban className="h-4 w-4" />}
            >
              Pipeline Board
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Simple Summary Row (3-4 numbers) */}
      {/* 2. Simple Summary Row (3-4 numbers) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#EAEAEA] shadow-xs">
          <span className="text-[10px] sm:text-[11px] font-semibold text-[#888] uppercase tracking-wider block">
            Total Captured
          </span>
          <span className="text-xl font-bold text-[#111] mt-1 block">
            {summary.total}
          </span>
          <span className="text-[10px] text-[#888]">Across Meta &amp; Google Ads</span>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#EAEAEA] shadow-xs">
          <span className="text-[10px] sm:text-[11px] font-semibold text-[#888] uppercase tracking-wider block">
            AI Qualified VIPs
          </span>
          <span className="text-xl font-bold text-[#7C3AED] mt-1 block">
            {summary.hot}
          </span>
          <span className="text-[10px] text-emerald-600 font-medium">Ready for site visit</span>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#EAEAEA] shadow-xs">
          <span className="text-[10px] sm:text-[11px] font-semibold text-[#888] uppercase tracking-wider block">
            Converted Deals
          </span>
          <span className="text-xl font-bold text-emerald-600 mt-1 block">
            {summary.converted}
          </span>
          <span className="text-[10px] text-[#888]">Direct conversion</span>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#EAEAEA] shadow-xs">
          <span className="text-[10px] sm:text-[11px] font-semibold text-[#888] uppercase tracking-wider block">
            Pipeline Value
          </span>
          <span className="text-xl font-bold text-[#111] mt-1 block">
            ₹18.4 Cr
          </span>
          <span className="text-[10px] text-[#888]">Attributed inventory</span>
        </div>
      </div>

      {/* 3. Main Content: Table View (Click opens Sheet) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#111] uppercase tracking-wider">
            All Inbound Prospects ({leads.length})
          </span>
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="text-xs text-[#7C3AED] hover:underline font-medium inline-flex items-center gap-1"
          >
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
        </div>

        {isLoading && (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} width="100%" height={56} className="rounded-lg" />
            ))}
          </div>
        )}

        {!isLoading && leads.length === 0 && (
          <EmptyState
            icon={<Users className="h-8 w-8 text-[#7C3AED]" />}
            title="Connect CRM to see inbound leads"
            description="Link HubSpot, Salesforce, or your Meta Lead Forms in Settings to synchronize prospective buyers."
            action={
              <Link href="/settings/integrations">
                <Button size="sm" variant="gradient" className="text-xs font-semibold">
                  Connect Lead Sources
                </Button>
              </Link>
            }
          />
        )}

        {!isLoading && leads.length > 0 && (
          <LeadsDirectoryTable
            leads={leads}
            selectedLeadIds={selectedLeadIds}
            onToggleSelectLead={toggleSelectLead}
            onSelectAll={selectAllLeads}
            onClearSelection={clearSelection}
            onOpenDrawer={openDrawer}
          />
        )}
      </div>

      {/* Side Sheet for Lead Details */}
      <LeadDetailDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        lead={activeDrawerLead}
        onStageChange={() => {}}
      />

      {/* Export Confirmation Modal */}
      <LeadsExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        selectedLeadIds={selectedLeadIds}
        totalLeadsCount={leads.length}
      />
    </div>
  );
}
