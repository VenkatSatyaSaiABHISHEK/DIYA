import { useState, useMemo } from 'react';
import type { ContentChannel, ContentPost } from '../types';

export function useContentCalendar(posts: ContentPost[]) {
  // Fixed to October 2026 for consistent demo timeline
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 0-indexed: 9 = October
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>('2026-10-16');
  const [channelFilter, setChannelFilter] = useState<ContentChannel | 'all'>('all');

  const monthName = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
  }, [currentYear, currentMonth]);

  // Generate 42 calendar cells (6 weeks)
  const calendarCells = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const cells: {
      dateNumber: number;
      dateStr: string;
      isCurrentMonth: boolean;
      isToday: boolean;
      posts: ContentPost[];
      hasOptimalTime: boolean;
    }[] = [];

    // Previous month padding
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      const m = currentMonth === 0 ? 12 : currentMonth;
      const y = currentMonth === 0 ? currentYear - 1 : currentYear;
      const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      cells.push({
        dateNumber: dayNum,
        dateStr,
        isCurrentMonth: false,
        isToday: false,
        posts: [],
        hasOptimalTime: false,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayPosts = posts.filter((p) => {
        if (!p.scheduledFor) return false;
        if (channelFilter !== 'all' && p.channel !== channelFilter) return false;
        return p.scheduledFor.startsWith(dateStr);
      });

      // Special highlight for optimal days
      const hasOptimalTime = day === 16 || day === 17 || day === 20 || day === 24;

      cells.push({
        dateNumber: day,
        dateStr,
        isCurrentMonth: true,
        isToday: day === 15, // Oct 15
        posts: dayPosts,
        hasOptimalTime,
      });
    }

    // Next month padding to reach 35 or 42 cells
    const remaining = 35 - cells.length;
    for (let i = 1; i <= (remaining > 0 ? remaining : 42 - cells.length); i++) {
      const m = currentMonth === 11 ? 1 : currentMonth + 2;
      const y = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      cells.push({
        dateNumber: i,
        dateStr,
        isCurrentMonth: false,
        isToday: false,
        posts: [],
        hasOptimalTime: false,
      });
    }

    return cells;
  }, [currentYear, currentMonth, posts, channelFilter]);

  const selectedDatePosts = useMemo(() => {
    if (!selectedDateStr) return [];
    return posts.filter((p) => p.scheduledFor && p.scheduledFor.startsWith(selectedDateStr));
  }, [posts, selectedDateStr]);

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  return {
    monthName,
    calendarCells,
    selectedDateStr,
    setSelectedDateStr,
    selectedDatePosts,
    channelFilter,
    setChannelFilter,
    nextMonth,
    prevMonth,
  };
}
