'use client';

import React from 'react';
import { Search, Download, RefreshCw } from 'lucide-react';
import type { LeadFilterState, LeadSource, QualificationTier } from '../../types';
import { SOURCE_CONFIG, TIER_CONFIG } from '../../constants';

interface LeadsToolbarProps {
  filters: LeadFilterState;
  onFilterChange: <K extends keyof LeadFilterState>(key: K, value: LeadFilterState[K]) => void;
  onResetFilters: () => void;
  selectedCount: number;
  onOpenExportModal: () => void;
}

export const LeadsToolbar: React.FC<LeadsToolbarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  selectedCount,
  onOpenExportModal,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3.5 bg-white rounded-2xl border border-[#E4E4E7] shadow-xs">
      <div className="flex flex-wrap items-center gap-2.5 flex-1">
        {/* Search Input */}
        <div className="relative min-w-[220px] flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A]" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search by prospect name, phone, or company..."
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
          />
        </div>

        {/* Source Dropdown */}
        <select
          value={filters.source}
          aria-label="Filter by lead source"
          onChange={(e) => onFilterChange('source', e.target.value as LeadSource | 'all')}
          className="text-xs py-2 px-3 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
        >
          <option value="all">All Channels</option>
          <option value="meta">Meta Lead Ads</option>
          <option value="google">Google Search</option>
          <option value="landing_page">Landing Page</option>
          <option value="whatsapp">WhatsApp</option>
        </select>

        {/* Tier Dropdown */}
        <select
          value={filters.tier}
          aria-label="Filter by qualification tier"
          onChange={(e) => onFilterChange('tier', e.target.value as QualificationTier | 'all')}
          className="text-xs py-2 px-3 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
        >
          <option value="all">All Qualification Tiers</option>
          <option value="hot">Hot (&gt; 85)</option>
          <option value="warm">Warm (60 - 84)</option>
          <option value="cold">Cold (&lt; 60)</option>
        </select>

        {/* Sort */}
        <select
          value={filters.sortBy}
          aria-label="Sort leads"
          onChange={(e) => onFilterChange('sortBy', e.target.value as LeadFilterState['sortBy'])}
          className="text-xs py-2 px-3 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
        >
          <option value="score">Sort: Highest AI Score</option>
          <option value="recent">Sort: Most Recent</option>
          <option value="budget">Sort: Largest Deal Value</option>
        </select>

        {(filters.search || filters.source !== 'all' || filters.tier !== 'all') && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs text-[#7C3AED] hover:underline font-medium px-2 py-1 flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" />
            Reset
          </button>
        )}
      </div>

      {/* Right Controls: Batch Export & Dev State Switcher */}
      <div className="flex items-center gap-2 self-end lg:self-auto">
        {/* Dev State Switcher */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-purple-50/60 border border-purple-200/80 text-[11px] text-purple-900">
          <span className="font-semibold text-purple-700">Dev:</span>
          {(['default', 'loading', 'empty', 'error'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => onFilterChange('devState', mode)}
              className={`px-1.5 py-0.5 rounded capitalize transition-all ${
                filters.devState === mode
                  ? 'bg-[#7C3AED] text-white font-bold shadow-2xs'
                  : 'text-purple-600 hover:text-purple-950'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Batch Export Button */}
        <button
          type="button"
          onClick={onOpenExportModal}
          className="px-3.5 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] shadow-xs flex items-center gap-1.5 transition-all"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export {selectedCount > 0 ? `(${selectedCount})` : 'Leads'}</span>
        </button>
      </div>
    </div>
  );
};
