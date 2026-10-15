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
  LayoutDashboard,
  Home,
} from 'lucide-react';
import { useUIStore } from '@/store/ui.store';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/Sheet';
import { AIOrb } from '@/components/brand/AIOrb';
import { AIStatus } from './AIStatus';
import { cn } from '@/lib/utils/cn';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { mobileNavOpen, setMobileNavOpen } = useUIStore();

  const isHomeActive = pathname === '/' || pathname === '/home' || pathname === '/overview';

  const bottomItems = [
    { label: 'Home', href: '/', icon: Home, active: isHomeActive },
    { label: 'Campaigns', href: '/campaigns', icon: Megaphone, active: pathname.startsWith('/campaigns') },
    { label: 'Content', href: '/content', icon: FileText, active: pathname.startsWith('/content') },
    { label: 'Leads', href: '/leads', icon: Users, active: pathname.startsWith('/leads') },
  ];

  const fullMenuItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'DIYA Chat', href: '/chat', icon: MessageSquare },
    { label: 'Campaigns', href: '/campaigns', icon: Megaphone },
    { label: 'Content & Creatives', href: '/content', icon: FileText },
    { label: 'SEO & Website', href: '/seo', icon: Globe },
    { label: 'Leads & CRM', href: '/leads', icon: Users },
    { label: 'Analytics & Reports', href: '/analytics', icon: BarChart3 },
    { label: '30-Day Strategy', href: '/strategy', icon: Target },
    { label: 'Automations', href: '/automations', icon: Zap },
    { label: 'Settings', href: '/settings/general', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Bottom Bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xs border-t border-[#EAEAEA] dark:border-[#333] px-4 flex items-center justify-around select-none"
      >
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors',
                item.active ? 'text-[#7C3AED] font-semibold' : 'text-[#666] dark:text-[#888]'
              )}
            >
              <Icon className="h-4.5 w-4.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* More Drawer Trigger */}
        <button
          onClick={() => setMobileNavOpen(true)}
          className="flex flex-col items-center justify-center gap-1 text-[11px] font-medium text-[#666] dark:text-[#888]"
          aria-label="Open menu"
        >
          <Menu className="h-4.5 w-4.5" />
          <span>More</span>
        </button>
      </nav>

      {/* Mobile Sheet Menu */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-[280px] p-5 flex flex-col justify-between bg-white dark:bg-[#0A0A0A] border-r border-[#EAEAEA] dark:border-[#333]">
          <div className="space-y-5">
            <SheetHeader className="text-left pb-2 border-b border-[#EAEAEA] dark:border-[#333]">
              <div className="flex items-center gap-2.5">
                <AIOrb status="running" size="sm" />
                <SheetTitle className="text-base font-bold text-[#111] dark:text-[#EDEDED]">
                  DIYA <span className="text-[#7C3AED]">AI</span>
                </SheetTitle>
              </div>
            </SheetHeader>

            <button
              onClick={() => {
                setMobileNavOpen(false);
                router.push('/');
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>New Chat</span>
            </button>

            <nav className="flex flex-col gap-1">
              {fullMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === '/' ? isHomeActive : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors',
                      isActive
                        ? 'bg-[#EDE9FE] dark:bg-[#2E1065] text-[#7C3AED] font-semibold'
                        : 'text-[#666] dark:text-[#888] hover:bg-[#F5F5F5] dark:hover:bg-[#141414] hover:text-[#111] dark:hover:text-[#EDEDED]'
                    )}
                  >
                    <Icon className={cn('h-4 w-4', isActive ? 'text-[#7C3AED]' : 'text-[#888]')} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-[#EAEAEA] dark:border-[#333] flex items-center justify-between">
            <AIStatus compact />
            <span className="text-[10px] text-[#888]">Mentneo Realty</span>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
