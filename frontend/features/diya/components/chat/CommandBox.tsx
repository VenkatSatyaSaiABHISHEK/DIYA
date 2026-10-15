'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { DIYA_CONSTANTS } from '../../constants';
import {
  ArrowUp,
  Square,
  Paperclip,
  Languages,
  Sparkles,
} from 'lucide-react';
import { useUIStore } from '@/store/ui.store';
import { cn } from '@/lib/utils/cn';

export interface CommandBoxProps {
  onSend: (prompt: string) => void;
  onStop: () => void;
  isStreaming: boolean;
  selectedLanguage: 'en' | 'te' | 'hi';
  onLanguageChange: (lang: 'en' | 'te' | 'hi') => void;
}

export const CommandBox: React.FC<CommandBoxProps> = ({
  onSend,
  onStop,
  isStreaming,
  selectedLanguage,
  onLanguageChange,
}) => {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addToast } = useUIStore();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!prompt.trim() || isStreaming) return;
    onSend(prompt.trim());
    setPrompt('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleChipClick = (chip: string) => {
    onSend(chip);
  };

  const handleAttachClick = () => {
    addToast('Asset attachment will connect directly to Content Studio in Part 3 & 4.', 'info');
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    // Auto grow
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  return (
    <div className="w-full">
      {/* Example command chips */}
      <div className="mb-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <span className="text-[10px] font-semibold text-[#71717A] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1 select-none">
          <Sparkles className="h-3 w-3 text-[#7C3AED]" /> Quick prompts:
        </span>
        {DIYA_CONSTANTS.exampleChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleChipClick(chip)}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FAFAFC] border border-[#E4E4E7] text-[#52525B] hover:text-[#18181B] hover:bg-white hover:border-[#7C3AED]/40 hover:shadow-2xs transition-all select-none"
          >
            <span>{chip}</span>
          </button>
        ))}
      </div>

      {/* Glass Command Input Container */}
      <GlassCard className="p-2.5 rounded-2xl shadow-glass border border-[#E4E4E7]/90 bg-white">
        <div className="flex flex-col gap-2">
          {/* Multiline textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={prompt}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder="Assign a task to DIYA (e.g. Generate leads, plan campaign, write ad copy)..."
            className="w-full resize-none border-0 bg-transparent px-3 py-1.5 text-xs sm:text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-0 leading-relaxed max-h-36 overflow-y-auto"
          />

          {/* Action Row */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#F4F4F6]">
            <div className="flex items-center gap-2">
              {/* Attach File Button */}
              <button
                type="button"
                onClick={handleAttachClick}
                aria-label="Attach marketing asset"
                className="p-1.5 rounded-lg text-[#71717A] hover:text-[#18181B] hover:bg-black/5 transition-colors"
              >
                <Paperclip className="h-4 w-4" />
              </button>

              {/* Language Selector */}
              <div className="flex items-center gap-1 rounded-lg border border-[#E4E4E7] bg-white px-2 py-1 text-xs text-[#52525B]">
                <Languages className="h-3.5 w-3.5 text-[#7C3AED]" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => onLanguageChange(e.target.value as 'en' | 'te' | 'hi')}
                  aria-label="Select command language"
                  className="bg-transparent border-none text-[11px] font-medium text-[#18181B] focus:outline-none cursor-pointer"
                >
                  {DIYA_CONSTANTS.languages.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[10px] text-[#A1A1AA]">
                Enter to send • Shift+Enter for new line
              </span>

              {isStreaming ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onStop}
                  className="text-xs h-8 px-3 text-[#DC2626] border-[#FECACA] hover:bg-red-50"
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
                  className="text-xs h-8 px-3.5 font-semibold shadow-sm"
                  rightIcon={<ArrowUp className="h-3.5 w-3.5" />}
                >
                  Send
                </Button>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
