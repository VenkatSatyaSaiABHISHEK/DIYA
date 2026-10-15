'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building,
  Sparkles,
  ShieldCheck,
  Users,
  CreditCard,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const settingsNav = [
  { label: 'General', href: '/settings/general', icon: Building },
  { label: 'Brand Knowledge', href: '/settings/brand', icon: Sparkles },
  { label: 'Integrations', href: '/settings/integrations', icon: ShieldCheck },
  { label: 'Team & Seats', href: '/settings/team', icon: Users },
  { label: 'Billing & Plans', href: '/settings/billing', icon: CreditCard },
  { label: 'Activity Log', href: '/settings/activity', icon: Clock },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#EAEAEA] dark:border-[#333]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111] dark:text-[#EDEDED] tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-[#666] dark:text-[#888] mt-1">
          Manage workspace settings, brand knowledge, ad network integrations, and billing.
        </p>
      </div>

      {/* 2-Column Vercel Settings Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Settings Navigation Menu */}
        <nav className="md:col-span-3 flex md:flex-col gap-1 overflow-x-auto no-scrollbar pb-2 md:pb-0" aria-label="Settings Navigation">
          {settingsNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap',
                  isActive
                    ? 'bg-[#EDE9FE] dark:bg-[#2E1065] text-[#7C3AED] font-semibold'
                    : 'text-[#666] dark:text-[#888] hover:text-[#111] dark:hover:text-[#EDEDED] hover:bg-[#F5F5F5] dark:hover:bg-[#141414]'
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-[#7C3AED]' : 'text-[#888]')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Settings Content */}
        <div className="md:col-span-9">
          {children}
        </div>
      </div>
    </div>
  );
}
