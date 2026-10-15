'use client';

import React, { useState } from 'react';
import { AIOrb } from '@/components/brand/AIOrb';
import {
  Megaphone,
  Search,
  Share2,
  BarChart3,
  Globe2,
  MessageSquare,
  Database,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ToolItem {
  id: number;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  angle: number; // in degrees relative to vertical (0 = top)
  tag: string;
}

const ARC_TOOLS: ToolItem[] = [
  { id: 1, name: 'Meta Ads', category: 'Paid Social', icon: Megaphone, angle: -68, tag: 'Live Sync' },
  { id: 2, name: 'Google Ads', category: 'Search & PPC', icon: Search, angle: -46, tag: 'Bidding' },
  { id: 3, name: 'Instagram', category: 'Organic & Reels', icon: Share2, angle: -23, tag: 'Creatives' },
  { id: 4, name: 'Google Analytics 4', category: 'Web Traffic', icon: BarChart3, angle: 0, tag: 'Attribution' },
  { id: 5, name: 'Search Console', category: 'SEO & Queries', icon: Globe2, angle: 23, tag: 'Rankings' },
  { id: 6, name: 'WhatsApp API', category: 'Conversations', icon: MessageSquare, angle: 46, tag: 'Leads' },
  { id: 7, name: 'CRM & ERP', category: 'Pipelines', icon: Database, angle: 68, tag: 'Revenue' },
];

export const IntegrationsArc: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Geometry parameters (SVG viewbox 800 x 420)
  const svgWidth = 800;
  const svgHeight = 400;
  const cx = 400; // Center X
  const cy = 300; // Center Y (core orb)
  const radiusX = 330;
  const radiusY = 230;
  const coreRadius = 42;

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFAFC] select-none overflow-hidden text-center border-t border-zinc-100">
      {/* Soft Radiant Horizon behind the Arc */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[340px] pointer-events-none rounded-full blur-3xl opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, rgba(232, 121, 249, 0.2) 50%, transparent 80%)',
        }}
      />

      <div className="max-w-4xl mx-auto space-y-4 mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          <Layers className="h-3.5 w-3.5 text-purple-600" />
          <span>Universal Integration</span>
        </div>
        <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950">
          Your tools &amp; one connected workflow.
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 max-w-lg mx-auto">
          DIYA interfaces directly with your ad accounts, analytics engines, and communication channels.
        </p>
      </div>

      {/* Responsive Interactive Constellation / Arc Stage */}
      <div className="relative mx-auto flex items-center justify-center overflow-visible min-h-[380px] sm:min-h-[420px]">
        <div
          className="relative w-[800px] h-[400px] transform scale-[0.68] xs:scale-[0.8] sm:scale-90 md:scale-100 transition-transform origin-center shrink-0"
          style={{ width: `${svgWidth}px`, height: `${svgHeight}px` }}
        >
          {/* SVG Connection Rays and Dashed Guide Arc */}
          <svg
            width={svgWidth}
            height={svgHeight}
            className="absolute top-0 left-0 pointer-events-none z-0 overflow-visible"
          >
            <defs>
              <linearGradient id="line-gradient-active" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#E879F9" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="line-gradient-idle" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#C084FC" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#E9D5FF" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* Semicircular Guide Arc Path */}
            <path
              d={`M ${cx - radiusX} ${cy} A ${radiusX} ${radiusY} 0 0 1 ${cx + radiusX} ${cy}`}
              fill="none"
              stroke="#E9D5FF"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              opacity="0.6"
            />

            {/* Dynamic Connecting Lines from DIYA Core to each Tool */}
            {ARC_TOOLS.map((tool) => {
              const rad = (tool.angle * Math.PI) / 180;
              const isHovered = hoveredId === tool.id;

              // Line start at core perimeter
              const startX = cx + coreRadius * Math.sin(rad);
              const startY = cy - coreRadius * Math.cos(rad);

              // Line end at tool perimeter
              const targetX = cx + radiusX * Math.sin(rad);
              const targetY = cy - radiusY * Math.cos(rad);

              return (
                <g key={`ray-${tool.id}`}>
                  {/* Base / Active Line */}
                  <line
                    x1={startX}
                    y1={startY}
                    x2={targetX}
                    y2={targetY}
                    stroke={isHovered ? 'url(#line-gradient-active)' : 'url(#line-gradient-idle)'}
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    strokeDasharray={isHovered ? '6 4' : '3 3'}
                    className={isHovered ? 'animate-pulse-dash transition-all duration-300' : 'transition-all duration-300'}
                    style={{
                      filter: isHovered ? 'drop-shadow(0 0 6px rgba(124, 58, 237, 0.6))' : 'none',
                    }}
                  />

                  {/* Flowing particle pulse when hovered */}
                  {isHovered && (
                    <circle
                      cx={(startX + targetX) / 2}
                      cy={(startY + targetY) / 2}
                      r="3.5"
                      fill="#FFFFFF"
                      className="animate-ping"
                      style={{ filter: 'drop-shadow(0 0 4px #7C3AED)' }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Central DIYA Core Node */}
          <div
            className="absolute z-20 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${cx}px`, top: `${cy}px` }}
          >
            <div
              className={`relative p-3.5 rounded-full bg-white/95 backdrop-blur-xl border transition-all duration-500 ease-out animate-core-breathing ${
                hoveredId !== null
                  ? 'border-purple-400 scale-105 shadow-[0_0_35px_rgba(124,58,237,0.45)]'
                  : 'border-purple-200 shadow-[0_0_25px_rgba(124,58,237,0.2)]'
              }`}
            >
              <AIOrb
                status={hoveredId !== null ? 'optimizing' : 'running'}
                size={70}
                speed={hoveredId !== null ? 1.5 : 1.2}
              />
            </div>

            <div className="flex items-center gap-1.5 mt-2.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-purple-200/80 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
              <span className="text-xs font-mono font-bold text-zinc-950">
                {hoveredId !== null ? `Syncing: ${ARC_TOOLS.find((t) => t.id === hoveredId)?.name}` : 'DIYA Core Brain'}
              </span>
            </div>
          </div>

          {/* Orbiting Tool Badges */}
          {ARC_TOOLS.map((tool, index) => {
            const rad = (tool.angle * Math.PI) / 180;
            const x = cx + radiusX * Math.sin(rad);
            const y = cy - radiusY * Math.cos(rad);
            const Icon = tool.icon;
            const isHovered = hoveredId === tool.id;

            return (
              <div
                key={tool.id}
                className="absolute z-20 pointer-events-auto cursor-pointer"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoveredId(tool.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Floating Wrapper with Staggered Delay */}
                <div
                  className={!isHovered ? 'animate-arc-float' : ''}
                  style={{ animationDelay: `${index * 0.35}s` }}
                >
                  <div
                    className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-2xl backdrop-blur-xl transition-all duration-300 ease-out ${
                      isHovered
                        ? 'bg-white border-2 border-purple-500 scale-110 shadow-[0_12px_32px_rgba(124,58,237,0.28)] z-30'
                        : 'bg-white/90 border border-zinc-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:border-purple-300 hover:shadow-lg'
                    }`}
                  >
                    {/* Icon container */}
                    <div
                      className={`p-2 rounded-xl transition-all duration-300 ${
                        isHovered
                          ? 'bg-gradient-to-tr from-[#7C3AED] to-[#9333EA] text-white shadow-xs'
                          : 'bg-purple-50 text-purple-700 group-hover:bg-purple-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    {/* Tool Info */}
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-zinc-900 whitespace-nowrap block">
                          {tool.name}
                        </span>
                        {isHovered && (
                          <Sparkles className="h-2.5 w-2.5 text-purple-600 animate-spin" />
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-500 font-medium block whitespace-nowrap">
                        {isHovered ? tool.tag : tool.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Connect Workspace CTA */}
      <div className="mt-8 flex justify-center relative z-10">
        <button
          type="button"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-zinc-900 bg-white hover:bg-zinc-50 border border-zinc-200 shadow-xs hover:border-zinc-300 hover:shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <span>Connect Your Workspace</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
};

export default IntegrationsArc;
