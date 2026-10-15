'use client';

import React, { useState } from 'react';
import { Drawer } from '@/components/ui/Drawer';
import {
  Sparkles,
  Layers,
  Play,
  Copy,
  Check,
  Calendar,
  Share2,
  Clock,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import type { ContentPost } from '../../types';
import { CHANNELS } from '../../constants';

interface ContentDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  post: ContentPost | null;
  onApprove: (postId: string) => void;
  onOpenReschedule: (post: ContentPost) => void;
}

export const ContentDetailDrawer: React.FC<ContentDetailDrawerProps> = ({
  isOpen,
  onClose,
  post,
  onApprove,
  onOpenReschedule,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  if (!post) return null;

  const channel = CHANNELS.find((c) => c.id === post.channel) || CHANNELS[0];
  const isCarousel = post.format === 'carousel' && (post.carouselSlides?.length || 0) > 0;
  const isReel = post.format === 'reel_script' && (post.reelScript?.length || 0) > 0;

  const handleCopyCaption = () => {
    const fullText = `${post.caption}\n\n${post.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={post.title}
      width="max-w-3xl"
    >
      <div className="space-y-6 pb-6">
        <p className="text-xs text-[#71717A] -mt-2">
          Authored by {post.author} • Target: {post.targetAudience || 'General Audience'}
        </p>

        {/* Channel & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#F4F4F5] rounded-xl text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${channel.bgColor} ${channel.color} ${channel.badgeBorder}`}
            >
              {channel.name}
            </span>
            <span className="font-medium text-[#71717A] capitalize">
              {post.format.replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[#7C3AED] font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Score: {post.predictedScore}/100</span>
            </div>

            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                post.status === 'scheduled'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : post.status === 'needs_approval'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
              }`}
            >
              {post.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Visual Mockup Box */}
        <div className="rounded-2xl border border-[#E4E4E7] overflow-hidden shadow-xs bg-[#18181B] text-white">
          <div className="p-4 border-b border-white/10 flex items-center justify-between text-xs">
            <span className="font-semibold text-[#A78BFA] flex items-center gap-1.5">
              <Share2 className="h-4 w-4" />
              Live Feed Simulation
            </span>
            {isCarousel && (
              <div className="flex items-center gap-2">
                <span className="text-zinc-400 text-xs">
                  Slide {activeSlide + 1} of {post.carouselSlides?.length}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={activeSlide === 0}
                    onClick={() => setActiveSlide((p) => p - 1)}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-20"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={activeSlide === (post.carouselSlides?.length || 1) - 1}
                    onClick={() => setActiveSlide((p) => p + 1)}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-20"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Canvas Display */}
          <div className="p-6 min-h-[220px] flex flex-col justify-center items-center text-center bg-linear-to-b from-[#27272A] to-[#18181B] relative">
            {isCarousel && post.carouselSlides ? (
              <div className="max-w-md space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#A78BFA] font-bold">
                  Card {activeSlide + 1}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {post.carouselSlides[activeSlide]?.title}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {post.carouselSlides[activeSlide]?.body}
                </p>
                {post.carouselSlides[activeSlide]?.bulletPoints && (
                  <ul className="text-left text-xs text-zinc-300 space-y-1 mt-2 inline-block">
                    {post.carouselSlides[activeSlide]?.bulletPoints?.map((bp, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                        {bp}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : isReel && post.reelScript ? (
              <div className="w-full text-left space-y-3">
                <div className="flex items-center gap-2 text-xs text-pink-400 font-bold">
                  <Play className="h-3.5 w-3.5 fill-pink-400" />
                  <span>Scene Breakdown (60s Vertical Format)</span>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {post.reelScript.map((scene, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#A78BFA]">
                        <span>{scene.timecode} • {scene.phase}</span>
                        {scene.bRollSuggestion && (
                          <span className="text-zinc-400 font-normal italic">
                            B-roll: {scene.bRollSuggestion}
                          </span>
                        )}
                      </div>
                      <p className="text-white font-medium">&ldquo;{scene.spokenAudio}&rdquo;</p>
                      <p className="text-zinc-400 text-[11px]">Visual: {scene.visualCue}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-md space-y-2">
                <h3 className="text-base font-bold text-white">{post.title}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{post.caption}</p>
              </div>
            )}
          </div>
        </div>

        {/* Caption & Hashtags Inspector */}
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#18181B]">Caption & Copy</span>
            <button
              type="button"
              onClick={handleCopyCaption}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7C3AED] hover:underline"
            >
              {isCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Caption</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3 bg-[#FAFAFA] rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] whitespace-pre-line leading-relaxed font-mono">
            {post.caption}
          </div>

          {/* Hashtags */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-semibold text-[#71717A]">
              Recommended Hashtags ({post.hashtags.length})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {post.hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scheduled Timeline & Actions */}
        <div className="p-4 bg-white rounded-2xl border border-[#E4E4E7] shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#71717A]">
            <Clock className="h-4 w-4 text-[#7C3AED]" />
            <span>
              Scheduled for:{' '}
              <strong className="text-[#18181B]">
                {post.scheduledFor
                  ? new Date(post.scheduledFor).toLocaleString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZoneName: 'short',
                    })
                  : 'Not scheduled yet'}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenReschedule(post)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E4E4E7] text-xs font-semibold text-[#18181B] hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all"
            >
              <Calendar className="h-3.5 w-3.5" />
              Reschedule
            </button>

            {post.status === 'needs_approval' && (
              <button
                type="button"
                onClick={() => {
                  onApprove(post.id);
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 shadow-xs transition-all"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Approve Post
              </button>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
