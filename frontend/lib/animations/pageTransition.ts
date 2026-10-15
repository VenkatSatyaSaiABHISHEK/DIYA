'use client';

import gsap from 'gsap';

export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animate page entrance: fade + 12px slide up.
 */
export function animatePageIn(target: HTMLElement | string, onComplete?: () => void): gsap.core.Tween | null {
  if (typeof window === 'undefined' || !target) return null;

  if (isReducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0 });
    onComplete?.();
    return null;
  }

  return gsap.fromTo(
    target,
    { opacity: 0, y: 12 },
    {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out',
      onComplete,
    }
  );
}
