import type { AnalyticsFilterState, AnalyticsSubTab, AttributionModelType } from './types';

export const ANALYTICS_SUB_TABS = [
  { id: 'overview', label: 'Executive Overview' },
  { id: 'attribution', label: 'Multi-Touch Attribution' },
  { id: 'channels', label: 'Channel ROAS Matrix' },
  { id: 'funnel', label: 'Conversion Funnel' },
] as const;

export const ATTRIBUTION_MODELS: {
  id: AttributionModelType;
  label: string;
  description: string;
}[] = [
  {
    id: 'data_driven',
    label: 'DIYA AI Data-Driven (Weighted)',
    description: 'Algorithmic credit distribution based on incremental lift at each touchpoint.',
  },
  {
    id: 'first_touch',
    label: 'First-Touch Discovery',
    description: '100% credit given to the initial campaign ad that introduced the buyer.',
  },
  {
    id: 'last_touch',
    label: 'Last-Touch Conversion',
    description: '100% credit given to the final ad clicked prior to lead capture / site visit.',
  },
  {
    id: 'linear',
    label: 'Linear Even Split',
    description: 'Equal credit distributed across all touchpoints in the buyer journey.',
  },
];

export const DEFAULT_ANALYTICS_FILTERS: AnalyticsFilterState = {
  timeRange: '30d',
  attributionModel: 'data_driven',
  devState: 'default',
};
