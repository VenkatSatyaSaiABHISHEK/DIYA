'use client';

import React from 'react';
import {
  Search,
  Plus,
  ArrowUp,
  ArrowDown,
  Sparkles,
  ExternalLink,
  SlidersHorizontal,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';
import { useSeoKeywords } from '../../hooks/useSeoKeywords';
import { INTENT_CONFIG } from '../../constants';
import { Modal } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import type { SearchIntent, SeoSubTab } from '../../types';

interface SeoKeywordsTabProps {
  onNavigateTab: (tab: SeoSubTab) => void;
}

export const SeoKeywordsTab: React.FC<SeoKeywordsTabProps> = ({ onNavigateTab }) => {
  const {
    keywords,
    stats,
    isLoading,
    error,
    filters,
    setFilter,
    resetFilters,
    isAddModalOpen,
    setIsAddModalOpen,
    newKeywordInput,
    setNewKeywordInput,
    addNotice,
    handleAddKeyword,
    refreshKeywords,
  } = useSeoKeywords();

  return (
    <div className="space-y-6">
      {/* 1. KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4 shadow-xs">
          <span className="text-xs font-semibold text-[#71717A]">Top 3 Positions</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-emerald-600">{stats.top3}</span>
            <span className="text-xs text-[#71717A]">queries</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4 shadow-xs">
          <span className="text-xs font-semibold text-[#71717A]">Page 1 (Top 10)</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#18181B]">{stats.top10}</span>
            <span className="text-xs text-[#71717A]">queries</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4 shadow-xs">
          <span className="text-xs font-semibold text-[#71717A]">Rank Improved (7d)</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-emerald-600">+{stats.improved}</span>
            <span className="text-xs text-emerald-600">queries</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4 shadow-xs">
          <span className="text-xs font-semibold text-[#71717A]">Rank Dropped (7d)</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-amber-600">-{stats.dropped}</span>
            <span className="text-xs text-[#71717A]">queries</span>
          </div>
        </div>
      </div>

      {/* 2. Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3.5 bg-white rounded-2xl border border-[#E4E4E7] shadow-xs">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search */}
          <div className="relative min-w-[220px] flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A]" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              placeholder="Filter by keyword or landing page..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
          </div>

          {/* Intent Dropdown */}
          <select
            value={filters.intent}
            aria-label="Filter by search intent"
            onChange={(e) => setFilter('intent', e.target.value as SearchIntent | 'all')}
            className="text-xs py-2 px-3 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
          >
            <option value="all">All Search Intents</option>
            <option value="commercial">Commercial</option>
            <option value="informational">Informational</option>
            <option value="transactional">Transactional</option>
            <option value="navigational">Navigational</option>
          </select>

          {/* Ranking Tier Dropdown */}
          <select
            value={filters.rankingTier}
            aria-label="Filter by ranking position tier"
            onChange={(e) =>
              setFilter('rankingTier', e.target.value as 'all' | 'top3' | 'top10' | 'striking')
            }
            className="text-xs py-2 px-3 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
          >
            <option value="all">All Positions</option>
            <option value="top3">Top 3 Rankings</option>
            <option value="top10">Top 10 (Page 1)</option>
            <option value="striking">Striking Distance (11-20)</option>
          </select>

          {/* Sort By */}
          <select
            value={filters.sortBy}
            aria-label="Sort keyword rankings"
            onChange={(e) =>
              setFilter('sortBy', e.target.value as 'rank' | 'volume' | 'difficulty')
            }
            className="text-xs py-2 px-3 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] text-[#18181B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
          >
            <option value="rank">Sort: Best Rank First</option>
            <option value="volume">Sort: Highest Volume</option>
            <option value="difficulty">Sort: Keyword Difficulty</option>
          </select>

          {(filters.search || filters.intent !== 'all' || filters.rankingTier !== 'all') && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-[#7C3AED] hover:underline font-medium px-2 py-1 flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              Reset
            </button>
          )}
        </div>

        {/* Add Keyword Button */}
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] shadow-xs flex items-center gap-1.5 transition-all self-end lg:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Track New Keyword</span>
        </button>
      </div>

      {/* 3. Keywords Table */}
      {isLoading ? (
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-6 space-y-4 shadow-xs">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-12 w-full rounded-xl" />
          ))}
        </div>
      ) : keywords.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-12 text-center shadow-xs">
          <EmptyState
            icon={<Search className="h-10 w-10 text-[#7C3AED]" />}
            title="No Keywords Match Active Filters"
            description="Adjust your search intent or ranking tier filters to view tracked search queries."
            action={
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-white border border-[#E4E4E7] text-[#18181B] text-xs font-semibold rounded-xl hover:bg-zinc-50"
              >
                Reset Filters
              </button>
            }
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E4E4E7] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFAFA] border-b border-[#E4E4E7] text-[#71717A] uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Search Query</th>
                  <th className="py-3 px-4">Intent</th>
                  <th className="py-3 px-4">Google Rank</th>
                  <th className="py-3 px-4">Search Volume (Mo)</th>
                  <th className="py-3 px-4">Difficulty (KD%)</th>
                  <th className="py-3 px-4">Target Landing URL</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F4F5]">
                {keywords.map((item) => {
                  const intentMeta = INTENT_CONFIG[item.intent] || INTENT_CONFIG.commercial;
                  const rankDiff = item.previousPosition - item.position; // Positive means improved

                  return (
                    <tr key={item.id} className="hover:bg-[#FAFAFA] transition-colors">
                      {/* Query */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="font-bold text-[#18181B] block">{item.keyword}</span>
                        <div className="flex items-center gap-1.5 mt-1">
                          {item.serpFeatures.map((feat) => (
                            <span
                              key={feat}
                              className="px-1.5 py-0.2 rounded bg-zinc-100 text-[#71717A] text-[9px] uppercase tracking-wider"
                            >
                              {feat.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Intent */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${intentMeta.colorClass}`}
                        >
                          {intentMeta.label}
                        </span>
                      </td>

                      {/* Rank Position */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#18181B] text-white text-xs font-bold">
                            #{item.position}
                          </span>
                          {rankDiff > 0 ? (
                            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                              <ArrowUp className="h-3 w-3" />
                              {rankDiff}
                            </span>
                          ) : rankDiff < 0 ? (
                            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                              <ArrowDown className="h-3 w-3" />
                              {Math.abs(rankDiff)}
                            </span>
                          ) : (
                            <span className="text-[11px] text-[#A1A1AA] font-medium">—</span>
                          )}
                        </div>
                      </td>

                      {/* Volume */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-medium text-[#18181B]">
                        {item.volume.toLocaleString('en-IN')}{' '}
                        <span className="text-[10px] text-[#71717A]">/ mo</span>
                      </td>

                      {/* Difficulty (KD%) */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                item.difficulty < 35
                                  ? 'bg-emerald-500'
                                  : item.difficulty < 60
                                  ? 'bg-amber-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${item.difficulty}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-[#71717A]">
                            {item.difficulty}%
                          </span>
                        </div>
                      </td>

                      {/* Target URL */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-[#71717A] max-w-xs truncate">
                        <span className="font-mono text-[11px] hover:text-[#7C3AED] hover:underline cursor-pointer">
                          {item.targetUrl}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <button
                          type="button"
                          onClick={() => onNavigateTab('pages')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 text-[#7C3AED] hover:bg-purple-100 font-semibold text-[11px] transition-colors"
                        >
                          <Sparkles className="h-3 w-3" />
                          Optimize Page
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Add Keyword Demo Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Track New Target Keyword"
          description="Add high-intent search terms to DIYA's daily position tracking bot"
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#18181B]">Target Search Query</label>
              <input
                type="text"
                value={newKeywordInput}
                onChange={(e) => setNewKeywordInput(e.target.value)}
                placeholder="e.g. 5 bhk penthouse in neopolis hyderabad"
                className="w-full text-xs p-2.5 rounded-xl border border-[#E4E4E7] bg-white text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
              />
            </div>

            {addNotice && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold text-center">
                {addNotice}
              </div>
            )}

            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-[11px] text-zinc-500">
              Demo mode: Keyword is queued into simulated daily rank tracker.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#E4E4E7] text-xs font-semibold text-[#71717A] hover:bg-zinc-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddKeyword}
                disabled={!newKeywordInput.trim()}
                className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] disabled:opacity-50 shadow-xs"
              >
                Track Keyword
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
