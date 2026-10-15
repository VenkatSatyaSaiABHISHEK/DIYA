'use client';

import React, { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLeadsStore } from '../store/leads.store';
import { useLeadsDirectory } from '../../leads/hooks/useLeadsDirectory';
import { LEADS_SUB_TABS } from '../constants';
import { LeadsPipelineBoard } from './pipeline/LeadsPipelineBoard';
import { LeadsSummaryChips } from './directory/LeadsSummaryChips';
import { LeadsToolbar } from './directory/LeadsToolbar';
import { LeadsDirectoryTable } from './directory/LeadsDirectoryTable';
import { LeadsExportModal } from './directory/LeadsExportModal';
import { LeadsQualificationTab } from './qualification/LeadsQualificationTab';
import { LeadsSyncTab } from './sync/LeadsSyncTab';
import { LeadDetailDrawer } from './drawer/LeadDetailDrawer';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {
  Users,
  Kanban,
  Sparkles,
  RefreshCw,
  Download,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import type { LeadsSubTab } from '../types';

export const LeadsWorkspace: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as LeadsSubTab | null;

  const { activeTab, setActiveTab, updateLeadStage } = useLeadsStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    leads,
    rawLeads,
    summary,
    isLoading,
    error,
    filters,
    setFilter,
    resetFilters,
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
    handleResetDemo,
    refreshLeads,
  } = useLeadsDirectory();

  // Sync state with URL parameter
  useEffect(() => {
    if (tabParam && ['pipeline', 'directory', 'qualification', 'sync'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam, setActiveTab]);

  const handleTabChange = (tabId: LeadsSubTab) => {
    setActiveTab(tabId);
    router.push(`/leads?tab=${tabId}`, { scroll: false });
  };

  // GSAP Entrance
  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    },
    { dependencies: [activeTab], scope: containerRef }
  );

  return (
    <div className="space-y-6">
      {/* Top Demo Banner */}
      <DemoBanner />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-[#18181B] tracking-tight">Leads & CRM Pipeline</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Sparkles className="h-3 w-3" /> AI Scoring Active
            </span>
          </div>
          <p className="text-xs text-[#71717A] mt-1">
            Real-time lead qualification telemetry, Kanban deal pipeline, and automated CRM routing.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] shadow-xs transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Pipeline</span>
          </button>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="sticky top-0 z-20 -mx-4 px-4 sm:-mx-6 sm:px-6 py-2.5 bg-white/80 backdrop-blur-md border-b border-[#E4E4E7]/80">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {LEADS_SUB_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#7C3AED] text-white shadow-xs'
                    : 'text-[#71717A] hover:text-[#18181B] hover:bg-zinc-100/70'
                }`}
              >
                {tab.id === 'pipeline' && <Kanban className="h-3.5 w-3.5" />}
                {tab.id === 'directory' && <Users className="h-3.5 w-3.5" />}
                {tab.id === 'qualification' && <Sparkles className="h-3.5 w-3.5" />}
                {tab.id === 'sync' && <ShieldCheck className="h-3.5 w-3.5" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Content */}
      <div ref={containerRef}>
        {activeTab === 'pipeline' && <LeadsPipelineBoard />}

        {activeTab === 'directory' && (
          <div className="space-y-6">
            <LeadsSummaryChips
              summary={summary}
              activeStage={filters.stage}
              onSelectStage={(stage) => setFilter('stage', stage)}
            />

            <LeadsToolbar
              filters={filters}
              onFilterChange={setFilter}
              onResetFilters={resetFilters}
              selectedCount={selectedLeadIds.length}
              onOpenExportModal={() => setIsExportModalOpen(true)}
            />

            {error && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                  <span>{error}</span>
                </div>
                <button
                  type="button"
                  onClick={refreshLeads}
                  className="px-3 py-1 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {isLoading && (
              <div className="bg-white rounded-2xl border border-[#E4E4E7] p-6 space-y-4 shadow-xs">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-xl" />
                ))}
              </div>
            )}

            {!isLoading && !error && leads.length === 0 && (
              <div className="bg-white rounded-2xl border border-[#E4E4E7] p-12 text-center shadow-xs">
                <EmptyState
                  icon={<Users className="h-10 w-10 text-[#7C3AED]" />}
                  title="No Prospects Match Active Filters"
                  description="Adjust your search query or stage filters to view captured lead records."
                  action={
                    <button
                      type="button"
                      onClick={handleResetDemo}
                      className="mt-4 px-4 py-2 bg-[#7C3AED] text-white text-xs font-semibold rounded-xl hover:bg-[#6D28D9] flex items-center gap-2 mx-auto shadow-xs"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Reset Demo Leads
                    </button>
                  }
                />
              </div>
            )}

            {!isLoading && !error && leads.length > 0 && (
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
        )}

        {activeTab === 'qualification' && <LeadsQualificationTab />}

        {activeTab === 'sync' && <LeadsSyncTab />}
      </div>

      {/* Slide-over Profile Drawer */}
      <LeadDetailDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        lead={activeDrawerLead}
        onStageChange={updateLeadStage}
      />

      {/* Export Demo Modal */}
      <LeadsExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        selectedLeadIds={selectedLeadIds}
        totalLeadsCount={rawLeads.length}
      />
    </div>
  );
};
