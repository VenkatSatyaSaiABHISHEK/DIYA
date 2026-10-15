/**
 * Shared TypeScript definitions across the DIYA AI platform.
 */

export type AIWorkStatus =
  | 'idle'
  | 'analyzing'
  | 'planning'
  | 'creating'
  | 'optimizing'
  | 'running'
  | 'awaiting_approval';

export type AdPlatform =
  | 'meta'
  | 'google'
  | 'instagram'
  | 'linkedin'
  | 'twitter'
  | 'youtube';

export type CampaignStatus =
  | 'recommendation'
  | 'draft'
  | 'approved'
  | 'live'
  | 'paused';

export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    timestamp: string;
    requestId: string;
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown> | Array<{ field: string; message: string }>;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  businessName: string;
  avatarUrl?: string;
  role: 'owner' | 'marketer' | 'viewer';
}
