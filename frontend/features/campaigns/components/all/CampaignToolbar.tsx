'use client';

import React from 'react';
import { useCampaignsStore } from '../../store/campaigns.store';
import {
  Search,
  X,
  LayoutGrid,
  Table as TableIcon,
  SlidersHorizontal,
  Bug,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Platform, Objective, CampaignStatus } from '../../types';

export const CampaignToolbar: React.FC = () => {
  const {
    search,
    setSearch,
    platformFilter,
    setPlatformFilter,
    objectiveFilter,
    setObjectiveFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    devState,
    setDevState,
  } = useCampaignsStore();

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#E4E4E7] shadow-2xs">
      {/* Left: Search input */}
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A1A1AA]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by campaign name or target audience..."
          className="w-full rounded-xl border border-[#E4E4E7] bg-[#FAFAFC] pl-9 pr-8 py-2 text-xs text-[#18181B] placeholder:text-[#A1A1AA] focus:border-[#7C3AED] focus:bg-white focus:outline-none transition-all"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#18181B]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Right: Filter dropdowns and controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Platform Filter */}
        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value as 'all' | Platform)}
          aria-label="Filter by ad platform"
          className="rounded-xl border border-[#E4E4E7] bg-white px-3 py-2 text-xs font-medium text-[#18181B] focus:border-[#7C3AED] focus:outline-none cursor-pointer"
        >
          <option value="all">All Networks</option>
          <option value="meta">Meta Ads</option>
          <option value="google">Google Ads</option>
          <option value="omnichannel">Omnichannel</option>
        </select>

        {/* Objective Filter */}
        <select
          value={objectiveFilter}
          onChange={(e) => setObjectiveFilter(e.target.value as 'all' | Objective)}
          aria-label="Filter by objective"
          className="rounded-xl border border-[#E4E4E7] bg-white px-3 py-2 text-xs font-medium text-[#18181B] focus:border-[#7C3AED] focus:outline-none cursor-pointer"
        >
          <option value="all">All Objectives</option>
          <option value="leads">Lead Generation</option>
          <option value="awareness">Brand Awareness</option>
          <option value="conversions">Conversions & Sales</option>
          <option value="traffic">Website Traffic</option>
        </select>

        {/* Sort Selector */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          aria-label="Sort campaigns"
          className="rounded-xl border border-[#E4E4E7] bg-white px-3 py-2 text-xs font-medium text-[#18181B] focus:border-[#7C3AED] focus:outline-none cursor-pointer"
        >
          <option value="recent">Most Recent</option>
          <option value="spend_high">Spend: High to Low</option>
          <option value="leads_high">Leads: High to Low</option>
          <option value="cpl_low">CPL: Lowest First</option>
        </select>

        {/* View Mode Toggle (Card / Table) */}
        <div className="flex items-center rounded-xl border border-[#E4E4E7] p-0.5 bg-[#F4F4F6]">
          <button
            type="button"
            onClick={() => setViewMode('card')}
            aria-label="Card view"
            className={cn(
              'p-1.5 rounded-lg transition-all',
              viewMode === 'card'
                ? 'bg-white text-[#7C3AED] shadow-2xs'
                : 'text-[#71717A] hover:text-[#18181B]'
            )}
            title="Card View"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            aria-label="Table view"
            className={cn(
              'p-1.5 rounded-lg transition-all',
              viewMode === 'table'
                ? 'bg-white text-[#7C3AED] shadow-2xs'
                : 'text-[#71717A] hover:text-[#18181B]'
            )}
            title="Table View"
          >
            <TableIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Dev State Override Switcher */}
        <div className="flex items-center gap-1 rounded-xl border border-dashed border-[#DDD6FE] bg-[#FAF5FF] px-2 py-1 text-[11px] font-medium text-[#6D28D9]">
          <Bug className="h-3 w-3 text-[#7C3AED]" />
          <span className="hidden sm:inline">Dev:</span>
          <select
            value={devState}
            onChange={(e) => setDevState(e.target.value as any)}
            aria-label="Dev state toggle"
            className="bg-transparent border-none text-[11px] font-bold text-[#7C3AED] focus:outline-none cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="loading">Loading</option>
            <option value="empty">Empty</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>
    </div>
  );
};
