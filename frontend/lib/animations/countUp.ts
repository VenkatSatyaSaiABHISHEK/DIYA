'use client';

import gsap from 'gsap';
import { isReducedMotion } from './pageTransition';

export interface CountUpOptions {
  duration?: number;
  decimals?: number;
  ease?: string;
  onUpdate: (formattedValue: number) => void;
  onComplete?: () => void;
}

/**
 * Animates a numeric value from start to target.
 */
export function animateCountUp(
  targetValue: number,
  options: CountUpOptions,
  startValue = 0
): gsap.core.Tween | null {
  if (typeof window === 'undefined') {
    options.onUpdate(targetValue);
    options.onComplete?.();
    return null;
  }

  if (isReducedMotion()) {
    options.onUpdate(targetValue);
    options.onComplete?.();
    return null;
  }

  const duration = options.duration ?? 1.2;
  const ease = options.ease ?? 'power2.out';
  const proxy = { val: startValue };

  return gsap.to(proxy, {
    val: targetValue,
    duration,
    ease,
    onUpdate: () => {
      const current = options.decimals
        ? Number(proxy.val.toFixed(options.decimals))
        : Math.round(proxy.val);
      options.onUpdate(current);
    },
    onComplete: () => {
      options.onUpdate(targetValue);
      options.onComplete?.();
    },
  });
}
