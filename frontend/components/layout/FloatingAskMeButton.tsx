'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/store/ui.store';
import { useAIStatusStore } from '@/store/ai-status.store';
import { AIOrb } from '@/components/brand/AIOrb';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const FloatingAskMeButton: React.FC = () => {
  const pathname = usePathname();
  const { toggleAskDiya, askDiyaOpen } = useUIStore();
  const { status } = useAIStatusStore();

  // Hide on Home page as specified: hero input replaces it, or if drawer is already open
  if (askDiyaOpen || pathname === '/' || pathname === '/home' || pathname === '/overview') return null;

  return (
    <aside
      aria-label="Ask DIYA AI Assistant"
      className="hidden md:block fixed bottom-7 right-7 z-40 select-none animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <button
        onClick={toggleAskDiya}
        type="button"
        aria-label="Ask me - DIYA AI Assistant"
        className={cn(
          'group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full',
          'bg-white border border-[#EAEAEA]',
          'shadow-[0_4px_20px_rgba(124,58,237,0.18)]',
          'hover:border-[#7C3AED]/60 hover:shadow-[0_6px_28px_rgba(124,58,237,0.28)]',
          'transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]'
        )}
      >
        {/* Glowing Orb */}
        <div className="relative shrink-0">
          <AIOrb status={status} size="sm" />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>

        {/* Text */}
        <div className="flex items-center gap-1.5 pr-0.5">
          <span className="text-xs font-semibold text-[#111] tracking-tight group-hover:text-[#7C3AED] transition-colors">
            Ask me
          </span>
          <Sparkles className="h-3 w-3 text-[#7C3AED] opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
        </div>
      </button>
    </aside>
  );
};
