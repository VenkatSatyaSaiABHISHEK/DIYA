'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Sparkles,
  Building,
  Check,
  LogOut,
  Settings,
  Home,
  Megaphone,
  FileText,
  Globe,
  Users,
  BarChart3,
  Zap,
  Target,
} from 'lucide-react';
import { AIOrb } from '@/components/brand/AIOrb';
import { DemoBadge } from '@/components/ui/DemoBadge';
import { useUIStore } from '@/store/ui.store';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';
import { cn } from '@/lib/utils/cn';

const navTabs = [
  { id: 'home', label: 'Home', href: '/', icon: Home },
  { id: 'campaigns', label: 'Campaigns', href: '/campaigns', icon: Megaphone, badge: 'Live' },
  { id: 'content', label: 'Content', href: '/content', icon: FileText },
  { id: 'seo', label: 'SEO', href: '/seo', icon: Globe },
  { id: 'leads', label: 'Leads', href: '/leads', icon: Users },
  { id: 'analytics', label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { id: 'automations', label: 'Automations', href: '/automations', icon: Zap },
  { id: 'strategy', label: 'Strategy', href: '/strategy', icon: Target },
  { id: 'settings', label: 'Settings', href: '/settings/general', icon: Settings },
];

const mockNotifications = [
  {
    id: '1',
    title: 'Meta Ads Flight Active',
    description: 'Sky Villas Q3 campaign is pacing at 100% with ₹14.20 CPC.',
    time: '12m ago',
    type: 'info' as const,
  },
  {
    id: '2',
    title: '3 VIP Inbound Leads Qualified',
    description: 'DIYA verified luxury villa prospects in Financial District.',
    time: '1h ago',
    type: 'success' as const,
  },
  {
    id: '3',
    title: 'SEO Audit Suggestion',
    description: '2 missing meta descriptions identified on landing pages.',
    time: '3h ago',
    type: 'warning' as const,
  },
];

export const VercelNavbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    setSearchOpen,
    setRecentChatsOpen,
    notificationsCount,
  } = useUIStore();

  const isTabActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/home' || pathname === '/overview';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#EAEAEA] shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-colors select-none">
      {/* 1. Top Bar Row: Logo, Workspace Switcher, Search, Chats, Notifications, Profile */}
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 h-13 sm:h-14 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: DIYA Logo + Workspace Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <AIOrb status="running" size="sm" />
            <span className="font-bold text-sm tracking-tight text-[#111]">
              DIYA <span className="text-[#7C3AED]">AI</span>
            </span>
          </Link>

          <span className="text-[#D4D4D8] text-sm">/</span>

          {/* Vercel Workspace Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 rounded-md text-xs font-medium text-[#111] hover:bg-[#F5F5F5] transition-colors border border-transparent hover:border-[#EAEAEA]"
              >
                <div className="h-4.5 w-4.5 rounded bg-[#7C3AED] flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                  M
                </div>
                <span className="truncate max-w-[85px] xs:max-w-[120px] sm:max-w-none">Mentneo Realty</span>
                <span className="hidden xs:inline-block text-[10px] bg-[#EDE9FE] text-[#7C3AED] px-1.5 py-0.2 rounded font-semibold">
                  Growth
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-[#888] shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel className="text-xs text-[#888] font-normal">
                Workspaces
              </DropdownMenuLabel>
              <DropdownMenuItem className="flex items-center justify-between font-semibold">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-[#7C3AED] text-white flex items-center justify-center text-[9px]">
                    M
                  </div>
                  <span>Mentneo Realty</span>
                </div>
                <Check className="h-3.5 w-3.5 text-[#7C3AED]" />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/settings/general')}>
                <Building className="h-3.5 w-3.5 mr-2 text-[#888]" />
                <span>Workspace Settings</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right: Search, Recent Chats, Demo Badge, Notifications, Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            type="button"
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-md border border-[#EAEAEA] bg-[#FAFAFA] text-xs text-[#888] hover:text-[#111] hover:border-[#D4D4D8] transition-all"
            title="Search workspace (Cmd+K)"
          >
            <Search className="h-3.5 w-3.5 text-[#888]" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden md:inline-flex items-center rounded bg-white px-1.5 py-0.2 text-[10px] font-mono border border-[#EAEAEA]">
              ⌘K
            </kbd>
          </button>

          {/* Recent Chats Button */}
          <button
            onClick={() => setRecentChatsOpen(true)}
            type="button"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#EAEAEA] bg-white text-xs font-medium text-[#666] hover:text-[#111] hover:border-[#D4D4D8] transition-colors"
            title="View recent chat sessions"
          >
            <MessageSquare className="h-3.5 w-3.5 text-[#7C3AED]" />
            <span className="hidden md:inline">Recent chats</span>
          </button>

          {/* Demo Data Pill (Desktop) */}
          <div className="hidden md:inline-flex">
            <DemoBadge />
          </div>

          {/* Notifications Popover */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="relative p-2 rounded-md text-[#666] hover:text-[#111] hover:bg-[#F5F5F5] transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                {notificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#7C3AED] ring-2 ring-white" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0 shadow-lg">
              <div className="px-3.5 py-2.5 border-b border-[#EAEAEA] flex items-center justify-between">
                <span className="text-xs font-bold text-[#111]">
                  Attention Feed
                </span>
                <span className="text-[10px] text-[#888]">3 new alerts</span>
              </div>
              <div className="divide-y divide-[#EAEAEA] max-h-64 overflow-y-auto">
                {mockNotifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-[#FAFAFA] transition-colors cursor-pointer">
                    <p className="text-xs font-semibold text-[#111]">{n.title}</p>
                    <p className="text-[11px] text-[#666] mt-0.5 leading-snug">{n.description}</p>
                    <span className="text-[10px] text-[#AAA] mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Menu (Theme switch removed) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="h-7 w-7 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-xs font-bold ring-2 ring-transparent hover:ring-[#7C3AED]/40 transition-all shrink-0"
                aria-label="User menu"
              >
                M
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <p className="text-xs font-semibold text-[#111]">Mentneo Realty</p>
                <p className="text-[11px] text-[#888]">admin@mentneo.com</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => router.push('/settings/general')}>
                <Settings className="h-4 w-4 mr-2 text-[#888]" />
                <span>Workspace Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/settings/billing')}>
                <Sparkles className="h-4 w-4 mr-2 text-[#7C3AED]" />
                <span>Growth Plan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/login')} className="text-red-600 focus:text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 2. Bottom Row: Segmented Capsule Tabs with Glowing Active Highlight */}
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 border-t border-[#EAEAEA]/70 relative">
        <nav className="flex items-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 overflow-x-auto no-scrollbar font-sans scroll-smooth touch-pan-x" aria-label="Main Navigation Tabs">
          {navTabs.map((tab) => {
            const active = isTabActive(tab.href);
            const Icon = tab.icon;

            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={cn(
                  'group relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all duration-200 select-none shrink-0',
                  active
                    ? 'bg-[#EDE9FE] text-[#7C3AED] font-bold shadow-2xs border border-[#DDD6FE]'
                    : 'text-[#666] font-medium hover:text-[#111] hover:bg-[#F4F4F6] border border-transparent'
                )}
              >
                {/* Tab Icon */}
                <Icon
                  className={cn(
                    'h-3.5 w-3.5 transition-colors',
                    active
                      ? 'text-[#7C3AED]'
                      : 'text-[#888] group-hover:text-[#111]'
                  )}
                />

                {/* Tab Label */}
                <span className="tracking-tight">{tab.label}</span>

                {/* Micro Badge for Live Campaigns */}
                {tab.badge && (
                  <span
                    className={cn(
                      'text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider',
                      active
                        ? 'bg-[#7C3AED] text-white'
                        : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                    )}
                  >
                    {tab.badge}
                  </span>
                )}

                {/* Glowing Purple Micro Beam on Active Tab */}
                {active && (
                  <span className="absolute -bottom-[7px] sm:-bottom-[9px] left-1/2 -translate-x-1/2 h-[2px] w-5 bg-[#7C3AED] rounded-full shadow-[0_0_8px_#7C3AED]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
