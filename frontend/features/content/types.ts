export type ContentChannel = 'instagram' | 'linkedin' | 'facebook' | 'twitter' | 'youtube';

export type ContentFormat = 'carousel' | 'reel_script' | 'single_image' | 'article' | 'ad_copy';

export type ContentStatus = 'draft' | 'needs_approval' | 'approved' | 'scheduled' | 'published';

export type ContentLanguage = 'en' | 'te' | 'hi';

export type ContentTone = 'bold' | 'professional' | 'storytelling' | 'urgent' | 'educational';

export interface CarouselSlide {
  slideNumber: number;
  title: string;
  body: string;
  visualPrompt?: string;
  bulletPoints?: string[];
}

export interface ReelScriptScene {
  timecode: string; // e.g. "0-3s"
  phase: 'Hook' | 'Story & Context' | 'Value & Proof' | 'Call to Action';
  spokenAudio: string;
  visualCue: string;
  bRollSuggestion?: string;
}

export interface ContentPost {
  id: string;
  title: string;
  channel: ContentChannel;
  format: ContentFormat;
  status: ContentStatus;
  caption: string;
  hashtags: string[];
  scheduledFor?: string; // ISO 8601
  publishedAt?: string;
  predictedScore: number; // 0 - 100
  estimatedImpressions: number;
  carouselSlides?: CarouselSlide[];
  reelScript?: ReelScriptScene[];
  targetAudience?: string;
  createdAt: string;
  updatedAt: string;
  author: 'DIYA AI' | 'Marketing Manager';
}

export interface GeneratorBrief {
  topic: string;
  objective: 'lead_generation' | 'thought_leadership' | 'brand_awareness' | 'festive_event';
  channel: ContentChannel;
  format: ContentFormat;
  targetPersona: string;
  language: ContentLanguage;
  tone: ContentTone;
  includeBrandKit: boolean;
  signatureCta?: string;
}

export interface HookTemplate {
  id: string;
  category: 'negative_hook' | 'curiosity_gap' | 'data_driven' | 'contrarian' | 'social_proof';
  hookText: string;
  framework: string;
  performanceScore: number; // 0 - 100
  recommendedFormats: ContentFormat[];
}

export interface ContentFilterState {
  search: string;
  channel: ContentChannel | 'all';
  format: ContentFormat | 'all';
  status: ContentStatus | 'all';
  sortBy: 'latest' | 'score' | 'scheduled';
  viewMode: 'grid' | 'table';
  devState: 'default' | 'loading' | 'empty' | 'error';
}

export interface ReschedulePayload {
  postId: string;
  newDate: string;
}

export interface ApprovePostPayload {
  postId: string;
  approverNotes?: string;
}
