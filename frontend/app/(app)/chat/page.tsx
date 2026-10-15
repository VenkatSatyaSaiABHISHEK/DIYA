import { HomeChatView } from '@/features/home/components/HomeChatView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat with DIYA — AI Marketing Employee',
  description: 'Interactive conversational marketing management and AI strategic guidance.',
};

export default function ChatPage() {
  return <HomeChatView />;
}
