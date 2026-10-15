'use client';

import React, { useRef, useEffect } from 'react';
import { AIOrb } from '@/components/brand/AIOrb';
import {
  Megaphone,
  Search,
  Share2,
  BarChart3,
  Globe2,
  MessageSquare,
  Database,
} from 'lucide-react';
import { animeFloating, animeSvgLineDraw } from '@/lib/animations/animeHelpers';
import { isReducedMotion } from '@/lib/animations/pageTransition';

const INTEGRATIONS = [
  { name: 'Meta Ads', icon: Megaphone, desc: 'Omnichannel Campaigns' },
  { name: 'Google Ads', icon: Search, desc: 'High-Intent Search' },
  { name: 'Instagram', icon: Share2, desc: 'Social & Reels' },
  { name: 'Google Analytics', icon: BarChart3, desc: 'Traffic & Funnels' },
  { name: 'Search Console', icon: Globe2, desc: 'Keyword Rankings' },
  { name: 'WhatsApp Business', icon: MessageSquare, desc: 'Direct Conversion' },
  { name: 'CRM & Lead APIs', icon: Database, desc: 'Instant Synchronization' },
];

export const IntegrationsRow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const chipsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isReducedMotion()) return;

    // Animate SVG connection lines drawing to central orb
    pathRefs.current.forEach((path, idx) => {
      if (path) {
        animeSvgLineDraw(path, {
          duration: 1200 + idx * 100,
          delay: idx * 80,
        });
      }
    });

    // Subtle gentle float for integration chips
    const validChips = chipsRef.current.filter(Boolean) as HTMLDivElement[];
    if (validChips.length > 0) {
      animeFloating(validChips, { translateY: [-3, 3], duration: 3200 });
    }
  }, []);

  return (
    <section
      id="integrations"
      ref={containerRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAFAFC] text-zinc-900 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto text-center space-y-4 mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
          Ecosystem Connectivity
        </span>
        <h2 className="font-sans text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-900">
          Plug DIYA into your marketing stack.
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto">
          One-click OAuth connection to your existing ad accounts, analytics engines, and CRM databases.
        </p>
      </div>

      {/* Central Visual Hub: Small Center Orb + Radiating Animated Lines + Surrounding Chips */}
      <div className="relative max-w-5xl mx-auto flex flex-col items-center justify-center">
        {/* Center Orb Hub */}
        <div className="relative z-20 flex flex-col items-center justify-center mb-10">
          <div className="relative p-3 rounded-full bg-purple-50 border border-purple-200 shadow-[0_0_40px_rgba(124,58,237,0.18)]">
            <AIOrb status="running" size={64} speed={1.3} />
          </div>
          <span className="text-xs font-mono font-bold text-purple-700 mt-2">
            DIYA Autonomous Core
          </span>
        </div>

        {/* Integration Chips Grid */}
        <div className="relative z-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
          {INTEGRATIONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                ref={(el) => {
                  chipsRef.current[idx] = el;
                }}
                className="group flex items-center gap-3 p-4 rounded-2xl bg-white hover:bg-purple-50/40 border border-zinc-200 hover:border-purple-300 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md"
              >
                <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 group-hover:text-white group-hover:bg-[#7C3AED] transition-colors shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 text-left">
                  <span className="block text-xs font-bold text-zinc-900 truncate">
                    {item.name}
                  </span>
                  <span className="block text-[11px] text-zinc-500 truncate">
                    {item.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsRow;
