'use client';

import React, { useEffect, useState } from 'react';
import { AIOrb } from './AIOrb';
import { cn } from '@/lib/utils/cn';

export interface DiyaBrandLoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  orbSize?: number;
}

export const DiyaBrandLoader: React.FC<DiyaBrandLoaderProps> = ({
  className,
  size = 'fullscreen',
  orbSize = 56,
}) => {
  const [nameVisible, setNameVisible] = useState(false);

  // Orb appears first, then the name comes in smoothly
  useEffect(() => {
    const timer = setTimeout(() => {
      setNameVisible(true);
    }, 280);

    return () => clearTimeout(timer);
  }, []);

  const isFullscreen = size === 'fullscreen';

  return (
    <div
      role="status"
      aria-label="Loading DIYA AI"
      className={cn(
        'flex flex-col items-center justify-center select-none',
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#FAFAFC]/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md min-h-screen w-screen'
          : 'w-full py-16 min-h-[260px]',
        className
      )}
    >
      {/* 1. Animated Orb (First appears with gentle scale and ambient purple halo) */}
      <div className="relative flex items-center justify-center transition-transform duration-700 ease-out animate-in fade-in zoom-in-75">
        {/* Soft Ambient Radial Halo */}
        <div
          className="absolute rounded-full bg-[#7C3AED]/25 dark:bg-[#7C3AED]/35 blur-2xl pointer-events-none animate-pulse"
          style={{
            width: orbSize * 1.8,
            height: orbSize * 1.8,
          }}
        />

        {/* Core Animated Fluid Orb */}
        <AIOrb status="running" size={orbSize} speed={1.2} />
      </div>

      {/* 2. Brand Name (Appears smoothly after orb, with continuous text shining light sweep) */}
      <div
        className={cn(
          'mt-4 transition-all duration-700 ease-out transform',
          nameVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
        )}
      >
        <span
          className="font-sans font-bold text-xl sm:text-2xl tracking-tight text-shine select-none"
          style={{ letterSpacing: '-0.025em' }}
        >
          DIYA AI
        </span>
      </div>
    </div>
  );
};

export default DiyaBrandLoader;
