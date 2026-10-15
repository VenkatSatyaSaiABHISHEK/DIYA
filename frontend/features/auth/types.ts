import type { UserProfile } from '@/types/shared';

export interface LoginCredentials {
  email: string;
  password?: string;
  magicToken?: string;
}

export interface AuthSessionResponse {
  token: string;
  user: UserProfile;
}
