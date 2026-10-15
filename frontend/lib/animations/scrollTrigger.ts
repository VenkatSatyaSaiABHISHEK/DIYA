'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from './pageTransition';

let registered = false;

export function ensureScrollTrigger(): typeof ScrollTrigger | null {
  if (typeof window === 'undefined') return null;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return ScrollTrigger;
}

/**
 * Creates a standard section entrance animation: 12px rise + fade in, max 600ms.
 */
export function animateSectionReveal(
  target: HTMLElement | string,
  trigger?: HTMLElement | string,
  options?: {
    start?: string;
    delay?: number;
    duration?: number;
  }
): gsap.core.Tween | null {
  if (typeof window === 'undefined') return null;
  ensureScrollTrigger();

  if (isReducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0 });
    return null;
  }

  return gsap.fromTo(
    target,
    { opacity: 0, y: 12 },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.55,
      delay: options?.delay ?? 0,
      ease: 'power2.out',
      scrollTrigger: trigger
        ? {
            trigger: trigger,
            start: options?.start ?? 'top 85%',
            once: true,
          }
        : undefined,
    }
  );
}
