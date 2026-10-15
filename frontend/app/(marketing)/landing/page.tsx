import type { Metadata } from 'next';
import { MarketingPage } from '@/features/marketing/MarketingPage';

export const metadata: Metadata = {
  title: 'DIYA AI — Your AI Marketing Employee | Mentneo',
  description: 'Create. Advertise. Grow. Automatically. One AI. Your Entire Marketing Workforce.',
};

export default function MarketingLandingPage() {
  return <MarketingPage />;
}
