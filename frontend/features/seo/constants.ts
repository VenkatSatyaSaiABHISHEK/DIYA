import type { KeywordFilterState, SeoSubTab } from './types';

export const SEO_SUB_TABS = [
  { id: 'overview', label: 'SEO Overview' },
  { id: 'keywords', label: 'Keyword Rankings' },
  { id: 'audit', label: 'Technical Site Audit' },
  { id: 'pages', label: 'SERP & Meta Studio' },
] as const;

export const INTENT_CONFIG: Record<
  string,
  { label: string; colorClass: string }
> = {
  commercial: {
    label: 'Commercial',
    colorClass: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  informational: {
    label: 'Informational',
    colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  transactional: {
    label: 'Transactional',
    colorClass: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  navigational: {
    label: 'Navigational',
    colorClass: 'bg-zinc-100 text-zinc-700 border-zinc-200',
  },
};

export const SEVERITY_CONFIG = {
  critical: {
    label: 'Critical Issue',
    colorClass: 'bg-red-50 text-red-700 border-red-200',
    dotColor: 'bg-red-500',
  },
  warning: {
    label: 'Warning',
    colorClass: 'bg-amber-50 text-amber-700 border-amber-200',
    dotColor: 'bg-amber-500',
  },
  notice: {
    label: 'Notice',
    colorClass: 'bg-blue-50 text-blue-700 border-blue-200',
    dotColor: 'bg-blue-500',
  },
};

export const DEFAULT_KEYWORD_FILTERS: KeywordFilterState = {
  search: '',
  intent: 'all',
  rankingTier: 'all',
  sortBy: 'rank',
  devState: 'default',
};
