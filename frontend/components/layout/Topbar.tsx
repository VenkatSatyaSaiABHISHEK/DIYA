'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  Menu,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { DemoBadge } from '@/components/ui/DemoBadge';
import { AIStatus } from './AIStatus';
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

const routeLabels: Record<string, string> = {
  campaigns: 'Campaigns',
  new: 'New Campaign',
  studio: 'Ad Studio',
  content: 'Content & Creatives',
  calendar: 'Calendar',
  social: 'Social Hub',
  seo: 'SEO & Website',
  keywords: 'Keywords',
  fixes: 'Technical Fixes',
  pages: 'SERP & Meta',
  leads: 'Leads & CRM',
  pipeline: 'Pipeline',
  funnel: 'Funnel Telemetry',
  sync: 'CRM Sync',
  audiences: 'Audiences',
  analytics: 'Analytics & Attribution',
  reports: 'Reports',
  channels: 'Channels',
  settings: 'Settings',
  general: 'General',
  brand: 'Brand Knowledge',
  integrations: 'Integrations',
  team: 'Team & Seats',
  billing: 'Billing & Plans',
  activity: 'Activity Log',
  strategy: 'Marketing Strategy',
  automations: 'Automations',
};

const mockNotifications = [
  {
    id: '1',
    title: 'Meta Ads Budget Pacing',
    description: 'Sky Villas Campaign is pacing at 100% with ₹14.20 cost per click.',
    time: '12m ago',
    type: 'info' as const,
  },
  {
    id: '2',
    title: '3 VIP Inbound Leads',
    description: 'DIYA qualified high-intent buyers for Financial District villas.',
    time: '1h ago',
    type: 'success' as const,
  },
  {
    id: '3',
    title: 'SEO Audit Action Recommended',
    description: '2 missing meta descriptions detected on landing pages.',
    time: '3h ago',
    type: 'warning' as const,
  },
];

export const Topbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { notificationsCount, setMobileNavOpen, setSearchOpen } = useUIStore();

  // Generate breadcrumbs from pathname
  const segments = pathname.split('/').filter(Boolean);

  const getBreadcrumbs = () => {
    if (segments.length === 0 || (segments.length === 1 && segments[0] === 'home')) {
      return [{ label: 'DIYA Chat', href: '/', isLast: true }];
    }

    return segments.map((seg, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const label = routeLabels[seg] || seg.charAt(0).toUpperCase() + seg.slice(1);
      const isLast = index === segments.length - 1;
      return { label, href, isLast };
    });
  };

  const breadcrumbs = getBreadcrumbs();
  const showBackLink = segments.length > 1;

  return (
    <header
      role="banner"
      className={cn(
        'sticky top-0 z-20 h-14 w-full bg-white/95 backdrop-blur-xs border-b border-[#E4E4E7]',
        'px-4 sm:px-6 md:px-8 flex items-center justify-between transition-all select-none'
      )}
    >
      {/* Left: Mobile hamburger + Breadcrumbs / Back button */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={() => setMobileNavOpen(true)}
          className="md:hidden p-1.5 rounded-lg text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F6]"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Back Link on Inner Sub-routes */}
        {showBackLink && (
          <button
            onClick={() => router.back()}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-[#71717A] hover:text-[#18181B] pr-2 border-r border-[#E4E4E7] transition-colors"
            title="Go back"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </button>
        )}

        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs truncate">
          <Link
            href="/"
            className="text-[#71717A] hover:text-[#18181B] transition-colors truncate"
          >
            DIYA
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.href + idx}>
              <ChevronRight className="h-3 w-3 text-[#A1A1AA] shrink-0" />
              {crumb.isLast ? (
                <span className="font-semibold text-[#18181B] truncate">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-[#71717A] hover:text-[#18181B] transition-colors truncate"
                >
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Search trigger (Cmd/Ctrl+K) */}
        <button
          onClick={() => setSearchOpen(true)}
          type="button"
          aria-label="Search"
          className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg border border-[#E4E4E7] bg-[#FAFAFC] text-xs text-[#71717A] hover:bg-white hover:border-[#D4D4D8] transition-all"
        >
          <Search className="h-3.5 w-3.5 text-[#A1A1AA]" />
          <span>Search...</span>
          <kbd className="inline-flex items-center rounded bg-white px-1 py-0.2 text-[10px] font-mono text-[#71717A] border border-[#E4E4E7]">
            ⌘K
          </kbd>
        </button>

        {/* AI Status Indicator */}
        <AIStatus compact className="hidden sm:inline-flex" />

        {/* Demo Data indicator badge (small pill in topbar) */}
        <DemoBadge />

        {/* Attention Notifications Popover */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Attention notifications"
              className="relative p-2 rounded-lg text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F6] transition-colors"
            >
              <Bell className="h-4 w-4" />
              {notificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-[#7C3AED]" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 shadow-lg">
            <div className="px-4 py-3 border-b border-[#E4E4E7] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#7C3AED]" />
                <span className="text-xs font-bold text-[#18181B]">DIYA Attention Feed</span>
              </div>
              <span className="text-[10px] text-[#71717A] bg-[#F4F4F6] px-2 py-0.5 rounded-full font-medium">
                3 active
              </span>
            </div>
            <div className="divide-y divide-[#F4F4F6] max-h-72 overflow-y-auto">
              {mockNotifications.map((n) => (
                <div key={n.id} className="p-3 hover:bg-[#FAFAFC] transition-colors cursor-pointer">
                  <div className="flex items-start gap-2.5">
                    {n.type === 'success' && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    )}
                    {n.type === 'warning' && (
                      <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    )}
                    {n.type === 'info' && (
                      <Info className="h-4 w-4 text-[#7C3AED] shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-[#18181B]">{n.title}</p>
                        <span className="text-[10px] text-[#A1A1AA]">{n.time}</span>
                      </div>
                      <p className="text-xs text-[#71717A] mt-0.5 leading-snug line-clamp-2">
                        {n.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
