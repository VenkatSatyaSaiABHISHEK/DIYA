'use client';

import { useState } from 'react';
import { authService } from '../services/auth.service';
import type { UserProfile } from '@/types/shared';
import type { LoginCredentials } from '../types';

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const session = await authService.login(credentials);
      setUser(session.user);
      return session;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return { user, loading, login, logout };
}
