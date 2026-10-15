import type {
  ContentChannel,
  ContentFormat,
  ContentLanguage,
  ContentTone,
  GeneratorBrief,
  ContentFilterState,
} from './types';

export const CONTENT_SUB_TABS = [
  { id: 'posts', label: 'Posts & Matrix' },
  { id: 'calendar', label: 'Publishing Calendar' },
  { id: 'generator', label: 'AI Content Studio' },
  { id: 'library', label: 'Hooks & Brand Kit' },
] as const;

export type ContentSubTab = (typeof CONTENT_SUB_TABS)[number]['id'];

export const CHANNELS: {
  id: ContentChannel;
  name: string;
  color: string;
  bgColor: string;
  badgeBorder: string;
}[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    badgeBorder: 'border-pink-200',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    badgeBorder: 'border-blue-200',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    badgeBorder: 'border-indigo-200',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    color: 'text-zinc-800',
    bgColor: 'bg-zinc-100',
    badgeBorder: 'border-zinc-300',
  },
  {
    id: 'youtube',
    name: 'YouTube Shorts',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    badgeBorder: 'border-red-200',
  },
];

export const FORMATS: { id: ContentFormat; label: string; desc: string }[] = [
  { id: 'carousel', label: 'Carousel (5-7 Slides)', desc: 'High saves & educational retention' },
  { id: 'reel_script', label: 'Viral Reel Script (60s)', desc: 'Timed cues, audio hooks & visual flow' },
  { id: 'single_image', label: 'Single Image Post', desc: 'Punchy announcement or quote card' },
  { id: 'article', label: 'Long-Form Article', desc: 'Deep dive thought leadership on LinkedIn' },
  { id: 'ad_copy', label: 'Direct Response Copy', desc: 'Short-form ad variations for paid ads' },
];

export const LANGUAGES: { id: ContentLanguage; label: string; subLabel: string }[] = [
  { id: 'en', label: 'English', subLabel: 'Indian Business English' },
  { id: 'te', label: 'Telugu', subLabel: 'తెలుగు (Local Hyderabad Market)' },
  { id: 'hi', label: 'Hindi', subLabel: 'हिंदी (National Outreach)' },
];

export const TONES: { id: ContentTone; label: string }[] = [
  { id: 'bold', label: 'Bold & Provocative' },
  { id: 'professional', label: 'Data-Driven & Executive' },
  { id: 'storytelling', label: 'Storytelling & Empathy' },
  { id: 'urgent', label: 'Urgent & Limited-Time' },
  { id: 'educational', label: 'Educational & Authority' },
];

export const OBJECTIVES = [
  { id: 'lead_generation', label: 'Lead Generation', desc: 'Direct inquiries & brochure downloads' },
  { id: 'thought_leadership', label: 'Thought Leadership', desc: 'Establish niche authority' },
  { id: 'brand_awareness', label: 'Brand Awareness', desc: 'Maximize viral impressions & shares' },
  { id: 'festive_event', label: 'Festive / Special Event', desc: 'Diwali, Dussehra, New Year launches' },
] as const;

export const DEFAULT_BRIEF: GeneratorBrief = {
  topic: 'Why Kokapet luxury villas yield 18% higher rental returns than Gachibowli high-rises',
  objective: 'lead_generation',
  channel: 'instagram',
  format: 'carousel',
  targetPersona: 'HNW IT Executives & Silicon Valley NRI Investors',
  language: 'en',
  tone: 'professional',
  includeBrandKit: true,
  signatureCta: 'DM "SKYVILLAS" for verified price sheets & private site visit.',
};

export const DEFAULT_FILTER_STATE: ContentFilterState = {
  search: '',
  channel: 'all',
  format: 'all',
  status: 'all',
  sortBy: 'latest',
  viewMode: 'grid',
  devState: 'default',
};
