'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  MessageSquare,
  Megaphone,
  FileText,
  Globe,
  Users,
  BarChart3,
  Target,
  Zap,
  Settings,
  Menu,
  Plus,
  Home,
  Sparkles,
  Search,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  LogOut,
} from 'lucide-react';
import { useUIStore } from '@/store/ui.store';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/Sheet';
import { AIOrb } from '@/components/brand/AIOrb';
import { AIStatus } from './AIStatus';
import { useAIStatusStore } from '@/store/ai-status.store';
import { cn } from '@/lib/utils/cn';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { mobileNavOpen, setMobileNavOpen, toggleAskDiya, setSearchOpen } = useUIStore();
  const { status, statusLabel } = useAIStatusStore();

  const isHomeActive = pathname === '/' || pathname === '/home' || pathname === '/overview';

  const fullMenuItems = [
    { label: 'Home Dashboard', href: '/', icon: Home },
    { label: 'DIYA AI Chat', href: '/chat', icon: MessageSquare },
    { label: 'Campaigns', href: '/campaigns', icon: Megaphone, badge: 'Live' },
    { label: 'Content & Creatives', href: '/content', icon: FileText },
    { label: 'SEO & Website', href: '/seo', icon: Globe },
    { label: 'Leads & CRM', href: '/leads', icon: Users },
    { label: 'Analytics & Attribution', href: '/analytics', icon: BarChart3 },
    { label: '30-Day Marketing Strategy', href: '/strategy', icon: Target },
    { label: 'Automations', href: '/automations', icon: Zap },
  ];

  const settingsItems = [
    { label: 'Workspace Settings', href: '/settings/general', icon: Settings },
    { label: 'Integrations & Ad Accounts', href: '/settings/integrations', icon: ShieldCheck },
    { label: 'Billing & Plan', href: '/settings/billing', icon: CreditCard },
  ];

  return (
    <>
      {/* Mobile Bottom Dock Navigation Bar */}
      <nav
        aria-label="Mobile Bottom Bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-[68px] pb-[max(0.35rem,env(safe-area-inset-bottom,0px))] bg-white/95 backdrop-blur-md border-t border-[#EAEAEA] shadow-[0_-4px_24px_rgba(124,58,237,0.06)] px-2 flex items-center justify-around select-none"
      >
        {/* 1. Home */}
        <Link
          href="/"
          className={cn(
            'flex flex-col items-center justify-center gap-1 w-14 py-1 rounded-xl transition-all active:scale-95',
            isHomeActive
              ? 'text-[#7C3AED] font-bold'
              : 'text-[#71717A] hover:text-[#18181B]'
          )}
        >
          <div className={cn(
            'p-1 rounded-lg transition-colors',
            isHomeActive ? 'bg-[#EDE9FE]' : 'bg-transparent'
          )}>
            <Home className="h-4.5 w-4.5" />
          </div>
          <span className="text-[10px] tracking-tight">Home</span>
        </Link>

        {/* 2. Campaigns */}
        <Link
          href="/campaigns"
          className={cn(
            'flex flex-col items-center justify-center gap-1 w-14 py-1 rounded-xl transition-all active:scale-95 relative',
            pathname.startsWith('/campaigns')
              ? 'text-[#7C3AED] font-bold'
              : 'text-[#71717A] hover:text-[#18181B]'
          )}
        >
          <div className={cn(
            'p-1 rounded-lg transition-colors relative',
            pathname.startsWith('/campaigns') ? 'bg-[#EDE9FE]' : 'bg-transparent'
          )}>
            <Megaphone className="h-4.5 w-4.5" />
            <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="text-[10px] tracking-tight">Ads</span>
        </Link>

        {/* 3. Center Elevated Action Button: Ask DIYA AI */}
        <button
          onClick={toggleAskDiya}
          type="button"
          aria-label="Ask DIYA AI Assistant"
          className="flex flex-col items-center justify-center -mt-5 group focus:outline-none"
        >
          <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA] shadow-[0_4px_18px_rgba(124,58,237,0.45)] ring-4 ring-white group-active:scale-95 transition-all">
            <AIOrb status={status} size={30} interactive={false} />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
          </div>
          <span className="text-[10px] font-bold text-[#7C3AED] tracking-tight mt-1">
            Ask DIYA
          </span>
        </button>

        {/* 4. Content */}
        <Link
          href="/content"
          className={cn(
            'flex flex-col items-center justify-center gap-1 w-14 py-1 rounded-xl transition-all active:scale-95',
            pathname.startsWith('/content')
              ? 'text-[#7C3AED] font-bold'
              : 'text-[#71717A] hover:text-[#18181B]'
          )}
        >
          <div className={cn(
            'p-1 rounded-lg transition-colors',
            pathname.startsWith('/content') ? 'bg-[#EDE9FE]' : 'bg-transparent'
          )}>
            <FileText className="h-4.5 w-4.5" />
          </div>
          <span className="text-[10px] tracking-tight">Content</span>
        </Link>

        {/* 5. More Menu Trigger */}
        <button
          onClick={() => setMobileNavOpen(true)}
          type="button"
          className="flex flex-col items-center justify-center gap-1 w-14 py-1 rounded-xl text-[#71717A] hover:text-[#18181B] active:scale-95 transition-all"
          aria-label="Open menu"
        >
          <div className="p-1 rounded-lg">
            <Menu className="h-4.5 w-4.5" />
          </div>
          <span className="text-[10px] tracking-tight">More</span>
        </button>
      </nav>

      {/* Mobile Slide-over Sheet Menu */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-[300px] p-0 flex flex-col justify-between bg-white border-r border-[#EAEAEA]">
          {/* Header */}
          <div className="p-5 border-b border-[#EAEAEA]">
            <SheetHeader className="text-left pb-0 border-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <AIOrb status="running" size="sm" />
                  <div>
                    <SheetTitle className="text-base font-bold text-[#111] leading-none">
                      DIYA <span className="text-[#7C3AED]">AI</span>
                    </SheetTitle>
                    <span className="text-[11px] text-[#71717A] mt-1 block">
                      Mentneo Realty • Growth Plan
                    </span>
                  </div>
                </div>
              </div>
            </SheetHeader>

            {/* Quick Search inside Drawer */}
            <button
              onClick={() => {
                setMobileNavOpen(false);
                setSearchOpen(true);
              }}
              type="button"
              className="mt-4 w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#FAFAFC] border border-[#EAEAEA] text-xs text-[#888] hover:text-[#111] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5" />
                <span>Search workspace...</span>
              </div>
              <kbd className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-[#EAEAEA]">⌘K</kbd>
            </button>
          </div>

          {/* Nav List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileNavOpen(false);
                  router.push('/chat');
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] shadow-2xs transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Chat</span>
              </button>

              <button
                onClick={() => {
                  setMobileNavOpen(false);
                  router.push('/campaigns/new');
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#EDE9FE] text-[#7C3AED] text-xs font-semibold hover:bg-[#DDD6FE] transition-colors border border-[#DDD6FE]"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>New Ad</span>
              </button>
            </div>

            {/* Workspaces Group */}
            <div>
              <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider block mb-2 px-2">
                Core Workspaces
              </span>
              <nav className="flex flex-col gap-0.5">
                {fullMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.href === '/' ? isHomeActive : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={cn(
                        'flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors',
                        isActive
                          ? 'bg-[#EDE9FE] text-[#7C3AED] font-bold shadow-2xs'
                          : 'text-[#52525B] hover:bg-[#F4F4F6] hover:text-[#18181B]'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-[#7C3AED]' : 'text-[#888]')} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase bg-emerald-50 text-emerald-600 border border-emerald-200">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Settings Group */}
            <div>
              <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider block mb-2 px-2">
                Settings &amp; Management
              </span>
              <nav className="flex flex-col gap-0.5">
                {settingsItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors',
                        isActive
                          ? 'bg-[#EDE9FE] text-[#7C3AED] font-bold shadow-2xs'
                          : 'text-[#52525B] hover:bg-[#F4F4F6] hover:text-[#18181B]'
                      )}
                    >
                      <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-[#7C3AED]' : 'text-[#888]')} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#EAEAEA] bg-[#FAFAFC] flex items-center justify-between">
            <AIStatus compact />
            <button
              onClick={() => {
                setMobileNavOpen(false);
                router.push('/login');
              }}
              className="text-xs text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
