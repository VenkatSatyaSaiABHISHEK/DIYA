'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  MessageSquare,
  Plus,
  Search,
  Megaphone,
  FileText,
  Globe,
  Users,
  BarChart3,
  Target,
  Zap,
  Settings,
  ChevronDown,
  LogOut,
  Building,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { AIOrb } from '@/components/brand/AIOrb';
import { useUIStore } from '@/store/ui.store';
import { useDIYAStore } from '@/features/diya/store/diya.store';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';
import { cn } from '@/lib/utils/cn';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainNavItems: NavItem[] = [
  { id: 'campaigns', label: 'Campaigns', href: '/campaigns', icon: Megaphone },
  { id: 'content', label: 'Content', href: '/content', icon: FileText },
  { id: 'seo', label: 'SEO & Website', href: '/seo', icon: Globe },
  { id: 'leads', label: 'Leads', href: '/leads', icon: Users },
  { id: 'analytics', label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { id: 'strategy', label: 'Strategy', href: '/strategy', icon: Target },
  { id: 'automations', label: 'Automations', href: '/automations', icon: Zap },
];

const mockRecentChats = [
  { id: '1', title: 'Q3 Sky Villa Campaign', date: 'Today' },
  { id: '2', title: 'Meta Ads ROAS audit', date: 'Yesterday' },
  { id: '3', title: '30-Day Growth Strategy', date: 'Oct 12' },
  { id: '4', title: 'Luxury Real Estate SEO fixes', date: 'Oct 08' },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarCollapsed, toggleSidebar, setSearchOpen } = useUIStore();

  const isChatActive = pathname === '/' || pathname === '/home';

  const handleNewChat = () => {
    router.push('/');
  };

  return (
    <aside
      aria-label="Main Navigation"
      className={cn(
        'hidden md:flex fixed top-0 bottom-0 left-0 z-30 flex-col justify-between',
        'bg-white border-r border-[#E4E4E7] transition-all duration-300 select-none shadow-[1px_0_4px_rgba(0,0,0,0.02)]',
        sidebarCollapsed ? 'w-[72px] px-2.5 py-4' : 'w-[260px] px-3.5 py-4'
      )}
    >
      {/* Top Section */}
      <div className="flex flex-col gap-3 min-h-0">
        {/* Brand header & collapse toggle */}
        <div className="flex items-center justify-between px-1 h-9">
          {!sidebarCollapsed ? (
            <Link href="/" className="flex items-center gap-2.5 group">
              <AIOrb status="running" size="sm" />
              <div className="flex items-center gap-1">
                <span className="text-base font-bold tracking-tight text-[#18181B]">DIYA</span>
                <span className="text-base font-semibold tracking-tight text-[#7C3AED]">AI</span>
              </div>
            </Link>
          ) : (
            <Link href="/" className="mx-auto">
              <AIOrb status="running" size="sm" />
            </Link>
          )}

          <button
            onClick={toggleSidebar}
            type="button"
            className={cn(
              'p-1.5 rounded-lg text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F6] transition-colors',
              sidebarCollapsed && 'mx-auto mt-1'
            )}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Action Buttons: New Chat & Search */}
        <div className="flex flex-col gap-1.5 pt-1">
          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            type="button"
            className={cn(
              'flex items-center gap-2.5 rounded-xl border border-[#E4E4E7] bg-white text-sm font-medium text-[#18181B]',
              'hover:bg-[#F4F4F6] hover:border-[#D4D4D8] transition-all shadow-2xs group',
              sidebarCollapsed ? 'justify-center p-2.5' : 'px-3 py-2'
            )}
            title="Start new DIYA chat"
          >
            <Plus className="h-4 w-4 text-[#7C3AED] shrink-0 group-hover:rotate-90 transition-transform duration-200" />
            {!sidebarCollapsed && (
              <span className="text-xs font-semibold text-[#18181B]">New chat</span>
            )}
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            type="button"
            className={cn(
              'flex items-center justify-between rounded-xl bg-[#F4F4F6]/80 text-[#71717A]',
              'hover:bg-[#F4F4F6] hover:text-[#18181B] transition-all text-xs font-medium',
              sidebarCollapsed ? 'justify-center p-2.5' : 'px-3 py-2'
            )}
            title="Search workspace (Cmd+K)"
          >
            <div className="flex items-center gap-2.5 truncate">
              <Search className="h-3.5 w-3.5 shrink-0 text-[#A1A1AA]" />
              {!sidebarCollapsed && <span className="truncate">Search</span>}
            </div>
            {!sidebarCollapsed && (
              <kbd className="inline-flex items-center rounded bg-white px-1.5 py-0.5 text-[10px] font-mono text-[#71717A] border border-[#E4E4E7] shadow-2xs">
                ⌘K
              </kbd>
            )}
          </button>
        </div>

        {/* Middle Navigation */}
        <nav className="flex flex-col gap-0.5 pt-2" aria-label="Workforce tools">
          {/* Default Chat Item */}
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2.5 rounded-xl text-xs font-medium transition-all select-none',
              sidebarCollapsed ? 'justify-center p-2.5' : 'px-3 py-2',
              isChatActive
                ? 'bg-[#EDE9FE] text-[#6D28D9] font-semibold'
                : 'text-[#52525B] hover:text-[#18181B] hover:bg-[#F4F4F6]'
            )}
            title="DIYA Chat"
          >
            <MessageSquare
              className={cn(
                'h-4 w-4 shrink-0 transition-colors',
                isChatActive ? 'text-[#7C3AED]' : 'text-[#71717A]'
              )}
            />
            {!sidebarCollapsed && <span>DIYA Chat</span>}
          </Link>

          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'flex items-center gap-2.5 rounded-xl text-xs font-medium transition-all select-none',
                  sidebarCollapsed ? 'justify-center p-2.5' : 'px-3 py-2',
                  isActive
                    ? 'bg-[#EDE9FE] text-[#6D28D9] font-semibold'
                    : 'text-[#52525B] hover:text-[#18181B] hover:bg-[#F4F4F6]'
                )}
                title={item.label}
              >
                <Icon
                  className={cn(
                    'h-4 w-4 shrink-0 transition-colors',
                    isActive ? 'text-[#7C3AED]' : 'text-[#71717A]'
                  )}
                />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Recent Chats Section (only when expanded) */}
        {!sidebarCollapsed && (
          <div className="flex-1 overflow-y-auto mt-2 pt-3 border-t border-[#F4F4F6] space-y-1">
            <div className="px-2 text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider">
              Recent chats
            </div>
            <div className="space-y-0.5">
              {mockRecentChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => router.push('/')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-[#52525B] hover:text-[#18181B] hover:bg-[#F4F4F6] transition-colors truncate flex items-center justify-between group"
                >
                  <span className="truncate">{chat.title}</span>
                  <span className="text-[10px] text-[#A1A1AA] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    {chat.date}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section: Settings & Profile Menu */}
      <div className="pt-2 border-t border-[#E4E4E7] flex flex-col gap-1 shrink-0">
        {/* Settings link */}
        <Link
          href="/settings/general"
          className={cn(
            'flex items-center gap-2.5 rounded-xl text-xs font-medium transition-all select-none',
            sidebarCollapsed ? 'justify-center p-2.5' : 'px-3 py-2',
            pathname.startsWith('/settings')
              ? 'bg-[#EDE9FE] text-[#6D28D9] font-semibold'
              : 'text-[#52525B] hover:text-[#18181B] hover:bg-[#F4F4F6]'
          )}
          title="Settings"
        >
          <Settings
            className={cn(
              'h-4 w-4 shrink-0',
              pathname.startsWith('/settings') ? 'text-[#7C3AED]' : 'text-[#71717A]'
            )}
          />
          {!sidebarCollapsed && <span>Settings</span>}
        </Link>

        {/* Profile Menu Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                'flex items-center gap-2 rounded-xl text-left hover:bg-[#F4F4F6] transition-colors',
                sidebarCollapsed ? 'justify-center p-1.5' : 'px-2 py-1.5'
              )}
              aria-label="User profile and workspace"
            >
              <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-2xs">
                M
              </div>
              {!sidebarCollapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#18181B] truncate">Mentneo Realty</p>
                    <p className="text-[10px] text-[#71717A] truncate">Growth Plan</p>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-[#71717A] shrink-0" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56" side="top">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-xs font-semibold leading-none text-[#18181B]">Mentneo Realty</p>
                <p className="text-[11px] leading-none text-[#71717A]">admin@mentneo.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/settings/general')}>
              <Building className="mr-2 h-4 w-4 text-[#71717A]" />
              <span>Workspace Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings/billing')}>
              <Sparkles className="mr-2 h-4 w-4 text-[#7C3AED]" />
              <span>Plan: Growth Tier</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings/team')}>
              <Users className="mr-2 h-4 w-4 text-[#71717A]" />
              <span>Team & Seats</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/login')} className="text-[#EF4444] focus:text-[#EF4444]">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};
