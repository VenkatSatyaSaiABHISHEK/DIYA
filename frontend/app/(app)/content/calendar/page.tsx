'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ContentCalendarView } from '@/features/content/components/calendar/ContentCalendarView';
import { ArrowLeft } from 'lucide-react';

export default function CalendarPage() {
  const router = useRouter();

  return (
    <div className="w-full space-y-4 py-2">
      <Link
        href="/content"
        className="inline-flex items-center gap-1.5 text-xs text-[#888] hover:text-[#111] dark:hover:text-[#FFF] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Content & Creatives</span>
      </Link>

      <ContentCalendarView onNavigateToGenerator={() => router.push('/content/new')} />
    </div>
  );
}
