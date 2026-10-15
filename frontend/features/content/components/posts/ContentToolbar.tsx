'use client';

import React from 'react';
import { Search, LayoutGrid, List, RefreshCw, Filter } from 'lucide-react';
import type { ContentChannel, ContentFormat, ContentFilterState } from '../../types';
import { CHANNELS, FORMATS } from '../../constants';

interface ContentToolbarProps {
  filters: ContentFilterState;
  onFilterChange: <K extends keyof ContentFilterState>(key: K, value: ContentFilterState[K]) => void;
  onResetFilters: () => void;
}

export const ContentToolbar: React.FC<ContentToolbarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3.5 bg-white rounded-2xl border border-[#E4E4E7] shadow-xs">
      {/* Search & Channel/Format Filters */}
      <div className="flex flex-wrap items-center gap-2.5 flex-1">
        {/* Search */}
        <div className="relative min-w-[220px] flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A]" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search copy, hashtags, or topics..."
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all"
          />
        </div>

        {/* Channel Dropdown */}
        <select
          value={filters.channel}
          aria-label="Filter by social channel"
          onChange={(e) => onFilterChange('channel', e.target.value as ContentChannel | 'all')}
          className="text-xs py-2 px-3 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
        >
          <option value="all">All Channels</option>
          {CHANNELS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Format Dropdown */}
        <select
          value={filters.format}
          aria-label="Filter by content format"
          onChange={(e) => onFilterChange('format', e.target.value as ContentFormat | 'all')}
          className="text-xs py-2 px-3 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
        >
          <option value="all">All Formats</option>
          {FORMATS.map((f) => (
            <option key={f.id} value={f.id}>
              {f.label}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={filters.sortBy}
          aria-label="Sort content"
          onChange={(e) => onFilterChange('sortBy', e.target.value as ContentFilterState['sortBy'])}
          className="text-xs py-2 px-3 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
        >
          <option value="latest">Sort: Newest First</option>
          <option value="score">Sort: Highest AI Score</option>
          <option value="scheduled">Sort: Scheduled Time</option>
        </select>

        {/* Clear filters if active */}
        {(filters.search || filters.channel !== 'all' || filters.format !== 'all') && (
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

      {/* View Toggle & Dev State Switcher */}
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

        {/* Grid vs Table View Mode */}
        <div className="flex items-center p-0.5 bg-[#F4F4F5] rounded-xl border border-[#E4E4E7]">
          <button
            type="button"
            onClick={() => onFilterChange('viewMode', 'grid')}
            className={`p-1.5 rounded-lg transition-all ${
              filters.viewMode === 'grid'
                ? 'bg-white text-[#18181B] shadow-2xs'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('viewMode', 'table')}
            className={`p-1.5 rounded-lg transition-all ${
              filters.viewMode === 'table'
                ? 'bg-white text-[#18181B] shadow-2xs'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
            title="Table View"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
