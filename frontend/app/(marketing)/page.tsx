import type { Metadata } from 'next';
import { MarketingPage } from '@/features/marketing/MarketingPage';

export const metadata: Metadata = {
  title: 'DIYA AI — Your AI Marketing Employee | Mentneo',
  description:
    'Create. Advertise. Grow. Automatically. One AI. Your Entire Marketing Workforce. Run high-performing Meta & Google ads, generate creatives, optimize SEO, and scale revenue.',
  keywords: [
    'DIYA AI',
    'AI Marketing Employee',
    'Autonomous Digital Marketing',
    'Meta Ads AI',
    'Google Ads Automation',
    'Mentneo Technologies',
  ],
  authors: [{ name: 'Mentneo Technologies' }],
  openGraph: {
    title: 'DIYA AI — Your AI Marketing Employee | Mentneo',
    description:
      'Create. Advertise. Grow. Automatically. One AI. Your Entire Marketing Workforce.',
    siteName: 'DIYA AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DIYA AI — Your AI Marketing Employee | Mentneo',
    description:
      'Create. Advertise. Grow. Automatically. One AI. Your Entire Marketing Workforce.',
  },
};

export default function LandingRootPage() {
  return <MarketingPage />;
}
