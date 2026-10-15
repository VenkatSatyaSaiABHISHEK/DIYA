import type { AuthSessionResponse } from './types';

export const mockAuthSession: AuthSessionResponse = {
  token: 'mock_jwt_token_diya_mentneo',
  user: {
    id: 'user_1',
    name: 'Mentneo Administrator',
    email: 'admin@mentneo.ai',
    businessName: 'Mentneo Technologies',
    role: 'owner',
  },
};
