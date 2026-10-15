import type { LeadFilterState, LeadSource, LeadStage, LeadsSubTab, QualificationTier } from './types';

export const LEADS_SUB_TABS = [
  { id: 'pipeline', label: 'Kanban Pipeline' },
  { id: 'directory', label: 'Lead Directory' },
  { id: 'qualification', label: 'DIYA AI Telemetry' },
  { id: 'sync', label: 'CRM & Export Sync' },
] as const;

export const PIPELINE_STAGES: {
  id: LeadStage;
  label: string;
  badgeColor: string;
  borderColor: string;
  dotColor: string;
}[] = [
  {
    id: 'new',
    label: 'New Leads',
    badgeColor: 'bg-blue-50 text-blue-700',
    borderColor: 'border-blue-200',
    dotColor: 'bg-blue-500',
  },
  {
    id: 'contacted',
    label: 'AI Contacted',
    badgeColor: 'bg-purple-50 text-purple-700',
    borderColor: 'border-purple-200',
    dotColor: 'bg-[#7C3AED]',
  },
  {
    id: 'qualified',
    label: 'Verified Qualified',
    badgeColor: 'bg-indigo-50 text-indigo-700',
    borderColor: 'border-indigo-200',
    dotColor: 'bg-indigo-500',
  },
  {
    id: 'site_visit',
    label: 'Site Visit Booked',
    badgeColor: 'bg-amber-50 text-amber-700',
    borderColor: 'border-amber-200',
    dotColor: 'bg-amber-500',
  },
  {
    id: 'negotiation',
    label: 'Token / Offer',
    badgeColor: 'bg-orange-50 text-orange-700',
    borderColor: 'border-orange-200',
    dotColor: 'bg-orange-500',
  },
  {
    id: 'converted',
    label: 'Converted / Won',
    badgeColor: 'bg-emerald-50 text-emerald-700',
    borderColor: 'border-emerald-200',
    dotColor: 'bg-emerald-500',
  },
];

export const SOURCE_CONFIG: Record<
  LeadSource,
  { label: string; colorClass: string; bgColor: string }
> = {
  meta: {
    label: 'Meta Lead Ads',
    colorClass: 'text-pink-600',
    bgColor: 'bg-pink-50 border-pink-200',
  },
  google: {
    label: 'Google Search PMax',
    colorClass: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
  },
  landing_page: {
    label: 'Website Landing Page',
    colorClass: 'text-indigo-600',
    bgColor: 'bg-indigo-50 border-indigo-200',
  },
  whatsapp: {
    label: 'WhatsApp Direct Chat',
    colorClass: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-200',
  },
  direct: {
    label: 'Direct Referral / Walk-in',
    colorClass: 'text-zinc-700',
    bgColor: 'bg-zinc-100 border-zinc-200',
  },
};

export const TIER_CONFIG: Record<
  QualificationTier,
  { label: string; badgeClass: string; scoreRange: string }
> = {
  hot: {
    label: 'Hot Prospect',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    scoreRange: '85 - 100',
  },
  warm: {
    label: 'Warm Lead',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    scoreRange: '60 - 84',
  },
  cold: {
    label: 'Cold / Inactive',
    badgeClass: 'bg-zinc-100 text-zinc-600 border-zinc-200',
    scoreRange: '< 60',
  },
};

export const DEFAULT_LEAD_FILTERS: LeadFilterState = {
  search: '',
  stage: 'all',
  source: 'all',
  tier: 'all',
  sortBy: 'score',
  devState: 'default',
};
