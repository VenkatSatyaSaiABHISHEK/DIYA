'use client';

import { create } from 'zustand';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'danger' | 'info';
}

export interface UIState {
  theme: 'light';
  recentChatsOpen: boolean;
  mobileNavOpen: boolean;
  searchOpen: boolean;
  askDiyaOpen: boolean;
  sidebarCollapsed: boolean;
  notificationsCount: number;
  toasts: ToastMessage[];

  setTheme: (theme?: 'light') => void;
  toggleTheme: () => void;
  setRecentChatsOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setAskDiyaOpen: (open: boolean) => void;
  toggleAskDiya: () => void;
  toggleSidebar: () => void;
  addToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  recentChatsOpen: false,
  mobileNavOpen: false,
  searchOpen: false,
  askDiyaOpen: false,
  sidebarCollapsed: false,
  notificationsCount: 3,
  toasts: [],

  setTheme: () => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark');
    }
    set({ theme: 'light' });
  },

  toggleTheme: () => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark');
    }
    set({ theme: 'light' });
  },

  setRecentChatsOpen: (open: boolean) => set({ recentChatsOpen: open }),
  setMobileNavOpen: (open: boolean) => set({ mobileNavOpen: open }),
  setSearchOpen: (open: boolean) => set({ searchOpen: open }),
  setAskDiyaOpen: (open: boolean) => set({ askDiyaOpen: open }),
  toggleAskDiya: () => set((state) => ({ askDiyaOpen: !state.askDiyaOpen })),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  addToast: (message: string, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4500);
  },

  removeToast: (id: string) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
