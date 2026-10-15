'use client';

import React from 'react';
import { VercelNavbar } from './VercelNavbar';
import { MobileNav } from './MobileNav';
import { RecentChatsSheet } from './RecentChatsSheet';
import { CommandSearchDialog } from './CommandSearchDialog';
import { FloatingAskMeButton } from './FloatingAskMeButton';
import { AskDiyaDrawer } from './AskDiyaDrawer';
import { Toaster } from '@/components/ui/Sonner';
import { ToastContainer } from '@/components/ui/Toast';
import { useUIStore } from '@/store/ui.store';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

export interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const { searchOpen, setSearchOpen } = useUIStore();
  const isHome = pathname === '/';

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#000000] text-[#111111] dark:text-[#EDEDED] transition-colors selection:bg-[#EDE9FE] selection:text-[#6D28D9]">
      {/* Vercel-Style Top Navigation Bar (Logo, Workspace Switcher, Tabs with Purple Underline) */}
      <VercelNavbar />

      {/* Centered Main Content Area */}
      <main
        className={cn(
          'w-full max-w-[1720px] mx-auto',
          isHome
            ? 'px-3 sm:px-6 lg:px-8 xl:px-10 py-2.5 sm:py-3 lg:h-[calc(100dvh-86px)] lg:max-h-[calc(100dvh-86px)] lg:overflow-hidden flex flex-col'
            : 'px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 pb-16'
        )}
      >
        {children}
      </main>

      {/* Floating AI Orb "Ask me" button in the lower right */}
      <FloatingAskMeButton />

      {/* Slide-over AI Assistant Drawer */}
      <AskDiyaDrawer />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav />

      {/* Global Slide-over Recent Chats Sheet */}
      <RecentChatsSheet />

      {/* Global Cmd+K Search Dialog */}
      <CommandSearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Toast Notifications */}
      <Toaster position="bottom-right" richColors />
      <ToastContainer />
    </div>
  );
};
