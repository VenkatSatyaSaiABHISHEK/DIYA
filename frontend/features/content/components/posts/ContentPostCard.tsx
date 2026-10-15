'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  Trash2,
  Play,
  Layers,
  Clock,
} from 'lucide-react';
import type { ContentPost } from '../../types';
import { CHANNELS } from '../../constants';

interface ContentPostCardProps {
  post: ContentPost;
  onOpenDrawer: (postId: string) => void;
  onOpenReschedule: (post: ContentPost) => void;
  onApprove: (postId: string) => void;
  onDelete: (postId: string) => void;
}

export const ContentPostCard: React.FC<ContentPostCardProps> = ({
  post,
  onOpenDrawer,
  onOpenReschedule,
  onApprove,
  onDelete,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const channelMeta = CHANNELS.find((c) => c.id === post.channel) || CHANNELS[0];

  const totalSlides = post.carouselSlides?.length || 0;
  const isCarousel = post.format === 'carousel' && totalSlides > 0;
  const isReel = post.format === 'reel_script';

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const formatScheduledTime = (dateStr?: string) => {
    if (!dateStr) return 'Not scheduled';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      onClick={() => onOpenDrawer(post.id)}
      className="group relative flex flex-col bg-white rounded-2xl border border-[#E4E4E7] shadow-xs hover:shadow-md hover:border-[#7C3AED]/40 transition-all cursor-pointer overflow-hidden"
    >
      {/* Top Header: Channel, Format & Status */}
      <div className="flex items-center justify-between p-3.5 border-b border-[#F4F4F5]">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${channelMeta.bgColor} ${channelMeta.color} ${channelMeta.badgeBorder}`}
          >
            {channelMeta.name}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F4F4F5] text-[#71717A] text-[10px] font-medium">
            {isCarousel ? (
              <>
                <Layers className="h-3 w-3" /> Carousel
              </>
            ) : isReel ? (
              <>
                <Play className="h-3 w-3" /> 60s Reel
              </>
            ) : (
              post.format.replace('_', ' ')
            )}
          </span>
        </div>

        {/* Status Badge */}
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            post.status === 'scheduled'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : post.status === 'needs_approval'
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : post.status === 'published'
              ? 'bg-purple-50 text-purple-700 border border-purple-200'
              : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
          }`}
        >
          {post.status.replace('_', ' ')}
        </span>
      </div>

      {/* Visual Mockup Box */}
      <div className="relative aspect-4/3 w-full bg-linear-to-br from-[#18181B] via-[#27272A] to-[#3F3F46] p-4 flex flex-col justify-between overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#7C3AED]/30 blur-2xl" />
        <div className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full bg-pink-500/20 blur-xl" />

        {/* Top Watermark / Slide Counter */}
        <div className="relative z-10 flex items-center justify-between text-white/70 text-[10px]">
          <span className="font-semibold tracking-wide uppercase text-[#A78BFA]">DIYA Studio</span>
          {isCarousel && (
            <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-xs text-white text-[10px] font-medium">
              Slide {currentSlideIndex + 1} of {totalSlides}
            </span>
          )}
          {isReel && (
            <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-xs text-white text-[10px] font-medium flex items-center gap-1">
              <Play className="h-2.5 w-2.5 text-pink-400 fill-pink-400" /> Hook 0-3s
            </span>
          )}
        </div>

        {/* Slide or Reel Content Preview */}
        <div className="relative z-10 my-auto text-center px-2">
          {isCarousel && post.carouselSlides ? (
            <div className="space-y-1.5 transition-all">
              <h4 className="text-sm font-bold text-white leading-tight line-clamp-2">
                {post.carouselSlides[currentSlideIndex]?.title}
              </h4>
              <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed font-normal">
                {post.carouselSlides[currentSlideIndex]?.body}
              </p>
            </div>
          ) : isReel && post.reelScript ? (
            <div className="space-y-1 text-center">
              <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#7C3AED]/30 border border-[#7C3AED] text-white mx-auto mb-1">
                <Play className="h-4 w-4 fill-white" />
              </div>
              <p className="text-xs font-semibold text-white line-clamp-2">
                &ldquo;{post.reelScript[0]?.spokenAudio}&rdquo;
              </p>
              <span className="text-[10px] text-zinc-400 block">
                Visual: {post.reelScript[0]?.visualCue.slice(0, 50)}...
              </span>
            </div>
          ) : (
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white line-clamp-2">{post.title}</h4>
              <p className="text-xs text-zinc-300 line-clamp-2">{post.caption.slice(0, 90)}...</p>
            </div>
          )}
        </div>

        {/* Carousel Slide Navigation Arrows */}
        {isCarousel && totalSlides > 1 && (
          <div className="relative z-10 flex items-center justify-between mt-auto pt-2">
            <button
              type="button"
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              aria-label="Previous slide"
              className="p-1 rounded-full bg-black/40 text-white hover:bg-black/60 disabled:opacity-20 transition-all"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <div className="flex items-center gap-1">
              {post.carouselSlides?.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all ${
                    idx === currentSlideIndex ? 'w-4 bg-[#7C3AED]' : 'w-1 bg-white/40'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={nextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
              aria-label="Next slide"
              className="p-1 rounded-full bg-black/40 text-white hover:bg-black/60 disabled:opacity-20 transition-all"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Body: Title, Snippet, Hashtags */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="text-xs font-bold text-[#18181B] group-hover:text-[#7C3AED] transition-colors line-clamp-1">
            {post.title}
          </h3>
          <p className="text-xs text-[#71717A] mt-1 line-clamp-2 leading-relaxed">
            {post.caption}
          </p>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1 mt-2">
            {post.hashtags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] text-[#7C3AED] font-medium hover:underline"
              >
                {tag}
              </span>
            ))}
            {post.hashtags.length > 3 && (
              <span className="text-[10px] text-[#A1A1AA]">
                +{post.hashtags.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Footer Meta: Predicted Score & Scheduled Time */}
        <div className="pt-2 border-t border-[#F4F4F5] flex items-center justify-between text-[11px]">
          {/* AI Score */}
          <div className="flex items-center gap-1 text-purple-700 font-semibold" title="AI Predicted Engagement Score">
            <Sparkles className="h-3 w-3 text-[#7C3AED]" />
            <span>Score: {post.predictedScore}/100</span>
          </div>

          {/* Scheduled Date */}
          <div className="flex items-center gap-1 text-[#71717A]">
            <Clock className="h-3 w-3" />
            <span>{formatScheduledTime(post.scheduledFor || post.publishedAt)}</span>
          </div>
        </div>
      </div>

      {/* Quick Action Overlay on Hover */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="px-3.5 py-2 bg-[#FAFAFA] border-t border-[#F4F4F5] flex items-center justify-between gap-1 text-xs"
      >
        <button
          type="button"
          onClick={() => onOpenDrawer(post.id)}
          className="inline-flex items-center gap-1 text-[#71717A] hover:text-[#18181B] font-medium"
        >
          <Eye className="h-3.5 w-3.5" />
          Preview
        </button>

        <div className="flex items-center gap-1.5">
          {post.status === 'needs_approval' && (
            <button
              type="button"
              onClick={() => onApprove(post.id)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium text-[11px]"
              title="Approve for deployment"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Approve
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpenReschedule(post)}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-[#E4E4E7] text-[#18181B] hover:border-[#7C3AED] hover:text-[#7C3AED] text-[11px] font-medium shadow-2xs"
            title="Reschedule flight"
          >
            <Calendar className="h-3 w-3" />
            Reschedule
          </button>

          <button
            type="button"
            onClick={() => onDelete(post.id)}
            className="p-1 rounded-md text-[#71717A] hover:text-red-600 transition-colors"
            title="Delete post"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
