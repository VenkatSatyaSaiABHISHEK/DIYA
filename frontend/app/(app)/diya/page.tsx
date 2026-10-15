import React, { Suspense } from 'react';
import { DiyaWorkspace } from '@/features/diya/components/DiyaWorkspace';
import { Skeleton } from '@/components/ui/Skeleton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DIYA Workspace — AI Marketing Employee',
  description: 'Interactive digital marketing management, strategy generation, and autonomous workflow command center.',
};

export default function DiyaPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <Skeleton width="100%" height={48} />
          <Skeleton width="100%" height={400} />
        </div>
      }
    >
      <DiyaWorkspace />
    </Suspense>
  );
}
