import { HomeDashboard } from '@/features/home/components/HomeDashboard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home — DIYA AI Marketing Team',
  description: 'AI marketing command center, KPI performance, active campaigns, and autonomous agent actions.',
};

export default function HomePage() {
  return <HomeDashboard />;
}
