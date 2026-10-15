'use client';

import React from 'react';
import {
  Megaphone,
  Search,
  Share2,
  BarChart3,
  Globe2,
  MessageSquare,
  Database,
} from 'lucide-react';

const PARTNERS = [
  { name: 'Meta Ads Manager', icon: Megaphone },
  { name: 'Google Ads', icon: Search },
  { name: 'Instagram For Business', icon: Share2 },
  { name: 'Google Analytics 4', icon: BarChart3 },
  { name: 'Search Console', icon: Globe2 },
  { name: 'WhatsApp Cloud API', icon: MessageSquare },
  { name: 'HubSpot & Custom CRM', icon: Database },
];

export const LogoCloud: React.FC = () => {
  return (
    <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 border-y border-zinc-100 bg-[#FAFAFC] select-none">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-6">
          Seamlessly integrated with your marketing infrastructure
        </span>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14 opacity-75 hover:opacity-100 transition-opacity">
          {PARTNERS.map((partner) => {
            const Icon = partner.icon;
            return (
              <div
                key={partner.name}
                className="flex items-center gap-2 text-zinc-600 hover:text-zinc-950 transition-colors"
              >
                <div className="p-1.5 rounded-lg bg-zinc-100 text-zinc-700">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold">{partner.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
