'use client';

import React from 'react';
import { Eye, Calendar, CheckCircle2, Trash2, Sparkles, Layers, Play } from 'lucide-react';
import type { ContentPost } from '../../types';
import { CHANNELS } from '../../constants';

interface ContentPostTableProps {
  posts: ContentPost[];
  onOpenDrawer: (postId: string) => void;
  onOpenReschedule: (post: ContentPost) => void;
  onApprove: (postId: string) => void;
  onDelete: (postId: string) => void;
}

export const ContentPostTable: React.FC<ContentPostTableProps> = ({
  posts,
  onOpenDrawer,
  onOpenReschedule,
  onApprove,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E4E4E7] shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAFAFA] border-b border-[#E4E4E7] text-[#71717A] uppercase text-[10px] tracking-wider font-semibold">
            <tr>
              <th className="py-3 px-4">Post & Angle</th>
              <th className="py-3 px-4">Channel</th>
              <th className="py-3 px-4">Format</th>
              <th className="py-3 px-4">AI Score</th>
              <th className="py-3 px-4">Scheduled (IST)</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F4F4F5]">
            {posts.map((post) => {
              const channel = CHANNELS.find((c) => c.id === post.channel) || CHANNELS[0];
              return (
                <tr
                  key={post.id}
                  onClick={() => onOpenDrawer(post.id)}
                  className="hover:bg-[#FAFAFA] cursor-pointer transition-colors"
                >
                  {/* Title & snippet */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="font-semibold text-[#18181B] truncate">{post.title}</p>
                    <p className="text-[11px] text-[#71717A] truncate mt-0.5">{post.caption}</p>
                  </td>

                  {/* Channel */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${channel.bgColor} ${channel.color} ${channel.badgeBorder}`}
                    >
                      {channel.name}
                    </span>
                  </td>

                  {/* Format */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-[#71717A] text-[11px]">
                      {post.format === 'carousel' ? (
                        <>
                          <Layers className="h-3 w-3 text-purple-600" />
                          <span>Carousel ({post.carouselSlides?.length || 5})</span>
                        </>
                      ) : post.format === 'reel_script' ? (
                        <>
                          <Play className="h-3 w-3 text-pink-600" />
                          <span>60s Reel</span>
                        </>
                      ) : (
                        <span className="capitalize">{post.format.replace('_', ' ')}</span>
                      )}
                    </span>
                  </td>

                  {/* AI Score */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-semibold text-[#7C3AED]">
                      <Sparkles className="h-3 w-3" />
                      {post.predictedScore}/100
                    </span>
                  </td>

                  {/* Scheduled Time */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-[#71717A]">
                    {post.scheduledFor ? (
                      new Date(post.scheduledFor).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    ) : (
                      <span className="text-[#A1A1AA] italic">Draft</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
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
                  </td>

                  {/* Actions */}
                  <td
                    onClick={(e) => e.stopPropagation()}
                    className="py-3.5 px-4 text-right whitespace-nowrap"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onOpenDrawer(post.id)}
                        className="p-1 rounded-md text-[#71717A] hover:text-[#18181B]"
                        title="Preview & Edit"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {post.status === 'needs_approval' && (
                        <button
                          type="button"
                          onClick={() => onApprove(post.id)}
                          className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50"
                          title="Approve post"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onOpenReschedule(post)}
                        className="p-1 rounded-md text-[#71717A] hover:text-[#7C3AED]"
                        title="Reschedule"
                      >
                        <Calendar className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(post.id)}
                        className="p-1 rounded-md text-[#71717A] hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
