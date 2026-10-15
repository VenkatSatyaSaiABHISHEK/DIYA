'use client';

import React, { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { AIOrb } from '@/components/brand/AIOrb';
import { PlanCard } from './PlanCard';
import { CampaignPreviewCard } from './CampaignPreviewCard';
import { CreativePreviewCard } from './CreativePreviewCard';
import { ReportCard } from './ReportCard';
import { TaskTimelineCard } from './TaskTimelineCard';
import type { Message, Block } from '../../types';
import { cn } from '@/lib/utils/cn';
import { useGSAP } from '@gsap/react';
import { animateStagger } from '@/lib/animations/stagger';

export interface MessageListProps {
  messages: Message[];
  isStreaming: boolean;
  streamingMessageId: string | null;
  onApprovePlan: (planId: string, financialAmountINR?: number) => void;
  onRejectPlan: (planId: string) => void;
  onApproveStep?: (planId: string, stepId: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isStreaming,
  streamingMessageId,
  onApprovePlan,
  onRejectPlan,
  onApproveStep,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const unrevealed = containerRef.current.querySelectorAll('.message-bubble-wrapper');
      animateStagger(unrevealed, { stagger: 0.06, yOffset: 8 });
    },
    { dependencies: [messages.length], scope: containerRef }
  );

  const renderBlock = (block: Block, blockIdx: number) => {
    switch (block.type) {
      case 'text':
        return (
          <div
            key={blockIdx}
            className="text-xs sm:text-sm text-[#18181B] leading-relaxed whitespace-pre-wrap font-normal"
          >
            {block.text}
          </div>
        );
      case 'plan':
        return (
          <PlanCard
            key={blockIdx}
            plan={block.plan}
            onApprove={onApprovePlan}
            onReject={onRejectPlan}
            onApproveStep={onApproveStep}
          />
        );
      case 'campaignPreview':
        return <CampaignPreviewCard key={blockIdx} campaign={block.campaign} />;
      case 'creativePreview':
        return <CreativePreviewCard key={blockIdx} creative={block.creative} />;
      case 'report':
        return <ReportCard key={blockIdx} report={block.report} />;
      case 'timeline':
        return <TaskTimelineCard key={blockIdx} timeline={block.timeline} />;
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-5 py-4 min-h-[420px]">
      {messages.map((msg) => {
        const isUser = msg.role === 'user';
        const isCurrentlyStreaming = msg.id === streamingMessageId && isStreaming;

        return (
          <div
            key={msg.id}
            className={cn(
              'message-bubble-wrapper flex items-start gap-3 w-full',
              isUser ? 'justify-end' : 'justify-start'
            )}
          >
            {/* Assistant AI Avatar */}
            {!isUser && (
              <div className="shrink-0 mt-1">
                <AIOrb status={isCurrentlyStreaming ? 'creating' : 'optimizing'} size="sm" />
              </div>
            )}

            {/* Message Bubble Container */}
            <div
              className={cn(
                'flex flex-col gap-2 max-w-full sm:max-w-3xl',
                isUser ? 'items-end' : 'items-start'
              )}
            >
              {isUser ? (
                <div className="rounded-2xl bg-[#EDE9FE] px-4 py-2.5 text-xs sm:text-sm text-[#4C1D95] font-medium shadow-2xs max-w-md">
                  {msg.content || (msg.blocks[0]?.type === 'text' ? msg.blocks[0].text : '')}
                </div>
              ) : (
                <div className="w-full space-y-2">
                  {msg.blocks.map((block, idx) => (
                    <div key={idx}>{renderBlock(block, idx)}</div>
                  ))}

                  {/* Blinking streaming caret */}
                  {isCurrentlyStreaming && (
                    <span className="inline-block h-3.5 w-1.5 bg-[#7C3AED] animate-pulse ml-1 rounded-xs" />
                  )}
                </div>
              )}

              {/* Timestamp */}
              <span className="text-[10px] text-[#A1A1AA] px-1">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            {/* User Avatar */}
            {isUser && (
              <div className="shrink-0 mt-1">
                <Avatar name="Owner" size="sm" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
