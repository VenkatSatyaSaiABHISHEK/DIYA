import { useState, useEffect, useMemo, useCallback } from 'react';
import { seoService } from '../services/seo.service';
import { useSeoStore } from '../store/seo.store';
import type { SeoKeywordItem } from '../types';

export function useSeoKeywords() {
  const [keywords, setKeywords] = useState<SeoKeywordItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    keywordFilters,
    setKeywordFilter,
    resetKeywordFilters,
    selectedKeywordId,
    setSelectedKeywordId,
  } = useSeoStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newKeywordInput, setNewKeywordInput] = useState('');
  const [addNotice, setAddNotice] = useState<string | null>(null);

  const fetchKeywords = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const list = await seoService.listKeywords();
      setKeywords(list);
    } catch {
      setError('Failed to fetch tracked keywords.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKeywords();
  }, [fetchKeywords]);

  // Filtered & Sorted Keywords
  const filteredKeywords = useMemo(() => {
    if (keywordFilters.devState === 'empty') return [];

    let list = [...keywords];

    // Search query
    if (keywordFilters.search.trim()) {
      const q = keywordFilters.search.toLowerCase();
      list = list.filter(
        (k) => k.keyword.toLowerCase().includes(q) || k.targetUrl.toLowerCase().includes(q)
      );
    }

    // Intent filter
    if (keywordFilters.intent !== 'all') {
      list = list.filter((k) => k.intent === keywordFilters.intent);
    }

    // Ranking Tier filter
    if (keywordFilters.rankingTier === 'top3') {
      list = list.filter((k) => k.position <= 3);
    } else if (keywordFilters.rankingTier === 'top10') {
      list = list.filter((k) => k.position <= 10);
    } else if (keywordFilters.rankingTier === 'striking') {
      list = list.filter((k) => k.position > 10 && k.position <= 20);
    }

    // Sort
    list.sort((a, b) => {
      if (keywordFilters.sortBy === 'volume') return b.volume - a.volume;
      if (keywordFilters.sortBy === 'difficulty') return b.difficulty - a.difficulty;
      return a.position - b.position;
    });

    return list;
  }, [keywords, keywordFilters]);

  // KPI Calculations
  const stats = useMemo(() => {
    return {
      total: keywords.length,
      top3: keywords.filter((k) => k.position <= 3).length,
      top10: keywords.filter((k) => k.position <= 10).length,
      improved: keywords.filter((k) => k.position < k.previousPosition).length,
      dropped: keywords.filter((k) => k.position > k.previousPosition).length,
    };
  }, [keywords]);

  const handleAddKeyword = () => {
    if (!newKeywordInput.trim()) return;
    setAddNotice(`Demo mode: "${newKeywordInput.trim()}" added to simulated rank tracking queue.`);
    setTimeout(() => {
      setAddNotice(null);
      setNewKeywordInput('');
      setIsAddModalOpen(false);
    }, 2000);
  };

  return {
    keywords: filteredKeywords,
    rawKeywords: keywords,
    stats,
    isLoading: keywordFilters.devState === 'loading' ? true : isLoading,
    error: keywordFilters.devState === 'error' ? 'Dev State: Simulated Network Error' : error,
    filters: keywordFilters,
    setFilter: setKeywordFilter,
    resetFilters: resetKeywordFilters,
    selectedKeywordId,
    setSelectedKeywordId,
    isAddModalOpen,
    setIsAddModalOpen,
    newKeywordInput,
    setNewKeywordInput,
    addNotice,
    handleAddKeyword,
    refreshKeywords: fetchKeywords,
  };
}
