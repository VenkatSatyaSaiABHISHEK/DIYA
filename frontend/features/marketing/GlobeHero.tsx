'use client';

import React, { useEffect, useState } from 'react';
import { AIOrb } from '@/components/brand/AIOrb';
import { cn } from '@/lib/utils/cn';

export interface GlobeHeroProps {
  size?: number;
  className?: string;
  glowStatus?: 'optimizing' | 'planning' | 'idle';
  interactive?: boolean;
}

export const GlobeHero: React.FC<GlobeHeroProps> = ({
  size = 260,
  className,
  glowStatus = 'optimizing',
  interactive = true,
}) => {
  const [dimensions, setDimensions] = useState(size);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setDimensions(Math.min(200, size));
      } else if (window.innerWidth < 1024) {
        setDimensions(Math.min(230, size));
      } else {
        setDimensions(size);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [size]);

  const mapGlowStatus = () => {
    switch (glowStatus) {
      case 'planning':
        return 'planning';
      case 'idle':
        return 'idle';
      default:
        return 'running';
    }
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center select-none overflow-visible',
        interactive && 'cursor-pointer hover:scale-105 transition-transform duration-300',
        className
      )}
      style={{
        width: dimensions * 1.3,
        height: dimensions * 1.3,
      }}
    >
      {/* 1. Ambient Purple Radial Glow */}
      <div
        className="absolute rounded-full pointer-events-none blur-3xl opacity-60 animate-pulse"
        style={{
          width: dimensions * 1.4,
          height: dimensions * 1.4,
          background:
            glowStatus === 'planning'
              ? 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(192, 132, 252, 0.15) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(124, 58, 237, 0.40) 0%, rgba(232, 121, 249, 0.18) 50%, transparent 70%)',
        }}
      />

      {/* 2. Slow Orbit Ring 1 (Dashed thin purple ring) */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full border border-purple-400/35 animate-[spin_40s_linear_infinite]"
        style={{
          width: dimensions * 1.3,
          height: dimensions * 1.3,
          transform: 'rotateX(70deg) rotateY(-18deg)',
          borderStyle: 'dashed',
          borderWidth: '1.5px',
        }}
      >
        <div className="absolute top-0 left-1/2 -ml-1.5 -mt-1.5 w-2.5 h-2.5 rounded-full bg-[#E879F9] shadow-[0_0_10px_#E879F9]" />
      </div>

      {/* 3. Slow Orbit Ring 2 (Counter-rotation) */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full border border-violet-400/25 animate-[spin_55s_linear_infinite_reverse]"
        style={{
          width: dimensions * 1.45,
          height: dimensions * 1.45,
          transform: 'rotateX(62deg) rotateY(25deg)',
          borderWidth: '1px',
        }}
      >
        <div className="absolute bottom-0 left-1/3 -ml-1 -mb-1 w-2 h-2 rounded-full bg-[#7C3AED] shadow-[0_0_8px_#7C3AED]" />
      </div>

      {/* 4. Core DIYA AI Orb (GrainOrb shader with fluid animation) */}
      <div className="relative z-10 flex items-center justify-center">
        <AIOrb
          status={mapGlowStatus()}
          size={dimensions}
          speed={1.2}
          colorFrom="#7C3AED"
          colorTo="#E879F9"
          interactive={interactive}
        />
      </div>
    </div>
  );
};

export default GlobeHero;
