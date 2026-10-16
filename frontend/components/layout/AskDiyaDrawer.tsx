'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUIStore } from '@/store/ui.store';
import { useDIYAStore } from '@/features/diya/store/diya.store';
import { useDiyaChat } from '@/features/diya/hooks/useDiyaChat';
import { Drawer } from '@/components/ui/Drawer';
import { AIOrb } from '@/components/brand/AIOrb';
import { Button } from '@/components/ui/Button';
import { ArrowUp, Sparkles, ExternalLink, Square } from 'lucide-react';
import { useAIStatusStore } from '@/store/ai-status.store';

export const AskDiyaDrawer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { askDiyaOpen, setAskDiyaOpen } = useUIStore();
  const { status, statusLabel } = useAIStatusStore();
  const { messages, isStreaming, sendMessage, stopStreaming } = useDiyaChat();
  const [prompt, setPrompt] = useState('');

  const currentTabName = pathname.replace('/', '') || 'home';

  const suggestedPrompts = [
    `Analyze marketing opportunities for ${currentTabName}`,
    'Draft 3 high-converting ad copy angles',
    'Review campaign budget allocation',
    'Generate lead gen campaign with ₹15,000 budget',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isStreaming) return;
    sendMessage(prompt);
    setPrompt('');
  };

  const handleOpenInDiya = () => {
    setAskDiyaOpen(false);
    router.push('/chat');
  };

  return (
    <Drawer
      isOpen={askDiyaOpen}
      onClose={() => setAskDiyaOpen(false)}
      title={
        <div className="flex items-center gap-2.5">
          <AIOrb status={status} size="sm" />
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-bold text-sm text-[#111]">Ask DIYA</span>
              <span className="text-[10px] font-semibold text-[#7C3AED] bg-[#EDE9FE] px-1.5 py-0.5 rounded">
                {statusLabel}
              </span>
            </div>
            <span className="text-[10px] text-[#666] mt-0.5 block">
              Context: /{currentTabName}
            </span>
          </div>
        </div>
      }
      subtitle="Your autonomous AI marketing manager"
    >
      <div className="flex flex-col h-full justify-between gap-5">
        {/* Top Action to Navigate to full tab */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#EDE9FE]/50 border border-[#DDD6FE]">
          <span className="text-xs text-[#52525B] font-medium">
            Full workspace available on DIYA chat
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={handleOpenInDiya}
            className="text-xs h-7 px-2.5 bg-white text-[#7C3AED] border-[#DDD6FE] hover:bg-[#EDE9FE]"
            rightIcon={<ExternalLink className="h-3 w-3" />}
          >
            Open in DIYA
          </Button>
        </div>

        {/* Conversation Snippet */}
        <div className="flex-1 overflow-y-auto space-y-3 py-1">
          {messages.slice(-3).map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-xl text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#EDE9FE] text-[#4C1D95] font-medium ml-4 sm:ml-6'
                  : 'bg-white border border-[#EAEAEA] text-[#111] mr-4 sm:mr-6 shadow-2xs'
              }`}
            >
              <span className="text-[10px] font-bold block mb-1 text-[#666] uppercase tracking-wider">
                {msg.role === 'user' ? 'You' : 'DIYA'}
              </span>
              <p className="line-clamp-4">
                {msg.content ||
                  msg.blocks?.find((b) => b.type === 'text')?.text ||
                  'Structured marketing plan generated'}
              </p>
            </div>
          ))}
        </div>

        {/* Suggested Chips */}
        <div>
          <span className="text-[10px] font-semibold text-[#666] uppercase tracking-wider block mb-1.5">
            Suggested Prompts
          </span>
          <div className="flex flex-col gap-1.5">
            {suggestedPrompts.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(s)}
                className="text-left text-xs p-2.5 rounded-xl bg-white border border-[#EAEAEA] hover:border-[#7C3AED]/40 hover:bg-[#FAFAFC] text-[#555] transition-colors flex items-center gap-2 active:scale-[0.99]"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#7C3AED] shrink-0" />
                <span className="truncate">{s}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input box */}
        <form onSubmit={handleSubmit} className="mt-auto pt-2 border-t border-[#EAEAEA]">
          <div className="relative flex items-center">
            <textarea
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask DIYA to optimize ads, write copy, or plan campaigns..."
              className="w-full resize-none rounded-xl border border-[#EAEAEA] bg-white p-2.5 pr-12 text-xs text-[#111] placeholder:text-[#888] focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 shadow-xs"
            />
            {isStreaming ? (
              <button
                type="button"
                onClick={stopStreaming}
                aria-label="Stop response"
                className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!prompt.trim()}
                aria-label="Send prompt"
                className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-[#7C3AED] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#6D28D9] transition-colors shadow-2xs"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="text-[10px] text-[#888] text-center mt-1.5">
            Tap send or press Enter
          </p>
        </form>
      </div>
    </Drawer>
  );
};
