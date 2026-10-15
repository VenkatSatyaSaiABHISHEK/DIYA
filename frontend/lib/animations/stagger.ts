'use client';

import gsap from 'gsap';
import { isReducedMotion } from './pageTransition';

export interface StaggerOptions {
  duration?: number;
  stagger?: number;
  yOffset?: number;
  ease?: string;
  delay?: number;
  onComplete?: () => void;
}

/**
 * Staggered entrance animation for list items, activity feeds, or cards.
 */
export function animateStagger(
  targets: HTMLElement[] | NodeListOf<Element> | string,
  options: StaggerOptions = {}
): gsap.core.Tween | null {
  if (typeof window === 'undefined' || !targets) return null;

  const {
    duration = 0.45,
    stagger = 0.08,
    yOffset = 14,
    ease = 'power2.out',
    delay = 0,
    onComplete,
  } = options;

  if (isReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    onComplete?.();
    return null;
  }

  return gsap.fromTo(
    targets,
    { opacity: 0, y: yOffset },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease,
      delay,
      onComplete,
    }
  );
}
