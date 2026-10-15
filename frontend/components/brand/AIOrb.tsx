'use client';

import React from 'react';
import type { AIWorkStatus } from '@/types/shared';
import { cn } from '@/lib/utils/cn';
import { GrainOrb } from './GrainOrb';
import type { OrbState } from '@/lib/orb-state';

export interface AIOrbProps {
  status?: AIWorkStatus;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  interactive?: boolean;
  colorFrom?: string;
  colorTo?: string;
  speed?: number;
  variant?: 'grain' | 'glossy';
}

export const AIOrb: React.FC<AIOrbProps> = ({
  status = 'optimizing',
  size = 'md',
  className,
  interactive = false,
  colorFrom = '#7C3AED',
  colorTo = '#E879F9',
  speed = 1,
  variant = 'grain',
}) => {
  const sizePixels: Record<string, number> = {
    sm: 26,
    md: 38,
    lg: 58,
    xl: 84,
  };

  const px = typeof size === 'number' ? size : sizePixels[size] || 38;

  const mapStatusToOrbState = (st: AIWorkStatus): OrbState => {
    switch (st) {
      case 'idle':
        return 'idle';
      case 'analyzing':
        return 'thinking';
      case 'planning':
        return 'listening';
      case 'creating':
      case 'optimizing':
      case 'running':
        return 'speaking';
      case 'awaiting_approval':
        return 'connecting';
      default:
        return 'idle';
    }
  };

  const orbState = mapStatusToOrbState(status);

  // For micro sizes (<= 28px, like Navbar and icon badges), render an ultra-crisp,
  // crash-proof CSS/SVG micro-orb that uses 0 WebGL contexts to prevent browser context exhaustion.
  if (px <= 28 && variant !== 'glossy') {
    return (
      <div
        className={cn(
          'relative inline-flex items-center justify-center shrink-0 select-none overflow-visible',
          interactive && 'cursor-pointer hover:scale-105 transition-transform duration-200',
          className
        )}
        style={{ width: px, height: px }}
        role="img"
        aria-label={`DIYA AI Orb - ${status}`}
      >
        {/* Soft shadow underneath */}
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: -Math.max(2, px * 0.1),
            width: px * 0.85,
            height: Math.max(3, px * 0.22),
            background: 'radial-gradient(ellipse closest-side, rgba(124, 58, 237, 0.45), transparent 75%)',
            filter: 'blur(1.5px)',
          }}
        />

        {/* Ambient glow halo */}
        <div
          aria-hidden
          className="absolute inset-[-2px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${colorTo} 0%, ${colorFrom} 65%, transparent 100%)`,
            filter: 'blur(3px)',
            animation: 'orb-pulse-glow 3s ease-in-out infinite',
          }}
        />

        {/* Fluid gradient sphere with continuous 3D swirl */}
        <div
          className="relative rounded-full overflow-hidden shadow-[0_2px_8px_rgba(124,58,237,0.4)]"
          style={{
            width: px,
            height: px,
            background: `conic-gradient(from 180deg at 50% 50%, ${colorFrom} 0%, #9333EA 22%, ${colorTo} 45%, #F472B6 62%, #A855F7 80%, ${colorFrom} 100%)`,
            animation: 'orb-swirl 10s linear infinite',
            border: '1px solid rgba(255, 255, 255, 0.35)',
          }}
        >
          {/* Inner specular highlight reflection */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.95) 0%, rgba(232, 121, 249, 0.4) 38%, transparent 68%)',
            }}
          />
        </div>
      </div>
    );
  }

  // Optional glossy marble variant if explicitly requested
  if (variant === 'glossy') {
    const shadowBottom = -Math.max(2, px * 0.09);
    const shadowWidth = px * 0.85;
    const shadowHeight = Math.max(3, px * 0.22);
    const shadowBlur = Math.max(1.5, px * 0.05);

    const glowBlur = Math.max(3, px * 0.1);
    const glowInset = -Math.max(2, px * 0.08);

    const innerShadowBottom = px * 0.14;
    const innerShadowBlur = px * 0.24;
    const innerHighlightTop = px * 0.07;
    const innerHighlightBlur = px * 0.15;
    const outerDropShadow = px * 0.08;
    const outerDropBlur = px * 0.22;

    const duration = Math.max(5, 11 / (speed || 1));

    return (
      <div
        className={cn(
          'relative inline-flex items-center justify-center shrink-0 select-none overflow-visible',
          interactive && 'cursor-pointer hover:scale-105 transition-transform duration-200',
          className
        )}
        style={{ width: px, height: px }}
        role="img"
        aria-label={`DIYA AI Orb - ${status}`}
      >
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: shadowBottom,
            width: shadowWidth,
            height: shadowHeight,
            background: 'radial-gradient(ellipse closest-side, rgba(124, 58, 237, 0.45), transparent 75%)',
            filter: `blur(${shadowBlur}px)`,
          }}
        />

        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: glowInset,
            background: `radial-gradient(circle, ${colorTo} 0%, rgba(168, 85, 247, 0.6) 45%, ${colorFrom} 70%, transparent 100%)`,
            filter: `blur(${glowBlur}px)`,
            animation: 'orb-pulse-glow 3.5s ease-in-out infinite',
          }}
        />

        <div
          className="relative rounded-full overflow-hidden"
          style={{
            width: px,
            height: px,
            background: `conic-gradient(from 180deg at 50% 50%, #EC4899 0%, #D946EF 20%, #A855F7 45%, ${colorFrom} 70%, #9333EA 85%, #EC4899 100%)`,
            animation: `orb-swirl ${duration}s linear infinite`,
            boxShadow: `inset 0 -${innerShadowBottom}px ${innerShadowBlur}px rgba(46, 16, 101, 0.65), inset 0 ${innerHighlightTop}px ${innerHighlightBlur}px rgba(255, 255, 255, 0.5), 0 ${outerDropShadow}px ${outerDropBlur}px rgba(124, 58, 237, 0.45)`,
            border: '1px solid rgba(255, 255, 255, 0.35)',
          }}
        >
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 33% 27%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.65) 16%, rgba(244, 114, 182, 0.35) 38%, transparent 68%)',
            }}
          />

          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 75% 78%, rgba(192, 132, 252, 0.45) 0%, transparent 50%)',
            }}
          />
        </div>
      </div>
    );
  }

  // DEFAULT: Authentic Signature DIYA WebGL GrainOrb
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center shrink-0 select-none overflow-visible',
        interactive && 'cursor-pointer hover:scale-105 transition-transform duration-200',
        className
      )}
      style={{ width: px, height: px }}
    >
      <GrainOrb
        state={orbState}
        size={px}
        speed={speed}
        colorFrom={colorFrom}
        colorTo={colorTo}
        label={`DIYA AI Orb - ${status}`}
      />
    </div>
  );
};

export { GrainOrb };
