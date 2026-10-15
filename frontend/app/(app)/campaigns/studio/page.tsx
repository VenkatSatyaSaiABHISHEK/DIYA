import React from 'react';
import { AdStudioView } from '@/features/campaigns/components/studio/AdStudioView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ad Studio & Creative Canvas — DIYA AI',
  description: 'AI creative generation, copy matrix variations, and real-time ad mockups.',
};

export default function AdStudioPage() {
  return (
    <div className="w-full py-2">
      <AdStudioView />
    </div>
  );
}
