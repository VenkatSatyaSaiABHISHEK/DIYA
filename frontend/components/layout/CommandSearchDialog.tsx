'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/Command';
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
  Plus,
  Calendar,
  Sparkles,
  ShieldCheck,
  Search,
} from 'lucide-react';

interface CommandSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CommandSearchDialog: React.FC<CommandSearchDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const router = useRouter();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search workspace..." />
      <CommandList>
        <CommandEmpty>No matching pages or actions found.</CommandEmpty>

        {/* Primary Pages */}
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push('/'))}>
            <MessageSquare className="h-4 w-4 mr-2 text-[#7C3AED]" />
            <span>DIYA Chat (Home)</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/campaigns'))}>
            <Megaphone className="h-4 w-4 mr-2 text-[#7C3AED]" />
            <span>All Campaigns</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/content'))}>
            <FileText className="h-4 w-4 mr-2 text-[#7C3AED]" />
            <span>Content & Creatives</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/seo'))}>
            <Globe className="h-4 w-4 mr-2 text-[#7C3AED]" />
            <span>SEO & Website</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/leads'))}>
            <Users className="h-4 w-4 mr-2 text-[#7C3AED]" />
            <span>Leads & CRM Directory</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/analytics'))}>
            <BarChart3 className="h-4 w-4 mr-2 text-[#7C3AED]" />
            <span>Analytics & Attribution</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/strategy'))}>
            <Target className="h-4 w-4 mr-2 text-[#7C3AED]" />
            <span>30-Day Marketing Strategy</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/automations'))}>
            <Zap className="h-4 w-4 mr-2 text-[#7C3AED]" />
            <span>Autonomous Automations</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/settings/general'))}>
            <Settings className="h-4 w-4 mr-2 text-[#7C3AED]" />
            <span>Settings & Preferences</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Direct Sub-Routes */}
        <CommandGroup heading="Workflows & Tools">
          <CommandItem onSelect={() => runCommand(() => router.push('/campaigns/new'))}>
            <Plus className="h-4 w-4 mr-2 text-emerald-600" />
            <span>Launch New Campaign (Wizard)</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/campaigns/studio'))}>
            <Sparkles className="h-4 w-4 mr-2 text-pink-600" />
            <span>Ad Studio (Creative Canvas)</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/content/calendar'))}>
            <Calendar className="h-4 w-4 mr-2 text-blue-600" />
            <span>Publishing Calendar</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/content/new'))}>
            <Plus className="h-4 w-4 mr-2 text-purple-600" />
            <span>AI Content Studio (Carousels & Reels)</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/seo/keywords'))}>
            <Search className="h-4 w-4 mr-2 text-amber-600" />
            <span>Tracked Keyword Rankings</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/seo/fixes'))}>
            <ShieldCheck className="h-4 w-4 mr-2 text-red-600" />
            <span>Technical Site Audit & Fixes</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/leads/pipeline'))}>
            <Users className="h-4 w-4 mr-2 text-indigo-600" />
            <span>Kanban Deal Pipeline</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/settings/integrations'))}>
            <ShieldCheck className="h-4 w-4 mr-2 text-zinc-600" />
            <span>Connected Ad Accounts & CRMs</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
