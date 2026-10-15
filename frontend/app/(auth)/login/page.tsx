import { AuthView } from '@/features/auth/components/AuthView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In — DIYA AI',
  description: 'Log into your DIYA AI digital marketing employee platform.',
};

export default function LoginPage() {
  return <AuthView />;
}
