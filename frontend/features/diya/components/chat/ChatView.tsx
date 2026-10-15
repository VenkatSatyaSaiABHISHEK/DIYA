'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useDiyaChat } from '../../hooks/useDiyaChat';
import { MessageList } from './MessageList';
import { CommandBox } from './CommandBox';
import { IdentityPanel } from '../IdentityPanel';
import { ApprovalModal } from './ApprovalModal';
import { Bot, PanelRightClose, PanelRightOpen } from 'lucide-react';

export const ChatView: React.FC = () => {
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

  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const initialScrollDone = useRef(false);

  // Auto-scroll ONLY the inner message viewport when user interacts or message streams
  useEffect(() => {
    if (!initialScrollDone.current) {
      // Keep initial view anchored to the top on page load
      initialScrollDone.current = true;
      return;
    }

    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages.length, isStreaming]);

  return (
    <div className="relative flex flex-col lg:flex-row gap-4 w-full h-[calc(100vh-9.5rem)] min-h-[460px]">
      {/* Tablet / Mobile compact Identity header */}
      <div className="lg:hidden w-full shrink-0">
        <IdentityPanel isCompact />
      </div>

      {/* Main Conversation Column (Left/Center) */}
      <div className="flex-1 flex flex-col h-full bg-white/85 backdrop-blur-md rounded-2xl border border-[#E4E4E7] shadow-xs overflow-hidden">
        {/* Chat Session Subheader */}
        <div className="shrink-0 px-4 sm:px-6 py-2.5 border-b border-[#F4F4F6] bg-white/90 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EDE9FE] text-[#7C3AED]">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-[#18181B]">
                  DIYA Command Center
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>
              <span className="text-[11px] text-[#71717A] hidden sm:block">
                Autonomous Marketing Workforce • Conversational Execution Stream
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle Right Panel (Desktop) */}
            <button
              type="button"
              onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F6] transition-colors border border-transparent hover:border-[#E4E4E7]"
              title={isPanelCollapsed ? 'Show Status Briefing' : 'Collapse Side Card'}
            >
              {isPanelCollapsed ? (
                <>
                  <PanelRightOpen className="h-4 w-4 text-[#7C3AED]" />
                  <span>Show Briefing</span>
                </>
              ) : (
                <>
                  <PanelRightClose className="h-4 w-4" />
                  <span>Hide Briefing</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Message History Viewport */}
        <div ref={viewportRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          <MessageList
            messages={messages}
            isStreaming={isStreaming}
            streamingMessageId={streamingMessageId}
            onApprovePlan={handleApprovePlan}
            onRejectPlan={handleRejectPlan}
            onApproveStep={approvePlanStep}
          />
        </div>

        {/* Docked Command Input Box (Bottom) - Never overlays cards */}
        <div className="shrink-0 p-3 bg-white/95 border-t border-[#F4F4F6] backdrop-blur-md">
          <CommandBox
            onSend={sendMessage}
            onStop={stopStreaming}
            isStreaming={isStreaming}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>
      </div>

      {/* Desktop Glass Identity Panel (Right Column) */}
      {!isPanelCollapsed && (
        <div className="hidden lg:block w-[310px] shrink-0 h-full overflow-y-auto pr-0.5">
          <IdentityPanel onCollapse={() => setIsPanelCollapsed(true)} />
        </div>
      )}

      {/* Global High-Impact Authorization Modal */}
      <ApprovalModal />
    </div>
  );
};
