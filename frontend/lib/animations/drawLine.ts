'use client';

import gsap from 'gsap';
import { isReducedMotion } from './pageTransition';

export interface DrawLineOptions {
  duration?: number;
  ease?: string;
  delay?: number;
  onComplete?: () => void;
}

/**
 * Animates an SVG path or stroke drawing in smoothly via strokeDashoffset.
 */
export function animateDrawLine(
  pathElement: SVGPathElement | SVGElement | string,
  options: DrawLineOptions = {}
): gsap.core.Tween | null {
  if (typeof window === 'undefined' || !pathElement) return null;

  const {
    duration = 1.2,
    ease = 'power2.out',
    delay = 0.1,
    onComplete,
  } = options;

  const el =
    typeof pathElement === 'string'
      ? (document.querySelector(pathElement) as SVGGeometryElement | null)
      : (pathElement as SVGGeometryElement);

  if (!el) return null;

  if (isReducedMotion()) {
    gsap.set(el, { strokeDashoffset: 0 });
    onComplete?.();
    return null;
  }

  let length = 1000;
  try {
    if ('getTotalLength' in el && typeof el.getTotalLength === 'function') {
      length = el.getTotalLength();
    }
  } catch {
    // Fallback if not an SVGGeometryElement
    length = 1000;
  }

  gsap.set(el, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  return gsap.to(el, {
    strokeDashoffset: 0,
    duration,
    ease,
    delay,
    onComplete,
  });
}
