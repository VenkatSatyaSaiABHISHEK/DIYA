'use client';

import React, { useRef, useState } from 'react';
import { GlobeHero } from './GlobeHero';
import { Megaphone, FileText, TrendingUp, Users, BarChart3, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ensureScrollTrigger } from '@/lib/animations/scrollTrigger';
import { isReducedMotion } from '@/lib/animations/pageTransition';

interface TeamChip {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  angle: number; // in degrees
}

const TEAM_CHIPS: TeamChip[] = [
  {
    id: 'campaigns',
    name: 'Campaigns',
    icon: Megaphone,
    description: 'Autonomous Meta & Google ad flight optimization',
    angle: 0,
  },
  {
    id: 'content',
    name: 'Content',
    icon: FileText,
    description: 'High-converting ad copy, creatives & festive hooks',
    angle: 60,
  },
  {
    id: 'seo',
    name: 'SEO',
    icon: TrendingUp,
    description: 'Technical audits & keyword ranking growth',
    angle: 120,
  },
  {
    id: 'leads',
    name: 'Leads',
    icon: Users,
    description: 'Instant lead qualification & WhatsApp CRM routing',
    angle: 180,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart3,
    description: 'Cross-channel attribution & real-time ROAS tracking',
    angle: 240,
  },
  {
    id: 'automations',
    name: 'Automations',
    icon: Cpu,
    description: 'Trigger-based nurture sequences & autonomous workflows',
    angle: 300,
  },
];

export const TeamOrbit: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const centerOrbRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement[]>([]);
  const [activeChip, setActiveChip] = useState<string | null>(null);

  useGSAP(
    () => {
      if (isReducedMotion()) return;
      ensureScrollTrigger();

      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
          end: 'center center',
          scrub: 1.2,
        },
      });

      // Headline fade in
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          0
        );
      }

      // Orb scales smoothly in orbit center
      if (centerOrbRef.current) {
        tl.fromTo(
          centerOrbRef.current,
          { scale: 1.15, opacity: 0.9 },
          { scale: 0.88, opacity: 1, duration: 1 },
          0
        );
      }

      // 6 Chips fly in from perimeter
      chipsRef.current.forEach((chipEl, idx) => {
        if (!chipEl) return;
        const chip = TEAM_CHIPS[idx];
        const rad = (chip.angle * Math.PI) / 180;
        const startDistance = 240;
        const startX = Math.cos(rad) * startDistance;
        const startY = Math.sin(rad) * startDistance;

        tl.fromTo(
          chipEl,
          { x: startX, y: startY, opacity: 0, scale: 0.6 },
          { x: 0, y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
          0.1 + idx * 0.05
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative min-h-[90vh] py-24 sm:py-32 w-full flex flex-col items-center justify-center bg-[#FAFAFC] text-zinc-900 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/8 blur-3xl pointer-events-none" />

      {/* Section Headline */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4 mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
          Autonomous Capability
        </span>
        <h2
          ref={headlineRef}
          className="font-sans text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-900 mt-4"
        >
          One AI. Your entire <span className="text-shine-purple font-bold">marketing workforce.</span>
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 mt-2.5 max-w-lg mx-auto">
          Six specialized marketing competencies orchestrated by one autonomous intelligence.
        </p>
      </div>

      {/* Interactive Orbit Stage with Center AI Orb */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex items-center justify-center">
        {/* Center Orb (~160px) */}
        <div
          ref={centerOrbRef}
          className="relative z-10 flex items-center justify-center"
        >
          <GlobeHero size={160} interactive={false} />
        </div>

        {/* Orbit Rings (Desktop) */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute rounded-full border border-purple-300/40 pointer-events-none"
          style={{ width: 560, height: 560 }}
        />
        <div
          aria-hidden="true"
          className="hidden md:block absolute rounded-full border border-purple-200/50 pointer-events-none"
          style={{ width: 720, height: 720 }}
        />

        {/* 6 Glass Chips Arranged Around Globe (Desktop) */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          {TEAM_CHIPS.map((chip, idx) => {
            const rad = (chip.angle * Math.PI) / 180;
            const radius = 250;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            const Icon = chip.icon;
            const isHovered = activeChip === chip.id;

            return (
              <div
                key={chip.id}
                ref={(el) => {
                  if (el) chipsRef.current[idx] = el;
                }}
                onMouseEnter={() => setActiveChip(chip.id)}
                onMouseLeave={() => setActiveChip(null)}
                className="absolute top-1/2 left-1/2 pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                <div
                  className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
                    isHovered
                      ? 'bg-purple-50 border-purple-400 shadow-[0_8px_24px_rgba(124,58,237,0.15)] scale-105'
                      : 'bg-white/95 border-zinc-200/90 shadow-md hover:border-purple-300 hover:bg-white'
                  }`}
                >
                  <div className="p-1.5 rounded-xl bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-900 whitespace-nowrap">
                    {chip.name}
                  </span>

                  {/* Tooltip Description on Hover */}
                  {isHovered && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-52 p-3 rounded-2xl bg-white border border-purple-200 text-[11px] text-zinc-700 shadow-xl backdrop-blur-md pointer-events-none z-30 animate-in fade-in duration-200">
                      {chip.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Stacked View */}
      <div className="md:hidden grid grid-cols-2 gap-2.5 w-full max-w-sm px-4 mt-8 relative z-20">
        {TEAM_CHIPS.map((chip) => {
          const Icon = chip.icon;
          return (
            <div
              key={chip.id}
              className="flex flex-col p-3 rounded-xl bg-white border border-zinc-200 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1 rounded bg-purple-100 text-purple-700">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold text-zinc-900">{chip.name}</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-snug">{chip.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TeamOrbit;
