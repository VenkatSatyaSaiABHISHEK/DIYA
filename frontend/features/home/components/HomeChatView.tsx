'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useDiyaChat } from '@/features/diya/hooks/useDiyaChat';
import { MessageList } from '@/features/diya/components/chat/MessageList';
import { ApprovalModal } from '@/features/diya/components/chat/ApprovalModal';
import { AIOrb } from '@/components/brand/AIOrb';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { DIYA_CONSTANTS } from '@/features/diya/constants';
import {
  ArrowUp,
  Square,
  Paperclip,
  Languages,
  Sparkles,
  CheckCircle2,
  XCircle,
  Pencil,
  ArrowRight,
  Lightbulb,
  X,
  Target,
  Megaphone,
  FileText,
  BarChart3,
  Users,
} from 'lucide-react';
import { useUIStore } from '@/store/ui.store';
import { cn } from '@/lib/utils/cn';

const suggestionChips = [
  { id: 'leads', label: 'Generate leads', prompt: 'Generate 50 qualified real estate leads in Hyderabad Financial District with high net worth targeting on Meta and Google.' },
  { id: 'strategy', label: '30-day strategy', prompt: 'Create a comprehensive 30-day marketing strategy to scale luxury villa sales with ₹1,00,000 monthly budget.' },
  { id: 'ads', label: 'Analyze ads', prompt: 'Analyze our current Meta and Google ad campaigns, identify budget waste, and recommend ROAS improvements.' },
  { id: 'report', label: 'Weekly report', prompt: 'Generate the weekly marketing performance report covering CAC, ROAS, conversions, and organic keyword growth.' },
];

export const HomeChatView: React.FC = () => {
  const {
    messages,
    isStreaming,
    streamingMessageId,
    selectedLanguage,
    setSelectedLanguage,
    sendMessage,
    stopStreaming,
    handleApprovePlan,
    handleRejectPlan,
    approvePlanStep,
  } = useDiyaChat();

  const { addToast } = useUIStore();
  const [prompt, setPrompt] = useState('');
  const [showSuggestionCard, setShowSuggestionCard] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const hasMessages = messages.length > 0;

  // Auto-scroll when messages update
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages.length, isStreaming]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!prompt.trim() || isStreaming) return;
    sendMessage(prompt.trim());
    setPrompt('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleChipClick = (chipPrompt: string) => {
    sendMessage(chipPrompt);
  };

  const handleApplySuggestion = () => {
    sendMessage(
      'Scale budget for Meta campaign "Sky Villas Q3" by 15% to capture 42 more high-intent buyer leads as suggested.'
    );
    setShowSuggestionCard(false);
  };

  const handleAttachClick = () => {
    addToast('File attachment enabled: select creatives, images, or brand guidelines PDF.', 'info');
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-7rem)] w-full">
      {/* Scrollable Conversation View (Centered max-w-[720px]) */}
      <div
        ref={scrollContainerRef}
        className="flex-1 w-full max-w-[720px] mx-auto px-2 sm:px-4 py-4 flex flex-col justify-start"
      >
        {/* First View: Empty / Pristine State */}
        {!hasMessages ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12 sm:py-20 animate-in fade-in duration-500">
            {/* Small Orb next to DIYA Name and Status */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-2xs mb-6 select-none">
              <AIOrb status={isStreaming ? 'creating' : 'running'} size="sm" />
              <span className="text-xs font-semibold text-[#111] dark:text-[#EDEDED]">DIYA</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded font-medium border border-emerald-200 dark:border-emerald-800">
                Active
              </span>
            </div>

            {/* Centered Large Greeting */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#111] dark:text-[#EDEDED] tracking-tight mb-2">
              {getGreeting()}, <span className="text-[#7C3AED]">Abhishek</span>.
            </h1>
            <p className="text-base sm:text-lg text-[#666] dark:text-[#888] max-w-md font-normal leading-relaxed mb-8">
              What should we grow today?
            </p>

            {/* Single "DIYA suggests" Card (Max 1 Item) */}
            {showSuggestionCard && (
              <div className="w-full mb-6 p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#DDD6FE]/80 dark:border-[#7C3AED]/40 shadow-xs text-left relative group">
                <button
                  onClick={() => setShowSuggestionCard(false)}
                  className="absolute top-3 right-3 text-[#888] hover:text-[#111] dark:hover:text-[#FFF] p-1 rounded-md"
                  title="Dismiss suggestion"
                  aria-label="Dismiss suggestion"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-[#EDE9FE] dark:bg-[#2E1065] text-[#7C3AED] shrink-0 mt-0.5">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div className="flex-1 pr-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#6D28D9] dark:text-[#A78BFA]">DIYA suggests</span>
                      <span className="text-[10px] text-[#888]">• Real-time recommendation</span>
                    </div>
                    <p className="text-xs text-[#444] dark:text-[#AAA] mt-1 leading-relaxed">
                      Scale daily budget for Meta campaign <strong>&ldquo;Luxury Sky Villas Q3&rdquo;</strong> by 15%. Cost per acquisition dropped to ₹312 and lead qualification score is 9.4/10.
                    </p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={handleApplySuggestion}
                        className="text-xs h-7 px-3 bg-[#7C3AED] hover:bg-[#6D28D9] font-semibold"
                        rightIcon={<ArrowRight className="h-3 w-3" />}
                      >
                        Apply with 1-click
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Large Glass Command Box */}
            <div className="w-full mb-5">
              <div className="p-3.5 rounded-lg border border-[#EAEAEA] dark:border-[#333] bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md shadow-xs">
                <div className="flex flex-col gap-2">
                  <textarea
                    ref={textareaRef}
                    rows={2}
                    value={prompt}
                    onChange={handleTextareaInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask DIYA to run ads, generate content, audit SEO, or optimize leads..."
                    className="w-full resize-none border-0 bg-transparent px-2 py-1.5 text-sm sm:text-base text-[#111] dark:text-[#EDEDED] placeholder:text-[#888] focus:outline-none focus:ring-0 leading-relaxed"
                  />

                  {/* Actions Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#EAEAEA] dark:border-[#222]">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleAttachClick}
                        className="p-1.5 rounded-md text-[#666] dark:text-[#888] hover:text-[#111] dark:hover:text-[#FFF] hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A] transition-colors"
                        title="Attach files or brand documents"
                      >
                        <Paperclip className="h-4 w-4" />
                      </button>

                      {/* Language Selector */}
                      <div className="flex items-center gap-1 rounded-md border border-[#EAEAEA] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#141414] px-2 py-1 text-xs text-[#666] dark:text-[#AAA]">
                        <Languages className="h-3.5 w-3.5 text-[#7C3AED]" />
                        <select
                          value={selectedLanguage}
                          onChange={(e) => setSelectedLanguage(e.target.value as 'en' | 'te' | 'hi')}
                          aria-label="Select command language"
                          className="bg-transparent border-none text-[11px] font-medium text-[#111] dark:text-[#EDEDED] focus:outline-none cursor-pointer"
                        >
                          {DIYA_CONSTANTS.languages.map((l) => (
                            <option key={l.id} value={l.id} className="bg-white dark:bg-[#111] text-[#111] dark:text-[#EDEDED]">
                              {l.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="gradient"
                        disabled={!prompt.trim()}
                        onClick={handleSend}
                        className="h-8 px-4 font-semibold text-xs shadow-xs"
                        rightIcon={<ArrowUp className="h-3.5 w-3.5" />}
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Suggestion Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
              {suggestionChips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => handleChipClick(chip.prompt)}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-[#EAEAEA] dark:border-[#333] bg-white dark:bg-[#0A0A0A] text-xs font-medium text-[#666] dark:text-[#AAA] hover:text-[#111] dark:hover:text-[#FFF] hover:border-[#7C3AED]/50 hover:bg-[#FAF5FF] dark:hover:bg-[#1A1426] transition-all text-center"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#7C3AED] shrink-0" />
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Active Conversation View: Clean, Spacious (720px width) */
          <div className="space-y-6 pb-28 pt-2 animate-in fade-in duration-300">
            {/* Small Header with DIYA Orb & Status */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F6] text-xs">
              <div className="flex items-center gap-2">
                <AIOrb status={isStreaming ? 'creating' : 'running'} size="sm" />
                <span className="font-bold text-[#18181B]">DIYA</span>
                <span className="text-[#A1A1AA]">•</span>
                <span className="text-[#71717A]">Autonomous Marketing Team</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>
            </div>

            {/* Message List */}
            <MessageList
              messages={messages}
              isStreaming={isStreaming}
              streamingMessageId={streamingMessageId}
              onApprovePlan={handleApprovePlan}
              onRejectPlan={handleRejectPlan}
              onApproveStep={approvePlanStep}
            />
          </div>
        )}
      </div>

      {/* Floating Bottom Glass Command Box (When Messages Are Visible) */}
      {hasMessages && (
        <div className="sticky bottom-0 z-20 w-full bg-gradient-to-t from-[#FAFAFA] dark:from-[#000000] via-[#FAFAFA]/90 dark:via-[#000000]/90 to-transparent pt-4 pb-4">
          <div className="max-w-[720px] mx-auto px-3 sm:px-4">
            <div className="p-3 rounded-lg border border-[#EAEAEA] dark:border-[#333] bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md shadow-xs">
              <div className="flex flex-col gap-2">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={prompt}
                  onChange={handleTextareaInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Give DIYA next instructions (e.g. adjust targeting, write email copy, prepare report)..."
                  className="w-full resize-none border-0 bg-transparent px-2 py-1 text-xs sm:text-sm text-[#111] dark:text-[#EDEDED] placeholder:text-[#888] focus:outline-none focus:ring-0 leading-relaxed max-h-32"
                />

                <div className="flex items-center justify-between pt-1.5 border-t border-[#EAEAEA] dark:border-[#222]">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAttachClick}
                      className="p-1 rounded-md text-[#666] dark:text-[#888] hover:text-[#111] dark:hover:text-[#FFF] hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A] transition-colors"
                      title="Attach file"
                    >
                      <Paperclip className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-1 rounded-md border border-[#EAEAEA] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#141414] px-1.5 py-0.5 text-xs text-[#666] dark:text-[#AAA]">
                      <Languages className="h-3 w-3 text-[#7C3AED]" />
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value as 'en' | 'te' | 'hi')}
                        aria-label="Select command language"
                        className="bg-transparent border-none text-[10px] font-medium text-[#111] dark:text-[#EDEDED] focus:outline-none cursor-pointer"
                      >
                        {DIYA_CONSTANTS.languages.map((l) => (
                          <option key={l.id} value={l.id} className="bg-white dark:bg-[#111] text-[#111] dark:text-[#EDEDED]">
                            {l.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isStreaming ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={stopStreaming}
                        className="text-xs h-7 px-3 text-[#DC2626] border-[#FECACA] hover:bg-red-50"
                        leftIcon={<Square className="h-3 w-3 fill-current" />}
                      >
                        Stop
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="gradient"
                        disabled={!prompt.trim()}
                        onClick={handleSend}
                        className="text-xs h-7 px-3.5 font-semibold"
                        rightIcon={<ArrowUp className="h-3.5 w-3.5" />}
                      >
                        Send
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Financial Authorization Modal */}
      <ApprovalModal />
    </div>
  );
};
