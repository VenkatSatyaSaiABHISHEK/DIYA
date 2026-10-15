'use client';

import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  Plus,
  Play,
  Layers,
} from 'lucide-react';
import { useContentPosts } from '../../hooks/useContentPosts';
import { useContentCalendar } from '../../hooks/useContentCalendar';
import { CHANNELS } from '../../constants';
import type { ContentChannel } from '../../types';

interface ContentCalendarViewProps {
  onNavigateToGenerator: () => void;
}

export const ContentCalendarView: React.FC<ContentCalendarViewProps> = ({
  onNavigateToGenerator,
}) => {
  const { rawPosts, openDrawer } = useContentPosts();
  const {
    monthName,
    calendarCells,
    selectedDateStr,
    setSelectedDateStr,
    selectedDatePosts,
    channelFilter,
    setChannelFilter,
    nextMonth,
    prevMonth,
  } = useContentCalendar(rawPosts);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      {/* Top Header: Navigation & Channel Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-[#E4E4E7] shadow-xs">
        {/* Month Navigation */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#7C3AED]">
            <CalendarIcon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#18181B]">{monthName}</h2>
            <p className="text-xs text-[#71717A]">Autonomous omni-channel publishing timeline</p>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              className="p-1.5 rounded-lg border border-[#E4E4E7] text-[#71717A] hover:bg-zinc-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              className="p-1.5 rounded-lg border border-[#E4E4E7] text-[#71717A] hover:bg-zinc-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Channel Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setChannelFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              channelFilter === 'all'
                ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-2xs'
                : 'bg-zinc-50 text-[#71717A] border-[#E4E4E7] hover:bg-zinc-100'
            }`}
          >
            All Channels
          </button>
          {CHANNELS.map((c) => {
            const isActive = channelFilter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setChannelFilter(c.id as ContentChannel)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isActive
                    ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-2xs'
                    : 'bg-white text-[#71717A] border-[#E4E4E7] hover:bg-zinc-50'
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid & Side Schedule Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid (3 Columns) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E4E4E7] shadow-xs overflow-hidden">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 border-b border-[#E4E4E7] bg-[#FAFAFA] text-center text-xs font-semibold text-[#71717A] py-2.5">
            {daysOfWeek.map((day) => (
              <div key={day} className="tracking-wide">
                {day}
              </div>
            ))}
          </div>

          {/* Grid Cells */}
          <div className="grid grid-cols-7 divide-x divide-y divide-[#F4F4F5]">
            {calendarCells.map((cell, idx) => {
              const isSelected = selectedDateStr === cell.dateStr;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDateStr(cell.dateStr)}
                  className={`min-h-[105px] p-2 flex flex-col justify-between cursor-pointer transition-all ${
                    !cell.isCurrentMonth
                      ? 'bg-zinc-50/40 text-zinc-400'
                      : isSelected
                      ? 'bg-purple-50/40 ring-2 ring-inset ring-[#7C3AED]/40'
                      : 'bg-white hover:bg-[#FAFAFA]'
                  }`}
                >
                  {/* Top Bar: Date Number & Optimal Time Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold inline-flex items-center justify-center h-6 w-6 rounded-full ${
                        cell.isToday
                          ? 'bg-[#7C3AED] text-white shadow-2xs'
                          : cell.isCurrentMonth
                          ? 'text-[#18181B]'
                          : 'text-[#A1A1AA]'
                      }`}
                    >
                      {cell.dateNumber}
                    </span>

                    {cell.hasOptimalTime && cell.isCurrentMonth && (
                      <span
                        className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200"
                        title="Optimal Engagement Slot: 7:30 PM IST"
                      >
                        🔥 7:30 PM
                      </span>
                    )}
                  </div>

                  {/* Scheduled Post Pills */}
                  <div className="space-y-1 my-1 overflow-hidden">
                    {cell.posts.slice(0, 2).map((post) => {
                      const channel = CHANNELS.find((c) => c.id === post.channel) || CHANNELS[0];
                      return (
                        <div
                          key={post.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            openDrawer(post.id);
                          }}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-medium truncate border ${channel.bgColor} ${channel.color} ${channel.badgeBorder} hover:opacity-80 transition-all flex items-center gap-1`}
                        >
                          {post.format === 'carousel' ? (
                            <Layers className="h-2.5 w-2.5 shrink-0" />
                          ) : post.format === 'reel_script' ? (
                            <Play className="h-2.5 w-2.5 shrink-0" />
                          ) : null}
                          <span className="truncate">{post.title}</span>
                        </div>
                      );
                    })}

                    {cell.posts.length > 2 && (
                      <span className="text-[10px] font-semibold text-[#7C3AED] block pl-1">
                        +{cell.posts.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Empty Cell Hover Action */}
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-300 group-hover:text-zinc-500">
                      {cell.posts.length > 0 ? `${cell.posts.length} scheduled` : ''}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Inspector Panel (1 Column) */}
        <div className="bg-white rounded-2xl border border-[#E4E4E7] shadow-xs p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-[#F4F4F5] pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED]">
                Flight Schedule Inspector
              </span>
              <h3 className="text-base font-bold text-[#18181B] mt-0.5">
                {selectedDateStr
                  ? new Date(selectedDateStr).toLocaleDateString('en-IN', {
                      weekday: 'short',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Select a Date'}
              </h3>
            </div>

            {/* List of Scheduled Posts for Selected Date */}
            {selectedDatePosts.length === 0 ? (
              <div className="p-6 text-center rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                <CalendarIcon className="h-6 w-6 text-[#A1A1AA] mx-auto" />
                <p className="text-xs text-[#71717A] font-medium">
                  No campaigns or posts scheduled for this day.
                </p>
                <p className="text-[11px] text-[#A1A1AA]">
                  Recommended time slot: <strong>7:30 PM IST</strong>
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-xs font-semibold text-[#71717A]">
                  Scheduled Flights ({selectedDatePosts.length})
                </span>
                {selectedDatePosts.map((post) => {
                  const channel = CHANNELS.find((c) => c.id === post.channel) || CHANNELS[0];
                  return (
                    <div
                      key={post.id}
                      onClick={() => openDrawer(post.id)}
                      className="p-3 rounded-xl border border-[#E4E4E7] bg-white hover:border-[#7C3AED] hover:shadow-xs cursor-pointer transition-all space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${channel.bgColor} ${channel.color} ${channel.badgeBorder}`}
                        >
                          {channel.name}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-[#7C3AED] font-semibold">
                          <Sparkles className="h-3 w-3" />
                          <span>{post.predictedScore}/100</span>
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-[#18181B] line-clamp-1">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-[#71717A] line-clamp-2">{post.caption}</p>
                      <div className="pt-1 flex items-center gap-1 text-[10px] text-[#71717A]">
                        <Clock className="h-3 w-3" />
                        <span>
                          {post.scheduledFor
                            ? new Date(post.scheduledFor).toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : 'Unscheduled'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Schedule Button */}
          <div className="pt-4 border-t border-[#F4F4F5] mt-4">
            <button
              type="button"
              onClick={onNavigateToGenerator}
              className="w-full py-2.5 px-4 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <Plus className="h-4 w-4" />
              Generate Content for this Date
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
