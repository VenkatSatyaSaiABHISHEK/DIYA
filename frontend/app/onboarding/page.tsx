import { OnboardingView } from '@/features/onboarding/components/OnboardingView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onboarding — DIYA AI',
  description: 'Set up your business profile and connect advertising channels with DIYA AI.',
};

export default function OnboardingPage() {
  return <OnboardingView />;
}
