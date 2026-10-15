import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DIYA AI — Your AI Marketing Team | Mentneo',
  description:
    'Create. Advertise. Grow. Automatically. One AI. Your Entire Marketing Workforce. Manage your digital marketing without agencies or separate tools.',
  keywords: [
    'DIYA AI',
    'AI Marketing Employee',
    'Autonomous Digital Marketing',
    'Ad Campaign Automation',
    'Meta Ads AI',
    'Google Ads AI',
    'Mentneo',
  ],
  authors: [{ name: 'Mentneo' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head />
      <body className="min-h-full flex flex-col bg-[#FAFAFC] text-[#18181B] selection:bg-[#EDE9FE] selection:text-[#6D28D9]">
        {children}
      </body>
    </html>
  );
}
