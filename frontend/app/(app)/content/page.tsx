'use client';

import React from 'react';
import Link from 'next/link';
import { PostsView } from '@/features/content/components/posts/PostsView';
import { Button } from '@/components/ui/Button';
import { Sparkles, Plus, Calendar, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ContentPage() {
  const router = useRouter();

  return (
    <div className="w-full space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
            Content & Creatives
          </h1>
          <p className="text-sm text-[#71717A] mt-1">
            AI-generated social creatives, multi-slide carousels, and scheduled posts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/content/calendar">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-9"
              leftIcon={<Calendar className="h-3.5 w-3.5 text-[#7C3AED]" />}
            >
              Calendar
            </Button>
          </Link>
          <Link href="/content/social">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-9"
              leftIcon={<BookOpen className="h-3.5 w-3.5 text-[#7C3AED]" />}
            >
              Social Hub
            </Button>
          </Link>
          <Link href="/content/new">
            <Button
              variant="gradient"
              size="sm"
              className="text-xs h-9 font-semibold shadow-xs"
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Create Content
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Main Content: Posts Feed & Inspection */}
      <div className="space-y-4">
        <PostsView onNavigateToGenerator={() => router.push('/content/new')} />
      </div>
    </div>
  );
}
