'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/Sheet';
import { useUIStore } from '@/store/ui.store';
import { useDIYAStore } from '@/features/diya/store/diya.store';
import { MessageSquare, Plus, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const mockChats = [
  { id: '1', title: 'Q3 Luxury Villa Omnichannel Launch', date: 'Today, 10:45 AM', messages: 6 },
  { id: '2', title: 'Meta Ads ROAS & CPL Optimization', date: 'Yesterday, 3:12 PM', messages: 4 },
  { id: '3', title: '30-Day Growth Strategy & Funnel Plan', date: 'Oct 12, 11:20 AM', messages: 8 },
  { id: '4', title: 'Technical Site Audit & Core Web Vitals Fixes', date: 'Oct 08, 4:50 PM', messages: 5 },
  { id: '5', title: 'WhatsApp Inbound Lead Qualification Script', date: 'Oct 04, 2:15 PM', messages: 3 },
];

export const RecentChatsSheet: React.FC = () => {
  const router = useRouter();
  const { recentChatsOpen, setRecentChatsOpen } = useUIStore();

  const handleNewChat = () => {
    useDIYAStore.getState().clearMessages();
    setRecentChatsOpen(false);
    router.push('/');
  };

  const handleLoadRecentChat = (id: string) => {
    useDIYAStore.getState().loadDemoSession();
    setRecentChatsOpen(false);
    router.push('/');
  };

  return (
    <Sheet open={recentChatsOpen} onOpenChange={setRecentChatsOpen}>
      <SheetContent side="right" className="w-full max-w-[360px] p-5 flex flex-col justify-between bg-white border-l border-[#EAEAEA]">
        <div className="space-y-4">
          <SheetHeader className="text-left pb-3 border-b border-[#EAEAEA]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#7C3AED]" />
                <SheetTitle className="text-sm font-bold text-[#111]">
                  Recent DIYA Sessions
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>

          <Button
            size="sm"
            variant="outline"
            onClick={handleNewChat}
            className="w-full text-xs h-8 justify-center gap-1.5"
          >
            <Plus className="h-3.5 w-3.5 text-[#7C3AED]" />
            <span>New Chat Session</span>
          </Button>

          <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-14rem)] pr-1">
            {mockChats.map((c) => (
              <button
                key={c.id}
                onClick={() => handleLoadRecentChat(c.id)}
                className="w-full text-left p-3 rounded-lg border border-transparent hover:border-[#EAEAEA] hover:bg-[#FAFAFA] transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium text-[#111] line-clamp-2 group-hover:text-[#7C3AED] transition-colors">
                    {c.title}
                  </p>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-[#888]">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {c.date}
                  </span>
                  <span>{c.messages} replies</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-[#EAEAEA] text-[11px] text-[#888] flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-[#7C3AED]" /> DIYA 2.4 Autonomous
          </span>
          <span>Workspace Memory</span>
        </div>
      </SheetContent>
    </Sheet>
  );
};
